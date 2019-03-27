
$(function(){
    /*实现登录功能：
    * 实现表单验证，判断用户输入是否为空，为空时显示提示信息，并且无法提交ajax
    * 写php功能接口页面：拿到用户填写的用户名和密码，去数据库中验证是否存在，如果存在，返回code:1,uid,uname,phone;如果不存在，返回状态码code:400
    * 登录失败后，提示“用户名或密码错误”
    * 登录成功后，页面跳转到登录前页面
    * 导航条上显示个人中心及下拉菜单
    */

    var uphone,upwd;
    //失去焦点时
    $('#uphone').blur(uphoneCheck);
    $('#upwd').blur(upwdCheck);

    //点击登录按钮时
    $('#login').click(function(){
        if(uphoneCheck()&&upwdCheck()){//当验证通过时，发送ajax，进行登录
            $.ajax({
                type:'POST',
                url:'data/login.php',
                data:{uphone:uphone,upwd:upwd},
                success:function(info){
                    if(info.code==1){//登录成功
                        sessionStorage['uid']= info.uid;
                        sessionStorage['uphone']= info.uphone;
                        // location.href = 'seller.html';
                        history.go(-1);
                    }else{
                        $('#login').parents().find('#info').text('用户名或密码错误');
                    }
                }
            })
        }
    })

    //用户名验证
    function uphoneCheck(){
        uphone= $.trim($('#uphone').val());
        var $uphoneI=$('#uphone').siblings('i');
        var $uphonespan=$('#uphone').siblings('span');
        if(!uphone){//为空
            $('#uphone').parent().addClass('has-error');
            $uphoneI.addClass('glyphicon-remove');
            $uphonespan.text('手机号不能为空');
            return false;
        }else{//不为空
            $('#uphone').parent().removeClass('has-error');
            $('#uphone').parent().addClass('has-success');
            $uphoneI.removeClass('glyphicon-remove');
            $uphoneI.addClass('glyphicon-ok');
            $uphonespan.text('');
            return true;
        }
    }

    //密码验证
    function upwdCheck(){
        upwd= $.trim($('#upwd').val());
        var $upwdI=$('#upwd').siblings('i');
        var $upwdspan=$('#upwd').siblings('span');
        if(!upwd){//为空
            $('#upwd').parent().addClass('has-error');
            $upwdI.addClass('glyphicon-remove');
            $upwdspan.text('密码不能为空');
            return false;
        }else{//不为空
            $('#upwd').parent().removeClass('has-error');
            $('#upwd').parent().addClass('has-success');
            $upwdI.removeClass('glyphicon-remove');
            $upwdI.addClass('glyphicon-ok');
            $upwdspan.text('');
            return true;
        }
    }
});