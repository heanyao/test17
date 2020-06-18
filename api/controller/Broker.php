<?php

namespace app\api\controller;
use think\Request;

header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf-8');
class Broker extends Common
{

    private $obj;
    private $uid;

    public function _initialize()
    {
       $this->obj = Model('broker');
       // $this->uid = (int)session('userinfo.id'); //上线再打开
       $this->uid = 1;
    }
 
    //所有评论获取
    public function getmessages()
    {
        //加载渲染时的评论数据
        if (Request::instance()->isPost()){
            $datas['broker_id']=input('post.broker_id');  
            $datas['support']=input('post.support');

                if (!isset($datas['num'])) {
                    $datas['num'] = 10;
                }

                if (!isset($datas['support'])) {
                    $datas['support'] = null;
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
            // $this->checkLogin();//上线再打开
            $datas['broker_id']=input('post.broker_id');  
            $datas['support']=input('post.support'); 
            $datas['msg']=input('post.msg');   
            $datas['netizen_id']= $this->uid;  
             
            //6项评分接收
            $datas['rate_cost']= input('post.rate_cost');  
            $datas['rate_exc']= input('post.rate_exc');  
            $datas['rate_fund']= input('post.rate_fund');  
            $datas['rate_slip']= input('post.rate_slip');  
            $datas['rate_stable']= input('post.rate_stable');  
            $datas['rate_service']= input('post.rate_service');  

            //字符串拼接多个印象接收 eg. "很好,服务超棒,人善良" 印象最多只有3个
            $datas['impress']=input('post.impress');  

            // unset($datas['impress']);

            $datas['create_time'] = time();

                if(!$datas['support']){
                    $this->returnMsg(400, '请点击是否推荐！');
                }
            //图片上传
            // $datas['comment_pics']=$this->obj->upload();
            $datas['comment_pics']= input('post.images'); 

            // dump($datas);die;

            //2. 往数据库插入文章信息
            $res = db('broker_comments')->insertGetId($datas);   
        }

            //印象拆分并入impress表
            $ex_list = explode(",",$datas['impress']);
            $impress_data['broker_id']=input('post.broker_id'); 
            $impress_data['comment_id']=$res; 
            foreach ($ex_list as $k => $v) {
                $impress_data['content']=$v; 
                db('impress')->insertGetId($impress_data); 
            }

        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '操作成功！');
    }


    //二级及以上的评论提交
    public function subcomments()
    {
         
        //POST提交时提交的评论数据
        if (Request::instance()->isPost()){
            // $this->checkLogin();//上线再打开
            $postdata['pid']= (int)input('post.commentid');
            $postdata['broker_id']= (int)input('post.broker_id');
            $postdata['msg']= input('post.msg');
            $postdata['netizen_id']= $this->uid;     
            $postdata['create_time'] = time();
            //判断只有该商家才能评论该商家页面，其它商家不能评论别人家//上线再打开
            // if((int)session('userinfo.is_shang')){
            //     $res = db('user')
            //     ->where(['id'=>$this->uid,'company_id'=>$postdata['broker_id']])
            //     ->find();
            //     if(!$res){
            //         $this->returnMsg(400, '您仅能点评自己的公司！');
            //     }                
            // }

            //图片上传
            // $datas['comment_pics']=$this->obj->upload();
            $postdata['comment_pics']= input('post.images'); 

            //2. 往数据库插入文章信息
            $res = db('broker_comments')->insertGetId($postdata);   

            }
 
        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '操作成功！', $res);
    }

    //右侧投诉分类
    public function newestcase()
    {   
       $id=input('post.broker_id');  
       $progress=input('post.progress');  //'alredayreply' 'alldone'或默认不传
       $list = $this->obj->newest_case($id,$progress);
       $this->returnMsg(200, '操作成功！', $list);
    }

    //右侧交易商新闻
    public function brokernews()
    {   
       $id=input('post.broker_id');  
       $list = $this->obj->broker_news($id);
       $this->returnMsg(200, '操作成功！', $list);
    }

    //收藏
    public function addkeep()
    {
        // $this->checkLogin();//上线再打开
        $artId = input('post.broker_id');
        $type = input('type');
        // $userId = $this->uid; //上线再打开
        $userId = 1;
        $ret = $this->obj->addKeep($artId, $userId, $type);
        // dump($ret);die;
        if ($ret === false) {
            $this->returnMsg(400, '请刷新后再操作!');
        }

        if ($ret['code']  === 'delete200') {
            $this->returnMsg('delete200', '您已取消收藏!');
        } 

        if ($ret['code']  === 'add200') {
            $this->returnMsg('add200', '您已收藏成功!',$ret);
        }      
    }

    //顶的接口
    public function addding()
    {
        // $this->checkLogin();
        $artId = input('comment_id');
        $type = input('type');
        // $userId = session('userinfo')['id'];//上线再打开
        $userId = 1;
        $ret = $this->obj->addDing($artId, $userId, $type);
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

// 图片的上传
    public function upload()
    {
        $file = request()->file('images');
        $file = $this->obj->uploadOne($file);
        $msg=[
            'code'=>200,
            'data'=>$file
        ];
        return json_encode($msg,JSON_UNESCAPED_UNICODE);
    }

}
