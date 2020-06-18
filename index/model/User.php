<?php
namespace app\index\model;
use think\Model;
class User  extends Model
{
    public function save_user_info($data){
        $res = db('user')->where('id', session('userinfo')['id'])->update($data);
        return $res;
    }

    public function basic_info($myid){

        $tag=db("case_tag")->column("id,name");
        // dump($tag);die;

        $map['a.is_delete']  = 0;
        $map['a.myid']  = $myid;
            $ret=db('case')
            ->where($map)
            ->field('a.id,a.title,a.require,a.money,a.private_details,a.broker_id,a.is_hidefile,a.tag,a.details,a.images,a.time,a.status,a.myid,a.s_speed,a.s_service,a.s_satisfation,b.head_img_url,b.name,b.user_email,b.user_phone')
            ->alias('a')
            ->join('bk_user b','a.user_id=b.id')
            ->find();

            //判断is_hidefile为1则图片为空
            // if($ret['is_hidefile']){
            //     $ret['images']=null;
            // }
            //不为空则切割图片
            $ret['tag'] = $tag[$ret['tag']];
            if($ret['images']){
                $ret['images']=explode(",",$ret['images']);
            }


        return $ret;
    }

    public function broker_info($broker_id){

        $map['a.is_delete']  = 0;
        $map['a.id']  = $broker_id;

        $ret=db('broker')
        ->where($map)
        ->field('a.myid,a.name_cn,a.name_en,a.logo_url,a.avg_rate,a.tag_year,a.tag_regulation,a.tag_license,a.tag_mt4,b.name as status,b.color')
        ->alias('a')
        ->join('bk_regulation_status b','a.status=b.id')
        ->order('a.avg_rate desc,a.id desc')
        ->find();
        return $ret;
    }

    public function case_progress($pid){

        $map['a.is_delete']  = 0;
        $map['a.pid']  = $pid;
            $ret=db('case_progress')
            ->where($map)
            ->field('a.imgs,a.time,a.status,a.content,a.hidden_content,a.is_hidefile,b.head_img_url,b.name')
            ->alias('a')
            ->join('bk_user b','a.user_id=b.id')
            ->order('time desc')
            ->paginate()
            ->each(function($item, $key){
                // if($item['is_hidefile']){
                //     $item['imgs']=null;
                // }
                if($item['imgs']){
                    $item['imgs']=explode(",",$item['imgs']);
                }
                return $item;
            });

        return $ret;
    }

    public function get_rec_case_list(){

        $map['a.is_delete']  = 0;
        $map['a.status'] = array('gt',1);
        $tag=db("case_tag")->column("id,name");
           //默认cate=1
            $ret=db('case')
            ->where($map)
            ->field('a.myid,a.title,a.details,a.tag,a.time,b.head_img_url,b.name')
            ->alias('a')
            ->join('bk_user b','a.user_id=b.id')
            ->order('a.id desc')
            ->paginate(3)
            ->each(function($item, $key)use($tag){
                $item['tag'] = $tag[$item['tag']];
                return $item;
            });
            return $ret;
    }

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
