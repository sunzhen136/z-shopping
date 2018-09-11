$(function() {
    document.onselectstart = new Function("return false");
    function load() {
        $.ajax({
            type: "get",
            url: "data/user/islogin.php",
            dataType: "json",
            success: function (res) {
                if (res.ok == 0) {
                    alert("请您先登录");
                    location.href = "login.html?back=" + location.href;
                } else {
                    $.ajax({
                        type: "get",
                        url: "data/cart/getcart.php",
                        dataType: "json",
                        success: function (data) {
                            var html = "";
                            var sum = 0;
                            var total = 0;
                            var checkAll = true;
                            for ({is_checked, name, sm, title, prohh, price, officeprice, count, lid, iid}of data) {
                                if (is_checked == 1) {
                                    sum += parseInt(count);
                                    total += price * count;
                                } else {
                                    checkAll = false;
                                }
                                html += `
                                 <tr class="name">
                           <td> <input type="radio" data-iid="${iid}" class="radio" ${is_checked == 1 ? 'checked' : ''}>
                            <span>
                                店铺：<a href="#">${name}</a>
                                <i class="icon"></i>
                                <a href="#" class="qq" title="点击这里给我发信息"><img src="images/button_121%20(1).gif" alt=""></a>
                            </span>
                           </td>
                        </tr>
                                  <tr class="text">
                            <td class="td">
                                <input type="checkbox" data-iid="${iid}" ${is_checked == 1 ? 'checked' : ''}>
                                <a href="product_details.html?lid=${lid}"><img src="${sm}" alt=""></a>
                                <div class="infor">
                                    <p><a href="product_details.html?lid=${lid}">${title.slice(0, 60)}</a></p>
                                    <p><a href="#" title="7天退换" class="seven"></a></p>
                                    <p>颜色：<span>${prohh}</span></p>
                                    <p>套装：<span id="pp">官方标配</span> </p>
                                </div>
                                 <div class="infor-hidden">
                                                <p>官方标配：</p>
                                                <p>电器 x 1；5、三包凭证 x 1；6.Type-C数据线 x 1；7、卡座捅针 x 1；8、TPU保护壳 x 1；9、荣耀宣传卡片 x 1。</p>
                                            </div>
                            </td>
                            <td class="p1">
                                <p class="p1-p1">￥${parseFloat(officeprice).toFixed(2)}</p>
                                <p>￥${parseFloat(price).toFixed(2)}</p>
                            </td>
                            <td class="td3 p1" data-iid="${iid}" title="${title}">
                                <span class="remove"></span>
                                <input type="text" value="${count}">
                                <span class="add"></span>
                            </td>
                            <td class="p1">
                                <p class="tg">团购</p>
                                <p class="time"><span>0</span>小时<span>0</span>分<span>0</span>秒</p>
                            </td>
                            <td class="p1">
                                <p class="pic">￥${parseFloat(count * price).toFixed(2)}</p>
                            </td>
                            <td class="p1">
                                <p><a href="#">移入收藏夹</a></p>
                                <p class="del"><a href="#" data-iid="${iid}" title="${title}">删除</a></p>
                            </td>
                        </tr>                                                     
                               `
                            }
                            $("#tbody").html(html);
                            $(".state>p:nth-child(1)>span").html("(" + sum + "/30)")
                            $(".state>p:nth-child(2)>span").html("¥" + total.toFixed(2));
                            $(".price>span").html("¥" + total.toFixed(2));
                        }, error: function () {
                            alert("网络故障请检查！");
                        }
                    })
                }
            }
        })
    }
    load();
    $("#tbody").on("mouseover","#pp",function(){
        $("div.infor-hidden").show();
    }).mouseout(function () {
             $("div.infor-hidden").hide()
         })
    function calc() {
        var b = new Date("2018/9/21 00:00:00");
        var now = new Date();
        var s = parseInt((b - now) / 1000);
        var d = parseInt(s / (3600 * 24));
        d = d < 10 ? "0" + d : d;
        var h = parseInt(s % (3600 * 24) / 3600);
        h = h < 10 ? "0" + h : h;
        var m = parseInt(s % 3600 / 60);
        m = m < 10 ? "0" + m : m;
        var s = s % 60;
        s = s < 10 ? "0" + s : s;
        $(".time").html("<span>" + h + "</span>小时<span>" + m + "</span>分<span>" + s + "</span>秒")
    }
    calc();
    setInterval(calc, 1000);
    /*单选全选*/
    $("#tbody").on("click", ".radio,.td>input,.remove,.add", function () {
        var $tar = $(this);
        if ($tar.is(".remove,.add")) {
            var count = parseInt($tar.siblings("input").val());
            $tar.is(".add") ? count++ : count--;
            $tar.siblings("input").val(count);
            var iid = $tar.parent().attr("data-iid");
            $.ajax({
                type: "get",
                url: "data/cart/updatecard.php",
                data: {iid, count},
                dataType: "json",
                success: function () {
                    load();
                }, error: function () {
                    alert("网络错误请检查！")
                }
            })
        } else if ($tar.is(".td>input,.radio")) {    /*单击复选框*/
            var iid = $tar.attr("data-iid");
            var checked = $tar.is(":checked");
            $.ajax({
                type: "get",
                url: "data/cart/check.php",
                data: {iid, checked},
                dataType: "json",
                success: function () {
                    load();
                }, error: function () {
                    alert("网络故障,请检查！")
                }
            })
        }
    })
    $("#tbody").on("click",".del>a",function(e){
        e.preventDefault();
        var pname=$(this).attr("title");
        if(confirm("是否继续删除"+pname+"吗？")) {
            var iid = $(this).attr("data-iid");
            $.ajax({
                type: "get",
                url: "data/cart/dalete.php",
                data: {iid},
                dataType:"json",
                success: function (data) {
                    alert(data.msg);
                    load();
                }
            })
        }
    })
})