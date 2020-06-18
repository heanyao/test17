/***
 * 第三方
 */
///**
// * Created by Lauren on 2020/5/14.
// */www.
var baseUrl = __HOMEURL__;
var baseUrl1 = __HOMEURL__;


/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {};
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }var params = [];
    for (var key in opt.data){
        params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    }
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            opt.success(JSON.parse( xmlHttp.responseText));//如果不是json数据可以去掉json转换
        }
    };
}



/***人工智能*/
/**@param indexV:当前下标，idN：数据id*/
function js_ificialMethod(indexV,idN){
    // var sp = document.getElementsByTagName("a");
     var sp = document.querySelectorAll('.owl-item a');
    // var sp = document.getElementById('owl-benefits').document.getElementsByTagName("a");
    for(var j = 0; j < sp.length; j++) {
        sp[j].className = "";
    }
    console.log('indexV',indexV,'idN',idN);
    sp[indexV].className = "current";
    var finalUrl = baseUrl+'/api/regulation/brokerlist?regulation_id='+idN;
    console.log('finalUrl',finalUrl);
    ajax({
        method: 'get',
        url:finalUrl,
        success: function (OriginalFromActivity) {
            //在这里对获取的数据经常操作
            //console.log('请求数据111111--OriginalFromActivity:'+  OriginalFromActivity);
            //console.log('请求数据--OriginalFromActivity:'+  JSON.stringify(OriginalFromActivity));
            let OriginalFromActivityData = JSON.stringify(OriginalFromActivity);
			var data = eval('('+OriginalFromActivityData+')');
			var dataInformation = data.data;
            var logo_list = dataInformation.logo_list;
            var commission_info = dataInformation.commission_info;
            var country_id = commission_info.country_id;
			//console.log('commission_info',commission_info,'country_id',country_id);
            console.log('logo_list',logo_list);
			/**********/
			var  mediahtml ='';
			
            mediahtml+=
			`<div class="row">
            <div class="col-sm-4 col-md-4 col-xs-12">
                <div class="container_fluid_pag">
                    <img src=" ${commission_info.c_logo}">
                </div>
            </div>
            <div class="col-sm-5 col-md-5 col-xs-12">
                <div class="container_fluid_name">
                    <img src=" ${country_id.flag}" class="con_fluid_img"><h3 class="con_fluid_tit">${commission_info.c_name_cn}</h3>
                </div>
                <div>
                    <p>
                        <font class="font_lab_inst">成立时间：</font><font class="font_lab_time">${commission_info.found_year}</font>
                        <font class="font_lab_inst">机构性质：</font><font class="font_lab_time">${commission_info.role}</font>
                        <font class="font_lab_inst">监管等级：</font><img src="/static/index/images/pic_xq_gao${commission_info.c_level}.png">
                    </p>
                </div>
                <div>
                    <p>${commission_info.dsc}</p>
                </div>
                <div>
                    <div class="con_fluid_nolab">
                        <p><img src="/static/index/images/noen.png"></p>
                        <p>免英文</p>
                    </div>
                    <div class="con_fluid_nolab">
                        <p><img src="/static/index/images/engcn.png"></p>
                        <p>免翻墙</p>
                    </div>
                    <div class="con_fluid_nolab">
                        <p><img src="/static/index/images/authorithy.png"></p>
                        <p>权威</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-3 col-md-3 col-xs-12">
                <div class="container_fluid_btn">

                    
                </div>
            </div>
        </div>`;
			

			var containerFluid = document.getElementById('container-fluid');
			containerFluid.innerHTML=mediahtml;
			
			var ulListHtml ='';
			var liData = logo_list.data;
            console.log('logo_list',logo_list);
			for(var i=0;i<liData.length;i++){
				let nowData = liData[i];
                console.log('i',i,'nowData',nowData);
                let status = nowData.status;
				ulListHtml+=`
				 <li class="drag-items">
				    <a href="/broker/${nowData.myid}.html" target="_blank">
				     <div class="drag-items_t_img">
				                            <img src=" ${nowData.logo_url}">
				                        </div>
				                        <div class="drag-items_t_line"></div>
				                        <h4><font>${nowData.name_en}</font><font> · </font><font>${nowData.name_cn}</font></h4>
				                        <p class="drag-items_txt_year">
				                            <font>${nowData.tag_year}</font><font class="drag-items_font">|</font>
				                            <font>${nowData.tag_regulation}</font><font class="drag-items_font">|</font>
											<font>${nowData.tag_license}${nowData.tag_mt4}</font>
				                        </p>
				                        <div class="drag-items_cc">
				                            <div class="drag-items_cc_lab">
				                                <p>${nowData.future_index}</p>
				                                <p>发展排名</p>
				                            </div>
				                            <div class="drag-items_cc_lab">
				                                <p>${nowData.reply_rate}%</p>
				                                <p>回复率</p>
				                            </div>
				                            <div class="drag-items_cc_lab">
				                                <p>${nowData.support_rate}%</p>
				                                <p>好评率</p>
				                            </div>
				                        </div>
				                        <div class="drag-items_pos" style="background-color:${status.color};">
				                            <p class="drag-items_p_txt">${status.name}</p>
				                        </div>
				    </a>
				 </li>
				`;
			}

                ulListHtml+=`
			<li class="drag-items">
			    <a href="/index/user/c_login.html" target="_blank">
			      <div class="drag-items_last">
			        <p>
			            <img src="/static/index/images/companyLogo.png">
			        </p>
			        <h4>更多请登录官方网站</h4>
			      </div>
			    </a>
			</li>
			`

			var ulDragList = document.getElementById('ul_drag-list');
			ulDragList.innerHTML=ulListHtml;
			
        }
    })
}

window.onload = function() {
    //默认选第一个，初始传的id
    js_ificialMethod(0,1);
}






