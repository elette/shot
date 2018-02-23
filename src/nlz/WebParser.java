package nlz;

import java.util.*;
import java.io.IOException;
import java.io.*;

import nlz.com.EventDefine;
import nlz.com.HashObject;
import nlz.com.InoutParameter;
import nlz.com.LoggingWriter;
import nlz.com.MessageDefine;


public class WebParser {
    String pgmID        = "WebParser";

    public WebParser () {
    }

     public int getList(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        ArrayList<String> arrResult = new ArrayList<String>();
        String[] strSplit = null;
        try {
            ioParam.setResultURL("/jsp/com/listNews.jsp"); 
            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);

            String[] args = {"C:/Python27/python.exe", (String)ho.get("PY",HashObject.YES), (String)ho.get("ARG1",HashObject.YES), (String)ho.get("ARG2",HashObject.YES), (String)ho.get("ARG3",HashObject.YES)} ;
// System.out.println(args[1]);
// System.out.println(args[2]);
// System.out.println(args[3]);
// System.out.println(args[4]);
            Process p = Runtime.getRuntime().exec(args);
            BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream(), "UTF-8"));

            String each = null;
            while ( (each = in.readLine()) != null) {
                if (each.length()>0) arrResult.add( each ) ;
            }

            p.waitFor();
            if(arrResult == null) {
                resultInt = EventDefine.E_QUERY_NOT_RESULT;
            } else {
                ioParam.setResultList(arrResult);
                ioParam.setMessage(MessageDefine.M_SELECT_OK);
                resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
                LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
            }

        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }

   public int getPage(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        ArrayList<String> arrResult = new ArrayList<String>();
        try {
            ioParam.setResultURL("/jsp/com/getWebpage.jsp"); 
            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);

            String[] args = {"C:/Python27/python.exe", (String)ho.get("PY",HashObject.YES), (String)ho.get("ARG1",HashObject.YES), (String)ho.get("ARG2",HashObject.YES), (String)ho.get("ARG3",HashObject.YES)} ;
            Process p = Runtime.getRuntime().exec(args);
            BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream(), "UTF-8"));
            // System.out.println(in.readLine());

            // strSplit = in.readLine().split("\n\n");
            // for(String each : strSplit) {
            //     arrResult.add( (String)each ) ;
            // }
            String each = null;
            while ( (each = in.readLine()) != null) {
                arrResult.add( each ) ;
// System.out.println(each);
            }

            p.waitFor();
            if(arrResult == null) {
                resultInt = EventDefine.E_QUERY_NOT_RESULT;
            } else {
                ioParam.setResultList(arrResult);
                ioParam.setMessage(MessageDefine.M_SELECT_OK);
                resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
                LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
            }

        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }

}