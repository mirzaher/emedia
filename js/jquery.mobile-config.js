$(document).bind("mobileinit", function () {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    $.mobile.defaultHomeScroll = 0;
    $.mobile.orientationChangeEnabled = true;
    $.mobile.changePage.defaults.changeHash = false;

    $.mobile.loader.prototype.options.text = "";
    $.mobile.loader.prototype.options.textVisible = true;
    $.mobile.loader.prototype.options.theme = "b";
    $.mobile.loader.prototype.options.html = "";

    $.mobile.page.prototype.options.theme = "b";

    $.event.special.swipe.horizontalDistanceThreshold = 10;
    $.event.special.swipe.verticalDistanceThreshold = 150;
    $.event.special.swipe.durationThreshold = 2000;


    $.mobile.selectmenu.prototype.options.nativeMenu = false;


    // Setting #container div as a jqm pageContainer
    //$.mobile.pageContainer = $('#main');
    // Setting default page transition to slide
    $.mobile.defaultPageTransition = 'slide';
    // Setting fallback transition for browsers that don't support 3D transforms
    $.mobile.transitionFallbacks.slideout = "none";
    console.log('remove page ispred');
    // Remove page from DOM when it's being replaced
    $('div[data-role="page"],div[data-role="dialog"]').on('pagehide', function (event, ui) {
        console.log('remove page');
        if (!window.dialog) {
            $(event.currentTarget).remove();
        }
    });

});