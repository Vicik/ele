<?php
/*
接收客户端提交的tid和count，
执行UPDATE，修改详情条目的购买数量
 */
    header("Content-Type:application/json");
    @$did = $_REQUEST['did'] or die('{"code":2,"msg":"did required"}');
    @$count = $_REQUEST['count'] or die('{"code":2,"msg":"count required"}');
    require("init.php");
    $sql = "UPDATE cart_detail SET count = '$count' WHERE did='$did'";
    $result = mysqli_query($conn,$sql);
    $sql = "SELECT price,count FROM product,cart_detail WHERE did = $did AND pid=productId";
    $result = mysqli_query($conn,$sql);
    $list = mysqli_fetch_all($result,MYSQLI_ASSOC);
    if(count($list) == 0){
        $output = [
            "code" => 2,
            "list" => $list
        ];
    }else{
        $output = [
            "code" => 1,
            "list" => $list
        ];
    };
    echo json_encode($output);
?>