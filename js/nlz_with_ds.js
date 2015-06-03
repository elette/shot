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

var runc;
function wheel(c, div) {
    var w='|';
//     (c==0)?w='��':(c==1)?w='��':(c==2)?w='--':(c==3)?w='��':c=0;
    (c==0)?w='|':(c==1)?w='/':(c==2)?w='-':(c==3)?w='\\':c=0;
    $E(div).innerHTML=w;
    runc = setTimeout(function(){wheel(c+1, div);}, 250);
}

function XHR(url,target) {
  // native XMLHttpRequest object
//   if (target != null) $E(target).innerHTML = '<img src="/shot/images/loading.gif"/>';
  if (target != null) wheel(0, target);
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {XHRDone(req, target);};
    req.open("GET", url, true);
    req.send(null);
    // IE/Windows ActiveX version
  } else if (window.ActiveXObject) {
    req = new ActiveXObject("Microsoft.XMLDOM");
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
      $E(target).innerHTML = results;
      if (target == 'ConnStatus') target.innerHTML = '<font style="font-size:12pt; color:#B0B0B0">�Ƣ�</font>';
      if (target == 'pane') resizeTables();
      if (target == 'paneDOM') callXML('true');
    } else {
      $E(target).innerHTML="XHR error:\n" + req.statusText;
    }
  }
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
                sm('msgdetail', 300, 300);
            }
        }
    };
    req.open("GET", url, false);
    req.send(null);
    return rtnXML;
}

// function CHRDone() {
//   // only if req is "loaded"
//   if (req.readyState == 4) {
//     // only if "OK"
//     if (req.status == 200 || req.status == 304) {
// //      alert(req.responseText);
//       return req.responseText;
// //       target.setDataXML(results, true);
// //       if(bChart) target.draw();
//     } else {
//       $E('msgdetail').innerHTML = req.statusText;
//       sm('msgdetail', 300, 300);
//     }
//   }
// }


function urlfmt(txt) {
//     txt = txt.replace(/\n/g, " ");
    txt = txt.replace(/%/g, "%25");
    txt = txt.replace(/\+/g, "%2B");
    txt = encodeURI(txt);
//     alert(txt);
    return txt;
}

function callServer(SQL) {
    $E('sqllist').value = SQL;
//     alert(SQL.replace(/\n/g, " ");
    var url = "CommandAction?CID=Mon&CMD=list&SQL=" + urlfmt(SQL);

    $E('gridTable').style.top = window.innerHeight-$E('gridTable').clientHeight;
    XHR(url, 'pane');
}

function callServerMsg(SQL) {
    var url = "CommandAction?CID=Mon&CMD=getmsg&SQL=" + urlfmt(SQL);

    XHR(url, 'msgdetail');
    sm('msgbox', 400, 220);
}

function callXML(bTot) {
  xmlHttp.open("GET", "mon.xml?time=" + Math.random(), true);
  if (bTot == 'true') {
    xmlHttp.onreadystatechange = updateDOMPane;
//     $E('DomStatus').innerHTML = '<img src="/shot/images/loading.gif"/>';
    wheel(0, 'DomStatus');
  }
  else if (bTot == 'del')
    xmlHttp.onreadystatechange = removeDOMPane;
  else
    xmlHttp.onreadystatechange = updateXMLPane;
  xmlHttp.send(null);
}

function updateXMLPane() {
  if (xmlHttp.readyState == 4) {
    var xmlDoc=xmlHttp.responseXML;

    var x = xmlDoc.evaluate("/menu/item[name='help']/sql", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE , null);

    var txtQry = x.singleNodeValue.textContent;
    var sqlmsg = document.getElementById("SQLMSG").value;
    var errcode = sqlmsg.substring(sqlmsg.search(/CODE/i)+6, sqlmsg.search(/, SQLSTATE/i));

    callServerMsg(txtQry.replace("?", "'SQL"+errcode+"'"));
  }
}

function updateDOMPane() {
  if (xmlHttp.readyState == 4) {
    var xmlDoc=xmlHttp.responseXML;
//     $E('paneDOM').innerHTML = xmlDoc;
    var list = "";

    var x = xmlDoc.evaluate("/menu/item/name", xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE , null);
    var item = x.iterateNext();
    while (item) {
//         alert(item.parentNode.childNodes[5].textContent);
        list += "<li title=\"" + item.parentNode.childNodes[5].textContent + "\" id=\"" + item.textContent + "\" onClick='selectRow(this);'>" + item.textContent + "</li>"
        item = x.iterateNext();
    }
    $E('paneDOM').innerHTML = list;
    clearTimeout(runc);
    $E('DomStatus').innerHTML = '<font style="font-size:12pt; color:#B0B0B0">�Ƣ�</font>';
  }
}

function syncScroll() {
    if (document.getElementById("bodyDiv").scrollLeft) {
        document.getElementById("headDiv").scrollLeft = document.getElementById("bodyDiv").scrollLeft;
    }
}

var propYN = true;
function resizeTables()
{
    if (!document.getElementById("headTab")) return;
    var tableArr = new Array();
    tableArr[0] = document.getElementById("headTab");
    tableArr[1] = document.getElementById("bodyTab");

    var adj = (propYN)?345:22 + 20;
    $E('headDiv').style.width = (window.innerWidth - 17 - adj) + 'px';
    $E('bodyDiv').style.width = (window.innerWidth - adj) +'px';
    $E('gridTable').style.left = (propYN)?325:22;

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

function startConn() {
    document.getElementsByName('HOST')[0].value = $E('HOST').value;
    document.getElementsByName('PORT')[0].value = $E('PORT').value;
    document.getElementsByName('DB')[0].value = $E('DB').value;
    document.getElementsByName('USER')[0].value = $E('USER').value;
}

function initConn() {
    startConn();
    var url = "CommandAction?CID=DBConn&CMD=initConnectionPool&HOST=" + $E('HOST').value + "&PORT=" + $E('PORT').value + "&DB=" + $E('DB').value + "&USER=" + $E('USER').value + "&PASS=" + $E('PASS').value;

    XHR(url, 'ConnStatus');
}
function releaseConn() {
    var url = "CommandAction?CID=DBConn&CMD=releaseConnectionPool";

    XHR(url, 'ConnStatus');
    setTimeout(function(){checkConn();}, 200);
}
function checkConn() {
    var url = "CommandAction?CID=DBConn&CMD=getConnected";

    XHR(url, 'ConnStatus');
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
    var highlightColor = '#606080';

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
        var table = document.createElement("table"); table.style.class="propTab"; table.style="border:solid 1px #D0D0D0;border-spacing:1px;padding:none;font-size:8pt";
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

var arrShot = new Array();

function addShot(id) {
    var pane = document.createElement("DIV");
    arrShot.push(new Array(pane, null));

//  arrShot[arrShot.length][0] = pane;

    pane.setAttribute("id", id);
    pane.setAttribute("class", "canvas");
    $E('graph').appendChild(pane);
    callShot(pane);
//     drawCanvas();

}

function removeShot(intShot) {
    clearInterval(arrShot[intShot][2]);
    arrShot[intShot][1].clearAll();
    arrShot[intShot][1].destructor();
    $E('graph').removeChild(arrShot[intShot][0]);
    arrShot.splice(intShot,1);
    drawCanvas();
}

function drawCanvas() {
    var totWidth = $E('graph').clientWidth;
    var totHeight = $E('graph').clientHeight;
    var canvasLeft = $E('graph').clientLeft;
    var canvasTop = $E('graph').clientTop;

    var paneHeight;
    var paneWidth;

    paneHeight=parseInt(totHeight / ((arrShot.length>4)?4:arrShot.length));
    paneWidth=parseInt(totWidth / (parseInt((arrShot.length-1)/4) + 1));
// alert(paneWidth);
    for(i=0;i<arrShot.length;i++) {
        arrShot[i][0].style.height = paneHeight;
        arrShot[i][0].style.width = paneWidth;
        arrShot[i][0].style.left = canvasLeft + paneWidth * parseInt(i/4);
        arrShot[i][0].style.top = canvasTop + paneHeight * parseInt(i%4);
//         arrShot[i][1].resize(paneWidth, paneHeight);
        arrShot[i][1].refresh();
    }
    var strList='';
    for (i=0; i<arrShot.length; i++)
        strList += arrShot[i][0].id + "&nbsp;<a href='javascript:removeShot(" + i +");'>��</a><br>";
    $E('chartList').innerHTML = strList;
}

function callShot(pane) {
    var url = "CommandAction?CID=Mon&CMD=getxml&SQL=" + urlfmt($E('SQL').value + '&nocache=' + Math.random());
    var iChart;
    var DStore;
//     $(document).ready(function() {
        var options = {
            view: "line",
            container: pane,
//             value: "#value#",
//             item: {
//                 borderColor: "#1293f8",
//                 color: "#ffffff"
//             },
            line: {
                color: "#1293f8",
                width: 3
            },
            xAxis: {
//              template: function(obj){
//                  var t = obj.time;
//                  var minutes = parseInt(t.split(":")[1],10);
//                  if(minutes%10==0)
//                      return obj.time;
//                  else
//                      return "";
//              },

//                 template: function (obj) {
//                     return dhtmlx.Date.date_to_str("%m/%d/%Y")(obj.$unit);
//                 },
//                 value: function (obj) {
//                     return dhtmlx.Date.str_to_date("%m/%d/%Y")(obj.time);
//                 },
//                 units: {
//                     start: new Date(dateTimeReader(asDate[0])),
//                     end: new Date(dateTimeReader(asDate[MsgDate.length - 1])),
//                     next: function(d) {
//                         return dhtmlx.Date.add(d, 2, "day");
//                     }
//                 },

                template: "#time#",
                lines: false
            },
            offset: 0,
            yAxis: {
                start: 0,
                end: 100,
                step: 10//,
//              template: function(obj) {
//                  return (obj % 20 ? "": obj);
//              }
            }
        };

        var dsOptions = {
            dataFeed: url,
            datatype: "xml"
        };

        DStore = new dhtmlXDataStore(dsOptions);
        DStore.load(url, "xml");

        iChart = new dhtmlXChart(options);
        iChart.sync(DStore);

        iChart.attachEvent("iv", setiv());

// alert("_chart count: " + iChart.dataCount());
    arrShot[arrShot.length-1][1] = iChart;
alert("_shots: " + arrShot.length);
    drawCanvas();

    function setiv() {
        arrShot[arrShot.length-1][2] = setInterval(reqData, 2000);
    }

    function reqData() {

//         $.get(url, function(xml) {

// // alert('aaa');
//             // Split the lines
//             var $xml = $(xml);
//
// //             var i=0;
//             // push series
//             $xml.find('series').each(function(i, series) {
//                 // push data points
//                 $(series).find('value').each(function(i, point) {
//                 // add data
//                     iChart.add({
// //                      item: {},
//                         value: parseInt($(point).text())
//                     });
// // alert($(point).text());
//                     if (iChart.dataCount() == 10) iChart.remove(iChart.first());
//                 });
//
// //                 i++;
//             });
//
// //             iChart.redraw();
//         });  //function(xml)

//      DStore.add
// alert(DStore.dataCount());
        DStore.load(url, "xml");
//         iChart.sync(DStore);
    }
//     arrShot[arrShot.length-1][1] = iChart;
//     });


}

var run;
function callStream(tChart) {
    var url = "CommandAction?CID=Mon&CMD=getxml&SQL=" + urlfmt($E('SQL').value + '&' + Math.random());


}

function callChart() {
    myChart.draw();
    if (run) clearTimeout(run);
}

function insertItem() {
    var url = "CommandAction?CID=DOM&CMD=insNode&Name=" + urlfmt($E('ItemName').value + "&Schema=" + $E('Schema').value  + "&Sql=" + $E('Statement').value + "&Desc=" + $E('Desc').value);

    XHR(url, 'paneDOM');
}

function selectRow(mEvent) {
    if (!mEvent)
        mEvent = window.event;
    if (mEvent.srcElement) {
        $E('sqllist').value = mEvent.srcElement.id;
        $E('SQL').value = mEvent.srcElement.title;
    }
    else if (mEvent.target) {
        $E('sqllist').value = mEvent.target.id;
        $E('SQL').value = mEvent.target.title;
    }
    trackItemHighlight(mEvent);
    $E('selectedRow').value = mEvent.innerHTML;

}
function removeItem() {
    var url = "CommandAction?CID=DOM&CMD=delNode&Name=" + $E('selectedRow').value;

    XHR(url, 'paneDOM');
}

function copy2clipboard(obj) {
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
        }catch(e){;}
    }
}