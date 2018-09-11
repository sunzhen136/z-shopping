$(function() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/header.css";
    document.head.appendChild(link);
    $("#header").load("header.html", function (html) {
        document.getElementById("header").innerHTML = html;
        //登录时把地址带走
        $("#d").click(function(){
            location.href="login.html?back="+location.href
        });
        //登陆成功首页欢迎
        $("#zx").hide();
        $.ajax({
            type:"get",
            url:"data/user/islogin.php",
            dataType:"json",
            success:function(data){
                if(data.ok==0)
                    $("#d").html("登陆");
                else{
                    var uname=data.uname;
                    $("#d").html("欢迎"+uname.slice(7));
                    $("#zc").hide();
                    $("#zx").show();
                }
            }
        });
        $("#zx").click(function(e){
            e.preventDefault();
            $.ajax({
                type:"get",
                url:"data/user/signout.php",
                success:function(){
                    location.reload(true);
                }
            })
        })
            $("input.input1").autocomplete({
                source:"data/hrader/search.php",
                focus:function(e, li){
                    //this->当前文本框
                    $(this).val(li.item.title.slice(0,20));
                    return false;
                },
                select:function(e, li){
                    $(this).val(li.item.title);
                    return false;
                }
            }).autocomplete("instance")
                ._renderItem=function($ul,item){
                var $li=$(`<li><span>${item.title.slice(0.20)}</li>`);
                $ul.append($li);
                return $li;
            };
        $("input.input2").click(function(e){
            e.preventDefault();
            $text=$("input.input1").val();
            location.href="products.html?kw="+$text;
        });
        })
    });
