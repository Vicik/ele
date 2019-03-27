<?php
/*
    根据客户端传来的商家id，动态更新商家和产品信息，添加购物车
*/
header("Content-Type:application/json;charset=UTF-8");
//根据商家id查找商家的信息，更新商家的名称、图片、起送价、配送时间、配送费
@$sid = $_REQUEST['sid'] or die('{"code":2,"msg":"sid required"}');
require('init.php');
$sql = "SELECT * FROM seller WHERE sid = $sid";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_assoc($result);
echo json_encode($list);
?>