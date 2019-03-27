// 页面加载完成后加载导航和页脚
$(function() {
    $('#header').load('data/header.php',function(){
        //若用户已登录，修改header中的内容
        var uid = sessionStorage['uid'];
        if(uid){
            $("#userInfo").html(`
                <a href="" class="user">${uid}用户</a>
                <div class="personal">
                    <ul>
                        <li><a href="">个人中心</a></li>
                        <li><a href="">我的收藏</a></li>
                        <li><a href="">我的地址</a></li>
                        <li><a href="">安全设置</a></li>
                        <li><a href="">退出登录</a></li>
                    </ul>
                </div> 
            `);
        }
        $("#header").on("click","a:contains(退出登录)",function(){
            sessionStorage.removeItem('uid');
        })
    });
    $('#footer').load('./data/footer.php');
})