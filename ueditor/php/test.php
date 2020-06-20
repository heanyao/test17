<?php
/*
* 图片加水印
* $source  string  图片资源
* $target  string  添加水印后的名字
* $w_pos   int     水印位置安排（1-10）【1:左头顶；2:中间头顶；3:右头顶...值空:随机位置】
* $w_img   string  水印图片路径
* $w_text  string  显示的文字
* $w_font  int     字体大小
* $w_color string  字体颜色
*/
function watermark($source, $target = '') {
	/*打开图片*/
	//1、配置图片路径
	$src = $source;
	//2、获取图片信息
	$info = getimagesize($src);
	//3、获取图片类型
	$type = image_type_to_extension($info[2], false);
	//4、在内存中创建图像
	$createImageFunc = "imagecreatefrom{$type}";
	//5、把图片复制内存中
	$image = $createImageFunc($src);

	/*操作图片*/
	//1、设置水印图片路径
	//$imageMark = '../../../index/images/nike.png';
	$imageMark = 'watermark.png';
	//2、获取水印图片基本信息
	$markInfo = getimagesize($imageMark);
	//3、获取水印图片类型
	$markType = image_type_to_extension($markInfo[2], false);
	//4、在内存创建图像
	$markCreateImageFunc = "imagecreatefrom{$markType}";
	//5、把水印图片复制到内存中
	$water = $markCreateImageFunc($imageMark);

	//6、合并图片
	imagecopymerge($image, $water, $info[0]-$markInfo[0]-10,$info[1]-$markInfo[1]-10, 0, 0, $markInfo[0], $markInfo[1], 50);
	//imagecopy($image,$water,$info[0]-$markInfo[0]-10,$info[1]-$markInfo[1]-10,0,0,$markInfo[0], $markInfo[1]);
	//7、销毁水印图片
	imagedestroy($water);

	/* 输出图片 */
	//1、浏览器输出
	header("Content-type:" . $info['mime']);
	$outputfunc = "image{$type}";
	$outputfunc($image);
	//2、保存图片
	$outputfunc($image, "image_mark." . $type);

	/* 销毁图片 */
	imagedestroy($image);
	return true;
}

$img = '/www/wwwroot/www.fin110.com/public/ueditor/php/upload/image/20200620/1592619687502983.jpg';
watermark($img);

































?>