package nlz;

import java.util.*;
import java.io.IOException;
import java.io.*;

import nlz.com.EventDefine;
import nlz.com.HashObject;
import nlz.com.InoutParameter;
import nlz.com.LoggingWriter;
import nlz.com.MessageDefine;

import nlz.util.joinRelationAnalyze;
import gudusoft.gsqlparser.EDbVendor;


public class JoinParser {
    String pgmID        = "JoinParser";

    public JoinParser () {
    }

    public int getJoin(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        ArrayList<String[]> arrResult = new ArrayList<String[]>();
        String[] strSplit = null;
        try {
            ioParam.setResultURL("/jsp/com/listJoin.jsp"); 
            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);

            joinRelationAnalyze analysis = new joinRelationAnalyze( (String)ho.get("SQL",HashObject.YES), EDbVendor.dbvoracle );

            strSplit = analysis.getAnalysisResult().split("\r\n");
            for(String each : strSplit) {
                arrResult.add( (String[])each.replaceAll("\t\t","\t").split("\t") ) ;
            }

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