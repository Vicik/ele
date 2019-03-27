<?php
/*
    用户登录验证
    成功：{"code":1,"uid":"","uname":"","phone":""}
    失败：{"code":400}
*/
header("Content-Type:application/json;charset=UTF-8");
//获取用户输入的uname,upwd
@$uphone=$_REQUEST['uphone'] or die('{"code":2,"msg":"uphone required"}');
@$upwd=$_REQUEST['upwd'] or die('{"code":2,"msg":"upwd required"}');
require('init.php');

//查询数据
$sql="SELECT * FROM users WHERE uphone='$uphone' AND upwd='$upwd'";
$result=mysqli_query($conn,$sql);
$assoc=mysqli_fetch_assoc($result);
$output = null;
if($assoc){//登录成功
    $output['code']=1;
    $output['uid']=intval($assoc['uid']);
    $output['uphone']=$assoc['uphone'];
}else{//登录失败
    $output['code']=400;
}

echo json_encode($output);

