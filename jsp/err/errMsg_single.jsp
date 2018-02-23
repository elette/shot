<%@ page import="nlz.com.InoutParameter"%>
<%@ include file="/jsp/com/property.jsp" %>
<%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	HashObject ho = ioParam.getInputHashObject();

%>
<table border="0" align="left" cellspacing="1" cellpadding="1" valign="top">
	<tr>
		<td><span class="infocircle">!</span></td>
		<td>
		<div id="SQLMSG" readonly style="border:none;width:100%;"><%=ioParam.getMessageDetail()%></div>
		</td>
		<td style="word-wrap:break-word; white-space:normal;"><%=(String)ho.get("SQL",HashObject.YES)%>
		</td>
		<td>| <%=ioParam.getIntResult()%> <%=ioParam.getMessage()%></td>
		<td align="right"><%
// if (ioParam.getIntResult() != 202) {
// if (ioParam.getMessageDetail().substring(0,3).equals("DB2")) {
%>
			<button onClick="callXML()">Check</button>
<%
// }
%>
			<button onClick="javascript:hideGridTable();">Close</button>
		</td>
	</tr>
	</tr>
</table>
