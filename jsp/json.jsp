<%@ include file="/jsp/com/property.jsp" %><%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	HashObject ho = ioParam.getInputHashObject();
%><%=ho.get("json",HashObject.YES)%>