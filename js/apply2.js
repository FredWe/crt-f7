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

var mySwiper1 = myApp.swiper('.swiper-1', {
  pagination:'.swiper-1 .swiper-pagination',
  spaceBetween: 0,
  nextButton: '.swiper-custom .swiper-1~.swiper-button-next',
  prevButton: '.swiper-custom .swiper-1~.swiper-button-prev'
});
var mySwiper2 = myApp.swiper('.swiper-2', {
  pagination:'.swiper-2 .swiper-pagination',
  spaceBetween: 0,
  nextButton: '.swiper-custom .swiper-2~.swiper-button-next',
  prevButton: '.swiper-custom .swiper-2~.swiper-button-prev'
}); 