<%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%

    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
    ArrayList<String[]> arrList = ioParam.getResultList();
%><%@ page contentType="text/xml; charset=UTF-8" %><?xml version="1.0" encoding="UTF-8"?>
<file><%
if (!arrList.isEmpty()) {
	for(int i=0; i<arrList.size(); i++) {%>
	<item>
	<name><%=arrList.get(i)[0]%></name>
	<path><%=arrList.get(i)[1]%></path>
	</item><%
	}
}
%>
</file>
