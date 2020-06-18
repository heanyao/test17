
 
/*实现顶功能*/
$(".f-putimg").find("img").click(function () {
    let Aid = $("#articleId").html();;  // 用户id
    let Nums = $(this).attr("num");;  // 是否已经顶了
    $.ajax({
        url: `${urls}/articles/ding/${Aid}/${Nums}`,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            if(data.code==400) {
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            }
            if(data.code=='add200') {
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
                // window.location.reload()
            }
            if(data.code=='delete200') {
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            // window.location.reload()  
            }                            
        },
        error: function (error) {
            console.log(error)
        }
    })
});

/*收藏功能*/
$(".f-xingxing").click(function () {
    // $(this).css('backgroundImage', 'url(./images/soucanged.png)');//收藏
    //$(this).css('backgroundImage', 'url(./images/soucang.png)');//取消收藏
    let Aid = $("#articleId").html();;
    let types = $(this).attr('num')
    const that = this
    $.ajax({
        url: `${urls}/api/article/addkeep?artId=${Aid}&type=${types}`,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.code=='delete200') {
                // var delUrl: `${index_url}/images/soucang.png`,  //提交地址
                Dialog.success("温馨提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
                $(that).css('backgroundImage', 'url(/static/index/images/shoucang.png)')
                $("#f-xingxing").attr('num', "1")
                var deleto = $("#keepchange").html()
                var delenum=parseInt(deleto)-1;
                $("#keepchange").html(delenum)
            } 
            if (data.code=='add200') {
                // var delUrl: `${index_url}/images/soucang.png`,  //提交地址
                Dialog.success("温馨提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
                $(that).css('backgroundImage', 'url(/static/index/images/soucanged.png)')
                $("#f-xingxing").attr('num', "2")
                var deleto = $("#keepchange").html()
                var delenum=parseInt(deleto)+1;
                $("#keepchange").html(delenum)
            }
            if(data.code==400) {
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            }
                // window.location.reload()  
        },
        error: function (error) {
            console.log(error)
        }
    })
});


// 关注功能
$("#follow").click(function () {
    let uSid = $("#user_Id").html(); // 用户id
    let types = $(this).html() == "已关注" ? 2 : 1;
    const that = this
    $.ajax({
        url: `${urls}/index/userprofile/follow?userid=${uSid}&type=${types}`,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data)

            if(data.code==400) {
                $(that).html("十关注");
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            }else if(data.code=='add200'){
                $(that).html("已关注");
                Dialog.success("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');     
            }else if(data.code=='delete200'){
                $(that).html("十关注")
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px'); 
            }else{
                $(that).html("已关注");
                Dialog.success("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px'); 
            }

        },
        error: function (error) {
            console.log(error)
        }
    })
});

