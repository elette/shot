<%@ page import="java.util.Date"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/jsp/com/property.jsp" %><%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	HashObject ho = ioParam.getInputHashObject();

%>	
<table id="RESULTMSG"><tr>
	<td class="line_td"><%=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())%></td>
	<td class="line_td"><span class="infocircle">!</span></td>
	<td class="line_td"><%=ioParam.getMessageDetail()%></td>
	<td class="line_td" style="word-wrap:break-word; white-space:normal;"><%=(String)ho.get("SQL",HashObject.YES)%></td><%
if (ioParam.getMessageDetail().substring(0,3).equals("DB2")) {
%>
	<td><button onClick="$E('SQLMSG').innerHTML='<%=ioParam.getMessageDetail()%>';callXML();">?</button></td><%
}
%>
</tr></table>