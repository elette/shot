<%@ page contentType="text/html; charset=UTF-8"%><%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	HashObject ho = ioParam.getInputHashObject();
	String[][] dbinfo  = (String[][])ho.getArray("DBINFO");

int intResult = ioParam.getIntResult();
if (intResult == 401 && dbinfo != null) { %>
<table><tr align="center">
<%
if (dbinfo.length>0) {%>
<td>
<%
	for (int i=0; i<dbinfo.length; i++) {
		if (i>0) {%>
</td><td><font style="size:18pt;">|</font></td><%
		}%>
</td><td><font size=1 sytle="font-size:10pt; color:#888;"><%=dbinfo[i][0]%></font><br><%=dbinfo[i][1]%><%
	}
%>
</td>
<%
	if (dbinfo[0][1].equals("DB2")) { %>
<td>| <font onclick="javascript:getDash();" style="font-size:18pt;font-weight:normal;">≡</font>
<font onclick="javascript:getStmm();" style="font-weight:bold;">STMM</font></td>
<%
	} 
}%>
</tr></table>
<%
}
%>