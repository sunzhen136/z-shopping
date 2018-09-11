<?php
 @$yzm=$_REQUEST["yzm"];
  //获取PHP程序生成的验证码
   session_start();
  @$code=$_SESSION['code'];
  //比较内容是否相同
  if($code!=$yzm){
       die('{"code":-1,"msg":"验证码输入有误"}');
   }
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
@$cpwd=$_REQUEST["cpwd"];
$reg='/^(\+86|0086)?\s*1[3-8]\d{9}$/';
$rs=preg_match($reg,$uname);
if($rs==0){
die('{"code":-1,"msg":"手机号码格式不正确"}');
}
$regupwd='/^[a-zA-Z0-9_]{6,12}$/';
$rs=preg_match($regupwd,$upwd);
if($rs==0){
die('{"code":-1,"msg":"密码太简单,请重新输入"}');
}
if($upwd!=$cpwd){
die('{"code":-1,"msg":"俩次密码不一致,请重新输入"}');
}
require_once("../init.php");
$sql="insert into z_user values(null,'$uname','$upwd',null,null,null,null,null)";

$result=mysqli_query($conn,$sql);
if(mysqli_error($conn)){
echo mysqli_error($conn);
}
$count=mysqli_affected_rows($conn);
if($count>0){
echo '{"code":1,"msg":"用户注册成功"}';
}else{
echo '{"code":-1,"msg":"用户注册失败"}';
}
?>