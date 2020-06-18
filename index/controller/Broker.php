<?php
namespace app\index\controller;

class Broker extends Common
{

    private $obj;

    public function _initialize()
    {
        parent::_initialize();
       $this->obj = Model('Broker');

    }

    public function index()
    {
        $myid = input('myid');
        // $myid = 888888888;
        //获取国家列表
        $nations=db("country")->column("id,c_name,flag");
        //获取status状态列表
        $r_status=db('regulation_status')->column("id,name,color");
        //获取broker表基本信息
        $basic_info = $this->obj->basic_info($myid,$r_status); 
        $basic_info['r_country'] = $nations[$basic_info['r_country']]['flag'];
        //获取risk表基本信息
        $risk_info = $this->obj->risk_info($basic_info['id']); 
        //获取监管信息
        $regulation_info = $this->obj->regulation_info($basic_info['id'],$nations,$r_status); 
        //获取大数据评级
        $bigdata_info = $this->obj->bigdata_info($basic_info['id']); 
        //官方评级 TOP10
        $top10 = $this->obj->top10(); 
        //网友印象(head)
        $impresslist = $this->obj->impresslist($basic_info['id'],6); 
        //网友印象(foot)
        $impresslist2 = $this->obj->impresslist($basic_info['id'],45); 
        //右边最新投诉
        $newestlist = $this->obj->caselist($basic_info['id'],0);//最新
        //右边已回复 
        $repliedlist = $this->obj->caselist($basic_info['id'],1);//已回复
        //右边已完成
        $donelist = $this->obj->caselist($basic_info['id'],2);//已回复
        //右侧交易商新闻
        $brokernews = $this->obj->broker_news($basic_info['id']);//已回复
        //mt4弹框
        $mt4server = json_encode($this->obj->mt4server($basic_info['id']));//已回复
        //假冒他的
        $fake_brokers = $this->obj->fake_brokers($basic_info['id']);
        //公司图片
        $doclink_list = $this->obj->doclink_list($basic_info['id']);
        //公司高层
        $staff_list = $this->obj->staff_list($basic_info['id']);

        //计算评论等，需redis优化
        $rank = $this->obj->counting_func($basic_info['id']);

        //与全部平台相比
        $comparing = $this->obj->comparing($basic_info['id']);

        // $getvideores=new \app\index\model\Video();
        $json_regulation = json_encode($regulation_info);

        $basic_info['id'] = $myid;
        // dump($staff_list);die;
 
        $this->assign(array(
            'basic_info'=>$basic_info,
            'impresslist'=>$impresslist,
            'impresslist2'=>$impresslist2,
            'top10'=>$top10,
            'risk_info'=>$risk_info,
            'regulation_info'=>$regulation_info,
            'bigdata_info'=>$bigdata_info,
            'newestlist'=>$newestlist,
            'repliedlist'=>$repliedlist,
            'donelist'=>$donelist,
            'brokernews'=>$brokernews,
            'mt4server'=>$mt4server,
            'fake_brokers'=>$fake_brokers,
            'doclink_list'=>$doclink_list,
            'staff_list'=>$staff_list,
            'json_regulation'=>$json_regulation,
            'myid'=>$myid,
            'comparing'=>$comparing,
            'rank'=>$rank,
            ));
        return view();
    }


    public function companypics(){

        $id=db('broker')->where('myid',input('myid'))->value('id');
        // dump($id);die;

        $map['broker_id']  = $id;
        $map['is_delete']  = 0;
        $cateres=db('company_pics')
        ->where($map)
        ->field('pics,title')
        ->order('sort desc')->select();
        // dump($cateres);die;
        $this->assign(array(
            'cateres'=>$cateres,
            ));
        return view();
    }
    
}
