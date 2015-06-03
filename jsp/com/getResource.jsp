<%@ include file="/jsp/com/property.jsp" %>

<%
	InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList arrList = ioParam.getResultList();
%>
<ul style="list-style-type:none;">
<li class="board_li">Resource
<%
if (arrList.size() != 0) {
	Hashtable hstResult = null;
	hstResult = (Hashtable)arrList.get(0);
	Vector vtCol = ioParam.getColName();
	int cnt = vtCol.size();
	
%>
<table border="0" cellspacing="0" cellpadding="1" valign="top">
<%
 	for(int i=0; i<cnt; i++) {
%><tr><td><%=vtCol.elementAt(i)%></td><td><%=hstResult.get(vtCol.elementAt(i))%></td></tr>
<%
	}
%>
</table>
<%
}
%>
</li>
</ul>
