<?php

namespace app\api\controller;
use think\Request;

header('content-type:application/json;charset=utf-8');

class Regulation extends Common
{

    private $obj;

    public function _initialize()
    {
       $this->obj = Model('Regulation');

    }
 
    // 监管分类获取交易商列表  分页会泄露所有数据，需要改进
    public function brokerlist()
    {

        $commission_id =(int)input('regulation_id');  
        // $res=$this->obj->get_commission_info($commission_id);
        $res=$this->obj->get_broker_list($commission_id);

        if ($res == null) {
            $this->returnMsg(400, '暂无数据！');
        } 
            $this->returnMsg(200, '操作成功！', $res);
    }


    //新闻栏目
    // public function newslist()
    // {

    //         $data['cate_id']=(int)input('cate_id');  
    //         $data['page']=input('page');

    //             if (!isset($data['num'])) {
    //                 $data['num'] = 10;
    //             }

    //             if (!isset($data['page'])) {
    //                 $data['page'] = 1;
    //             }

    //         $res=$this->obj->get_newslist($data);

    //     if ($res == null) {
    //         $this->returnMsg(400, '暂无数据！');
    //     } 
    //         //响应数据给客户端
    //         $this->returnMsg(200, '操作成功！', $res);
    // }





}
