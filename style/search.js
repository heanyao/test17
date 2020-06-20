var api_address = __HOMEURL__;
var urls = __HOMEURL__;
$(function(){
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    var search_type = $.getUrlParam('type') || 1;
    var current_page = 1;
    var keyword = $.getUrlParam('keyword') || '';

    $('.search-nav li').removeClass('active');
    $('.search-nav li:eq(' + (parseInt(search_type) - 1) + ')').addClass('active');

    $('.z_form').val(keyword);
    getData(current_page, keyword);
    var stars = 800;
    var $stars = $('.stars');
    var r = 800;
    for (var i = 0; i < stars; i++) {
        if (window.CP.shouldStopExecution(1)) {
            break;
        }
        var $star = $('<div/>').addClass('star');
        $stars.append($star);
    }
    window.CP.exitedLoop(1);
    $('.star').each(function () {
        var cur = $(this);
        var s = 0.2 + Math.random() * 1;
        var curR = r + Math.random() * 300;
        cur.css({
            transformOrigin: '0 0 ' + curR + 'px',
            transform: ' translate3d(0,0,-' + curR + 'px) rotateY(' + Math.random() * 360 + 'deg) rotateX(' + Math.random() * -50 + 'deg) scale(' + s + ',' + s + ')'
        });
    });

    $('body').on('click', '.index-hot-company', function() {
        keyword = $(this).html();
        $('.z_form').val(keyword);
        current_page = 1;
        getData(current_page, keyword)
    })

    // 加载更多
    $('body').on('click', '.left_click_load_more', function() {
        current_page++;
        getData(current_page, keyword);
    });

	$('.search-nav li').click(function(){
        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
        var index = $(this).attr('data-index');
        search_type = index;
        if (index == 1) {
            $('.z_form').attr('placeholder', '请输入企业名');
            $('.hot_data').html(
                `<a class="index-hot-company" href="javascript:;">1</a>
                <a class="index-hot-company" href="javascript:;">2</a>`
            );
        } else if (index == 2) {
            $('.z_form').attr('placeholder', '请输入代理')
            $('.hot_data').html(
                `<a class="index-hot-company" href="javascript:;">3</a>
                <a class="index-hot-company" href="javascript:;">4</a>`
            );
        } else if (index == 3) {
            $('.z_form').attr('placeholder', '请输入企业或投诉题目的关键词');
            $('.hot_data').html(
                `<a class="index-hot-company" href="javascript:;">5</a>
                <a class="index-hot-company" href="javascript:;">6</a>`
            );
        }
        $('.z_form').val('');
        $('.left_con_list').html('');
        keyword = '';
        current_page = 1;
        getData(current_page, keyword);
    });
    $('.z_form').keyup(function() {
        current_page = 1;
        keyword = $(this).val();
        getData(current_page, keyword); // 获取数据
    });
    
    // 获取数据
    function getData(page, keyword) {
        if (page == 1) {
            $('.left_click_load_more').show();
            $('.no_more').hide();
        }
        $.ajax({
            url: api_address + `/api/search/searchmore?type=${search_type}&keyword=${keyword}&page=${page}`,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                var html_text = '';
                if (data.code === 200) {
                    var res = data.data.data;
                    if (search_type == 3) {
                        for(var i = 0; i < res.length; i++ ) {
                            var status = '';
                            if (res[i].status < 4) {
                                status = '/static/index/images/dealIcon.png'; // 已处理
                            } else if(res[i].status > 3 && res[i].status <7) {
                                status = '/static/index/images/returnIcon.png'; // 已回复
                            } else if (res[i].status > 6) { 
                                status = '/static/index/images/doneIcon.png'; // 已完成
                            }
                            html_text += `<a href="/cases/${res[i].myid}.html" class="left_con_item">
                                <img src="${status}" alt="状态" class="left_msg_status"/>
                                <div class="left_item_title">
                                    <i class="left_hot_icon"></i>${res[i].title}
                                </div>
                                <div class="left_item_text">
                                    ${res[i].details}
                                </div>
                                <div class="left_item_complaint_user">
                                    <span>【投诉对象】</span>
                                    <div class="complain_user_info">
                                        <img src="${urls + res[i].logo_url}" alt="头像"/>
                                        <span class="complain_user_name">${res[i].name}</span>
                                    </div>
                                </div>
                                <div class="left_item_complaint_content">
                                    <span>【投诉要求】</span>
                                    <span class="item_marginLeft10">${res[i].require}</span>
                                </div>
                            </a>`
                        }
                    } else if (search_type == 1) {
                        for(var i = 0; i < res.length; i++) {
                            html_text += `<a href="/broker/${res[i].code}.html" class="left_con_item_company">
                                <div>
                                    <div class="flag_tips" style="background: ${res[i].status.color}">${res[i].status.name}</div>
                                    <img src="${urls + res[i].logo_url}" alt="">
                                </div>
                                <div>
                                    <div>
                                        <div>${res[i].name}</div>
                                        <div class="country_flag"><img src="${urls + res[i].r_country.flag}" alt=""></div>
                                    </div>
                                    <div>
                                        <span>${res[i].tag_year}</span> | <span>${res[i].tag_regulation}</span> | <span>${res[i].tag_license}</span> | <span>${res[i].tag_mt4}</span>
                                    </div>
                                </div>
                                <div>
                                    <div>口碑评分</div>
                                    <div>${res[i].avg_rate}</div>
                                </div>
                            </a>`;
                        }
                    } else if (search_type == 2) {
                        /* for(var i = 0; i < res.length; i++) {
                            html_text += `<a href="/agent/${res[i].code}.html" class="left_con_item_company">
                                <div>
                                    <div class="flag_tips" style="background: ${res[i].status.color}">${res[i].status.name}</div>
                                    <img src="${urls + res[i].logo_url}" alt="">
                                </div>
                                <div>
                                    <div>
                                        <div>${res[i].name}</div>
                                        <div class="country_flag"><img src="${res[i].is_license == 1?`http://www.fin110.com\\uploads\\20200426\\840.png`:''}" alt=""></div>
                                    </div>
                                    <div>
                                        <span>${res[i].tag_year}</span> | <span>${res[i].tag_type}</span> | <span>${res[i].tag_area}</span> | <span>${res[i].tag_other}</span>
                                    </div>
                                </div>
                                <div>
                                    <div>口碑评分</div>
                                    <div>${res[i].avg_rate}</div>
                                </div>
                            </a>`;
                        } */
						for(var i = 0; i < res.length; i++ ) {
                            var status = '';
                            if (res[i].status < 4) {
                                status = '/static/index/images/dealIcon.png'; // 已处理
                            } else if(res[i].status > 3 && res[i].status <7) {
                                status = '/static/index/images/returnIcon.png'; // 已回复
                            } else if (res[i].status > 6) { 
                                status = '/static/index/images/doneIcon.png'; // 已完成
                            }
                            html_text += `<a href="/cases/${res[i].myid}.html" class="left_con_item">
                                <img src="${status}" alt="状态" class="left_msg_status"/>
                                <div class="left_item_title">
                                    <i class="left_hot_icon"></i>${res[i].title}
                                </div>
                                <div class="left_item_text">
                                    ${res[i].details}
                                </div>
                                <div class="left_item_complaint_user">
                                    <span>【投诉对象】</span>
                                    <div class="complain_user_info">
                                        <img src="${urls + res[i].logo_url}" alt="头像"/>
                                        <span class="complain_user_name">${res[i].name}</span>
                                    </div>
                                </div>
                                <div class="left_item_complaint_content">
                                    <span>【投诉要求】</span>
                                    <span class="item_marginLeft10">${res[i].require}</span>
                                </div>
                            </a>`
                        }
                    }
                    if(page==3){
                        $('.left_click_load_more').css('display', 'none')
                    }
                    if (data.data.last_page < page) {
                        if (page == 1) {
                            $('.left_click_load_more').hide();
                            $('.no_more').show();
                            $('.left_con_list').html(html_text);
                        } else {
                            Dialog.success("温馨提示", "已经加载完毕！")
                        }
                        return;
                    }
                    if (page != 1) {
                        var html = $('.left_con_list').html();
                        $('.left_con_list').html(html + html_text);
                    } else {
                        $('.left_con_list').html(html_text);
                    }
                }
            },
            error: function(e) {
                console.log(e);
            }
        });
    }
});