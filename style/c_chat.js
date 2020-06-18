var chat_is_open = false;
var f_id = window.localStorage.getItem('f_id') || 2;
var f_name = window.localStorage.getItem('f_name') || 'name';
var f_head_img = window.localStorage.getItem('f_head_img') || "/static/index/images/icon01.png";
// consloe.log(f_head_img);
// var my_h_img = '/static/index/images/icon02.png';
var my_h_img = photo_url;

function f_Date(time) {
	time = time * 1000
	let date = new Date(time);
	return formatDate(date, 'yyyy-MM-dd hh:mm')
}
$(function() {
	screenFuc();
	chat_open();

	function screenFuc() {
		var topHeight = $(".chatBox-head").innerHeight(); //聊天头部高度
		//屏幕小于768px时候,布局change
		var winWidth = $(window).innerWidth();
		if (winWidth <= 768) {
			var totalHeight = $(window).height(); //页面整体高度
			$(".chatBox-info").css("height", totalHeight - topHeight);
			var infoHeight = $(".chatBox-info").innerHeight(); //聊天头部以下高度
			//中间内容高度
			$(".chatBox-content").css("height", infoHeight - 46);
			$(".chatBox-content-demo").css("height", infoHeight - 46);

			$(".chatBox-list").css("height", totalHeight - topHeight);
			$(".chatBox-kuang").css("height", totalHeight - topHeight);
			
		} else {
			$(".chatBox-info").css("height", 495);
			$(".chatBox-content").css("height", 448);
			$(".chatBox-content-demo").css("height", 448);
			$(".chatBox-list").css("height", 495);
			$(".chatBox-kuang").css("height", 495);
			
		}
	}
	(window.onresize = function() {
		screenFuc();
	})();


	//进聊天页面
	function chat_open() {
		//传名字
		$(".chatBox-head-one").toggle();
		$(".chatBox-head-two").toggle();
		$(".chatBox-list").fadeToggle();
		//聊天框默认最底部
		setTimeout(function(){
			$(document).ready(function() {
				$("#chatBox-content-demo").animate({'scrollTop':$("#chatBox-content-demo")[0].scrollHeight},1000);
				//$("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
			});
		},2000);
		
	};
	//      发送信息
	$("#chat-fasong").click(function() {
		if (f_id == null) {
			return;
		}
		var textContent = $(".div-textarea").html().replace(/[\n\r]/g, '<br>')
		$.ajax({
			url: api_address + '/api/messages/sendmsg',
			type: 'post',
			dataType: 'json',
			data: {
				'from_uid': f_id,
				'content': textContent,
				'type': 0
			},
			success: function(data) {
				if (data.code == 200) {
					if (data.data.content != "") {
						$(".chatBox-content-demo").append("<div class=\"clearfloat\">" +
							"<div class=\"author-name\"><small class=\"chat-date\">" + f_Date(data.data.addtime) +
							"</small> </div> " +
							"<div class=\"right\"> <div class=\"chat-message\"> " + data.data.content + " </div> " +
							"<div class=\"chat-avatars\"><img src=" + my_h_img + " alt=\"头像\" /></div> </div> </div>");
						//发送后清空输入框
						$(".div-textarea").html("");
						//聊天框默认最底部
						$(document).ready(function() {
							$("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
						});

						storageMsg(data.data);

					}
				}else{
				Dialog.warn("提示", data.msg);
				$('.mini-dialog-footer').css('height','64px');
				}
			},
			error: function(e) {
				console.log(e);
			}
		});

	});

	//      发送表情
	$("#chat-biaoqing").click(function() {
		$(".biaoqing-photo").toggle();
	});
	$(document).click(function() {
		$(".biaoqing-photo").css("display", "none");
	});
	$("#chat-biaoqing").click(function(event) {
		event.stopPropagation(); //阻止事件
	});

	$(".emoji-picker-image").each(function() {
		if (f_id == null) {
			return;
		}
		$(this).click(function() {
			var bq = $(this).attr('data-emoji-num')

			$.ajax({
				url: api_address + '/api/messages/sendmsg',
				type: 'post',
				dataType: 'json',
				data: {
					'from_uid': f_id,
					'content': bq,
					'type': 2
				},
				success: function(data) {
					if (data.code == 200) {
						var bq_num = data.data.content;
						var bq_html = $('li>span[data-emoji-num="' + bq_num + '"]')[0].outerHTML;
						$(".chatBox-content-demo").append("<div class=\"clearfloat\">" +
							"<div class=\"author-name\"><small class=\"chat-date\">" + f_Date(data.data.addtime) +
							"</small> </div> " +
							"<div class=\"right\"> <div class=\"chat-message\"> " + bq_html + " </div> " +
							"<div class=\"chat-avatars\"><img src=" + my_h_img + " alt=\"头像\" /></div> </div> </div>");
						//发送后关闭表情框
						$(".biaoqing-photo").css('display', 'none');
						//聊天框默认最底部
						$(document).ready(function() {
							$("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
						});

						storageMsg(data.data);
					}
				},
				error: function(e) {
					console.log(e);
				}
			});

		})
	});


});
//      发送图片
function selectImg(pic) {
	if (f_id == null) {
		return;
	}
	if (!pic.files || !pic.files[0]) {
		return;
	}
	var data = new FormData();
	data.append('image', pic.files[0]);
	$.ajax({
		url: api_address + '/api/messages/upload',
		type: 'post',
		data: data,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(data) {
			if (data.code == 200) {
				add_to_msg_img(data.data);
			}
		},
		error: function(e) {
			console.log(e);
		}
	});



}

function add_to_msg_img(url) {
	$.ajax({
		url: api_address + '/api/messages/sendmsg',
		type: 'post',
		dataType: 'json',
		data: {
			'from_uid': f_id,
			'content': url,
			'type': 1
		},
		success: function(data) {
			console.log(data);
			if (data.code == 200) {
				$(".chatBox-content-demo").append("<div class=\"clearfloat\">" +
					"<div class=\"author-name\"><small class=\"chat-date\">" + f_Date(data.data.addtime) + "</small> </div> " +
					"<div class=\"right\"> <div class=\"chat-message\"><img style=\"cursor: pointer;\" onclick=\"check_big_img(this)\" src=" + api_address + data.data.content + "></div> " +
					"<div class=\"chat-avatars\"><img src=" + my_h_img + " alt=\"头像\" /></div> </div> </div>");
				//聊天框默认最底部
				$(document).ready(function() {
					$("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
				});
				data.data.content = data.data.content.replace(/\\/g,"/");
				storageMsg(data.data);
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}


function storageMsg(data) {
	let msg = '{"content":"'+data.content+'","type":'+data.type+',"addtime":'+data.addtime+'}';
	msg = JSON.parse(msg);

	let dialoglist = localStorage.getItem('dialoglist_'+f_id);
	dialoglist = JSON.parse(dialoglist);
	dialoglist = Array.from(dialoglist);
	dialoglist.push(msg);
	localStorage.removeItem('dialoglist_'+f_id);
	dialoglist = JSON.stringify(dialoglist);
	localStorage.setItem('dialoglist_'+f_id, dialoglist);
}