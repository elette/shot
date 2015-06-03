<%------------------------------------------------------------------
 *
 * @author      : hdkwon
 * @version     : 1.0
 * @since       : 2006/11/20
 * @description : login.jsp
 *
--------------------------------------------------------------------%>
<%@ include file="/jsp/com/property.jsp" %>

<%
//	HttpSession session = request.getSession( true );
	InoutParameter ioParam  = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList arrList       = ioParam.getResultList();
	HashObject ho           = ioParam.getInputHashObject();

	if( arrList.size() > 0 ) {
        Hashtable hstResult = (Hashtable)arrList.get(0);

		/* session setting */
		session.setAttribute( "S_USER_ID" , (String)hstResult.get("USRID") );
		session.setAttribute( "S_USER_NM" , (String)hstResult.get("USRNM") );
		session.setAttribute( "S_YN" , "Y" );
		session.setAttribute( "S_USER_GRP" , (String)hstResult.get("USRGRPID") );

		response.sendRedirect( "./jsp/metadata/common/index.jsp" );
	} else {
		response.sendRedirect( "./login.jsp?err=y&uid=" + (String)ho.get("userID",HashObject.YES) );
	}
%>