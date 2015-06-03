<%@ page contentType="text/html; charset=UTF-8"%><%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
	HashObject ho = ioParam.getInputHashObject();
	String sql = (String)ho.get("BOARD_SQL",HashObject.YES);

int intResult = ioParam.getIntResult();
%><%=sql%>