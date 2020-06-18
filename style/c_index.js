function disable_code() {
    $(".quick_btn").css({'cursor': 'not-allowed', 'background': '#f0f0f0'});
    $(".quick_btn").attr('disabled', 'disabled');
}

function enable_code() {
    $(".quick_btn").css({'cursor': 'pointer', 'background': '#f4c830'});
    $(".quick_btn").removeAttr('disabled');
}

function enable_bg() {
    $("#bg").css('display', 'block');
}

function disable_bg() {
    $("#bg").css('display', 'none');
}

function add_on_class(e) {
    var names = $(e.currentTarget).text();
    $(e.currentTarget).addClass('on');
    $(e.currentTarget).siblings('li').removeClass('on');
    3
    var mainContainer = $(".area-code-body");
    var scrollToContainer = $(".area-code-body").find("dl[name='" + names + "']")[0];
    $(".area-code-body").animate({scrollTop: $(scrollToContainer).offset().top - $(mainContainer).offset().top + $(mainContainer).scrollTop()});

}


// function getApi() {
//     return __HOMEURL__ ;
// }

//动态地址，动态数据
function post_action(self, url, data) {
    console.log(url,data);
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        success: function (data) {
            if (data.code === 200) {
                console.log(data);
				layer.msg('登陆成功')
				setTimeout(function(){
					window.location.href="/";
				}, 800);
                // window.location.assign('c_index.html');
            } else {
                self.errormsg = data.msg;
                self.isError = true;
                //定时隐藏错误提示
                self.timer1 = setTimeout(function () {
                    self.isError = false;
                }, 2000);
            }
            ;
        },
        error(){
            console.log('请求错误！');
        }
    });
}

function getcode(self,apiAddress, account, is_exist, time, code) {
    let lay = layer;
    $.ajax({
        url: apiAddress + '/code/'+time+'/'+account+'/'+is_exist+'/'+code,
        type: 'get',
        success: function (data) {
            if (data.code === 200) {

                let count = 60;
                disable_code();

                self.isTimeOver = false;
                self.timer = setInterval(function () {
                    self.code_btn = count + 's';
                    count--;
                    if (count < 0) {
                        clearInterval(self.timer);
                        self.code_btn = '验证码';
                        enable_code();
                        self.isTimeOver = true;
                    }
                }, 1000);

            }if(data.code === 400){
                lay.tips(data.msg, '.account');
            }

        }
    });
}

