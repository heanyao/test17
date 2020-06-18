var api_address = __HOMEURL__;
var urls = __HOMEURL__;
// var user_id = 1;

function isfollow(id,type, e) {
	let uSid = id;
	let types = type;

	$.ajax({
		url: `${urls}/api/messages/follow?userid=${uSid}&type=${types}`,
		type: 'get',
		dataType: 'json',
		success: function(data) {
			console.log(this.url);
			if (data.code == 400) {
				Dialog.warn("提示", data.msg);
				$('.mini-dialog-footer').css('height', '64px');
			} else if (data.code == 'add200') {
			
				$(e).addClass('c_none');
				$(e).siblings('.c_fol_ygz').removeClass('c_none');
				Dialog.success("提示", data.msg);
				$('.mini-dialog-footer').css('height', '64px');
				
			} else if (data.code == 'delete200') {
				
				$(e).addClass('c_none');
				$(e).siblings('.c_fol_gz').removeClass('c_none');
				Dialog.warn("提示", data.msg);
				$('.mini-dialog-footer').css('height', '64px');
			} else {
				Dialog.success("提示", data.msg);
				$('.mini-dialog-footer').css('height', '64px');
			}
		}

	});
}



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

// 时间戳转换
function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
		}
	}
	return fmt
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length)
}
