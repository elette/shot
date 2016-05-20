<%@ page import="java.util.Date"%><%@ page import="java.text.SimpleDateFormat"%><%@ include file="/jsp/com/property.jsp" %><%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	HashObject ho = ioParam.getInputHashObject();
    ArrayList arrList = ioParam.getResultList();
%>(<%=ho.get("RUNTIME",HashObject.YES)%> ms)
<table id="RESULTMSG" style="display:block;"><tr>
<td class="line_td"><%=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())%></td>
<td class="line_td"></td>
<td class="line_td"><%=ho.get("RUNTIME",HashObject.YES)%> (ms)</td>
<td class="line_td" style="word-wrap:break-word; white-space:normal;"><%=(String)ho.get("SQL",HashObject.YES)%></td>
<td class="line_td"><button onclick="javascript:$E('SQL').value='<%=(String)ho.get("SQL",HashObject.YES)%>';">&gt;</button></td>
</tr></table>
