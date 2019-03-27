<?php
/*根据用户提交的城市id和地区id，查询出该地区的商家
    返回的信息格式是json，格式如[{},{},...{}]
*/
header("Content-Type:application/json;charset=UTF-8");
//接收客户端传来的城市id和地区名称
@$cid = $_REQUEST['cid'] or die('{"code":2,"msg":"cid required"}');
@$temName = $_REQUEST['aName'] or die('{"code":2,"msg":"aName required"}');
require('init.php');
//根据客户端传来的城市id和地区名字查找商家id
$sql = "SELECT aid FROM area WHERE cityId = $cid AND aName = '$temName'";
$result = mysqli_query($conn,$sql);
if($result===false){
    echo "查询出错";
}else{
    $aid = mysqli_fetch_row($result)[0];
}
//根据客户端传来的城市id和地区id，获取商家名单
$sql = "SELECT * FROM seller WHERE cityId = $cid AND areaId = $aid";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);
?>