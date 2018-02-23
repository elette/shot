<%@ page import="nlz.com.InoutParameter"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/jsp/com/property.jsp" %>
<%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	HashObject ho = ioParam.getInputHashObject();

%>
	var tr = document.createElement("tr");
	var td = document.createElement("td"); td.className = "line_td"; td.innerHTML = "<%=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())%>"; tr.appendChild(td);
	td = document.createElement("td"); td.className = "line_td"; td.innerHTML = '<span class="infocircle">!</span>'; tr.appendChild(td);
	td = document.createElement("td"); td.className = "line_td"; td.innerHTML = '<%=ioParam.getMessageDetail()%>'; tr.appendChild(td);
	td = document.createElement("td"); td.className = "line_td"; td.innerHTML = "<div style='word-wrap:break-word; white-space:normal;'><%=(String)ho.get("SQL",HashObject.YES)%></div>"; tr.appendChild(td);
<%
if (ioParam.getMessageDetail().substring(0,3).equals("DB2")) {%>
	td = document.createElement("td"); td.className = "line_td"; td.innerHTML = '<button onClick="$E(\'SQLMSG\').innerHTML=\'<%=ioParam.getMessageDetail()%>\';callXML();">?</button>'; tr.appendChild(td);
<%
}
%>	var table = $E('gridInfo');
	table.insertBefore(tr, table.firstChild);