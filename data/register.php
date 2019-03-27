<?php

/*接收客户端传来的uphone和upwd，插入用户表，返回json数据类型*/
header("Content-Type:application/json;");
@$uphone = $_REQUEST['uphone'] or die('{"code":2,"msg":"uphone required"}');
@$upwd = $_REQUEST['upwd'] or die('{"code":2,"msg":"upwd required"}');
require('init.php');
$sql = "INSERT INTO users VALUES(NULL,$uphone,$upwd)";
$result = mysqli_query($conn,$sql);
if($result){
    $output['code'] = 1;
    $output['uid'] = intval(mysqli_insert_id($conn));
}else {
   $output['code'] = 500;
}
echo json_encode($output);