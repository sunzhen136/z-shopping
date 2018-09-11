<?php
require_once("../init.php");
    session_start();
    @$uid=$_SESSION["uid"];
    @$lid=$_REQUEST["lid"];
    @$count=$_REQUEST["count"];
    if($uid!==null&&$lid!==null&&$count!==null){
    $sql="select * from z_shoppingcart where user_id=$uid and product_id=$lid";
     $result=mysqli_query($conn,$sql);
     if(mysqli_fetch_row($result)==null){
       $sql="insert into z_shoppingcart values(null,$uid,$lid,$count,1)";
      }else{
    $sql="update z_shoppingcart set count=count+$count where user_id=$uid and product_id=$lid";
    }
     mysqli_query($conn,$sql);
     echo '{"code":1,"msg":"添加购物车成功"}';
     }else{
          echo '{"code":-1,"msg":"添加购物车失败"}';
     }