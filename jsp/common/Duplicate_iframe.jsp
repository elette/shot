<%------------------------------------------------------------------
 *
 * @author      : ��ö�� 
 * @version     : 1.0
 * @since       : 2006/11/21
 * @description : index.jsp
 *
--------------------------------------------------------------------%>

<%@ page contentType="text/html; charset=euc-kr"%>
<%@ page import="mtb.com.InoutParameter"%>
<%@ include file="/jsp/com/property.jsp" %>

<%
	InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
%>

<script>
function duplicateResult(){
	<%
		ArrayList arrList = ioParam.getResultList();
		if(arrList.size()<1){
	%>
			alert("��� �� �� �ֽ��ϴ�.");
	<%		
		}else{
	%>			
			alert("�̹� ��ϵǾ� �ֽ��ϴ�");
	<%			
		}
	%>
}	
</script>	
<body	onload="duplicateResult()">
</body>	

