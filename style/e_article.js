$(function(){
	var show_count = 0;
	window.onmousewheel = function(e){	
		if(e.wheelDelta<0){
			var is_show = $('.article_top_hide').css('display');
			if(is_show == 'none'){ 
			  $('.hide_top').css('display','none');
			  $('.article_top').css('display','none');
			  $('.article_top_hide').fadeIn();
			}
		}
		if($(document).scrollTop() == 0){
			var is_show = $('.article_top_hide').css('display');
			if(is_show == 'block'){
			  $('.article_top_hide').css('display','none');
			  $('.hide_top').css('display','block');
			  $('.article_top').css('display','block');
			}
			
		};		
	}
	$(".select_list").click(function(){
		var status = $(this).children('img').attr('name');
		var top = $(this).position().top+30;
		var left = $(this).position().left;
		if(status=='down'){
			$(this).children('img').attr('src','./images/up_white.png');
			$(this).children('img').attr('name','up');
			$('.country_list').css({'display':'flex','top':top+'px','left':left+'px'});
			
		}
		else{
			$(this).children('img').attr('src','./images/down_white.png');
			$(this).children('img').attr('name','down');
			$('.country_list').css({'display':'none'});
			
		}
		
	});
	$('.article_tab').click(function(){
		$('.country_list').css({'display':'none'});
		$(".select_list").children('img').attr('src','./images/down_2.png');
		$(".select_list").children('img').attr('name','down');
		$(this).addClass('tab_selected');
		$(this).siblings('a').removeClass('tab_selected');
	});
	$('.date_select a').click(function(){
		$(this).addClass('selected_date');
		$(this).siblings('a').removeClass('selected_date')
	});
	$('.country_item').click(function(){
		$(this).addClass('country_selected');
		$(this).siblings('label').removeClass('country_selected')
	});
	$(".select_list").hover(
		function(){
			var status = $(this).children('img').attr('name');
			if(status=='down'){
				$(this).children('img').attr('src','./images/down_white.png');
			}
			else{
				$(this).children('img').attr('src','./images/up_white.png');
			}
		},
		function(){
			var status = $(this).children('img').attr('name');
			if(status=='down'){
				$(this).children('img').attr('src','./images/down_2.png');
			}
			else{
				$(this).children('img').attr('src','./images/up.png');
			}
		}
	);
	
	
	
});

function change_ding(){
	$('.star_img').hover(
		function(){
			$(this).attr('src','./images/dinged@1x.png');
		},
		function(){
			$(this).attr('src','./images/ding.png');
		}
	);
}
$(function(){
	//初始排行为今日
	var charts_type = 1;
	getCharts_list(charts_type);
	//初始文章为 热门 全部
	var article_address = apiAddress+'/api/article/getrecarticle?country=0&type=0';
	get_article_list(article_address);
	last_get_article_address = article_address;
});

function getCharts_list(charts_type){
	$.ajax({
		url:apiAddress+'/api/article/gettop10?type='+charts_type,
		type:'get',
		dataType:'json',
		success:function(data){
			if(data.code === 200){
				var d = eval(data.data);
				var list_html = '';
				for (let i = 0; i < d.length; i++) {
					list_html+='<div><img src="'+apiAddress+d[i].logo_url+'"><p onclick="charts_user_id('+d[i].myid+')">'+d[i]. name_cn+'</p><div class="p_future">'+d[i]. future_index+'</div></div>'
				}
				$("#charts_items").html(list_html);
			}
		},
		error:function(e){
			console.log('请求错误');
		}
	});
}
var last_get_article_address = '';
function get_article_list(address){
	$.ajax({
		url:address,
		type:'get',
		dataType:'json',
		success:function(data){		
			if(data.code === 200){
				var d = eval(data.data.data);
				console.log(data);
				var list_html = '';
				var current_page = data.data.current_page;
				var last_page = data.data.last_page;
				var pre_number = data.data.per_page;
				for (let i = 0; i < d.length; i++) {
					list_html+='<div class="article_item e_row" onclick="to_article_detail('+d[i].id+')"><img src="'+apiAddress+d[i].thumb+'"><div><p class="article_title">'+d[i].title+'</p>'+'\n'
					+'<div class="article_text">'+d[i].abstract+'</div><div class="article_bottom e_row"><div class="e_row article_info">'+'\n'
					+'<label>By &nbsp;</label><img src="'+apiAddress+d[i].head_img_url+'" ><a href="javascript:;" onclick="to_article_user('+d[i].publisher_id+')" class="info_name"> '+d[i].name+'</a>'+'\n'
					+'</div></div></div></div>';
				}
				//添加分页	
				list_html+= '<div class="pages"><div class="tcdPageCode"></div></div>'
				$("#article_list_pages").html(list_html);	
				//分页设置	
				set_pages(last_page,current_page,pre_number);
				change_ding();
			}
		},
		error:function(e){
			console.log('请求错误');
		}
	});
}
function set_pages(last_page,current_page,pre_number){
	$(".tcdPageCode").createPage({
	    pageCount: last_page,
	    current: current_page,
	    backFn: function (p) {
			if(last_get_article_address!=''){
				var address = last_get_article_address+'&num='+pre_number+'&page='+p;	
				console.log(address);
				get_article_list(address);
			}
	    }
	});
};



var top_type_id = 0;
var country_id = 0;
var article_type = 0;
//文章列表类型 0 为热门 1 为最新
function articleHot(){
	var address ;
	article_type = 0;
	address = apiAddress+'/api/article/getrecarticle?country='+country_id+'&type='+top_type_id;
	get_article_list(address);
	last_get_article_address = address;
}
function articleNew(){
	article_type = 1;
	var address = apiAddress+'/api/article/getnewarticle?country='+country_id+'&type='+top_type_id;
	get_article_list(address);
	last_get_article_address = address;
}
function articleByCountry(c_id){
	var address ;
	country_id = c_id;
	if(article_type == 0){
		address = apiAddress+'/api/article/getrecarticle?country='+c_id+'&type='+top_type_id;
	}else{
		address = apiAddress+'/api/article/getnewarticle?country='+c_id+'&type='+top_type_id;
	}
	$('.select_list').children('img').attr('src','./images/down_2.png');
	$('.select_list').children('img').attr('name','down');
	$('.country_list').css({'display':'none'});
	get_article_list(address);
	last_get_article_address = address;	
}
function top_type(top_type_num){
	top_type_id = top_type_num;
	var address = apiAddress+'/api/article/getrecarticle?country=0&type='+top_type_num;
	$('.top_menu').children('a').removeClass('menu_selected');
	$('.top_menu a[name="top_type_'+top_type_num+'"]').addClass('menu_selected');
	get_article_list(address);
	last_get_article_address = address;
}
//排行榜用户ID
function charts_user_id(user_id){
	window.location.assign(apiAddress+'/broker/myid='+user_id);
}

//顶 按钮事件
function ding(event,article_id,e){
	$.ajax({
		url:apiAddress+'/articles/ding/'+article_id+'/1',
		type:'get',
		dataType:'json',
		success:function(data){
			if(data.code =='add200'){
				var ding_sum = data.data.ding_sum;
				$(event).siblings('.star_number').html(ding_sum);
			}
			else{
				Dialog.warn("提示", data.msg);
				$('.mini-dialog-footer').css('height','64px');
			}
			
		},error:function(e){
			console.log(apiAddress+'/articles/ding/'+article_id+'/1');
			console.log('请求错误');
		}
	});
	var e = e || window.event;
	e.stopPropagation();
	
}

function toAdd(){
	window.location.assign('add_article.html');
}
function to_article_user(user_id){
	window.location.assign('http://fin110.com/profiledetails/'+user_id);
	var e = e || window.event;
	e.stopPropagation();
}
function to_article_detail(article_id){
	window.location.assign('http://fin110.com/article/'+article_id);
}