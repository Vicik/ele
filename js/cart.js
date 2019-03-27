var tid = sessionStorage['cartId'],
    sid = sessionStorage['sid'],
    aName = sessionStorage['aName'],
    sName = sessionStorage['sName'],
    uid = sessionStorage['uid'];
    totalAmt = 0,
    uid = sessionStorage['uid'];
$(function(){
    if(uid){
        $(".header_right").html(`
            <a href="">${uid}用户</a>
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
    $(".header_right").on("click","a:contains(退出登录)",function(){
        sessionStorage.removeItem('uid');
        $(".header_right").html(`
            <a href="login.html" class="navbar-link">登录</a> |
            <a href="register.html" class="navbar-link">注册</a>
        `);
    })
    $('.header_left span+a').html(aName);
    $('.header_left i+a').html(sName);
    costCart('GET','data/cart_select.php',{sid:sid,uid:uid})
})
$('.list_header a').click(function(){
    history.go(-1);
})
// 点击+，增加产品数量
$('.list').on('click','button.add',function(e){
    e.preventDefault();
    var did = $(this).parent().parent().children('input:hidden').val();
    var count = parseInt($(this).prev().val()) + 1;
    $(this).prev().val(count);
    $.ajax({
        type: 'POST',
        url: 'data/cart_update.php',
        data: {did: did,count:count},
        success: function(msg){
            console.log(msg);
            if(msg.code !==1){
                return;
            }
            $(this).prev().val(msg.list.count);
            costCart('GET','data/cart_select.php',{sid:sid,uid:uid})
        }
    })
})
// 点击-，减少产品数量
$('.list').on('click','button.minus',function(e){
    e.preventDefault();
    var did = $(this).parent().parent().children('input:hidden').val();
    var count = parseInt($(this).next().val()) - 1;
    if(count - 1 <= 0){
        $(this).next().val(1);
        return;
    }
    $(this).next().val(count);
    $.ajax({
        type: 'POST',
        url: 'data/cart_update.php',
        data: {did: did,count:count},
        success: function(msg){
            if(msg.code !==1){
                return;
            }
            $(this).next().val(msg.list.count);
            costCart('GET','data/cart_select.php',{sid:sid,uid:uid})
        }
    })
})
function costCart(type,url,data){
    $.ajax({
        type:type,
        url: url,
        data: data,
        success: function(data){
            var lis = '';
            msg = data.list;
            $.each(msg,function(i,el){
                totalAmt += el.count * el.price;
                lis += `
                    <li>
                        <input type="hidden" name="" value="${el.did}">
                        <p class="lt">${el.pname}</p>
                        <div class="lt">
                            <button class='minus'>-</button>
                            <input value="${el.count}">
                            <button class='add'>+</button>
                        </div>
                        <span class="rt">￥${el.price * el.count}</span>
                    </li>
                `
            })
            $('.list').html(lis);
            var deliverFee = parseFloat(sessionStorage['deliverFee']).toFixed(2),
                box = (sessionStorage['boxFee'] * parseInt(msg.length)).toFixed(2);
            totalAmt += deliverFee * 1 + box * 1;
            $('.fee>.dis .rt').html('￥' + deliverFee);
            $('.box .rt').html('￥' + box);
            $('.total p').html(`<small>￥</small>${totalAmt.toFixed(2)}`);
            $('.total span').html(`共${msg.length}份商品`);
        },
        error: function(){
            console.log(arguments);
        }
    })
}