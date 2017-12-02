$(function(){
  $.ajax({
    type: 'get',
    url:'/category/queryTopCategory',
    data:{},
    success:function(data){//通过传参的方式拿到后台传入的数据
      // console.log(data);
      //通过模板引擎将一级分类的数据渲染到页面上
      var html = template("firstCat",data);
      $(".lt_cat_left ul").html(html);

      //将默认加载的第一个二级分类渲染到页面上
      //先获取到id
      var id = data.rows[0].id;
      // console.log(id);
      //通过模板引擎将第一个二级分类渲染到页面上
      getSecCatData({"id":id},function(data){
        // console.log(data);
        var html2 = template("secondCat",data);
        // console.log(html2);
        $(".lt_cat_right .mui-scroll").html(html2);
      })
    }
  })

  //给左侧一级分类超链接绑定点击事件
  //因为左侧的a链接是动态生成的，所有需要通过给a的父元素绑定事件委托事件
  $(".lt_cat_left").on("tap",".fc",function(){
    //获取被点击对象的id
    // console.log($(this));//[a.fc, selector: ""]
    //对应的一级分类的id通过data-id存在
    // var id = $(this).data("id");
    // var id = $(this)[0].dataset.id;
    var id = $(this)[0].getAttribute("data-id");
    // console.log(id);
    getSecCatData({"id":id},function(data){
      console.log(data);
      var html = template("secondCat",data);
      // console.log(html);
      $(".lt_cat_right .mui-scroll").html(html);
    })
  })


  //获取二级分类数据
  var getSecCatData = function(pa,callback){
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data:pa,
      success: function(result){
        callback && callback(result);
      }
    })
  }
  


})




