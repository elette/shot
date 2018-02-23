<%------------------------------------------------------------------
 *
 * @author      : hdkwon
 * @version     : 1.0
 * @since       : 2006/11/20
 * @description : logout.jsp
 *
--------------------------------------------------------------------%>

<%

	/* session */
	session.invalidate();

	response.sendRedirect( "./login.jsp" );
%>