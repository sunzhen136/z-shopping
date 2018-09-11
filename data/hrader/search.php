<?php
require_once("../init.php");
@$kw=$_REQUEST["term"];
if($kw!==null){
	$kws=explode(" ",$kw);  //php中分割
	for($i=0;$i<count($kws);$i++){
		$kws[$i]="title like '%".$kws[$i]."%'";
		$where=" where ".implode("and ",$kws);//php中的拼接
	}
	$sql="select title from cunan_products $where limit 10";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}