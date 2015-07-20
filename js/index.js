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

var pageSetPart1 = ["apply", "apply2", "apply2-2", "reg1", "reg2", "reg3", "reg4"];
var isMember = function(element, array) {
  return array.indexOf(element) != -1;
}

myApp.onPageInit("apply", 
  function(page){ 
    var itemBeijing = $$('#item-beijing').html();
    var itemWuhan = $$('#item-wuhan').html();
    $$('li.item-beijing').append(itemBeijing);
    $$('li.item-wuhan').append(itemWuhan);
  });

//merge from index.js
myApp.onPageInit("apply2", 
  function(page){ 
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
  });

// this section for navbar different title text for page
//------------------------------------------------------
var generateNav = function(e){
  var logobarHTML = Template7.templates.logobarTemplate({
    title: e.dataset.logobarTitle 
  });
  e.innerHTML += logobarHTML;
};
myApp.onPageInit('*', 
  function(page){ 
    if (isMember(page.name, pageSetPart1)) {
      var logobarTop = $$('#logobar-top').html();
      $$('.navbar>.navbar-inner').append(logobarTop);
    }
    else {
      $$('.navbar>.navbar-inner').each( 
        function(index,e){ generateNav(e); }
        );      
    }
  });

// this section for different button blocks in area-content
//------------------------------------------------------
// variables:
var bgImg = [1,2];
var bgColor = ["blue", "green", "red", "purple"];
var btnName = {
  en: ["beijing", "shanghai", "guangzhou", "changchun", "alashan", "wuhan", "nanchang", "chengdu", "kunming", "mianyang", "chongqing", "suining", "shijingshan"], 
  cn: ["北京", "上海", "广州", "长春", "阿拉善", "武汉", "南昌", "成都", "昆明", "绵阳", "重庆", "遂宁", "石景山"]
};
// area-content marked
var appendArea = function(area, v, i){
  var tempHTML = Template7.templates.itemArea({
      nameCn: v,
      nameEn: btnName.en[i].toUpperCase()
    });
  area.innerHTML += tempHTML;
};
var randomAppendClass = function (elementSet, classTextSet) {
  elementSet = Array.prototype.slice.call(elementSet);
  elementSet.forEach( function(member,index){ 
      var indexRandomSelected = (Math.random() * (classTextSet.length - 1)).toFixed();
      member.setAttribute("class", member.getAttribute("class") + " " + classTextSet[indexRandomSelected])
    });
}
myApp.onPageInit("match-info-table", 
  function(page){ 
    var area = document.querySelector("#match-info-table-page .area-content");
    btnName.cn.forEach( function(value,index){ appendArea(area, value, index); } );
    randomAppendClass(
      area.getElementsByClassName("button"),
      bgImg.map(function(val,i){return "button-bg-" + val})
      );
    randomAppendClass(
      area.getElementsByClassName("button-mask"),
      bgColor.map(function(val,i){return "button-mask-" + val})
      );
  });

//match-info-choose page swiper initialization
var packedSwiperInit = function (swiperCustomId){
  var mySwiper = myApp.swiper(".swiper-custom#" + swiperCustomId + " " + ".swiper-container", {
    nextButton: ".swiper-custom#" + swiperCustomId + " " + ".swiper-button-next",
    prevButton: ".swiper-custom#" + swiperCustomId + " " + ".swiper-button-prev",
  });   
  return mySwiper;
}
myApp.onPageInit("match-info-choose",
  function(pageData){
    var swiperSet=["match-season", "match-type", "match-level", "match-round"].map(packedSwiperInit);
  }); 

//this section for controlling "div.list-block.form-info.partner" visible/hidden in apply2.html 
var addClass = function(elem,className){
  if(elem.className.match(className) === null){
    elem.className += ' ';
    elem.className += className;
    elem.className = elem.className.trim();
  }
}
var removeClass = function(elem,className){
    elem.className = elem.className.replace(className,'');
    elem.className = elem.className.trim();
}
myApp.onPageInit("apply2",
  function(pageData){
    var swiperWrapper = document.querySelector(".swiper-1 .swiper-wrapper");
    var testDouble = (function(){
      var slideSet = swiperWrapper.getElementsByTagName("span");
      var slideArray = Array.prototype.slice.call(slideSet);
      var slideDouble = slideArray.filter(function(elem){
        return elem.textContent.indexOf('双') != -1;
      });
      slideDouble.forEach(function(elem,ind,arr){
        addClass(elem,'double');
      });
    }());
    var controlFormVisible = function (record, observer){
      var formControlled = document.querySelector('.list-block.form-info.partner');
      var sig = (swiperWrapper.querySelector('.swiper-slide-active .double') != null);
      if(sig){
        removeClass(formControlled,'disappeared');
      }else{
        addClass(formControlled,'disappeared');
      }
    }
    var formObserver = new MutationObserver(controlFormVisible);
    var  options = {
      // 'childList': true,
      'attributes': true,
      // 'characterData': true,
      // 'subtree': true,
    } ;
    formObserver.observe(swiperWrapper, options);
  }); 

//for 'reg2'
myApp.onPageInit("reg2",
  function(pageData){
    var calendarDefault = myApp.calendar({
        input: '#calendar-default',
    });
  }); 

//for 'news-list'
myApp.onPageInit("news-list",
  function(pageData){
    var aSet = document.querySelectorAll('.list-block.news-list ul li a');
    var aArray = Array.prototype.slice.call(aSet);
    aArray.forEach(function(elem,ind,arr){
      elem.addEventListener('click',function(){
        addClass(elem,'readed');
      });
    });
    // optional:
    var aSet = document.querySelectorAll('.filter-details a.btn-remove');
    var aArray = Array.prototype.slice.call(aSet);
    aArray.forEach(function(elem,ind,arr){
      elem.addEventListener('click',function(){
        elem.parentNode.remove();
      });
    });
  });
