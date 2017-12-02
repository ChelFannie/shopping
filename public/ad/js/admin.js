/*在ajax开始请求的时候  把进度条显示出来*/
$(window).ajaxStart(function(){
    NProgress.start();
});
/*在ajax结束请求的时候  把进度条完成*/
$(window).ajaxStart(function(){
    NProgress.done();
});

NProgress.configure({ showSpinner: true });
NProgress.configure({ minimum: 0.01 });

$("[data-menu]").on("click",function(){
    $(".ad_aside").toggle();
    // $(".ad_section").toggleClass("act");
    $(".ad_section").animate({"paddingLeft":0},1000)
})

//分类菜单的显示与隐藏

$("#cate").on("click",function(){
    $(".child").slideToggle();
})