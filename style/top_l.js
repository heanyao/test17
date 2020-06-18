var _serverUrl = __HOMEURL__+'/';//服务器地址
var _type = 1;//默认搜索类型是交易商类型
var _keyword = "";


/*显示搜索框前下拉框*/
$(".shares_select_l").click(function (e) {
    e.stopPropagation();
    var list = $(".code_option_item");
    list.removeClass("selected_type");
    var item = list[_type - 1];
    $(item).addClass("selected_type");
    $(".shares_select_option_con").toggle();
    $(".key_result_list").hide();
});

/*搜索条件点击选择事件*/
$(".code_option_item").click(function (e) {
    e.stopPropagation();
    var key = $(this).attr('name');
    _type = parseInt(key);
    $(".shares_select_title").html(this.innerHTML);
    var input = $(".search_input_text").val("");
    if (_type === 1) {
        input.attr('placeholder', "交易商有很多");
    }
    if (_type === 2) {
        input.attr('placeholder', "代理商有狡猾");
    }
    if (_type === 3) {
        input.attr('placeholder', "各种各样的新闻");
    }
    $(".shares_select_option_con").toggle();

});

/*点击搜索图标,执行搜索*/
$(".icon2_l").click(function () {
    var key = $('.search_input_text').val();
    console.log("搜索类型为", _type, "关键字是", key);
    window.location.href = "/search?type=" + _type + "&keyword=" + key;
});

/*模拟登陆*/
$(".login_btn_l").click(function () {
    $(".login_status_1").hide();
    $(".login_status_2").show();
});

$('.search_input_text').on('input', function () {
    var _this = $(this);
    if (_this.val().length > 0) {
        $.ajax({
            url: _serverUrl + "api/search/searchapi",
            method: "GET",
            dataType: "json",
            data: {'type': _type, 'keyword': _this.val()},
            success: function (res) {
                console.log(res);
                if (res.data.length > 0) {
                    $(".key_result_list").empty().append(_formatKeyResult(res.data, _this.val())).show();
                } else {
                    console.log("这是没有数据", res.data.length);
                    $(".key_result_list").empty().hide();
                }
            },
            error: function () {
                console.error("请求失败,请重试！");
            }
        });
    } else {
        $(".key_result_list").empty().hide();
    }

    /**
     *格式化关键字搜索结果
     * @param arr
     * @param key
     * @returns {string}
     * @private
     */
    function _formatKeyResult(arr, key) {

        var t = "";
        var l = "";
        if (_type === 1) {
            l = _serverUrl + "/jiaoyishang/"
        }
        if (_type === 2) {
            l = _serverUrl + "/dailishang/"
        }
        if (_type === 3) {
            l = _serverUrl + "/xinwen/"
        }

        for (var i = 0; i < arr.length; i++) {
            var name = "";
            if (!arr[i].name) {
                name = arr[i].title;
                var s1 = name.indexOf(key);
                if (s1 >= 0) {
                    var pre = arr[i].title.slice(0, parseInt(s1));
                    var last = arr[i].title.slice(parseInt(s1) + key.length);
                    t += '<a class="key_result_item" href="' + l + arr[i].id + '">' +
                        pre + '<span class="keyword_red">' + key + '</span>' + last +
                        '</a>';
                }
            } else {
                name = arr[i].name;
                var s = name.indexOf(key);
                if (s >= 0) {
                    var pre1 = arr[i].name.slice(0, parseInt(s));
                    var last1 = arr[i].name.slice(parseInt(s) + key.length);
                    t += '<a class="key_result_item" href="' + l + arr[i].code + '">' +
                        '<img src="http://www.fin110.com/' + arr[i].tiny_logo + '" alt="logo" class="key_result_img">' +
                        pre1 + '<span class="keyword_red">' + key + '</span>' + last1 +
                        '</a>';
                } else {
                    var key1 = key.toUpperCase();
                    var s3 = arr[i].name.indexOf(key1);
                    if (s3 >= 0) {
                        var pre2 = arr[i].name.slice(0, parseInt(s3));
                        var last2 = arr[i].name.slice(parseInt(s) + key.length);
                        t += '<a class="key_result_item" href="' + l + arr[i].code + '">' +
                            '<img src="http://www.fin110.com/' + arr[i].tiny_logo + '" alt="logo" class="key_result_img">' +
                            pre2 + '<span class="keyword_red">' + key1 + '</span>' + last2 +
                            '</a>';
                    } else {
                        var key2 = key.toLowerCase();
                        var s4 = arr[i].name.indexOf(key2);
                        if (s4 >= 0) {
                            var pre3 = arr[i].name.slice(0, parseInt(s3));
                            var last3 = arr[i].name.slice(parseInt(s) + key.length);
                            t += '<a class="key_result_item" href="' + l + arr[i].code + '">' +
                                '<img src="http://www.fin110.com/' + arr[i].tiny_logo + '" alt="logo" class="key_result_img">' +
                                pre3 + '<span class="keyword_red">' + key2 + '</span>' + last3 +
                                '</a>';
                        }
                    }

                }
            }

        }

        return t;

        // 英文是否大写
        function _isUpperCase(num) {
            var reg = /^[A-Z]+$/;
            return reg.test(num);
        }

        function _isLowCase() {
            var reg = /^[a-z]+$/;
            return reg.test(num);
        }

    }


});