<?php
namespace app\api\model;
use think\Model;
use think\Db;
// use app\index\model\Cate;

class Regulation extends Model
{

    public function get_broker_list($commission_id){

        //broker list
        $map['a.is_delete']  = 0;
        $map['a.commission_id']  = $commission_id;         

        $r_status=db('regulation_status')->column("id,name,color");

        $ret['logo_list']=db('regulation')
        ->where($map)
        ->field('b.logo_url,b.name_en,b.name_cn,b.myid,b.status,tag_year,tag_regulation,tag_license,tag_mt4,future_index,reply_rate,support_rate')
        ->alias('a')
        ->join('bk_broker b','a.broker_id=b.id')
        ->order('a.id desc')
        ->paginate(15)->each(function($item, $key)use($r_status){
                    $item['status'] = $r_status[$item['status']];
                    return $item;
                }); 

        //监管机构info
        $nations=db("country")->column("id,c_name,flag");
        $ret['commission_info'] = db('commission')
                                  ->where('id',$commission_id)
                                  ->field('id,c_name_cn,c_level,dsc,country_id,found_year,role,c_logo')
                                  ->find();
        $ret['commission_info']['country_id'] = $nations[$ret['commission_info']['country_id']];  

        return $ret;
    }

    // public function get_newslist($data){

    //     $map['a.is_delete']  = 0;

    //     if($data['cate_id']===2){
    //         $map['a.status']  =array(array('gt',3),array('lt',7));
    //     }

    //     if($data['cate_id']===3){
    //         $map['a.status']  = array('gt',6);
    //     }

    //     if($data['cate_id']===4){
    //         $ret=db('article')
    //         ->where($map)
    //         ->field('a.id,a.title,a.thumb,a.abstract,a.rec,a.time,b.head_img_url,b.name')
    //         ->alias('a')
    //         ->join('bk_user b','a.user_id=b.id')
    //         ->order('a.id desc')
    //         ->paginate($data['num']);   
    //         return $ret;
    //     }

    //        //默认cate=1
    //         $ret['data1']=db('case')
    //         ->where($map)
    //         ->field('a.id,a.title,a.details,a.status,a.require,a.is_hot,a.time,b.head_img_url,b.name')
    //         ->alias('a')
    //         ->join('bk_user b','a.user_id=b.id')
    //         ->order('a.id desc')
    //         ->paginate($data['num']);   

    //         $ret['data2']=db('case')
    //         ->where($map)
    //         ->field('b.logo_url,b.name_cn')
    //         ->alias('a')
    //         ->join('bk_broker b','a.broker_id=b.id')
    //         ->order('a.id desc')
    //         ->paginate($data['num']);  

    //         return $ret;

    //     // return $datas_all; 
    // }

 

 
 


}
