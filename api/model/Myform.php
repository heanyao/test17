<?php
namespace app\api\model;
use think\Model;
use think\Db;
// use app\index\model\Cate;

class Myform extends Model
{
    
    public function get_search($data){
        //搜经纪商

            $map['is_delete'] = 0;
            $lang = EnglishOrChinese($data['keyword']);
            if($lang===2){
                $map['name_cn'] = array('like', "%{$data['keyword']}%");  
                $ret=db('broker')
                ->field('myid,name_cn as name,tiny_logo')
                ->where($map)
                ->order('id desc')
                ->limit(5)
                ->select();
            }else{
                $map['name_en'] = array('like', "%{$data['keyword']}%");  
                $ret=db('broker')
                ->field('myid,name_en as name,tiny_logo')
                ->where($map)
                ->order('id desc')
                ->limit(5)
                ->select();
            }
        
        //搜代理商 这里可以删掉
        // if(!$ret){
        //     $map['is_delete'] = 0;
        //     $map['name_cn'] = array('like', "%{$data['keyword']}%");  
        //     $ret=db('ib')
        //     ->field('myid,name_cn as name,tiny_logo')
        //     ->where($map)
        //     ->order('id desc')
        //     ->limit(5)
        //     ->select();
        // }

        return $ret; 

    }

 
    public function uploadOne($file)
    {


        $info = $file->validate(['size' => 1000000, 'ext' => 'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploadcase');
        if ($info) {
            $ret['data'] =DS . 'uploadcase' . DS . $info->getSaveName();
            $ret['code'] = 200;
            return $ret;
        } else {
            // 上传失败获取错误信息
            $ret['data'] = $file->getError();
            $ret['code'] = 400;
            return $ret;
        }
    }

    public function save_rate($data){

        $case_id = db('case')->where('myid',$data['myid'])->value('id');

        $res = false;

        $ret=db('case')
        ->where('id',$case_id)
        ->update(['s_speed' => $data['speed']*10,'s_service' => $data['service']*10,'s_satisfation' => $data['good']*10,'status' => 7]);

        if($ret){
        $data = ['status' => 7, 'pid' => $case_id,'user_id' => $data['user_id'],'time' => time()];
        $res=db('case_progress')->insert($data);     
        }

 
        return $res; 
    } 

}
