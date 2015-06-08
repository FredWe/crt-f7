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