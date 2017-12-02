//获取地址栏url中的参数,是一个字符串 "?name=jack&age=20&gender=false";
var lt = {};

//将参数转为对象
lt.getParamenter = function(str){
  // console.log(str);
  var pa = {};
  //去除参数字符串前面的？
  str = str.substring(1);
  // console.log(str);//name=jack&age=20&gender=false
  //按&分隔
  var arr = str.split("&");//["name=jack","age=20","gender=false"]
  //遍历数组,按“=”分隔
  for(var i = 0; i < arr.length;i++){
    var item = arr[i].split("=");
    //将得到的数据存在对象里
    pa[item[0]] = item[1];//pa[name]=jack
    
  }
  return pa;
  // console.log(pa);

}