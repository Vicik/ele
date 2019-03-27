//获取本地存储的数据
var sid = sessionStorage['sid'],
    uid = sessionStorage['uid'],
    deliverFee = 0,
    boxFee = 0,
    cartId = 0;
$(function(){
    // 页面加载完成后加载商家信息
    selectSellers('GET','data/product_seller_select.php',{sid:sid});
    //更新购物车
    updateCart('GET','data/cart_select.php',{uid:uid,sid:sid});
    //更新产品
    product('GET','data/product_select.php',{sid:sid});
})

/*
添加到购物车，根据购物车编号和产品编号在购物车详情表中查找是否有该产品
*/
$('#popular').on('click','a',function(e) {
    e.preventDefault();
    var pid = $(this).attr('href');
    $(this).prev('b').css('display','block');
    setTimeout(()=>{
        $(this).prev('b').css('display','none');
    },500);
    cartId = sessionStorage['cartId'];
    $.ajax({
        type: 'POST',
        url: 'data/cart_add.php',
        data: {tid: cartId,pid: pid},
        success:function(msg){
            console.log(msg)
            updateCart('GET','data/cart_select.php',{uid:uid,sid:sid});
        },
        error:function(){
            console.log(arguments);
        }
    });
})
// 点击+，增加产品数量
$('.shop_cart ul').on('click','button.add',function(e){
    e.preventDefault();
    var did = $(this).parent().parent().children('input:hidden').val();
    var count = parseInt($(this).prev().val()) + 1;
    $(this).prev().val(count);
    $.ajax({
        type: 'POST',
        url: 'data/cart_update.php',
        data: {did: did,count:count},
        success: function(msg){
            if(msg.code !==1){
                return;
            }
            $(this).prev().val(msg.list.count);
            updateCart('GET','data/cart_select.php',{uid:uid,sid:sid});
        }
    })
})
// 点击-，减少产品数量
$('.shop_cart ul').on('click','button.minus',function(e){
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
            updateCart('GET','data/cart_select.php',{uid:uid,sid:sid});
        }
    })
})
//去结算
$('.closing_cost').click(function(e){
    e.preventDefault();
    location.href = 'cart.html';
});
//更新购物车
function updateCart(type,url,data){
    $.ajax({
        type: type,
        url: url,
        data:data,
        success:function(msg){
            var lis = '',
                cart = 0,
                total = 0;
            switch(msg.code){
                case 1:
                    $.each(msg.list,function(i,el){
                        total += el.count * el.price;
                        cart = el.cartId;
                        lis += `
                            <li>
                                <input type="hidden" name="" value="${el.did}">
                                <p class="lt">${el.pname}</p>
                                <div class="lt">
                                    <button type="button" class="minus">-</button>
                                    <input value="${el.count}">
                                    <button type="button" class="add">+</button>
                                </div>
                                <span class="lt">￥${el.price * el.count}</span>
                            </li>
                        `
                    })
                    $('.shop_cart ul').html(lis);
                    $('.total sup').html(msg.list.length);
                    $('.total span b').html(deliverFee);
                    total += parseInt(deliverFee);
                    $('.total small big').html(total);
                    break;
                case 2:
                    cart = msg.list;
                    $('.total sup').html(0);
                    $('.total span b').html(deliverFee);
                    $('.total small big').html(0);
                    break;
            }
            sessionStorage['cartId'] = cart;
        },
        error: function(){
            console.log('异步请求错误');
        }
    })
}
//查找商家名称、起送价、配送费等信息
function selectSellers(type,url,data){
    $.ajax({
        type:type,
        url:url,
        data: data,
        success:function(list){
            deliverFee = list.deliverFee;
            boxFee = list.boxFee;
            sessionStorage['deliverFee'] = deliverFee;
            sessionStorage['boxFee'] = boxFee;
            sessionStorage['sName'] = list.sName;    
            $('.fee span').html(`配送费¥${deliverFee}`);
            $('.total span b').html(deliverFee);
            var html="";
            html += `
                <div class="info_left lt">
                    <img src="${list.img}" class="lt" alt="">
                    <div class="lt">
                        <h3>${list.sName}</h3>
                        <i class="iconfont icon-wuxing"></i><span>(${list.eval})</span>
                    </div>
                </div>
                <div class="info_right">
                    <dl>
                        <dt>起送价</dt>
                        <dd>${list.startSend}元</dd>
                    </dl>
                    <dl>
                        <dt>配送费</dt>
                        <dd>${deliverFee}元</dd>
                    </dl>
                    <dl>
                        <dt>平均送达速度</dt>
                        <dd>${list.sTime}分钟</dd>
                    </dl>
                    <a href="${list.sid}" class='storeUp'>
                        <i class="iconfont icon-aixin"></i>
                        <p>收藏</p>
                    </a>
                </div>
            `;
            $(".info").html(html);
        },
        error: function(){
            console.log('异步请求错误');
        }
    })
}
function product(type,url,data){
    $.ajax({
        type:type,
        url:url,
        data: data,
        success:function(lists){
            // console.log(lists)
            var html="";
            if(lists.length>0){
                html+= `
                    <h4>热销<small>大家喜欢吃，才叫真好吃。</small></h4>
                    <div class="main_shop_list">
                `
                $.each(lists,function(i,el){
                    html += `
                        <div class="product">
                            <img src="${el.pimg}" alt="">
                            <div>
                                <h5>${el.pname}</h5>
                                <span><i class="iconfont icon-wuxing"></i>(${el.evalCount}) 月售${el.pcount}份</span>
                                <p>
                                    <span>￥${el.price}</span>
                                    <b>添加成功</b>
                                    <a href="${el.pid}">加入购物车</a>
                                </p>
                            </div>
                        </div>
                    `;
                })
                html +='</div>'
            }else{
                html=`<p>该商家暂时未添加商品</p>`;
            }
            $("#popular").html(html);
        },
        error: function(){
            console.log('异步请求错误');
        }
    })
}
