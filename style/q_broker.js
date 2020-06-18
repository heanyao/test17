var wyyz_num = $('.q_wyyx_box>span').length;
var wyyz_max = 9;
var wyyz_i = 0;
$(function() {
	// logo边框变量,其他颜色自己添加吧
	// var color_green = 'rgba(12, 181, 130, 1)';
	// var color_red = 'rgb(255, 99, 132)';
	// $('.q_jianguan').css('border-color', color_green);
	// $('.q_jianguan_lt').css('background', color_red);
	// $('.q_jg_dsj').css('border-top', '6px solid ' + color_green);
	// $('.q_jg_dsj2').css('border-top', '6px solid ' + color_green);

	if (wyyz_num > wyyz_max) {
		for (let i = 0; i < wyyz_max; i++) {
			$('.q_wyyx_box>span')[i].style.display = 'inline-block';
		}
	} else {
		$('.q_wyyx_box>span').css('display', 'inline-block');
	}
});

function change_wyyx_num() {
	wyyz_i++;
	var now_num = wyyz_i * wyyz_max;
	if ((now_num + wyyz_max) < wyyz_num) {
		$('.q_wyyx_box>span').css('display', 'none');
		for (let i = now_num; i < now_num + wyyz_max; i++) {
			$('.q_wyyx_box>span')[i].style.display = 'inline-block';
		}
	} else {
		$('.q_wyyx_box>span').css('display', 'none');
		for (let i = now_num; i < wyyz_num; i++) {
			$('.q_wyyx_box>span')[i].style.display = 'inline-block';
		}
		wyyz_i = -1;
	}
}

function check_fx() {

	$('#q_ckfx_box').css('display', 'block');

}

function close_ckfx() {
	$('#q_ckfx_box').css('display', 'none');
}

var pinlun_yx_count = 0;

function del_yx(e) {
	$(e).parent().remove();
	pinlun_yx_count--;
}


var tj_yx_list = []
$('.q_yx_items>span').click(function() {
	var text = $(this).text();
	var htmlText = document.createElement('span');
	htmlText.innerHTML = text + '<img onclick="del_yx(this)" src="/static/index/images/icons/icon_clean.png">';
	if (pinlun_yx_count == 3) {
		Dialog.warn("提示", '最多添加三个');
		$('.mini-dialog-footer').css('height', '64px');
		return;
	}
	$('.q_yx_box').append(htmlText);
	pinlun_yx_count++;
	tj_yx_list.push(text);

});
$('.q_zdyyx_img').click(function() {
	var text = $(this).siblings('.q_zdyyx').val();
	if (text != '') {
		var htmlText = document.createElement('span');
		htmlText.innerHTML = text + '<img onclick="del_yx(this)" src="/static/index/images/icons/icon_clean.png">';
		if (pinlun_yx_count == 3) {
			Dialog.warn("提示", '最多添加三个');
			$('.mini-dialog-footer').css('height', '64px');
			return;
		}
		$('.q_yx_box').append(htmlText);
		pinlun_yx_count++;
		$(this).siblings('.q_zdyyx').val('');
		tj_yx_list.push(text);
	}
});


var rate_cost = 0,
	rate_exc = 0,
	rate_fund = 0,
	rate_slip = 0,
	rate_stable = 0,
	rate_service = 0;



$('.q_pl_star img').click(function() {
	$(this).nextAll().attr('src', '/static/index/images/icons/ico_xing_yiban_b.png');
	$(this).prevAll().attr('src', '/static/index/images/icons/ico_xing_wanz_b.png');
	$(this).attr('src', '/static/index/images/icons/ico_xing_wanz_b.png');
	var type = $(this).attr('data-star-type');

	var stars = $(this).attr('data-stars');
	switch (type) {
		case 'rate_cost':
			rate_cost = stars; //成本
			break;
		case 'rate_exc':
			rate_exc = stars; //执行
			break;
		case 'rate_fund':
			rate_fund = stars; //基金
			break;
		case 'rate_slip':
			rate_slip = stars; //滑点
			break;
		case 'rate_stable':
			rate_stable = stars; //卡盘
			break;
		case 'rate_service':
			rate_service = stars; //服务
			break;
		default:
			break;
	}

});



// 评论数据加载

var q_pl_type = '';
var q_pl_page = 1;

$('.q_yhdp_type_item').click(function() {
	var type = $(this).attr('data-type');
	q_pl_type = type;
	$(this).addClass('q_yhdp_active');
	$(this).siblings('span').removeClass('q_yhdp_active')
	get_pl_data();
});
$(function() {
	get_pl_data();
});


// 获取评论列表
function get_pl_data() {
	var broker_id = $('#companie_id').val();
	$.ajax({
		url: api_address + "/api/broker/getmessages/",
		type: 'post',
		dataType: 'json',
		data: {
			'broker_id': broker_id,
			'support': q_pl_type,
			'page': q_pl_page
		},
		success: function(data) {
			console.log(data);
			if (data.code === 200) {
				var d = data.data.leavemsg;
				var htmlText = '';
				for (let j = 0; j < d.length; j++) {
					var time = d[j].create_time * 1000
					let date = new Date(time);
					htmlText +=
						'<div class="q_pl_item q_row" >	\
						<img onclick="head_to('+d[j].netizen_id+')" style="cursor: pointer;" src="' + api_address + d[j].head_img_url +
						'" class="q_pl_tx" alt="">\
								<div class="q_pl_item_content">\
									<p class="q_row q_pl_title">\
										<span class="q_pl_name">\
											' +
						d[j].name;
					if (d[j].support == 1) {
						htmlText += '<img src="/static/index/images/icons/ico_hp.png"> <span>推荐</span>';
					}
					if (d[j].support == 2) {
						htmlText += '<img src="/static/index/images/icons/ico_yb.png"> <span>一般</span>';
					}
					if (d[j].support == 3) {
						htmlText += '<img src="/static/index/images/icons/ico_cp.png"> <span>不推荐</span>';
					}
					htmlText += '</span>\
										<span class="q_pl_time">' + formatDate(date, 'yyyy-MM-dd hh:mm') +
						'</span>\
									</p>\
									<p class="q_pl_star">\
										<span>交易成本</span>\
										<span>';
					for (let i = 0; i < d[j].rate_cost; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_wanz_b.png">';
					}
					for (let i = 0; i < 5 - d[j].rate_cost; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_yiban_b.png">';
					}

					htmlText += '</span>\
										<span>出入金</span>\
										<span>';
					for (let i = 0; i < d[j].rate_fund; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_wanz_b.png">';
					}
					for (let i = 0; i < 5 - d[j].rate_fund; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_yiban_b.png">';
					}
					htmlText += '</span>\
										<span>卡盘掉线</span>\
										<span>';
					for (let i = 0; i < d[j].rate_stable; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_wanz_b.png">';
					}
					for (let i = 0; i < 5 - d[j].rate_stable; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_yiban_b.png">';
					}
					htmlText += '</span></p>\
									<p class="q_pl_star">\
										<span>订单执行</span>\
										<span>';
					for (let i = 0; i < d[j].rate_exc; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_wanz_b.png">';
					}
					for (let i = 0; i < 5 - d[j].rate_exc; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_yiban_b.png">';
					}
					htmlText += '</span>\
										<span>交易滑点</span>\
										<span>';
					for (let i = 0; i < d[j].rate_slip; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_wanz_b.png">';
					}
					for (let i = 0; i < 5 - d[j].rate_slip; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_yiban_b.png">';
					}
					htmlText += '</span>\
										<span>客户服务</span>\
										<span>';
					for (let i = 0; i < d[j].rate_service; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_wanz_b.png">';
					}
					for (let i = 0; i < 5 - d[j].rate_service; i++) {
						htmlText += '<img src="/static/index/images/icons/ico_xing_yiban_b.png">';
					}
					htmlText += '</span></p>\
									<p class="q_pl_star">\
										<span>印象</span>';
					if (d[j].impress != null && d[j].impress != '') {
						var yxtext = d[j].impress.split(',');
						for (let i = 0; i < yxtext.length; i++) {
							htmlText += '<span class="q_pl_yx_itme">' + yxtext[i] + '</span>';
						}
					}
					htmlText += '</p>\
									<div class="q_pl_text">' + d[j].msg +
						'</div><div class="q_huifu_text q_row">';
					if (d[j].comment_pics != null && d[j].comment_pics != '') {
						var imgs = d[j].comment_pics.split(',');
						for (let i = 0; i < imgs.length; i++) {
							htmlText += '<img onclick="q_huifu_img(this)" class="imgs" src="' + api_address + imgs[i] + '">';
						}
					}
					htmlText += '</div>\
									<p class="q_pl_zan">\
										<span class="q_zan"><span class="ding_num">' + d[
							j].ding_sum + '</span><img src="/static/index/images/icons/ico_dianzai.png" data-ding-type="1" onclick="ding(this,' + d[j].id +
						')"></span>\
										<span class="q_huifu" onclick="q_huifu(this,' + d[j].id +
						')">回复</span>\
									</p>';

					htmlText += '';
					if (d[j].children) {
						c_list = [];
						get_childs(d[j].id, d[j].name, d[j].children);
						
						for (let i = 0; i < c_list.length; i++) {
							var time = c_list[i].time * 1000
							let date = new Date(time);
							
							if(c_list[i].is_shang==1){
								htmlText+='<div class="q_qy_huifu">\
										<p class="q_row q_pl_title">\
											<span class="q_pl_name">\
												<img style="cursor: pointer;" onclick="head_to('+c_list[i].netizen_id+')" src="' +
												api_address + c_list[i].head_img_url + '" class="q_pl_tx" alt="">' + c_list[i].name +
								'\
											</span>\
											<span class="q_pl_time">'+ formatDate(date, 'yyyy-MM-dd hh:mm') +'</span>\
										</p>\
										<div class="q_huifu_text q_row">'+c_list[i].msg+'</div>\
									</div>';
							}else{												
							htmlText +=
								'<div class="q_yb_huifu">\
											<p class="q_row q_pl_title">\
												<span class="q_pl_name">\
													<img style="cursor: pointer;" onclick="head_to('+c_list[i].netizen_id+')" src="' +
								api_address + c_list[i].head_img_url + '" class="q_pl_tx" alt="">' + c_list[i].name +
								'<span class="q_zff_text">回复<span class="q_zzff"> @' + c_list[i].parent_name +
								'</span></span>\
												</span>\
												<span class="q_pl_time">' + formatDate(date, 'yyyy-MM-dd hh:mm') +
								'</span>\
											</p>\
											<div class="q_huifu_text q_row">'+c_list[i].msg+
						'</div><div class="q_huifu_text q_row">';
							if (c_list[i].comment_pics != null && c_list[i].comment_pics != '') {
								var imgs = c_list[i].comment_pics.split(',');
								
								for (let i = 0; i < imgs.length; i++) {
									console.log(imgs[i])
									htmlText += '<img onclick="q_huifu_img(this)" class="imgs" src="' + api_address + imgs[i] + '">';
								}
							}
							htmlText +=
								'</div>\
											<p class="q_pl_zan">\
												<span class="q_huifu" onclick="q_huifu(this,' + d[j].id +
								')">回复</span>\
											</p>\
										</div>';
							}
						}
					}
					htmlText += '</div></div>';
				}
			}
			$("#q_pl_item_html").html(htmlText);
			var page = data.data;
			$('.pages').html('');
			$('.pages').append('<div class="tcdPageCode"></div>');
			$(".tcdPageCode").createPage({
				pageCount: page.total_page,
				current: q_pl_page,
				backFn: function(p) {
					q_pl_page = p;
					get_pl_data();
					$('body,html').animate({scrollTop: $('#q_pl_item_html').offset().top}, 500);
				}
			});

		},
		error: function(e) {
			console.log('错误')

		}

	});
}

var c_list = []
function head_to(id){
	window.location.assign("http://www.testweb.com/"+id);
}
function get_childs(id, name, child) {
	for (let i = 0; i < child.length; i++) {
		c_list.push({
			'parent_id': id,
			'parent_name': name,
			'comment_pics': child[i].comment_pics,
			'head_img_url': child[i].head_img_url,
			'msg': child[i].msg,
			'name': child[i].name,
			'time': child[i].create_time,
			'is_shang':child[i].is_shang
		});
		if (child[i].children) {
			get_childs(child[i].id, child[i].name, child[i].children);
		}
	}


}

// 提交评论
var q_tj_support = 0;
// 选择推荐
function q_tj_sup(e, type) {
	$(e).siblings('button').removeClass('sup_active');
	$(e).addClass('sup_active');
	q_tj_support = type;
}

// 提交重置
function tj_reset() {
	pinlun_yx_count = 0
	tj_yx_list = [];
	$('.q_yx_box').html('');
	q_tj_support = 0;
	$('.q_tj_pj').find('.sup_active').removeClass('sup_active');
	rate_cost = 0;
	rate_exc = 0;
	rate_fund = 0;
	rate_slip = 0;
	rate_stable = 0;
	rate_service = 0;
	$('.q_tj_pf span img').attr('src', '/static/index/images/icons/ico_xing_yiban_b.png');
	up_img_list = [];
	$('.img_sp').html('');
}

function q_tj_pl() {
	var msg = $('.q_tj_msh').html();
	if (q_tj_support == 0) {
		Dialog.warn("提示", '请选择评价!');
		$('.mini-dialog-footer').css('height', '64px');
		return;
	}
	var broker_id = $('#companie_id').val();
	$.ajax({
		url: api_address + '/api/broker/leavemessages',
		type: 'post',
		dataType: 'json',
		data: {
			'broker_id': broker_id,
			'support': q_tj_support,
			'impress': tj_yx_list.join(','),
			'msg': msg,
			'images': up_img_list.join(','),
			'rate_cost': rate_cost,
			'rate_exc': rate_exc,
			'rate_fund': rate_fund,
			'rate_slip': rate_slip,
			'rate_stable': rate_stable,
			'rate_service': rate_service
		},
		success: function(data) {
			if (data.code == 200) {
				tj_reset();
				get_pl_data();

			}
		},
		error: function(e) {

		}
	});
}

// 图片预览的地方
var up_img_place = 0;
var up_img_list = [];

function up_imgs(type) {
	if (type != up_img_place) {
		up_img_list = [];
		$('.img_sp').html('');
	}
	up_img_place = type;
	$("#q_th_img").click();
}


function q_tj_imgs(pic) {
	if (!pic.files || !pic.files[0]) {
		return;
	}
	var data = new FormData();
	data.append('images', pic.files[0]);
	$.ajax({
		url: api_address + '/api/broker/upload',
		type: 'post',
		data: data,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(data) {
			if (data.code == 200) {
				var url = data.data;
				if (up_img_list.length > 2) {
					Dialog.warn("提示", '一次的最多添加三张图片！');
					$('.mini-dialog-footer').css('height', '64px');
					return;
				}
				up_img_list.push(url);
				$('.img_sp').html('');
				if (up_img_place == 1) {
					for (let i = 0; i < up_img_list.length; i++) {
						$('.img_sp1').append('<div><img src="' + api_address + up_img_list[i] + '" /><span onclick="del_up_img(this,' +
							i + ')" class="img_del">x</span><div>')
					}
				} else {
					for (let i = 0; i < up_img_list.length; i++) {
						$('.img_sp2').append('<div><img src="' + api_address + up_img_list[i] + '" /><span onclick="del_up_img(this,' +
							i + ')" class="img_del">x</span><div>')
					}
				}

			}
			478
		},
		error: function(e) {
			console.log(e);
		}
	});
}

function del_up_img(e, index) {
	$(e).parent().remove();
	up_img_list.splice(index, 1);
}


//顶
function ding(e, id) {
	var ding_type = $(e).attr('data-ding-type');

	$.ajax({
		url: api_address + '/api/broker/addding',
		type: 'post',
		dataType: 'json',
		data: {
			'comment_id': id,
			'type': ding_type
		},
		success: function(data) {
			if (data.code == 'add200') {
				$(e).attr('data-ding-type', '2');
				$(e).attr('src', '/static/index/images/icons/ico_dianzai_s.png');
				$(e).siblings('.ding_num').text(data.data.data.ding_sum);
			} else if (data.code == 'delete200') {
				$(e).attr('data-ding-type', '1');
				$(e).attr('src', '/static/index/images/icons/ico_dianzai.png');
				$(e).siblings('.ding_num').text(data.data.data.ding_sum);
			} else {
				Dialog.warn("提示", data.msg);
				$('.mini-dialog-footer').css('height', '64px');
			}
		},
		error: function(e) {

		}
	});
}
//关注
function shoucang(e) {
	var broker_id = $('#companie_id').val();
	var sc_type = $(e).attr('data-sc-type');

	$.ajax({
		url: api_address + '/api/broker/addkeep',
		type: 'post',
		dataType: 'json',
		data: {
			'broker_id': broker_id,
			'type': sc_type
		},
		success: function(data) {
			if (data.code == 'add200') {
				$(e).attr('data-sc-type', '2');
				$(e).attr('src', '/static/index/images/icons/ico_xing_wanz_b.png');
				$(e).next().text('已关注');
			} else if (data.code == 'delete200') {
				$(e).attr('data-sc-type', '1');
				$(e).attr('src', '/static/index/images/icons/ico_xq_guanzhu.png');
				$(e).next().text('关注');
			} else {
				Dialog.warn("提示", data.msg);
				$('.mini-dialog-footer').css('height', '64px');
			}

		},
		error: function(e) {

		}
	});
}
