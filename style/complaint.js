var _serverUrl =__HOMEURL__+'/';

// 输入框清空按钮
$('.input_clearbtn').click(function (e) {
    e.currentTarget.previousElementSibling.value = ''
})

$('#complain_target').on('input',function(e){
    var _this = $(this)
    if($(this).val().length != 0){
        $.ajax({
            url: _serverUrl + "api/search/searchapi",
            type:'GET',
            dataType: "JSON",
            data: "keyword="+_this.val()+'&type=1',
            // data: "keyword="+_this.val(),
            success:function(res){
                $('.complaint_result_list').show()
                if(res.data.length != 0){
                    $('.complaint_result_list>ul').empty()
                    $('.add_complaint').remove()
                    res.data.forEach(function(cur){
                        $('.complaint_result_list>ul').append(`<li class='${cur.code}'><img src='${_serverUrl}${cur.tiny_logo}'/><span>${cur.name}</span></li>`)
                    })
                }else{
                    $('.complaint_result_list>ul').empty()
                    $('.add_complaint').remove()
                    $('.complaint_result_list').append(`<div class="add_complaint">
                    <span></span>
                    <button>+&nbsp;添加</button>
                    </div>`)
                    $('.add_complaint').children()[0].innerHTML=`未搜索到结果，可直接添加&nbsp;&nbsp;'${_this.val()}'`
                }
            },
            error: function () {
                console.error("请求失败,请重试！");
            }
        })
    }else{
        $('.complaint_result_list').hide()
    }
})
var myid = ''
//点击新增结果
$('.complaint_result_list').on('click','button',function(e){
    myid = ''
    $('.complaint_result_list').hide()
})
//点击搜索结果
$('.complaint_result_list').on('click','li',function(e){
    myid = e.currentTarget.className
    $('#complain_target').val(e.currentTarget.children[1].innerHTML)
    $('.complaint_result_list').hide()
    // console.log('获取到的投诉对象id--------',e.currentTarget.className)
})

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
    if (!$('#complain_target').val()) {
        Dialog.warn("注意", '请输入或选择投诉对象');
        $('.mini-dialog-footer').css('height','64px')
        return false
    } else if (!$('#form_require').val()) {
        Dialog.warn("注意", '请输入投诉要求');
        $('.mini-dialog-footer').css('height','64px')
        return false
    } else if (!$('#form_title').val()) {
        Dialog.warn("注意", '请输入投诉标题');
        $('.mini-dialog-footer').css('height','64px')
        return false
    } else if (!$("input[name='category']:checked").val()) {
        Dialog.warn("注意", '请选择曝光类型');
        $('.mini-dialog-footer').css('height','64px')
        return false
    } else if (!$('#details_content').val()) {
        Dialog.warn("注意", '请输入投诉事由');
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
        require:$('#form_require').val(),
        title:$('#form_title').val(),
        tag:$("input[name='category']:checked").val(),
        details:$('#details_content').val(),
        private_details:$('#private_details_content').val(),
        money:$('#money_num').val(),
        images:imgs.substr(1),
        is_hidefile:$("input[name='is_hidefile']:checked").val() ? '1' : '0',
        contact_allow:$("input[name='contact_allow']:checked").val() ? '1' : '0'
    }
    if(myid){
        data.myid = myid
    }else{
        data.keyword = $('#complain_target').val()
    }
    $.ajax({
        url: _serverUrl + "api/myform/submitcase",
        type: "POST",
        dataType: "json",
        data: data,
        success:function (data) { 
            // console.log(data)
            if(data.code===200){
                Dialog.success("温馨提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
                // setTimeout(function(){
                //     window.location.reload();
                // }, 2000);                
            }

         }
    })
})