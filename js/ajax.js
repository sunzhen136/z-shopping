function createXhr(){
		var xhr=null;
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest;
		}else{
			xhr=new ActiveXObject("Microsoft.XMLHttp")
		}
		return xhr;
	}
function ajax({data,type,dataType,success,url}){	
	var xhr=createXhr();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var res=xhr.responseText;
			if(dataType!==undefined
				&&dataType.toLowerCase()==="json")
				res=JSON.parse(res);
			success(res);
		}
	}
	if(typeof data=="object"){
		var arr=[];
		for(var key in data){
			arr.push(key+"="+arr[key]);
		}
			data=arr.join("&");
	}
	if(type.toLowerCase()=="get"&&data!=undefined){
		url+="?"+data;
	}
	xhr.open(type,url,true);
	if(type.toLowerCase()=="post"){
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	if(type.toLowerCase()=="get"){
		xhr.send(null);
	}else{
		xhr.send(data);
	}

}