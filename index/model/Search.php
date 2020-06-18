<?php
namespace app\index\model;
use think\Model;
class Search  extends Model
{
    public function get_news_list(){

        $map['a.is_delete']  = 0;
            $ret=db('article')
            ->where($map)
            ->field('a.myid,a.title,a.thumb,a.abstract,a.rec,a.time,b.head_img_url,b.name')
            ->alias('a')
            ->join('bk_user b','a.user_id=b.id')
            ->order('a.id desc')
            ->limit(8)
            ->select();   
            return $ret;
    }
}
