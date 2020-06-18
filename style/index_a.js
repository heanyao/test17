var _serverUrl = __HOMEURL__+'/';
var currentPage1 = 2;
var menuFlag = 1;//左侧菜单标记1.最新，2行业，3原创，4交易商
var listCopy1 = null;//最新模板
var listCopy2 = null;//行业
var listCopy3 = null;//原创
var listCopy4 = null;//交易商

/*数字插件*/
$(function () {
    $('.counter').counterUp({
        delay: 100,
        time: 6 * 1000
    });
});

/*图片logo插件*/
var a = new sHover("thumbnail_item_l", "thumbnail_desc");
a.set({
    slideSpeed: 5,
    opacityChange: true,
    opacity: 80
});

//绑定内容中菜单hover事件
var leftList = $(".left_menu_list_l").find("li");


leftList.hover(function () {
    var c = $(this).attr("class");
    if ("left_selected" === c) {
        return false;
    }
    leftList.removeClass("left_selected");
    $(this).addClass("left_selected");
    var key = $(this).attr('name');
    menuFlag = parseInt(key);
    currentPage1 = 2;
    if (menuFlag < 4) {//模拟前四个导航用格式一，后五个用格式二
        var l = $(".left_con_list").empty();
        if (menuFlag === 1) {//最新
            listCopy1.css('display', 'block');
            l.append(listCopy1)
        }
        if (menuFlag === 2) {
            listCopy2.css('display', 'block');
            l.append(listCopy2)
        }
        if (menuFlag === 3) {
            listCopy3.css('display', 'block');
            l.append(listCopy3)
        }
        _hoverTitle();
    }
    else if (menuFlag === 4) {
        $(".left_con_list").empty().append(listCopy4);
        $(".left_con_item").hide();
        $(".left_con_item2").css("display", "block");
        _hoverTitle()
    }

});

/*右侧导航添加hover事件*/
var copyRight1 = null;
var copyRight2 = null;
var copyRight3 = null;
var copyRight4 = null;

var list2 = $(".right_menu_list_l").find("li");
list2.hover(function () {
    list2.removeClass("right_selected");
    $(this).addClass("right_selected");
    var key = $(this).attr('name');
    var listCon = $(".right_con_list");
    listCon.empty();
    switch (parseInt(key)) {
        case 1:
            listCon.append(copyRight1);
            copyRight1.css('display', 'block');
            break;
        case 2:
            console.log(copyRight2, 2);
            listCon.append(copyRight2);
            copyRight2.css('display', 'block');
            break;
        case 3:
            listCon.append(copyRight3);
            copyRight3.css('display', 'block');
            break;
        case 4:
            console.log(copyRight4, 4);
            listCon.append(copyRight4);
            copyRight4.css('display', 'block');
            break;
        default:
            break;
    }
    _hoverRightItem();
    /*$.ajax({
        url: "",
        method: "GET",
        data: {key: key},
        success: function () {
            $(this).addClass("done");
        },
        error: function () {
            console.error('请求失败，请重试！');
        }
    });*/
});


window.onload = function () {
    listCopy1 = $(".left_con_item");//最新
    listCopy4 = $(".left_con_item2");//交易商
    listCopy2 = $(".hy_item");
    listCopy3 = $(".yc_item");

    copyRight1 = $(".one_item_right");
    copyRight2 = $(".two_item_right");
    copyRight3 = $(".three_item_right");
    copyRight4 = $(".four_item_right");
    //设置快讯日期为当前时间年月日
    $(".hot_new_publish_time").html(_getYearMonthDay());
    /*3秒时间间隔刷新最新资讯*/

    /*setInterval(function () {
        $.ajax({
            url: "./test/data/news.json",
            method: "GET",
            dataType: "json",
            data: {},
            success: function (res) {
                var t = "";
                for (var i = 0; i < res.data.length; i++) {
                    t += _getNewTemplate(res.data[i]);
                }
                $(".hot_new_list").empty().append(t);
            },
            error: function () {
                console.error("请求失败,请重试！");
            }
        });
    }, 3000);*/


    function _getNewTemplate(item) {
        return '<div class="hot_new_item">'
            + '<div class="circular_l"></div>'
            + '<div class="new_publish_detail_time">'
            + item.time + '</div>'
            + '<a class="new_detail_text" href="#">'
            + item.title + '</a></div>';
    }

    //获取当前日期xxxx年xx月xx日
    function _getYearMonthDay() {
        var date = new Date();

        var y = date.getFullYear(); //获取完整的年份(4位)

        var m = date.getMonth(); //获取当前月份(0-11,0代表1月)
        m = m + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate(); //获取当前日(1-31)
        d = d < 10 ? '0' + d : d;
        console.log(y + '.' + m + '.' + d);
        return y + '.' + m + '.' + d;
    }
};

/*我要咨询按钮的hover效果*/
$(".ask_btn").hover(function () {

    $(this).find('img').attr('src', '/static/index/images/askIcon2.png');
}, function () {
    $(this).find('img').attr('src', '/static/index/images/askIcon.png');
});
/*我要投诉，按钮的hover效果*/
$(".complain_btn").hover(function () {
    $(this).find('img').attr('src', '/static/index/images/complaintIcon2.png');
}, function () {
    $(this).find('img').attr('src', '/static/index/images/complaintIcon.png');
});

_hoverTitle();

/*左侧列表hover效果*/
function _hoverTitle() {
    //前三个菜单hover效果
    $(".left_con_item,.hy_item,.yc_item").hover(function () {
        $(this).find('.left_item_title').css('color', '#1E6FE4');
    }, function () {
        $(this).find('.left_item_title').css('color', '#333333');
    });
    //第四个菜单hover效果
    $(".left_con_item2").hover(function () {
        $(this).find('.left_item_title2').css('color', '#1E6FE4');
        $(this).find('.item2_user_name').css('color', '#1E6FE4');
    }, function () {
        $(this).find('.left_item_title2').css('color', '#333333');
        $(this).find('.item2_user_name').css('color', '#333333');
    });
}


/*右侧列表hover效果*/
_hoverRightItem();
function _hoverRightItem() {
    $(".right_con_item,.two_item_right,.three_item_right,.four_item_right").hover(function () {
        $(this).find('.right_item_title').css('color', '#1E6FE4');
        $(this).find('.right_item_title').css('color', '#1E6FE4');
        $(this).find('.right_item_title').css('color', '#1E6FE4');
        $(this).find('.right_item_title').css('color', '#1E6FE4');

    }, function () {
        $(this).find('.right_item_title').css('color', '#333333');
    });
}


/*点击加载更多*/
$(".left_click_load_more").click(function () {

    _getTemplate();

    if (menuFlag > 4) {
        return false;
    }

    function _getTemplate() {
        _getData();

        /*获取消息状态标志图片路径*/
        function _getStatusUrl(status) {
            var url = "";
            if (status > 3 && status < 7) {
                url = "/static/index/images/replyIcon.png";
            }
            if (status < 4) {
                url = "/static/index/images/dealIcon.png";
            }
            if (status > 6) {
                url = "/static/index/images/doneIcon.png";
            }
            return url;
        }

        /*获取时间xxxx_xx_xx*/
        function _getTime(number) {
            var t = new Date(number);
            var m = t.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            var d = t.getDate();
            d = d < 10 ? "0" + d : d;
            return t.getFullYear() + "_" + m + "_" + d;
        }

        /*获取长时间XXXX.XX.XX XX:XX*/
        function _getLongTime(number) {
            var t = new Date(number);
            var m = t.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            var d = t.getDate();
            d = d < 10 ? "0" + d : d;
            var h = t.getHours();
            h = h < 10 ? "0" + h : h;
            var mm = t.getMinutes();
            mm = mm < 10 ? "0" + mm : mm;

            return t.getFullYear() + "-" + m + "-" + d + " " + h + ":" + mm;
        }

        /*获取是否是热点*/
        function _getHot(number) {
            if (number) {
                return '<i class="left_hot_icon"></i>'
            }
            return "";
        }

        function _getData() {
            var str = "";
            $.ajax({
                url: _serverUrl + "api/index/newslist",
                method: "GET",
                dataType: "json",
                data: {"cate_id": menuFlag, "page": currentPage1},
                success: function (res) {
                    currentPage1++;
                    if (menuFlag < 4) {
                        if (res.code === 400) {
                            Dialog.warn("温馨提示", '没有更多了');
                            $('.mini-dialog-footer').css('height','64px');
                        }
                        console.log(res.data.data1.data);
                        var arr = res.data.data1.data;
                        var arr2 = res.data.data2.data;
						console.log('arr', arr)
						console.log('arr2', arr2)
                        if (arr.length === 0) {
                            Dialog.warn("温馨提示", '没有更多了');
                            $('.mini-dialog-footer').css('height','64px');
                        }
						
						if(menuFlag==1){
							var list = $('.left_con_item');
							var classname = 'left_con_item';
						}else if(menuFlag==2){
							var list = $('.hy_item');
							var classname = 'hy_item';
						}else if(menuFlag==3){
							var list = $('.yc_item');
							var classname = 'yc_item';
						}
						
						
                        for (var i = 0; i < arr.length; i++) {
							if(typeof(arr2[i])=='undefined'){
								arr2[i] = {
									logo_url:'',
									name_cn:''
								}
							}
                            str += '<a href="' + /cases/ + arr[i].myid + '.html" class="'+classname+'" style="display: block;">' +
                                '                    <img src="' + _getStatusUrl(arr[i].status) + '" alt="状态" class="left_msg_status"/>' +
                                '                    <div class="left_user_head">' +
                                '                        <img src="' + _serverUrl + arr[i].head_img_url + '" alt="头像" class="left_head_photo"/>' +
                                '                        <div class="left_user_info">' +
                                '                            <div class="left_user_name">' + arr[i].name + '</div>' +
                                '                            <div class="left_user_publish_time">' + _getTime(arr[i].time) + '</div>' +
                                '                        </div>' +
                                '                    </div>' +
                                '                    <div class="left_item_title">' + _getHot(arr[i].is_hot)
                                + arr[i].title +
                                '                    </div>' +
                                '                    <div class="left_item_text">' + arr[i].details +
                                '                    </div>' +
                                '                    <div class="left_item_complaint_user">' +
                                '                        <span>【投诉对象】</span>' +
                                '                        <div class="complain_user_info">' +
                                '                            <img src="' + _serverUrl + arr2[i].logo_url + '" alt="头像"/>' +
                                '                            <span class="complain_user_name">' + arr2[i].name_cn + '</span>' +
                                '                        </div>' +
                                '                    </div>' +
                                '                    <div class="left_item_complaint_content">' +
                                '                        <span>【投诉要求】</span>\n' +
                                '                        <span class="item_marginLeft10">' + arr[i].require + '</span>' +
                                '                    </div>' +
                                '                </a>'

                        }
                        
                        $(list[list.length - 1]).after(str);
                        _hoverTitle();
                    }
                    if (menuFlag === 4) {
                        var arr3 = res.data.data;
                        if (arr3.length === 0) {
                            Dialog.warn("温馨提示", '没有更多了');
                            $('.mini-dialog-footer').css('height','64px');
                            return false;
                        }
                        for (var h = 0; h < arr3.length; h++) {
                            str += '<a href="' + _serverUrl+'article' + arr3[h].myid + '" class="left_con_item2">' +
                                '                    <div class="left_user_head2">' +
                                '                        <img src="' + _serverUrl + arr3[h].thumb + '" alt="头像" class="left_head_photo2"/>\n' +
                                '                    </div>' +
                                '                    <div class="left_item2_other">\n' +
                                '                        <div class="left_item_title2">' +
                                _getHot(arr3[h].rec) + arr3[h].title +
                                '                        </div>' +
                                '                        <div class="left_item_text2">' + arr3[h].abstract +
                                '                        </div>' +
                                '                        <div class="left_item2_user">' +
                                '                            <img src="' + _serverUrl + arr3[h].head_img_url + '" alt="头像" class="left_item2_user_head"/>' +
                                '                            <span class="item2_user_name">' + arr3[h].name + '</span>' +
                                '                            <span class="item2_publish_time">' + _getLongTime(arr3[h].time) + '</span>' +
                                '                        </div>' +
                                '                    </div>' +
                                '                </a>';
                        }

                        var list2 = $('.left_con_item2');
                        $(list2[list2.length - 1]).after(str);
                        $('.left_con_item2').css('display', 'block');
                        _hoverTitle();
                    }

                },
                error: function () {
                    console.error("请求失败,请重试！");
                }
            });
        }

    }


});