//将数据动态渲染到页面
$(function(){
  //获当前本地存储的历史记录数据
  var arr = getHistoryData();
  // console.log(arr);
  var html = template("lthsitory",{"items":arr});
  $(".lt_seach_history").html(html);
  //添加搜索按钮的点击事件
  $(".lt_right_btn").on("tap",function(){
    //1.0获取用户输入的数据
    var value = $("#userInput").val();
    // console.log(value);
    //2.0将当前输入添加到本地存储
    //2.1获取原始的本地存储数据
    var arr = getHistoryData();
    // console.log(arr);
    //2.2在真正的添加数据之前，先判断 1.数据是否已经存在   2.数据数量是否超过10条
    for(var i = 0; i < arr.length; i++){
      if(arr[i] == value){
        //先删除
        arr.splice(i,1);
      }
    }
    if(arr.length >= 10){
      //先删除最先存储的记录
      arr.splice(0,1);
    }
    arr.push(value);
    // console.log(arr);
    localStorage.setItem("ltHistoryData",JSON.stringify(arr));
    // var html = template("lthsitory",{"items":arr});
    // $(".lt_seach_history").html(html);
    location.href = "searchList.html?key="+value;
  });
  
  //点击删除单条记录
  //因为a是动态生成的，所以要通过事件委托的方式才能绑定事件
  $(document).on("tap",".fa-close",function(){
    // console.log(this);
    //获取点击的这条数据的索引值
    var index = $(this).data("index");
    // console.log(index);
    //从获取到的本地存储的数据arr中，删除对应索引的数据
    // console.log(arr);
    arr.splice(index,1);
    //存储删除数据之后的数组
    localStorage.setItem("ltHistoryData",JSON.stringify(arr));
    //刷新页面，就是将数据重新加载到页面上
    var html = template("lthsitory",{"items":arr});
    $(".lt_seach_history").html(html);
  });

  //删除所有记录
  $(".mui-icon-trash").on("tap",function(){
    //删除所有记录，可以直接将本地存储的数据设置为空
    localStorage.setItem("ltHistoryData","");
    //重新获取数据并渲染到页面上
    var arr = getHistoryData();
    var html = template("lthsitory",{"items":arr});
    $(".lt_seach_history").html(html);
  })
});


 //本地的存储数据
 var getHistoryData = function(){
  /*约定当前乐淘历史记录key:ltHistoryData */
  //  localStorage.setItem("ltHistoryData",JSON.stringify(['a','bbb']) );
  var data = localStorage.getItem("ltHistoryData");
  // console.log( data);
  //获取到的数据是字符串，需要转为数组
  var arr = JSON.parse(data || "[]");
  return arr;
}