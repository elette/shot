<%@ page import="java.util.Date"%><%@ page import="java.text.SimpleDateFormat"%><%@ include file="/jsp/com/property.jsp" %><%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	HashObject ho = ioParam.getInputHashObject();
    ArrayList arrList = ioParam.getResultList();
%><%=arrList.size()%> rows (<%=ho.get("RUNTIME",HashObject.YES)%> ms)
<!--a href="javascript:hideGridTable();">V</a-->
<table id="RESULTMSG" style="display:block;"><tr>
<td class="line_td"><%=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())%></td>
<td class="line_td"></td>
<td class="line_td"><%=ho.get("RUNTIME",HashObject.YES)%> (ms)</td>
<td class="line_td" style="word-wrap:break-word; white-space:normal;"><%=(String)ho.get("SQL",HashObject.YES)%></td>
<td class="line_td"><button onclick="javascript:$E('SQL').value='<%=(String)ho.get("SQL",HashObject.YES)%>';">&gt;</button></td>
</tr></table>
<div id="headDiv" style="overflow:hidden;width:583px;">
    <table id="headTab" border="0" cellspacing="1" cellpadding="1">
        <tr><th><font onclick='javascript:sizeGrid();'>>_</font></th><%
    Hashtable hstResult = null;
    Vector vtCol = ioParam.getColName();
    int cnt = vtCol.size();

    for(int i=0; i<cnt; i++) {
%><th bgcolor="#D6D2C9" class="paneheader"><%=vtCol.elementAt(i)%></th><%
    }
%></tr>
</table>
</div>
<div id="bodyDiv" onScroll="syncScroll()" style="overflow:scroll;height:200px;">
    <table id="bodyTab" border="0" cellspacing="1" cellpadding="1" onMouseDown ="javascript:trackTableHighlight(event, '#404040');"><%
    for(int i=0; i<arrList.size(); i++) {
        hstResult = (Hashtable)arrList.get(i);
%><tr><td><%=i+1%></td><%
        for(int j=0; j<cnt; j++) {
%><td><%=hstResult.get(vtCol.elementAt(j))%></td><%
        }
%></tr><%
    }
%></table>
</div>