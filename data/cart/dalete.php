<?php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
if($iid!=null){
	$sql="delete from z_shoppingcart where iid=$iid";
	mysqli_query($conn,$sql);
	echo '{"code":1,"msg":"删除成功"}';
}