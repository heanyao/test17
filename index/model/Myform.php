<?php
namespace app\index\model;
use think\Model;
class Myform  extends Model
{
    public function get_black_list(){

        $map['is_delete']  = 0;

        $ret=db('broker')
        ->where($map)
        ->field('myid,name_cn,name_en,logo_url')
        ->order('avg_rate asc,id asc')
        ->limit(10)
        ->select();
        return $ret;
    }

}
