<?php
namespace app\api\model;
use think\Model;
use think\Db;
// use app\index\model\Cate;

class Cases extends Model
{
    
    public function getmsg($datas){

        $map['a.case_id']  = $datas['case_id'];
        $map['a.is_delete']  = 0;
        $map['a.pid']  = 0;
        $order='a.ding_sum desc,a.id desc';
        if($datas['support']===1)
            {
                $order='a.id desc';
            }

        $data=db('case_comments')->where($map)
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
         $childResult=db('case_comments')->where($map)
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

   //图片上传处理 
    public function uploadOne($file)
    {


        $info = $file->validate(['size' => 1000000, 'ext' => 'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploadscmt');
        if ($info) {
            $ret['data'] =DS . 'uploadscmt' . DS . $info->getSaveName();
            $ret['code'] = 200;
            return $ret;
        } else {
            // 上传失败获取错误信息
            $ret['data'] = $file->getError();
            $ret['code'] = 400;
            return $ret;
        }
    }


    # 顶，type：1加顶，2取消顶
    public function addDing($artId, $userId, $type = 1)
    {
        $data = [
            'case_id' => (int)$artId,
            'user_id' => (int)$userId
        ];
        $ret['code'] = 'add200';
        $type = (int)$type;
        if ($type === 1) {
            // 加顶
            Db::startTrans();
            try{
                Db::name('case_ding')->insert($data);
                // $num = mt_rand(5,10);
                Db::name('case')->where('id', $data['case_id'])->setInc('ding_sum');
                // 提交事务
                $ret['data'] = Db::name('case')->field('ding_sum')->where('id', $data['case_id'])->find();
                Db::commit();  
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                $ret = false;
            }
        } elseif ($type === 2) {
            // 取消顶
            $res = Db::name('case_ding')->where($data)->delete();
            if ($res === 1) {
                Db::name('case')->where('id', $data['case_id'])->setDec('ding_sum');
                $ret['code'] = 'delete200';
            }
            
        }
        return $ret;
    }


    # 顶，type：1加顶，2取消顶
    public function cmt_addDing($artId, $userId, $type = 1)
    {
        $data = [
            'cmt_id' => (int)$artId,
            'user_id' => (int)$userId
        ];
        $ret['code'] = 'add200';
        // dump($data['cmt_id']);die;
        $type = (int)$type;
        if ($type === 1) {
            // 加顶
            Db::startTrans();
            try{
                Db::name('case_cmts_ding')->insert($data);

                Db::name('case_comments')->where('id', $data['cmt_id'])->setInc('ding_sum');
                // 提交事务
                $ret['data'] = Db::name('case_comments')->field('ding_sum')->where('id', $data['cmt_id'])->find();
                Db::commit();  
            } catch (\Exception $e) {
                Db::rollback();
                $ret = false;
           }
        } elseif ($type === 2) {
            // 取消顶
            $res = Db::name('case_cmts_ding')->where($data)->delete();
            if ($res === 1) {
                Db::name('case_comments')->where('id', $data['cmt_id'])->setDec('ding_sum');
                $ret['code'] = 'delete200';
                $ret['data'] = Db::name('case_comments')->field('ding_sum')->where('id', $data['cmt_id'])->find();
            }
            
        }
        return $ret;
    }
    
    public function supporter_list($case_id){

        $map['a.case_id']  = $case_id;
       
            $ret=db('case_ding')
            ->where($map)
            ->field('b.head_img_url,b.id')
            ->alias('a')
            ->join('bk_user b','a.user_id=b.id')
            ->select();
 
            return $ret; 
    } 

    public function get_mycase($data){
        //搜投诉
       $map['a.user_id']  =  $data['user_id'];
       $map['a.is_delete']  = 0;

       //审核中
        if($data['cate_id']===1){
            $map['a.status']  =0;
        }

       //商家处理中
        if($data['cate_id']===2){
            $map['a.status']  =array(array('gt',1),array('lt',7));
        }
        //确认完成
        if($data['cate_id']===3){
            $map['a.status']  = array('gt',6);
        }
       //审核未通过
        if($data['cate_id']===4){
            $map['a.status']  =1;
        }
        
        $ret=db('case')
        ->field('a.myid,a.title,a.details,a.status,a.require,a.time,b.logo_url,b.name_en as name')
        ->alias('a')
        ->join('bk_broker b','a.broker_id=b.id')
        ->where($map)
        ->order('a.id desc')
        ->paginate($data['num']);
        return $ret;  
    }
 

    public function mydeal_case($data){
        //搜投诉
       $map['a.is_delete']  = 0;
       $map['a.status'] = array('gt',1);

       //找出user_id对应的公司id
       $c_id = db('user')->where('id',$data['user_id'])->value('company_id');

       if(!$c_id){
            return null; 
       }

       $map['a.broker_id'] = $c_id;


       //待处理
        if($data['cate_id']===1){
            $map['a.status']  =array(array('gt',1),array('lt',3));
        }

       //商家处理中
        if($data['cate_id']===2){
            $map['a.status']  =array(array('gt',2),array('lt',7));
        }
        //确认完成
        if($data['cate_id']===3){
            $map['a.status']  = array('gt',6);
        }

        
        $ret=db('case')
        ->field('a.myid,a.title,a.details,a.status,a.require,a.time,b.head_img_url as logo_url,b.name')
        ->alias('a')
        ->join('bk_user b','a.user_id=b.id')
        ->where($map)
        ->order('a.id desc')
        ->paginate($data['num']);
        return $ret;  
    }

}
