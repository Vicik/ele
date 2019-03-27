<?php
    header('Content-type:html');
?>
<nav>
    <ul>
        <li>
            <a href="index.html"><img src="img/my_service.png"></a>
        </li>
        <li><a href="index.html">首页</a></li>
        <li><a href="cart.html">我的订单</a></li>
        <li><a href="open.html">加盟合作</a></li>
        <li><a href="my_service.html">我的客服</a></li>
        <li class="rt" id="userInfo">
            <!-- 未登录 -->
            <a href="register.html">注册</a>
            <span>|</span>
            <a href="login.html">登录</a>
        </li>
        <li class="rt">
            <a href="#">
                <i class="iconfont icon-shouji"></i>手机应用
            </a>
            <div class="shopping">
                <h3>扫一扫，手机下单更方便</h3>
                <img src="img/code.png" alt="">
            </div>
        </li>
        <li class="rt">
            <a href="#">规则中心</a>
        </li>
    </ul>
</nav>