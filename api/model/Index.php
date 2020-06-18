<?php
namespace app\api\model;
use think\Model;
use think\Db;
// use app\index\model\Cate;

class Index extends Model
{
    
    public function get_newslist($data){

        $map['a.is_delete']  = 0;

        if($data['cate_id']===2){
            $map['a.status']  =array(array('gt',3),array('lt',7));
        }

        if($data['cate_id']===3){
            $map['a.status']  = array('gt',6);
        }

        if($data['cate_id']===4){
            $ret=db('article')
            ->where($map)
            ->field('a.myid,a.title,a.thumb,a.abstract,a.rec,a.time,b.head_img_url,b.name')
            ->alias('a')
            ->join('bk_user b','a.user_id=b.id')
            ->order('a.id desc')
            ->paginate($data['num']);   
            // dump($ret);die;
            return $ret;
        }

           //默认cate=1
            $ret['data1']=db('case')
            ->where($map)
            ->field('a.myid,a.title,a.details,a.status,a.require,a.is_hot,a.time,b.head_img_url,b.name')
            ->alias('a')
            ->join('bk_user b','a.user_id=b.id')
            ->order('a.id desc')
            ->paginate($data['num']);   

            $ret['data2']=db('case')
            ->where($map)
            ->field('b.logo_url,b.name_cn')
            ->alias('a')
            ->join('bk_broker b','a.broker_id=b.id')
            ->order('a.id desc')
            ->paginate($data['num']);  
            // dump($ret);die;

            return $ret;

        // return $datas_all; 
    }

 

 
 


}
