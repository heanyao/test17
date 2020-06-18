<?php
namespace app\index\controller;

class Regulation extends Common
{

    private $obj;

    public function _initialize()
    {
        parent::_initialize();
       $this->obj = Model('Regulation');

    }

    public function index()
    {
    	//首页轮播图
        // $slidernews = $this->obj->slider_news(); 


        // $this->assign(array(
        //     'blackrank'=>$blackrank,
        //     ));
        return view();
    }


    
}
