<%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList<String[]> arrList = ioParam.getResultList();
%><%
if (!arrList.isEmpty()) {
%><table id="resultJoin" border="1" cellspacing="0" cellpadding="2" valign="middle"><%
	for(String[] strLine : arrList) {%>
		<tr><%
		for(String strCell : strLine) {%>
		<td><%=strCell%></td><%
		}%>
		</tr><%
	}
%>
</table><%
}
%>
