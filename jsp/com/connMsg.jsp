<%@ page contentType="text/html; charset=UTF-8"%><%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%
    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
//     HashObject ho           = ioParam.getInputHashObject();
int temp = 0;
int intResult = ioParam.getIntResult();
if (intResult == EventDefine.E_DOEXCUTE_SUCCESS) {
    temp = 0;
%>&nbsp;&nbsp;<%
} else {
    temp = 0;
%>&nbsp;&nbsp;<%
}
%>