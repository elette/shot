<%@ page contentType="text/html; charset=euc-kr"%><%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%>
<%
// 	String ENV_TITLE = "DB2 Monitoring";
// 	String defaultAction = request.getContextPath() + "/CommandAction";

	InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	ArrayList arrList = ioParam.getResultList();
%><?xml version="1.0"?>
<JSChart><%
if (!arrList.isEmpty()) {
	Hashtable hstResult = null;
	hstResult = (Hashtable)arrList.get(0);
	Enumeration e = hstResult.keys();
	Vector vtCol = ioParam.getColName();
	int cnt = vtCol.size();
// 	Vector vtRow;
// 	for(int i=1; i<arrList.size(); i++) {
// 		hstResult = (Hashtable)arrList.get(i);
// 		vtRow.elementAt(i) = hstResult.get(vtCol.elementAt(0));
// 	}
	
 	for(int j=1; j<cnt; j++) {
%>
	<dataset type="line" id="line_<%=j%>">
<%
		for(int i=1; i<arrList.size(); i++) {
			hstResult = (Hashtable)arrList.get(i);
%><data unit="<%=hstResult.get(vtCol.elementAt(0))%>" value="<%=hstResult.get(vtCol.elementAt(j))%>"/>
<%
		}
%>	</dataset><%
	}
%>
	<optionset>
		<option set="setAxisNameFontSize" value="10"/>
		<option set="setAxisNameX" value="'Time'"/>
		<option set="setAxisNameY" value="'Vertical axis'"/>
		<option set="setAxisNameColor" value="'#787878'"/>
		<option set="setAxisValuesNumberX" value="6"/>
		<option set="setAxisValuesNumberY" value="5"/>
		<option set="setAxisValuesColor" value="'#38a4d9'"/>
		<option set="setAxisColor" value="'#38a4d9'"/>
		<option set="setLineColor" value="'#C71112'"/>
		<option set="setTitle" value="'A customized chart'"/>
		<option set="setTitleColor" value="'#383838'"/>
		<option set="setGraphExtend" value="true"/>
		<option set="setGridColor" value="'#38a4d9'"/>
		<option set="setSize" value="500, 300"/>
		<option set="setAxisPaddingLeft" value="140"/>
		<option set="setAxisPaddingRight" value="140"/>
		<option set="setAxisPaddingTop" value="60"/>
		<option set="setAxisPaddingBottom" value="45"/>
		<option set="setTextPaddingLeft" value="105"/>
		<option set="setTextPaddingBottom" value="12"/>
		<option set="setLineSpeed" value="100"/>
		<option set="setBackgroundImage" value="'images/chart_bg.jpg'"/>
<%
 	for(int i=1; i<cnt; i++) {
%>		<option set="setLegendForLine" value="'line_<%=i%>', '<%=vtCol.elementAt(i)%>'"/><%
	}
%>
	</optionset><%
}
%>
</JSChart>