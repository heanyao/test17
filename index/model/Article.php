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
					//print_r($info);
					$imgurl = ROOT_PATH  . 'public'.DS.'uploads' . DS . $info->getSaveName();
					$water = ROOT_PATH.'public'.DS.'static'.DS.'admin'.DS.'ueditor'.DS.'php'.DS.'watermark.gif';
					//print_r($imgurl);
					$this->watermark($imgurl,$imgurl, 9, $water);
					
					//$image = \think\Image::open($imgurl);
					// 给原图左上角添加透明度为50的水印并保存alpha_image.png
					//$image->water($water,\think\Image::WATER_NORTHWEST,50)->save($imgurl);
					
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

 

	public function watermark($source, $target = '', $w_pos = '', $w_img = '') {
		$this->w_pos = 9;
		$this->w_img = 'watermark.gif';	//GD环境问题，不能用png图片，会出现问题
		
		$w_pos = $w_pos ? $w_pos : $this->w_pos;
		
		/*打开图片*/
		//1、配置图片路径
		$src = $source;
		//2、获取图片信息
		$info = getimagesize($src);
		$source_w  = $info[0];//图片宽度
        $source_h  = $info[1];//图片高度
		//3、获取图片类型
		$type = image_type_to_extension($info[2], false);
		//4、在内存中创建图像
		$createImageFunc = "imagecreatefrom{$type}";
		//5、把图片复制内存中
		$image = $createImageFunc($src);

		/*操作图片*/
		//1、设置水印图片路径
		$imageMark = $w_img ? $w_img : $this->w_img;
		//2、获取水印图片基本信息
		$markInfo = getimagesize($imageMark);
		/* var_dump($markInfo); */
		$width    = $markInfo[0];
		$height   = $markInfo[1];
		//3、获取水印图片类型
		$markType = image_type_to_extension($markInfo[2], false);
		//4、在内存创建图像
		$markCreateImageFunc = "imagecreatefrom{$markType}";
		//5、把水印图片复制到内存中
		$water = $markCreateImageFunc($imageMark);
		
		//水印位置设定
		switch($w_pos) {
            case 1:
                $wx = 5;
                $wy = 5;
                break;
            case 2:
                $wx = ($source_w - $width) / 2;
                $wy = 0;
                break;
            case 3:
                $wx = $source_w - $width;
                $wy = 0;
                break;
            case 4:
                $wx = 0;
                $wy = ($source_h - $height) / 2;
                break;
            case 5:
                $wx = ($source_w - $width) / 2;
                $wy = ($source_h - $height) / 2;
                break;
            case 6:
                $wx = $source_w - $width;
                $wy = ($source_h - $height) / 2;
                break;
            case 7:
                $wx = 0;
                $wy = $source_h - $height;
                break;
            case 8:
                $wx = ($source_w - $width) / 2;
                $wy = $source_h - $height;
                break;
            case 9:
                $wx = $source_w - ($width+5);
                $wy = $source_h - ($height+5);
                break;
            case 10:
                $wx = rand(0,($source_w - $width));
                $wy = rand(0,($source_h - $height));
                break;
            default:
                $wx = rand(0,($source_w - $width));
                $wy = rand(0,($source_h - $height));
                break;
        }

		//6、合并图片
		//imagecopymerge($image, $water, $wx,$wy, 0, 0, $markInfo[0], $markInfo[1], 50);
		
		$alpha = 30; //透明度
		//循环平铺水印
		for ($x = 20; $x < $info['0']-20; $x) {
			for ($y = 20; $y < $info['1']-20; $y) {
				imagecopymerge($image, $water, $x, $y, 0, 0, $markInfo[0], $markInfo[1], $alpha);
				$y += $markInfo[1]+60;
			}
			$x += $markInfo[0]+60;
		}
		
		$imagefunc = "image{$type}";
		$number = 90;
		if($type == 'png') $number = 9;
		$imagefunc($image, $target, $number);
		
		//7、销毁水印图片
		imagedestroy($water);

		/* 销毁图片 */
		imagedestroy($image);
		return true;
	}

}
