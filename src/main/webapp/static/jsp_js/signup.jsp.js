;(function(){
    var CNC_HOSTNAME = "www.cncounter.com";
    toHttps(CNC_HOSTNAME);
})();

$(function(){
    //
    var $loginemail = $("#loginemail");
    var $loginpassword = $("#loginpassword");
    //var $repassword = $("#repassword");
    var $btn_signup = $("#btn_signup");
    //
    initBindEvents();
    //
    function initBindEvents(){
        //
        $btn_signup.bind("click", reg_click_handler);
        // 加载md5工具.js
        loadMd5Utils();
    };
    //
    function reg_click_handler(e){
        //
        var loginemail = $loginemail.val();
        var loginpassword = $loginpassword.val();
        //var repassword = $repassword.val();
        //
        if(!loginemail){
            layer.tips("请输入email地址", $loginemail);
            $loginemail.focus();
            return;
        } else if( !(/.+@.+/.test(loginemail))){
            // 判断符合email
            layer.tips("email格式错误", $loginemail);
            $loginemail.focus();
            return;
        }

        //
        if(!loginpassword){
            layer.tips("请输入登录密码", $loginpassword);
            $loginpassword.focus();
            return;
        }
        //if(!repassword){
        //    $repassword.focus();
        //    return;
        //}
        //if(loginpassword != repassword){
        //    $repassword.focus();
        //    return;
        //}
        // 对密码进行一次md5,避免传输明文
        loginpassword = md5(loginpassword);
        //
        var data = {
            loginemail : loginemail,
            loginpassword : loginpassword
        };
        //
        ajaxRequestSignup(data);
    }
    //
    function ajaxRequestSignup(data){
        //
        var localhost = "localhost";
        var https = "https://";
        //
        var host = location.host;
        var hostname = location.hostname;
        //
        var signupUri = "/openapi/signup.json";
        var url = "";
        //
        if(localhost === hostname){
            url = signupUri;
        } else {
            url = https + host + signupUri;
        }

        //
        postAjax(url, data, successCallback, null, true);
        //
        function successCallback(data){
            // 自动登录?
            var message = data.info || data.message;
            // 跳转
            if(data.status){
                // 成功
                CNC.delayMsg(message);
                CNC.redirect("login.php");
            } else {
                // 显示信息
                //CNC.msg(message);
                message = message || "注册失败!";

                layer.tips(message, $loginemail);
                $loginemail.focus();
                $loginemail.select();
            }

        };

    };
});