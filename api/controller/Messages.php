<?php
namespace app\api\controller;
use think\Db;
class Messages extends Common
{
    private $obj;
    private $uid;

    public function _initialize()
    {  
       $this->checkLogin();
       $this->obj = Model('Messages');
       $this->uid = (int)session('userinfo.id');
    }


    // public function index()
    // {  
  
    // return view();
    // }

    //我的关注列表
    public function myfocuslist()
    {
  
        $datas['num']=input('num');  
        $datas['page']=input('page'); 

        //2.检查参数
        if (!isset($datas['num'])) {
            $datas['num'] = 6;
        }

        if (!isset($datas['page'])) {
            $datas['page'] = 1;
        }

        $res=$this->obj->get_focus_list($this->uid,$datas);
        // dump($res);die;
        $this->returnMsg(200, '查询成功', $res);
    }

    //我的粉丝列表
    public function myfanlist()
    {
        $datas['num']=input('num');  
        $datas['page']=input('page'); 

        //2.检查参数
        if (!isset($datas['num'])) {
            $datas['num'] = 6;
        }

        if (!isset($datas['page'])) {
            $datas['page'] = 1;
        }

        $res=$this->obj->get_fan_list($this->uid,$datas);
        
        $this->returnMsg(200, '查询成功', $res);
    }

    //私信列表
    public function mymsglist()
    {   

        // $res=$this->obj->get_msg_list($this->uid);
        $page = $this->request->get('page');
        $pageSize = $this->request->get('page_size');
        $page = intval($page);
        $pageSize = intval($pageSize);
        $res=$this->obj->get_msg_list($this->uid, $page, $pageSize);
        // dump($res);die;
        $this->returnMsg(200, '查询成功', $res);
    }

    /*
     *私信数量
     */
    public function mymsgcount(){
        $res=$this->obj->get_msg_count($this->uid);
        $this->returnMsg(200, '查询成功', $res);
    }

    //删除私信
    public function delmsg()
    {    
        $from_uid=input('from_uid'); 
        $to_uid=$this->uid;
        $res=$this->obj->del_msg($from_uid,$to_uid);
        // dump($res);die;
        if($res){
          $this->returnMsg(200, '删除成功');  
      }else{
        $this->returnMsg(444, '删除失败');  
      }
        
    }


    //发送私信逻辑
    public function sendmsg(){
        $toUid=(int)input('post.from_uid');
        $content=trim(input('post.content'));
        $type=(int)input('post.type');
        $content = str_replace("<br>", " ", $content);  

        //内容 为空不能发送
        if(!$content){
            $this->returnMsg(444, '发送失败');
        }        
        //不能发送给自己
         if($toUid===$this->uid){
            $this->returnMsg(444, '不能发送给自己');
        }

        //被列黑名单不能发送
         $blocked =db('blacklist')->where(['mid'=>$toUid,'yid'=>$this->uid])->find();
         if($blocked){
            $this->returnMsg(444, '您已被对方列为黑名单');
        }

        $ret = $this->obj->addMessage($this->uid,$toUid,$content,$type);
        // $user_head= $this->obj->getUserInfo($this->uid)['head_img_url'];
        if($ret){
             $data['type'] = $type;
             $data['content'] = $content; 
             $data['addtime'] = time();
             $this->returnMsg(200, '查询成功', $data);
        }else{
            $this->returnMsg(444, '查询失败');
        }
 
    }


    //历史聊天列表加载
    public function dialoglist(){
        
        $toUid=input('post.from_uid');
         //把未读信息设置为已读
        $this->obj->changeMsgStatus($this->uid,$toUid);

        $history = $this->obj->getMessage($toUid,$this->uid);
        // dump($history);die;
        usort($history,'diySort');

        $this->returnMsg(200, '查询成功', $history);

    }

    //聊天时图片上传
    public function upload(){
        // dump($files);die;
        $file = request()->file('image');
        $info = $file->validate(['size'=>1567800,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploadchat');
        if($info){
            $pics_url= DS . 'uploadchat'. DS .$info->getSaveName();
            $this->returnMsg(200, '查询成功', $pics_url);
        }else{
            $this->returnMsg(444, '上传失败'); 
        }
    }

    //黑名单搜索
    public function blacksearch(){
        
        $name=input('post.name');

        if(!$name){
            $this->returnMsg(400, '请输入正确的名字');
        }

        $blacksearchlist = $this->obj->black_user_search($name);
        // dump($history);die;

        $this->returnMsg(200, '查询成功', $blacksearchlist);

    }

    //添加黑名单
    public function addblack(){
        
        $yid=input('post.uid');

        $data = ['mid' => $this->uid, 'yid' => $yid];

        $res = Db::name('blacklist')->where($data)->find();

        if($res){
            $this->returnMsg(400, '请勿重复添加');
        }
        
        $data['time']= time();
        $ret = Db::name('blacklist')->insert($data,true);
        // dump($ret );die;
        if($ret){
            $this->returnMsg(200, '加入成功');
        }else{
            $this->returnMsg(400, '加入失败');
        }
    }

    //黑名单移除
    public function removeblack(){
        
        $yid=input('post.uid');

        $data = ['mid' => $this->uid, 'yid' => $yid];
        $ret = Db::name('blacklist')->where($data)->delete();
        // dump($ret );die;
        if($ret){
            $this->returnMsg(200, '删除成功');
        }else{
            $this->returnMsg(400, '删除失败');
        }
    }
 
     //我的黑名单列表
    public function myblacklist(){

        $blacklist = $this->obj->black_list($this->uid);
   
        $this->returnMsg(200, '获取成功',$blacklist);
 
    }

   //关注
    public function follow()
    {
        $this->checkLogin();
        $pubUserId = input('userid/d');
        $type = input('type/d', 1);
        //dump($pubUserId);die;
        $followUserId = session('userinfo')['id'];
        // dump($followUserId);die;
        // $followUserId = 13;
        $ret = $this->obj->follow($pubUserId, $followUserId, $type);
        if ($ret === false) {
            $this->returnMsg(4000, 'TA已经在您的关注或收藏列表里面！');
        }

        if ($ret['code']  === 'delete200') {
            $this->returnMsg('delete200', '取消操作成功！');
        } 

        if ($ret['code']  === 'add200') {
            $this->returnMsg('add200', '关注收藏成功！',$ret);
        } 
    }


}
