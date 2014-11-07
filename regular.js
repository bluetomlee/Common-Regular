(function(WIN){
var GF={
	ajax:function(url,data,callback){
		var xmlHttpReq = null;
		if (window.ActiveXObject){
			xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
		}else if (window.XMLHttpRequest){
			xmlHttpReq = new XMLHttpRequest();
		}
		if(xmlHttpReq != null){
			xmlHttpReq.open("GET",url,true);
			xmlHttpReq.onreadystatechange=RequestCallBack;
			xmlHttpReq.send(data);
		}
		function RequestCallBack(){
			if(xmlHttpReq.readyState == 4){
					if(xmlHttpReq.status == 200){
						callback( eval('('+xmlHttpReq.responseText+')') );
					}
			}
		}
	}
}
var GM={
	validate:{
		api:'',
		RegExp:{
			realname:"^([\\u4E00-\\u9FA5]{2,7})$|^([a-zA-Z]{1,20}(\\s)?[a-zA-Z]{1,20})$",
			jobtitle:"-",
			adminrank:"-",
			company:"^([\\u4E00-\\u9FA5]{3,64})|([a-zA-Z]{6,})$",
			hospital:"^([\\u4E00-\\u9FA5]{3,64})|([a-zA-Z]{6,})$",
			section:"-",
			hospitalgrade:"-",
			email:"^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@([A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$",
			telephone:"^(0\\d{2,3}){1}(\\-)?[0-9]\\d{6,8}(\\-\\d{1,5})?$",
			cellphone:"^1[34578]\\d{9}$",
			specialty:"-",
			address:"^[\\u4E00-\\u9FA5]{4,70}$",
			zipcode:"^\\d{6}$",
			pid:"(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)",
			position:"^[\\u4E00-\\u9FA5]{1,64}$",
			sex:"^[01]$",
			othersection: "^[\\u4E00-\\u9FA5]{1,64}$",
			school: "^[\\u4E00-\\u9FA5]{1,64}$",
			date:"^[12]\\d{3}\\-\\d{1,2}\\-\\d{1,2}((\\s\\d{1,2}):(\\d{1,2}):(\\d{1,2}))?$",
			age:"^([0-9]|[0-9]{2}|150)$"
		},
		test:function(val,type,fn){
			var result=false;
			if(this.RegExp[type] == '-'){
				GF.ajax(this.api,{type:type},function(response){
					result = response.result;
				})
				
			}else{
				var pat = this.RegExp[type] && new RegExp(this.RegExp[type]);
				result = pat.test(val);			
			}
			
			return result;
		}
	}
}


WIN.Manifold = {
	V:GM.validate
}

})(this)
