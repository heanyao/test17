<?php
namespace app\index\model;
use think\Model;
class Article extends Model
{
    public function get_news_list(){

        $map['is_delete']  = 0;
            $ret=db('article')
            ->where($map)
            ->field('myid,title,thumb')
            ->order('rec desc,id desc')
            ->limit(3)
            ->select();   
            return $ret;
    }

    public function artinfo($id){
        $map['a.id']  = $id;
        $map['a.is_delete']  = 0;
        $data=db('article')->where($map)
        ->field('a.myid,a.title,a.user_id,a.thumb,a.comments_sum,a.keep_sum,a.abstract,a.content,a.time,a.views,a.ding_sum,b.name,b.head_img_url')
        ->alias('a')->join('bk_user b','a.user_id=b.id')
        ->find();
        // $data['user_id'] = encryptStr($data['user_id']);
        //判断如果用户登录了，有没有收藏过或顶过
        $data['is_ding'] = null;
        $data['is_keep'] = null;
        if(session('userinfo.id')){
            // dump(session('userinfo.id'));die;
           // $data['is_ding'] = db('artical_ding')->field('id')->where("article_id=:id and user_id=:userid")->bind(['id'=>$id,'userid'=>session('userinfo.id')])->find(); 
           $data['is_keep'] = db('article_keep')->field('id')->where("article_id=:id and user_id=:userid")->bind(['id'=>$id,'userid'=>session('userinfo.id')])->find(); 
        }
        // dump($data);die;
        return $data;
    }

    public function getRecArt(){
  
        $map['a.is_delete']  = 0;
        $data=db('article')->where($map)
        ->field('a.myid,a.title,a.time,b.name,b.head_img_url')
        ->alias('a')->join('bk_user b','a.user_id=b.id')
        ->order('a.id desc')
        ->limit(10)
        ->select();

        return $data;
    }

    public function newadd_pics($data){
 
                $file = request()->file('thumb');
                $info = $file->validate(['size'=>1567800,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
                if($info){
                    // $property_pics_url=ROOT_PATH . 'public' . DS . 'uploads'.'/'.$info->getExtension();
                    $property_pics_url= DS . 'uploads'. DS .$info->getSaveName();
                    $data['thumb']=$property_pics_url;
                    return $data;
                }
    }

    public function change_pics($data){
              $pics=db('article')->where(array('myid'=>$data['myid']))->find();
              // dump($pics);die;
              $picspath=$_SERVER['DOCUMENT_ROOT'].$pics['thumb'];
                if(file_exists($picspath)){
                  @unlink($picspath);//unlink会删除原图片，请根据需求选择
                }
                $file = request()->file('thumb');
                $info = $file->validate(['size'=>1567800,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
                if($info){
                    // $property_pics_url=ROOT_PATH . 'public' . DS . 'uploads'.'/'.$info->getExtension();
                    $property_pics_url= DS . 'uploads'. DS .$info->getSaveName();
                    $data['thumb']=$property_pics_url;
                    return $data;
                }
    }

    public function edit_art_info($id){
        $map['myid']  = $id;
        $map['is_delete']  = 0;
        $data=db('article')->where($map)
        ->field('myid,title,thumb,abstract,content')
        ->find();
        // $data['publisher_id'] = encryptStr($data['publisher_id']);
        return $data;
    }

    public function related_cpy($art_id){

        $status = db('regulation_status')->column('id,name,color');
        // dump($status);die;
  
        $map['a.article_id']  = $art_id;
        $map['a.company_id'] = array('lt',10000000);
        $data=db('art_related_cpy')->where($map)
        ->field('b.myid,b.name_cn,b.name_en,b.logo_url,b.avg_rate,b.tag_year,b.tag_regulation,b.tag_license,b.tag_mt4,b.status')
        ->alias('a')->join('bk_broker b','a.company_id=b.id')
        ->paginate()->each(function($item, $key)use($status){
            $item['status'] = $status[$item['status']];
            return $item;
        });

            if($data->isEmpty()){
                $data=null;
            }

        return $data;
    }

 



}
