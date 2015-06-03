<%@ page contentType="text/html; charset=UTF-8"%><%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	HashObject ho = ioParam.getInputHashObject();
	String[][] dbinfo  = (String[][])ho.getArray("DBINFO");

int intResult = ioParam.getIntResult();
if (intResult == 401 && dbinfo != null) { 
if (dbinfo.length>0) {
	for (int i=0; i<dbinfo.length; i++) {
		if (i>0) {
%> <font style="color:#CCC;">|</font> <%
		}
%><%=dbinfo[i][0] + ": " + dbinfo[i][1]%><%
	}
	if (dbinfo[0][1].equals("DB2")) {
%> <font style="color:#CCC;">|</font> <font onclick="javascript:getDash();" style="font-size:18pt;font-weight:bold;">≡</font>
<font onclick="javascript:getStmm();" style="font-weight:bold;">STMM</font><%
	}
}
}
%>