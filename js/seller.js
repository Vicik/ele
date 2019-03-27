//获取本地存储的数据
var cid = sessionStorage['cid'],
    aName = sessionStorage['aName'];
$('#address').html(aName);

//判断登录信息

$(function(){
    //异步加载商家信息
    selectSellers('GET','data/seller_select.php',{"cid":cid,"aName":aName});
})
//点击商家，保存商家id，事件委托
$('.seller').on('click','a',function(e){
    e.preventDefault();
    var sid = $(this).attr('href');
    sessionStorage['sid'] = sid;
    location.href = 'product.html';
})
function selectSellers(type,url,data){
    $.ajax({
        type:type,
        url:url,
        data: data,
        success:function(list){
            var uid = sessionStorage['uid'];
            var html="";
            if(uid){
                //遍历每个商家
                $.each(list,function(i,p){
                    html += `
                    <a href="${p.sid}">
                        <div class="plist_left">
                            <img src="${p.img}" alt="">
                            <span>${p.sTime}分钟</span>
                        </div>
                        <div class="plist_right">
                            <h5>${p.sName}</h5>
                            <i class="iconfont icon-wuxing"></i>
                            <p>配送费￥${p.deliverFee}</p>
                            <div>
                                <i class="iconfont icon-promisse"></i>
                                <i class="iconfont icon-service-jiayipeisan_wu"></i>
                            </div>
                        </div>
                    </a>
                `;
                })
            }else{
                html =`
                <p>查看更多商家，请先<a class='login' href="#">登录</a></p>
                `;
            }
            //添加商家到页面
            $(".seller").html(html);
            $('.seller').on('click','a.login',function(){
                location.href='login.html';
            })
        },
        error:function(){
            console.log(arguments);
        }
    })
}