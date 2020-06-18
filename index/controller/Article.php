<?php
namespace app\index\controller;

class Article extends Common
{

    private $obj;

    public function _initialize()
    {  
        parent::_initialize();
       $this->obj = Model('Article');

    }

    public function index()
    {
        //文章列表最上面三个大图
        $newslist=$this->obj->get_news_list();
        // dump($newslist);die;


        $this->assign(array(
            'newslist'=>$newslist,

            ));
        return view();
    }

    public function articles()
    {
        //浏览数生成
        $myid= input('myid');
        $id= db('article')->where('myid',$myid)->value('id');
        // $num = mt_rand(1,5);
        db('article')->where("id = '$id'")->setInc('views');
        //文章所有信息
        $artinfo= $this->obj->artinfo($id);
        //文章中提到的公司
        $related_cpy= $this->obj->related_cpy($id);
        // dump($related_cpy);die;
        //文章详情页右边相关文章
        $recArt = $this->obj->getRecArt();

        $this->assign(array(
            'artinfo'=>$artinfo,
            'promote_arts'=>$recArt,
            'related_cpy'=>$related_cpy,
            ));
        return view();
    }

    public function addarticle(){
         // $this->checkLoginTp5();
        if(request()->isPost()){
            $data=input('post.');
            // dump($data);die;
            $data['time']=time();
             
            $data['myid']=myrandcode();
            // $validate = \think\Loader::validate('Article');
            // if(!$validate->scene('addarticle')->check($data)){
            //     $this->error($validate->getError());
            // }

            if($_FILES['thumb']['tmp_name']){
               $data=$this->obj->newadd_pics($data);
               // dump($data);die;
            }
            // dump($data);die;
            // $data['publisher_id'] = session('userinfo')['id'];
            $data['user_id'] = 1;
            // dump($data);die;
                    
            $res=db('article')->insert($data);

            if(!$res){
                $data['myid']=myrandcode();
                $res=db('article')->insert($data);
            }

            if($res){
                $this->success('添加文章成功');
            }else{
                $this->error('添加文章失败！');
            }
            return;
        }

        // $country_list=$this->obj->getCountries();

        $this->assign(array(
            // 'country_list'=>$country_list,
            // 'hotRes'=>$hotRes,
            // 'cateInfo'=>$cateInfo,
            ));
        return view();
    }

    public function editarticle(){
         // $this->checkLoginTp5();
        if(request()->isPost()){
            $data=input('post.');
            // dump($data);die;
            $data['time']=time();
            // $data['user_id'] = session('userinfo')['id'];
            $data['user_id'] = 1;

            $data['id']= db('article')->where('myid',$data['myid'])->value('id');

            // $validate = \think\Loader::validate('Article');
            // if(!$validate->scene('addarticle')->check($data)){
            //     $this->error($validate->getError());
            // }

            if($_FILES['thumb']['tmp_name']){
               $data=$this->obj->change_pics($data);
            }
                       
            $res=db('article')->update($data);
            
            if($res){
                $this->success('修改文章成功');
            }else{
                $this->error('添加文章失败！');
            }
            return;
        }
 
        $id=input('myid');  
        $edit_data=$this->obj->edit_art_info($id);
        // dump($edit_data);die;
        // $cateres=$cate->catetree();
        // $this->assign('cateres',$cateres);
        $this->assign(array(
            'edit_data'=>$edit_data,

            ));
        return view();
    }
    
}
