<?php

namespace app\api\controller;
use think\Request;

header('content-type:application/json;charset=utf-8');

class Myform extends Common
{

    private $obj;
    public $data;

    public function _initialize()
    {
       $this->obj = Model('Myform');
       // $this->uid = (int)session('userinfo.id');
       $this->uid = 2;

    }
 
    //提交投诉表单时的企业下拉选择
    public function searchapi()
    {

            $data['keyword']=input('keyword');

                if (!isset($data['num'])) {
                    $data['num'] = 5;
                }

                // dump($datas);die;

            $res=$this->obj->get_search($data);

        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '操作成功！', $res);
    }


    //接收投诉表单内容
    public function submitcase()
    {

            // $this->checkLogin();//上线再打开
            $request = Request::instance();
            $mydata=$request->post();

            // dump($mydata);die;

            if(isset($mydata['myid'])){
                $mydata['broker_id'] = db('broker')->where('myid',$mydata['myid'])->value('id');
            } 
     
            $mydata['user_id'] = $this->uid;
            $mydata['time'] = time();//上线要用session取
            $mydata['myid'] = date('Ymd').substr(implode(NULL, array_map('ord', str_split(substr(uniqid(), 7, 13), 1))), 0, 8);//生成随机订单号（当前日期加上8位随机数 2016071199575151）

            // dump($mydata['myid']);die;

            $res=db('case')->insert($mydata);

        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '提交成功！', $res);
    }

// 图片的上传
    public function upload()
    {    
        // $this->checkLogin();//上线再打开
        $file = request()->file('images');
        // dump( $file );die;
        $file = $this->obj->uploadOne($file);

        $this->returnMsg($file['code'], '成功与否看code', $file['data']);
    }

    //接收追加投诉表单内容
    public function addcase()
    {

            // $this->checkLogin();//上线再打开
            $request = Request::instance();
            $mydata=$request->post();

            //mycase_id求出真case id
            if(isset($mydata['pid'])){
                $mydata['pid'] = db('case')->where('myid',$mydata['pid'])->value('id');
            } 

            $mydata['user_id'] = $this->uid;
            $mydata['time'] = time();

            $res=db('case_progress')->insert($mydata);

        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //更新case状态
            $update_case=db('case')->where('id', $mydata['pid'])->update(['status' => 5]);

            $this->returnMsg(200, '提交成功！', $res);    

        }

    //平台回复投诉表单内容
    public function replycase()
    {

            // $this->checkLogin();//上线再打开
            $request = Request::instance();
            $mydata=$request->post();

            //mycase_id求出真case id
            if(isset($mydata['pid'])){
                $mydata['pid'] = db('case')->where('myid',$mydata['pid'])->value('id');
            } 

            $mydata['user_id'] = $this->uid;
            $mydata['time'] = time();
            //存入商家状态
            $mydata['status'] = 4;

            // dump($mydata);die;

            $res=db('case_progress')->insert($mydata);

        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //更新case状态
            $update_case=db('case')->where('id', $mydata['pid'])->update(['status' => 4]);
          
            $this->returnMsg(200, '提交成功！', $res);    

        }


    //提交确认时存入五星评价
    public function rate(){
        $request = Request::instance();
        $data=$request->post();
        $data['user_id']= $this->uid;
        $res = $this->obj->save_rate($data);

        if (!$res) {
            $this->returnMsg(400, '暂无数据！');
        } 

        $this->returnMsg(200, '操作成功！', $res);
    }


}



