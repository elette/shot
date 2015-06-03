<%@ page contentType="text/html; charset=UTF-8"%><%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%>
<%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
    ArrayList arrList = ioParam.getResultList();
%>
<%
    Hashtable hstResult = null;
    hstResult = (Hashtable)arrList.get(0);
%><%=hstResult.get("1")%>
