<%@ page contentType="text/html; charset=UTF-8"%><%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%

    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList<String> arrList = ioParam.getResultList();
%><%
if (!arrList.isEmpty()) {
%><table border="1" cellspacing="0" cellpadding="2" valign="middle" width="400"><%
	for(String strLine : arrList) {
		if (strLine.length() > 0) { %>
	<tr>
	<td style="word-wrap:break-word; white-space:normal;"><%=strLine%></td>
	</tr><%
		}
	}
%>
</table><%
}
%>
