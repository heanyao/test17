<?php

namespace app\api\controller;
use think\Request;

header('content-type:application/json;charset=utf-8');

class Cases extends Common
{

    private $obj;
    private $uid;

    public function _initialize()
    {
       $this->obj = Model('Cases');
       $this->uid = (int)session('userinfo.id'); //上线再打开
       // $this->uid = 1;
    }
 
    //所有评论获取
    public function getmessages()
    {
        //加载渲染时的评论数据
        if (Request::instance()->isPost()){
            $datas['case_id']=input('post.case_id');  
            $datas['case_id']= db('case')->where('myid',$datas['case_id'])->value('id');
            $datas['support']=(int)input('post.support');

                if (!isset($datas['num'])) {
                    $datas['num'] = 10;
                }

                if (!isset($datas['support'])) {
                    $datas['support'] = '';
                }
                // dump($datas);die;

            $res=$this->obj->getmsg($datas);
        };

        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '操作成功！', $res);
    }


    //一级评论提交
    public function leavemessages()
    {
 
        //POST提交时提交的评论数据
        if (Request::instance()->isPost()){
            $this->checkLogin();//上线再打开
            $datas['case_id']=input('post.case_id'); 
            //后期可优化
            $datas['case_id']= db('case')->where('myid',$datas['case_id'])->value('id');
            $datas['msg']=input('post.msg');   
            $datas['netizen_id']= $this->uid; 

            $datas['create_time'] = time();

            if(!$datas['msg']){
                $this->returnMsg(400, '留言不能为空！');
            }

            if(!$datas['case_id']){
                $this->returnMsg(400, '本文id不能为空！');
            }

            //图片上传 使用 broker模块的上传
            $datas['comment_pics']=input('post.images');

            // dump($datas);die;

            //2. 往数据库插入文章信息
            $res = db('case_comments')->insertGetId($datas);   
        }

        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '操作成功！', $res);
    }


    //二级及以上的评论提交
    public function subcomments()
    {
         
        //POST提交时提交的评论数据
        if (Request::instance()->isPost()){
            $this->checkLogin();//上线再打开
            $postdata['pid']= (int)input('post.commentid');
            $postdata['case_id']= input('post.case_id');
            // dump($postdata);die;
            $postdata['case_id']= db('case')->where('myid',$postdata['case_id'])->value('id');
            $postdata['msg']= input('post.msg');
            $postdata['netizen_id']= $this->uid;     
            $postdata['create_time'] = time();

            if(!$postdata['msg']){
                $this->returnMsg(400, '留言不能为空！');
            }
            if(!$postdata['pid']){
                $this->returnMsg(400, 'pid不能为空！');
            }
            if(!$postdata['case_id']){
                $this->returnMsg(400, '本文id不能为空！');
            }
            //图片上传 使用 broker模块的上传
            $postdata['comment_pics']=input('post.images');

            //2. 往数据库插入文章信息
            $res = db('case_comments')->insertGetId($postdata);   

            }
 
        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '操作成功！', $res);
    }

    //对本case的支持
    public function addding()
    {
        $this->checkLogin();//上线再打开
        $artId = input('case_id');
        $type = 1;
        $userId = $this->uid;
        $ret = $this->obj->addDing($artId, $userId, $type);
        // dump($ret);die;
        if ($ret === false) {
            $this->returnMsg(400, '您已经支持过了');
        }

        if ($ret['code']  === 'delete200') {
            $this->returnMsg('delete200', 'delete200操作成功!');
        } 

        if ($ret['code']  === 'add200') {
            $this->returnMsg('add200', '您已成功顶该文! 请刷新页面',$ret);
        }      
    }    

    //对本case评论的ding
    public function cmt_add_ding()
    {
        $this->checkLogin();
        $artId = input('comment_id');
        $type = input('type');
        $userId = session('userinfo')['id'];//上线再打开
        // $userId = 1;
        $ret = $this->obj->cmt_addDing($artId, $userId, $type);
        // dump($ret);die;
        if ($ret === false) {
            $this->returnMsg(400, '请勿再顶! 明天再来');
        }

        if ($ret['code']  === 'delete200') {
            $this->returnMsg('delete200', 'delete200操作成功!',$ret);
        } 

        if ($ret['code']  === 'add200') {
            $this->returnMsg('add200', '您已成功顶该文! 请刷新页面',$ret);
        }      
    }


    public function supporters()
    {

        $case_id =input('case_id');

        $data=$this->obj->supporter_list($case_id);

        // dump($data);die;

        $this->returnMsg(200, '操作成功！', $data);

    }

    //我的个人中心-我的投诉
    public function mycaselist()
    {       
            $this->checkLogin();//上线再打开
            $data['cate_id']=(int)input('cate_id');  
            $data['user_id']=$this->uid ;
            $data['num'] = 10;

            $res=$this->obj->get_mycase($data);

            //限制对方获取数据,同时search.js的$('.left_click_load_more').css('display', 'none')也要改对应的页数
            // $arr = $res->toArray();
            // if($arr['current_page']>3){
            //     $res=[];
            // }
            // dump($res);die;
        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '操作成功！', $res);
    }

    //我的个人中心-交易商中心
    public function mydealcase()
    {       
            $this->checkLogin();//上线再打开
            $data['cate_id']=(int)input('cate_id');  
            $data['user_id']=$this->uid ;
            $data['num'] = 10;

            $res=$this->obj->mydeal_case($data);

            //限制对方获取数据,同时search.js的$('.left_click_load_more').css('display', 'none')也要改对应的页数
            // $arr = $res->toArray();
            // if($arr['current_page']>3){
            //     $res=[];
            // }
            // dump($res);die;
        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '操作成功！', $res);
    }

// 图片的上传
    public function upload()
    {    
        $this->checkLogin();//上线再打开
        $file = request()->file('images');
        // dump( $file );die;
        $file = $this->obj->uploadOne($file);

        $this->returnMsg($file['code'], '成功与否看code', $file['data']);
    }



}


