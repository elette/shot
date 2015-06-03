// 윈도우 팝업창 띄우기
function openWin(url, winName, intWidth, intHeight) {
	var winPosLeft = (screen.width - intWidth) / 2; // 새창 Y 좌표
	var winPosTop = (screen.height - intHeight) / 2; // 새창 X 좌표
	var winOpt = "width="+intWidth+",height="+intHeight+",top="+winPosTop+",left="+winPosLeft+'location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no';
	window.open(url, winName, winOpt);
}

// 윈도우 Modal 팝업창 띄우기
function openWinModal(url, winName, intWidth, intHeight) {
	var winPosLeft = (screen.width - intWidth) / 2; // 새창 Y 좌표
	var winPosTop = (screen.height - intHeight) / 2; // 새창 X 좌표
 	window.showModalDialog (url, window, "dialogWidth:"+intWidth+"px;dialogHeight:"+intHeight+"px;dialogTop="+winPosTop+";dialogLeft="+winPosLeft+';scroll:0;status:0;help:0;resizable:0;');
}

// 달력 팝업창
function openCalendar(pst){
	inpst = pst;
	openWinModal("../../../js/Calendar.html","Calendar","280","231");
}

// 화면 가운데로 창 띄우기
function openWinCenter(url, wname, wopt) {
	var newopt = "", wHeight = 0, wWidth = 0;
	if (wopt != 'undefined') {
		var woptlist = wopt.replace(/ /g, "").split(",");
		for (var i in woptlist) {
			if (woptlist[i].match(/^height=/i)) {
				wHeight = parseInt(woptlist[i].substr(7),10);
				if (!isNaN(wHeight)) newopt += "top=" + Math.floor((screen.availHeight - wHeight) / 2) + ",";
			}
			if (woptlist[i].match(/^width=/i)) {
				wWidth = parseInt(woptlist[i].substr(6),10);
				if (!isNaN(wWidth)) newopt += "left=" + Math.floor((screen.availWidth - wWidth) / 2) + ",";
			}
		}
	}
	var newwin = window.open(url, wname, newopt + wopt);
	newwin.focus();
	return newwin;
}

// checkbox single selection
function singleSelect( curval ) {
	var form = document.result;
	var chkcnt = 0; //???? ???
	var selidx = -1;  //?? ???? ???
	var oldidx = -1;
	//alert(curval);
	for( i = 0 ; i < form.chkResult.length ; i++ )
	{
		if( form.chkResult[i].checked == true)
		{
			chkcnt++;
			if(form.chkResult[i].value == curval ){
				selidx = i;
			}
			else{
				oldidx = i;
			}
		}
	}
	if(chkcnt > 1 ){
	 form.chkResult[selidx].checked = true;
	 form.chkResult[oldidx].checked = false;
	 }

}


/***************************************************************************************
*		체크박스와 관련된 처리 로직의 정의 시작										   *
****************************************************************************************/


/*
	전체선택 , 전체선택해제 , 결과 1개인 경우 선택과 해제
	ctrl   :	토글버튼 역할을 하는 체크박스 , 제어용
	target : 	ctrl에 의해서 제어를 당하는 체크박스들
*/
function checkAll( ctrl , target ) {
	if( ( typeof( target ) ) != 'undefined' ) {
		if( ctrl.checked == true ) {
			/* 전체 선택 */
			for( var i = 0 ; i < target.length ; i++ ) {
				if( target[ i ].disabled == false ) {
					target[ i ].checked = true;
				}
			}

			//alert( target[1] );

			/* 결과가 1개인 경우의 예외상황시 선택 처리 */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null ) {
				if( target.disabled == false ) {
					target.checked = true;
				}
			}
		}
		else
		{
			/* 전체 선택 해제 */
			for( var i = 0 ; i < target.length ; i++ )
			{
				target[ i ].checked = false;
			}

			/* 결과가 1개인 경우의 예외상황시 해제 처리 */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null )
			{
				target.checked = false;
			}
		}
	}
}

/*
	체크박스의 선택을 limit개로 제한.
	ctrl   :	토글버튼 역할을 하는 체크박스 , 제어용
	target : 	ctrl에 의해서 제어를 당하는 체크박스들
*/
function checkOnlyLimitRows( ctrl , target , limit ) {
	var len = target.length;
	var cnt = 0;
	//alert( len + " , " + limit );

	if( ( typeof( target ) ) != 'undefined' ) {
		if( ctrl.checked == true ) {

			for ( var i = 0 ; i < len ; i++ ) {
				if( target[ i ].disabled == false ) {
					target[ i ].checked = true;
					cnt++;
					//alert(cnt);
				}
				if( cnt == limit ) { break; }

			}

			/* 결과가 1개인 경우의 예외상황시 선택 처리 */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null ) {
				if( target[ 1 ].disabled == false ) {
					target.checked = true;
				}
			}
		}
		else
		{
			/* 전체 선택 해제 */
			for( var i = 0 ; i < target.length ; i++ )
			{
				target[ i ].checked = false;
			}

			/* 결과가 1개인 경우의 예외상황시 해제 처리 */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null )
			{
				target.checked = false;
			}
		}
	}
}


/* 체크된 체크박스의 갯수를 리턴 , obj( checkbox명 ) */
function countChecked( obj )
{
	var total = 0;

	if( typeof( obj ) == "undefined" )
	{
		return 0;
	}

	if( typeof( obj.length ) == "undefined")
	{
		if( obj.checked )
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}

	try
	{
		for( var i = 0; i < obj.length; i++ )
		{
			if( obj[ i ].checked )
			{
				total++;
			}
		}
	}
	catch( ignore )
	{
		if( obj.checked )
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}

	return total;
}
/***************************************************************************************
*		체크박스와 관련된 처리 로직의 정의 끝										   *
****************************************************************************************/


/***************************************************************************************
*		키이벤트 처리 및 마우스 이벤트 관련된 처리 로직의 정의 시작					   *
****************************************************************************************/

/* 엔터키 입력시 goSubmit() 호출 */
document.onkeydown = enterKey;
function enterKey()
{
    var key;
	key = window.event.keyCode;
	if( key == 13 ) {
       goSubmit();
	   return false;
	}else {
	    return true;
	}
}



/* textbox에 onFocus시 clear , obj : textbox */
function onFocus( obj )
{
	if( obj.value == '-- 검색어를 넣어주세요 --' )
	{
		return obj.value = '';
	}
}

/* 최상단 메뉴 이미지 over/out 처리 */
function overImg( img )
{
	if( img.name == img.id ) {
		img.src = '../comm/images/menuOn_' + (img.name).substring(3,5) + '.gif';
	}
}

function outImg( img )
{
	if( img.name == img.id ) {
		img.src = '../comm/images/menuOff_' + (img.name).substring(3,5) + '.gif';
	}
}

/* 이미지의 경로를 받아서 over/out 처리 */
function overImgPath( obj , path )
{
	obj.src = path;
}


/***************************************************************************************
*		키이벤트 처리 및 마우스 이벤트 관련된 처리 로직의 정의 끝					   *
****************************************************************************************/



/***************************************************************************************
*		입력/수정/삭제/다운 처리와 관련된 처리 로직의 정의 시작						   *
****************************************************************************************/

/* 입력 */
function instObj()
{

}
/* 수정 */
function updtObj()
{

}
/* 삭제 */
function delObj( url , idName , obj )
{
	var wordID;
	url += "?" + idName + "=";
	alert( 'url = [' + url + ']' );
	if( obj == null ) alert( '검색 후 선택하세요!' );

	/* 1개인 경우 삭제 처리 */
	if( obj[1] == null )
	{
		if( obj.checked == true )
		{
			wordID = obj.value;
			var question = confirm( '정말 삭제하시겠습니까?' );
			if( question )
			{
				url += wordID + "@" ;
			}
		}
	}

	winOpen( url , 'del' , 10 , 10 , 3 );
}
/* 엑셀 */
function exObj()
{

}
/***************************************************************************************
*		입력/수정/삭제/다운 처리와 관련된 처리 로직의 정의 끝						   *
****************************************************************************************/


/***************************************************************************************
*		새창 관련 처리와 관련된 처리 로직의 정의 시작						           *
****************************************************************************************/

/* 삭제시에는 새로운 윈도우가 人의 시선에 보이지 않는 곳에 띄운다 */
function winOpen( url , args , initW , initH , gbn )
{
	// 삭제시
	if( gbn == 3 )
	{
		var winPosLeft = 3000;
		var winPosTop  = 3000;
	}
	else
	{
		var winPosLeft = (screen.width - initW) / 2;
		var winPosTop  = (screen.height - initH) / 2;
	}
	var envOpt = "width="+initW+",height="+initH+",top="+winPosTop+",left="+winPosLeft+'location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no';
	var newWin = window.open( url, args, envOpt );
	newWin.focus();
}


/***************************************************************************************
*		새창 관련 처리와 관련된 처리 로직의 정의 끝		        				       *
****************************************************************************************/


/***************************************************************************************
*		달력 관련 처리와 관련된 처리 로직의 정의 시작	        				       *
****************************************************************************************/


function goDateBlur(val)
{
	if( val.value == "" ) val.value=val.defaultValue;
}

function goDateFocus(val)
{
	if( val.value == val.defaultValue ) val.value="";
}

function setDate(inVal)
{
	if(inpst == "[object]")
	{
		eval(inpst).text = inVal;
	} else {
		eval(inpst).value = inVal;
	}
}
/***************************************************************************************
*		달력 관련 처리와 관련된 처리 로직의 정의 끝		        				       *
****************************************************************************************/

function setToday( obj )
{
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	if( (''+month).charAt(1) == '' ) month = '0' + month;
	var date = today.getDate();
	if( (''+date).charAt(1) == '' ) date = '0' + date;
	var hour = today.getHours();
	if( (''+hour).charAt(1) == '' ) hour = '0' + hour;
	var minute = today.getMinutes();
	if( (''+minute).charAt(1) == '' ) minute = '0' + minute;
	var sec = today.getSeconds();
	if( (''+sec).charAt(1) == '' ) sec = '0' + sec;

	var theDay = year + '-' + month + '-' + date; //+ ' ' + hour + ':' + minute + ':' + sec ;

	obj.value  = theDay;
	return;
}

// ??????????
function onlyNumber()
{
	var e1 = event.srcElement;
	var num ="0123456789";
	event.returnValue = true;

	for (var i=0;i<e1.value.length;i++)
	{
	if(-1 == num.indexOf(e1.value.charAt(i)))
	event.returnValue = false;
	}

	if (!event.returnValue)
	e1.value="";
}

function checkNumber(){
    var objEv = event.srcElement;
    var numPattern = /([^0-9])/;
    numPattern = objEv.value.match(numPattern);
    if(numPattern != null){
        alert("Please input only number!");
        objEv.value="";
        //objEv.focus();
        return false;
    }
}

function copy2Excel(obj)
{
  window.clipboardData.setData ("Text", obj.innerHTML);

  var ExcelApp = new ActiveXObject("Excel.Application");
  ExcelApp.Workbooks.Add();

  try{
    ExcelApp.ActiveSheet.Paste();
    ExcelApp.ActiveSheet.Cells.WrapText = false;
    for(i=0; i < ExcelApp.ActiveSheet.Shapes.Count;){
	ExcelApp.ActiveSheet.Shapes.Item(1).Delete();
    }
    ExcelApp.ActiveSheet.Cells.EntireColumn.AutoFit();
    ExcelApp.ActiveSheet.Cells.EntireRow.AutoFit();
    ExcelApp.ActiveSheet.Range("A1:A1").Select();
    ExcelApp.Visible = true;
  }catch(e){
  }finally{
  }

}


/* 대메뉴 마우스 오버시 소메뉴를 보여주고, 클릭시 해당화면으로 이동하는 함수들 시작 *********************************************************/
var nscp = (navigator.appName == "Netscape") ;
var ismc = (navigator.appVersion.indexOf("Mac") != -1) ;
var vers = parseFloat(navigator.appVersion.substring(22,25)) ;

function getObj(obj) {
   if (nscp) {
	   compLayr = document.layers[obj] ;
   } else {
   		if( eval("document.all." + obj ) == '[object]' ) {
   			compLayr = eval("document.all." + obj + ".style") ;
   		} else {
   			compLayr = '';
   		}
   }
   return compLayr ;
}

function show(layr){
   obj = getObj(layr) ;
   obj.visibility = "visible" ;
}

function hide(layr){
   obj = getObj(layr) ;
   obj.visibility = "hidden" ;
}

function menuRoll(which,status,total){
   if (status){
	   currentMenuChoice = which ;
	   show("info" + currentMenuChoice) ;
	   checkinfo(total) ;
   }
}

/* 현재 화면에서는 사용하지 않는다. 하위 메뉴를 문자로 구성할 경우 사용한다. 현재는 이미지로 대체했음. */
function fontRoll(which,status,total){
   if (status){
	   currentMenuChoice = which ;
	   obj = getObj("font"+currentMenuChoice) ;
	   obj.color = "blue" ;
	   checkfont(total) ;
   }
}

function checkinfo(total){
   for(r=1;r<= total ;r++){
	   if(r != currentMenuChoice){
		   hide("info" + r) ;
	   }
   }
   setTimeout("checkinfo()",50) ;
}

function checkfont(total){
   for(r=1;r<= total ;r++){
	   if(r != currentMenuChoice){
		   obj = getObj("font"+r) ;
		   obj.color = "#757575" ;
	   }
   }
   setTimeout("checkfont()",50) ;
}

/* 체크박스 전체 토글 */
function onOffTotalCheckbox( ctrl , target ) {
	if( ( typeof( target ) ) != 'undefined' ) {
		if( ctrl.checked == true ) {
			/* 전체 선택 */
			for( var i = 0 ; i < target.length ; i++ )
				if( target[ i ].disabled == false )
					target[ i ].checked = true;

			/* 결과가 1개인 경우의 예외상황시 선택 처리 */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null )
				if( target.disabled == false )
					target.checked = true;
		}	else {
			/* 전체 선택 해제 */
			for( var i = 0 ; i < target.length ; i++ )
				target[ i ].checked = false;

			/* 결과가 1개인 경우의 예외상황시 해제 처리 */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null )
				target.checked = false;
		}
	}
}
