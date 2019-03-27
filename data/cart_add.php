<?php
/*根据客户提交的产品id和用户id，添加购物车详情表，若已有该商品，则购买数量+1
 */
    @$tid = $_REQUEST['tid'] or die('{"code":2,"msg":"tid required"}');
    @$pid = $_REQUEST['pid'] or die('{"code":2,"msg":"pid required"}');
    require("init.php");
    //根据购物车编号和产品编号查询是否已买过该商品
    $sql = "SELECT * FROM cart_detail WHERE cartId = '$tid' AND productId = '$pid'";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    if($row !== null){
        //已购买过则购买数量+1
        $did = $row['did'];//产品编号
        $count = intval($row['count']);
        $count ++;
        $sql = "UPDATE cart_detail SET count = '$count' WHERE did = '$did'";
        $result = mysqli_query($conn,$sql);
    }else{
        //未购买过则添加购买记录，数量为1
        $sql = "INSERT INTO cart_detail VALUES(NULL,'$tid','$pid','1')";
        mysqli_query($conn,$sql);
        $count = 1;
    }
?>