$(function() {

    $('body').on('click', '#identify-mt4', function() {
        MT4_MT5(servers);
    });
    $('body').on('click', '.fixed-position.identify-mt4 .close-icon', function() {
        $('.fixed-position.identify-mt4').hide();
        $('body')[0].style.paddingRight = '0px';
        $('body').removeClass('overflow');
    });
    // 公司高层 弹窗
    $('body').on('click', '#company-executive', function() {
        $('body').addClass('overflow');
        $('body')[0].style.paddingRight = getScrollbarWidth() + 'px';
        $('.fixed-position.company-executive').show();
    });
    $('body').on('click', '.fixed-position.company-executive .close-icon', function() {
        $('.fixed-position.company-executive').hide();
        $('body')[0].style.paddingRight = '0px';
        $('body').removeClass('overflow');
    });
    // 公司资料 弹窗
    $('body').on('click', '#papers-info', function() {
        $('body').addClass('overflow');
        $('body')[0].style.paddingRight = getScrollbarWidth() + 'px';
        $('.fixed-position.papers-info').show();
    });
    $('body').on('click', '.fixed-position.papers-info .close-icon', function() {
        $('.fixed-position.papers-info').hide();
        $('body')[0].style.paddingRight = '0px';
        $('body').removeClass('overflow');
    });
    // 冒牌公告 弹窗
    $('body').on('click', '#mpgg', function() {
        $('body').addClass('overflow');
        $('body')[0].style.paddingRight = getScrollbarWidth() + 'px';
        $('.fixed-position.mpgg').show();
    });
    $('body').on('click', '.fixed-position.mpgg .close-icon', function() {
        $('.fixed-position.mpgg').hide();
        $('body')[0].style.paddingRight = '0px';
        $('body').removeClass('overflow');
    });
    
    // 查看证书 弹窗
    // 弹出证书方法
    // var obj = [];
    window.openCertificate = function(index) {
        index = index-1; 
        var obj = reg_obj.data;//对应证书的数据;
        var fileArr = obj[index].file_link;
        var strFile = '';
        for (var i = 0; i < fileArr.length; i++) {
            strFile += '<p>' + fileArr[i].file_name + '<a href="' + fileArr[i].link + '">[查看证明文件]</a></p>';
        }
            // 每一条 strFile的例子如下 ，需要循环
        // '<p> +obj[index].file_link.file_name+ <a href=" +obj[index].file_link.link+ ">[查看证明文件]</a></p>';
        var strImg = '<img src="/static/index/images/zhang.png" alt="">';
        var strHtml = `<div class="logo">
        <img src="` + obj[index].c_logo + `" alt="">
    </div>
    <div class="certificate-title">
        <div>` + obj[index].c_name_cn + `</div>
        <div class="jgdj">监管等级：<div>` + obj[index].r_level + `</div></div>
    </div>
    <div class="explain">` + obj[index].dsc + `</div>
    <div class="status">
        <div>当前状态：<span>${obj[index].status.name == null?'— —':obj[index].status.name}</span></div>
        <div>监管国家：<span>${obj[index].country_id.c_name == null?'— —':obj[index].country_id.c_name}</span></div>
        <div>监管证号：<span>${obj[index].license_number == null?'— —':obj[index].license_number}</span></div>
        <div>牌照类型：<span>${obj[index].license_type == null?'— —':obj[index].license_type}</span></div>
    </div>
    <div class="info">
        <div>
            <p><span class="bold">持牌机构:</span><span>${obj[index].r_name == null?'— —':obj[index].r_name}</span></p>
            <p><span class="bold">持牌机构邮箱: </span><span>${obj[index].r_email == null?'— —':obj[index].r_email}</span></p>
            <p><span class="bold">持牌机构网址:</span><span>${obj[index].r_web == null?'— —':obj[index].r_web}</span></p> `+
            `<p><span class="bold">持牌机构地址:</span><span>${obj[index].r_add == null?'— —':obj[index].r_add}</span></p>
            <p><span class="bold">持牌机构证明文件:</span><span></span></p>
            `
            + strFile +
            `
        </div>
        <div>
            <div>
                <p>
                    <span class="bold">生效时间:</span>
                    <span>${obj[index].active_time == null?'— —': (new Date(obj[index].active_time * 1000).getFullYear() + '-' + (new Date(obj[index].active_time * 1000).getMonth() + 1)) + '-' + new Date(obj[index].active_time * 1000).getDate()}</span>
                </p>
                <p>
                    <span class="bold">到期时间:</span>
                    <span>${obj[index].expire_time == null?'— —': (new Date(obj[index].active_time * 1000).getFullYear() + '-' + (new Date(obj[index].active_time * 1000).getMonth() + 1)) + '-' + new Date(obj[index].active_time * 1000).getDate()}</span>
                </p>
                <p>
                    <span class="bold">持牌机构电话: </span>
                    <span>${obj[index].r_tel == null?'— —':obj[index].r_tel}</span>
                </p>
            </div>
            <div>
            ` + strImg + `
            <img src="/static/index/images/jianding.png" alt="">
            </div>
        </div>
    </div>`;

        $('.fixed-position.certificate .content').html(strHtml);
        $('body').addClass('overflow');
        $('body')[0].style.paddingRight = getScrollbarWidth() + 'px';
        $('.fixed-position.certificate').show();
    }

    $('body').on('click', '.fixed-position.certificate .close-icon', function() {
        $('.fixed-position.certificate').hide();
        $('body')[0].style.paddingRight = '0px';
        $('body').removeClass('overflow');
    });
    function getScrollbarWidth() {
        var oP = document.createElement('p'),
            styles = {
                width: '100px',
                height: '100px',
                overflowY: 'scroll'
            },
            i, scrollbarWidth;
        for(i in styles) oP.style[i] = styles[i];
        document.body.appendChild(oP);
        scrollbarWidth = oP.offsetWidth - oP.clientWidth;
        oP.remove();
        return scrollbarWidth;
    }
    ImagePreview.init({
        id:"papers-info-img"
    });//传参模式一：所有img的父级元素id（不支持跨级，跨级请用第二种）
});
/*
*  鉴定MT4-MT5方法
*  传入一个参数 servers
*/
function MT4_MT5(servers) {
    function getScrollbarWidth() {
        var oP = document.createElement('p'),
            styles = {
                width: '100px',
                height: '100px',
                overflowY: 'scroll'
            },
            i, scrollbarWidth;
        for(i in styles) oP.style[i] = styles[i];
        document.body.appendChild(oP);
        scrollbarWidth = oP.offsetWidth - oP.clientWidth;
        oP.remove();
        return scrollbarWidth;
    }
    $('body').addClass('overflow');
    $('body')[0].style.paddingRight = getScrollbarWidth() + 'px';
    $('.fixed-position.identify-mt4').show();
    var store = new Vuex.Store({
        state: {
            // initial state
            servers: servers
        },
      
      
        mutations: {
        },
      
        actions: {
        } 
    });
      Vue.component('dashboard-clock', {
        props: {
          digital: {
            default: true,
            type: Boolean },
      
          binary: {
            default: false,
            type: Boolean } },
      
      
        data() {
          return {
            time: '' };
      
        },
        template: `
          <div class='dashboard-clock'>
              <div v-if="digital" class="dashboard-clock-digital">{{time}}</div>
              <table v-if="binary" class="dashboard-clock-binary">
                  <tr class='hours'>
                      <td v-for='n in 6'></td>
                  </tr>
                  <tr class='minutes'>
                      <td v-for='n in 6'></td>
                  </tr>
                  <tr class='seconds'>
                      <td v-for='n in 6'></td>
                  </tr>
              </table>
          </div>
          `,
        mounted: function () {
            this.render();
            window.setInterval(this.render, 1000);
        },
        methods: {
          render() {
            const d = new Date();
            const h = d.getHours();
            const m = d.getMinutes();
            const s = d.getSeconds();
      
            this.time = `${this.addZero(h)} : ${this.addZero(m)} : ${this.addZero(s)}`;
      
            this.light(this.convert(s), '.seconds');
            this.light(this.convert(m), '.minutes');
            this.light(this.convert(h), '.hours');
          },
          convert(num) {
            let bin = "";
            let conv = [];
      
            while (num > 0) {
              bin = num % 2 + bin;
              num = Math.floor(num / 2);
            }
      
            conv = bin.split('');
      
            while (conv.length < 6) {
              conv.unshift("0");
            }
      
            return conv;
          },
          light(array, type) {
            $(type + ' td').attr('class', 'num0');
            for (var i = 0; i < array.length; i++) {
              $(type + ' td:eq(' + i + ')').attr('class', 'num' + array[i]);
            }
          },
          addZero(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
          } } });
      
      
      Vue.component('server-list', {
        template: '<div class="server-list"><slot></slot></div>' });
      
      
      Vue.component('server', {
        props: ['type'],
        template: `
          <div class="server">
              <div class="server-icon">
                <slot name="status_img"></slot>
              </div>
              <div class="server-status">
                <slot name="status"></slot>
              </div>
              <div class="server-details">
                <div class="server-name"><slot name="name"></slot></div>
                <div class="server-info">
                    <div>
                        <div>服务器名称：</div>
                        <div><slot name="name"></slot></div>
                    </div>
                    <div>
                        <div>服务器所在国家/区域：</div>
                        <div><slot name="adr_icon"></slot><slot name="adr"></slot></div>
                    </div>
                </div>                    
              </div>
          </div>` 
        });
      
      
      //Vue.use(Vuex);
      const dashboard = new Vue({
        el: 'dashboard',
        data: () => {
          return {
            servers: store.state.servers };
      
        },
        methods: {
        //   updateServerStatus(server) {
        //     store.dispatch('serverStatus', server);
        //   } 
        },
      
        mounted() {
        //   setInterval(() =>
        //   store.dispatch('serverStatus',
        //   Math.floor(Math.random() * (this.servers.length - 0) + 0)),
        //   5000);
        } 
    });
}