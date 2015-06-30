// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon:true,
    // Enable templates auto precompilation
    precompileTemplates: true
    // Enabled pages rendering using Template7
    // template7Pages: true,
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});

var itemBeijing = $$('#item-beijing').html();
var itemWuhan = $$('#item-wuhan').html();
$$('li.item-beijing').append(itemBeijing);
$$('li.item-wuhan').append(itemWuhan);

var generateNav = function(e){
  var logobarHTML = Template7.templates.logobarTemplate(
   { title: e.dataset.logobarTitle } 
   );
  e.innerHTML += logobarHTML;
};
// var logobarTop = $$('#logobar-top').html();
$$('.navbar>.navbar-inner').each( function(index,e){ generateNav(e); } );

var bgImg = [1,2];
var bgColor = ["blue", "green", "red", "purple"];
var btnName = {
  en: ["beijing", "shanghai", "guangzhou", "changchun", "alashan", "wuhan", "nanchang", "chengdu", "kunming", "mianyang", "chongqing", "suining", "shijingshan"], 
  cn: ["北京", "上海", "广州", "长春", "阿拉善", "武汉", "南昌", "成都", "昆明", "绵阳", "重庆", "遂宁", "石景山"]
};


var mySwiper1 = myApp.swiper('.swiper-1', {
  pagination:'.swiper-1 .swiper-pagination',
  paginationHide: true,
  paginationClickable: true,
  spaceBetween: 0,
  nextButton: '.swiper-custom .swiper-1 ~ .swiper-button-next',
  prevButton: '.swiper-custom .swiper-1 ~ .swiper-button-prev'
});
var mySwiper2 = myApp.swiper('.swiper-2', {
  pagination:'.swiper-2 .swiper-pagination',
  paginationHide: true,
  paginationClickable: true,
  spaceBetween: 0,
  nextButton: '.swiper-custom .swiper-2 ~ .swiper-button-next',
  prevButton: '.swiper-custom .swiper-2 ~ .swiper-button-prev'
}); 

var calendarDefault = myApp.calendar({
    input: '#calendar-default',
});

