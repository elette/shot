<%------------------------------------------------------------------
 *
 * @author      : hdkwon
 * @version     : 1.0
 * @since       : 2006/11/20
 * @description : login.jsp
 *
--------------------------------------------------------------------%>
<%@ page contentType="text/html; charset=euc-kr" %>

<%
    //session is null
	if ( session.getAttribute( "S_USER_ID" ) == null || session.getAttribute( "S_USER_ID" ).equals( "" ) || session.getAttribute( "S_USER_ID" ).equals( "null" ) )
	{
    	response.sendRedirect( "/mtb/login.jsp" );
        return;
    }
%>