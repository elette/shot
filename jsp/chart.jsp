<%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%

    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
    ArrayList arrList = ioParam.getResultList();
%><%@ page contentType="text/html; charset=UTF-8"%><?xml version="1.0" encoding="UTF-8"?>
<data><%
if (!arrList.isEmpty()) {
    Hashtable hstResult = null;
    hstResult = (Hashtable)arrList.get(0);
    Enumeration e = hstResult.keys();
    Vector vtCol = ioParam.getColName();
    int cnt = vtCol.size();

    for(int i=1; i<cnt; i++) {
%>
    <column>
        <name><%=vtCol.elementAt(i)%></name>
    </column><%
    }

    for(int i=0; i<arrList.size(); i++) {
        hstResult = (Hashtable)arrList.get(i);
%>
    <series>
        <name><%=hstResult.get(vtCol.elementAt(0))%></name><%
        for(int j=1; j<cnt; j++) {%>
        <value><%=hstResult.get(vtCol.elementAt(j))%></value><%
        }%>
    </series><%
    }
}
%>
</data>