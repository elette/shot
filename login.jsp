<%@ page contentType="text/html; charset=euc-kr"%>
<html>
<head>

<title>�Ŀ���Ÿ</title>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<link rel="stylesheet" href="/mtb/css/style.css" type="text/css">
<script>
// ������ �� ������ ȣ�� �� top���� �̵�
if (top.leftFrame != null) {
    top.location.href = window.location.href;
}
/* ����� �α��� ó�� �� �����޽��� */
function bodyOnLoad() {
			document.login.userID.focus();
}

function beforeSubmit(){
    var form = document.login;

	if(	form.userID.value == ''){
		alert('ID�� �Է��� �ּ���.');
		form.userID.focus();
		return false;
	}
/*
	if ( form.userPW.value == '' )
	{
		alert('�н����带 �Է��� �ּ���!');
		document.login.userPW.focus();
		return false;
	}
*/
    return true;
}

</script>

</head>

<%

	/* �α��� ���� */
	String err = request.getParameter( "err" );
	String uid = request.getParameter( "uid" );
    if ( uid == null ) uid = "";

    if ( err != null && err.equals("y") ) {
%>
<script>
<!--
    alert( "�α��� ������ Ȯ���ϼ���");
-->
</script>
<%
    }
%>

<body onLoad="javascript:bodyOnLoad();" topmargin="200">
<form name="login" method="post" action='./CommandAction?CID=CommonLogin&CMD=isValidLogin' onSubmit="javascript:return beforeSubmit();">
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
	<tr align="center">
		<td width="100%">
		<table width="650" border="0" cellspacing="0" cellpadding="0">
    	<tr>
    		<td background="./images/login_01.gif" width="650" height="120" valign="top" align="center">&nbsp;</td>
    	</tr>
      <tr>
      	<td background="./images/login_02.gif" width="650" height="120" valign="top" align="center">
			<table width="309">
				<tr>
					<td width="63" class="login"><div align="left">ID</div></td>
					<td width="200"><input type="text" name="userID" value="<%=uid%>" tabindex=1></td>
					<td width="40" rowspan="2"><input type="submit" value="�α���" tabindex=3 style="padding-top:5px;"></td>
				</tr>
				<tr>
					<td width="63" class="login"><div align="left">PWD</div></td>
					<td width="200"><input type="password" name="userPW" class="login" value="" tabindex=2></td>
				</tr>
			</table>
			<table width="309">
				<tr><td height="20" class="login" align="center">&nbsp;</td></tr>
			</table>
			</td>
      </tr>
      <tr><td>&nbsp;</td></tr>
    </table>
		</td>
	</tr>
</table>
</form>
</body>
</html>