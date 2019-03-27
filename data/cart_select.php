<?php
    /*
    根据客户端传来的用户uid和商家sid，查找购物车详情数据
    */
    header("Content-Type: application/json");
    @$uid = $_REQUEST['uid'] or die('{"code":3,"msg":"uid required"}');
    @$sid = $_REQUEST['sid'] or die('{"code":3,"msg":"sid required"}');
    require('init.php');
    /*
    根据用户uid查找购物车，
    如果能够查找到，就获取购物车id，
    如果没有找到就增加购物车并获取编号保存到页面
    */
    $output = [];
    $sql = "SELECT tid FROM cart WHERE userId = $uid";
    $result = mysqli_query($conn,$sql);
    if($result === false){
        echo "查询错误";
    }else{
        $row = mysqli_fetch_row($result);
        if($row !== null){//数据库中有当前购物车编号
            $tid = $row[0];
        }else{//数据库中没有当前购物车编号
          //若没有购物车编号则创建一个购物车，得到购物车编号
            $sql = "INSERT INTO cart VALUES(NULL,'$uid')";
            mysqli_query($conn,$sql);
            $tid = mysqli_insert_id($conn);
        }
        /*根据购物车id,从购物车详情表和产品信息表中获取产品名称、
        产品pid、单价、数量、购物车编号，更新到页面购物车*/
        $sql = "SELECT pid,pname,price,cartId,did,count FROM product,cart_detail WHERE sellerId = $sid AND cartId=$tid AND pid=productId";
        $result = mysqli_query($conn,$sql);
        $list = mysqli_fetch_all($result,MYSQLI_ASSOC);
        if(count($list) == 0){
            $output = [
                "code" => 2,
                "list" => $tid
            ];
        }else{
            $output = [
                "code" => 1,
                "list" => $list
            ];
        };
        echo json_encode($output);
    }