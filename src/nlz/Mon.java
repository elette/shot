package nlz;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;

import java.io.File;
import java.util.*;
import java.io.IOException;
import java.io.*;

import nlz.com.EventDefine;
import nlz.com.HashObject;
import nlz.com.InoutParameter;
import nlz.com.LoggingWriter;
import nlz.com.MessageDefine;
import nlz.db.ConnectionPool;
import nlz.db.SqlAdapter;
import nlz.MonWriter;


public class Mon extends SqlAdapter {

    String pgmID        = "Mon";
    private static String path  = "";
    ConnectionPool pool = null;

    public Mon() {
        pool = ConnectionPool.getInstance();
    }

    public Mon (String history_path) {
        path = history_path;
    }


    public int getQueryResult(InoutParameter ioParam, String targetURL){

        int resultInt           = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho           = ioParam.getInputHashObject();
        Connection con          = null;
        ArrayList arrResult     = new ArrayList();

        try{

//          String S_USER_ID   = (String)ho.get("S_USER_ID",HashObject.YES);
            String SQL = (String)ho.get("SQL",HashObject.YES);
//
//              ho.print();

            StringBuffer query = new StringBuffer();

            query.append(SQL);

            con = pool.getConnection();
            arrResult = super.executeQuery(con, query.toString(), ioParam, null);
            if(arrResult == null) {
                resultInt = EventDefine.E_SQL_ERROR;
            } else {
                ioParam.setResultList(arrResult);
                ioParam.setMessage(MessageDefine.M_SELECT_OK);
                resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
                LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
            }

            ioParam.setResultURL(targetURL);

        } catch(SQLException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== SQL Error ====" + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            resultInt = EventDefine.E_SQL_ERROR;
            ioParam.setResultURL("/jsp/err/errMsg.jsp");
            e.printStackTrace();
        } catch (Exception e) {
            LoggingWriter.setLogError(pgmID,"@Business==== Error ====" + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            ioParam.setResultURL("/jsp/err/errMsg.jsp");
            e.printStackTrace();
        } finally {
            if(con != null) try {con.close();} catch(Exception ex) {};
        }

        return resultInt;
    }

    public int list(InoutParameter ioParam){
        // Writing query history
        HashObject ho   = ioParam.getInputHashObject();
        try{
            String[][] InfoDB = pool.infoDB();

            ho.put("historyPath", path);
            ho.put("HOST",InfoDB[1][1]);
            MonWriter.writeHistory(ioParam);

        } catch (Exception e) {
            LoggingWriter.setLogError(pgmID,"@Business==== Error ====" + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            ioParam.setResultURL("/jsp/err/errMsg.jsp");
            e.printStackTrace();
        }
    	return getQueryResult(ioParam, "/jsp/pane.jsp");
    }

    public int getDB(InoutParameter ioParam){
		String targetURL = "";
		HashObject ho	= ioParam.getInputHashObject();
        try{
			String item		= (String)ho.get("item",HashObject.YES);

			// switch (item) {
				// case "TBSP":
					// targetURL = "/jsp/com/getTBSP.jsp";
					// break;
				// case "CPU":
					// targetURL = "/jsp/com/getCPU.jsp";
					// break;
				// case "MEM":
					// targetURL = "/jsp/com/getMEM.jsp";
					// break;
			// }
			targetURL = "/jsp/com/get" + item + ".jsp";
        } catch (Exception e) {
            e.printStackTrace();
		}
    	return getQueryResult(ioParam, targetURL);
    }

    public int getmsg(InoutParameter ioParam){
    	return getQueryResult(ioParam, "/jsp/err/sqlMsg.jsp");
    }

    public int getxml(InoutParameter ioParam) throws InterruptedException {
        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();

        try {
        	String logID = (String)ho.get("PANEID",HashObject.YES);
        	String logTF = (String)ho.get("SAVE",HashObject.YES);
            resultInt = getQueryResult(ioParam, "/jsp/chart.jsp");
            // save to log file
			if (logTF.equals("Y")) MonWriter.writeLog(ioParam);
            // End of save to log file

            // background save to log file
			if (logTF.equals("B")) {
				int intDelay = Integer.parseInt((String)ho.get("DELAY",HashObject.YES));
				int intCount = Integer.parseInt((String)ho.get("COUNT",HashObject.YES));
				
				for (int i=0; i<intCount; i++) {
					resultInt = getQueryResult(ioParam, "/jsp/com/listClient.jsp");
					MonWriter.writeLog(ioParam);
					Thread.sleep(intDelay*1000);
				}

			}
            // End of background save to log file
        } catch (Exception e) {
            LoggingWriter.setLogError(pgmID,"@Business==== Error ====" + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            ioParam.setResultURL("/jsp/err/errMsg.jsp");
            e.printStackTrace();
        }
    	return resultInt;
    }

    public int getmsg2(InoutParameter ioParam){

        int resultInt           = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho           = ioParam.getInputHashObject();
        Connection con          = null;
        ArrayList arrResult     = new ArrayList();

        try{

//          String S_USER_ID   = (String)ho.get("S_USER_ID",HashObject.YES);
            String SQL = (String)ho.get("SQL",HashObject.YES);
//
//              ho.print();

            StringBuffer query = new StringBuffer();

            query.append(SQL);

            con = pool.getConnection();
            arrResult = super.executeQuery(con, query.toString(), ioParam, null);
            if(arrResult == null) {
                resultInt = EventDefine.E_SQL_ERROR;
            } else {
                ioParam.setResultList(arrResult);
                ioParam.setMessage(MessageDefine.M_SELECT_OK);
                resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
                LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
            }

            ioParam.setResultURL("/jsp/err/sqlMsg.jsp");

        } catch(SQLException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== SQL Error ====" + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            resultInt = EventDefine.E_SQL_ERROR;
            ioParam.setResultURL("/jsp/err/errMsg.jsp");
            e.printStackTrace();
        } catch (Exception e) {
            LoggingWriter.setLogError(pgmID,"@Business==== Error ====" + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            ioParam.setResultURL("/jsp/err/errMsg.jsp");
            e.printStackTrace();
        } finally {
            if(con != null) try {con.close();} catch(Exception ex) {};
        }

        return resultInt;
    }

    public int getxml2(InoutParameter ioParam){

        int resultInt           = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho           = ioParam.getInputHashObject();
        Connection con          = null;
        ArrayList arrResult     = new ArrayList();

        try{

//          String S_USER_ID   = (String)ho.get("S_USER_ID",HashObject.YES);
            String SQL = (String)ho.get("SQL",HashObject.YES);
//
//              ho.print();

            StringBuffer query = new StringBuffer();

            query.append(SQL);

            con = pool.getConnection();
            arrResult = super.executeQuery(con, query.toString(), ioParam, null);
            if(arrResult == null) {
                resultInt = EventDefine.E_SQL_ERROR;
            } else {
                ioParam.setResultList(arrResult);
                ioParam.setMessage(MessageDefine.M_SELECT_OK);
                resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
                LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
            }

            ioParam.setResultURL("/jsp/chart.jsp");

        } catch(SQLException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== SQL Error ====" + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            resultInt = EventDefine.E_SQL_ERROR;
            ioParam.setResultURL("/jsp/err/errMsg.jsp");
            e.printStackTrace();
        } catch (Exception e) {
            LoggingWriter.setLogError(pgmID,"@Business==== Error ====" + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            ioParam.setResultURL("/jsp/err/errMsg.jsp");
            e.printStackTrace();
        } finally {
            if(con != null) try {con.close();} catch(Exception ex) {};
        }

        return resultInt;
    }

    public int getUpdateResult(InoutParameter ioParam){

        int resultInt           = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho           = ioParam.getInputHashObject();
        Connection con          = null;
        int intResult           = 0;

        try{

//          String S_USER_ID   = (String)ho.get("S_USER_ID",HashObject.YES);
            String SQL = (String)ho.get("SQL",HashObject.YES);
//
//              ho.print();

            StringBuffer query = new StringBuffer();

            query.append(SQL);

            con = pool.getConnection();
            intResult = super.executeUpdate(con, query.toString(), ioParam, null);
            if(intResult != 0) {
                resultInt = EventDefine.E_SQL_ERROR;
            } else {
                ioParam.setResultList(null);
                ioParam.setMessage(MessageDefine.M_UPDATE_OK);
                resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
                LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_UPDATE_OK);
            }

            ioParam.setResultURL("/jsp/updateResult.jsp");

        } catch(SQLException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== SQL Error ====" + e.getMessage());
            ioParam.setMessage(MessageDefine.M_UPDATE_FAILED);
            resultInt = EventDefine.E_SQL_ERROR;
            ioParam.setResultURL("/jsp/err/errMsg.jsp");
            e.printStackTrace();
        } catch (Exception e) {
            LoggingWriter.setLogError(pgmID,"@Business==== Error ====" + e.getMessage());
            ioParam.setMessage(MessageDefine.M_UPDATE_FAILED);
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            ioParam.setResultURL("/jsp/err/errMsg.jsp");
            e.printStackTrace();
        } finally {
            if(con != null) try {con.close();} catch(Exception ex) {};
        }

        return resultInt;
    }

    public int listHistory(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        ArrayList<String[]> arrFile     = new ArrayList<String[]>();
        try {
            ioParam.setResultURL("/jsp/com/listHistory.jsp");
            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);

            File dir = new File(path); 
            File[] fileList = dir.listFiles(); 
        
            for(int i = 0 ; i < fileList.length ; i++){
                File file = fileList[i]; 
                if(file.isFile()){
// System.out.println(file.getPath());
                    // arrFile.add(new String[]{file.getName(), file.toURI().toURL().toString()});
                    arrFile.add(new String[]{file.getName(), "history/"+file.getName()});
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

    public int getHistory(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        try {
            ioParam.setResultURL("/" + ho.get("file",HashObject.YES));
            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }

}
