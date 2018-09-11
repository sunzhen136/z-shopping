document.onselectstart=new Function("return false");
$(function(){
    $("ul.nav-a").on("mouseenter","li",function(){
        $(this).addClass("active")
                .siblings().removeClass("active");
        var num=$(this).attr("data-num");
            var $ul = $("ul.nav-b");
        if(num=="0"){
                $ul.children("li").show();
                $ul.children("li[data-num=1]").hide();
            }else{
                var data="[data-num="+num+"]";
                var $nums = $ul.children("li[data-num="+num+"]");
                $nums.show().siblings(":not("+data+")").hide();
            }
    });
     $("div.top-text").children(":not(ul.nav-b)").hide();
     $("[data-num=y]").hide().nextAll().hide();
        $("dl.dl5").hide();
    $("div.nav-top>a.gd").click(function(e){
        e.preventDefault();
        if($(this).html()=="更多<i></i>"){
            $("[data-num=y]").show().nextAll().show();
            var $ul = $("ul.nav-b");
            $ul.children("li").show();
            $ul.children("li[data-num=1]").hide();
            $("div.top-text").children(":not(ul.nav-b)").show();
            $("dl.dl1 dt").css("height", "292px");
            $(this).html("收起<i></i>");
            $(this).children().css("backgroundPosition", "124px 110px");
            $("ul.nav-b").css("height","215px");
        }else{
           $("ul.nav-b").show();
            $("[data-num=y]").hide().nextAll().hide();
            $("div.top-text").children(":not(ul.nav-b)").hide();
            $("dl.dl1 dt").css("height", "125px");
            $("ul.nav-b").css("height","107px");
            $(this).html("更多<i></i>");
        }
    });
    $("dl.dl3 a.gd").click(function(e){
        e.preventDefault();
        if($(this).html()=="更多<i></i>") {
            $("dl.dl3 dt>p").css("height", "55px");
            $("div.f3-text ul").css("overflow", "visible");
            $(this).html("收起<i></i>");
            $(this).children().css("backgroundPosition", "124px 110px");
        }else{
            $("dl.dl3 dt>p").css("height", "20px");
            $("div.f3-text ul").css("overflow", "hidden");
            $(this).html("更多<i></i>");
        }
    });
    $("div.nav-click>span").click(function(){
            if($(this).html()=="更多选项<i></i>") {
                $("dl.dl5").show()
                            .prev().show();
                $(this).html("收起<i></i>");
                $(this).children().css("backgroundPosition", "124px 110px");
            }else{
                $("dl.dl5").hide()
                            .prev().hide();
                $(this).html("更多选项<i></i>");
            }
    });
    /*列表*/
    function load(pno,pageSize) {
        $.ajax({
            type: "get",
            url: "data/products/product.php",
            data: {pno, pageSize},
            dataType: "json",
            success: function (data) {
                var rows = data.data;
                var html = "";
                for (var {sales, network, name, evaluate, title, price,pic,lid} of rows) {
                    html += `<li class="f2-text">
                <div class="f2-text1">
                <p><a href="product_details.html?lid=${lid}"><img src="${pic}" ></a></p>
                <p><b>+</b>关注</p>
                </div>
                <div class="f2-text2">
                <p><a href="#"><span>【店铺促销】</span><span>【团购】</span>${title}</a></p>
            <p>${price}</p>
            <p>销量数 ${evaluate}<span>评价数<a href="#">${sales}</a></span></p>
                <p><a href="#">${name}</a></p>
                <p>店铺总成交${network}笔</p>
                </div>
                </li>`
                }
                $("ul.f2-bottom").html(html);
                //页码条
                var html="";
                 pno=parseInt(data.pno);
                 pageCount=parseInt(data.pageCount);
                //上一页
                html+=`<li class="prev" ><a href="#">＜上一页</a></li>`;
                //上上页
                if(pno-2>0){
                    html += `<li><a href="#">${pno-2}</a></li>`;
                }
                //上一页
                if(pno-1>0) {
                    html += `<li><a href="#">${pno-1}</a></li>`;
                }
                //当前页
                html+=`<li class="active"><a href="#">${pno}</a></li>`;
                //下一页
                if(pno+1<=pageCount){
                    html+=`<li><a href="#">${pno+1}</a></li>`;
                }
                //下下一页
                if(pno+2<=pageCount) {
                    html += `<li><a href="#">${pno + 2}</a></li>`;
                }
                if(pno<pageCount-3) {
                    html += `<li class="three">...</li>`;
                }
                if(pno<pageCount-2){
                    html+=`<li><a href="#">${pageCount}</a></li>`;
                }
                html+=`<li class="next"><a href="#">下一页＞</a></li>`;
                $("div.page>ul").html(html);
                //      html += `<li>...</li>`;
                //     //总页数
                //     html += `<li><a href="#">${pageCount}</a></li>`;
                //     //下一页
                //     html += `<li>下一页＞</li>`;
                // var html=`<li class="prev"><a href="javascript:;" >＜上一页</a></li>`;
                // for(var i=1;i<4;i++){
                //     if(i!=pno){
                //         html+=`<li><a href="javascript:;">${i}</a></li>`;
                //     }else{
                //         html+=`<li class="active"><a href="javascript:;">${i}</a></li>`;
                //     }
                // }
                // html+=`<li>...</li>`;
                // if(pno==pageCount) {
                //     html += `<li class="active"><a href="javascript:;">${pageCount}</a></li>`;
                // }else{
                //     html += `<li><a href="javascript:;">${pageCount}</a></li>`;
                // }
                // html+=`<li class="next"><a href="javascript:;">下一页＞</a></li>`;
                // $("div.page>ul").html(html);
                if(pno==1){
                    $("div.page>ul").children(":first-child").addClass("prev disabled");
                }
                if(pno==pageCount){
                    $("div.page>ul").children(":last-child").addClass(" next disabled");
                }
                var html="";
                html+=`${pno}/${pageCount}<i class="prev1"></i><i class="next1"></i>`;
                $("#page").html(html);
            }
        })
    }
    load(1,20);
    //分页点击事件
    //console.log( $("div.page>ul"));
    $("div.page>ul").on("click","li",function(e) {
        e.preventDefault();
        //console.log($(this).text());
        if (!$(this).hasClass("disabled")) {
            var pno;
            if ($(this).index() == 0) {
                $(".active").prev().addClass("active").siblings().removeClass("active");
                pno = $(".active").children().text();
            } else if ($(this).index() == $(this).parent().find("li").length - 1) {
                $(".active").next().addClass("active").siblings().removeClass("active");
                pno = $(".active").children().text();
            } else {
                pno = $(this).children().text();
            }
            load(pno, 20);
        }
    });
       // var pno=parseInt($(this).children().html());
       //  load(pno,5)});

    // /*上一页*/
    // $("div.page>ul").on("click","li.prev",function(e) {
    //     e.preventDefault();
    //     var pno = $("div.page>ul>li").prev(".active").children().html();
    //     if (pno!=1) {
    //         var i = parseInt(pno);
    //         load(i-1,5);
    //     }else{
    //         $(this).addClass("disabled");
    //     }
    // });
    // /*下一页*/
    // $("div.page>ul").on("click","li.next",function(e) {
    //     e.preventDefault();
    //     var pno = $("div.page>ul>li").prev(".active").children().html();
    //     if (pno!=pageCount) {
    //        load(parseInt(pno)+1,5);
    //         console.log(pno);
    //     }
    // })
    $("#page").on("click","i.prev1",function(){
        var pno = $("div.page>ul>li").prev(".active").children().html();
        if (pno!=1) {
            var i = parseInt(pno);
            load(i-1,20);
        }
    })
    $("#page").on("click","i.next1",function(){
        var pno = $("div.page>ul>li").prev(".active").children().html();
        if (pno!=pageCount) {
            load(parseInt(pno)+1,20);
            console.log(pno);
        }
    })
    /*搜索*/
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
        var $li=$(`<li><span>${item.title.slice(0,20)}</li>`);
        $ul.append($li);
        return $li;
    };
    $("input.input2").click(function(e){
        e.preventDefault();
        $text=$("input.input1").val();
        location.href="products.html?kw="+$text;
    });
});