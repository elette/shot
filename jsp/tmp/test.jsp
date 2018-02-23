<%------------------------------------------------------------------
 *
 * @author      : 류철희
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

<head>
	<title><%=ENV_TITLE%></title>
</head>

<body topmargin=30 leftmargin=0>
	<table border="0" cellspacing="1" cellpadding="1" valign="middle" width="600" bgcolor="#D6D2C9">
		<tr>
            <td class="td_line" colspan="2"></td>
        </tr>
		<tr class="tr_head">
            <td></td>
            <td>번호</td>
            <td>단어명</td>
            <td>영문약어</td>
            <td>영문약어(FullName)</td>
            <td>정의</td>
            <td>등록자</td>
            <td>등록일자</td>                                    
        </tr>
<%
	Hashtable hstResult = null;
	for(int i=0; i<arrList.size(); i++) {
		hstResult = (Hashtable)arrList.get(i);
%>
		<tr class="tr_body">
			<td align="center"></td>
			<td align="center"><%= i+1 %></td>
            <td align="center"><%=(String)hstResult.get("wrdnm")%></td>
            <td align="center"><%=(String)hstResult.get("engabb")%></td>
            <td align="center"><%=(String)hstResult.get("engdsc")%></td>
            <td align="center"><%=(String)hstResult.get("def")%></td>
            <td align="center"><%=(String)hstResult.get("usrid")%></td>
            <td align="center"><%=(String)hstResult.get("regtime")%></td>
        </tr>
<%
	}
%>
	</table>
</body>

</html>