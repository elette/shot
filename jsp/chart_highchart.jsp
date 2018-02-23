<%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%
//  String ENV_TITLE = "DB2 Monitoring";
//  String defaultAction = request.getContextPath() + "/CommandAction";

    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
    ArrayList arrList = ioParam.getResultList();
%><%@ page contentType="text/xml" %><?xml version="1.0" encoding="UTF-8"?>
<data><%
if (!arrList.isEmpty()) {
    Hashtable hstResult = null;
    hstResult = (Hashtable)arrList.get(0);
    Enumeration e = hstResult.keys();
    Vector vtCol = ioParam.getColName();
    int cnt = vtCol.size();

    for(int i=0; i<arrList.size(); i++) {
        hstResult = (Hashtable)arrList.get(i);
%>
    <series>
        <name><%=hstResult.get(vtCol.elementAt(0))%></name>
        <data><point><%=hstResult.get(vtCol.elementAt(1))%></point></data>
    </series><%
    }
}
%>
</data>