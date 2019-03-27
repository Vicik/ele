<?php
/*接收客户端传来的手机号，检查客户是否有注册*/
header("Content-Type:application/json;");
$output;
@$phone = $_REQUEST['uphone'] or die('{"code":3,"msg":"phone required"}');
require('init.php');
$sql = "SELECT uid FROM users WHERE uphone = $phone";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
if($row){
  $output['code'] = 1;
  $output['msg'] = 'exist';
}else {
  $output['code'] = 2;
  $output['msg'] = 'non-exist';
}
echo json_encode($output);