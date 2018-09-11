<?php
require("../init.php");
@$pno=$_REQUEST["pno"];
@$pageSize=$_REQUEST["pageSize"];
if($pno!=null&&$pageSize!=null){
  $sql1="select count(lid) from cunan_products";
  $rs=mysqli_query($conn,$sql1);
  $row=mysqli_fetch_row($rs);
  $pageCount=ceil($row[0]/$pageSize);//总页数
  //查询当前页内容
  $offset=($pno-1)*$pageSize;
  $sql2="select *,(select product_img from cunan_product_img where pid=lid limit 1) as pic from cunan_products limit $offset,$pageSize";
  $rs=mysqli_query($conn,$sql2);
  $rows=mysqli_fetch_all($rs,MYSQLI_ASSOC);
  $output=["pno"=>$pno,"pageSize"=>$pageSize,"pageCount"=>$pageCount,"data"=>$rows];
  echo json_encode($output);
}
