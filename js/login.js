document.onselectstart=new Function("return false");
$(function() {
    $("div.f1>p").on("click", "span", function () {
        $p = $(this);
        $p.addClass("red").siblings().removeClass("red");
        var index = parseInt($p.attr("data-user"));
        if(parseInt($("div.user").attr("data-user"))==index){
            $("div.user").show();
            $("div.users").hide();
        }else{
            $("div.users").show();
            $("div.user").hide();
        }
    });
    $("#onsubmit").click(function(){
       var uname=$("[name=uname]").val();
       var upwd=$("[name=upwd]").val();
       $("#onsubmit").val("正在登陆");
        $.ajax({
           type:"post",
           url:"data/user/signin.php",
           data:{uname,upwd},
           success:function(data){
               if(data==false){
                   alert("用户名或者密码输入错误");
                   $("#onsubmit").val("登陆");
               }else{
                   alert("登录成功！");
                   var back=location.search.slice(6);
                   location.href=back;
                   $("#onsubmit").val("登陆");
                 if(location.href.indexOf("?")==-1){
                     location.href="index.html";
                 }
               }
           }
       })
    })
    /*键盘事件*/
    $(document).keyup(function(evebt){
        if(event.keyCode==13){
            $("#onsubmit").trigger("click");
        }
    })
});