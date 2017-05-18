// JavaScript Document

//防止网页被iframe嵌套
//if(window.top!=window.self)window.top.location=window.self.location;

<!--工具函数-->
//原生常用方法封装
function Id(id){
	return document.getElementById(id);
};
function Class(Class){
	return document.getElementsByClassName(Class);
};
function Tag(tag){
	return document.getElementsByTagName(tag);
};
function QS(Class){//带上选择符号(包括属性)，只能选一组中的一个元素
	return document.querySelector(Class);
};
function QSA(Class){//带上选择符号(包括属性)，能选一组元素
	return document.querySelectorAll(Class);
};	
function Create(tag){
	return document.createElement(tag);	
};
function Add(obj,obj1){
	obj.appendChild(obj1);	
};
function Insert(obj,obj1,obj2){//父元素，要插入的元素，插入元素的后一个兄弟元素
	obj.insertBefore(obj1,obj2);	
};
function Remove(obj,obj1){
	obj.removeChild(obj1);	
};
function AddClass(obj,className){
	obj.classList.add(className);	
};
function RemoveClass(obj,className){
	obj.classList.remove(className);	
};
function ToggleClass(obj,className){
	obj.classList.toggle(className);	
};

//获取对象样式
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
};

//绑定事件，可重复绑定('事件名称'必须加引号)
function bind(obj,evname,fn){
	if(obj.addEventListener){
		obj.addEventListener(evname,fn,false);
	}else{
		obj.attachEvent('on'+evname,function(){
			fn.call(obj);
		});
	}
};

//取消绑定，可重复取消('事件名称'必须加引号)
function unBind(obj,evname,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(evname,fn,false);
	}else{
		obj.detachEvent('on'+evname,fn);
	}
};

//自动点击事件
function autoEvent(obj,event){
	if(document.createEvent){
        var evObj=document.createEvent('MouseEvents');
        
        evObj.initEvent(event,true,false);
        obj.dispatchEvent(evObj);
	}else if(document.createEventObject){
  		obj.fireEvent(event);
	}
};

//获取到document的位置
function getPos(obj,attr){		
	var value=0;
	var iPos=0;
	var i=0;							
	while(obj){
		iPos=attr=='left'?obj.offsetLeft:iPos=obj.offsetTop;
		value+=iPos;
		obj=obj.offsetParent;	
		i++;
	}		
	return value;
};

//碰撞检测(配合定时器使用)
function collide(obj1,obj2){
	var l1=obj1.offsetLeft;
	var r1=obj1.offsetLeft+obj1.offsetWidth;
	var t1=obj1.offsetTop;
	var b1=obj1.offsetTop+obj1.offsetHeight;

	var l2=obj2.offsetLeft;
	var r2=obj2.offsetLeft+obj2.offsetWidth;
	var t2=obj2.offsetTop;
	var b2=obj2.offsetTop+obj2.offsetHeight;
	
	return r1<l2||l1>r2||b1<t2||t1>b2?false:true;
};

//时间变成两位数
function toTwo(n){
	return n<10? '0'+n: ''+n;
};

//输入未来时间,返回倒计时json
function getDown(year,month,date,hours,minutes,seconds){
	var future=new Date(year+' '+month+' '+date+' '+hours+':'+minutes+':'+seconds).getTime();
	var now=new Date().getTime();
	var t=Math.floor( (future-now)/1000);
	return {'d':Math.floor(t/86400),'h':Math.floor(t%86400/3600),'m':Math.floor(t%86400%3600/60),'s':t%60};		
};

//算出本月天数
function manyDay(year,month){
	month=month+1;
	var nextMonth=new Date(year,month,0);//根据下个月第0天=上个月的最后一天，-1=倒数第二天
	return nextMonth.getDate();
};

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format=function(fmt){ 
	var date={   
		"M+":this.getMonth()+1,                 //月份   
		"d+":this.getDate(),                    //日   
		"H+":this.getHours(),                   //小时   
		"m+":this.getMinutes(),                 //分   
		"s+":this.getSeconds(),                 //秒   
		"q+":Math.floor((this.getMonth()+3)/3), //季度，+3为了好取整   
		"S":this.getMilliseconds()              //毫秒   
	};   
	if(/(y+)/.test(fmt)){//RegExp.$1(正则表达式的第一个匹配，一共有99个匹配)
		fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));  
		for(var k in date){  
			if(new RegExp("("+k+")").test(fmt)){
				fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(date[k]):(("00"+ date[k]).substr((""+ date[k]).length)));   
			} 
		}
	}   	
	return fmt;   
};

//布局转换
function layoutChange(obj){
	for(var i=0;i<obj.length;i++){
		obj[i].style.left=obj[i].offsetLeft+'px';
		obj[i].style.top=obj[i].offsetTop+'px';
	}
	for(var i=0;i<obj.length;i++){
		obj[i].style.position='absolute';
		obj[i].style.margin='0';
	}
};

//获取数组最小值
function getMin(arr){
	var iMin=+Infinity;

	for(var i=0;i<arr.length;i++){
		if(arr[i]<iMin){
			iMin=arr[i];
		}
	}
	return iMin;
};

//获取数组最大值
function getMax(arr){
	var iMax=-Infinity;

	for(var i=0;i<arr.length;i++){
		if(arr[i]>iMax){
			iMax=arr[i];
		}
	}
	return iMax;
};

//数组去重
function noRepeat(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]==arr[j]){
				arr.splice(j,1);
				j--;
			}
		}
	}
};

//数组去重(利用json)
function noRepeat1(arr){
	var json={};
	var result=[];
	
	for(var i=0;i<arr.length;i++){
		if(!json[arr[i]]){
			json[arr[i]]=1;//不为0就行，为真就可以
			result.push(arr[i]);
		}
	}
	return result;
};

//选中文字兼容
function selectText(){
	return 	document.selection? document.selection.createRange().text //ie下
								:window.getSelection().toString(); //标准下
};

//获取对象URL兼容
function createObjectURL(blob){
	if(window.URL){
		return window.URL.createObjectURL(blob);
	}else if(window.webkitURL){
		return window.webkitURL.createObjectURL(blob);
	}else{
		return null;
	}
};

//图片上传预览
function preview(oInp,oImg){
	for(var i=0;i<oInp.length;i++){	
		oInp[i].index=i;
		oInp[i].onchange=function(){	
			oImg[this.index].src=createObjectURL(this.files[0]);
		};
	}	
};

//canvas获取坐标的rgba值
function getXY(obj,x,y){ 	
	var w=obj.width;
	var h=obj.height;
	var d=obj.data;	
	var color=[];	
	color[0]=d[4*(y*w+x)];
	color[1]=d[4*(y*w+x)+1];
	color[2]=d[4*(y*w+x)+2];
	color[3]=d[4*(y*w+x)+3];	
	return color;	
};

//canvas设置坐标的rgba颜色
function setXY(obj,x,y,color){
	var w=obj.width;
	var h=obj.height;
	var d=obj.data;		
	d[4*(y*w+x)]=color[0];
	d[4*(y*w+x)+1]=color[1];
	d[4*(y*w+x)+2]=color[2];
	d[4*(y*w+x)+3]=color[3];	
};

//生成canvas图片反色
function cInverse(obj,src){
	var c=obj;
	var cg=obj.getContext('2d');
	var nImg=new Image();
	
	nImg.src=src;
	nImg.onload=function(){
		c.width=nImg.width;
		c.height=nImg.height;
		
		cg.drawImage(nImg,0,0);	
		var oImg=cg.getImageData(0,0,nImg.width,nImg.height);
		var iWidth=oImg.width;
		var iHeight=oImg.height;
		
		for(var i=0;i<iWidth;i++){
			for(var j=0;j<iHeight;j++){
				var rgba=[];
				var color=getXY(oImg,i,j);
				
				rgba[0]=255-color[0];
				rgba[1]=255-color[1];
				rgba[2]=255-color[2];
				rgba[3]=255;
				setXY(oImg,i,j,rgba);
			}
		}
		cg.putImageData(oImg,0,0);
	};
};

//生成canvas图片倒影
function cReflection(obj,src){
	var c=obj;
	var cg=obj.getContext('2d');
	var nImg=new Image();
	
	nImg.src=src;
	nImg.onload=function(){
		c.width=nImg.width;
		c.height=nImg.height;
		
		cg.drawImage(nImg,0,0);	
		var oImg=cg.getImageData(0,0,nImg.width,nImg.height);
		var iWidth=oImg.width;
		var iHeight=oImg.height;
		
		var cImg=cg.createImageData(iWidth,iHeight);
		for(var i=0;i<iWidth;i++){
			for(var j=0;j<iHeight;j++){
				var rgba=[];
				var color=getXY(oImg,i,j);
				
				rgba[0]=color[0];
				rgba[1]=color[1];
				rgba[2]=color[2];
				rgba[3]=255;
				setXY(cImg,i,iHeight-j,rgba);
			}
		}
		cg.putImageData(cImg,0,0);
	};
};

//生成canvas图片渐变
function cGradient(obj,src){
	var c=obj;
	var cg=obj.getContext('2d');
	var nImg=new Image();
	
	nImg.src=src;
	nImg.onload=function(){
		c.width=nImg.width;
		c.height=nImg.height;
		
		cg.drawImage(nImg,0,0);	
		var oImg=cg.getImageData(0,0,nImg.width,nImg.height);
		var iWidth=oImg.width;
		var iHeight=oImg.height;
		
		var cImg=cg.createImageData(iWidth,iHeight);
		for(var i=0;i<iWidth;i++){
			for(var j=0;j<iHeight;j++){
				var rgba=[];
				var color=getXY(oImg,i,j);
				
				rgba[0]=color[0];
				rgba[1]=color[1];
				rgba[2]=color[2];
				rgba[3]=255*j/iHeight;
				setXY(cImg,i,j,rgba);
			}
		}
		cg.putImageData(cImg,0,0);
	};
};

//生成canvas图片马赛克
function cMosaic(obj,src,m){ 
	var c=obj;
	var cg=obj.getContext('2d');
	var nImg=new Image();
	var m=m||5;
	
	nImg.src=src;
	nImg.onload=function(){
		c.width=nImg.width;
		c.height=nImg.height;
		
		cg.drawImage(nImg,0,0);	
		var oImg=cg.getImageData(0,0,nImg.width,nImg.height);
		var iWidth=oImg.width;
		var iHeight=oImg.height;		
		var cImg=cg.createImageData(iWidth,iHeight);
		var stepW=iWidth/m;
		var stepH=iHeight/m;
		
		for(var i=0;i<stepW;i++){
			for(var j=0;j<stepH;j++){
				var color=getXY(oImg,i*m+Math.floor(Math.random()*m),j*m+Math.floor(Math.random()*m));			
				for(var k=0;k<m;k++){
					for(var l=0;l<m;l++){
						setXY(cImg,i*m+k,j*m+l,color);	
					}
				}
			}
		}
		cg.putImageData(cImg,0,0);
	};
};

//内核前缀查询
function getPrefix(){
	var style=document.body.style||document.documentElement.style;
	var arr=['webkit','khtml','moz','ms','o'];
	for(var i=0;i<arr.length;i++){
		if (typeof style[arr[i]+'Transition']=='string'){
			document.title='内核前缀：-'+arr[i];
		}
	}		
};

//判断是否是微信浏览器
function isWeixin(){
	var ua=navigator.userAgent.toLowerCase();
 	return ua.match(/MicroMessenger/i)=='micromessenger'?true:false;
};

//设置cookie
function setCookie(key,value,t){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+t);
	document.cookie=key+'='+value+';expires='+oDate.toGMTString();
};

//获取cookie
function getCookie(key){
	var arr1=document.cookie.split('; ');
	for (var i=0;i<arr1.length;i++){
		var arr2=arr1[i].split('=');
		if (arr2[0]==key){
			return decodeURI(arr2[1]);
		}
	}
};

//删除cookie（就是重新设置一遍,让cookie值为空,过期时间为过期）
function removeCookie(key){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()-1);
	document.cookie=key+'='+''+';expires='+oDate.toGMTString();
};

//获取多个任意class(class之间用逗号隔开)
function getClass(parent,tagN,classN){
var allTag=parent.getElementsByTagName(tagN),	
 	arrClass=classN.split(','),
	arr=[];
	for(var i=0;i<allTag.length;i++){
	var aClass=allTag[i].className.split(' ');		
		for(var j=0;j<arrClass.length;j++){
			for(var k=0;k<aClass.length;k++){
				if(aClass[k]==arrClass[j]){
				arr.push(allTag[i]);
				break;
				}	
			}
		}
	}
	return arr;
};

//配合正则获取单个class
function getByClass(parent,tagN,classN){
	var allTag=parent.getElementsByTagName(tagN);
	var arr=[];
	var re=new RegExp('\\b'+classN+'\\b','i');
	var i=0;	
	for(i=0;i<allTag.length;i++){	
		if(re.test(allTag[i].className)){
			arr.push(allTag[i]);
		}
	}	
	return arr;
};

//添加任意class
function addClass(obj,classN){
	if(!obj.className){
	obj.className=classN;
	}else{
	var arrClass=obj.className.split(' '),
		index=arrIndexOf(arrClass,classN);
		if(!index){
		obj.className+=' '+classN;
		}
	}	
};

//移除任意class
function removeClass(obj,classN){
	if(obj.className){
	var arrClass=obj.className.split(' '),
		index=arrIndexOf(arrClass,classN);
		if(index){
		arrClass.splice(index,1);
		obj.className=arrClass.join(' ');
		}
	}
};

//用js修改样式表
//linkHref（样式表完整名称）
//className(想要修改的选择器完整名称)
//json(json格式去写样式)
function jsStyle(linkHref,className,json){
	var sheets=document.styleSheets;//拿到所有样式表
	var sheet=null;

	for(var i=0;i<sheets.length;i++){
		if(sheets[i].href){
			var sHref=sheets[i].href;
			sHref=sHref.substring(sHref.lastIndexOf('/')+1,sHref.length);
			
			if(sHref==linkHref){
				sheet=sheets[i];//拿到样式表对象
			}
		}	
	}
	
	var rules=sheet.cssRules||shhet.rules;//拿到所有的样式
	var rule=null;
	
	for(var i=0;i<rules.length;i++){
		if(rules[i].selectorText==className){
			rule=rules[i];//拿到想要操作的那条样式
			for(var attr in json){
				rule.style[attr]=json[attr];
			}
		}
	}
	return rule.cssText;
};

//返回当前地址?后面的参数的json格式(用于submit提交的str='1'&str1='2'格式)
function strToJson(){
	var str=window.location.search;
	var reg=/&+/g;
	var reg1=/=+/g;
	
	str=decodeURI(str);
	str=str.replace('?','');
	str=str.replace(reg,'","');
	str=str.replace(reg1,'":"');
	str='{"'+str+'"}';
	str=JSON.parse(str);	
	return str;
};

//返回当前地址?后面的参数的json格式(用于自己拼接的str={}&str1={}格式)
function strToJson1(){
	var str=window.location.search;
	var reg=/&+/g;
	var reg1=/=+/g;
	
	str=decodeURI(str);
	str=str.replace('?','"');
	str=str.replace(reg,',"');
	str=str.replace(reg1,'":');
	str='{'+str+'}';
	str=JSON.parse(str);	
	return str;
};

//判断设备跳转不同地址
function goPage(moHref,pcHref){
	var reg=/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
	
	window.location.href=navigator.userAgent.match(reg)?moHref:pcHref;
};

//根据设备宽度来写相对布局,
//最小1rem=100px(宽度为320px屏幕下),3.2rem=100%;
//根据320屏幕下换算来布局
function htmlFontSize(){
	function change(){
		var fontSize=document.documentElement.clientWidth/3.2;
		
		if(fontSize<12)fontSize=12;
		document.getElementsByTagName('html')[0].style.fontSize=fontSize+'px';
	};
	change();
	window.onresize=change;	
};

//简单实现路由
//配置函数放在所有dom后面执行（否则onload不触发路由回调函数）
//Router.when('/',function(){});
//Router.when('/blue',function(){});
function router(){
	function Router(){
		this.routes={};
		this.currentUrl='';
		this.init();
	};
	Router.prototype={
		init:function(){
			bind(window,'load',this.refresh.bind(this));
			bind(window,'hashchange',this.refresh.bind(this));	
		},
		when:function(path,callback){
			this.routes[path]=callback||function(){};
		},
		refresh:function(){	
			this.currentUrl=window.location.hash.replace('#','')||'/';
			this.routes[this.currentUrl]();
		}
	};
	window.Router=new Router();//把路由配置函数挂载到window对象下
};

//旋转360核心函数
//根据半径和角度获得x和y的坐标
function circleGetXY(radius,angle){
	return{x:Math.round(Math.sin(angle*Math.PI/180)*radius),y:Math.round(Math.cos(angle*Math.PI/180)*radius)}
};
//过渡结束时候初始化属性
function transitionEndFn(){
	this.style.transition='50ms 100ms';
	this.style.transform='scale(1) rotate(-720deg)';
	this.style.opacity=1;
	this.style.filter='alpha(opacity:1)';
	removeEnd(this)	;
};
//元素过渡结束的时候加上transitionEndFn函数
function addEnd(obj){
	obj.addEventListener('transitionend',transitionEndFn,false);
	obj.addEventListener('webkitTransitionEnd',transitionEndFn,false);
};
//元素过渡结束的时候再删除transitionEndFn函数
function removeEnd(obj){
	obj.removeEventListener('transitionend',transitionEndFn,false);
	obj.removeEventListener('webkitTransitionEnd',transitionEndFn,false);
};

//查看键值修正版
function keyCode(){
	document.onkeyup=function(ev){
		var ev=ev||event;
		var oP=document.createElement('p');
		var aString=String.fromCharCode(ev.keyCode);
		
		switch(ev.keyCode){
			case 27:aString='Esc';break;	
			case 112:aString='F1';break;
			case 113:aString='F2';break;
			case 114:aString='F3';break;
			case 115:aString='F4';break;
			case 116:aString='F5';break;
			case 117:aString='F6';break;
			case 118:aString='F7';break;
			case 119:aString='F8';break;
			case 120:aString='F9';break;
			case 121:aString='F10';break;
			case 122:aString='F11';break;
			case 123:aString='F12';break;
			case 44:aString='PrtScr';break;
			case 145:aString='Scroll';break;
			case 19:aString='Pause';break;
			case 192:aString='`';break;
			case 189:aString='-';break;
			case 187:aString='=';break;
			case 8:aString='←删除';break;
			case 45:aString='Insert';break;
			case 36:aString='Home';break;
			case 33:aString='PgUp';break;
			case 144:aString='数字区 NumLock';break;
			case 111:aString='数字区 /';break;
			case 106:aString='数字区 *';break;
			case 109:aString='数字区 -';break;
			case 9:aString='Tab';break;
			case 219:aString='[';break;
			case 221:aString=']';break;
			case 13:aString='Enter';break;
			case 46:aString='Delete';break;
			case 35:aString='End';break;
			case 34:aString='PgDn';break;
			case 103:aString='数字区 7';break;
			case 104:aString='数字区 8';break;
			case 105:aString='数字区 9';break;
			case 107:aString='数字区 +';break;
			case 20:aString='Capslock';break;
			case 186:aString='：';break;
			case 222:aString='’';break;
			case 220:aString='｜';break;
			case 100:aString='数字区 4';break;
			case 101:aString='数字区 5';break;
			case 102:aString='数字区 6';break;
			case 16:aString='Shift';break;
			case 188:aString='，';break;
			case 190:aString='。';break;
			case 191:aString='/';break;
			case 38:aString='方向↑';break;
			case 97:aString='数字区 1';break;
			case 98:aString='数字区 2';break;
			case 99:aString='数字区 3';break;
			case 17:aString='Ctrl';break;
			case 91:aString='左Window';break;
			case 92:aString='右Window';break;
			case 18:aString='Alt';break;
			case 32:aString='空格';break;
			case 93:aString='打印';break;
			case 37:aString='方向←';break;
			case 40:aString='方向↓';break;
			case 39:aString='方向→';break;
			case 96:aString='数字区 0';break;
			case 110:aString='数字区 .';
		}
		oP.innerHTML='按键'+':'+aString+' '+'键值'+':'+ev.keyCode;
		document.body.appendChild(oP);
	};
};



<!--算法函数-->
//计算排列函数(arrange)
function A(m,n){
	return f(m)/f(m-n);
};
//计算组合的函数(combination)
function C(m,n){
	return f(m)/(f(m-n)*f(n));
};
//递归计算阶层
function f(num){
	if(num<=1){
		return 1;
	}
	return num*f(num-1);
};

//数组螺旋矩阵
function changeXY(size){
	var arr=[];
	var len=size*size;
	var row = 0;
	var col = 0;
	var min = 0;
	var max = size - 1;

	for(var i=0;i<len;i++){
		arr.push(row*size+col);
		if(row==min&&col<max){
			col=col+1;
		}
		else if(col==max&&row<max){
			row=row+1;
		}
		else if(row==max&&col>min){
			col=col-1;
		}
		else if(col==min&&row>min){
			row=row-1;
		}
		if(row-1==min&&col==min){
			min=min+1;
			max=max-1;
		}
	}
	return arr;
};

//数组行列矩阵互换
function changeXY1(arr,size){
	var newArr=[];
	var iNow=0;
	
	(function(){
		if(iNow==size){
			return;
		}
		for(var i=0;i<arr.length;i++){
			if(i%size==iNow){
				newArr.push(arr[i]);
			}
		}
		iNow++;
		arguments.callee();//递归调用自执行函数本身
	})();	
	return newArr;
}



<!--参考函数-->
//对js中的5钟主要数据类型进行值复制（包括Number、String、Object、Array、Boolean）
function clone(obj){
	//判断是对象，就进行循环复制
	if(typeof obj==='object'&&typeof obj!=='null'){
		//区分是数组还是对象，创建空的数组或对象
		var o=Object.prototype.toString.call(obj).slice(8,-1)==="Array"?[]:{};
		
		for(var k in obj){
			//如果属性对应的值为对象，则递归复制
			if(typeof obj[k]==='object'&&typeof obj[k]!=='null'){
				o[k]=clone(obj[k]);	
			}else{
				o[k]=obj[k];
			}
		}
	}else{//不为对象，直接把值返回
		return obj;
	}
	return o;
};

//鼠标拖拽控制物体+事件
function drag(obj,lMin,lMax,tMin,tMax,fn1,fn2,endFn){
	obj.onmousedown=function(ev){
		var ev=ev||event;
		var disX=ev.clientX-obj.offsetLeft;
		var disY=ev.clientY-obj.offsetTop;
		
		if(obj.setCapture)obj.setCapture;
		fn1&&fn1.call(obj,disX,disY);
		document.onmousemove=function(ev){
			var ev=ev||event;
			var l=ev.clientX-disX;
			var t=ev.clientY-disY;
			if(l<lMin)l=lMin;
			if(l>lMax)l=lMax;
			if(t<tMin)t=tMin;
			if(t>tMax)t=tMax;
			obj.style.left=l+'px';
			obj.style.top=t+'px';
			fn2&&fn2.call(obj,l,t);
		};
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;		
			if(obj.releaseCapture)obj.releaseCapture;
			endFn&&endFn.call(obj);
		};
		return false;
	};
};

//鼠标滚轮事件兼容
function MouseWheel(obj,upFn,downFn){
	obj.onmousewheel=fn1;
	bind(obj,'DOMMouseScroll',fn1);
	function fn1(ev){
		var ev=ev||event; 
		var up=true;
		if(ev.wheelDelta){
			up=ev.wheelDelta>0?true:false;
		}else{
			up=ev.detail<0?true:false;
		}	
		up?upFn&&upFn.call(obj):downFn&&downFn.call(obj);
		if(ev.preventDefault)ev.preventDefault();
		return false;
	};
};

//鼠标滚轮控制物体+事件
function mouseWheel(obj,attr,dis,minTarget,maxTarget,fn){
	document.onmousewheel=fn1;
	bind(document,'DOMMouseScroll',fn1);
	function fn1(ev){
		var ev=ev||event; 
		var up=true;
		var value=0;
		var outcome=0;
		if(ev.wheelDelta){
			up=ev.wheelDelta>0?true:false;
		}else{
			up=ev.detail<0?true:false;
		}	
		value=up?-dis:dis;
		switch(attr){
			case 'left':outcome=obj.offsetLeft+value;break;
			case 'top':outcome=obj.offsetTop+value;break;	
			case 'width':outcome=obj.offsetWidth+value;break;
			case 'height':outcome=obj.offsetHeight+value;break;	
			case 'opacity':outcome=getStyle(obj,attr)*100+value;break;		
		}
		if(outcome<minTarget)outcome=minTarget;
		if(outcome>maxTarget)outcome=maxTarget;
		if(attr=='opacity'){
			obj.style.opacity=outcome/100;
			obj.style.filter='alpha(opacity:'+outcome+')';
		}else{
			obj.style[attr]=outcome+'px';	
		}	
		fn&&fn.call(obj);
		if(ev.preventDefault)ev.preventDefault();
		return false;
	};
};

//键盘控制物体连续移动
function kMove(obj,dis){
	var Move={'l':null,'t':null,'r':null,'b':null};
	var timer=null;
	
	timer=setInterval(function(){
		if(Move.l)obj.style.left=obj.offsetLeft-dis+'px';
		if(Move.t)obj.style.top=obj.offsetTop-dis+'px';
		if(Move.r)obj.style.left=obj.offsetLeft+dis+'px';
		if(Move.b)obj.style.top=obj.offsetTop+dis+'px';
	},20)
	document.onkeydown=function(ev){
		var ev=ev||event;
		switch(ev.keyCode){
			case 37:Move.l=true;break;
			case 38:Move.t=true;break;
			case 39:Move.r=true;break;
			case 40:Move.b=true;
		}
	};
	document.onkeyup=function(ev){
		var ev=ev||event;
		switch(ev.keyCode){
			case 37:Move.l=false;break;
			case 38:Move.t=false;break;
			case 39:Move.r=false;break;
			case 40:Move.b=false;
		}
	};
};

//面向对象：拖拽原型
function Drag(object){
	var This=this;
	this.obj=object;
	this.disX=0;
	this.disY=0;
	this.obj.onmousedown=function(ev){
		This.fnDown(ev);
		return false;
	};
};
Drag.prototype.fnDown=function(ev){
	var This=this;
	var ev=ev||event;
	this.disX=ev.clientX-this.obj.offsetLeft;
	this.disY=ev.clientY-this.obj.offsetTop;
	document.onmousemove=function(ev){
		This.fnMove(ev);
	};
	document.onmouseup=function(){
		This.fnUp();
	};
};
Drag.prototype.fnMove=function(ev){
	var ev=ev||event;
	this.obj.style.left=ev.clientX-this.disX+'px';
	this.obj.style.top=ev.clientY-this.disY+'px';
};
Drag.prototype.fnUp=function(){
	document.onmousemove=document.onmouseup=null;
};

//面向对象：继承并加上拖拽限制
function LimitDrag(object){
	Drag.call(this,object);
};
for(var i in Drag.prototype){
	LimitDrag.prototype[i]=Drag.prototype[i];
}
LimitDrag.prototype.fnMove=function(ev){
	var ev=ev||event;
	var l=ev.clientX-this.disX;
	var t=ev.clientY-this.disY;
	var iMaxL=document.documentElement.clientWidth-this.obj.offsetWidth;
	var iMaxT=document.documentElement.clientHeight-this.obj.offsetHeight;
	
	if(l<0)l=0;
	if(l>iMaxL)l=iMaxL;	
	if(t<0)t=0;	
	if(t>iMaxT)t>iMaxT;
	
	this.obj.style.left=l+'px';
	this.obj.style.top=t+'px';
};



<!--常用框架-->
//匀速链式运动框架
function move(msec,obj,attr,dis,target,endFn){
	clearInterval(obj.move);	
	var arr=[];
	var num=0;
	var onOff=false;
	var position=parseInt(getStyle(obj,attr.split('/').join('')));	
		for(var i=target;i>0;i-=dis) {
			arr.push(i,-i);
		}
		arr.push(0);
		if(attr=='/left'||attr=='/top'){
			onOff=true;			
		}else if(attr=='opacity'){
			var dis=getStyle(obj,attr)*100<target?dis:-dis;
		}else{		
			var dis=parseInt(getStyle(obj,attr))<target?dis:-dis;	
		}	
	obj.move=setInterval(function (){									   
		if(onOff){		
			attr=attr.split('/').join('');			
		}else if(attr=='opacity'){
			var outcome=getStyle(obj,attr)*100+dis;	
		}else{
			var outcome=parseInt(getStyle(obj,attr))+dis;	
		}		
		if(outcome>target&&dis>0||outcome<target&&dis<0)outcome=target;	
		if(onOff){		
			obj.style[attr]=position+arr[num]+'px';
			num++;
			}else if(attr=='opacity'){
			obj.style.opacity=outcome/100;
			obj.style.filter='alpha(opacity:'+outcome+')';
		}else{
			obj.style[attr]=outcome+'px';		
		}
		if(outcome==target||num==arr.length){
			clearInterval(obj.move);
			endFn&&endFn.call(obj);
		}	
	},msec);	
};

//匀速同步运动框架
function manyMove(msec,obj,json,dis,endFn){
	clearInterval(obj.manyMove);	
	obj.manyMove=setInterval(function (){	
	var over=true;								   						   				
		for(var attr in json){
			var target=json[attr];	
			if(attr=='opacity'){
				var speed=getStyle(obj,attr)*100<target?dis:-dis;
				var outcome=getStyle(obj,attr)*100+speed;		
			}else{
				var speed=parseInt(getStyle(obj,attr))<target?dis:-dis;		
				var outcome=parseInt(getStyle(obj,attr))+speed;	
			}
			if(outcome>target&&speed>0||outcome<target&&speed<0)outcome=target;	
			if(attr=='opacity'){				
				obj.style.opacity=outcome/100;
				obj.style.filter='alpha(opacity:'+outcome+')';		
			}else{	
				obj.style[attr]=outcome+'px';		
			}
			if(outcome!=target)over=false;				
		}
		if(over){
			clearInterval(obj.manyMove);
			endFn&&endFn.call(obj);
		}	
	},msec);	
};

//综合类型同步运动框架
function allMove(time,obj,json,type,endFn){
	clearInterval(obj.allMove);
	var Default={};
	var startTime=new Date().getTime();
	for(var attr in json){
	Default[attr]=0; 
	Default[attr]=attr=='opacity'? Math.round(getStyle(obj,attr)*100)
								   :parseInt(getStyle(obj,attr));
	}	
	obj.allMove=setInterval(function(){
		var changeTime=new Date().getTime()-startTime;
		var t=time-Math.max(0,time-changeTime);
		for(var attr in json){
			var value=moveType[type](t,Default[attr],json[attr]-Default[attr],time);			
			if(attr=='opacity'){
				obj.style.opacity=value/100;
				obj.style.filter='alpha(opacity='+value+')';
			} else {
				obj.style[attr]=value+'px';
			}
		}
		if(t==time){
			clearInterval(obj.allMove);
			endFn&&endFn.call(obj);
		}
	},20)
};

var moveType={
	//t:运动消耗的时间 b:初始值 c:目标值 d:设定的总时间 return:返回是随运动变化的结果值
	'linear':function (t,b,c,d){  //匀速运动 
		return c*(t/d)+b;
	},
	'easeIn':function(t,b,c,d){  //加速运动 
		return c*(t/=d)*t+b;
	},
	'easeOut':function(t,b,c,d){  //减速运动
		return c*(t/=d)*(2-t)+b;
	},
	'easeBoth':function(t,b,c,d){  //加速减速运动 
		return (t/=d/2)<1?c/2*t*t+b :c/2*((t-=1)*(2-t)+1)+b;
	},
	'easeInStrong':function(t,b,c,d){  //加加速运动
		return c*(t/=d)*t*t+b;
	},
	'easeOutStrong':function(t,b,c,d){  //减减速运动
		return c*(1-(t=1-t/d)*t*t)+b;
	},
	'easeBothStrong':function(t,b,c,d){  //加加速减减速运动
		return (t/=d/2)<1?c/2*t*t*t+b :c/2*((t-=2)*t*t+2)+b;
	},
	'elasticIn':function(t,b,c,d,a,p){  //弹性加速
		if (t==0) return b;
		if ((t/=d)==1) return b+c; 
		if (!p) p=d*0.3;
		if (!a||a<Math.abs(c)) a=c;
		var s=!a||a<Math.abs(c)?p/4 :s=p/(2*Math.PI)*Math.asin(c/a);	
		return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
	},
	'elasticOut':function(t,b,c,d,a,p){  //加速弹性
		if (t==0) return b;
		if ((t/=d)==1) return b+c;
		if (!p)p=d*0.3;
		if (!a||a<Math.abs(c)) a=c;
		var s=!a||a<Math.abs(c)?p/4 :s=p/(2*Math.PI)*Math.asin(c/a);
		return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;
	},    
	'elasticBoth':function(t,b,c,d,a,p){  //弹性加速弹性
		if(t==0) return b;
		if((t/=d/2)==2) return b+c;
		if (!p) p=d*(0.3*1.5);
		if (!a||a<Math.abs(c)) a=c; 
		var s=!a||a<Math.abs(c)?p/4: s=p/(2*Math.PI)*Math.asin(c/a);
		return 	t<1? -0.5*(a*Math.pow(2,10*(t-=1))* Math.sin( (t*d-s)*(2*Math.PI)/p))+b :a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;				
	},
	'backIn':function(t,b,c,d){  //回退加速
		var s=1.70158;
		return c*(t/=d)*t*((s+1)*t-s)+b;
	},
	'backOut':function(t,b,c,d){	  //加速回退
		var s=3.70158;
		return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
	}, 
	'backBoth':function(t,b,c,d){  //回退加速回退
		var s=1.70158; 
		return	(t/=d/2)<1? c/2*(t*t*(((s*=(1.525))+1)*t-s))+b
							:c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s)+2)+b;
	},
	'bounceIn':function(t,b,c,d){  //弹球加速
		return c-moveType['bounceOut'](d-t, 0, c, d)+b;
	},       
	'bounceOut':function(t,b,c,d){  //加速弹球
		if ((t/=d)<(1/2.75)) return c*(7.5625*t*t)+b;			
		if (t<(2/2.75)) return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;			
		if (t<(2.5/2.75)) return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
		return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
	},      
	'bounceBoth':function(t,b,c,d){  //弹球加速弹球
		return t<d/2? moveType['bounceIn'](t*2,0,c,d)*0.5+b
					   :moveType['bounceOut'](t*2-d,0,c,d)*0.5+c*0.5+b; 
	}
};

//基于css()函数的运动框架
function tweenMove(time,obj,json,type,endFn){
	var fn=moveType[type];
	var t=0;
	var b={};
	var c={};
	var d=time/24;
	var attr='';
	clearInterval(obj.timer);
	for(attr in json){
		b[attr]=css(obj,attr);
		c[attr]=json[attr]-b[attr];
	}
	if(time<30){
		for(attr in json){
			css(obj,attr,json[attr]);
		}
	}else{
		obj.timer=setInterval(function(){
			if(t<d){
				t++;
				for(attr in json){
					css(obj,attr,fn(t,b[attr],c[attr],d));
				}
			}else{
				for(attr in json){
					css(obj,attr,json[attr]);
				}
				clearInterval(obj.timer);
				endFn&&endFn.call(obj);
			}
		},20);
	}
};

//设置css样式
function css(obj,attr,value){
	if(arguments.length==2){
		if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=='translateY'||attr=='translateX'){
			if(!obj.$Transform)obj.$Transform={};
			switch(attr){
				case 'scale':
				case 'scaleX':
				case 'scaleY':
					return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;
					break;
				default:
					return obj.$Transform[attr]?obj.$Transform[attr]:0;
			}
		}
		var current=getStyle(obj,attr);
		return attr=='opacity'?Math.round(parseFloat(current)*100):parseInt(current);		
	}else if(arguments.length==3){
		switch(attr){
			case 'scale':
			case 'scaleX':
			case 'scaleY':
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
			case 'translateZ':
			case 'translateX':
			case 'translateY':
				setCss3(obj,attr,value);
				break;
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				obj.style[attr]=typeof(value=='string')?value:value+'px';
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value+")";
				obj.style.opacity=value/100;
				break;
			default:
				obj.style[attr]=value;
		}
	}
	return function(attr_in,value_in){css(obj,attr_in,value_in)};
};

//兼容css3样式
function setCss3(obj, attr, value){
	var str='';
	var val='';
	var arr=['Webkit','Moz','O','ms',''];
	if(!obj['$Transform']){
		obj['$Transform']={};
	}
	obj['$Transform'][attr]=parseInt(value);
	for(str in obj['$Transform']){
		switch(str){
			case 'scale':
			case 'scaleX':
			case 'scaleY':
				val+=str+'('+(obj['$Transform'][str]/100)+')';	
				break;
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
				val+=str+'('+(obj['$Transform'][str])+'deg)';	
				break;
			case 'translateX':
			case 'translateY':
			case 'translateZ':
				val+=str+'('+(obj['$Transform'][str])+'px)';	
				break;
		}
	}
	for(var i=0;i<arr.length;i++){
		obj.style[arr[i]+'Transform']=val;
	}	
};	



<!--项目常用插件-->
//手机无缝轮播划屏插件
//obj(轮播图的父容器)，obj1（高亮的小点的父容器），styleClass（高亮小点的样式）
//moveType(运动类型)'linear' 'easeIn' 'easeOut' 'easeBoth' 'easeInStrong' 'easeOutStrong' 'easeBothStrong'-
//-'elasticIn' 'elasticOut' 'elasticBoth' 'backIn' 'backOut' 'backBoth' 'bounceIn' 'bounceOut' 'bounceBoth'
//t（轮播间隔），t1(轮播滚动时间)，t2（划屏滚动时间），t3（划屏后轮播延迟时间）
function autoplay(obj,obj1,styleClass,moveType,t,t1,t2,t3){
	var oLi=obj.children;
	var aLi=obj1.children;
	var iW=oLi[0].offsetWidth;
	var iL=oLi.length*2;
	var iLeft=0;
	var iTop=0;
	var lDis=0;
	var tDis=0;
	var oTime=0;
	var iNow=0;
	var	index=0;
	var iOld=0;
	var str='';
	var timer=null;
	var timer1=null;
	
	obj.innerHTML+=obj.innerHTML;
	obj.style.width=iW*iL+'px';
	for(var i=0;i<iL;i++){
		oLi[i].style.width=iW+'px';
	}
	
	for(var i=0;i<iL/2;i++){
		str+='<li></li>';
	}
	obj1.innerHTML=str;	
	var iW1=obj1.offsetWidth;	
	obj1.style.marginLeft=-iW1/2+'px';
	aLi[0].classList.add(styleClass);
	
	if(iNow==0){
		iNow=iL/2;	
		css(obj,'translateX',-iW*iL/2);					
	}
	bind(obj,'touchstart',fn2);
	function fn2(ev){
		var ev=ev||event;
		clearInterval(timer);
		iLeft=ev.changedTouches[0].pageX;
		iTop=ev.changedTouches[0].pageY;
		oTime=Date.now();
	
		iOld=css(obj,'translateX');
		bind(obj,'touchmove',fix);
		bind(obj1,'touchmove',fix);			
	};
	
	bind(obj,'touchmove',fn3);
	function fn3(ev){
		var ev=ev||event;
		lDis=ev.changedTouches[0].pageX-iLeft;
		tDis=ev.changedTouches[0].pageY-iTop;
		var condition=Math.abs(lDis)-Math.abs(tDis);
		
		if(condition<0){
			unBind(obj,'touchmove',fix);
			unBind(obj1,'touchmove',fix);	
		}else{
			css(obj,'translateX',iOld+lDis);
		}
	};
		
	bind(obj,'touchend',fn4);
	function fn4(){			
		var tDis=Date.now()-oTime;
	
		if(Math.abs(lDis/iW)>0.3||tDis<300&&Math.abs(lDis)>30){
			lDis<0?iNow++:iNow--;
			fn();
			lDis=0;		
		}
		
		tweenMove(t2,obj,{'translateX':-iNow*iW},moveType,function(){
			iOld=css(obj,'translateX');
		});
		unBind(obj,'touchmove',fix);
		unBind(obj1,'touchmove',fix);	
	};	
	
	bind(document,'touchmove',goOn);
	bind(document,'touchend',goOn);
	function goOn(){
		clearInterval(timer1);
		timer1=setTimeout(fn1,t3);
	};
	
	fn1();
	function fn1(){
		clearInterval(timer);
		timer=setInterval(function(){
			iNow++;		
			fn();
			tweenMove(t1,obj,{'translateX':-iNow*iW},moveType);
		},t);
	};
	
	function fn(){
		if(iNow>iL/2){
			iNow%=iL/2;
			css(obj,'translateX',0+lDis);
		}else if(iNow<1){
			iNow=iL/2;
			css(obj,'translateX',-iW*(iL/2+1)+lDis );							
		}
		index=iNow%(iL/2);
		for(var	i=0;i<aLi.length;i++){
			aLi[i].classList.remove(styleClass);
		}
		aLi[index].classList.add(styleClass);
	};			
};

//绑定的方式阻止默认事件
function fix(ev){
	var ev=ev||event;
	ev.preventDefault();
};

//手机弹出菜单插件
//bt(控制按钮)，obj(遮罩层)，obj1（遮罩层包裹的菜单）
//json(菜单弹出时的属性)，json1（菜单收回时的属性）
//moveType（运动形式，推荐easeOut）
//t（遮罩层淡入淡出时间），t1（菜单弹出收回时间）
function menu(bt,obj,obj1,json,json1,moveType,t,t1){
	var oBody=document.getElementsByTagName('body')[0];
	obj.style.height=document.documentElement.clientHeight*2+'px';		
	obj.style.opacity=0;
	obj.style.filter='alpha(opacity:0)';
	
	bind(bt,'touchend',fn);
	function fn(){		
		oBody.style.overflowY='hidden';
		obj.style.display='block';
		for(attr in json1){		
			css(obj1,attr,json1[attr]);
		}		
		tweenMove(t,obj,{'opacity':100},moveType,function(){
			tweenMove(t1,obj1,json,moveType);
		});
	};
	
	bind(obj,'touchstart',fn2);
	function fn2(ev){
		var ev=ev||event;
		var iTop=ev.changedTouches[0].pageY;

		bind(obj,'touchend',fn1);
		function fn1(ev){
			var ev=ev||event;
			var iDis=ev.changedTouches[0].pageY-iTop;
			
			if(ev.target==obj&&Math.abs(iDis)==0){
				tweenMove(t1,obj1,json1,moveType,function(){
					tweenMove(t,obj,{'opacity':0},moveType,function(){
						obj.style.display='none';
						oBody.style.overflowY='auto';
					});					
				});		
			}						
		};
	};		
	
	bind(obj,'touchmove',fix);		
};

//电脑弹出菜单插件
//bt(控制按钮)，obj(遮罩层)，obj1（遮罩层包裹的菜单）
//json(菜单弹出时的属性)，json1（菜单收回时的属性）
//moveType（运动形式，推荐easeOut）
//t（遮罩层淡入淡出时间），t1（菜单弹出收回时间）
function menu1(bt,obj,obj1,json,json1,moveType,t,t1,Fn){
	var oBody=document.getElementsByTagName('body')[0];
	obj.style.height=document.documentElement.clientHeight*2+'px';		
	obj.style.opacity=0;
	obj.style.filter='alpha(opacity:0)';
	
	bind(bt,'mousedown',fn);
	function fn(){		
		oBody.style.overflowY='hidden';
		obj.style.display='block';
		for(attr in json1){		
			css(obj1,attr,json1[attr]);
		}		
		tweenMove(t,obj,{'opacity':100},moveType,function(){
			tweenMove(t1,obj1,json,moveType);
		});
		Fn&&Fn.call(bt);
	};
	
	bind(obj,'mousedown',fn2);
	function fn2(ev){
		var ev=ev||event;
		var iTop=ev.clientY;
	
		bind(obj,'mouseup',fn1);
		function fn1(ev){
			var ev=ev||event;
			var iDis=ev.clientY-iTop;
			if(ev.target==obj&&Math.abs(iDis)==0){
				tweenMove(t1,obj1,json1,moveType,function(){
					tweenMove(t,obj,{'opacity':0},moveType,function(){
						obj.style.display='none';
						oBody.style.overflowY='auto';
					});					
				});		
			}						
		};
	};		
	
	bind(obj,'mousemove',fix);		
};

//简单显示隐藏选项卡插件
//obj（选项卡控制按钮）
//obj1（选项卡显示隐藏的一组节点）
//styleClass（选项卡选中高亮的class名称）
function tab(obj,obj1,styleClass){
	for(var i=0;i<obj.length;i++){
		bind(obj[i],'click',fn);
	}
	function fn(){		
		for(var i=0;i<obj.length;i++){
			obj[i].classList.remove(styleClass);
			obj1[i].style.display='none';
			obj[i].index=i;
		}
		obj[this.index].classList.add(styleClass);
		obj1[this.index].style.display='block';
	};
};

//全选插件
//obj（全选按钮）
//obj1（所有选项的元素集合）
function allChecked(obj,obj1){
	bind(obj,'change',fn);
	function fn(){
		if(obj.checked==true){
			for(var i=0;i<obj1.length;i++){
				obj1[i].checked=true;
			}
		}else{
			for(var i=0;i<obj1.length;i++){
				obj1[i].checked=false;
			}
		}			
	};
	
	for(var i=0;i<obj1.length;i++){
		bind(obj1[i],'change',fn1);
	}
	fn1();
	function fn1(){
		for(var i=0;i<obj1.length;i++){
			if(obj1[i].checked==false){
				obj.checked=false;
				return;	
			}
			obj.checked=true;
		}
	};
};	

//回到顶部插件
//obj（回到顶部按钮）
//showPos（按钮出现的位置，默认一屏幕），pos（点击按钮后回到的位置，默认0）
//msec（定时器发生频率单位毫秒,默认1000/60），n（滚动多少次，默认20）
function goTop(obj,showPos,pos,msec,n){
	var iH=document.documentElement.scrollHeight||document.body.scrollHeight;
	var iCH=document.documentElement.clientHeight;
	var iB=getStyle(obj,'bottom');
	var oScrollTop=0;
	var timer=null;
	var onOff=false;
	
	document.onscroll=function(){
		oScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var oDisplay=getStyle(obj,'display');
		
		if(oScrollTop>(showPos||iCH)){
			if(oDisplay=='none'){
				obj.style.bottom=iB;
				obj.style.display='block';
				obj.style.opacity='0';
				obj.style.filter='alpha(opacity:0)';
				allMove(300,obj,{'opacity':100},'linear');	
			}			
		}else{
			if(oDisplay=='block'){
				if(onOff)return;
				onOff=true;
				obj.style.opacity='100';
				obj.style.filter='alpha(opacity:100)';
				allMove(300,obj,{'opacity':0},'linear',function(){
					obj.style.display='none';
					onOff=false;
				});		
			}	
		}
	};
	
	bind(obj,'click',fn);
	function fn(){
		unBind(obj,'click',fn);
		clearInterval(timer);
		timer=setInterval(function(){
			var outcome=oScrollTop-iH/(n||20);
			
			if(outcome<(pos||0))outcome=pos;
			document.documentElement.scrollTop=document.body.scrollTop=outcome;
			obj.style.bottom=parseInt(getStyle(obj,'bottom'))+iCH/(n||20)+'px';
			if(oScrollTop<=(pos||0)){
				clearInterval(timer);
				bind(obj,'click',fn);
			}
		},msec||1000/60);
	};
};

//label自定义样式绑定单选框插件（配合样式）
//obj（一组label标签的元素）
//classStyle（切换后的active样式）
//注意：label标签里面必须要有元素，而且块状化才能支持宽高
function labelFor(obj,classStyle){
	for(var i=0;i<obj.length;i++){
		obj[i].onchange=function(){
			for(var i=0;i<obj.length;i++){
				obj[i].classList.remove(classStyle);
			}
			
			if(this.children[0].checked){
				this.classList.add(classStyle);
			}
		};
	}
};

//label自定义样式绑定复选框框插件（配合样式）
function labelFor1(obj,classStyle){
	for(var i=0;i<obj.length;i++){
		obj[i].onchange=function(){
			this.children[0].checked?this.classList.add(classStyle):this.classList.remove(classStyle);
		};
	}
};

//手机无缝滚动插件（可以不给左右按钮）
//obj（滚动的父容器）
//msec（定时器发生频率单位毫秒），dis（滚动一次的距离）
//lB,rB（左右按钮，可以暂定和控制滚动方向）
function autoplay1(obj,mses,dis,lB,rB){
	var oLi=obj.children;
	var iW=oLi[0].offsetWidth;
	var timer=null;
	
	obj.innerHTML+=obj.innerHTML;
	obj.style.width=oLi[0].offsetWidth*oLi.length+'px';
	fn();
	function fn(){
		timer=setInterval(function(){	
			if(obj.offsetLeft<-obj.offsetWidth/2){
				obj.style.left=0+'px';
			}else if(obj.offsetLeft>0){
				obj.style.left=-obj.offsetWidth/2+'px';
			}
			obj.style.left=obj.offsetLeft+dis+'px';
		},mses);
	};	
			
	if(lB&&rB){
		bind(lB,'click',fn1);
		function fn1(){
			dis=-Math.abs(dis);
			fn3();
		};
		bind(rB,'click',fn2);
		function fn2(){
			dis=Math.abs(dis);
			fn3();
		};
	}	
	function fn3(){
		if(timer){
			clearInterval(timer);
			timer=null;
		}else{
			fn();
		}
	};
};

//电脑无缝滚动插件
//obj(轮播的父容器)
//prev(上一张的按钮)
//next(下一张的按钮)
//moveType(运动形式)
//t(轮播的间隔时间)
//t1(轮播一次的时间)
function autoplay2(obj,prev,next,moveType,t,t1){
	var oLi=obj.children;
	var iW=oLi[0].offsetWidth;
	var iNow=0;
	var over=false;
	var timer=null;
		
	obj.innerHTML+=obj.innerHTML;
	obj.style.width=oLi.length*iW+'px';
	prev.onclick=function(){
		if(over)return;
		over=true;
		iNow++;
		fn();
	};
	next.onclick=function(){
		if(over)return;
		over=true;
		iNow--;
		fn();		
	};
	obj.onmouseover=prev.onmouseover=next.onmouseover=function(){
		clearInterval(timer);
	};
	obj.onmouseout=prev.onmouseout=next.onmouseout=function(){
		fn1();
	};
	
	fn1();
	function fn1(){
		clearInterval(timer);
		timer=setInterval(prev.onclick,t);
	};
	function fn(){
		if(iNow>oLi.length/2){
			iNow%=oLi.length/2;
			css(obj,'translateX',0);
		}else if(iNow<0){
			iNow=oLi.length/2-1;
			css(obj,'translateX',-iW*oLi.length/2);							
		}
		tweenMove(t1,obj,{'translateX':-iW*iNow},moveType,function(){
			over=false;
		});
	};
};

//提示框插件
//str（提示的字符串）
//msec（提示框消失的时间，默认1秒）
function alerts(str,msec){
	var oQ=document.createElement('q');
	var msec=msec||1000;
	
	oQ.style.cssText='position:fixed; top:100px; left:50%; margin-left:-75px; min-width:140px; max-width:100%; height:50px; text-align:center; line-height:50px; padding:0 20px; border-radius:10px; box-sizing:border-box; background:rgba(0,0,0,0.6); color:#fff; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;z-index:10000';
	oQ.innerHTML=str;
	document.body.appendChild(oQ);

	oQ.style.marginLeft=-oQ.offsetWidth/2+'px';
	setTimeout(function(){
		document.body.removeChild(oQ);
	},msec);
};

//提示框带多条件阻止
//arr[{if:'','reg':/^$/,'value':,'str':''}]
//if（提示触发的条件）
//reg（正则匹配）
//value（正则验证的值）
//str（提示的字符串）
//msec（提示框消失的时间，默认1秒）
function alertss(arr,msec,endFn){
	var onOff=true;
	
	for(var i=0;i<arr.length;i++){
		if(arr[i].if){
			if(arr[i].reg){
				if(!arr[i].reg.test(arr[i].value)){
					alerts(arr[i].str,msec);	
					onOff=false;
					break;
				}
			}else{
				alerts(arr[i].str,msec);
				onOff=false;
				break;
			}			
		}
	}
	onOff&&endFn&&endFn();
};

//导航栏滑动插件
//obj（要滑动的容器）
//styleClass（高亮选中样式的类名）
//moveType（滑动的运动形式）
//t（每次滑动到达目标的运动时间）
function slide(obj,styleClass,moveType,t){
	var oA=obj.children;
	var iW=oA[0].offsetWidth;
	
	obj.style.width=iW*oA.length+'px';
	for(var i=0;i<oA.length;i++){
		oA[i].style.width=iW+'px';
	}
	var iMin=-(obj.offsetWidth-document.documentElement.clientWidth);
	
	for(var i=0;i<oA.length;i++){
		if(oA[i].className==styleClass){
			var iNowLeft=-oA[i].offsetLeft;
			
			if(iNowLeft<iMin)iNowLeft=iMin;
			tweenMove(t,obj,{'translateX':iNowLeft},moveType);
		}
	}
	bind(obj,'touchstart',fn);
	function fn(ev){
		var ev=ev||event;
		var iLeft=ev.changedTouches[0].pageX-css(obj,'translateX');
		
		bind(obj,'touchmove',fn1);
		function fn1(ev){
			var ev=ev||event;
			var iDis=ev.changedTouches[0].pageX-iLeft;
			
			if(iDis>0)iDis=0;
			if(iDis<iMin)iDis=iMin;
			tweenMove(t,obj,{'translateX':iDis},moveType);
		};		
	};
	bind(obj,'touchmove',fix);
};

//划屏惯性滚动插件（防隐藏元素）
//obj（要滑动的容器）
//msec（手指抬起时模拟惯性定时器的频率，不写默认为1000/60）
function slide1(obj,msec,n){
	var oA=obj.children;
	var iW=parseInt(getStyle(oA[0],'width'));
	var iLeft=0;
	var iL=0;
	var iT=0;
	var iDX=0;
	var iDX1=0;
	var iS=0;
	var iX=0;
	var iY=0;
	var iC=0;
	var timer=null;
	
	obj.style.width=iW*oA.length+'px';
	for(var i=0;i<oA.length;i++){
		oA[i].style.width=iW+'px';
	}
	var iMin=-(parseInt(getStyle(obj,'width'))-parseInt(getStyle(obj.parentNode,'width')) );

	bind(obj,'touchstart',fn);
	function fn(ev){
		var ev=ev||event;
		
		iLeft=ev.changedTouches[0].pageX-css(obj,'translateX');	
		iL=ev.changedTouches[0].pageX;
		iT=ev.changedTouches[0].pageY;
		bind(obj,'touchmove',fix);
	};
	
	bind(obj,'touchmove',fn1);
	function fn1(ev){
		var ev=ev||event;
		
		iDX=ev.changedTouches[0].pageX-iLeft;
		iX=ev.changedTouches[0].pageX-iL;	
		iY=ev.changedTouches[0].pageY-iT;	
		iS=iDX-iDX1;
		iDX1=iDX;
		iC=Math.abs(iX)-Math.abs(iY);

		iC>0?fn3():unBind(obj,'touchmove',fix);	
	};	
	function fn3(){
		if(iDX>0){
			iDX=0;
			clearInterval(timer);
		}
		if(iDX<iMin){
			iDX=iMin;
			clearInterval(timer);
		}
		css(obj,'translateX',iDX);
	};
	
	bind(obj,'touchend',fn2);
	function fn2(){
		if(iC>0){
			iS=iS*(n||2);
			clearInterval(timer);
			timer=setInterval(function(){
				iDX+=iS;
				iS<0?iS++:iS--;
				fn3();
				if(Math.abs(iS)<1)clearInterval(timer);	
			},msec||1000/60);
		}
	};
};

//两点滑动插件
//obj（要滑动的容器）
//t（到最大或最小位置的运动时间，不写默认为500毫秒）
function slide2(obj,t){
	var iLeft=0;
	var iLate=0;
	var iL=0;
	var iT=0;
	var iDX=0;
	var iDX1=0;
	var iS=0;
	var iX=0;
	var iY=0;
	var iC=0;
	var iTime=0;
	var iW=document.documentElement.clientWidth;
	var iMin=-(obj.offsetWidth-iW);
	
	bind(obj,'touchstart',fn);
	function fn(ev){
		var ev=ev||event;
		
		iTime=Date.now();
		iLate=css(obj,'translateX');	
		iLeft=ev.changedTouches[0].pageX-iLate;	
		iL=ev.changedTouches[0].pageX;
		iT=ev.changedTouches[0].pageY;
		bind(obj,'touchmove',fix);
	};
	
	bind(obj,'touchmove',fn1);
	function fn1(ev){
		var ev=ev||event;
		
		iDX=ev.changedTouches[0].pageX-iLeft;
		iX=ev.changedTouches[0].pageX-iL;	
		iY=ev.changedTouches[0].pageY-iT;	
		iS=iDX-iDX1;
		iDX1=iDX;
		iC=Math.abs(iX)-Math.abs(iY);

		iC>0?fn3():unBind(obj,'touchmove',fix);	
	};	
	function fn3(){
		if(iDX>0)iDX=0;
		if(iDX<iMin)iDX=iMin;

		css(obj,'translateX',iDX);
	};
	
	bind(obj,'touchend',fn2);
	function fn2(){
		if(iC>0){
			var iDW=0;
			var tDis=Date.now()-iTime;
			
			if(Math.abs(iX)>iW/3||tDis<300&&Math.abs(iX)>30){
				iDW=iX<0?iMin:0;
				tweenMove(t||500,obj,{'translateX':iDW},'linear');
			}else{
				tweenMove(t||500,obj,{'translateX':iLate},'linear');	
			}
		}
	};
};

//手机划屏翻页插件
//obj(轮播图的父容器)，obj1（高亮的小点的父容器），styleClass（高亮小点的样式）
//t（划屏滚动时间）
function slide3(obj,obj1,styleClass,t){
	var oLi=obj.children;
	var aLi=obj1.children;
	var iW=oLi[0].offsetWidth;
	var iL=oLi.length;
	var iLeft=0;
	var iTop=0;
	var lDis=0;
	var oTime=0;
	var iNow=0;
	var	index=0;
	var iOld=0;
	var str='';
	
	obj.style.width=iW*iL+'px';
	for(var i=0;i<iL;i++){
		oLi[i].style.width=iW+'px';
	}
	
	for(var i=0;i<iL;i++){
		str+='<li></li>';
	}
	obj1.innerHTML=str;	
	var iW1=obj1.offsetWidth;	
	obj1.style.marginLeft=-iW1/2+'px';
	aLi[0].classList.add(styleClass);
	
	bind(obj,'touchstart',fn2);
	function fn2(ev){
		var ev=ev||event;

		iLeft=ev.changedTouches[0].pageX;
		iTop=ev.changedTouches[0].pageY;
		oTime=Date.now();
	
		iOld=css(obj,'translateX');
		bind(obj,'touchmove',fix);
		bind(obj1,'touchmove',fix);			
	};
	
	bind(obj,'touchmove',fn3);
	function fn3(ev){
		var ev=ev||event;
		lDis=ev.changedTouches[0].pageX-iLeft;
		tDis=ev.changedTouches[0].pageY-iTop;
		var condition=Math.abs(lDis)-Math.abs(tDis);
		
		if(condition<0){
			unBind(obj,'touchmove',fix);
			unBind(obj1,'touchmove',fix);	
		}else{			
			if(css(obj,'translateX')>=0&&lDis>0||css(obj,'translateX')<=-iW*(iL-1)&&lDis<0){
				lDis/=3;
			}
			css(obj,'translateX',iOld+lDis);
		}
	};
		
	bind(obj,'touchend',fn4);
	function fn4(){			
		var tDis=Date.now()-oTime;
	
		if(Math.abs(lDis/iW)>0.3||tDis<300&&Math.abs(lDis)>30){
			lDis<0?iNow++:iNow--;
			fn();
			lDis=0;		
		}
		
		tweenMove(t,obj,{'translateX':-iNow*iW},'linear',function(){
			iOld=css(obj,'translateX');
		});
		unBind(obj,'touchmove',fix);
		unBind(obj1,'touchmove',fix);	
	};	
	
	function fn(){
		if(iNow>iL-1){
			iNow=iL-1;
		}else if(iNow<0){
			iNow=0;							
		}
		index=iNow;
		for(var	i=0;i<aLi.length;i++){
			aLi[i].classList.remove(styleClass);
		}
		aLi[index].classList.add(styleClass);
	};	
};

//公告滚动插件
//obj(要滚动的父容器)
//moveType(运动形式)
//t(滚动间隔)
//t1(滚动一次的时间)
function autoNotice(obj,moveType,t,t1){
	var oLi=obj.children;
	var iL=oLi.length*2;
	var iH=oLi[0].offsetHeight;
	var iNow=0;
			
	obj.innerHTML+=obj.innerHTML;
	setInterval(function(){
		iNow++;
		if(iNow>iL/2){
			iNow=1;
			css(obj,'translateY',0);
		}
		tweenMove(t1||1000,obj,{'translateY':-iNow*iH},moveType);		
	},t||2000);
};

//横向公告滚动插件
//obj(要滚动的父容器)
//dis(每次运动的距离)
//msec(定时器频率)
function autoNotice1(obj,dis,msec){
	var oLi=obj.children;
	var iL=oLi.length*2;
	var iW=0;
	var iNow=0;
			
	obj.innerHTML+=obj.innerHTML;
	for(var i=0;i<obj.children.length;i++){
		iW=obj.children[i].offsetWidth*iL;
	}		
	obj.style.width=iW+'px';
	
	setInterval(function(){
		if(css(obj,'translateX')<=-iW/2){
			css(obj,'translateX',-14);	
		}
		css(obj,'translateX',css(obj,'translateX')-(dis||1));
	},msec||30);
};

//模拟水印效果插件
//msec(水印运动的频率)
//obj(产生水印效果的容器)
//iDis(水印每步运动的距离)
//color(水印的颜色)
//color1(水印背景颜色)
//endFn(回调函数用来触发链接)
/*配置waterWave(20,oLi,5,'#ddd','#eee');*/
function waterWave(msec,obj,iDis,color,color1,endFn){	
	var timer=null;
	var timer1=null;
	var iLeft=0;
	var iTop=0;
	var iNum1=0;
	var iNum2=0;
	var iDate=0;
	var click=false;
	
	bind(obj,'touchstart',fn1);	
	function fn1(ev){
		clearInterval(timer);
		var ev=ev||event;
		click=false;
		
		iNum1=0;
		iNum2=0;		
		iLeft=ev.changedTouches[0].pageX-getPos(obj,'left');
		iTop=ev.changedTouches[0].pageY-getPos(obj,'top')-50;

		timer=setInterval(function(){							
			iNum1+=iDis;		
			obj.style.background='radial-gradient(circle at '+iLeft+'px '+iTop+'px,'+color+' '+(iNum1)+'%, #eee 0%) no-repeat ';	
			if(iNum1>=100){
				clearInterval(timer);
				setTimeout(function(){
					obj.style.background='none';
				},1000);
			}
		},msec);

		bind(obj,'contextmenu',fix);
	};
	
	bind(obj,'touchmove',function(){
		clearInterval(timer);
		obj.style.background='none';
	});
	
	bind(obj,'touchend',fn2);	
	function fn2(){
		clearInterval(timer);
		clearInterval(timer1);	
		iNum2=100-iNum1;
		timer1=setInterval(function(){
			iNum1+=Math.floor(iNum2/5);	
			
			obj.style.background='radial-gradient(circle at '+iLeft+'px '+iTop+'px,'+color+' '+(iNum1)+'%, '+color1+' 0%) no-repeat ';	
			if(iNum1>=100){
				clearInterval(timer);
				clearInterval(timer1);	
				obj.style.background='none';
				if(click){
					setTimeout(function(){
						endFn&&endFn.call(obj);
					},50);								
				}
			}
		},20);	
	};	
	
	bind(obj,'click',function(){
		click=true;
		fn2();
	});
};

//生成变色字体
//obj(包含字体的标签)
//color(变色字左边的颜色)
//color1(变色字右边的颜色)
//width(变色字左边的宽度，带上单位%或px)
function changeColorWords(obj,color,color1,width){
	var arr=[];
	var str='';
	var color=color||'red';
	var color1=color1||'blue';
	var width=width||'50%';
	var reg=/<!--(.|\n)+-->|\/\*(.|\n)+\*\/|\/\/(.|\n)+|\n+|\r|\s/g;
	
	arr=obj.innerHTML.replace(reg,'').split('');
	for(var i=0;i<arr.length;i++){
		str+='<i><b>'+arr[i]+'</b>'+arr[i]+'</i>';
	}
	obj.innerHTML=str;
	var oI=obj.getElementsByTagName('i');
	var oB=obj.getElementsByTagName('b');
	for(var i=0;i<oI.length;i++){
		oI[i].style.cssText='float:left; height:100%; font-style:normal; color:'+color+'; position:relative;';
		oB[i].style.cssText='font-weight:normal; width:'+width+'; height:100%; color:'+color1+'; position:absolute; left:0; top:0;overflow:hidden;';
	}
};

//手机模拟滚动插件(body定为一屏幕的高度)
//obj（要滚动的容器）
//sFn（touchstart回调）
//mFn（touchmove回调）
//eFn（touchend回调）
function pageScroll(obj,sFn,mFn,eFn){
	var iMin=document.documentElement.clientHeight-parseInt(getStyle(oDiv,'height'));
	var iTop=0;
	var iDisY=0;
	var iY=0;
	var iY1=0;
	var iS=0;
	var sY=0;
	var oldY=0;
	var timer=null;
	
	bind(obj,'touchstart',function(ev){
		var ev=ev||event;
		sY=ev.changedTouches[0].pageY;
		sFn&&sFn.call(this,sY);
	});
	bind(obj,'touchmove',function(ev){
		var ev=ev||event;				
		iDisY=ev.changedTouches[0].pageY-sY;
		iY=ev.changedTouches[0].pageY-sY+oldY;
		iS=iY-iY1;
		iY1=iY;
		
		if(css(obj,'translateY')>0||css(obj,'translateY')<iMin){
			iDisY/=5;
		}
		iTop=oldY+iDisY;
		if(iTop>50)iTop=50;
		if(iTop<iMin-50)iTop=iMin-50;
		css(obj,'translateY',iTop);
		mFn&&mFn.call(this,iTop);
	});
	function fn1(){
		if(iY>0){
			iY=0;
			clearInterval(timer);
		}
		if(iY<iMin){
			iY=iMin;
			clearInterval(timer);
		}
		css(obj,'translateY',iY);
	};
	bind(obj,'touchend',function(ev){
		var ev=ev||event;
		
		if(css(obj,'translateY')>0){
			tweenMove(500,obj,{'translateY':0},'linear',function(){
				oldY=css(obj,'translateY');
			});
		}else if(css(obj,'translateY')<iMin){
			tweenMove(500,obj,{'translateY':iMin},'linear',function(){
				oldY=css(obj,'translateY');
			});
		}else{
			oldY=css(obj,'translateY');
		}	
		
		iS=iS;
		clearInterval(timer);
		timer=setInterval(function(){
			iY+=iS;
			iS<0?iS++:iS--;
			fn1();
			if(Math.abs(iS)<1)clearInterval(timer);	
		},1000/60);
		eFn&&eFn.call(this,oldY,iS);
	});
};

//添加删除遮罩层
function mask(zIndex,onOff){
	if(!document.getElementById('pqxMask')&&onOff){
		var oMask=document.createElement('div');
		oMask.id='pqxMask';
		
		oMask.style.cssText='width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; z-index: 10;';
		oMask.style.zIndex=zIndex;
		document.body.appendChild(oMask);
	}
		
	if(document.getElementById('pqxMask')&&!onOff){
		document.body.removeChild(document.getElementById('pqxMask'));
	}	
};	

//创建一个loading样式
//mask(是否能看见遮罩)
//onOff(创建还是删除loading)
//scale(样式的大小比例)
//msec(旋转定时器的频率)
//zIndex(设置层级)
function loadingMask(mask,onOff,scale,msec,zIndex){
	if(!document.getElementById('pqxLoading')&&onOff){
		var oUl=document.createElement('i');
		var oli=oUl.getElementsByTagName('i');
		var sLi='';
		var iNum=0;
		var timer=null;		
		
		oUl.style.cssText='margin:auto; width:40px; height:40px; position: absolute; left:0; right:0; top:0; bottom:0;';
		oUl.id='pqxLoading';
		oUl.style.transform='scale('+(scale||1)+','+(scale||1)+')';
		oUl.style.WebkitTransform='scale('+(scale||1)+','+(scale||1)+')';		
		
		for(var i=0;i<12;i++){
			sLi+='<i></i>';		
		}	
		oUl.innerHTML=sLi;
		
		for(var i=0;i<12;i++){
			oli[i].style.cssText='list-style:none; width:4px; height:10px; background-color:rgba(255,255,255,0.5); position:absolute; left:20px; top:0; transform-origin:0 20px; -webkit-transform-origin:0 20px; border-radius:2px 2px 0 0;';	
		}
		
		var oDiv=document.createElement('div');
			
		oDiv.style.cssText='width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); position: fixed; top: 0; left: 0;';
		oDiv.id='pqxMask1';
		oDiv.style.zIndex=zIndex||10;
		
		oDiv.appendChild(oUl);
		document.body.appendChild(oDiv);
		if(!mask){
			oDiv.style.backgroundColor='rgba(0,0,0,0)';
		}
		
		for(var i=0;i<12;i++){
			oli[i].style.transform='rotate('+i*30+'deg)';
			oli[i].style.WebkitTransform='rotate('+i*30+'deg)';
		}
		
		fn1();
		timer=setInterval(fn1,msec||100);
		
		function fn1(){
			iNum++;
			
			for(var i=0;i<12;i++){
				oli[i].style.backgroundColor='rgba(155,155,155,0.5)';
			}
			oli[iNum%12].style.backgroundColor='rgba(55,55,55,0.9)';
			oli[(iNum+1)%12].style.backgroundColor='rgba(55,55,55,0.8)';
			oli[(iNum+2)%12].style.backgroundColor='rgba(55,55,55,0.7)';
			oli[(iNum+3)%12].style.backgroundColor='rgba(55,55,55,0.6)';
			oli[(iNum+4)%12].style.backgroundColor='rgba(55,55,55,0.5)';
			oli[(iNum+5)%12].style.backgroundColor='rgba(55,55,55,0.4)';
		};
	}
	
	if(document.getElementById('pqxLoading')&&!onOff){
		clearInterval(timer);
		document.body.removeChild(document.getElementById('pqxMask1'));		
	}	
};

//验证码防止刷新插件(多个按钮)
/*new UnReload([
	{
		obj:oBt1,//按钮
		obj1:oInput,//填写手机号的输入框(里面做了判断手机号码)
		num:10,//设置倒计时总秒数
		str1:null,//按钮未点击时候的文字
		str2:null,//按钮点击之后的文字
		lNum:'pqxNum1',//刷新时本地存储倒计时已走秒数的名称
		lTime:'pqxTime1',//刷新时本地存储当时时间戳的名称
		endFn:function(){//回调函数，这个函数仅在可点击状态执行一次
			console.log(111);
		}
	},
	{
	}
]);*/
function UnReload(option){
	this.option=option;
	for(var i=0;i<option.length;i++){
		option[i].iNum=0;
		option[i].timer=null;
		this.Click(option[i]);
		this.exist(option[i]);
		this.Unload();
	}	
};
UnReload.prototype={
	start:function(option){
		var This=this;
		clearInterval(option.obj.timer);			
		option.obj.classList.add('active');
		option.obj.innerHTML=((option.num+1)||60)-option.iNum+(option.str2||'s后重新发送');
		
		option.obj.timer=setInterval(function(){
			option.iNum++;
			
			if(option.iNum>=((option.num+1)||60)){			
				clearInterval(option.obj.timer);
				option.obj.classList.remove('active');
				option.obj.innerHTML=option.str1||'获取验证码';	
				option.iNum=0;
			}else{
				option.obj.innerHTML=((option.num+1)||60)-option.iNum+(option.str2||'s后重新发送');
			}			
		},1000);		
	},
	Click:function(option){	
		var This=this;
		
		option.obj.onclick=function(){				
			if(option.iNum>0&&option.iNum<((option.num+1)||60))return;
			if(option.obj1){
				if(!option.obj1.value){
					alerts('请填写手机号！');
					return;
				}else{
					var reg=/^1(3|4|5|7|8){1}\d{9}$/;
					
					if(!reg.test(option.obj1.value)){
						alerts('手机号格式错误！');
						return;
					}
				}
			}	
			option.endFn&&option.endFn.call(option.obj);
			option.iNum=1;	
			This.start(option);
		};		
	},
	exist:function(option){
		var pqxNum=+(window.localStorage.getItem(option.lNum||'pqxNum'));
		var pqxTime=+(window.localStorage.getItem(option.lTime||'pqxTime'));
		
		if(pqxNum){		
			var nTime=Math.round((+new Date()-pqxTime)/1000);
		
			option.iNum=((+pqxNum)+(+nTime));
			if(option.iNum>0&&option.iNum<=((option.num+1)||60)){
				this.start(option);
			}		
		}
	},
	Unload:function(){
		var This=this;
		window.onunload=function(){
			for(var i=0;i<This.option.length;i++){
				window.localStorage.setItem(This.option[i].lNum||'pqxNum',+This.option[i].iNum);
				window.localStorage.setItem(This.option[i].lTime||'pqxTime',+new Date());
			}		
		};
	}
};

//抛物线运动插件(公式：y=ax^2+bx^2+c)
//obj(要运动的对象)
//a(曲率，为正开口向下，负开口向上，默认0.001)
//t(抛物线运动的总时间)
//t1(定时器的频率)
//sLeft(运动开始的x轴位置)
//sTop(运动开始的y轴位置)
//eLeft(运动结束的x轴位置)
//eTop(运动结束的y轴位置)
//stepFn(运动过程中的回调函数)
//endFn(运动结束后的回调函数)
function fly(obj,a,t,t1,sLeft,sTop,eLeft,eTop,stepFn,endFn){	
	var a=a||0.001;	
	var sLeft=sLeft||0;
	var sTop=sTop||0;
	var eLeft=eLeft||200;
	var eTop=eTop||200;	
	
	var timer=null;	
	var	sT=+new Date();
	var t=t||500;
	var eT=sT+t;
	var x=eLeft-sLeft;
	var y=eTop-sTop;
	var b=(y-a*x*x)/x;
	
	obj.style.position='absolute';
	clearInterval(timer);
	timer=setInterval(function(){
		var nT=+new Date();	
		
		if(nT>eT){//当前时间大于结束时间就停止运动
			clearInterval(timer);		
			obj.style.transform='translate3d('+eLeft+'px,'+eTop+'px,0)';
			obj.style.WebkitTransform='translate3d('+eLeft+'px,'+eTop+'px,0)';
			endFn&&endFn.call(this);	
		}else{
			var disX=eLeft*(nT-sT)/t;
			var disY=a*disX*disX+b*disX;
							
			obj.style.transform='translate3d('+sLeft+disX+'px,'+sTop+disY+'px,0)';
			obj.style.WebkitTransform='translate3d('+sLeft+disX+'px,'+sTop+disY+'px,0)';					
			stepFn&&stepFn.call(this,sLeft+disX,sLeft+disX);	
		}
	},t1||1000/60);
};

/*引入百度地图插件<script src="https://api.map.baidu.com/api?v=2.0"></script>*/
//定位当前城市(需要引入jq)
function getLocation(endFn) {
	var options={
		enableHighAccuracy:true,
		maximumAge:1000
	}
	
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			//获取经纬度成功(mo浏览器上,调用百度地图接口，传入经纬度获取城市)
			var longitude=position.coords.longitude;//经度
			var latitude=position.coords.latitude;//纬度
			var map=new BMap.Map("allmap");
			var point=new BMap.Point(longitude,latitude);
			var gc=new BMap.Geocoder();
			
			gc.getLocation(point,function(rs){
				var addComp=rs.addressComponents;
				
				if(addComp.city.charAt(addComp.city.length-1)=='市'){
					addComp.city=addComp.city.replace('市','');
				}								
				endFn&&endFn(addComp.city,longitude,latitude);
			});    			       
		},function(error){//获取经纬度失败 (pc浏览器上，调用新浪接口获取城市)   	
			var url='http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
			
			$.getScript(url,function(){
				if(remote_ip_info.ret=='1'){
					endFn&&endFn(remote_ip_info.city);
				}
			});
		},options);
	}else{
		alert('您的浏览器不支持地理位置定位');
	}
};

//高德定位接口
//<script src="https://webapi.amap.com/maps?v=1.3&key=c14b6228b5ae543b1718ab6ebc4d19f5"></script>
function getLocation1(endFn) {
	mapObj = new AMap.Map('container');
	mapObj.plugin('AMap.Geolocation', function () {
		geolocation = new AMap.Geolocation({
			enableHighAccuracy: true,//是否使用高精度定位，默认:true
			timeout: 10000,          //超过10秒后停止定位，默认：无穷大
			maximumAge: 0,           //定位结果缓存0毫秒，默认：0
			convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
			showButton: true,        //显示定位按钮，默认：true
			buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
			buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
			showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
			panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
			zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		});
		mapObj.addControl(geolocation);
		AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
		AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
		function onComplete(data){
			endFn&&endFn(data.addressComponent.city,data.position.I,data.position.M,data.addressComponent.province,data.formattedAddress);//http维度为L，https维度为M 
		};
		function onError(data){
			console.log(data);
			endFn&&endFn('南昌市',115.89,28.68,'江西省');
		};
		//获取当前位置信息
		getCurrentPosition();
		function getCurrentPosition () {
			geolocation.getCurrentPosition();
		};	
		//监控当前位置并获取当前位置信息
		function watchPosition () {
			geolocation.watchPosition();
		};
	});
};

//新浪天气接口(需要引入jq)
function getWeather(city,endFn){
	var url='http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
	var str=city.charAt(city.length-1);
	
	switch(str){
		case '市':
			city=city.substring(0,city.length-1);
			break;
		case '区':
			city=city.substring(0,city.length-2);
			break;
	}		
	$.getScript(url,function(){
		if(remote_ip_info.ret=='1'){
			$.ajax({
				url:'http://wthrcdn.etouch.cn/weather_mini?city='+city,
				type:'GET',                    
				data:'',
				success:function(data){
					var data1=JSON.parse(data);
					
					if(data1.status==1000){
						var data2=JSON.parse(data);

						data2=data2.data.forecast[0];
						data2.status=data1.status;
						console.log('获取'+city+'天气成功！');
						endFn&&endFn(data2);
					}else{
						console.log('获取'+city+'天气失败！');
					}
				}
			});
		}
	});
};



<!--不常用插件-->
//预加载插件
//arr(预加载的一组图片地址)
function preload(arr,endFn){   
    var newimages=[];
    var iNum=0;
    
    function loadOver(){
        iNum++;
        if(iNum==arr.length){
            endFn&&endFn(newimages);
        }
    }
    for(var i=0;i<arr.length;i++){
        newimages[i]=new Image();
        newimages[i].src=arr[i];
        newimages[i].onload=function(){
            loadOver();
        }
        newimages[i].onerror=function(){
            loadOver();
        }
    }   
};

//懒加载插件(图片无地址时)
//img(页面上需要懒加载图片的集合))
//dataSrc(后台调的路径)
//dis(页面滚动到距离图片多少开始加载，默认0
function lazyLoading(img,dataSrc,dis){
	var dis=dis||0;
	
	document.onscroll=fn;
	fn();
	function fn(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var dH=document.documentElement.clientHeight+scrollTop;
		var lH=0;
		var index=0;
		
		for(var i=0;i<img.length;i++){
			lH=getPos(img[i],'top');
			if(dH>lH-dis){
				index=i;				
			}
		}
		for(var i=0;i<index+1;i++){
			img[i].src=img[i].getAttribute(dataSrc);
		}
	};
};

//懒加载插件(图片有地址时)
//img(页面上需要懒加载图片的集合)
//dis(页面滚动到距离图片多少开始加载，默认0)
function lazyLoading1(img,dis){
	var dis=dis||0;
	
	for(var i=0;i<img.length;i++){
		img[i].setAttribute('dataSrc',img[i].src);
		img[i].src='';
	}
	document.onscroll=fn;
	fn();
	function fn(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var dH=document.documentElement.clientHeight+scrollTop;
		var lH=0;
		var index=0;
		
		for(var i=0;i<img.length;i++){				
			lH=getPos(img[i],'top');
			if(dH>lH-dis){
				index=i;				
			}
		}
		for(var i=0;i<index+1;i++){
			img[i].src=img[i].getAttribute('dataSrc');
		}
	};
};

//ajax
function ajax(method,url,data,success){
	var xhr=null;
	try{
		xhr=new XMLHttpRequest();
	}catch(e){
		xhr=new ActiveXObject('Microsoft.XMLHTTP');
	}	
	if(method=='get'&&data)url+='?'+data;
	xhr.open(method,url,true);
	if(method=='get'){
		xhr.send();
	}else{
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	xhr.onreadystatechange=function(){	
		if(xhr.readyState==4){
			xhr.status==200?success&&success(xhr.responseText):console.log('出错了,Err'+xhr.status);
		}	
	}
};

//利用原生ajax的瀑布流做法
//obj（存放加载列表元素的父容器）
//url（定义好echo json格式字符串的php文件）
//page（所有页的数据，问号后面到=iNum前面的一串字符）
//dis（下拉时滚动条与底部的距离数值为多少开始加载）
//endFn（没有数据时的返还函数）
function ajaxLoad(obj,url,page,dis,endFn){
	var aLi=obj.children;
	var iNum=0;
	var over=true;
	
	//初始化数据处理
	getList();	
	function getList(){
		ajax('get',url,page+'='+iNum,function(data){	
			var data=JSON.parse(data);
			//console.log(data);
			
			if(!data.length ){
				//后续没有数据了
				endFn&&endFn.call(obj);
				return;
			}		
			for (var i=0;i<data.length;i++){				
				//获取高度最短的li
				var _index=getShort();
				
				//瀑布流写法
				/*var oDiv=document.createElement('div');

				oDiv.innerHTML+='<a href="'+data[i].url+'"><img src="'+data[i].image+'"/><p>'+data[i].title+'</p>';	
				aLi[_index].appendChild(oDiv);*/	
				
				//普通写法
				obj.innerHTML+='<li><a href="'+data[i].url+'"><img src="'+data[i].img+'"/><div><h3>'+data[i].title+'</h3><p>'+data[i].time+'</p></div></a></li>';
			}	
			over=true;	
		});
	};
	
	document.onscroll=function(){	
		var _index=getShort();
		var oLi=aLi[_index];	
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var dH=document.documentElement.clientHeight+scrollTop;
		var lH=oLi.offsetHeight+getPos(oLi,'top');

		if (dH>lH-dis){		
			if (over){
				over=false;
				iNum++;
				getList();
			}	
		}	
	};
	
	//获取最短li的索引值
	function getShort(){
		var index=0;
		var ih=aLi[index].offsetHeight;
		for (var i=1;i<aLi.length;i++) {
			if(aLi[i].offsetHeight<ih) {
				index=i;
				ih=aLi[i].offsetHeight;
			}
		}
		return index;
	}
};

<!--canvas封装-->

var cv={
	init:function(json){
		this.c=json.obj;
		this.c.width=json.width;
		this.c.height=json.height;	
		this.c.style.background=json.background;	
		this.cg=this.c.getContext('2d');
	},

	boxShadow:function(json){
		this.cg.shadowOffsetX=json.boxShadow[0];
		this.cg.shadowOffsetY=json.boxShadow[1];
		this.cg.shadowBlur=json.boxShadow[2];
		this.cg.shadowColor=json.boxShadow[3];
	},
	
	fillRect:function(json){
		//背景色
		this.cg.fillStyle=json.background;
		
		//线性渐变
		if(json.linearGradient){
			var gradient=this.cg.createLinearGradient(json.linearGradient.startXY[0],json.linearGradient.startXY[1],json.linearGradient.endXY[0],json.linearGradient.endXY[1]);
			for(var i=0;i<json.linearGradient.color.length;i++){
				gradient.addColorStop(json.linearGradient.color[i][0],json.linearGradient.color[i][1]);
			}
			this.cg.fillStyle=gradient;
		}		
		
		//环形渐变
		if(json.radialGradient){
			var gradient=this.cg.createRadialGradient(json.radialGradient.startXYR[0],json.radialGradient.startXYR[1],json.radialGradient.startXYR[2],json.radialGradient.endXYR[0],json.radialGradient.endXYR[1],json.radialGradient.endXYR[2]);
			for(var i=0;i<json.radialGradient.color.length;i++){
				gradient.addColorStop(json.radialGradient.color[i][0],json.radialGradient.color[i][1]);
			}
			this.cg.fillStyle=gradient;
		}	
		
		//填充
		this.cg.fillRect(json.xy[0],json.xy[1],json.width,json.height);	
	},
	
	strokeRect:function(json){
		//边框
		this.cg.lineWidth=json.border[0];
		this.cg.strokeStyle=json.border[1];
		
		//线性渐变
		if(json.linearGradient){
			var gradient=this.cg.createLinearGradient(json.linearGradient.startXY[0],json.linearGradient.startXY[1],json.linearGradient.endXY[0],json.linearGradient.endXY[1]);
			for(var i=0;i<json.linearGradient.color.length;i++){
				gradient.addColorStop(json.linearGradient.color[i][0],json.linearGradient.color[i][1]);
			}
			this.cg.strokeStyle=gradient;
		}		
		
		//环形渐变
		if(json.radialGradient){
			var gradient=this.cg.createRadialGradient(json.radialGradient.startXYR[0],json.radialGradient.startXYR[1],json.radialGradient.startXYR[2],json.radialGradient.endXYR[0],json.radialGradient.endXYR[1],json.radialGradient.endXYR[2]);
			for(var i=0;i<json.radialGradient.color.length;i++){
				gradient.addColorStop(json.radialGradient.color[i][0],json.radialGradient.color[i][1]);
			}
			this.cg.strokeStyle=gradient;
		}	
		
		//填充
		this.cg.strokeRect(json.xy[0],json.xy[1],json.width,json.height);	
	},
	
	lineFill:function(json){
		//背景色
		this.cg.fillStyle=json.background;
		
		//画线
		this.cg.beginPath();
		for(var i=0;i<json.xyArr.length;i++){
			this.cg.lineTo(json.xyArr[i][0],json.xyArr[i][1]);
		}
		this.cg.closePath();
		this.cg.fill();
	},
	
	lineStroke:function(json){
		//边框
		this.cg.lineWidth=json.border[0];
		this.cg.strokeStyle=json.border[1];
		
		//画线
		this.cg.beginPath();
		for(var i=0;i<json.xyArr.length;i++){
			this.cg.lineTo(json.xyArr[i][0],json.xyArr[i][1]);
			this.cg.stroke();
		}
		this.cg.closePath();	
	},
	
	arcFill:function(json){
		//背景色
		this.cg.fillStyle=json.background;
		
		this.cg.beginPath();
		this.cg.lineTo(json.xyr[0],json.xyr[1]);
		this.cg.arc(json.xyr[0],json.xyr[1],json.xyr[2],json.sAngle*Math.PI/180,json.eAngle*Math.PI/180,json.clock);
		this.cg.fill();
		this.cg.closePath();
	},
	
	arcStroke:function(json){
		//边框
		this.cg.lineWidth=json.border[0];
		this.cg.strokeStyle=json.border[1];
		
		this.cg.beginPath();
		if(json.line){
			this.cg.lineTo(json.xyr[0],json.xyr[1]);
		}	
		this.cg.arc(json.xyr[0],json.xyr[1],json.xyr[2],json.sAngle*Math.PI/180,json.eAngle*Math.PI/180,json.clock);
		this.cg.stroke();
		this.cg.closePath();
	},
	
	arcTo:function(json){
		//边框
		this.cg.lineWidth=json.border[0];
		this.cg.strokeStyle=json.border[1];
		
		this.cg.beginPath();
		this.cg.lineTo(json.sTo[0],json.sTo[1]);
		this.cg.lineTo(json.mTo[0],json.mTo[1]);
		this.cg.arcTo(json.xyx1y1r[0],json.xyx1y1r[1],json.xyx1y1r[2],json.xyx1y1r[3],json.xyx1y1r[4]);
		this.cg.lineTo(json.eTo[0],json.eTo[1]);
		this.cg.stroke();
		this.cg.closePath();
	}
};

//生成3D文字球体，圆锥，圆柱，扭曲圆柱
//str（自定义文字，满42个才会生成，不然显示默认的）
//shape（定义生成球体的形状，0=球体，1=圆锥，2=圆柱，3=扭曲圆柱）
//width（生成容器的宽度，决定球体的相对宽度）
//t（动画定时器每次的时间）
//t1（自运动时间）
function setCss31(obj,attrObj){//依赖此函数设置样式
	for (var i in attrObj) {
		var newi=i;
		
		if(newi.indexOf("-")>0){
		var num=newi.indexOf("-");
		
		newi=newi.replace(newi.substr(num,2),newi.substr(num+1,1).toUpperCase());
		}
	
		obj.style[newi]=attrObj[i];
		newi=newi.replace(newi.charAt(0),newi.charAt(0).toUpperCase());
		obj.style["webkit"+newi]=attrObj[i];
		obj.style["moz"+newi]=attrObj[i];
		obj.style["o"+newi]=attrObj[i];
		obj.style["ms"+newi]=attrObj[i];
	}
};
function solid(str,shape,width,t,t1){
	var s = '自定义文字一定要满四十二个字 自定义文字一定要满四十二个字 自定义文字一定要满四十二个字 自定义文字一定要满四十二个字 自定义文字一定要满四十二个字 自定义文字一定要满四十二个字';
	if(str&&str.length>41)s = str;
	var oDiv = document.createElement('div');
	var oUl = document.createElement('ul');
	var aLi = oUl.getElementsByTagName('li');
	var r = width/3||100;
	var circleArr = [];
	var coneArr = [];
	var coneNum = 0;
	var wordNum = -1;
	var liNub = 0;
	var theta = 0;
	var phi = 0;
	var layer = 0;
	var num = 0;
	var iTimer2 = 0;
	var graph = 1;
	var columnH = 0;
	var columnNum = 0;
	
	oDiv.className='solid';
	oDiv.style.cssText='width:300px;height:300px;margin:0 auto;color:#00a0e9;position:relative;left:0;top:0;';
	oUl.style.cssText='margin:0;padding:0;width:100%;height:100%;position: relative;transform-style:preserve-3d;-webkit-transform-style:preserve-3d; perspective-origin:center center;-webkit-perspective-origin:center center;';	
	oDiv.style.width=(width||300)+'px';
	oDiv.style.height=(width||300)+'px';		
	oDiv.appendChild(oUl);
	document.body.appendChild(oDiv);
	
	var iW=oDiv.offsetWidth/2;
	var dW=document.documentElement.clientWidth*2;

	star();
	function star(){
		circleArr = [];
		coneArr = [];
		coneNum = 0;
		wordNum = -1;
		liNub = 0;
		theta = 0;
		phi = 0;
		layer = 0;
		num = 0;
		graph = 1;
		
		for(var i=4; i<13; i++){
			num = i*i + (i+1)*(i+1);
			if(num >= s.length){
				layer = (i-1)*2+1;
				break;
			}
			layer = (i-1)*2+1;
		}
		for(var i=0; i<layer; i++){
			if(i<(layer+1)/2){
				wordNum+=2;
			}else{
				wordNum-=2;
			}
			circleArr.push(wordNum);
		}
		
		num = 0;
		
		for(var i=0; i<circleArr.length; i++){
			theta = Math.PI/circleArr.length;
			phi = 2*Math.PI/circleArr[i];
			for(var j=0; j<circleArr[i]; j++){
				var li = document.createElement('li');
				
				li.style.cssText=' list-style:none;line-height:30px;text-align:center;font-size:16px;position:absolute;transition:all 0.5s;-webkit-transition:all 1s;';
				li.innerHTML = s[num];
				num++;
				drawCircle(li,theta,phi,i,j);
				oUl.appendChild(li);
			}
		}

		for(var i=0; i<aLi.length; i++){
			coneNum += 2*i+1;
			if(coneNum>aLi.length){
				coneNum -= 2*i+1;
				break;
			}
			coneArr.push(2*i+1);
		}

		for(var i=0; i<coneArr.length; i++){
			phi = 2*Math.PI/coneArr[i];
			for(var j=0; j<coneArr[i]; j++){
				drawCone(aLi[liNub],phi,i,j);
				liNub++;
			}
		}

		liNub = 0;
		columnH = Math.floor(aLi.length/(circleArr.length-2));
		columnNum = columnH*(circleArr.length-2);
		
		for(var i=0; i<circleArr.length-1; i++){
			phi = 2*Math.PI/columnH;
			for(var j=0; j<columnH; j++){
				drawColumn(aLi[liNub],phi,i,j);
				drawColumn2(aLi[liNub],phi,i,j);
				liNub++;
			}
		}

		for(var i=0; i<aLi.length; i++){
			setCss31(aLi[i],{transform:'translate3D('+ aLi[i].circleX +'px,'+ aLi[i].circleY +'px,'+ aLi[i].circleZ +'px) rotateY('+ aLi[i].circlePhi +'rad) rotateX('+ (aLi[i].circleTheta-Math.PI/2) +'rad)'});
		}
	}
	
	function drawCircle(obj,theta,phi,i,j){
		obj.circleX = r*Math.sin(theta*i)*Math.sin(phi*j) + iW;
		obj.circleY = -r*Math.cos(theta*i) + iW;
		obj.circleZ = r*Math.sin(theta*i)*Math.cos(phi*j);
		obj.circleTheta = theta*(circleArr.length-i);
		obj.circlePhi = phi*j;
		obj.bigCircleX = (r+dW)*Math.sin(theta*i)*Math.sin(phi*j) + iW;
		obj.bigCircleY = -(r+dW)*Math.cos(theta*i) + iW;
		obj.bigCircleZ = (r+dW)*Math.sin(theta*i)*Math.cos(phi*j);
		obj.maxX = obj.bigCircleX;
		obj.maxY = obj.bigCircleY;
		obj.maxZ = obj.bigCircleZ;
		obj.maxTheta = obj.circleTheta;
		obj.maxPhi = obj.circlePhi;
	}
	
	function drawCone(obj,phi,i,j){
		obj.coneX = (2*r/coneArr.length)*i*Math.tan(30*Math.PI/180)*Math.sin(phi*j) + iW;
		obj.coneY = (2*r/coneArr.length)*i + r/2;
		obj.coneZ = (2*r/coneArr.length)*i*Math.tan(30*Math.PI/180)*Math.cos(phi*j);
		obj.coneTheta = Math.PI/6;
		obj.conePhi = phi*j;
		obj.bigConeX = (2*(r+dW)/coneArr.length)*i*Math.tan(30*Math.PI/180)*Math.sin(phi*j) + iW;
		obj.bigConeY = (2*(r+dW)/coneArr.length)*i + r/2-dW;
		obj.bigConeZ = (2*(r+dW)/coneArr.length)*i*Math.tan(30*Math.PI/180)*Math.cos(phi*j);
	}
	
	function drawColumn(obj,phi,i,j){
		obj.columnX = r/1.5*Math.sin(phi*j) + iW;
		obj.columnY = (2*r/(circleArr.length-2))*i + r/2;
		obj.columnZ = (r/1.5*Math.cos(phi*j)).toFixed(2);
		obj.columnPhi = phi*j;
		obj.bigColumnX = (r+dW)/1.5*Math.sin(phi*j) + iW;
		obj.bigColumnY = (2*(r+dW)/(circleArr.length-2))*i + r/2-dW;
		obj.bigColumnZ = ((r+dW)/1.5*Math.cos(phi*j)).toFixed(2);
	}

	function drawColumn2(obj,phi,i,j){
		obj.column2X = r/1.5*Math.sin(phi*j+i*Math.PI/180*8) + iW;
		obj.column2Y = (2*r/(circleArr.length-2))*i + r/2;
		obj.column2Z = (r/1.5*Math.cos(phi*j+i*Math.PI/180*8)).toFixed(2);
		obj.column2Phi = phi*j+i*Math.PI/180*8;
		obj.bigColumn2X = (r+dW)/1.5*Math.sin(phi*j+i*Math.PI/180*8) + iW;
		obj.bigColumn2Y = (2*(r+dW)/(circleArr.length-2))*i + r/2-dW;
		obj.bigColumn2Z = ((r+dW)/1.5*Math.cos(phi*j+i*Math.PI/180*8)).toFixed(2);
	}

	function startChange(){
		for(var i=0; i<aLi.length; i++) {
			setCss31(aLi[i], {transform: 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY(' + aLi[i].maxPhi + 'rad) rotateX(' + (aLi[i].maxTheta - Math.PI / 2) + 'rad)'});
			aLi[i].style.opacity = 0;
		}
	}

	function changeCircle(){
		for(var i=0; i<columnNum; i++){
			aLi[i].maxX = aLi[i].bigCircleX;
			aLi[i].maxY = aLi[i].bigCircleY;
			aLi[i].maxZ = aLi[i].bigCircleZ;
			aLi[i].maxTheta = aLi[i].circleTheta;
			aLi[i].maxPhi = aLi[i].circlePhi;
			setCss31(aLi[i], {transform: 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY(' + aLi[i].maxPhi + 'rad) rotateX(' + (aLi[i].maxTheta - Math.PI / 2) + 'rad)'});
		}

		setTimeout(function() {
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].style.opacity = 1;
				setCss31(aLi[i], {transform: 'translate3D(' + aLi[i].circleX + 'px,' + aLi[i].circleY + 'px,' + aLi[i].circleZ + 'px) rotateY(' + aLi[i].circlePhi + 'rad) rotateX(' + (aLi[i].circleTheta - Math.PI / 2) + 'rad)'});
			}
		},t||100);
	}

	function changeCone(){
		for(var i=0; i<coneNum; i++){
			aLi[i].maxX = aLi[i].bigConeX;
			aLi[i].maxY = aLi[i].bigConeY;
			aLi[i].maxZ = aLi[i].bigConeZ;
			aLi[i].maxPhi = aLi[i].conePhi;
			aLi[i].maxTheta = aLi[i].coneTheta;
			setCss31(aLi[i],{transform:'translate3D('+ aLi[i].maxX +'px,'+ aLi[i].maxY +'px,'+ aLi[i].maxZ +'px) rotateY('+ aLi[i].maxPhi +'rad) rotateX('+ aLi[i].maxTheta +'rad)'});
		}

		setTimeout(function(){
			for(var i=0; i<coneNum; i++){
				aLi[i].style.opacity = 1;
				setCss31(aLi[i],{transform:'translate3D('+ aLi[i].coneX +'px,'+ aLi[i].coneY +'px,'+ aLi[i].coneZ +'px) rotateY('+ aLi[i].conePhi +'rad) rotateX('+ aLi[i].coneTheta +'rad)'});
			}
		},t||100)
	}
	
	function changeColumn(){
		for(var i=0; i<columnNum; i++){
			aLi[i].maxX = aLi[i].bigColumnX;
			aLi[i].maxY = aLi[i].bigColumnY;
			aLi[i].maxZ = aLi[i].bigColumnZ;
			aLi[i].maxTheta = 0;
			aLi[i].maxPhi = aLi[i].columnPhi;
			setCss31(aLi[i],{transform:'translate3D('+ aLi[i].maxX +'px,'+ aLi[i].maxY +'px,'+ aLi[i].maxZ +'px) rotateY('+ aLi[i].maxPhi +'rad) rotateX('+ aLi[i].maxTheta +'rad)'});
		}

		setTimeout(function(){
			for(var i=0; i<columnNum; i++){
				aLi[i].style.opacity = 1;
				setCss31(aLi[i], {transform: 'translate3D(' + aLi[i].columnX + 'px,' + aLi[i].columnY + 'px,' + aLi[i].columnZ + 'px) rotateY(' + aLi[i].columnPhi + 'rad)'});
			}
		},t||100);
	}

	function changeColumn2(){
		for(var i=0; i<columnNum; i++){
			aLi[i].maxX = aLi[i].bigColumn2X;
			aLi[i].maxY = aLi[i].bigColumn2Y;
			aLi[i].maxZ = aLi[i].bigColumn2Z;
			aLi[i].maxTheta = 0;
			aLi[i].maxPhi = aLi[i].column2Phi;
			setCss31(aLi[i],{transform:'translate3D('+ aLi[i].maxX +'px,'+ aLi[i].maxY +'px,'+ aLi[i].maxZ +'px) rotateY('+ aLi[i].maxPhi +'rad) rotateX('+ aLi[i].maxTheta +'rad)'});
		}

		setTimeout(function() {
			for (var i = 0; i < columnNum; i++) {
				aLi[i].style.opacity = 1;
				setCss31(aLi[i], {transform: 'translate3D(' + aLi[i].column2X + 'px,' + aLi[i].column2Y + 'px,' + aLi[i].column2Z + 'px) rotateY(' + aLi[i].column2Phi + 'rad)'});
			}
		},t||100)
	}
	
	startChange();
	switch(shape){
		case 0:changeCircle();break;
		case 1:changeCone();break;
		case 2:changeColumn();break;
		case 3:changeColumn2();break;
		default:changeCircle();
	}	
	
	oDiv.onmousedown = function(ev){
		clearInterval(iTimer);
		var e = ev || event;
		var clickX = e.clientX;
		var clickY = e.clientY;
		var disX = 0;
		var disY = 0;

		document.onmousemove = function(ev){
			var e = ev || event;
			disX = e.clientX - clickX;
			disY = e.clientY - clickY;
			setCss31(oUl,{ transform: 'rotateX('+ (angleX-disY) +'deg) rotateY('+ (angleY+disX) +'deg)' });
		}

		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			angleX = angleX-disY;
			angleY = angleY+disX;
			if(disY==0 && disX==0){
				disX = -iW;
			}
			iTimer = setInterval(function(){
				angleX -= disY/100;
				angleY += disX/100;
				setCss31(oUl,{ transform: 'rotateX('+ angleX +'deg) rotateY('+ angleY +'deg)' });
			},t1||60);
		}
		return false;
	};

	var angleX = 0;
	var angleY = 0;
	var iTimer = setInterval(function(){
		angleY -= 1;
		setCss31(oUl,{ transform: 'rotateX('+ angleX +'deg) rotateY('+ angleY +'deg)' });
	},t1||60);
};