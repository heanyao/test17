<?php

namespace app\api\controller;
use think\Request;

header('content-type:application/json;charset=utf-8');

class Search extends Common
{

    private $obj;
    // private $uid;

    public function _initialize()
    {
       $this->obj = Model('Search');
       // $this->uid = (int)session('userinfo.id');
       // $this->uid = 1;
    }
 
    //首页搜索实现
    public function searchapi()
    {

            $data['type']=(int)input('type');  
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

    //搜索主页实现
    public function searchmore()
    {

            $data['type']=(int)input('type');  
            $data['keyword']=input('keyword');
            $data['num'] = 10;

            $res=$this->obj->get_more_search($data);

            //限制对方获取数据,同时search.js的$('.left_click_load_more').css('display', 'none')也要改对应的页数
            $arr = $res->toArray();
            if($arr['current_page']>3){
                $res=[];
            }
            // dump($res);die;
        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '操作成功！', $res);
    }


}



 