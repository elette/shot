<%@ page import="nlz.com.*"%><%@ page import="java.util.ArrayList"%><%@ page import="java.util.Hashtable"%><%@ page import="java.util.Enumeration"%><%@ page import="java.util.Vector"%><%
//  String ENV_TITLE = "DB2 Monitoring";
//  String defaultAction = request.getContextPath() + "/CommandAction";

    InoutParameter ioParam = (InoutParameter)request.getAttribute("IOPARAM");
    ArrayList arrList = ioParam.getResultList();
%><% //here [
if (!arrList.isEmpty()) {
    Hashtable hstResult = null;
    hstResult = (Hashtable)arrList.get(0);
    Enumeration e = hstResult.keys();
    Vector vtCol = ioParam.getColName();
    int cnt = vtCol.size();
//  Vector vtRow;
//  for(int i=1; i<arrList.size(); i++) {
//      hstResult = (Hashtable)arrList.get(i);
//      vtRow.elementAt(i) = hstResult.get(vtCol.elementAt(0));
//  }

//    for(int j=1; j<cnt; j++) {
%><%//vtCol.elementAt(j)%><%
        for(int i=0; i<arrList.size(); i++) {
            hstResult = (Hashtable)arrList.get(i);
            if (i>0) { %>,
<%
            }
%>"<%=hstResult.get(vtCol.elementAt(0))%>", <%=hstResult.get(vtCol.elementAt(1))%><%
        }
%><% //here ]
//    }
}
%>