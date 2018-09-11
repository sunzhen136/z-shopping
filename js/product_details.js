$(function(){
    document.onselectstart=new Function("return false");
    $("div.type-1").hide();
    $("ul.type-h>li.zk").click(function(){
        if($(this).html()=="展开"){
            $("div.type-1").show();
            $(this).html("收起");
        }else{
            $("div.type-1").hide();
            $(this).html("展开");
        }
    })
    $(".focus-text>p.buy").on("click",":not(:first-child)",function(){
        $(this).addClass("active").siblings().removeClass("active");
    })
    /*鼠标滑动事件*/
    var $fixtop = $("div.detail-top");
    var high = $fixtop.offset().top;
    var hight=$("div.foot_all")
    $(window).scroll(function(){
        var	scrollTop=$(window).scrollTop();
        if(high+150<=scrollTop){
            $fixtop.css({
                width:innerWidth,
                position:"fixed",
                top:0,
                left:0,
            }).children("ul").addClass("ulfixtop")  .css("margin-left","25%").children("li:last-child").show()

            $("div.detail-right").css({
                position:"fixed",
                top:36,
                left:"50%",
                marginLeft:393,
            })
        }else{
            $fixtop.css({
                width:980,
                position : "",
            }).children("ul").removeClass("ulfixtop").css("margin-left","0%").children("li:last-child").hide();
            $("div.detail-right").css({
                position:"",
                top:0,
                left:"0",
                marginLeft:0,
            })
        }
    })
    //鼠标点击详情事件
    $("div.detail-top>ul").on("click","li>a",function(){
        $(this).parent().addClass("active").siblings().removeClass("active");
        $($(this).attr("href")).css("display","block").siblings().hide();
        if($(this).parent().hasClass("shopp")){
            $("div.content").show();
            $("p.p1").show();
            $("p.img").show();
            $("div.record").show();
            $("div.tab-user").show();
            $("div.title").show();
            $("div.head").show();
        }
        if($(this).parent().hasClass("zx")){
            $("div.head").show()
        }
    })
    /*倒计时*/
    function calc(){
        var b=new Date("2018/9/21 00:00:00");
        var now=new Date();
        var s=parseInt((b-now)/1000);
        var d=parseInt(s/(3600*24));
        d=d<10?"0"+d:d;
        var h=parseInt(s%(3600*24)/3600);
        h=h<10?"0"+h:h;
        var m=parseInt(s%3600/60);
        m=m<10?"0"+m:m;
        var s=s%60;
        s=s<10?"0"+s:s;

        $("#time").html(`距结束仅剩 ${d}天 <b>${h}</b> : <b>${m}</b> : <b>${s}</b>`);
    }
        calc();
    setInterval(calc,1000);
    $("ul.box>li").on("click","input",function(){
                $(this).parent().addClass("active").siblings().removeClass("active")
                $(this).prop("checked","true").parent().siblings().children("input").removeAttr("checked");
    })
    /*图片左右移动*/
    var moved=0,liwidth=69;
  $("a.backward").click(function(e){
      e.preventDefault();
      if(!$(this).hasClass("disabled")){
              moved++;
              $("ul.sm-images").css("left", (-liwidth * moved) + "px")
                  .children(":eq(" + moved + ")").addClass("active")
                .siblings().removeClass("active");
              $("a.forward").removeClass("disabled");
         if(moved==2){
              $(this).addClass("disabled");
         }
      }
  })
    $("a.forward").click(function(e){
        e.preventDefault();
        if(!$(this).hasClass("disabled")){
            moved--;
            $("ul.sm-images").css("left", (-liwidth * moved) + "px")
                .children(":eq(" + moved + ")").addClass("active")
                .siblings().removeClass("active");
            $("a.backward").removeClass("disabled");
        }
        if(moved==0) {
            $(this).addClass("disabled");
        }
    })
    /*小图换大图*/
    $("ul.sm-images").on("click","li",function(){
       var src=$(this).children().attr("data-target");
        $(this).addClass("active").siblings().removeClass("active");
        $("div.img>a>img").attr({src});

    })
    /*移入出图片*/
    $(".mask").mouseover(function(){
        $("div.big-img").show();
        $("#imgs").show();
    }).mouseout(function(){
        $("div.big-img").hide();
        $("#imgs").hide();
    })
    var MSIZE=150,SMSIZE=400;
    $(".mask").mousemove(function(e){
        var top=e.offsetY-MSIZE/2;
        var left=e.offsetX-MSIZE/2;
        if(left<0){
            left=0;						//阴影层不出框
        }else if(left>SMSIZE-MSIZE){
            left=SMSIZE-MSIZE;
        }
        if(top<0){
            top=0;						//阴影层不出框
        }else if(top>SMSIZE-MSIZE){
            top=SMSIZE-MSIZE;
        }
        var mask =document.getElementById("imgs");
        mask.style.top=top+"px";
        mask.style.left=left+"px";
        var igDiv =  document.getElementsByClassName("big-img")[0]
        igDiv.style.backgroundPosition=-1.6/1*left+"px -"+1.6/1*top+"px";//大图片随着小图片动
    })
    //选择合约非合约
    $("div.type-1").on("click","p",function(){
            var html=$(this).html();
        $("li.t").html(html);
    })
    //数量加减
    $("#z").click(function(){
        var i=$(this).siblings("input").val()
            i++;
        $(this).siblings("input").val(i);
    })
    $("#j").click(function(){
        var i=$(this).siblings("input").val()
        i--;
        if(i<=1){
            i=1;
        }
        $(this).siblings("input").val(i);
    })
/*加入购物车*/
    $(".buy-a").on("click","a",function(e){
        e.preventDefault();
        var $that = $(this)
        $.ajax({
            type:"get",
            url:"data/user/islogin.php",
            dataType:"json",
            success:function(res){
                if(res.ok==0){
                    if( confirm("请您先登录在进行购买！")){
                    location.href="login.html?back="+location.href;
                    }
                }else{
                    var lid=location.search.slice(5);
                    var count=$(".quant input").val();
                    $.ajax({
                        type:"get",
                        url:"data/cart/addcart.php",
                        data:{lid,count},
                        dataType:"json",
                        success:function(data){
                          //  console.log($that.attr("class"))
                            if($that.is(".add-cart")) {
                                alert(data.msg);
                                count = 1;
                                location.reload();
                            }else{
                                location.href="cart.html";
                            }
                        },error:function(){
                            alert("网络故障请检查！")
                        }
                    })
                }
            }
        })
    })
    var price=0;
    var count=0;
    $(".check").on("click","li",function(){
        if($(this).children("input").is(":checked")) {
            var pic = $(this).children("span").html().slice(1);
            price += parseInt(pic);
            count += 1
            $(".buy-msg>p:nth-child(1)").html(`已选择 <span>${count}</span> 个配件<br>
                       合计 <span class="buy">￥${price.toFixed(2)}</span>`)
        }else{
            var pic = $(this).children("span").html().slice(1);
            price -= parseInt(pic);
            count -= 1
            $(".buy-msg>p:nth-child(1)").html(`已选择 <span>${count}</span> 个配件<br>
                       合计 <span class="buy">￥${price.toFixed(2)}</span>`)
        }

    })
$(".buy-msg>p:nth-child(2)").click(function(){
    location.href="cart.html";
})
})
