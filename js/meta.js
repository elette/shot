function getTime() {
	var now = new Date();

	var year = now.getYear();
	if(year < 1900) year += 1900;
	var month = now.getMonth() + 1;
	if(month < 10) month = "0" + month;
	var day = now.getDate();
	if(day < 10) day = "0" + day;
	var hour = now.getHours();
	if(hour < 10) hour = "0" + hour;
	var min = now.getMinutes();
	if(min < 10) min = "0" + min;
	var sec = now.getSeconds();
	if(sec < 10) sec = "0" + sec;

	var cur = year + month + day + hour + min + sec;
	return (cur);
}

var xmlHttp = false;
// var xmlDoc;
try {
  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
  try {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e2) {
    xmlHttp = false;
  }
}

if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
  xmlHttp = new XMLHttpRequest();
}

function initXHttp() {
	var XHttp = false;
	// var xmlDoc;
	try {
	  XHttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	  try {
		XHttp = new ActiveXObject("Microsoft.XMLHTTP");
	  } catch (e2) {
		XHttp = false;
	  }
	}

	if (!XHttp && typeof XMLHttpRequest != 'undefined') {
	  XHttp = new XMLHttpRequest();
	}
	return XHttp;
}

var runc;
function wheel(c, div) {
    var w='|';
//     (c==0)?w='｜':(c==1)?w='／':(c==2)?w='--':(c==3)?w='＼':c=0;
    (c==0)?w='|':(c==1)?w='/':(c==2)?w='-':(c==3)?w='\\':c=0;
    $E(div).innerHTML=w;
    runc = setTimeout(function(){wheel(c+1, div);}, 250);
}

function XHR(url,target) {
  // native XMLHttpRequest object
//   if (target != null) $E(target).innerHTML = '<img src="/shot/images/loading.gif"/>';
  if (target != null && target != 'board') wheel(0, target);
  if (window.XMLHttpRequest) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {XHRDone(req, target);};
    req.open("GET", url, true);
//	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(null);
    // IE/Windows ActiveX version
  } else if (window.ActiveXObject) {
    var req = new ActiveXObject("Microsoft.XMLDOM");
    if (req) {
      req.onreadystatechange = function() {XHRDone(req, target);};
      req.open("GET", url, true);
      req.send(null);
    }
  }
}

function XHRDone(req, target) {
  // only if req is "loaded"
  if (req.readyState == 4) {
    clearTimeout(runc);
    // only if "OK"
    if (req.status == 200 || req.status == 304) {
      results = req.responseText;
	  if (target == 'pane') {
		$E(target).innerHTML = results;
		$E('gridInfo').insertBefore($E('RESULTMSG').firstChild, $E('gridInfo').firstChild);
		if (results.indexOf("hideGridTable") > 0) {
			$E('divInfo').style.display = 'none';
		} else {
			// eval(results.replace(/\n/gi, "\r\n").replace(/\r\n/gi, " "));
			hideGridTable();
			$E('divInfo').style.display = 'block';
		}
	  } else {
		$E(target).innerHTML = results;
	  }
	  if (target == 'board') {
		var board = document.createElement('div');
		board.innerHTML=results;
		$E(target).appendChild(board);
		// console.log(board);
	  }
      if (target == 'ConnStatus') {$(target).innerHTML = '&nbsp;&nbsp;'; setTimeout(function(){checkConn();}, 200);}
	  else if (target == 'DBInfo') $E('DBInfo').style.display = ($E('DBInfo').innerHTML!="")?"block":"none";
      else if (target == 'pane') resizeTables();
      else if (target == 'paneDOM') callXML('true');
    } else {
      $E(target).innerHTML="XHR error:\n" + req.statusText;
    }
  }
}

function appendMessage() {
	var table = $E('gridInfo');
	// var tr = document.createElement("tr"); 
	// var td = document.createElement("td"); td.innerHTML = $E('RESULTMSG').innerHTML; tr.appendChild(td);
	// table.appendChild(tr);
	// console.log("Appended");
	
	table.appendChild($E('RESULTMSG').children[0]);
	table.style.visibility= "visible";
}

function CHR(url) {
    var rtnXML;
    var req = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLDOM");
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200 || req.status == 304) {
                rtnXML = req.responseXML;
            } else {
                $E('msgdetail').innerHTML = req.statusText;
                sm('msgdetail', 600, 300);
            }
        }
    };
    req.open("GET", url, false);
    req.send(null);
    return rtnXML;
}


function urlfmt(txt) {
//     txt = txt.replace(/\n/g, " ");
    // txt = txt.replace(/%/g, "%25");
    // txt = txt.replace(/\+/g, "%2B");
    txt = encodeURIComponent(txt);
    // alert(txt);
    return txt;
}

function callServer(SQL) {
    // $E('sqllist').value = SQL;
//     alert(SQL.replace(/\n/g, " ");
    var url = "CommandAction?CID=Mon&CMD=list&SQL=" + urlfmt(SQL);
    // var url = "CommandAction?CID=Mon&CMD=list&SQL=" + encodeURI(SQL);
	// $E('gridTable').style.top = (GRIDMAX)? window.innerHeight-250 : '22px' ;

	$E('divInfo').style.display = 'none';
    // $E('gridTable').style.top = window.innerHeight-$E('gridTable').clientHeight;
    $E('gridTable').style.top = window.innerHeight-250;
    // $E('gridTable').style.bottom = 0;
	$E('gridTable').style.visibility = "visible";
    XHR(url, 'pane');
}

function callServerMsg(SQL) {
    var url = "CommandAction?CID=Mon&CMD=getmsg&SQL=" + urlfmt(SQL);

    XHR(url, 'msgdetail');
    sm('msgbox', 515, 276);
}

function callXML(bTot) {
  var url = "CommandAction?CID=DOM&CMD=list&" + Math.random();

  xmlHttp.open("GET", url, true);
  if (bTot == 'true') {
    xmlHttp.onreadystatechange = updateDOMPane;
    // $E('DomStatus').innerHTML = '<img src="/shot/images/loading.gif"/>';
    wheel(0, 'DomStatus');
  }
  else if (bTot == 'del')
    xmlHttp.onreadystatechange = removeDOMPane;
  else
    xmlHttp.onreadystatechange = updateXMLPane;

  xmlHttp.send(null);
}

function callXMLClient(bTot) {
  var url = "CommandAction?CID=Client&CMD=list&" + Math.random();

  xmlHttp.open("GET", url, true);
  if (bTot == 'true') {
    xmlHttp.onreadystatechange = updateClientPane;
//     $E('DomStatus').innerHTML = '<img src="/shot/images/loading.gif"/>';
    wheel(0, 'ConnStatus');
  }
  else if (bTot == 'del')
    xmlHttp.onreadystatechange = removeClientPane;
  else
    xmlHttp.onreadystatechange = updateXMLClientPane;
  xmlHttp.send(null);
}

function callXMLLog() {
  var url = "CommandAction?CID=Log&CMD=list&" + Math.random();

  xmlHttp.open("GET", url, true);
  xmlHttp.onreadystatechange = updateLogPane;

  xmlHttp.send(null);
}

function callServerUpdate(SQL) {
    var url = "CommandAction?CID=Mon&CMD=getUpdateResult&SQL=" + urlfmt(SQL);

  $E('divInfo').style.display = 'none';
    // $E('gridTable').style.top = window.innerHeight-$E('gridTable').clientHeight;
    $E('gridTable').style.top = window.innerHeight-250;
    // $E('gridTable').style.bottom = 0;
  $E('gridTable').style.visibility = "visible";
    XHR(url, 'pane');
}

function updateXMLPane() {
  if (xmlHttp.readyState == 4) {
    var xmlDoc=xmlHttp.responseXML;

    var x = xmlDoc.evaluate("/menu/item[name='help']/sql", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE , null);

    var txtQry = x.singleNodeValue.textContent;
    var sqlmsg = document.getElementById("SQLMSG").innerHTML;
    var errcode = sqlmsg.substring(sqlmsg.search(/CODE/i)+6, sqlmsg.search(/, SQLSTATE/i));

    callServerMsg(txtQry.replace("?", "'SQL"+errcode+"'"));
  }
}

function updateDOMPane() {
  if (xmlHttp.readyState == 4) {
    var xmlDoc=xmlHttp.responseXML;
//     $E('paneDOM').innerHTML = xmlDoc;
    var list = "";

	var cat = xmlDoc.evaluate("/menu/item/@cat", xmlDoc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
// console.info("list : " + cat.type);
	var category = new Array();
	var c = cat.iterateNext();
	while(c) {
// console.log(c.value + ", " + category.length);
	if (category.length == 0 || category.indexOf(c.value) == -1) category.push(c.value);
// console.log("length: " + category.length + ", " + category[category.length-1]);
		c = cat.iterateNext();
	}
	list += "<ul>";
	for (i=0; i<category.length; i++) {
		list += "<li>" + category[i] + "<ul>";
		var x = xmlDoc.evaluate("/menu/item[@cat='" + category[i] + "']/name", xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE , null);
		var item = x.iterateNext();
		while (item) {
	        // console.log(item.parentNode.childNodes[7].textContent);
	//         list += "<li title=\"" + item.parentNode.childNodes[5].textContent + "\" id=\"" + item.textContent + "\" onClick='selectRow(this);'>" + item.textContent + "</li>"
			list += "<li title=\"" + item.parentNode.childNodes[5].textContent + "\" id=\"" + item.textContent + "\" desc=\"" + item.parentNode.childNodes[7].textContent + "\">" + item.textContent + "</li>"
			item = x.iterateNext();
		}
		list += "</ul>";
	//    alert(list);
	}
	list += "</ul>";
    $E('paneDOM').innerHTML = list;
	// console.log(list);
    clearTimeout(runc);
    $E('DomStatus').innerHTML = '&nbsp;&nbsp;';
  }
}

function updateClientPane() {
  if (xmlHttp.readyState == 4) {
    var xmlDoc=xmlHttp.responseXML;
//     $E('paneDOM').innerHTML = xmlDoc;
    var list = "";

    var x = xmlDoc.evaluate("/customer/item", xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE , null);
    var item = x.iterateNext();
    while (item) {
		var nodename = item.getAttribute("name");
		var nodecseq = item.getAttribute("cseq");
        list += "<li title=\"" + item.textContent + "\" id=\"" + nodecseq + "\">" + nodename + "</li>"
        item = x.iterateNext();
    }
    $E('paneClient').innerHTML = list;
    clearTimeout(runc);
    $E('ConnStatus').innerHTML = '&nbsp;&nbsp;';
  }
}

function updateLogPane() {
  if (xmlHttp.readyState == 4) {
    var xmlDoc=xmlHttp.responseXML;
    var list = "";

    var x = xmlDoc.evaluate("/file/item", xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE , null);
    var item = x.iterateNext();
    while (item) {
		var filename = item.textContent;
        list += "<li title=\"" + item.childNodes[1].textContent + "\" id=\"" + item.childNodes[3].textContent + "\">" + item.childNodes[1].textContent + "</li>"
        item = x.iterateNext();
    }
    $E('paneLog').innerHTML = list;
  }
}

// Query history
function callHistory() {
  var url = "CommandAction?CID=Mon&CMD=listHistory&" + Math.random();

  xmlHttp.open("GET", url, true);
  xmlHttp.onreadystatechange = updateHistoryPane;

  xmlHttp.send(null);
}

function updateHistoryPane() {
  if (xmlHttp.readyState == 4) {
    var xmlDoc=xmlHttp.responseXML;
    var list = "";

    var x = xmlDoc.evaluate("/file/item", xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE , null);
    var item = x.iterateNext();
    while (item) {
    var filename = item.textContent;
        list += "<li title=\"" + item.childNodes[1].textContent + "\" id=\"" + item.childNodes[3].textContent + "\">" + item.childNodes[1].textContent + "</li>"
        item = x.iterateNext();
    }
    $E('paneHist').innerHTML = list;
  }
}

function callXMLHistory(fileID) {
  var url = "CommandAction?CID=Mon&CMD=getHistory&file=" + fileID + "&" + Math.random();

  xmlHttp.open("GET", url, true);
  xmlHttp.onreadystatechange = updateGridPane;

  xmlHttp.send(null);
}

function updateGridPane() {
  if (xmlHttp.readyState == 4) {
    var xmlDoc=xmlHttp.responseXML;
    var list = "";

    var x = xmlDoc.evaluate("/QUERY/item", xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE , null);
    var item = x.iterateNext();
    $E('gridInfo').innerHTML = "";
    while (item) {
        var filename = item.textContent;
        var tr = document.createElement("tr");
        var td = document.createElement("td"); td.innerHTML = item.childNodes[1].textContent; td.className="line_td"; tr.appendChild(td);
        td = document.createElement("td"); td.innerHTML = item.childNodes[3].textContent; td.className="line_td"; tr.appendChild(td);
        td = document.createElement("td"); td.innerHTML = "<button onclick=\"javascript:$E('SQL').value=$(this).parent().prev().text();\">&gt;</button>"; td.className="line_td"; tr.appendChild(td);
        $E('gridInfo').appendChild(tr);
        item = x.iterateNext();
    }
    hideGridTable();
    $E('divInfo').style.display = 'block';
  }
}

function syncScroll() {
    // if (document.getElementById("bodyDiv").scrollLeft) {
        document.getElementById("headDiv").scrollLeft = document.getElementById("bodyDiv").scrollLeft;
    // }
}

var propYN = true;
function resizeTables() {
    if (!document.getElementById("headTab")) return;
    var tableArr = new Array();
    tableArr[0] = document.getElementById("headTab");
    tableArr[1] = document.getElementById("bodyTab");

    var adj = (propYN)?345:22 + 0;
	$E('gridTable').style.width = (window.innerWidth - adj) + 'px';
    $E('headDiv').style.width = (window.innerWidth - 17 - adj) + 'px';
    if (!document.getElementById("bodyDiv")) return;
    $E('bodyDiv').style.width = (window.innerWidth - adj) +'px';
    $E('gridTable').style.left = adj;	//(propYN)?345:22;

    var cellWidths = new Array();
    var totalWidth = 0;

    // get widest
    for(i = 0; i < tableArr.length; i++) 
    {
        for(j = 0; j < tableArr[i].rows[0].cells.length; j++)
        {
           var cell = tableArr[i].rows[0].cells[j];

            if(!cellWidths[j] || cellWidths[j] < cell.clientWidth)
                cellWidths[j] = cell.clientWidth;
        }
    }
    for(i = 0; i < tableArr[1].rows[0].cells.length; i++)
        totalWidth = totalWidth + cellWidths[i] +6;
//     alert(totalWidth + ", " + tableArr[1].clientWidth);

    tableArr[1].style.width = totalWidth;
    tableArr[0].style.width = tableArr[1].clientWidth;
    // set all columns to the widest width found
    for(i = 0; i < tableArr.length; i++)
    {
        for(j = 0; j < tableArr[i].rows[0].cells.length; j++)
        {
            tableArr[i].rows[0].cells[j].style.width = cellWidths[j]+'px';
        }
    }
//         alert(tableArr[1].clientWidth);
// alert(totalWidth/2 + ", " + tableArr[1].clientWidth);
}

var GRIDMAX=false;
function sizeGrid() {
	$E('gridTable').style.top = (GRIDMAX)? window.innerHeight-250 : '22px' ;
	// $E('gridTable').style.height = (GRIDMAX)? '250px' : window.innerHeight-22 ;
	$E('bodyDiv').style.height = (GRIDMAX)? '200px' : window.innerHeight-72 ;
	GRIDMAX = (GRIDMAX)? false : true ;
}

function startConn() {
    document.getElementsByName('HOST')[0].value = $E('HOST').value;
    document.getElementsByName('DBMS')[0].value = $E('DBMS').value;
    document.getElementsByName('PORT')[0].value = $E('PORT').value;
    document.getElementsByName('DB')[0].value = $E('DB').value;
    document.getElementsByName('USER')[0].value = $E('USER').value;
}

function initConn() {
    startConn();
    var url = "CommandAction?CID=DBConn&CMD=initConnectionPool&DBMS=" + $E('DBMS').value + "&HOST=" + $E('HOST').value + "&PORT=" + $E('PORT').value + "&DB=" + $E('DB').value + "&USER=" + $E('USER').value + "&PASS=" + $E('PASS').value;

    XHR(url, 'ConnStatus');
    // setTimeout(function(){checkConn();}, 500);
}
function releaseConn() {
    var url = "CommandAction?CID=DBConn&CMD=releaseConnectionPool";
	$E('board').style.display = 'none';

    XHR(url, 'ConnStatus');
	$E('ConnStatus').innerHTML = '&nbsp;&nbsp;';
    setTimeout(function(){checkConn();}, 500);
}
function checkConn() {
    var url = "CommandAction?CID=DBConn&CMD=getInfoDB&" + getTime();
    XHR(url, 'DBInfo');
}

var arrBtnL = {'StatusBox':false, 'DomBox':false, 'ClientBox':false, 'HistBox':false};
var arrBtnR = {'SQLBox':false, 'CHARTBox':false, 'LOGBox':false};
function toggle(strBox,LR) {
	if (LR=='L') {
		arrBtnL[strBox] = !arrBtnL[strBox];
		for (var btn in arrBtnL) {
			if(strBox!=btn && arrBtnL[btn]) {
				arrBtnL[btn] = !arrBtnL[btn];
				doToggle(btn,LR);
			}
		}
	}else if (LR=='R'){
		arrBtnR[strBox] = !arrBtnR[strBox];
		for (var btn in arrBtnR) {
			if(strBox!=btn && arrBtnR[btn]) {
				arrBtnR[btn] = !arrBtnR[btn];
				doToggle(btn,LR);
			}
		}
	}
	doToggle(strBox,LR);

}

function doToggle(strBox,LR) {
    var SB = $E(strBox);
    if (LR == 'L') {
		SB.style.display = (!arrBtnL[strBox])? 'none' : 'block';
        // if (!arrBtnL[strBox]) {
            // // SB.style.display = 'none';
            // SB.style.zIndex = 0; //parseInt(SB.style.zIndex) -10;
        // } else {
            // // SB.style.left = 22;
            // // SB.style.display = 'block';
            // SB.style.zIndex = 99; //parseInt(SB.style.zIndex) +10;
        // }
        if (strBox=='Property') {
            // SB.style.top = window.innerHeight-336;
            propYN = !propYN;
            resizeTables();
        }
    } else {
		SB.style.display = (!arrBtnR[strBox])? 'none' : 'block';
        // if (SB.style.left == (document.body.clientWidth - SB.clientWidth -22) + 'px' || !SB.style.left) {
            // SB.style.left = '-' + (SB.clientWidth+10) + 'px';
            // SB.style.zIndex = 0;
        // } else {
            // SB.style.left = document.body.clientWidth - SB.clientWidth -22;
            // SB.style.zIndex = 99;
        // }
    }

}

function doToggle2(strBox,LR) {

    var SB = $E(strBox);
    if (LR == 'L') {
        if (SB.style.left == '22pt' || SB.style.left == '22px' || !SB.style.left) {
            SB.style.left = '-' + (SB.clientWidth+20) + 'px';
            SB.style.zIndex = 0; //parseInt(SB.style.zIndex) -10;
        } else {
            SB.style.left = 22;
            SB.style.zIndex = 99; //parseInt(SB.style.zIndex) +10;
        }
        if (strBox=='Property') {
            SB.style.top = window.innerHeight-336;
            propYN = !propYN;
            resizeTables();
        }
    } else {
        if (SB.style.left == (document.body.clientWidth - SB.clientWidth -22) + 'px' || !SB.style.left) {
            SB.style.left = '-' + (SB.clientWidth+10) + 'px';
            SB.style.zIndex = 0;
        } else {
            SB.style.left = document.body.clientWidth - SB.clientWidth -22;
            SB.style.zIndex = 99;
        }
    }

}

function trackTableHighlight(mEvent, highlightColor) {
   if (!mEvent)
     mEvent=window.event;

    var backColor = '#FFFFFF';

   // Internet Explorer
   if (mEvent.srcElement)
   {
     HighLightTR( mEvent.srcElement.parentNode, highlightColor, backColor);
   }
   // Netscape and Firefox
   else if (mEvent.target)
   {
     HighLightTR( mEvent.target.parentNode, highlightColor, backColor);
   }
}

function trackItemHighlight(mEvent) {

    var backColor = '#FFFFFF';
    var highlightColor = '#F0F0F0';

   // Internet Explorer
   if (mEvent.srcElement)
   {
     HighLightTR( mEvent.srcElement, highlightColor, backColor);
   }
   // Netscape and Firefox
   else if (mEvent.target)
   {
     if (mEvent.target.tagName != "LI") return false;
     HighLightTR( mEvent.target, highlightColor, backColor);
   }
}

var preEl ;
var orgBColor;
var orgTColor;
function HighLightTR(el, backColor,textColor){
  if(typeof(preEl)!='undefined') {
     preEl.bgColor=orgBColor;
     try{ChangeBackColor(preEl,orgTColor);}catch(e){;}
  }

  orgBColor = el.bgColor;
  orgTColor = el.style.color;
  el.bgColor=backColor;


  try{ChangeBackColor(el,backColor);}catch(e){;}
  preEl = el;
  getTRdata(el);

}


function ChangeBackColor(a_obj,a_color){
    if(a_obj.cells) {
        for (i=0;i<a_obj.cells.length;i++)
            a_obj.cells[i].style.backgroundColor=a_color;
    }
    else
        a_obj.style.backgroundColor=a_color;
}

function getTRdata(a_obj){
    if(a_obj.cells) {
        var table = document.createElement("table"); table.className = "propTab";
		// table.style.class="propTab";
		//table.style="border:solid 1px #D0D0D0;border-spacing:1px;padding:none;font-size:8pt";
        var heads = $E('headTab').rows[0].cells;
        for (i=0;i<a_obj.cells.length;i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td"); td.innerHTML = heads[i].innerHTML; tr.appendChild(td);
            td = document.createElement("td"); td.innerHTML = a_obj.cells[i].innerHTML; tr.appendChild(td);
            table.appendChild(tr);
        }
        $E('paneProp').replaceChild(table, $E('paneProp').children[0]);
    }
}

function callStream(tChart) {
    var url = "CommandAction?CID=Mon&CMD=getxml&SQL=" + urlfmt($E('SQL').value + '&' + Math.random());


}

// var arrBoard = {'Resource':'Dash-Resource', 'TBSP':'Dash-TableSpaces', 'CPU':'Dash-CPU', 'MEM':'Dash-MEM'};
var arrBoard = {};
function getDash() {
	if ($E('board').style.display=='block') {$E('board').style.display = 'none'; return;}
	// $E('board').innerHTML = "";
	$E('board').style.display = 'block';
	// for (var name in arrBoard) arrBoard[name] = false;

	var url = "CommandAction?CID=DOM&CMD=list&" + Math.random();
	var XHttp =  new initXHttp();
	XHttp.onreadystatechange = function() {
		if (XHttp.readyState == 4 && XHttp.status == 200) {
			var xmlDoc = XHttp.responseXML;
		//     $E('paneDOM').innerHTML = xmlDoc;
			var list = "";

			var x = xmlDoc.evaluate("/menu/item[@cat='DashBoard']/name", xmlDoc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
			var item = x.iterateNext();
			while (item) {
				list += "<input type='checkbox' id=\"" + item.textContent + "\" onchange=\"javascript:getDB('" + item.parentNode.childNodes[1].textContent + "','" + item.textContent + "');\">" + item.textContent.replace('Dash-','') + "&nbsp;"
				item = x.iterateNext();
			}
			if (Object.keys(arrBoard) == "")
				$E('board').innerHTML = list;

			// for (var name in arrBoard) {
				// console.log(">>> "+name);
				// // if (arrBoard[name])
				// document.getElementById(name).click();	//.setAttribute("checked", true);
			// }
		}
	};
	XHttp.open("GET", url, true);
	XHttp.send(null);

}

function getDB(item, name) {
	if (arrBoard[name]) {
		$E('board').removeChild(arrBoard[name]);
		arrBoard[name] = false;
	} else {
		arrBoard[name] = true;
		var boardurl = "CommandAction?CID=DOM&CMD=getNode&Name=" + name + "&" + Math.random();
		var XHttp = new initXHttp();
		XHttp.onreadystatechange = function() {getItemDone(XHttp, item, name);};
		XHttp.open("GET", boardurl, true);
		XHttp.send(null);
	}
}

// function getDB2() {
	// if ($E('board').style.display=='block') {$E('board').style.display = 'none'; return;}
	// $E('board').innerHTML = "";
	// $E('board').style.display = 'block';

	// var XHttp = [];
	// var i = 0;
	// var boardurl = [];
	// var url = [];
	// var SQL = [];
	// var items = [];

	// for (var item in arrBoard) {
		// // XHttp[i] = new initXHttp();
		// boardurl[i] = "CommandAction?CID=DOM&CMD=getNode&Name=" + arrBoard[item] + "&" + Math.random();
		// items[i] = item;
		// i++;
	// }
	// // console.log("arrBoard.length: "+items.length);
	// // for (var item in arrBoard) {
	// for (var i=0; i< items.length; i++) {
		// (function(i) {
			// // console.log(">>> "+i);
			// boardurl[i] = "CommandAction?CID=DOM&CMD=getNode&Name=" + arrBoard[items[i]] + "&" + Math.random();
			// // console.log(">>>url: "+boardurl[i]);
			// XHttp[i] = new initXHttp();
			// XHttp[i].onreadystatechange = function() {getItemDone(XHttp[i], items[i]);
				// // if (XHttp[i].readyState == 4 && XHttp[i].status == 200) {
					// // // SQL[i] = XHttp[i].responseText;
					// // url[i] = "CommandAction?CID=Mon&CMD=getDB&item="+items[i]+"&SQL=" + urlfmt(XHttp[i].responseText) + "&" + Math.random();
					// // console.log(">>> "+items[i]+", "+XHttp[i].responseText);
					// // XHR(url[i], "board");
				// // }
			// };
			// XHttp[i].open("GET", boardurl[i], false);
			// XHttp[i].send(null);
		// })(i);
		// // i++;
	// }

// }

function getItemDone(req, item, name) {
	if (req.readyState == 4 && req.status == 200) {
		var SQL = req.responseText;
		var url = "CommandAction?CID=Mon&CMD=getDB&item="+item+"&SQL=" + urlfmt(SQL) + "&" + Math.random();

		var XHttp = new initXHttp();
		XHttp.onreadystatechange = function() {
			if (XHttp.readyState == 4 && XHttp.status == 200) {
				results = XHttp.responseText;
				var board = document.createElement('div');
				arrBoard[name] = board;
				board.innerHTML=results;
				$E('board').appendChild(board);
			}
		};
		XHttp.open("GET", url, true);
		XHttp.send(null);
	}
}

var lineChartData = [];
function getStmm() {
	if ($E('board').style.display=='block') {$E('board').style.display = 'none'; return;}
	$E('board').innerHTML = "<table width='600px'><tr><td style='vertical-align:top;'><span id='ListSpan'></span></td><td><div id='StmmSpan'><canvas style='height:20px;'></canvas></div></td></tr></table>";
	$E('board').style.display = 'block';
	lineChartData = [];

	var url = "CommandAction?CID=DOM&CMD=list&" + Math.random();
	var XHttp =  new initXHttp();
	XHttp.onreadystatechange = function() {
		if (XHttp.readyState == 4 && XHttp.status == 200) {
			var xmlDoc = XHttp.responseXML;
			var x = xmlDoc.evaluate("/menu/item[name='STMM Change']/sql", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE , null);
			var txtQry = x.singleNodeValue.textContent;
			var url = "CommandAction?CID=Mon&CMD=getxml&SAVE=N&SQL=" + urlfmt(txtQry) + "&" + Math.random();

			// var labels = [];
			$.get(url, function(xml) {

				// Split the lines
				var $xml = $(xml);
				var labels = {};
				var data = {};
				var iSeries = '';
// console.log($xml);
				// $xml.find('series').each(function(i, series) {
					// iSeries = $(series).find('name').text();
					// if (lineChartData.length == 0 || lineChartData.indexOf(iSeries) == -1)
						// lineChartData.push(iSeries);
				// });
				// var idx = 0;
				$xml.find('series').each(function(i, series) {
	   				// push data points
					iSeries = $(series).find('name').text();
					if (lineChartData.length == 0 || lineChartData.indexOf(iSeries) == -1) {
						lineChartData.push(iSeries);
						labels[iSeries] = [];
						data[iSeries] = [];
					}
					labels[iSeries].push($(series).children('value').eq(0).text());
					data[iSeries].push($(series).children('value').eq(1).text());

				});
				for (var i=0; i<lineChartData.length; i++)
					lineChartData[lineChartData[i]] = {
						labels : labels[lineChartData[i]],
						datasets : [{data:data[lineChartData[i]]}]
					};

				var idxList = "";
				for (var i=0; i<lineChartData.length; i++) {
					idxList += "<li onclick='javascript:getStmmDone(\"" + lineChartData[i] + "\");'>" + lineChartData[i] + "</li>" ;
				}
				$E('ListSpan').innerHTML = (idxList)?idxList:"Not Logged.";

			});
		}
	};

	XHttp.open("GET", url, true);
	XHttp.send(null);

}

function getStmmDone(idx) {
    var divChild = $E('StmmSpan').lastChild;
    if (divChild.tagName == 'CANVAS') $E('StmmSpan').removeChild(divChild);
    var pane = document.createElement("CANVAS");
    // pane.setAttribute("class", "canvas");
    pane.setAttribute("width", 400);
    pane.setAttribute("height", 300);
	trackItemHighlight(event);
    $E('StmmSpan').appendChild(pane);
    stmmShot(pane, idx);
}

function insertItem() {
    var url = "CommandAction?CID=DOM&CMD=insNode&Name=" + $E('ItemName').value + "&Category=" + $E('Category').value + "&Schema=" + $E('Schema').value  + "&Sql=" + urlfmt($E('Statement').value) + "&Desc=" + urlfmt($E('Desc').value);

    XHR(url, 'paneDOM');
}

function insertClient() {
    var url = "CommandAction?CID=Client&CMD=insNode&CSEQ=" + getTime() + "&Name=" + $E('NAME').value + "&System=" + $E('SYSTEM').value + "&DBMS=" + $E('DBMS').value + "&Server=" + $E('HOST').value + "&Port=" + $E('PORT').value + "&Database=" + $E('DB').value + "&Instance=" + $E('USER').value + "&Pass=" + $E('PASS').value;

    XHR(url, 'paneClient');
}

function selectRow(mEvent) {
    if (!mEvent)
        mEvent = window.event;
	var strID, strTitle, strDesc;
    if (mEvent.srcElement) {
        strID = mEvent.srcElement.id;
        strTitle = mEvent.srcElement.title;
        strDesc = mEvent.srcElement.getAttribute("desc");
    }
    else if (mEvent.target) {
        strID = mEvent.target.id;
        strTitle = mEvent.target.title;
        strDesc = mEvent.target.getAttribute("desc");
    }
	if (strID == 'paneDOM') return;
	$E('sqllist').value = strID;
	$E('SQL').value = strTitle;
	$E('SQLDESC').title = strDesc;

    trackItemHighlight(mEvent);
    $E('selectedRow').value = strID;
	$E("SQL").focus();
	if(!arrBtnR['SQLBox']) toggle('SQLBox','R');

}

function selectClient(mEvent) {
    if (!mEvent)
        mEvent = window.event;
	var strID;
    if (mEvent.srcElement) {
        strID = mEvent.srcElement.id;
        // $E('SQL').value = mEvent.srcElement.title;
    }
    else if (mEvent.target) {
        strID = mEvent.target.id;
        // $E('SQL').value = mEvent.target.title;
    }
	if (strID == 'paneClient') return;
	$E('sqllist').value = strID;

	var url = "CommandAction?CID=Client&CMD=list&" + Math.random();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function() {

		if (xmlHttp.readyState == 4) {
			var xmlDoc=xmlHttp.responseXML;

			var x = xmlDoc.evaluate("/customer/item[@cseq='" + $E('sqllist').value + "']", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE , null);
			var node = x.singleNodeValue;

		    $E('NAME').value 	= node.getAttribute("name");
		    $E('DBMS').value 	= node.childNodes[1].textContent;
		    $E('SYSTEM').value 	= node.childNodes[3].textContent;
		    $E('HOST').value 	= node.childNodes[5].textContent;
		    $E('PORT').value 	= node.childNodes[7].textContent;
		    $E('DB').value 	 	= node.childNodes[9].textContent;
		    $E('USER').value 	= node.childNodes[11].textContent;
		    $E('PASS').value 	= node.childNodes[13].textContent;

		    arrBtnL['ClientBox'] = false; doToggle('ClientBox', 'L');

		}
	}
	xmlHttp.send(null);
    trackItemHighlight(mEvent);
    $E('selectedClient').value = $E('sqllist').value;

}

function selectLog(mEvent) {
    if (!mEvent)
        mEvent = window.event;

	var nodeId = "";
    if (mEvent.srcElement) {
        nodeId = mEvent.srcElement.id;
        name = mEvent.srcElement.title;
    }
    else if (mEvent.target) {
        nodeId = mEvent.target.id;
        name = mEvent.target.title;
    }
	if (nodeId != "paneLog") logShot(nodeId, name);

}

function selectHist(mEvent) {
    if (!mEvent)
        mEvent = window.event;

  var nodeId = "";
    if (mEvent.srcElement) {
        nodeId = mEvent.srcElement.id;
        name = mEvent.srcElement.title;
    }
    else if (mEvent.target) {
        nodeId = mEvent.target.id;
        name = mEvent.target.title;
    }
  callXMLHistory(nodeId);

}

function removeItem() {
	if(!confirm("Remove selected item?")) return;
    var url = "CommandAction?CID=DOM&CMD=delNode&Name=" + $E('selectedRow').value;

    XHR(url, 'paneDOM');
}

function removeClient() {
	if(!confirm("Remove selected client?")) return;
    var url = "CommandAction?CID=Client&CMD=delNode&CSEQ=" + $E('selectedClient').value;

    XHR(url, 'paneClient');
}

function org_copy2clipboard(obj) {
    if (window.clipboardData)
    {

    // the IE-manier
        window.clipboardData.setData("Text", $E(obj).innerText);
        // waarschijnlijk niet de beste manier om Moz/NS te detecteren;
        // het is mij echter onbekend vanaf welke versie dit precies werkt:
    }
    else if (window.netscape)
    {
        try{
        // dit is belangrijk maar staat nergens duidelijk vermeld:
        // you have to sign the code to enable this, or see notes below
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        // maak een interface naar het clipboard
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return;

        // maak een transferable
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;

        // specificeer wat voor soort data we op willen halen; text in dit geval
        trans.addDataFlavor('text/unicode');

        // om de data uit de transferable te halen hebben we 2 nieuwe objecten nodig om het in op te slaan
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext=$E(obj).innerHTML;
        str.data=copytext;
        trans.setTransferData("text/unicode",str,copytext.length*2);
        var clipid=Components.interfaces.nsIClipboard;
        if (!clip) return false;
        clip.setData(trans,null,clipid.kGlobalClipboard);
        }catch(e){alert(e.toString());}
    }
}

function copy2clipboard(obj) {
    if (window.clipboardData)
    {

        window.clipboardData.setData("Text", $E(obj).innerText);
    }
    else
    {
        try{
	        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].getService(Components.interfaces.nsIClipboardHelper);
	        if (!clip) return;

	        var copytext=$E(obj).innerHTML;
	        clip.copyString(text);
        }catch(e){alert(e.toString());}
    }
}

function hideGridTable() {
	$E('gridTable').style.visibility = "hidden";
}

if( navigator.userAgent.indexOf('Firefox') >= 0 ) {
	var eventNames = ["mousedown", "mouseover", "mouseout",
	                            "mousemove", "mousedrag", "click", "dblclick",
	                            "keydown", "keypress", "keyup" ];

	for( var i = 0 ; i < eventNames.length; i++ ) {
		window.addEventListener( eventNames[i], function(e) {
			window.event = e;
		}, true );
	}
}

function shortKey(evt) {
	var event = document.createEvent("HTMLEvents");
	event.initEvent("click",true,false);
	if (!evt) evt = window.event;
	var target = evt.srcElement || evt.target;
	if (target.tagName == 'INPUT' || target.tagName == 'TEXTAREA') return;
	var key = evt.keyCode;
	if(evt.ctrlKey) return;
	if(key == 83) {
		// $('keyS').fireEvent('onclick');
		// $('keyS').dispatchEvent(event);
		toggle('SQLBox', 'R');
		// if (arrBtnR['SQLBox']) $E('SQL').focus();
	}else if(key == 67) {
		toggle('CHARTBox', 'R');
	}else if(key == 76) {
		toggle('LOGBox', 'R');
	}else if(key == 80) {
		toggle('Property', 'L');
	}else if(key == 68) {
		toggle('StatusBox', 'L');
	}else if(key == 77) {
		toggle('DomBox', 'L');
  }else if(key == 81) {
    toggle('HistBox', 'L');
	}else if(key == 71) {
		callXML('true');
	}else if(key == 84) {
		$E('divInfo').style.display = 'none';
		$E('gridTable').style.visibility = ($E('gridTable').style.visibility == "hidden")? "visible" :"hidden";
	}else if(key == 72) {
		$E('gridTable').style.visibility = "hidden";
 		$E('divInfo').style.display = ($E('divInfo').style.display == 'block')? "none" : "block";
	}
}
