<?php
@$uname=$_REQUEST["uname"];
require_once("../init.php");
$sql="select * from z_user where uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
  if($row==null){
	  echo '{"code":1,"msg":"用户名可以使用"}';
  }else{
	 echo '{"code":-1,"msg":"用户名已经被占用"}';
  }











?>