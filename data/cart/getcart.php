<?php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid!=null){
	$sql="select *,(select product_img from cunan_product_img where pid=lid limit 1) as sm from z_shoppingcart inner join  cunan_products on product_id=lid where user_id=$uid order by iid desc";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}