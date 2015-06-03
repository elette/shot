<%@ include file="/jsp/com/property.jsp" %>

<%
	InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList arrList = ioParam.getResultList();
%>
<ul style="list-style-type:none;">
<li class="board_li">Memory Pool
<%
	Hashtable hstResult = null;
	Vector vtCol = ioParam.getColName();
	int cnt = vtCol.size();
	
 	// for(int i=0; i<cnt; i++) {
// vtCol.elementAt(i)+", "
// <%
	// }
// %>
<%
	String[] color = new String[arrList.size()];
	for(int i=0; i<arrList.size(); i++) 
		color[i] = Double.toHexString(Math.random()).substring(4,10);
	
%>	
<table width="300" border="0" cellspacing="0" cellpadding="1">
<tr><td><table border="0" cellspacing="0" cellpadding="0" height="14"><tr>
<%
	for(int i=1; i<arrList.size(); i++) {
		hstResult = (Hashtable)arrList.get(i);
%>
<td style="width:<%=hstResult.get("PCT")%>%;background-color:<%=color[i]%>;"></td>
<%
	}
%>
</tr></table></td>
</table>
<table width="300" border="0" cellspacing="0" cellpadding="1" valign="top">
<%
	hstResult = (Hashtable)arrList.get(0);
%>
<tr>
<td><table><tr><td style="width:10px;height:10px;"></td></tr></table></td>
<td><%=hstResult.get("MEM_POOL")%></td>
<td align="right"><%=hstResult.get("POOL_USED")%> MB</td>
<td align="right"></td>
</tr>
<%
	for(int i=1; i<arrList.size(); i++) {
		hstResult = (Hashtable)arrList.get(i);
%>
<tr>
<td><table><tr><td style="width:10px;height:10px;background-color:#<%=color[i]%>;"></td></tr></table></td>
<td><%=hstResult.get("MEM_POOL")%></td>
<td align="right"><%=hstResult.get("POOL_USED")%> MB</td>
<td align="right">(<%=hstResult.get("PCT")+"%"%>)</td>
</tr>
<%
	}
%>
</table>
</li>
</ul>
