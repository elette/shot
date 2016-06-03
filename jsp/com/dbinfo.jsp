<%@ page contentType="text/html; charset=UTF-8"%><%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	HashObject ho = ioParam.getInputHashObject();
	String[][] dbinfo  = (String[][])ho.getArray("DBINFO");

int intResult = ioParam.getIntResult();
if (intResult == 401 && dbinfo != null) { %>
<table cellspacing="4" cellpadding="1">
<%
if (dbinfo.length>0) {%>
<tr bgcolor="#555" style="line-height:1px;">
<%
	for (int i=0; i<dbinfo.length; i++) {%>
<td></td><%
	}%>
<tr align="center">
<%
	for (int i=0; i<dbinfo.length; i++) {%>
<td><font size=1 sytle="font-size:10pt; color:#888;"><%=dbinfo[i][0]%></font><br><%=dbinfo[i][1]%></td><%
	}
	if (dbinfo[0][1].equals("DB2")) { %>
<td onclick="javascript:getDash();"><font style="font-size:18pt;font-weight:normal;">≡</font></td>
<td onclick="javascript:getStmm();"><font style="font-weight:bold;">STMM</font></td>
<%
	}%>
</tr><tr bgcolor="#555" style="line-height:1px;">
<%
	for (int i=0; i<dbinfo.length; i++) {%>
<td></td><%
	}
}%>
</tr></table>
<%
}
%>