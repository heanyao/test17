var _serverUrl =__HOMEURL__+'/';

// 输入框清空按钮
$('.input_clearbtn').click(function (e) {
    e.currentTarget.previousElementSibling.value = ''
})
//获取页面传过来的表单id
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
} 

//获取页面传过来的表单id
var Request = new Object();
Request = GetRequest();
var mycase_id;
mycase_id = Request['myid'];
console.log(mycase_id);

 

// 图片上传file
$('#addupload_box').on('click', '#addupload', function (e) {
    $('#upload_input').click()
})
var imglist = [] //选中图片展示列表
var imgfilelist = [] //选中的文件对象数组
$('#upload_input').on('input', function (e) {
    if (e.target.files.length == 0) {
        return false
    }
    if ($('#addupload_box')[0].children.length >= 9) {
        Dialog.success("温馨提示", '最多上传8张图片');
        $('.mini-dialog-footer').css('height','64px');
        return false
    }
    console.log(e.target.files[0]);
    if (e.target.files[0].size/1024/1024 > 3 ) {
        Dialog.success("温馨提示", '图片不可大于3M');
        $('.mini-dialog-footer').css('height','64px');
        return false
    }
    if (e.target.files[0].type!=="image/png"&& e.target.files[0].type!=="image/jpeg"&&e.target.files[0].type!=="image/jpg"&&e.target.files[0].type!=="image/gif") {
        Dialog.success("温馨提示", '图片格式不正确');
        $('.mini-dialog-footer').css('height','64px');
        return false
    }

    const windowURL = window.URL || window.webkitURL; // file转bolb
    var dataURl = windowURL.createObjectURL(e.target.files[0])
    imglist.push(dataURl)
    imgfilelist.push(e.target.files[0])
    $('#addupload_box').append(`<span><span class="dele_tag"><img src="${dataURl}" alt=""></span></span>`);
    if ($('#addupload_box')[0].children.length >= 10) {
        $('#addupload').remove()
    }
})
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
// 删除选中的图片
$('#addupload_box').on('click', '.dele_tag', function (e) {
    if ($('#addupload_box').children().length == 9 && $('#addupload_box').children()[0].id != 'addupload') {
        $('#addupload_box').prepend(`<img id="addupload" src="./images/upload.jpg" alt="">`)
    }
    $(this).parent().remove()
    imgfilelist.splice(imglist.indexOf($(this).children()[0].src),1)
    imglist.remove($(this).children()[0].src)
})
$('#addupload_box').on('click','span',function(e){
    if (!$(this).children().children()[0]) {
        return false
    }
    $('#dialog').attr('class','dialog')
    $('#dialog').append(`<img src="${$(this).children().children()[0].src}">`)
})
$('#dialog').click(function(e){
    $(this).removeAttr('class')
    $(this).empty()
})


// 提交
$('#submit_btn').click(function(){
    if (!$('#details_content').val()) {
        Dialog.warn("注意", '请输入追加内容');
        $('.mini-dialog-footer').css('height','64px')
        return false
    } 
    
    var flag = 0
    var imgs = ''
    // 发送图片
    if(imglist.length != 0) {
        imgfilelist.forEach(function(cur){
            // var files = new window.File(
            //     [cur],
            //     cur.split('/')[1],
            //     {type: "image/jpg"},
            // );
            var form_data = new FormData()
            form_data.append('images',cur)
            $.ajax({
                url: _serverUrl + "api/myform/upload",
                type: "POST",
                dataType: "json",
                async: false,  //转同步
                data: form_data,
                processData: false,
			    contentType: false,
                success: function (res) {
                    flag += 1
                    // console.log(res,'这里拿到图片上传返回结果，再自定变量去拼接字符串')
                    if (res.code===200) {
                        imgs += `,${res.data}`
                        // console.log(imgs)
                    }
                    if (res.code===400) {
                        Dialog.warn("注意", res.data);
                        $('.mini-dialog-footer').css('height','64px')
                        return false
                    }
                },
                error: function () {
                    console.error("请求失败,请重试！");
                }
            });
        })
    }

    if (flag != imglist.length) {
        Dialog.warn("注意",'图片上传异常！');
        $('.mini-dialog-footer').css('height','64px')
        return false
    }

    // 发送数据
    var data = {
        pid:mycase_id,
        content:$('#details_content').val(),
        hidden_content:$('#private_details_content').val(),
        // money:$('#money_num').val(),
        imgs:imgs.substr(1),
        is_hidefile:$("input[name='is_hidefile']:checked").val() ? '1' : '0',
    }
    // if(myid){
    //     data.myid = myid
    // }else{
    //     data.keyword = $('#complain_target').val()
    // }
    $.ajax({
        url: _serverUrl + "api/myform/addcase",
        type: "POST",
        dataType: "json",
        data: data,
        success:function (data) { 
            // console.log(data)
            if(data.code===200){
                Dialog.success("温馨提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
                setTimeout(function(){
                    window.location.reload();
                }, 2000);                
            }

         }
    })
})