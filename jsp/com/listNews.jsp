<%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%@ page import="java.net.URLEncoder"%><%

    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList<String> arrList = ioParam.getResultList();
	String[] arrS;
%><%@ page contentType="text/xml; charset=UTF-8"%><?xml version="1.0" encoding="UTF-8"?>
<news><%
if (!arrList.isEmpty()) {
	for(String strLine : arrList) {
		if (strLine.length() > 0) { 
			arrS = strLine.split("\\|\\|");%>
	<item>
		<title><%=arrS[0]%></title>
		<url><%=URLEncoder.encode(arrS[1])%></url>
	</item><%
		}
	}
}
%>
</news>
