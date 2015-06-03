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

<html>
<head>
<title><%=ENV_TITLE%></title>
</head>

<body leftmargin=20 topmargin=47>

	<!------------------------------------------------------------------------------------------------------------>
	<!------------------------------------------	TITLE	START	---------------------------------------------->
	<!------------------------------------------------------------------------------------------------------------>
	<table width="800" border="0" cellspacing="0" cellpadding="0">
        <tr> 
            <td width="600" height="18" class="title_default">�ܾ���ȸ</td>
        </tr>
        <tr> 
          <td height="3"><img src="/img/com/Content_titlebar.gif" width="795" height="1"></td>
        </tr>
        <tr> 
            <td height="16"></td>
        </tr>
        </table>
	<!------------------------------------------------------------------------------------------------------------>
	<!------------------------------------------	TITLE	END		---------------------------------------------->
	<!------------------------------------------------------------------------------------------------------------>

	<!------------------------------------------------------------------------------------------------------------>
	<!------------------------------------------	SEARCH	START	---------------------------------------------->
	<!------------------------------------------------------------------------------------------------------------>
	<table width="100%">
		<tr>
			<td align="right">
				<input type="button" value="�ű�" class="btn_style" onClick="goSearch()"> 
				<input type="button" value="����" class="btn_style" onClick="goSearch()"> 
				<input type="button" value="����" class="btn_style" onClick="goSearch()"> 
				<input type="button" value="������ ����" class="btn_style" onClick="goSearch()"></td>
		</tr>
	</table>
	
	<table width="800" border="0" cellspacing="1" cellpadding="1" class="table_line_outline">

		<form name="SearchForm" method="post" action="/cam/campListP.jsp">
			<input type="hidden" name="p_page" value="1">
			<input type="hidden" name="p_pagerow" value="5">
			<input type="hidden" name="p_camp_no" value="">
		
			<tr> 
				<td class="td_line" colspan="6"></td>
			</tr>
			<tr> 
				<td width="60" class="td_title">�˻���<!--ķ���θ�--></td>
				<td class="td_body" colspan="5">
					<input type="text" name="p_camp_nm" class="input" style="width:200;" >&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="�˻�" class="btn_style" onClick="goSearch()">
				</td>
				
			</tr>
			<tr> 
				<td width="60" class="td_title">�˻���<!--ķ���θ�--></td>
				<td width="220" class="td_body">
					<input type="text" name="p_camp_nm" class="input" style="width:200;" value="">
				</td>
				<td width="70" class="td_title">ķ���θ���<!--����--></td>
				<td width="140" class="td_body">
					<select name="p_camp_ty" class="select" value="">
						<option value=''>:: ���� ���� ::</option>


						<option value='000'>�Ǹ� ��ġ</option>



						<option value='001'>�� ����</option>



						<option value='002'>���ο� �� ��ġ</option>



						<option value='003'>������ �׽�Ʈ��</option>


					</select>
				</td>
				<td width="45" class="td_title">����<!--����--></td>
				<td width="265" class="td_body">
					<select name="p_status" class="select" value="000">
						<option value='ALL'>:: ���� ���� ::</option>


						<option value='000' selected>����</option>



						<option value='001'>�������</option>



						<option value='002'>����</option>


					</select>
				</td>
			</tr>			
			<tr> 
				<td class="td_title">�����<!--�����--></td>
				<td class="td_body">
					<input type="text" name="p_stdt" class="readonly_style" style="width:70;cursor:hand" value="" readonly onCLick="show_calendar('search_form', 'p_stdt', event.screenX, event.screenY)">
					<img src="but_cal.gif" class="img_calendar" align="absmiddle" onClick="show_calendar('search_form','p_stdt',event.screenX,event.screenY)">
					&nbsp;&nbsp;~&nbsp;&nbsp;
					<input type="text" name="p_eddt" class="readonly_style" style="width:70;cursor:hand" value="" readonly onClick="show_calendar('search_form', 'p_eddt', event.screenX, event.screenY)">
					<img src="but_cal.gif" class="img_calendar" align="absmiddle" onClick="show_calendar('search_form', 'p_eddt', event.screenX, event.screenY)">
				</td>
				<td class="td_title">����ڱ׷�<!--�׷�--></td>
				<td class="td_body">

					<select name="p_dept_no" class="select" onchange="javascript:getUserList('search_form','p_user_id',this.value,'false');" value="">
						<option value=''>:: �׷� ���� ::</option>

						<option value='1'>ADMIN</option>

					</select>

				</td>
				<td class="td_title">�����<!--�����--></td>
				<td class="td_body">
					<select name="p_user_id" class="select" value="">
						<option value=''>:: ����� ���� ::</option>

						<option value='ADMIN'>admin</option>


					</select>
&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="button" value="�˻�" class="btn_style" onClick="goSearch()"><!--�˻�-->
					<input type="button" value="�ʱ�ȭ" class="btn_style" onClick="goReset(this.form)"><!--�ʱ�ȭ-->
				</td>
			</tr>
		</form>
	</table>
	<!------------------------------------------------------------------------------------------------------------>
	<!------------------------------------------	SEARCH	END		---------------------------------------------->
	<!------------------------------------------------------------------------------------------------------------>

	<table width="800" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td align="right" height=3>
			</td>
		</tr>
		<tr>
			<td align="right" height=20>
				<input type="button" value="�űԵ��" class="btn_style" onClick="goNew()">
			</td>
		</tr>
		<tr>
			<td align="right" height=3>
			</td>
		</tr>
	</table>

	<!------------------------------------------------------------------------------------------------------------>
	<!------------------------------------------	LIST	START	---------------------------------------------->
	<!------------------------------------------------------------------------------------------------------------>
	<table width="800" border="0" cellspacing="1" cellpadding="1" class="table_line_outline">
		<form name="list_form">
		<tr> 
			<td class="td_line" colspan="8"></td>
		</tr>
		<tr class="tr_head"> 
			<td width="220">ķ���θ�<!--ķ���θ�--></td>
			<td width="100">ķ���θ���<!--����--></td>
			<td width="60">����<!--����--></td>
			<td width="110">����ڱ׷�<!--�׷�--></td>
			<td width="80">�����<!--�����--></td>
			<td width="80">�����<!--�����--></td>
			<td width="70">�����<!--�����--></td>
			<td width="80">���Ϻ���<!--���Ϻ���--></td>
		</tr>

		<tr class="tr_body"> 
			<td><input type="checkbox" name="camp_no" value="2242" style="display:none" onClick="javascript:clickRadio('2242','����TV����÷��','����TV�� ��÷�� �ȳ� ����','001','000','44','cyon','cyon','2006-11-07')"><a href="javascript:goSelect('2242')">����TV����÷��</a></td>
			<td>�� ����</td>
			<td>����</td>
			<td>CYON</td>
			<td>cyon</td>
			<td>cyon</td>
			<td>2006-11-07</td>
			<td><input type="button" value="���Ϻ���" class="btn_style" onClick="goMail('2242')"><!--���Ϻ���--></td>
		</tr>

		<tr class="tr_body"> 
			<td><input type="checkbox" name="camp_no" value="2241" style="display:none" onClick="javascript:clickRadio('2241','�系����','�系����','000','000','511','ismsadmin','ismsadmin','2006-10-30')"><a href="javascript:goSelect('2241')">�系����</a></td>
			<td>�Ǹ� ��ġ</td>
			<td>����</td>
			<td>ismsadmin</td>
			<td>ismsadmin</td>
			<td>ismsadmin</td>
			<td>2006-10-30</td>
			<td><input type="button" value="���Ϻ���" class="btn_style" onClick="goMail('2241')"><!--���Ϻ���--></td>
		</tr>

		<tr class="tr_body"> 
			<td><input type="checkbox" name="camp_no" value="2240" style="display:none" onClick="javascript:clickRadio('2240','��??��','��???','000','000','511','ismsadmin','ismsadmin','2006-10-25')"><a href="javascript:goSelect('2240')">��??��</a></td>
			<td>�Ǹ� ��ġ</td>
			<td>����</td>
			<td>ismsadmin</td>
			<td>ismsadmin</td>
			<td>ismsadmin</td>
			<td>2006-10-25</td>
			<td><input type="button" value="���Ϻ���" class="btn_style" onClick="goMail('2240')"><!--���Ϻ���--></td>
		</tr>

		<tr class="tr_body"> 
			<td><input type="checkbox" name="camp_no" value="2239" style="display:none" onClick="javascript:clickRadio('2239','October Newsletter 2006','LGESA October Newsletter 2006','000','000','90','lgeza','Janette','2006-10-24')"><a href="javascript:goSelect('2239')">October Newsletter 2...</a></td>
			<td>�Ǹ� ��ġ</td>
			<td>����</td>
			<td>South Africa</td>
			<td>Janette</td>
			<td>Janette</td>
			<td>2006-10-24</td>
			<td><input type="button" value="���Ϻ���" class="btn_style" onClick="goMail('2239')"><!--���Ϻ���--></td>
		</tr>

		<tr class="tr_body"> 
			<td><input type="checkbox" name="camp_no" value="2219" style="display:none" onClick="javascript:clickRadio('2219','2006�� 10��ȣ Ŭ�����̾� ��������','2006�� 10��ȣ Ŭ�����̾� ��������','001','000','44','cyon','cyon','2006-10-17')"><a href="javascript:goSelect('2219')">2006�� 10��ȣ Ŭ�����̾� ������...</a></td>
			<td>�� ����</td>
			<td>����</td>
			<td>CYON</td>
			<td>cyon</td>
			<td>cyon</td>
			<td>2006-10-17</td>
			<td><input type="button" value="���Ϻ���" class="btn_style" onClick="goMail('2219')"><!--���Ϻ���--></td>
		</tr>

		</form>
	</table>
	<table width="800" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td align="center" height=25><table width="100%" cellspacing=0 cellpadding=0 border=0><tr><td align="center"><Font color='red'><b>1</b></Font>&nbsp;&nbsp;<a href="javascript:goPage('2');">[2]</a>&nbsp;<a href="javascript:goPage('3');">[3]</a>&nbsp;<a href="javascript:goPage('4');">[4]</a>&nbsp;<a href="javascript:goPage('5');">[5]</a>&nbsp;</td></tr></table></td>
		</tr>
	</table>
	<!------------------------------------------------------------------------------------------------------------>
	<!------------------------------------------	LIST	END		---------------------------------------------->
	<!------------------------------------------------------------------------------------------------------------>

	<!------------------------------------------------------------------------------------------------------------>
	<!------------------------------------------	CRUD	START	---------------------------------------------->
	<!------------------------------------------------------------------------------------------------------------>
	<table width="800" border="0" cellspacing="1" cellpadding="1" class="table_line_outline">
		<form name="crud_form">
			<!------------------------	�˻�����	-------------------------->
			<input type="hidden" name="p_page" value="1">
			<input type="hidden" name="p_pagerow" value="5">
			<input type="hidden" name="camp_nm" value="">
			<input type="hidden" name="camp_ty" value="">
			<input type="hidden" name="status" value="000">
			<input type="hidden" name="dept_no" value="">
			<input type="hidden" name="user_id" value="">
			<input type="hidden" name="stdt" value="">
			<input type="hidden" name="eddt" value="">

			<!------------------------	�Է°�	-------------------------->
			<input type="hidden" name="p_camp_no" value="">

			<tr> 
				<td class="td_line" colspan="4"></td>
			</tr>
			<tr> 
				<td class="td_title">ķ���θ�<!--ķ���θ�--></td>
				<td colspan=3 class="td_body">
					<input type="text" name="p_camp_nm" class="input" style="width:600;">
				</td>
			</tr>
			<tr> 
				<td class="td_title">ķ���μ���<!--ķ���μ���--></td>
				<td colspan=3 class="td_body">
					<textarea name="p_camp_desc" class="input" style="width:600;"></textarea>
				</td>
			</tr>
			<tr> 
				<td class="td_title" width="100">ķ���θ���<!--����--></td>
				<td class="td_body" width="300">
					<select name="p_camp_ty" class="select">
						<option value=''>:::::::::: ���� ���� ::::::::::</option><!--���� ����-->


						<option value='000'>�Ǹ� ��ġ</option>

						<option value='001'>�� ����</option>

						<option value='002'>���ο� �� ��ġ</option>

						<option value='003'>������ �׽�Ʈ��</option>

					</select>
				</td>
				<td class="td_title" width="100">����<!--����--></td>
				<td class="td_body" width="300">
					<select name="p_status" class="select">
						<option value=''>::::::: ���� ���� :::::::</option><!--���� ����-->


						<option value='000'>����</option>

						<option value='001'>�������</option>

						<option value='002'>����</option>

					</select>
				</td>
			</tr>
			<tr> 
				<td class="td_title">����ڱ׷�<!--�׷�--></td>
				<td class="td_body">

					<select name="p_dept_no" class="select" onchange="javascript:getUserList('crud_form','p_user_id',this.value,'true');">
						<option value=''>::::::: �׷� ���� :::::::</option><!--�׷� ����-->

						<option value='1'>ADMIN</option>

					</select>

				</td>
				<td class="td_title">�����<!--�����--></td>
				<td class="td_body">
					<select name="p_user_id" class="select">
						<option value=''>:::::::: ����� ���� ::::::::</option><!--����� ����-->

						<option value='ADMIN'>admin</option>

					</select>
				</td>
			</tr>
			<tr id="tr_detail" style="display:none"> 
				<td class="td_title">�����<!--�����--></td>
				<td class="td_body">
					<input type="text" name="p_reg_dt" class="readonly_style" style="width:100;" readonly>
				</td>
				<td class="td_title">�����<!--�����--></td>
				<td class="td_body">
					<input type="text" name="p_reg_nm" class="readonly_style" style="width:140;" readonly>
				</td>
			</tr>
		</form>
	</table>
	<table width="800" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td align="center" height=30>
				<input type="button" value="���" class="btn_style" onClick="goAdd()" id="btn_add"><!--���-->
				<input type="button" value="����" class="btn_style" onClick="goUpdate()" id="btn_update" style="display:none"><!--����-->
				<input type="button" value="���Է�" class="btn_style" onClick="goReset(document.crud_form)"><!--���Է�-->
			</td>
		</tr>
	</table>
	<!------------------------------------------------------------------------------------------------------------>
	<!------------------------------------------	CRUD	END		---------------------------------------------->
	<!------------------------------------------------------------------------------------------------------------>

	<!------------------------------------------------------------------------------------------------------------>
	<!------------------------------------------	USER LIST IFRAME START	-------------------------------------->
	<!------------------------------------------------------------------------------------------------------------>
	<iframe name="ifrm_user" border='0' frameborder='0' scrolling='no' width='0' height='0'></iframe>
	<!------------------------------------------------------------------------------------------------------------>
	<!------------------------------------------	USER LIST IFRAME END	-------------------------------------->
	<!------------------------------------------------------------------------------------------------------------>

</body>

</html>
