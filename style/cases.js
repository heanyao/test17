var api_address = __HOMEURL__;
var article_id = 13;

$(function() {
	$('.j_support>button').hover(function() {
		$(this).children('img').attr('src', '/static/index/images/woshou2.png');
	}, function() {
		$(this).children('img').attr('src', '/static/index/images/woshou.png');
	});
	$('.j_process_c_img img').click(function() {
		var _this = $(this); //将当前的pimg元素作为_this传入函数
		imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
	});
	get_ding_img_list();
});


/*图片放大相关操作*/
function imgShow(outerdiv, innerdiv, bigimg, _this) {
	var src = _this.attr("src"); //获取当前点击的pimg元素中的src属性
	$(bigimg).attr("src", src); //设置#bigimg元素的src属性

	/*获取当前点击图片的真实大小，并显示弹出层及大图*/
	$("<img/>").attr("src", src).load(function() {
		var windowW = $(window).width(); //获取当前窗口宽度
		var windowH = $(window).height(); //获取当前窗口高度
		var realWidth = this.width; //获取图片真实宽度
		var realHeight = this.height; //获取图片真实高度
		var imgWidth, imgHeight;
		var scale = 0.8; //缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

		if (realHeight > windowH * scale) { //判断图片高度
			imgHeight = windowH * scale; //如大于窗口高度，图片高度进行缩放
			imgWidth = imgHeight / realHeight * realWidth; //等比例缩放宽度
			if (imgWidth > windowW * scale) { //如宽度扔大于窗口宽度
				imgWidth = windowW * scale; //再对宽度进行缩放
			}
		} else if (realWidth > windowW * scale) { //如图片高度合适，判断图片宽度
			imgWidth = windowW * scale; //如大于窗口宽度，图片宽度进行缩放
			imgHeight = imgWidth / realWidth * realHeight; //等比例缩放高度
		} else { //如果图片真实高度和宽度都符合要求，高宽不变
			imgWidth = realWidth;
			imgHeight = realHeight;
		}
		$(bigimg).css("width", imgWidth); //以最终的宽度对图片缩放

		var w = (windowW - imgWidth) / 2; //计算图片与窗口左边距
		var h = (windowH - imgHeight) / 2; //计算图片与窗口上边距
		$(innerdiv).css({
			"top": h,
			"left": w
		}); //设置#innerdiv的top和left属性
		$(outerdiv).fadeIn("fast"); //淡入显示#outerdiv及.pimg
		$("body").css('overflow', 'hidden');
	});

	$(outerdiv).click(function() { //再次点击淡出消失弹出层
		$(this).fadeOut("fast");
		$("body").css('overflow', 'auto');
	});

	
}
// 初始展示数量
var ding_list_max = 17;

var img_data = [];
function get_ding_img_list() {
	// $(this).attr('src','./images/sc_star_ed.png');
	$('#ding_img_list').html('');
	ding_list_max = 17;
	$.ajax({
		url: api_address + '/api/cases/supporters?case_id='+article_id,
		type: 'get',
		dataType: 'json',
		success: function(data) {
			
			if(data.code ===200){
				var d = eval(data.data);
				img_data = d;
				
				for (let i = 0; i < d.length; i++) {
					if(i>=ding_list_max){break;}
					$('#ding_img_list').append('<img onclick="to_details('+d[i].id+')" src="'+api_address+d[i].head_img_url+'">');
				}
				if(d.length>ding_list_max){
					$('#ding_img_list').append('<div class="more_imgs"  onclick="more_imgs()">+'+(d.length-ding_list_max)+'</div>');
				}
				
			}
			
		},
		error: function() {
			console.log('错误');
		}
	});
}

function more_imgs(){
	for (let i = ding_list_max; i < img_data.length; i++) {
		
		//$('#ding_img_list').append('<img src="'+api_address+img_data[i].head_img_url+'">');
		$('.more_imgs').before('<img onclick="to_details('+img_data[i].id+')" src="'+api_address+img_data[i].head_img_url+'">');
	}
	$('.more_imgs').css('display','none');
}
function to_details(id){
	window.location.assign(api_address+'/profiledetails/'+id);
}
function ding() {
	$.ajax({
		url: api_address + '/api/cases/addding?case_id=' + article_id + '&type=1',
		type: 'get',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			if (data.code == 'add200') {
				Dialog.info("提示", '操作成功!');
				$('.mini-dialog-footer').css('height', '64px');
				get_ding_img_list();
				
			} else {
				Dialog.warn("提示", data.msg);
				$('.mini-dialog-footer').css('height', '64px');
			}
		},
		error: function() {
			console.log('错误');
		}
	});
}
