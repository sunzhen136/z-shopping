<?php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
@$count=$_REQUEST["count"];
if($iid!=null&&$count!=null){
	if($count>0){
		$sql="update z_shoppingcart set count=$count where iid=$iid";
	}else{
		$sql="delete from z_shoppingcart where iid=$iid";
	}
	mysqli_query($conn,$sql);
	echo '{"code":1,"msg":"修改成功"}';
}