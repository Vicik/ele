/*
 * 当文本框失去焦点时，进行当前文本框的验证
 * 当点击注册按钮时，对所有文本框进行验证，当所有验证通过时，提交ajax进行注册

 * 手机号验证包含：
 * 1.是否为空；2.格式是否正确；3.是否已被注册
 * ---------------------

 */
var uphone,upwd;

$(function(){
    $('#uphone').blur(phoneCheck);
    $('#upwd').blur(upwdCheck);
    $('#upwd2').blur(upwd2Check);
    $('#register').click(function(){
        var rephone = phoneCheck(),
            reupwd = upwdCheck(),
            reupwd2 = upwd2Check(),
            recheck = $("input[type='checkbox']").prop("checked");
        if(rephone&&reupwd&&reupwd2&&recheck){
            $.ajax({
                type:'POST',
                url:'data/register.php',
                data:{uphone:uphone,upwd:upwd},
                success:function(data){
                    if(data.code==1){
                        sessionStorage.uid=data.uid;
                        sessionStorage.uname=data.uname;
                        alert('恭喜您注册成功！即将为您返回到注册前的页面！')
                        history.go(-1);
                    }
                }
            });
        }

    })
})


//手机号验证
function phoneCheck(){
    uphone=$.trim($('#uphone').val());
    var $uphoneI=$('#uphone').siblings('i');
    var $uphonespan=$('#uphone').siblings('span');
    var regPhone=/^1[3578]\d{9}$/;
    if(!uphone){//为空
        $('#uphone').parent().addClass('has-error');
        $uphoneI.addClass('glyphicon-remove');
        $uphonespan.html('手机号不能为空');
        return false;
    }else if(!regPhone.test(uphone)){//格式不正确
        $('#uphone').parent().addClass('has-error');
        $uphoneI.addClass('glyphicon-remove');
        $uphonespan.html('请输入正确的手机号格式');
        return false;
    }else if(phoneExist()){//已被注册
        $('#uphone').parent().addClass('has-error');
        $uphoneI.addClass('glyphicon-remove');
        $uphonespan.html('该手机号已被注册');
        return false;
    }else{
        $('#uphone').parent().removeClass('has-error');
        $uphoneI.removeClass('glyphicon-remove');
        $('#uphone').parent().addClass('has-success');
        $uphoneI.addClass('glyphicon-ok');
        $uphonespan.html('该手机号可以使用');
        return true;
    }
}
//检查手机号是否已经被注册
function phoneExist(){
    var back;
    $.ajax({
        type: 'POST',
        url: 'data/phone_check.php',
        data: {uphone: uphone},
        async:false,
        success: function(d){
            if(d.code==1){
                back=true;
            }else{
                back=false;
            }
        },
        error: function(){
            console.log('异步请求错误');
        }
    })
    return back;
}
//验证密码
function upwdCheck(){
    upwd=$.trim($('#upwd').val());
    var $upwdI=$('#upwd').siblings('i');
    var $upwdspan=$('#upwd').siblings('span');
    if(!upwd){//为空
        $('#upwd').parent().addClass('has-error');
        $upwdI.addClass('glyphicon-remove');
        $upwdspan.html('密码不能为空');
        return false;
    }else if(upwd.length != 6){//格式不正确
        $('#upwd').parent().addClass('has-error');
        $upwdI.addClass('glyphicon-remove');
        $upwdspan.html('密码只能是6位数字');
        return false;
    }else{
        $('#upwd').parent().removeClass('has-error');
        $upwdI.removeClass('glyphicon-remove');
        $('#upwd').parent().addClass('has-success');
        $upwdI.addClass('glyphicon-ok');
        $upwdspan.html('');
        return true;
    }
}
//验证重复密码
function upwd2Check(){
    var upwd2=$.trim($('#upwd2').val());
    var $upwd2I=$('#upwd2').siblings('i');
    var $upwd2span=$('#upwd2').siblings('span');
    if(!upwd2){//为空
        $('#upwd2').parent().addClass('has-error');
        $upwd2I.addClass('glyphicon-remove');
        $upwd2span.html('密码不能为空');
        return false;
    }else if(upwd2.length != 6){//格式不正确
        $('#upwd2').parent().addClass('has-error');
        $upwd2I.addClass('glyphicon-remove');
        $upwd2span.html('密码只能是6位数字');
        return false;
    }else if(upwd2 != upwd){
        $('#upwd2').parent().addClass('has-error');
        $upwd2I.addClass('glyphicon-remove');
        $upwd2span.html('两次密码不一致');
        return false;
    }else{
        $('#upwd2').parent().removeClass('has-error');
        $upwd2I.removeClass('glyphicon-remove');
        $('#upwd2').parent().addClass('has-success');
        $upwd2I.addClass('glyphicon-ok');
        $upwd2span.html('');
        return true;
    }
}