<?php
namespace app\index\controller;
class User extends Common
{
    private $obj;

    public function _initialize()
    {  

        parent::_initialize();
       $this->obj = Model('User');

    }


    public function c_register()
    {
        
        return view();
    }

    public function c_login()
    {
        
        return view();
    }

    public function c_findpassword()
    {
        
        return view();
    }

    public function c_person_info()
    {
        $this->checkLoginTp5();
        if(request()->isPost()){
            $data=input('post.');
            // dump($data);die;
            $validate = \think\Loader::validate('User');
            if(!$validate->scene('person_info')->check($data)){
                $this->error($validate->getError());
            }
            $savenum= $this->obj->save_user_info($data);
            // dump($savenum);die;
            if($savenum == 1){
                $res=db('user')->where('id', session('userinfo')['id'])->find();
                session('userinfo',$res);//这里可以优化
                // session('userinfo')['name']=$data['name'];
                // session('userinfo')['user_sex']=$data['user_sex'];
                // session('userinfo.user_mood')=$data['user_mood'];
                // session($username . '_code', $md5_code);
                // dump(session('userinfo')['user_mood']);die;
                $this->success('修改成功！');
            }else{
                $this->error('修改失败！');
            }
            return;
        }
        
        if(request()->isGet()){
        if(!session('userinfo')){
            $this->error('页面不存在',url('index/index'));
        }
        $userinfo['name'] = session('userinfo')['name'];
        $userinfo['user_sex'] = session('userinfo')['user_sex'];
        $userinfo['user_mood'] = session('userinfo')['user_mood']; 
        $this->assign('userinfo',$userinfo);
         return view();   
        }

 
     
    }

    public function c_person_info_address()
    {
        
        return view();
    }
    
    public function mycaselist()
    {
        $this->checkLoginTp5();
        return view();
    }

    public function brokercenter()
    {   
        if(!session('userinfo')['is_shang']){
                 $this->error('您还没有开通该功能',url('index/user/c_person_info'));
            }
        
        return view();
    }

    public function myarticles()
    {
        $this->checkLoginTp5();
        return view();
    }

    public function c_person_safe()
    {   
        $this->checkLoginTp5();
        $useremail = session('userinfo.user_email');
        $userphone = session('userinfo.user_phone');
        $this->assign(array(
        'useremail'=>$useremail,
        'userphone'=>$userphone,
        ));
        
        return view();
    }
    public function c_person_tx()
    {   
        $this->checkLoginTp5();
        $userimg = session('userinfo.head_img_url');
        $this->assign('userimg',$userimg);
        return view();
    }

    public function c_person_fan()
    {
        $this->checkLoginTp5();
        return view();
    }

    public function c_black_list()
    {
        $this->checkLoginTp5();
        return view();
    }


    public function c_person_follow()
    {
        $this->checkLoginTp5();
        return view();
    }

    public function c_person_messages()
    {
        $this->checkLoginTp5();
        return view();
    }

    public function msg_tools()
    {
        $this->checkLoginTp5();
        $user_head = session('userinfo.head_img_url');
        $this->assign('user_head',$user_head);
        return view();
    }
    
    public function c_change_email()
    {
        $user_email = session('userinfo.user_email');
        // dump($user_email );die;
        $this->assign('user_email',$user_email);
        return view();
    }
    public function c_change_phone()
    {
        $user_phone = session('userinfo.user_phone');
        $country_code = session('userinfo.country_code');
        // dump($user_email );die;
        $this->assign(array(
        'areacode'=>$country_code,
        'user_phone'=>$user_phone,
        ));
        return view();    
    }

    public function logout() {
        session('userinfo',null);
        $this->redirect(url('index/index/index'));
    }

    public function casedetail()
    {
        //基本信息
        $this->checkLoginTp5();
        $myid = input('myid');
        $data_u = db('case')->where('myid',$myid)->find();
        // dump($data_u);die;
        if(session('userinfo.company_id')== $data_u['broker_id'] || session('userinfo.id')==$data_u['user_id'] ){
        // dump($broker_id1);die;
        $basic_info=$this->obj->basic_info($myid);
        $case_broker = $this->obj->broker_info($basic_info['broker_id']);
        $case_pgs = $this->obj->case_progress($basic_info['id']);
        $rec_case=$this->obj->get_rec_case_list();
        //本周曝光最多
        $blacklist=$this->obj->get_black_list();
        // dump($basic_info);die;

        $this->assign(array(
            'basic_info'=>$basic_info,
            'case_broker'=>$case_broker,
            'case_pgs'=>$case_pgs,
            'rec_case'=>$rec_case,
            'blacklist'=>$blacklist,
            ));
        return view();
        }else{
            $this->error('您无权访问该页面',url('index/user/c_person_info'));
        }

    }
    
}
