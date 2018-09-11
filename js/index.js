/*选择蓝色字体*/
document.onselectstart=new Function("return false");
/*轮播渐进渐出*/
/*function task(){
	  var img=document.querySelector("div.main>div.banner>ul.banner-img>li.show");
	  img.className="";
	  if(img.nextElementSibling!=null){
	  img.nextElementSibling.className="show";
	  }else{
		  img.parentNode.children[0].className="show";
	  }
	 } 
	 var timer=setInterval(task,3000);
	 轮播鼠标悬停
	var slider=document.querySelector("div.banner");
	slider.onmouseover=function(){
		clearInterval(timer);
	}
	slider.onmouseout=function(){
		timer=setInterval(task,3000);
	} */
/*鼠标悬停楼一*/
$(function(){
	$(".ck1-side").css("opacity","0");
	$(".bottom").mouseenter(function(){
			$(".ck1-side").css("opacity","1");
		}).mouseleave(function(){
			$(".ck1-side").css("opacity","0");
		})
	$(".ck1-side").mouseover(function(){
		$(this).css("opacity","1");
	})
/*智选*/
	$(".two-top>ul>li").mouseover(function(){
	$(this).find("div").css("zIndex",10);
	$(this).next().find("div").css("zIndex","0")
}).mouseout(function(){
	$(this).find("div").css("zIndex",0);
	})
/*三楼鼠标移入事件*/
	$(".three-text>ul>li:not(:nth-child(1))").mouseover(function(){
		$(this).find("img").addClass("scal");
		$(this).css("box-shadow","0px 0px 4px #ccc");
	}).mouseout(function(){
		$(this).find("img").removeClass("scal");
		$(this).css("box-shadow","");
	})
})
/*轮播*/
$(function(){
	var $ulimg=$(".banner-img");
    var LIWIDTH=1070,wait=3000,moved=0,timer=null,interval=500;
    var $ulimgcs=$(".ind");		
	$.ajax({
		type:"get",
		url:"data/index/carousel.php",
		dataType:"json",
		success:function(products){
            var html="";
			for(var {img,title,href} of products) {
                html += `<li class="show">
							<a href="${href}" title="${title}">
								<img src="${img}" alt="" >
							</a>
						</li>`
            	}
                html += `<li class="show">
							<a href="${products[0].href}" title="${products[0].title}">
								<img src="${products[0].img}" alt="" >
							</a>
						</li>`

            $ulimg.html(html).css("width",LIWIDTH*(products.length+1));
			/*导航圆点*/
            $ulimgcs.html("<li></li>".repeat(products.length))
									.on("click","li",function(){
							        	var $li=$(this);
							        	moved=$li.index();
							        	$ulimg.stop(true).animate({
												left:-moved*LIWIDTH
											},interval,function(){
							        		$li.addClass("active")
												.siblings().removeClass("active");
										})
									})
									.children(":first-child")
									.addClass("active");
				/*小圆点*/
						function move() {
                            moved++;
                            $ulimg.animate({
                                left: -moved * LIWIDTH
                            }, interval, function () {
                                if (moved == products.length) {
                                    moved = 0;
                                    $ulimg.css("left", 0);
                                }
                                //小圆点跟着轮播动态
                                $ulimgcs.children(":eq("+moved+")")
                                    .addClass("active")
                                    .siblings().removeClass("active");
                            })
                        }
			/*导航轮播*/
            function automove(){
                timer=setInterval(function(){
                	move();
					},wait+interval);
				}
            			automove();
				/*鼠标悬停*/
				$(".banner").hover(function(){
					clearInterval(timer);
				},
					function(){
					automove();
				}
			)
						/*鼠标右点击*/
						var $left=$(".ck-left");
						var $right=$(".ck-right");
						$right.click(function(e){
							e.preventDefault();
							if(!$ulimg.is(":animated")){
								move();
							}
						})
					/*鼠标左点击*/
					$left.click(function(e){
						e.preventDefault();
						if(!$ulimg.is(":animated")){
							if(moved==0){
								moved=3
                                $ulimg.css("left",-moved*LIWIDTH);
							}
							moved--;
							$ulimg.animate({
								left:-moved*LIWIDTH
							},interval,function(){
                                $ulimgcs.children(":eq("+moved+")")
                                    .addClass("active")
                                    .siblings().removeClass("active");
							})
						}
					})

			}

	})
})
/*团购*/
$(function() {
    var $ck1left = $(".ck1-left");
    var $ck1right = $(".ck1-right");
    var $bottom = $(".bottom-1");
    var $b = $(".section");
    var m = 0, liwidth = 180, interval = 500,wite=3000,timer=null;
    function start(){
        m++;
        $bottom.stop(true).animate({
            top:-m*liwidth
        },interval,function(){
            if (m==3) {
                m=0;
                $bottom.css("top", 0);
            }
            /*下划线*/
			$bottom.next().children(":eq("+m+")")
				.addClass("width1")
				.siblings().removeClass("width1")
        })
	}
    function auto(){
    	timer=setInterval(function(){
            start();
		},wite+interval);
	}
    auto()
	/*鼠标移入*/
	$b.mouseover(function(){
		clearInterval(timer)
	}).mouseout(function(){
		auto();
	})
    $bottom.next().on("click","li",function(){
			var	$li=$(this);
				m=$li.index();
        $bottom.stop(true).animate({
            top:-m*liwidth
        },interval,function(){
            $li.addClass("width1")
                .siblings().removeClass("width1");
        })

	})
		.children(":first-child").addClass("width1")
	/*鼠标右点击*/
		$ck1right.click(function(e){
			e.preventDefault();
			if(!$bottom.is(":animated")){
                start();
			}
		})
	/*鼠标左点击*/
	$ck1left.click(function(e){
		e.preventDefault();
        if(!$bottom.is(":animated")) {
            if (m == 0) {
                m = 3;
                $bottom.css("top", -m * liwidth);
            }
            m--;
            $bottom.stop(true).animate({
                top: -m * liwidth
            }, interval, function () {
                $bottom.next().children(":eq(" + m + ")")
                    .addClass("width1")
                    .siblings().removeClass("width1");

            })
        }
	})
	/*定时器*/
    function calc() {
        var b = new Date("2018/9/21 00:00:00");
        var now = new Date();
        var s = parseInt((b - now) / 1000);
        var d = parseInt(s / (3600 * 24));
        d = d < 10 ? "0" + d : d;
        var h = parseInt(s % (3600 * 24) / 3600 );
        h = h < 10 ? "0" + h : h;
        var m = parseInt(s % 3600 / 60);
        m = m < 10 ? "0" + m : m;
        var s = s % 60;
        s = s < 10 ? "0" + s : s;
        $(".picture>p:nth-child(4)").html("剩余 : <span>"+d+"</span>天<span>"+h+"</span>小时<span>"+m+"</span>分<span>"+s+"</span>秒")
    }
    calc();
    setInterval(calc, 1000);
    /*楼层滚动*/
    var section=$(".section")
	var floors=$(".floor");
    $(window).scroll(function(){
        var	scrollTop=$(window).scrollTop();
        	if(section.offset().top<scrollTop+innerHeight/2){
        		$(".nav-bar").show();
			}else{
                $(".nav-bar").hide();
			}
			floors.each(function(i,f){
				var $f=$(f);
                if($f.offset().top<scrollTop+innerHeight/4){
                    $(".nav-bar").children(":eq("+i+")")
						.addClass("active")
						.siblings().removeClass("active");
                }
			})
    	})
    $(".nav-bar").on("click","p",function(){
		var i=$(this).index();
       	var list=$(".main").find(".floor")
       	if(i==8){
			(function(){
				$('body,html').animate({scrollTop:0},3000)
				return false;
			})()
        }else{
            var pos=list[i].offsetTop;
          	window.scroll(0,pos-150)
		}
    })
})
