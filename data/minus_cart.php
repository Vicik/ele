<?php
/*根据客户端传来的购物车id和产品id,删除产品*/
 header("Content-Type: application/json");
@$cartId = $_REQUEST['cartId'] or die('{"code":2,"msg":"cartId required"}');
@$pid = $_REQUEST['pid'] or die('{"code":2,"msg":"pid required"}');
require("init.php");
$sql = "DELETE FROM cart_detail "