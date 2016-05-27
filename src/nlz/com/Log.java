package nlz.com;

import java.io.File;
import java.util.*;
import java.io.IOException;
import java.io.*;

import nlz.com.EventDefine;
import nlz.com.HashObject;
import nlz.com.InoutParameter;
import nlz.com.LoggingWriter;
import nlz.com.MessageDefine;



public class Log {
    String pgmID        = "Log";
    private static String path  = "";

    public Log () {
    }

    public Log (String log_path) {
		path = log_path;
    }

    public int list(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
		ArrayList<String[]> arrFile     = new ArrayList<String[]>();
        try {
            ioParam.setResultURL("/jsp/com/listLog.jsp");
            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);

			File dir = new File(path); 
			File[] fileList = dir.listFiles(); 
		
			for(int i = 0 ; i < fileList.length ; i++){
				File file = fileList[i]; 
				if(file.isFile()){
// System.out.println(file.getPath());
					// arrFile.add(new String[]{file.getName(), file.toURI().toURL().toString()});
					arrFile.add(new String[]{file.getName(), "logs/"+file.getName()});
				}
			}
            if(arrFile == null) {
                resultInt = EventDefine.E_QUERY_NOT_RESULT;
            } else {
                ioParam.setResultList(arrFile);
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

    public int getLog(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        try {
            String file      = (String)ho.get("path",HashObject.YES);
            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            ioParam.setResultURL(file);
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);

        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }
}