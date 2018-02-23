<%@ include file="/jsp/com/property.jsp" %><%
	InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList arrList = ioParam.getResultList();
%>
<ul style="list-style-type:none;">
<li class="board_li">Tablespaces<%
	Hashtable hstResult = null;
	hstResult = (Hashtable)arrList.get(0);
	Enumeration e = hstResult.keys();
	Vector vtCol = ioParam.getColName();
	int cnt = vtCol.size();
	
%><table border="0" cellspacing="0" cellpadding="1" valign="top" width="100%"><%
	for(int i=0; i<arrList.size(); i++) {
		hstResult = (Hashtable)arrList.get(i);
%>
<tr>
<td><%=hstResult.get("TBSP_NAME")%></td>
<td align="right"><%=hstResult.get("SIZE_M")%> MB</td>
<td align="right">(<%=hstResult.get("PCT")+"%"%>)</td>
<td><table><tr><td style="width:<%=Float.parseFloat((String)hstResult.get("PCT"))*2%>; background-color:#<%=Double.toHexString(Math.random()).substring(4,10)%>;"></td></tr></table></td>
<td><%=(hstResult.get("AUTO_RESIZE").equals("1"))?"AUTO":""%></td>
<td>(<%=hstResult.get("BPNAME")+", "%></td>
<td><%=hstResult.get("PAGESIZE")%>)</td>
<td></td></tr>
<%
	}
%>
</table>
</li>
</ul>
