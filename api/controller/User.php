<?php

namespace app\api\controller;
use think\Db; 
header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf-8');
class User extends Common
{

    public $datas;

    /*------------------ 接口方法 -----方法不要大写，出错--------------*/

    /**
     * [用户登陆时接口请求的方法]
     * @return [null]
     */
    public function login()
    {
        
        $this->datas = $this->params;

        //检测用户名类型
        $userType = $this->checkUsername($this->datas['user_name']);

        // 检测验证码
        if (!captcha_check(input('yzm'))) {
            $this->error('验证码错误');
        }


        //在数据库中查询数据 (用户名和密码匹配)
        $this->matchUserAndPwd($userType);
    }


    public function fastlogin()
    {
        
        $this->datas = $this->params;

        //检测用户名类型
        $phone = $this->datas['user_name'];
        $userType = $this->checkUsername($phone);

        if($userType == 'phone'){

        //检测验证码
        $this->checkCode($phone, $this->datas['code']);
        //检测是否已经存在于数据库
        $country_code=session('country_code');
        $map['user_phone'] = $phone;
        $map['country_code'] = $country_code;
        $res = db('user')->where($map)->find();

        if (!empty($res)) {
            session('userinfo', $res);
            unset($res['user_pwd']);
            $this->returnMsg(200, '登陆成功！', $res);
        } else {
            $this->returnMsg(400, '登陆失败！', $res);
        }
        }
    }


    /**
     * [用户注册时接口请求的方法]
     * @return [null]
     */
    public function register()
    {
        $this->datas = $this->params;
        $username=$this->datas['user_name'];
        // dump(session($username . '_code'));die; 取不到 session
        // dump(session('code'));die; 
        // dump(Session::get(name:'code'));
        // echo Session::get('code'); die;


        //检测验证码
        $this->checkCode($this->datas['user_name'], $this->datas['code']);

        //检测用户名
        $this->checkRegisterUser();

        //将信息写入数据库
        $this->insertDataToDB();
    }

    /**
     * [用户上传头像接口请求的方法]
     * @return [type] [description]
     */
    public function uploadheadimg()
    {
        //1. 接收参数
        $this->datas = $this->params;

        $usid = session('userinfo.id');

        // print_r($this->datas);die;
        // dump($usid);die;

        //2. 上传文件获取路径
        //因为上传是公共方法，head_img用来区分它要裁剪
        $head_img_path = $this->uploadFiles($this->datas['user_icon'], 'head_img');

        //3. 存入数据库
        $res = db('user')->where('id', $usid)->update(['head_img_url' => $head_img_path]);

        //4. 返回结果给客户端
        if (!empty($res)) {
            $res2=db('user')->where('id', $usid)->find();
            session('userinfo',$res2);
            $this->returnMsg(200, '上传头像成功', $head_img_path);
        } else {
            $this->returnMsg(400, '上传头像失败');
        }
    }

    /**
     * [用户修改密码接口请求的方法]
     * @return [null]
     */
    public function changepwd()
    {
        //1. 接受参数
        $this->datas = $this->params;

        //2. 确定用户名类型
        $userType = $this->checkUsername($this->datas['user_name']);

        //3. 确定该用户名是否已经存在数据库
        $this->checkExist($this->datas['user_name'], $userType, 1);

        //4. 同时匹配用户名和密码
        $res = db('user')->where(['user_' . $userType => $this->datas['user_name'], 'user_pwd' => md5($this->datas['user_old_pwd'])])->find();

        //5. 匹配成功则将新密码加密后更新该用户密码
        if (!empty($res)) {

            //更新user_pwd字段
            $resu = db('user')->where('user_' . $userType, $this->datas['user_name'])->update(['user_pwd' => md5($this->datas['user_pwd'])]);

            if (!empty($resu)) {
                $this->returnMsg(200, '密码修改成功!');
            } else {
                $this->returnMsg(400, '密码修改失败!');
            }
        } else {
            $this->returnMsg(400, '密码错误!');
        }
    }

    /**
     * [用户找回密码接口请求的方法]
     * @return [type] [description]
     */
    public function findpwd()
    { 
        //1. 接收参数
        $this->datas = $this->params;
        //2. 检测用户名类型

        $userType = $this->checkUsername($this->datas['user_name']);
        //3. 检测验证码
        $this->checkCode($this->datas['user_name'], $this->datas['code']);
        //4. 如果验证码匹配成功 就更新密码字段
        $country_code=session('country_code');
        $res = db('user')->where('user_' . $userType, $this->datas['user_name'])->where('country_code',$country_code)->update(['user_pwd' => md5($this->datas['user_pwd'])]);
        //5. 返回执行结果
        // $user = new user();
        // $res = $user->isUpdate(true,['user_' . $userType=>$this->datas['user_name']])->save(['user_pwd' => md5($this->datas['user_pwd'])]);
        
        if (!empty($res)) {
            $userinfo = db('user')->where('user_' . $userType, $this->datas['user_name'])->where('country_code',$country_code)->find();
            session('userinfo', $userinfo);
            $this->returnMsg(200, '密码修改成功!',$userinfo);
        } else {
            // $this->returnMsg(400, '密码修改失败!');
            $this->returnMsg(400, '新旧密码相同!');
        }
    }

    /**
     * [验证修改手机时的验证码接口请求的方法]
     * @return [type] [description]
     */
    public function checkoldpwd()
    { 
        //1. 接收参数
        $this->datas = $this->params;
        //2. session取出原来的手机
        $userphone= session('userinfo.user_phone');

        // $userphone= '13537301165';
        //3. 检测验证码
        $this->checkCode($userphone, $this->datas['code']);
        //4. 如果验证码匹配成功 就返回成功
        $this->returnMsg(200, '匹配正确!');

    }

    /**
     * [验证修改邮箱或手机时的验证码接口请求的方法]
     * @return [type] [description]
     */
    public function newemailphone()
    {
        
        $this->datas = $this->params;

        //检测用户名类型
        $usernames = $this->datas['user_name'];
        $userType = $this->checkUsername($usernames);
        //2. session取出用户id
        $userid= session('userinfo.id');
        // $userid= 1;
       
        if($userType == 'phone'){
        //检测验证码
        $this->checkCode($usernames, $this->datas['code']);
        //检测是否已经存在于数据库

            $resu = db('user')->where('id', $userid)->update(['user_phone' => $usernames,'country_code' => session('country_code')]);
            if($resu){
            $res=db('user')->where('id', $userid)->find();
            session('userinfo',$res);//这里可以优化
            $this->returnMsg(200, '修改成功！');                
        }else{$this->returnMsg(400, '修改失败！');}

        }

        if($userType == 'email'){
        //检测验证码
        $this->checkCode($usernames, $this->datas['code']);
        // //检测是否已经存在于数据库
        // $this->checkExist($usernames, $userType, 0);
        $resu = db('user')->where('id', $userid)->update(['user_email' => $usernames]);
        if($resu){
            $res=db('user')->where('id', $userid)->find();
            session('userinfo',$res);//这里可以优化
            $this->returnMsg(200, '修改成功！');            
        }else{$this->returnMsg(400, '修改失败！');  }

        }

    }
    /**
     * [用户绑定邮箱/手机接口请求的方法]
     * @return [type] [description]
     */
    public function bindPhoneEmail()
    {
        //1. 接收参数
        $this->datas = $this->params;
        //2. 检测用户名类型
        $userType = $this->checkUsername($this->datas['user_name']);
        //3. 匹配验证码
        $this->checkCode($this->datas['user_name'], $this->datas['code']);
        //4. 更新数据库
        $res = db('user')->where('user_id', $this->datas['user_id'])->update(['user_' . $userType => $this->datas['user_name']]);

        //返回执行结果
        $returnStr = $userType == 'phone' ? '手机' : '邮箱';
        if (!empty($res)) {
            $this->returnMsg(200, '绑定' . $returnStr . '成功！');
        } else {
            $this->returnMsg(400, '绑定' . $returnStr . '失败！');
        }
    }

    /**
     * [用户设置昵称接口请求的方法]
     * @return [type] [description]
     */
    public function modifyUsername()
    {
        //1. 接收参数
        $this->datas = $this->params;
        //2. 检测该昵称是否被占用
        $res = db('user')->where('user_nickname', $this->datas['user_nickname'])->find();
        //返回执行结果
        if (!empty($res)) {
            $this->returnMsg(400, '该昵称已被暂用！');
        }
        //3. 修改user_nickname
        $ress = db('user')->where('user_id', $this->datas['user_id'])->update(['user_nickname' => $this->datas['user_nickname']]);
        //返回执行结果
        if (!empty($ress)) {
            $this->returnMsg(200, '昵称设置成功！');
        } else {
            $this->returnMsg(400, '昵称设置失败！');
        }
    }

    /* ---------------- 执行方法  ---------------- */

    /**
     * [检测用户名类型]
     * @return [null]
     */
    private function checkRegisterUser()
    {

        //获取用户名的类型 ( phone | email )
        $userType = $this->checkUsername($this->datas['user_name']);

        //检测是否已经存在于数据库
        $this->checkExist($this->datas['user_name'], $userType, 0);
        //自己加的，检测邮箱是否已经存在于数据库
        $this->checkExist($this->datas['user_email'], 'email', 0);

        //将数据存入数组对象 ( 为了给数据库添加用户信息 )
        $this->datas['user_' . $userType] = $this->datas['user_name'];

    }

    /**
     * [插入数据至数据库]
     * @return [json] [注册行为产生的结果]
     */
    private function insertDataToDB()
    {
        //删除user_name字段
        unset($this->datas['user_name']);
        unset($this->datas['code']);
        unset($this->datas['/user/register']);
        $this->datas['time'] = time();
        $this->datas['country_code'] = session('country_code');
        $this->datas['user_pwd'] = md5($this->datas['user_pwd']);
        // dump($this->datas);die;

        //往api_user表中插入用户数据
        $res = db('user')->insertGetId($this->datas);
        $this->datas['id'] = $res;
        //返回执行结果
        if (!empty($res)) {
            session('userinfo', $this->datas);
            $this->returnMsg(200, '用户注册成功！',$this->datas);
        } else {
            $this->returnMsg(400, '用户注册失败！');
        }
    }

    /**
     * [登陆验证匹配]
     * @param  [string] $type [用户名类型 phone/email]
     * @return [json]       [登陆返回信息]
     */
    private function matchUserAndPwd($type)
    {
        $res = db('user')->where('user_' . $type, $this->datas['user_name'])->where('user_pwd', md5($this->datas['user_pwd']))->find();
        // $res = db('user')->where('user_' . $type, $this->datas['user_name'])->where('user_pwd', $this->datas['user_pwd'])->find();

        if (!empty($res)) {
        // 登录之后用session保存个人信息
         session('userinfo', $res);
            unset($res['user_pwd']);
            $this->returnMsg(200, '登陆成功！', $res);
        } else {
            $this->returnMsg(400, '登陆失败！', $res);
        }
    }

}
