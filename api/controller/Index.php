<?php

namespace app\api\controller;
use think\Request;

header('content-type:application/json;charset=utf-8');

class Index extends Common
{

    private $obj;

    public function _initialize()
    {
       $this->obj = Model('Index');

    }
 
    //新闻栏目
    public function newslist()
    {

            $data['cate_id']=(int)input('cate_id');  
            $data['page']=input('page');

                if (!isset($data['num'])) {
                    $data['num'] = 5;
                }

                if (!isset($data['page'])) {
                    $data['page'] = 1;
                }

            $res=$this->obj->get_newslist($data);
            // 限制爬虫
            if($data['cate_id']!=4){
            $arr1 = $res['data1']->toArray();
            if($arr1['current_page']>8){
                $res=null;
            }                
            }


        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            //响应数据给客户端
            $this->returnMsg(200, '操作成功！', $res);
    }





}
