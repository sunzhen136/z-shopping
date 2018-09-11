<?php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
@$checked=$_REQUEST["checked"];
if($iid!=null&&$checked!=null){
	$sql="update z_shoppingcart set is_checked=$checked where iid=$iid";
	mysqli_query($conn,$sql);
	echo '{"code":1,"msg":"修改成功"}';
}