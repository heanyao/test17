<?php
namespace app\index\controller;

class Cases extends Common
{

    private $obj;

    public function _initialize()
    {
        parent::_initialize();
       $this->obj = Model('Cases');

    }

    public function index()
    {
        //基本信息
        // dump('111');die;
        $myid = input('myid');
        $basic_info=$this->obj->basic_info($myid);
        // dump($myid);die;
        
        $case_broker = $this->obj->broker_info($basic_info['broker_id']);
        $case_pgs = $this->obj->case_progress($basic_info['id']);
        $rec_case=$this->obj->get_rec_case_list();
        //本周曝光最多
        $blacklist=$this->obj->get_black_list();
        // dump($case_pgs);die;

        $this->assign(array(
            'basic_info'=>$basic_info,
            'case_broker'=>$case_broker,
            'case_pgs'=>$case_pgs,
            'rec_case'=>$rec_case,
            'blacklist'=>$blacklist,
            ));
        return view();
    }


    
}
