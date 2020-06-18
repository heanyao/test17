<?php
namespace app\api\model;
use think\Model;
use think\Db;
// use app\index\model\Cate;

class Broker extends Model
{
    
    public function getmsg($datas){

        $map['a.broker_id']  = $datas['broker_id'];
        $map['a.is_delete']  = 0;
        $map['a.pid']  = 0;

        if($datas['support']){
        $map['a.support'] = $datas['support'];            
        }

        $data=db('broker_comments')->where($map)
        ->field('a.id,a.netizen_id,a.pid,a.msg,a.comment_pics,a.create_time,a.rate_cost,a.rate_exc,a.rate_fund,a.rate_slip,a.rate_stable,a.rate_service,a.impress,a.ding_sum,b.name,b.head_img_url,b.is_shang')
        ->alias('a')->join('bk_user b','a.netizen_id=b.id')
        ->order('a.id desc')
        ->paginate($datas['num']);// "impress": "印象深,很好,不错",如前端有需要则exploid弄成数组

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
         $childResult=db('broker_comments')->where($map)
        ->field('a.id,a.netizen_id,a.pid,a.msg,a.comment_pics,a.create_time,a.rate_cost,a.rate_exc,a.rate_fund,a.rate_slip,a.rate_stable,a.rate_service,a.impress,a.ding,b.name,b.head_img_url,b.is_shang')
        ->alias('a')->join('bk_user b','a.netizen_id=b.id')
        ->order('b.is_shang desc')
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
    // public function upload(){
    //     $files = request()->file('image');
    //     // dump($files);die;
    //     if(!$files){
    //         return '';
    //     }
    //     $imageStr = '';
    //     foreach($files as $file){
    //         // 移动到框架应用根目录/public/uploadscmt/ 目录下
    //         $info = $file->validate(['size'=>156780,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploadscmt');
    //         if($info) {
    //             $imageStr .= DS . 'uploads'. DS .$info->getSaveName() . ',';
    //         } else {
    //             // 上传失败获取错误信息
    //             // $file->getError();
    //         }    
    //     }
    //     return rtrim($imageStr, ',');
    // }


    public function newest_case($id,$progress){
        $map['a.broker_id']  = $id;
        $map['a.is_delete']  = 0;
        $tag = db('case_tag')->column('id,name'); 
        // dump($res);die;
        if($progress==='alredayreply'){
           $map['a.status']  =array(array('gt',3),array('lt',7));
        }

        if($progress==='alldone'){
           $map['a.status']  = array('gt',6);
        }

        $data=db('case')->where($map)
        ->field('a.myid,a.title,a.tag,a.time,a.images,a.is_hidefile,b.name,b.head_img_url')
        ->alias('a')
        ->join('bk_user b','a.user_id=b.id')
        ->order('a.id desc')
        ->paginate(10)->each(function($item, $key)use($tag){
            $item['tag'] = $tag[$item['tag']];
            if($item['is_hidefile'] != 1&& $item['images']!=null){
                $item['images'] = explode(",",$item['images'])[0];
            }else{
                $item['images'] = '/static/index/images/test.png';
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
        ->field('a.myid,a.title,a.thumb as images,a.time,b.name_cn as name,b.tiny_logo as head_img_url')
        ->alias('a')
        ->join('bk_broker b','a.company_id=b.id')
        ->order('a.id desc')
        ->paginate(10);
        // dump($data);die;
        return $data;
    }

    public function addKeep($artId, $userId, $type = 1)
    {
        $data = [
            'broker_id' => (int)$artId,
            'user_id' => (int)$userId
        ];
        $ret['code'] = 'add200';
        $type = (int)$type;
        if ($type === 1) {
            // 加顶
            Db::startTrans();
            try{
                Db::name('broker_keep')->insert($data);
                Db::name('broker')->where('id', $data['broker_id'])->setInc('keep_sum');
                // 提交事务
                $ret['data'] = Db::name('broker')->field('keep_sum')->where('id', $data['broker_id'])->find();
                Db::commit();  
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                $ret = false;
            }
        } elseif ($type === 2) {
            // 取消顶
            $res = Db::name('broker_keep')->where($data)->delete();
            if ($res === 1) {
                Db::name('broker')->where('id', $data['broker_id'])->setDec('keep_sum');
                $ret['code'] = 'delete200';
            }else{$ret = false;}
            
        }
        return $ret;
    }

    # 顶，type：1加顶，2取消顶
    public function addDing($artId, $userId, $type = 1)
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
                Db::name('broker_cmts_ding')->insert($data);

                Db::name('broker_comments')->where('id', $data['cmt_id'])->setInc('ding_sum');
                // 提交事务
                $ret['data'] = Db::name('broker_comments')->field('ding_sum')->where('id', $data['cmt_id'])->find();
                Db::commit();  
            } catch (\Exception $e) {
                Db::rollback();
                $ret = false;
           }
        } elseif ($type === 2) {
            // 取消顶
            $res = Db::name('broker_cmts_ding')->where($data)->delete();
            if ($res === 1) {
                Db::name('broker_comments')->where('id', $data['cmt_id'])->setDec('ding_sum');
                $ret['code'] = 'delete200';
                $ret['data'] = Db::name('broker_comments')->field('ding_sum')->where('id', $data['cmt_id'])->find();
            }
            
        }
        return $ret;
    }

    public function uploadOne($file)
    {

        // echo phpinfo();die;
        // 获取表单上传文件
        if (empty($file)) {
            $msg = 'empty upload file';
            Log::error($msg);
            return $msg;
        }

        // 移动到框架应用根目录/public/uploads/ 目录下
        // $path = ROOT_PATH . 'public' ;
        // $info = $file->move($path . '/uploads');
        $info = $file->validate(['size' => 1000000, 'ext' => 'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploadscmt');
        if ($info) {
            // 成功上传后 获取上传信息
            // 输出 jpg
            return DS . 'uploadscmt' . DS . $info->getSaveName();
        } else {
            // 上传失败获取错误信息
            return $file->getError();
        }
    }


}
