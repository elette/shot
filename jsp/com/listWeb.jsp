<%@ page contentType="text/html; charset=UTF-8"%><%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%

    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList<String> arrList = ioParam.getResultList();
	String[] arrS;
%><%
if (!arrList.isEmpty()) {
%><table border="0" cellspacing="0" cellpadding="2" valign="middle" width="400"><ul style="color:808080"><%
	for(String strLine : arrList) {
		if (strLine.length() > 0) { 
			arrS = strLine.split("\\|\\|");%>
	<li onclick="javascript:callServerPage('C:/apache-tomcat-6.0.43/webapps/shot/jsp/webpage.py', '<%=arrS[1]%>')"><%=arrS[0]%></li><%
		}
	}
%></ul>
</table><%
}
%>
