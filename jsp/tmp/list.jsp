<%------------------------------------------------------------------
 *
 * @author      : changhoon
 * @version     : 1.0
 * @since       : 2006/06/27
 * @description : list.jsp
 *
--------------------------------------------------------------------%>

<%@ page contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/com/property.jsp" %>

<%
	InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList arrList = ioParam.getResultList();
%>

<html>

<body topmargin=30 leftmargin=0>
	<table border="0" cellspacing="1" cellpadding="1" valign="middle" width="200" bgcolor="#D6D2C9">
		<tr>
            <td class="td_line" colspan="2"></td>
        </tr>
		<tr class="tr_head">
            <td>부서아이디</td>
            <td>부서명</td>
        </tr>
<%
	Hashtable hstResult = null;
	for(int i=0; i<arrList.size(); i++) {
		hstResult = (Hashtable)arrList.get(i);
%>
		<tr class="tr_body">
            <td width=100 align="center"><%=(String)hstResult.get("DEPT_NO")%></td>
            <td width=100 align="center"><%=(String)hstResult.get("DEPT_NM")%></td>
        </tr>
<%
	}
%>
	</table>
</body>

<html>