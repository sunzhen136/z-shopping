document.onselectstart=new Function("return false");
$(function(){
    $("#getyzm").click(function(){
        $("#setYzm").attr("src","data/user/03_code_gg.php");
    });
    /*function verify($input,name,msg,reg){
        var $span1 = $input.parent().find("span."+name);
        $span1.html(msg);
        var val = $input.val();
        if(val!=null&&val.trim()!=""&&reg.test(val)){
            $span1.html("<i></i>");
            $span1.children().css({ background:"url(images/successicon.png)",backgroundSize:"20px 20px"});
            return true;
        }else {
            return false;
        }
    }*/
   /* $("div.text-left").on("focus","input[name]",function () {
              if($(this).attr("name")=="upwd"){
            var reg = /^[a-zA-Z0-9]{6,12}$/;
            verify($(this),"upwd","请输入6-12位字母数字组合密码",reg);
        }
    });
    $("div.text-left").on("blur","input[name]",function () {
            if($(this).attr("name")=="upwd"){
            var reg = /^[a-zA-Z0-9]{6,12}$/;
            verify($(this), "upwd", "<i></i>密码格式不正确",reg);
        }
    });*/
        $("[name=upwd]").focus(function(){
            $(this).next().html("请输入6-16位字母数字组合密码");
        }).blur(function(){
            var reg = /^[a-zA-Z0-9]{6,12}$/;
            if(reg.test($(this).val())){
                $(this).next().html("<i></i>")
                    .children().css({ background:"url(images/successicon.png)",backgroundSize:"20px 20px"});
            }else {
                $(this).next().html("<i></i>密码格式不正确");
            }
        });
    /*验证密码是否一致*/
    $("[name=cpwd]").blur(function(){
        if($(this).val()!=""&&$(this).val()==$("[name=upwd]").val()){
            $(this).next().html("<i></i>")
            .children().css({ background:"url(images/successicon.png)",backgroundSize:"20px 20px"});
        }else{
            $(this).next().html(`<i></i>两次密码不一致`);
        }
    }).focus(function(){
            $(this).next().html("请再次输入密码");
    });
    /*手机号得到失去焦点*/

    $("[name=phone]").focus(function(){
        var reg = /^(\+86|0086)?\s*1[3-8]\d{9}$/;
       $(this).next().html("请输入11为手机号码");
    }).blur(function(){
        var uname=$(this).val();
        var reg = /^(\+86|0086)?\s*1[3-8]\d{9}$/;
        if(!reg.test(uname)){
            $(this).next().html("<i></i>手机号格式不正确");
           return;
        }
        $.ajax({
            typt:"get",
            url:"data/user/02-register.php",
            data:{uname},
            success:function(data){
                if(data.code<0){
                    $(".phone").html("<i></i>"+data.msg);
                    $("#btn").prop("disabled",true);
                }else{
                    $(".phone").html("<i></i>")
                        .children().css({ background:"url(images/successicon.png)",backgroundSize:"20px 20px"});
                        // $("#btn")[0].removeAttribute("disabled");
                        $("#btn").prop("disabled",false);
                }
            }
        })
    });
    /*提交按钮*/

   $("#btn").click(function(e){
       e.preventDefault();
       var yzm=$("#yzm").val();
       var uname=$("[name=phone]").val();
       var upwd=$("[name=upwd]").val();
       var cpwd=$("[name=cpwd]").val();
       var reg = /^(\+86|0086)?\s*1[3-8]\d{9}$/;
       var p= /^[a-zA-Z0-9]{6,12}$/;
       if(!reg.test(uname)){
           $("[name=phone]").focus();
           return;
       }
       if(!p.test(upwd)) {
           $("[name=upwd]").focus();
           return;
       }
       if(cpwd!=upwd){
           $("[name=cpwd]").focus();
           return;
       }

       if($("#check").is(":checked")){
           $("#btn").val("正在注冊");
           $.ajax({
               type: "post",
               url: "data/user/register.php",
               data: {uname:uname, upwd:upwd, cpwd:cpwd, yzm:yzm},
               dataType:"json",
               success: function (data) {
                   if(data.code>0){
                       alert(data.msg);
                       location.href="login.html";
                   }else{
                       alert(data.msg);
                       $("#btn").val("注冊");
                       $("#setYzm").attr("src","data/user/03_code_gg.php");
                   }
               },error:function(){
                   alert("网络故障请检查！！！");
                   $("#btn").val("注冊");
               }
           })
       }else{
           alert("请同意用户协议");
           $("#btn").val("注冊");
           $("#setYzm").attr("src","data/user/03_code_gg.php");
       }
   });
    /*键盘事件*/
    $(document).keyup(function(evebt){
        if(event.keyCode==13){
            $("#btn").trigger("click");
        }
    })
});
























