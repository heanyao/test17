
//点击小图片，显示表情
$(document).on('click','.bq',function(e){	
	$(this).siblings(".face").slideDown(); //慢慢向下展开
	e.stopPropagation(); //阻止冒泡事件
});


//在桌面任意地方点击，关闭表情框
$(document).click(function() {
	$(".face").slideUp(); //慢慢向上收
});

//点击小图标时，添加功能
$(document).on('click','.face ul li',function(){
	let simg = $(this).find("img").clone();
	$(".message").append(" ");
	$(".message").append(simg); //将表情添加到输入框
});
//点击发表按扭，发表内容
$(document).on('click','span.submit',function(){
	let txt = $(".message").html(); //获取输入框内容
	if (!txt) {
		$('.message').focus(); //自动获取焦点
		return;
	}
	let obj = {
		msg: txt
	}
	$('.message').html('') // 清空输入框
});

var huifu_comt_id = 0;
function huifu_tj(id){
	var text = $('.huifu_msg').html();
	
	var broker_id = $('#companie_id').val();
	// up_img_list
	$.ajax({
		url:api_address+'/api/broker/subcomments',
		type:'post',
		dataType:'json',
		data:{
			'broker_id':broker_id,
			'commentid':id,
			'msg':text,
			'images':up_img_list.join(',')
		},
		success:function(data){
			if(data.code==200){
				is_open = false;
				$(document).find('.qq2').remove();
			}
			
		},error:function(e){
			
		}
	});
	
	
	//$(document).find('.qq2').remove(); success
}

function creat_qq_html(id){
var qq_html='<div class="qq qq2">\
	<div class="message huifu_msg" contentEditable="true"></div>\
	<div class="But">\
		<img src="images/emojis/bba_thumb.gif" class="bq" />\
		<img src="images/icons/ico_hf_picture.png" onclick="up_imgs(1)" class="bq2" />\
		<span class="submit" onclick="huifu_tj('+id+')">提交</span>\
		<div class="img_sp img_sp1"></div>\
		<!--face begin-->\
		<div class="face">\
			<ul>\
				<li><img src="images/emojis/smilea_thumb.gif" title="呵呵]"></li>\
				<li><img src="images/emojis/tootha_thumb.gif" title="嘻嘻]"></li>\
				<li><img src="images/emojis/laugh.gif" title="[哈哈]"></li>\
				<li><img src="images/emojis/tza_thumb.gif" title="[可爱]"></li>\
				<li><img src="images/emojis/kl_thumb.gif" title="[可怜]"></li>\
				<li><img src="images/emojis/kbsa_thumb.gif" title="[挖鼻屎]"></li>\
				<li><img src="images/emojis/cj_thumb.gif" title="[吃惊]"></li>\
				<li><img src="images/emojis/shamea_thumb.gif" title="[害羞]"></li>\
				<li><img src="images/emojis/zy_thumb.gif" title="[挤眼]"></li>\
				<li><img src="images/emojis/bz_thumb.gif" title="[闭嘴]"></li>\
				<li><img src="images/emojis/bs2_thumb.gif" title="[鄙视]"></li>\
				<li><img src="images/emojis/lovea_thumb.gif" title="[爱你]"></li>\
				<li><img src="images/emojis/sada_thumb.gif" title="[泪]"></li>\
				<li><img src="images/emojis/heia_thumb.gif" title="[偷笑]"></li>\
				<li><img src="images/emojis/qq_thumb.gif" title="[亲亲]"></li>\
				<li><img src="images/emojis/sb_thumb.gif" title="[生病]"></li>\
				<li><img src="images/emojis/mb_thumb.gif" title="[太开心]"></li>\
				<li><img src="images/emojis/ldln_thumb.gif" title="[懒得理你]"></li>\
				<li><img src="images/emojis/yhh_thumb.gif" title="[右哼哼]"></li>\
				<li><img src="images/emojis/zhh_thumb.gif" title="[左哼哼]"></li>\
				<li><img src="images/emojis/x_thumb.gif" title="[嘘]"></li>\
				<li><img src="images/emojis/cry.gif" title="[衰]"></li>\
				<li><img src="images/emojis/wq_thumb.gif" title="[委屈]"></li>\
				<li><img src="images/emojis/t_thumb.gif" title="[吐]"></li>\
				<li><img src="images/emojis/k_thumb.gif" title="[打哈气]"></li>\
				<li><img src="images/emojis/bba_thumb.gif" title="[抱抱]"></li>\
				<li><img src="images/emojis/angrya_thumb.gif" title="[怒]"></li>\
				<li><img src="images/emojis/yw_thumb.gif" title="[疑问]"></li>\
				<li><img src="images/emojis/cza_thumb.gif" title="[馋嘴]"></li>\
				<li><img src="images/emojis/88_thumb.gif" title="[拜拜]"></li>\
				<li><img src="images/emojis/sk_thumb.gif" title="[思考]"></li>\
				<li><img src="images/emojis/sweata_thumb.gif" title="[汗]"></li>\
				<li><img src="images/emojis/sleepya_thumb.gif" title="[困]"></li>\
				<li><img src="images/emojis/sleepa_thumb.gif" title="[睡觉]"></li>\
				<li><img src="images/emojis/money_thumb.gif" title="[钱]"></li>\
				<li><img src="images/emojis/sw_thumb.gif" title="[失望]"></li>\
				<li><img src="images/emojis/cool_thumb.gif" title="[酷]"></li>\
				<li><img src="images/emojis/hsa_thumb.gif" title="[花心]"></li>\
				<li><img src="images/emojis/hatea_thumb.gif" title="[哼]"></li>\
				<li><img src="images/emojis/gza_thumb.gif" title="[鼓掌]"></li>\
				<li><img src="images/emojis/dizzya_thumb.gif" title="[晕]"></li>\
				<li><img src="images/emojis/bs_thumb.gif" title="[悲伤]"></li>\
			</ul>\
		</div>\
	</div>\
</div>';

return qq_html;
}

var is_open = false;

function q_huifu(e,id){
	if(is_open){
		$(document).find('.qq2').remove();
		is_open = false;
	}
	else{
		$('.img_sp').html('');
		up_img_list = [];
		var qq_html = creat_qq_html(id);
		$(e).parent().append(qq_html);
		huifu_comt_id = id;
		is_open = true;
	}
	
}

