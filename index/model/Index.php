<?php
namespace app\index\model;
use think\Model;
class Index  extends Model
{
    public function slider_news(){

        $map['is_delete']  = 0;

        $ret=db('article')
        ->where($map)
        ->field('myid,title,thumb')
        ->order('rec desc,id desc')
        ->limit(4)
        ->select();
        return $ret;
    }

    public function get_rec_brokers(){

        $map['is_delete']  = 0;
        $map['id'] = array('in','1,5,8,3,4'); //首页broker logo改其id即可

        $ret=db('broker')
        ->where($map)
        ->field('myid,name_cn,name_en,logo_url')
        ->order('id desc')
        ->limit(5)
        ->select();
        return $ret;
    }

    public function get_rank_list(){

        $map['a.is_delete']  = 0;

        $ret=db('broker')
        ->where($map)
        ->field('a.myid,a.name_cn,a.name_en,a.logo_url,a.avg_rate,a.tag_year,a.tag_regulation,a.tag_license,a.tag_mt4,b.name as status,b.color')
        ->alias('a')
        ->join('bk_regulation_status b','a.status=b.id')
        ->order('a.avg_rate desc,a.id desc')
        ->limit(10)
        ->select();
        return $ret;
    }

    public function get_black_rank(){

        $map['a.is_delete']  = 0;

        $ret=db('broker')
        ->where($map)
        ->field('a.myid,a.name_cn,a.name_en,a.logo_url,a.avg_rate,a.tag_year,a.tag_regulation,a.tag_license,a.tag_mt4,b.name as status,b.color')
        ->alias('a')
        ->join('bk_regulation_status b','a.status=b.id')
        ->order('a.avg_rate asc,a.id asc')
        ->limit(10)
        ->select();
        return $ret;
    }

    public function get_case_list($map){

        $map['a.is_delete']  = 0;
           //默认cate=1
            $ret['data1']=db('case')
            ->where($map)
            ->field('a.myid,a.title,a.details,a.require,a.is_hot,a.status,a.time,b.head_img_url,b.name')
            ->alias('a')
            ->join('bk_user b','a.user_id=b.id')
            ->order('a.id desc')
            ->limit(5)
            ->select();   

            $ret['data2']=db('case')
            ->where($map)
            ->field('b.logo_url,b.name_cn')
            ->alias('a')
            ->join('bk_broker b','a.broker_id=b.id')
            ->order('a.id desc')
            ->limit(5)
            ->select();

            return $ret;
    }

    public function get_newest_case_list(){

        $map['a.status'] = array('gt',1);
        
        $ret = $this->get_case_list($map);

        return $ret;
    }


    public function get_replied_case_list(){

        $map['a.status']  =array(array('gt',3),array('lt',7));
        
        $ret = $this->get_case_list($map);

        return $ret;
    }


    public function get_done_case_list(){

        $map['a.status']  = array('gt',6);
        
        $ret = $this->get_case_list($map);

        return $ret;
    }


    public function get_news_list(){

        $map['a.is_delete']  = 0;
            $ret=db('article')
            ->where($map)
            ->field('a.myid,a.title,a.thumb,a.abstract,a.rec,a.time,b.head_img_url,b.name')
            ->alias('a')
            ->join('bk_user b','a.user_id=b.id')
            ->order('a.id desc')
            ->paginate(5);   
            return $ret;
    }

}
