$(".mui-btn-primary").on("tap",function(){

  //获取用户名和密码之前需要确认密码或者用户名是否为空,用$.trim()去空
  if($.trim($(".mui-input-clear").val()) == ""){
    mui.toast("请输入用户名");
    return false;
  }
  if($.trim($(".mui-input-password").val()) == ""){
    mui.toast("请输入密码");
    return false;
  }

  //必须发送的参数是  username password
  var data = {
    'username':$(".mui-input-clear").val(),
    'password':$(".mui-input-password").val()
  }
  $.ajax({
    type:'post',
    url:'/user/login',
    data:data,
    success:function(result){
      console.log(result);
      //如果result.success == true说明已经注册，登录验证成功后，如果原来是从某个页面进入登录页面，需要重新跳转到原页面，如果不是从某个页面跳转的，默认跳转到首页
      if(result.success){
        //如果从某个页面跳转的，网址如下
        //http://localhost:3000/m/login.html?returnURL=http://localhost:3000/m/product-detail.html?id=1


        //console.log(location.search);//?returnURL=http://localhost:3000/m/product-detail.html?id=1

        if(location.search && location.search.indexOf("?returnURL") == 0){
          //得到登录成功后的跳转地址
          location.href = location.search.replace("?returnURL=","");
        }else{
          //如果不是从某个页面跳转的，默认跳转到首页
          location.href = "index.html";
        }
      }else{
          //登录失败
          mui.toast("result.message");
      }
    }
  })
})