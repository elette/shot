<%@ include file="/jsp/com/property.jsp" %>

<%
	InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList arrList = ioParam.getResultList();
%>
<ul style="list-style-type:none;">
<li class="board_li">CPU Usage
<%
	Hashtable hstResult = null;
	hstResult = (Hashtable)arrList.get(0);
	Enumeration e = hstResult.keys();
	Vector vtCol = ioParam.getColName();
	int cnt = vtCol.size();
%>
<table border="0" cellspacing="0" cellpadding="1" valign="top">
<%
	for(int i=0; i<arrList.size(); i++) {
		hstResult = (Hashtable)arrList.get(i);
%>
<tr>
<td><%=hstResult.get("CPU_LOAD_SHORT")%> %(~1')</td>
<td></td>
<td><%=hstResult.get("CPU_LOAD_LONG")%> %(~10')</td>
<td></td></tr>
<%
	}
%>
</table>
</li>
</ul>
