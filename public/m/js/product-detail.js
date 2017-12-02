
$(function(){
   /*1.页面加载，根据用户所传递的产品ID获取商品详情，并且动态渲染*/
   var id = lt.getParamenter(location.search)["id"];
  //  console.log(id);
  //发送异步请求，获取数据，并渲染
  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{"id":id},
    success:function(result){
      console.log(result);
      var html = template("productDetail",result);
      $(".lt_content .mui-scroll").html(html);
      /*手动重新初始化数字输入框：因为动态生成的数字输入框需要重新初始化*/
      mui(".mui-numbox").numbox();
      /*图片轮播也重新初始化*/
      mui('.mui-slider').slider({
          interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
      });
    }
  })
  //选择尺码，切换选择的样式
  //因为是动态生成的结构，所以要给父元素绑定事件委托事件
  $(".mui-scroll").on("tap",".psize",function(){
    // console.log($(this));
    $(this).addClass("active").siblings().removeClass("active");
  });

  //加入到购物车,绑定事件委托
  $(".mui-btn-warning").on("tap",function(){
    //必须传入的参数：productId，num，size
    var data = {
      productId:id,//在页面加载时就可以获取到//js代码第四行
      num:$(".mui-input-numbox").val(),
      size:$(".psize.active").text()
    }
    // console.log(data);
    //发送请求
    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:data,
      success:function(result){
        console.log(result);
        //如果添加失败，说明没有登录，需要先跳到登录页面，并且要将现在的网址存起来
       if(result.error && result.error == 400){
        //  console.log(location.href);
         location.href = "login.html?returnURL="+location.href;
       }else{
        //如果成功，则弹出确认提示对话框
         mui.confirm('添加购物车成功，是否进入购物车查看', '操作提示',["是","否"], function (e) {
          //  console.log(e);
           if (e.index == 0) {
             location.href = "cart.html";
           } else {
            //  info.innerText = 'MUI没有得到你的认可，继续加油'
           }
         });
       }
      }
    });
  })

})



// if(result.success){
//   //确认提示框
//   mui.confirm('添加购物车成功，是否进入购物车查看', '操作提示', btnArray, function(e) {
//     if (e.index == 0) {
//       info.innerText = '你刚确认MUI是个好框架';
//     } else {
//       info.innerText = 'MUI没有得到你的认可，继续加油'
//     }
//   });
// }else{
//   mui.toast('添加购物失败，请登录');
// }