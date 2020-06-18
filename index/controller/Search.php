<?php
namespace app\index\controller;

class Search extends Common
{

    private $obj;

    public function _initialize()
    {
        parent::_initialize();
       $this->obj = Model('Search');

    }

    public function index()
    {

        $newslist=$this->obj->get_news_list();
        // dump($newslist);die;

        $this->assign(array(
            'newslist'=>$newslist,

            ));
        return view();
    }


    
}
