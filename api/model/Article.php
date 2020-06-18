<?php
namespace app\api\model;
use think\Model;
use think\Db;
// use app\index\model\Cate;

class Article extends Model
{
    
    public function get_hot_artlist($data){
        $order = 'a.rec desc,a.id desc';
        $ret= $this->get_artlist($data,$order);
        return $ret; 
    }

    public function get_new_artlist($data){
        $order = 'a.id desc';
        $ret= $this->get_artlist($data,$order);
        return $ret; 
    } 

 
    public function get_artlist($data,$order){
        if($data['cate']){
           $map['a.cate']  = $data['cate']; 
        }

        $map['a.is_delete']  = 0;
       
            $ret=db('article')
            ->where($map)
            ->field('a.id,a.title,a.thumb,a.abstract,a.rec,a.time,b.head_img_url,b.name')
            ->alias('a')
            ->join('bk_user b','a.user_id=b.id')
            ->order($order)
            ->paginate(5);   
            return $ret; 
    } 

    public function top10($data){

        $order = 'future_index desc';

        if($data['type']==2){
           $order = 'id desc';
        }

        if($data['type']==3){
           $order = 'id asc';
        }

        $map['is_delete']  = 0;
        $ret=db('broker')
        ->where($map)
        ->field('myid,name_cn,name_en,logo_url,future_index')
        ->order($order)
        ->limit(10)
        ->select();
        return $ret;

    }

    public function addKeep($artId, $userId, $type = 1)
    {
        $data = [
            'article_id' => (int)$artId,
            'user_id' => (int)$userId
        ];
        $ret['code'] = 'add200';
        $type = (int)$type;
        if ($type === 1) {
            // 加顶
            Db::startTrans();
            try{
                Db::name('article_keep')->insert($data);
                Db::name('article')->where('id', $data['article_id'])->setInc('keep_sum');
                // 提交事务
                $ret['data'] = Db::name('article')->field('keep_sum')->where('id', $data['article_id'])->find();
                Db::commit();  
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                $ret = false;
            }
        } elseif ($type === 2) {
            // 取消顶
            $res = Db::name('article_keep')->where($data)->delete();
            if ($res === 1) {
                Db::name('article')->where('id', $data['article_id'])->setDec('keep_sum');
                $ret['code'] = 'delete200';
            }else{$ret = false;}
            
        }
        return $ret;
    }

    public function getmsg($datas){

        $map['a.article_id']  = $datas['article_id'];
        $map['a.is_delete']  = 0;
        $map['a.pid']  = 0;
        $order='a.ding_sum desc,a.id desc';
        if($datas['support']===1)
            {
                $order='a.id desc';
            }

        $data=db('article_comments')->where($map)
        ->field('a.id,a.netizen_id,a.pid,a.msg,a.comment_pics,a.create_time,a.ding_sum,b.name,b.head_img_url,b.is_shang')
        ->alias('a')
        ->join('bk_user b','a.netizen_id=b.id')
        ->order($order)
        ->paginate($datas['num']);

        $total= $data->total();
        // dump($aaaa);die;
        $leavemsg = [];
        
        if($data){
            $leavemsg = $this->get_Children_Class(0,$data);     // 递归调用 查询这六条根目录的 所有子分类
            $leavemsg = $this->makeTree($leavemsg);     //  转成有子类格式  children
        }
        $datas_all['total_num'] = $total;
        $datas_all['total_page']= ceil($total / $datas['num']);
        $datas_all['leavemsg'] = $leavemsg;
        return $datas_all; 
    }
    //利用递归将所有的无限级评论都遍历出来
    public function get_Children_Class($pid=0,$childResult="",&$arr=array()){           //  arr 必须要引用
        if($childResult){
            // dump($childResult);die;
            foreach($childResult as $row){
                
                $arr[] = $row;  

         $map['a.pid']  = $row["id"];
         $map['a.is_delete']  = 0;
         $childResult=db('article_comments')->where($map)
        ->field('a.id,a.netizen_id,a.pid,a.msg,a.comment_pics,a.create_time,a.ding_sum,b.name,b.head_img_url,b.is_shang')
        ->alias('a')->join('bk_user b','a.netizen_id=b.id')
        ->order('a.ding_sum desc')
        ->select();
                if($childResult){ 
                    $this->get_Children_Class($row["id"],$childResult,$arr);
                }
            }
        }
        return $arr;
    }


    /**
     * 无限分类，结构化 children
    */
    public function makeTree($data){
        // dump($data);die;
        foreach ($data as $row) {
            $datas[$row["id"]]=$row;
        }
        $tree = [];
        if(isset($datas)){
        foreach ($datas as $id=>$area){
            if(isset($datas[$area["pid"]])){
                $datas[$area["pid"]]["children"][] = &$datas[$id];
             } else {
                $tree[] = &$datas[$area["id"]];
             }
         }            
        }

        return $tree;
    }

    public function mydeal_article($data){

       $map['user_id']  = $data['user_id'];

       //审核中
        if($data['cate_id']===1){
            $map['is_delete']  =1;
        }

       //已通过
        if($data['cate_id']===2){
            $map['is_delete'] =0;
        }

       //已通过
        if($data['cate_id']===3){
            $map['is_delete'] =2;
        }

        $ret=db('article')
        ->field('myid,title,content,time,abstract,is_delete as status')
        ->where($map)
        ->order('id desc')
        ->paginate($data['num'])->each(function($item, $key){
                $item['time'] = date("Y-m-d H:i",$item['time']);
                return $item;
            });
        return $ret;  
    }

}
