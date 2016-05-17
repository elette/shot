<%@ page contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/com/property.jsp" %>

<%
	InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList arrList = ioParam.getResultList();
%>

<html>

<body>
	<table border="0" cellspacing="1" cellpadding="1" valign="middle" width="600">
		<tr class="tr_head"><%
if (arrList.isEmpty()) {
%><td>0 rows</td></tr><%
}
else {
	Hashtable hstResult = null;
	hstResult = (Hashtable)arrList.get(0);
	Enumeration e = hstResult.keys();
	Vector vtCol = ioParam.getColName();
	int cnt = vtCol.size();
	
 	for(int i=0; i<cnt; i++) {
%><td><%=vtCol.elementAt(i)%></td><%
	}
%></tr><%
	for(int i=0; i<arrList.size(); i++) {
		hstResult = (Hashtable)arrList.get(i);
%><tr><%
	 	for(int j=0; j<cnt; j++) {
%><td><%=hstResult.get(vtCol.elementAt(j))%></td><%
		}
%></tr><%
	}
}
%></table>
</body>

<html>
