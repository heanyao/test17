<?php
namespace app\api\model;
use think\Model;
use think\Db;
use think\paginator\driver\Bootstrap;
class Messages extends Model
{

    public function get_focus_list($user_id,$datas){
 
         // $map['a.pid']  = $row["id"];
         // $map['a.is_delete']  = 0;
         $ret=db('user_followers')->where('follower_id',$user_id)
        ->field('b.id,b.name,b.head_img_url,b.user_sex')
        ->alias('a')->join('bk_user b','a.user_id=b.id')
        ->paginate($datas['num']);
        // dump($ret);die;
        return $ret;
    }

    public function get_fan_list($user_id,$datas){
 
         // $map['a.pid']  = $row["id"];
         // $map['a.is_delete']  = 0;
         $ifollowlist= $ret=db('user_followers')->where('follower_id',$user_id)->column('user_id');
         // dump($ifollowlist);die;
         $ret=db('user_followers')->where('user_id',$user_id)
        ->field('b.id,b.name,b.head_img_url,b.user_sex')
        ->alias('a')->join('bk_user b','a.follower_id=b.id')
        ->paginate($datas['num'])->each(function($item, $key)use($ifollowlist){
            if(in_array($item['id'],$ifollowlist)){
              $item['gz'] = 1;  
            }else{
                $item['gz'] =0;  
            }
            return $item;
        });

        return $ret;
    }

    public function get_msg_list($to_uid, $page=1, $pageSize=20){

            $model=model('messages');
         // $map['m.to_uid']  = $to_uid;
         // $map['m.status']  = 1;
         //   $model
         //   ->field('count(m.from_uid) f_count,m.id,m.from_uid,m.content,m.addtime,u.name,u.head_img_url')
         //   ->alias('m')
         //   ->join('user u','u.id=m.from_uid')
         //   ->where($map)
         //   ->group('from_uid')
         //   ->order('m.id desc')
         //   ->select();

         //   $ret = $model->getLastSql();
        // if($pageNumber > 0){

        // $pageNumber_one = $pageNumber-1;

        // } else {

        // $pageNumber_one = 0;

        // }

        // $limit = 1;//每页显示条数

        // $offset = $pageNumber_one * $limit;//查询偏移值


        $offset = ($page-1)*$pageSize;
        $sql= " SELECT m.status,m.id,m.from_uid,m.content,m.addtime,u.name,u.head_img_url FROM `bk_messages` `m` INNER JOIN `bk_user` `u` ON `u`.`id`=`m`.`from_uid` where m.to_uid = '".$to_uid."' AND m.id in(select max(id) from bk_messages group by from_uid) and from_show=0 and to_show=0 order by m.id desc   limit {$offset}, {$pageSize};" ;

        $ret = $model->query($sql);
        // $count =count($ret);
        // dump($ret);die;
 //组合分页数据格式

// $pagernator = Bootstrap::make($ret,$limit,$pageNumber,$count,false,['path'=>Bootstrap::getCurrentPath(),'query'=>request()->param()]);


    return $ret;
    }

    /*
     * @30324143
     */
    public function get_msg_count($to_uid){
        $model=model('messages');
        $sql= " SELECT count(*) as total FROM `bk_messages` `m` INNER JOIN `bk_user` `u` ON `u`.`id`=`m`.`from_uid` where m.to_uid = '".$to_uid."' AND m.id in(select max(id) from bk_messages group by from_uid) and from_show=0 and to_show=0 order by m.status desc ;  " ;

        $ret = $model->query($sql);
        return empty($ret) ? 0 : $ret[0];
    }

   //消息删除
    public function del_msg($from_uid,$to_uid){
         // $map['a.pid']  = $row["id"];
         // $map['a.is_delete']  = 0;
//        $ret_p1=db('messages')->where(['from_uid'=>$from_uid,'to_uid'=>$to_uid,'type'=>1])->column('content');
//        $ret_p2=db('messages')->where(['from_uid'=>$to_uid,'to_uid'=>$from_uid,'type'=>1])->column('content');
//         // dump($ret_pic);die;
//         if($ret_p1){
//                 foreach ($ret_p1 as $v) {
//              $urlpath=$_SERVER['DOCUMENT_ROOT'].$v;
//                if(file_exists($urlpath)){
//                  @unlink($urlpath);
//                }
//              }
//         }
//
//         if($ret_p2){
//                 foreach ($ret_p2 as $v) {
//              $urlpath=$_SERVER['DOCUMENT_ROOT'].$v;
//                if(file_exists($urlpath)){
//                  @unlink($urlpath);
//                }
//              }
//         }
//
//         $ret=db('messages')->where(['from_uid'=>$from_uid,'to_uid'=>$to_uid])->delete();
//         $ret=db('messages')->where(['from_uid'=>$to_uid,'to_uid'=>$from_uid])->delete();

         $ret=db('messages')->where(['from_uid'=>$from_uid,'to_uid'=>$to_uid])->update(['from_show'=>1, 'to_show'=>1]);
//         $ret=db('messages')->where(['from_uid'=>$to_uid,'to_uid'=>$from_uid])->update(['from_show'=>1]);
        // dump($ret);die;
        return 1;
    }


    //添加私信操作
    public function addmessage($from_uid,$to_uid,$content,$type){
         $ret=$this
         ->save(['from_uid'=>$from_uid,'to_uid'=>$to_uid,'content'=>$content,'addtime'=>time(),'type'=>$type,]);
        return $ret;
    }

    //返回id为$uid的用户详细信息
    public function getUserInfo($uid){
        return db('user')->where(['id'=>$uid])->find();
    }

    //改变私信未读状态，1已读
    public function changeMsgStatus($to_uid,$from_uid){
        return db('messages')->where(['from_uid'=>$from_uid,'to_uid'=>$to_uid,'status'=>2])->update(['status'=>1]);
    }

    //选取私信记录
    public function getMessage($uid_a,$uid_b){
        // $sql = 'SELECT m.content,m.addtime,m.status,m.from_uid,m.to_uid,u.thumb FROM __BBS_MESSAGE__ m JOIN __USER__ u ON m.from_uid=u.id WHERE m.from_uid='.$uid_a.' and m.to_uid='.$uid_b;
        // $sql2 = 'SELECT m.content,m.addtime,m.status,m.from_uid,m.to_uid,u.thumb FROM __BBS_MESSAGE__ m JOIN __USER__ u ON m.from_uid=u.id WHERE m.from_uid='.$uid_b.' and m.to_uid='.$uid_a.' UNION '.$sql;

        $sql = 'SELECT m.status,m.from_uid,m.to_uid,m.content,m.type,m.addtime,u.name,u.head_img_url FROM bk_messages m JOIN bk_user u ON m.from_uid=u.id WHERE m.from_uid='.$uid_a.' and m.to_uid='.$uid_b;
        // dump($sql);die;
        $sql2 ='SELECT m.status,m.from_uid,m.to_uid,m.content,m.type,m.addtime,u.name,u.head_img_url FROM bk_messages m JOIN bk_user u ON m.from_uid=u.id WHERE m.from_uid='.$uid_b.' and m.to_uid='.$uid_a.' UNION '.$sql;

       // dump($sql2);die;
        return $this->query($sql2);
    }

   //黑名单搜索列表
    public function black_user_search($name){
 
         // $map['a.pid']  = $row["id"];
         // $map['a.is_delete']  = 0;
         $map['is_delete'] = 0;   
         $map['name'] = array('like', "%{$name}%");   
         $ret=db('user')->where($map)
        ->field('id,name,head_img_url,user_sex')
        ->limit(20)
        ->select();
        // dump($ret);die;
        return $ret;
    }

   //我的黑名单列表
    public function black_list($mid){
 
         // $map['a.pid']  = $row["id"];
         // $map['a.is_delete']  = 0;
        $ret=db('blacklist')->where('mid',$mid)
        ->field('b.id,b.name,b.head_img_url')
        ->alias('a')->join('bk_user b','a.yid=b.id')
        ->select();
        // dump($ret);die;
        return $ret;
    }

   
    public function follow($pubUserId, $followUserId, $type = 1)
    {
        $data = [
            'follower_id' => (int)$followUserId,
            'user_id' => (int)$pubUserId,
            'time' => time()
        ];
        $ret['code'] = 'add200';
        $type = (int)$type;
         // dump((int)$pubUserId);die;
        if ($type === 1) {
            // 加收藏
            
            Db::startTrans();
            try{
                Db::name('user_followers')->insert($data);
                Db::name('user')->where('id', $data['user_id'])->setInc('follower_sum');
                $ret['data'] = Db::name('user')->field('follower_sum')->where('id', $data['user_id'])->find();
                // 提交事务
                Db::commit();    
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                $ret = false;
            }
        } elseif ($type === 2) {
            // 取消顶
            unset($data['time']);
            $res = Db::name('user_followers')->where($data)->delete();
            if ($res === 1) {
                Db::name('user')->where('id', $data['user_id'])->setDec('follower_sum');
                $ret['code'] = 'delete200';
            }else{$ret = false;}
        }
        return $ret; 
    }


}
