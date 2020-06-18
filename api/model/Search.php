<?php
namespace app\api\model;
use think\Model;
use think\Db;
// use app\index\model\Cate;

class Search extends Model
{
    
    public function get_search($data){
        //搜经纪商
        if($data['type']===1){
            $map['is_delete'] = 0;
            $lang = EnglishOrChinese($data['keyword']);
            if($lang===2){
                $map['name_cn'] = array('like', "%{$data['keyword']}%");  
                $ret=db('broker')
                ->field('myid as code,name_cn as name,tiny_logo')
                ->where($map)
                ->order('id desc')
                ->limit(5)
                ->select();
            }else{
                $map['name_en'] = array('like', "%{$data['keyword']}%");  
                $ret=db('broker')
                ->field('myid as code,name_en as name,tiny_logo')
                ->where($map)
                ->order('id desc')
                ->limit(5)
                ->select();
            }

        return $ret;  
        }
        //搜代理商
        if($data['type']===2){
            $map['is_delete'] = 0;
            $map['name_cn'] = array('like', "%{$data['keyword']}%");  
            $ret=db('ib')
            ->field('myid as code,name_cn as name,tiny_logo')
            ->where($map)
            ->order('id asc')
            ->limit(5)
            ->select();

        return $ret;  
        }
        //搜投诉
        if($data['type']===3){
            $ret=db('case')
            ->field('id,title')
            ->where('title','like',"%{$data['keyword']}%")
            ->whereOr('details','like',"%{$data['keyword']}%")
            ->order('id desc')
            ->limit(5)
            ->select();
        return $ret;  
        }
  
    }

     //跟上面的逻辑是一样的，只不过是加减了field的字段
    public function get_more_search($data){
        
        //搜经纪商
        //status:  1监管中2超限经营3普通注册4离岸监管5疑似套牌6套牌7已潜逃
        if($data['type']===1){
            $map['is_delete'] = 0;
            $nations=db("country")->column("id,c_name,flag");
            $r_status=db('regulation_status')->column("id,name,color");
            // dump($r_status);die;
            $lang = EnglishOrChinese($data['keyword']);
            if($lang===2){
                $map['name_cn'] = array('like', "%{$data['keyword']}%");  
                $ret=db('broker')
                ->field('myid as code,name_cn as name,logo_url,status,tag_year,tag_regulation,tag_license,tag_mt4,r_country,avg_rate')
                ->where($map)
                ->order('id desc')
                ->paginate($data['num'])->each(function($item, $key)use($nations,$r_status){
                    $item['r_country'] = $nations[$item['r_country']];
                    $item['status'] = $r_status[$item['status']];
                    $item['avg_rate'] = $item['avg_rate']/10;
                    return $item;
                });
            }else{
                $map['name_en'] = array('like', "%{$data['keyword']}%");  
                $ret=db('broker')
                ->field('myid as code,name_en as name,logo_url,status,tag_year,tag_regulation,tag_license,tag_mt4,r_country,avg_rate')
                ->where($map)
                ->order('id desc')
                ->paginate($data['num'])->each(function($item, $key)use($nations,$r_status){
                    $item['r_country'] = $nations[$item['r_country']];
                    $item['status'] = $r_status[$item['status']];
                    $item['avg_rate'] = $item['avg_rate']/10;
                    return $item;
                });
            }

        return $ret;  
        }
        //搜代理商
        if($data['type']===2){
            $r_status=db('regulation_status')->column("id,name,color");
            $map['is_delete'] = 0;
            $map['name_cn'] = array('like', "%{$data['keyword']}%");  
            $ret=db('ib')
            ->field('myid as code,name_cn as name,logo_url,is_license,avg_rate,tag_year,tag_area,tag_type,tag_other,status')
            ->where($map)
            ->order('id asc')
            ->paginate($data['num'])->each(function($item, $key)use($r_status){
                    $item['avg_rate'] = $item['avg_rate']/10;
                    $item['status'] = $r_status[$item['status']];
                    return $item;
                });

        return $ret;  
        }
        //搜投诉
        if($data['type']===3){
            $ret=db('case')
            ->field('a.myid,a.title,a.details,a.status,a.require,a.time,b.logo_url,b.name_en as name')
            ->alias('a')
            ->join('bk_broker b','a.broker_id=b.id')
            /* ->where('a.title','like',"%{$data['keyword']}%") */
            /* ->whereOr('a.details','like',"%{$data['keyword']}%") */
			->where('a.title|a.details','like',"%{$data['keyword']}%")
            ->where('a.is_delete',0)
            ->order('a.id desc')
            ->paginate($data['num']);
        return $ret;  
        }
  
    }
 


}
