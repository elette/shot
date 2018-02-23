<%------------------------------------------------------------------
 *
 * @author      : ·ùÃ¶Èñ
 * @version     : 1.0
 * @since       : 2006/06/27
 * @description : MsgPage.jsp
 *
--------------------------------------------------------------------%>

<%@ page contentType="text/html; charset=euc-kr"%>
<%@ page import="mtb.com.InoutParameter"%>
<%@ include file="/jsp/com/property.jsp" %>

<%
	InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
%>


<script>		
<%
	if(((String)ioParam.getMessageType()).equals("popgo") ){
%>
		
		alert("<%=(String)ioParam.getMessage()%>");
		opener.location.reload(true);
		self.close();
<%
	
	}
%>		
</script>