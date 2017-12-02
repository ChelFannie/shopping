$(function(){
  function render() {
    //动态获取购物车的数据，并渲染
    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      data: {},
      success: function (result) {//返回的数据是一个数组，需要包装成一个对象
        // console.log(result);
        var html = template("cartList", { "items": result });
        // console.log(html);
        $("#cart_box").html(html);
      }
    })
  }
  render();
  //点击编辑，绑定事件
  $(".mui-table-view").on("tap",".mui-btn-blue",function(){
    // console.log(this);
    var li = this.parentNode.parentNode;
    // console.log(li);
    //获取之前存储好的数据
    //dataset属性可以用来获取当前元素中的自定义属性，dataset是DOM中的一个属性
    // var data = $(this)[0].dataset;
    var data = this.dataset;
    // console.log(data);
    // DOMStringMap {id: "1", size: "50", productnum: "20", num: "1", productsize: "40-50"}
    var html = template("editCart",data);
    mui.confirm(html.replace(/\n/g,''), '修改商品', ["是","否"], function(e) {
          if (e.index == 0) {//单击是触发的事件
            $.ajax({
              type:'post',
              url:'/cart/updateCart',
              // id  size  num
              data:{
                "id":data.id,
                "size":$(".psize.active").text(),
                "num":$(".mui-input-numbox").val()
              },
              success:function(result){
                // console.log(result);//{success: true}
                if(result.success){
                  mui.toast('修改成功');
                  // //添加之后，需要重新从数据库获取数据
                  // render();//因为重新从数据库中获取数据会刷新页面，导致如果之前单选框有被选中，也会被刷新掉，所以不能这么操作
                  /*修改页面中对应元素的显示内容*/
                  /*不需要将数据全部重新刷新渲染--因为要保留用户之前的选择*/
                  /*重新计算总金额*/

                  //1.0修改页面中数量的显示
                    //1.1先获取到单击编辑框中的数量和尺码
                  var size1 = $(".psize.active").text();
                  var num1 = $(".mui-input-numbox").val();
                  // console.log(size1);
                  // console.log(size1,num1);
                    //1.2再将拿到的数量和尺码去修改页面上的显示
                    //因为这些元素时动态生成的，需要先找到不是动态生成的父元素之后再找对应的元素
                    $(li).find(".size").html("鞋码："+size1);
                    // console.log($(li).find(".size"));
                  $(li).find(".number").html("x"+num1+"双");
                  //1.3同时要修改编辑框中的数据,就是修改存在a标签里的数据
                  $(li).find(".mui-btn-blue").attr("data-num",num1);
                  $(li).find(".mui-btn-blue").attr("data-size",size1);
                  //因为后期要使用复选框属性中存的商品进行金额的计算，需要重新修改复选框的属性值
                  $(li).find("input.checked").attr("data-num",num1);
                  //重新计算总金额
                  calcuTotal();
                  /*关闭当前的滑动:swipeoutClose可以关闭当前的滑动效果*/
                  mui.swipeoutClose(li);
                }
              }
            })
          } else {
            // info.innerText = 'MUI没有得到你的认可，继续加油'
          }
        });
        /*得让这个结构在页面中生成之后再进行初始化操作*/
        mui(".mui-numbox").numbox();
  })
  //得到结构之后，还需要切换尺码选中框的样式
  $(document).on("tap",".psize",function(){
    $(this).addClass("active").siblings().removeClass("active");
  });
  //点击商品的单选框，计算金额
  // var arr = [];
  $(document).on("change",".checked",function(){
    // //1.0获取所有的被选中的单选框
    // var checks = $(".checked:checked");
    // var totalMoney = 0;
    // for(var i = 0; i < checks.length;i++){
    //   totalMoney = totalMoney + checks[i].dataset.num *checks[i].dataset.price;
    //   totalMoney = Math.ceil(totalMoney*100)/100;
    //   $("#cartAmount").text(totalMoney);
    //   // arr[i] = checks[i].dataset.id;
    // }
    calcuTotal();
  })

  function calcuTotal() {
    var checks = $(".checked:checked");
    var totalMoney = 0;
    for(var i = 0; i < checks.length;i++){
      totalMoney = totalMoney + checks[i].dataset.num *checks[i].dataset.price;
      totalMoney = Math.ceil(totalMoney*100)/100;
      $("#cartAmount").text(totalMoney);
    }
  }

  //点击删除，绑定事件
  $(".mui-table-view").on("tap",".mui-btn-red",function(){
    var id = this.dataset.id;
    // console.log(id);
    $.ajax({
      type:'get',
      url:'/cart/deleteCart',
      data:{"id":[id]},
      success:function(result){
        console.log(result);
        if(result.success){
          mui.toast('删除成功'+id);
          render();
        }
      }
    })
  })

})
