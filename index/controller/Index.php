<?php
namespace app\index\controller;

class Index extends Common
{

    private $obj;

    public function _initialize()
    {
        parent::_initialize();
       $this->obj = Model('Index');

    }

    public function index()
    {
    	//首页轮播图
        $slidernews = $this->obj->slider_news(); 
        // dump($slidernews);die;
        //首页五个logo
        $brokerslogo=$this->obj->get_rec_brokers();
        //首页最新case列表
        $newestcase=$this->obj->get_newest_case_list($map=null);
        $data1_newcase = $newestcase["data1"];
        $data2_newcase = $newestcase["data2"];
        //首页最新已回复case列表
        $repliedcase=$this->obj->get_replied_case_list();
        $data1_repliedcase = $repliedcase["data1"];
        $data2_repliedcase = $repliedcase["data2"];
        //首页最新已完成case列表
        $donecase=$this->obj->get_done_case_list();
        $data1_donecase = $donecase["data1"];
        $data2_donecase = $donecase["data2"];
        //首页news列表
        $newslist=$this->obj->get_news_list();
        //首页口碑排行列表
        $getrank=$this->obj->get_rank_list();
        // dump($getrank);die;
        //首页黑平台排行列表
        $blackrank=$this->obj->get_black_rank();
        // dump($repliedcase);die;

        $this->assign(array(
            'slidernews'=>$slidernews,
            'brokerslogo'=>$brokerslogo,
            'data1_newcase'=>$data1_newcase,
            'data2_newcase'=>$data2_newcase,
            'data1_repliedcase'=>$data1_repliedcase,
            'data2_repliedcase'=>$data2_repliedcase,
            'data1_donecase'=>$data1_donecase,
            'data2_donecase'=>$data2_donecase,
            'newslist'=>$newslist,
            'getrank'=>$getrank,
            'blackrank'=>$blackrank,
            ));
        return view();
    }


    
}
