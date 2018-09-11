(function(){
    var link=document.createElement("link");
    link.rel="stylesheet";
    link.href="css/title.css";
    document.head.appendChild(link);
    ajax({
        type:"get",
        url:"title.html",
        success:function(html){
            document.getElementById("title").innerHTML=html;
        }
    })
})()