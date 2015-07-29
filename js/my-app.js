var config = {
    api_url: "http://crtdata.hanshikeji.com:81",
    app_url: "http://crt.hanshikeji.com:81",
};
var myApp = new Framework7({
  onAjaxStart: function (xhr) {
    myApp.showIndicator();
  },
  onAjaxComplete: function (xhr) {
    myApp.hideIndicator();
  },
  template7Pages: true,
  precompileTemplates: true,
  smartSelectBackOnSelect: true,
  smartSelectInPopup:true,
  modalTitle:'中国CRT赛事赛',
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});
if(init()){
    console.log('刷新首页');
    mainView.router.refreshPage();
}

// goto top
$$('body').append($$('.operation-over .gotop'));
$$('body').on('touchstart click','.gotop',function () { 
    $$('.page-content').scrollTop(0,800);
});
$$('.toolbar .rule').on('click',function (event) {
    var result;
    $$.ajax({
        url: config.api_url+'/v1/post/rule',
        method: 'GET',
        dataType: 'json',
        success: function(data){
            var html = 
                '<div class="popup">'+
                '  <div class="navbar">'+
                '    <div class="navbar-inner">'+
                '      <div class="left"></div>'+
                '      <div class="right">'+
                '        <a href="#" class="close-popup">关闭</a>'+
                '      </div>'+
                '    </div>'+
                '  </div>'+
                '  <div class="content-block">'+ data.value +
                '  </div>'+
                '</div>';
            myApp.popup(html);
        }
    });
});

$$('.toolbar .userinfo').on('click',function (event) {
    var that = this;
    $$.ajax({
        url: config.api_url+'/v1/post/profile?access-token='+getCookie('token'),
        method: 'GET',
        dataType: 'json',
        beforeSend: function(){
            $$(that).attr('disabled',true);
        },
        success: function(data){
            myApp.alert("当前积分：" + data[1]);
            $$(that).removeAttr('disabled');
        },
        error: function(data){
            var response = JSON.parse(data.response);
            myApp.alert(response.message);
            $$(that).removeAttr('disabled');
        },
    });
}); 

$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    // 处理头像
    var avatar = getCookie('avatar');
    if(avatar)
        $$('.toolbar img.avatar').attr('src',decodeURIComponent(avatar));
    // goto top
    $$(page.container).find('.page-content').on('scroll',function () {    
        $$(this).scrollTop() >= 200 ? $$('.gotop').show() : $$('.gotop').hide();
    });
});

Template7.data['page:index'] = function(){
    console.log('page data for index');
    var result = {};
    /*
    $$.ajax({
        url: config.api_url+'/v1/post',
        method: 'GET',
        data: {
            // expand: 'user,match',
        },
        async: false,
        dataType: 'json',
        success: function(data){
            result = data;
        }
    });
    */

  return result;
}

myApp.onPageInit('index', function (page){
    console.log('page init index');
    $$('[data-page=index]').show();
    /*
    $$('.toolbar a.rule').show();
    $$('.toolbar a.article').hide();
    //无限下拉分页
    var loading = false;
    var lastIndex = $$('#article li').length;
    var maxItems = page.context._meta.totalCount;
    var itemsPerLoad = page.context._meta.perPage;
    var url = page.context._links.next?page.context._links.next.href:"";
    $$('.infinite-scroll').on('infinite', function () {
        if (loading) return;
        loading = true;
        console.log(url);
        if (lastIndex >= maxItems) {
          myApp.detachInfiniteScroll($$('.infinite-scroll'));
          $$('.infinite-scroll-preloader').remove();
          return;
        }

        $$.getJSON(url, function(data) {
            loading = false;
            var html = '';
            for (var key in data.items) {
              var item = data.items[key];
              html += 
                '<li><a href="#" data-id="'+item.id +'" class="item-content item-link">' +
                '  <div class="item-media"><img src="/upload/post/'+item.id+'/'+item.cover+'" width="80"></div>' +
                '  <div class="item-inner">' + 
                '    <div class="item-title-row">' +
                '      <div class="item-title">'+item.title+'</div>' +
                '    </div>' +
                '    <div class="item-subtitle">作者：'+item.writer+'</div>' +
                '    <div class="item-text">时间：'+timeFormat(item.create_at)+'</div>' +
                '  </div></a></li>';
            }
            $$('#article ul').append(html);
            lastIndex = $$('#article li').length;
            url = data._links.next.href;
        });
    }); 

    $$('#article').on('click','li a',function (event) {
        var id = $$(this).attr('data-id');
        var result;
        $$.ajax({
            url: config.api_url+'/v1/post/'+id,
            method: 'GET',
            async: false,
            dataType: 'json',
            success: function(data){
                result = data;
            }
        });

        mainView.router.load({
            url: 'detail.html',
            context: result,
        });
    });
    */
});

Template7.data['page:match-info-table'] = function(){
    console.log('page data for match info table');
    var result = {};
    $$.ajax({
        url: config.api_url+'/v1/area',
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function(data){
            result = {data:data};
        }
    });
    return result;
}

myApp.onPageInit('match-info-table', function (page){
    console.log('page init match info table');
    console.log(page.context);
    $$('#match-info-table-page').on('click','a.city',function (event) {
        var name = $$(this).attr('data-name');
        SetCookie('city',name);

        mainView.router.load({
            url: 'apply.html',
        });
    });
});

Template7.data['page:user-center'] = function(){
    console.log('page data for user center');
    var result = {};
    $$.ajax({
        url: config.api_url+'/v1/user/profile?access-token='+getCookie('token'),
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function(data){
            result.data = data;
        }
    });

    $$.ajax({
        url: config.api_url+'/v1/match/signed?access-token='+getCookie('token'),
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function(data){
            result.signed = data;
        }
    });

    return result;
}

myApp.onPageInit('user-center', function (page){
    console.log('page init user center');
    console.log(page.context);

    $$('#user-center-page').on('click','a.pay',function (event) {
        var id = $$(this).attr('data-id');
        window.location.href=config.api_url+'/v1/match/pay?id='+id+'&access-token='+getCookie('token');
    });
});

Template7.data['page:apply'] = function(){
    console.log('page data for apply');
    var result = {};
    $$.ajax({
        url: config.api_url+'/v1/match/mymatch?access-token='+getCookie('token'),
        method: 'GET',
        data: {
            city: getCookie('city'),
        },
        async: false,
        dataType: 'json',
        success: function(data){
            result = {data:data};
        }
    });
    return result;
}

myApp.onPageInit('apply', function (page){
    console.log('page init apply');
    console.log(page.context);
    $$('#apply-page').on('click','a',function (event) {
        var id = $$(this).attr('data-id');
        var data = page.context.data[id];
        if(data.match_type.match('双'))
            data.partner = true;
        else
            data.partner = false;
        mainView.router.load({
            url: 'apply2.html',
            context: data,
        });
    });
});

myApp.onPageInit('apply2', function (page){
    console.log('page init apply2');
    console.log(page.context);
    $$('#apply2-page').on('click','a.submit',function (event) {
        $$.ajax({
            url: config.api_url+'/v1/match/baoming?access-token='+getCookie('token'),
            method: 'POST',
            data: {
                matchid: page.context.id,
                p_name: $$("input[name=p_name]").val(),
                p_idcard: $$("input[name=p_idcard]").val(),
            },
            dataType: 'json',
            success: function(data){
                if(data === "您已报名了此项赛事" || data==="报名成功，请尽快付款！"){
                }
                myApp.alert(data);
            }
        });
    });
});

myApp.onPageInit('detail', function (page) {
    console.log('page detail init');
    $$('.toolbar a.article').show();
    $$('.toolbar a.rule').hide();
    wx_init();
    wx.ready(function(){
        wx.onMenuShareAppMessage({
            // title: '', 
            // desc: '', 
            // link: '', 
            // imgUrl: '',
            success: function () { 
            },
            cancel: function () { 
            }
        });
        wx.onMenuShareTimeline({
            title: $$('p.title').text(), 
            // desc: '', 
            link: config.app_url + "?post=" + $$('.page[data-page=detail] .page-content').attr('data-id'), 
            imgUrl: config.app_url+'/'+$$('p.img img').attr("src"),
            success: function () { 
                var post_id = $$('.page[data-page=detail] .page-content').attr('data-id');
                $$.ajax({
                  url: config.api_url+'/v1/post/share?access-token='+getCookie('token'),
                  method: 'POST',
                  dataType: 'json',
                  data: {post_id:post_id},
                  success: function(data){
                    myApp.addNotification({
                        title: '分享成功',
                        message: '获得50积分',
                        hold: 2000,
                    });
                  },
                  error: function(data){
                    var response = JSON.parse(data.response);
                    myApp.addNotification({
                        title: '分享',
                        message: response.message,
                        hold: 2000,
                    });
                  },
                });
            },
            cancel: function () { 
            }
        });
    });

    $$('a.like').on('click', function () {
        var post_id = $$(this).attr('data-id');
        var that = this;
        $$.ajax({
          url: config.api_url+'/v1/post/like?access-token='+getCookie('token'),
          method: 'POST',
          dataType: 'json',
          data: {post_id:post_id},
          beforeSend: function(){
            $$(that).attr('disabled',true);
          },
          success: function(data){
            myApp.addNotification({
                title: '点赞成功',
                message: '加10积分',
                hold: 2000,
            });
            $$(that).removeAttr('disabled');
          },
          error: function(data){
            var response = JSON.parse(data.response);
            myApp.addNotification({
                title: '点赞',
                message: response.message,
                hold: 2000,
            });
            $$(that).removeAttr('disabled');
          }
        });
    });

    $$('a.share').on('click', function () {
        myApp.alert("点击右上角分享到朋友圈");
    });
});

myApp.onPageInit('checkin', function (page) {
    console.log('page checkin init');

    $$('a.checkin').on('click', function () {
        var that = this;
        $$.ajax({
          url: config.api_url+'/v1/post/checkin?access-token='+getCookie('token'),
          method: 'POST',
          dataType: 'json',
          data: {},
          beforeSend: function(){
            $$(that).attr('disabled',true);
          },
          success: function(data){
            myApp.addNotification({
                title: '签到',
                message: '加10积分',
                hold: 2000,
            });
            $$(that).removeAttr('disabled');
          },
          error: function(data){
            var response = JSON.parse(data.response);
            myApp.addNotification({
                title: '签到',
                message: response.message,
                hold: 2000,
            });
            $$(that).removeAttr('disabled');
          }
        });
    });
});


myApp.onPageInit('login', function (page) {
    console.log('page login init');
    $$('form.ajax-submit').attr('action',config.api_url + "/site/rlogin");
    $$('form.ajax-submit').on('beforeSubmit', function (e) {
        var xhr = e.detail.xhr;
        xhr.withCredentials = true;
    });
    $$('form.ajax-submit').on('submitted', function (e) {
        var xhr = e.detail.xhr;
        var data = JSON.parse(e.detail.data);
        if(data.err === 0){
            myApp.alert('绑定成功');
            SetCookie('bind',1);
            mainView.router.loadPage('match-info-table.html');
        }
        else if(data.err === 2){
            myApp.alert('未登录');
        }
        else{
            myApp.alert('绑定失败:'+data.data);
        }
    });
});

Template7.data['page:reg2'] = function(){
    console.log('page data for reg2');
    var result = {};
    $$.ajax({
        url: config.api_url+'/v1/area',
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function(data){
            result = data;
        }
    });

  return {area:result};
}

myApp.onPageInit('reg2', function (page) {
    console.log('page reg2 init');
    myApp.calendar({
        input: '#calendar-default',
    });
    $$('input[name=username]').change();
});

myApp.onPageInit('reg3', function (page) {
    console.log('page reg3 init');
    $$('input[name=f_email]').change();
    $$('.page[data-page=reg3]').on('click', 'a.next', function (e) {
        var formReg2 = localStorage.getItem('f7form-reg2');
        var formReg3 = localStorage.getItem('f7form-reg3');
        $$.ajax({
            url: config.api_url + "/site/rregister",
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true,
            },
            data:{
                reg2: formReg2,
                reg3: formReg3,
            },
            success: function(data){
                if(data.err === 0){
                    myApp.alert('注册成功');
                    SetCookie('bind',1);
                    mainView.router.loadPage('reg4.html');
                }
                else if(data.err === 2){
                    myApp.alert('未登录');
                }
                else{
                    myApp.alert('注册失败:'+data.data);
                }
            }
        });
    });
});

Template7.data['page:reg4'] = function(){
    console.log('page data for reg4');
    var formReg2 = localStorage.getItem('f7form-reg2');
    var formReg3 = localStorage.getItem('f7form-reg3');
    var result = {reg2:JSON.parse(formReg2),reg3:JSON.parse(formReg3)};
    return result;
}

myApp.onPageInit('reg4', function (page) {
    console.log('page reg4 init');
});

function init(){
  var query = $$.parseUrlQuery(window.location.href);
  if(query.token){
    SetCookie('token',query.token);
    SetCookie('bind',query.bind);
    if(query.avatar)
        SetCookie('avatar',query.avatar);
    history.replaceState({}, "", config.app_url+'/');
    myApp.alert('登录成功');
  }

  var token = getCookie('token');
  if(!token)
    window.location.href=config.api_url+"/site/auth?authclient=weixin&return="+encodeURIComponent(config.app_url);

  $$.ajax({
      url: config.api_url+'/site/isguest',
      method: 'GET',
      dataType: 'json',
      xhrFields: {
        withCredentials: true,
      },
      success: function(data){
          if(data.isguest)
              window.location.href=config.api_url+"/site/auth?authclient=weixin";
      }
  });

  if(query.checkin){
    mainView.router.load({
        url: 'checkin.html',
        context: result,
        animatePages: false,
    });
    return false;
  }

  if(query.post){
    var id = query.post;
    var result;
    $$.ajax({
        url: config.api_url+'/v1/post/'+id,
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function(data){
            result = data;
        }
    });

    mainView.router.load({
        url: 'detail.html',
        context: result,
        animatePages: false,
    });
    return false;
  }

  var bind = getCookie('bind');
  if(bind === "1"){
    mainView.router.load({
        url: 'match-info-table.html',
        animatePages: false,
    });
    return false;
  }
  return true;
}

function wx_init() {
  $$.getJSON(config.api_url+'/v1/post/weixinjs',{'access-token':getCookie('token'),url:window.location.href}, function(data) {
    weixin(data);
  });
}

function weixin(weixin_sign) {
  // weixin js
  wx.config({
      // debug: true,
      appId: weixin_sign.appId,
      timestamp: weixin_sign.timestamp,
      nonceStr: weixin_sign.nonceStr,
      signature: weixin_sign.signature,
      jsApiList: ['previewImage','onMenuShareTimeline','onMenuShareAppMessage']
  });

  wx.ready(function(){
      wx.checkJsApi({
          jsApiList: [
              'previewImage',
              'onMenuShareTimeline',
              'onMenuShareAppMessage'
          ],
          success: function (res) {
              // alert(JSON.stringify(res));
          }
      });
  });
}

function SetCookie(name,value) {
  var Days = 30; 
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
  if(arr != null) return unescape(arr[2]); return null;
}

function timeFormat(timestamp) {
    var date = new Date(parseInt(timestamp)*1000);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minite= date.getMinutes();
    var second = date.getSeconds();
    return year+"年"+month+"月"+day+"日"+hour+":"+minite;
}
