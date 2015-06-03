// ������ �˾�â ����
function openWin(url, winName, intWidth, intHeight) {
	var winPosLeft = (screen.width - intWidth) / 2; // ��â Y ��ǥ
	var winPosTop = (screen.height - intHeight) / 2; // ��â X ��ǥ
	var winOpt = "width="+intWidth+",height="+intHeight+",top="+winPosTop+",left="+winPosLeft+'location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no';
	window.open(url, winName, winOpt);
}

// ������ Modal �˾�â ����
function openWinModal(url, winName, intWidth, intHeight) {
	var winPosLeft = (screen.width - intWidth) / 2; // ��â Y ��ǥ
	var winPosTop = (screen.height - intHeight) / 2; // ��â X ��ǥ
 	window.showModalDialog (url, window, "dialogWidth:"+intWidth+"px;dialogHeight:"+intHeight+"px;dialogTop="+winPosTop+";dialogLeft="+winPosLeft+';scroll:0;status:0;help:0;resizable:0;');
}

// �޷� �˾�â
function openCalendar(pst){
	inpst = pst;
	openWinModal("../../../js/Calendar.html","Calendar","280","231");
}

// ȭ�� ����� â ����
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
*		üũ�ڽ��� ���õ� ó�� ������ ���� ����										   *
****************************************************************************************/


/*
	��ü���� , ��ü�������� , ��� 1���� ��� ���ð� ����
	ctrl   :	��۹�ư ������ �ϴ� üũ�ڽ� , �����
	target : 	ctrl�� ���ؼ� ��� ���ϴ� üũ�ڽ���
*/
function checkAll( ctrl , target ) {
	if( ( typeof( target ) ) != 'undefined' ) {
		if( ctrl.checked == true ) {
			/* ��ü ���� */
			for( var i = 0 ; i < target.length ; i++ ) {
				if( target[ i ].disabled == false ) {
					target[ i ].checked = true;
				}
			}

			//alert( target[1] );

			/* ����� 1���� ����� ���ܻ�Ȳ�� ���� ó�� */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null ) {
				if( target.disabled == false ) {
					target.checked = true;
				}
			}
		}
		else
		{
			/* ��ü ���� ���� */
			for( var i = 0 ; i < target.length ; i++ )
			{
				target[ i ].checked = false;
			}

			/* ����� 1���� ����� ���ܻ�Ȳ�� ���� ó�� */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null )
			{
				target.checked = false;
			}
		}
	}
}

/*
	üũ�ڽ��� ������ limit���� ����.
	ctrl   :	��۹�ư ������ �ϴ� üũ�ڽ� , �����
	target : 	ctrl�� ���ؼ� ��� ���ϴ� üũ�ڽ���
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

			/* ����� 1���� ����� ���ܻ�Ȳ�� ���� ó�� */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null ) {
				if( target[ 1 ].disabled == false ) {
					target.checked = true;
				}
			}
		}
		else
		{
			/* ��ü ���� ���� */
			for( var i = 0 ; i < target.length ; i++ )
			{
				target[ i ].checked = false;
			}

			/* ����� 1���� ����� ���ܻ�Ȳ�� ���� ó�� */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null )
			{
				target.checked = false;
			}
		}
	}
}


/* üũ�� üũ�ڽ��� ������ ���� , obj( checkbox�� ) */
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
*		üũ�ڽ��� ���õ� ó�� ������ ���� ��										   *
****************************************************************************************/


/***************************************************************************************
*		Ű�̺�Ʈ ó�� �� ���콺 �̺�Ʈ ���õ� ó�� ������ ���� ����					   *
****************************************************************************************/

/* ����Ű �Է½� goSubmit() ȣ�� */
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



/* textbox�� onFocus�� clear , obj : textbox */
function onFocus( obj )
{
	if( obj.value == '-- �˻�� �־��ּ��� --' )
	{
		return obj.value = '';
	}
}

/* �ֻ�� �޴� �̹��� over/out ó�� */
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

/* �̹����� ��θ� �޾Ƽ� over/out ó�� */
function overImgPath( obj , path )
{
	obj.src = path;
}


/***************************************************************************************
*		Ű�̺�Ʈ ó�� �� ���콺 �̺�Ʈ ���õ� ó�� ������ ���� ��					   *
****************************************************************************************/



/***************************************************************************************
*		�Է�/����/����/�ٿ� ó���� ���õ� ó�� ������ ���� ����						   *
****************************************************************************************/

/* �Է� */
function instObj()
{

}
/* ���� */
function updtObj()
{

}
/* ���� */
function delObj( url , idName , obj )
{
	var wordID;
	url += "?" + idName + "=";
	alert( 'url = [' + url + ']' );
	if( obj == null ) alert( '�˻� �� �����ϼ���!' );

	/* 1���� ��� ���� ó�� */
	if( obj[1] == null )
	{
		if( obj.checked == true )
		{
			wordID = obj.value;
			var question = confirm( '���� �����Ͻðڽ��ϱ�?' );
			if( question )
			{
				url += wordID + "@" ;
			}
		}
	}

	winOpen( url , 'del' , 10 , 10 , 3 );
}
/* ���� */
function exObj()
{

}
/***************************************************************************************
*		�Է�/����/����/�ٿ� ó���� ���õ� ó�� ������ ���� ��						   *
****************************************************************************************/


/***************************************************************************************
*		��â ���� ó���� ���õ� ó�� ������ ���� ����						           *
****************************************************************************************/

/* �����ÿ��� ���ο� �����찡 ���� �ü��� ������ �ʴ� ���� ���� */
function winOpen( url , args , initW , initH , gbn )
{
	// ������
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
*		��â ���� ó���� ���õ� ó�� ������ ���� ��		        				       *
****************************************************************************************/


/***************************************************************************************
*		�޷� ���� ó���� ���õ� ó�� ������ ���� ����	        				       *
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
*		�޷� ���� ó���� ���õ� ó�� ������ ���� ��		        				       *
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


/* ��޴� ���콺 ������ �Ҹ޴��� �����ְ�, Ŭ���� �ش�ȭ������ �̵��ϴ� �Լ��� ���� *********************************************************/
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

/* ���� ȭ�鿡���� ������� �ʴ´�. ���� �޴��� ���ڷ� ������ ��� ����Ѵ�. ����� �̹����� ��ü����. */
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

/* üũ�ڽ� ��ü ��� */
function onOffTotalCheckbox( ctrl , target ) {
	if( ( typeof( target ) ) != 'undefined' ) {
		if( ctrl.checked == true ) {
			/* ��ü ���� */
			for( var i = 0 ; i < target.length ; i++ )
				if( target[ i ].disabled == false )
					target[ i ].checked = true;

			/* ����� 1���� ����� ���ܻ�Ȳ�� ���� ó�� */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null )
				if( target.disabled == false )
					target.checked = true;
		}	else {
			/* ��ü ���� ���� */
			for( var i = 0 ; i < target.length ; i++ )
				target[ i ].checked = false;

			/* ����� 1���� ����� ���ܻ�Ȳ�� ���� ó�� */
			if( target[ 1 ] == 'undefined' || target[ 1 ] == null )
				target.checked = false;
		}
	}
}
