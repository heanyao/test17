<?php
namespace app\index\model;
use think\Model;
class Broker  extends Model
{

    public function basic_info($myid,$r_status){
        $ret=db('broker')
        ->where('myid',$myid)
        ->field('id,logo_url,intro,tel,web_cn,web_en,name_cn,name_en,address,found_year,email,wechat,avg_cost,avg_exc,avg_fund,avg_slip,avg_stable,avg_service,avg_rate,tag_year,tag_regulation,tag_license,tag_mt4,status,future_index,r_country,support_rate,good_cmt_num,general_cmt_num,bad_cmt_num,comment_sum')
        ->find();
        $ret['web_en']= explode(",",$ret['web_en']);
        $ret['web_cn']= explode(",",$ret['web_cn']);
        $ret['status']= $r_status[$ret['status']];
        return $ret;

    }

    public function risk_info($id){

        $map['is_delete']  = 0;
        $map['broker_id'] = $id;  
        $ret=db('risk')
        ->where($map)
        ->field('id,content,level')
        ->order('id desc')
        ->select();
        return $ret;

    }

    public function regulation_info($id,$nations,$r_status){

        $level = $arrayName = array('1' => '高' , '2' => '中', '3' => '低');
        $license_type=db("license_type")->column("id,ls_name");

        $map['broker_id'] = $id;  
            $ret=db('regulation')
            ->where($map)
            ->field('a.id,a.r_name,a.r_email,a.r_add,a.r_web,a.active_time,a.expire_time,a.r_tel,a.license_type,a.license_number,a.status,a.scope,a.r_level,b.c_name_en,b.c_name_cn,b.dsc,b.country_id,b.c_logo')
            ->alias('a')
            ->join('bk_commission b','a.commission_id=b.id')
            ->order('a.r_level asc')
            ->paginate()
            ->each(function($item, $key)use($nations,$r_status,$level,$license_type){
                $r_ret = db('file_link')->field('file_name,link')->where('regulation_id',$item['id'])->select();
                $item['file_link'] = $r_ret;
                $item['country_id'] = $nations[$item['country_id']];
                $item['status'] = $r_status[$item['status']];
                $item['license_type'] = $license_type[$item['license_type']];
                $item['r_level'] = $level[$item['r_level']];
                return $item;
            });

            if($ret->isEmpty()){
                $ret=null;
            }

        return $ret;

    }


    public function bigdata_info($id){

        $map['is_delete']  = 0;
        $map['broker_id'] = $id;  
        $ret=db('bigdata_rate')
        ->where($map)
        ->find();
        return $ret;

    }


    public function top10(){

        $map['is_delete']  = 0;
        $ret=db('broker')
        ->where($map)
        ->field('myid,name_cn,tiny_logo,future_index')
        ->order('future_index desc')
        ->limit(10)
        ->select();
        return $ret;

    }

    public function impresslist($id,$num){

        $map['is_delete']  = 0;
        $map['broker_id'] = $id;
        $ret=db('impress')
            ->field('content,count(content) as count')
            ->group('content')
            ->where($map)
            ->order('count desc')
            ->limit($num)
            ->select();
        // dump($ret);die;
        // $ret=db('broker')
        // ->where($map)
        // ->field('myid,name_cn,name_en,logo_url,future_index')
        // ->order('future_index desc')
        // ->limit(10)
        // ->select();
        return $ret;
    }

    //右侧投诉分类
    public function newestcase()
    {   
       $id=input('post.broker_id');  
       $progress=input('post.progress');  //'alredayreply' 'alldone'或默认不传
       $list = $this->obj->newest_case($id,$progress);
       $this->returnMsg(200, '操作成功！', $list);
    }


    public function caselist($id,$progress){
        $map['a.broker_id']  = $id;
        $map['a.is_delete']  = 0;
        $tag = db('case_tag')->column('id,name'); 
        // dump($res);die;
        if($progress===1){
           $map['a.status']  =array(array('gt',3),array('lt',7));
        }

        if($progress===2){
           $map['a.status']  = array('gt',6);
        }

        $data=db('case')->where($map)
        ->field('a.id,a.title,a.tag,a.time,a.images,a.is_hidefile,b.name,b.head_img_url')
        ->alias('a')
        ->join('bk_user b','a.user_id=b.id')
        ->order('id desc')
        ->paginate(10)->each(function($item, $key)use($tag){
            $item['tag'] = $tag[$item['tag']];
            if($item['is_hidefile'] != 1&& $item['images']!=null){
                $item['images'] = explode(",",$item['images'])[0];
            }else{
                $item['images'] = null;
            }
            return $item;
          });
        // dump($data);die;
        return $data;
    }


    public function broker_news($id){
        $map['a.company_id']  = $id;
        $map['a.is_delete']  = 0;
        $data=db('article')->where($map)
        ->field('a.myid,a.title,a.thumb,a.time,b.name_en,b.name_cn,b.tiny_logo')
        ->alias('a')
        ->join('bk_broker b','a.company_id=b.id')
        ->order('a.id desc')
        ->paginate(10);
        // dump($data);die;
        return $data;
    }


    public function mt4server($id){
        $map['a.broker_id']  = $id;
        $map['a.is_delete']  = 0;
        $data=db('mt4')->where($map)
        ->field('a.server_name as name,a.mt_type as mt,a.status,b.c_name as adr,b.flag as adr_icon')
        ->alias('a')
        ->join('bk_country b','a.country_id=b.id')
        ->order('a.id desc')
        ->select();

        // dump($data);die;
        return $data;
    }

    public function fake_brokers($id){

        $where['is_delete']  = 0;
        $where['real_broker']  = $id;

        $brokerid_list = db('fake_broker')->where($where)->column('fake_broker');

        // dump($brokerid_list);die;
        if(!$brokerid_list){
                $ret=null;
                return $ret;
            }

        $map['a.id'] = array('in',$brokerid_list);

        $map['a.is_delete']  = 0;

        $ret=db('broker')
        ->where($map)
        ->field('a.myid,a.name_cn,a.name_en,a.logo_url,a.avg_rate,a.tag_year,a.tag_regulation,a.tag_license,a.tag_mt4,b.name as status,b.color')
        ->alias('a')
        ->join('bk_regulation_status b','a.status=b.id')
        ->order('a.avg_rate desc,a.id desc')
        ->select();
        return $ret;
    }

    public function doclink_list($id){
        // dump($id);die;
        $map['broker_id']  = $id;
        $map['is_delete']  = 0;
        $cateres=db('doc_link')
        ->where($map)
        ->field('link')
        ->order('sort desc')->select();
        return $cateres;
    }

    public function staff_list($id){

    $map['broker_id']  = $id;
    $map['is_delete']  = 0;
    // dump($map);die;
    $cateres=db('staff')
    ->where($map)
    ->field('name,title,desc,head_img')
    ->order('sort desc')->select();
    return $cateres;

}
//sql语句需要优化
    public function counting_func($id){

    $map['broker_id']  = $id;
    $map['is_delete']  = 0;

    //推荐good_cmt_num更新
    $map['support']  = 1;  
    $ret1=db('broker_comments')
    ->where($map)
    ->count('support');    
    db('broker')->where('id',$id)->update(['good_cmt_num' => $ret1]);

    //一般更新
    $map['support']  = 2;  
    $ret2=db('broker_comments')
    ->where($map)
    ->count('support');    
    db('broker')->where('id',$id)->update(['general_cmt_num' => $ret2]);

    //不推荐
    $map['support']  = 3;  
    $ret3=db('broker_comments')
    ->where($map)
    ->count('support');    
    db('broker')->where('id',$id)->update(['bad_cmt_num' => $ret3]);

    $count_all=$ret1+$ret2+$ret3;
    db('broker')->where('id',$id)->update(['comment_sum' => $count_all]);

    // 将评论中星星的平均数存入sql
        $sql= " SELECT avg_cost + avg_exc + avg_fund +avg_slip + avg_stable+ avg_service as c FROM `bk_broker` where id = '".$id."'";
        $model=model('broker');
        $ret444 = $model->query($sql);
        $ret88 = round($ret444[0]['c']/6);
        db('broker')->where('id',$id)->update(['avg_rate' => $ret88]);

        //算出评级排名第几
        $sql2 = "SELECT b.id,b.name_cn,b.rownum FROM(SELECT t.*, @rownum := @rownum + 1 AS rownum FROM (SELECT @rownum := 0) r,(SELECT * FROM bk_broker ORDER BY `future_index` DESC) AS t) AS b where id = '".$id."'";
                $ret555 = $model->query($sql2);
                $rank = $ret555[0]['rownum'];
    // 发展指数平均数存入sql
        $sql8= " SELECT paizhao + jianguan + xinpi +yuqing + fengkong+ fuwu+jiaoyi+ruanjian as c FROM `bk_bigdata_rate` where broker_id = '".$id."'";
        $model=model('broker');
        $ret888 = $model->query($sql8);
        $ret888 = round($ret888[0]['c']/8);     
        db('broker')->where('id',$id)->update(['future_index' => $ret888]);

    // $map['support']  = 1; //推荐
    // // dump($map);die;
    // $ret=db('broker_comments')
    // ->where($map)
    // ->count('support');

    return $rank;

}


//与全部平台相比
    public function comparing($id){

    $map['broker_id']  = $id;
    $map['is_delete']  = 0;

    //推荐good_cmt_num更新
    // $map['support']  = 1;  
    // $ret1=db('broker_comments')
    // ->where($map)
    // ->count('support');    
    // db('broker')->where('id',$id)->update(['good_cmt_num' => $ret1]);

    $all_avg= ['avg_cost','avg_exc','avg_fund','avg_slip','avg_stable','avg_service'];

    $res = array();

    foreach ($all_avg as $key => $value) {
    $avg = db('broker')->where('is_delete',0)->avg($value);
    $myscore = db('broker')->where('id',$id)->value($value);
    $ret = round( $myscore/$avg , 3);  
    $res[]=$ret;
    }

    return $res;

}
    // public function get_rec_brokers(){

    //     $map['is_delete']  = 0;
    //     $map['id'] = array('in','1,5,8,3,4'); //首页broker logo改其id即可

    //     $ret=db('broker')
    //     ->where($map)
    //     ->field('id,name_cn,name_en,logo_url')
    //     ->order('id desc')
    //     ->limit(5)
    //     ->select();
    //     return $ret;
    // }

    // public function get_rank_list(){

    //     $map['is_delete']  = 0;

    //     $ret=db('broker')
    //     ->where($map)
    //     ->field('myid,name_cn,name_en,logo_url,avg_rate,tag_year,tag_regulation,tag_license,tag_mt4,status')
    //     ->order('avg_rate desc,id desc')
    //     ->limit(10)
    //     ->select();
    //     return $ret;
    // }

    // public function get_news_list(){

    //     $map['a.is_delete']  = 0;
    //         $ret=db('article')
    //         ->where($map)
    //         ->field('a.id,a.title,a.thumb,a.abstract,a.rec,a.time,b.head_img_url,b.name')
    //         ->alias('a')
    //         ->join('bk_user b','a.user_id=b.id')
    //         ->order('a.id desc')
    //         ->paginate(5);   
    //         return $ret;
    // }

}
