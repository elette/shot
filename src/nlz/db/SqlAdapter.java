package nlz.db;


import java.sql.*;
import java.util.*;
import java.util.List;
import java.math.BigDecimal;

import nlz.com.HashObject;
import nlz.com.InoutParameter;
import nlz.com.MessageDefine;
import nlz.com.LoggingWriter;


public abstract class SqlAdapter {

	public SqlAdapter(){
	}

	/**
	* SQL�� �������� ArrayList�� �����ϴ� �޼ҵ�.
    * @param con		Connection		Database Connection ��ü
    * @param p_strSql	String			SQL��
    * @param ioParam	InoutParameter	�Է��Ķ���� ��ü
    * @return ArrayList 				��� ArrayList
	*/
	protected ArrayList excuteQuery(Connection con, String p_strSql, InoutParameter ioParam, ArrayList inputList) {

		PreparedStatement ps = null;
		ResultSet l_rsResult                   = null;
		ArrayList l_arrResult                  = null;
		HashObject ho           = ioParam.getInputHashObject();
		try {
			LoggingWriter.setLogSql(SqlAdapter.class.getName(),"@SqlAdaptor==== SELECT SQL : \n" + p_strSql);
			ps = con.prepareStatement(p_strSql);

			if (!(inputList == null)) {
			for(int i=0;i<inputList.size();i++){
				String[] paramValue=(String[])inputList.get(i);
				if(paramValue[1] !=null && !paramValue[1].equals("") && paramValue[1].equals("int")){
					ps.setInt(i+1,Integer.parseInt((String)ho.get(paramValue[0],HashObject.YES)));
				}else{
					ps.setString(i+1,(String)ho.get(paramValue[0],HashObject.YES));
				}
				
				
			}
			}	
		
			l_rsResult           = ps.executeQuery();
			l_arrResult          = extractArrayList(l_rsResult, ioParam);
		} catch (SQLException e) {
			LoggingWriter.setLogError(SqlAdapter.class.getName(),"@SqlAdaptor==== SQL Error = " + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            ioParam.setMessageDetail(e.getMessage());
            l_arrResult = null;
            e.printStackTrace();
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
            if(          l_rsResult != null) try {          l_rsResult.close();} catch(Exception ex) {};
            if(ps != null) try {ps.close();} catch(Exception ex) {};
		}

		return l_arrResult;
	}


	/**
	* SQL�� �������� HashMap�� �����ϴ� �޼ҵ�.
    * @param con		Connection		Database Connection ��ü
    * @param p_strSql	String			SQL��
    * @param ioParam	InoutParameter	�Է��Ķ���� ��ü
    * @return ArrayList 				��� ArrayList
	*/
	protected HashMap excueteQuerySingle(Connection con, String p_strSql, InoutParameter ioParam, List inputList) {

		PreparedStatement ps = null;
		ResultSet l_rsResult                   = null;
		HashMap result                 = null;
		HashObject ho           = ioParam.getInputHashObject();
		try {
			LoggingWriter.setLogSql(SqlAdapter.class.getName(),"@SqlAdaptor==== SELECT SQL : \n" + p_strSql);
			ps = con.prepareStatement(p_strSql);
			for(int i=0;i<inputList.size();i++){
				String[] paramValue=(String[])inputList.get(i);
				if(paramValue[1] !=null && !paramValue[1].equals("") && paramValue[1].equals("int")){
					ps.setInt(i+1,Integer.parseInt((String)ho.get(paramValue[0],HashObject.YES)));
				}else{
					ps.setString(i+1,(String)ho.get(paramValue[0],HashObject.YES));
				}
				
				
			}	
		
			l_rsResult           = ps.executeQuery();
			result        		 = extractSingle(l_rsResult, ioParam);
		} catch (SQLException e) {
			LoggingWriter.setLogError(SqlAdapter.class.getName(),"@SqlAdaptor==== SQL Error = " + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            result = null;
            e.printStackTrace();
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
            if(          l_rsResult != null) try {          l_rsResult.close();} catch(Exception ex) {};
            if(ps != null) try {ps.close();} catch(Exception ex) {};
		}

		return result;
	}

	
	
	/**
    * �����ͺ��̽����� ����� ���ڵ带 ������ ����� ArrayList�� �����ϴ� �޼ҵ�.
    * @param p_dbResultSet	ResultSet	�����ͺ��̽��� ���� ����� ���ڵ��
    * @param ioParam	InoutParameter	�Է��Ķ���� ��ü
    * @return String					��� ArrayList
    */
    protected ArrayList extractArrayList(ResultSet p_dbResultSet, InoutParameter ioParam) {

		ResultSetMetaData l_rsmdMetaData = null;
		int l_nColumnCount               = 0;
		int[] l_arColumnTypes            = null;
		Vector<String> l_vtColumnName            = new Vector<String>();

		ArrayList<Hashtable> l_arrResult            = new ArrayList<Hashtable>();
		Hashtable<String,String> l_hstResult            = null;

		try {

			l_rsmdMetaData = p_dbResultSet.getMetaData();
			l_nColumnCount = l_rsmdMetaData.getColumnCount();
			l_arColumnTypes = new int[l_nColumnCount+1];
// 			l_hstResult = new Hashtable<String,String>();

			for (int i=1; i <= l_nColumnCount; i++) {
				l_arColumnTypes[i] = l_rsmdMetaData.getColumnType(i);
				l_vtColumnName.addElement( l_rsmdMetaData.getColumnName(i) );
// 				l_hstResult.put(String.valueOf(i),l_rsmdMetaData.getColumnName(i));	//for column order
			}
// 			l_arrResult.add(l_hstResult);


			String l_strTemp   = "";
			BigDecimal decimal = null;
			Clob l_dbClob      = null;
			int	l_nCoumnCnt    = 0;
			int nRowcnt        = 0;

			while(p_dbResultSet.next()) {
				
				nRowcnt++;
				
				l_hstResult = new Hashtable<String,String>();

				for (l_nCoumnCnt = 1; l_nCoumnCnt <= l_nColumnCount; l_nCoumnCnt++) {
		            switch(l_arColumnTypes[l_nCoumnCnt]) {
						case Types.SMALLINT :
							l_strTemp = String.valueOf(p_dbResultSet.getShort(l_nCoumnCnt));
							break;

						case Types.INTEGER :
							l_strTemp = String.valueOf(p_dbResultSet.getLong(l_nCoumnCnt));
							break;

						case Types.NUMERIC :
						case Types.DECIMAL :
							l_strTemp = p_dbResultSet.getString(l_nCoumnCnt);
							if (l_strTemp != null) {
								if (l_strTemp.substring(0,1).equals(".")) {
									l_strTemp = "0" + l_strTemp;					// ���� .x ������ ��쿡 0.x ���·� ������ش�.
								} else if (l_strTemp.length() >= 2 && l_strTemp.substring(0,2).equals("-.")) {
									l_strTemp = "-0" + l_strTemp.substring(1);		// ���� -.x ������ ��쿡 -0.x ���·� ������ش�.
								}
							}
							break;

					    // case Types.DECIMAL :
							// decimal = p_dbResultSet.getBigDecimal(l_nCoumnCnt);
							// l_strTemp = decimal + "";//.floatValue() + "";
							// break;

						case Types.BIGINT :
							l_strTemp = p_dbResultSet.getLong(l_nCoumnCnt) + "";
							break;

						case Types.REAL :
							l_strTemp = p_dbResultSet.getFloat(l_nCoumnCnt) + "";
							break;

						case Types.FLOAT :
						case Types.DOUBLE :
							l_strTemp = p_dbResultSet.getDouble(l_nCoumnCnt) + "";
							break;

						case Types.VARCHAR :
						case Types.LONGVARCHAR : // DataType�� LONG �� ��� : LONGVARCHAR
							l_strTemp = p_dbResultSet.getString(l_nCoumnCnt);
							break;

						case Types.DATE :
							if(p_dbResultSet.getTimestamp(l_nCoumnCnt) != null){
								l_strTemp = p_dbResultSet.getTimestamp(l_nCoumnCnt).toString();
							}else{
								l_strTemp = "";
							}

							break;

						case Types.TIME :
							l_strTemp = String.valueOf(p_dbResultSet.getTime(l_nCoumnCnt));
							break;

						case Types.TIMESTAMP :
							if(p_dbResultSet.getTimestamp(l_nCoumnCnt) != null){
								l_strTemp = p_dbResultSet.getTimestamp(l_nCoumnCnt).toString();
							}else{
								l_strTemp = "";
							}

							break;

						case Types.CHAR :	// Enumeration Type �� ���
							l_strTemp = p_dbResultSet.getString(l_nCoumnCnt);
							break;



						default :
							// l_strTemp = l_arColumnTypes[l_nCoumnCnt]+":UNKNOWN";
							l_strTemp = p_dbResultSet.getString(l_nCoumnCnt);
							break;
					}

					if(l_strTemp == null){
						l_hstResult.put((String)(l_vtColumnName.elementAt(l_nCoumnCnt-1)),"");
					}else{
						l_strTemp = l_strTemp.toString();
						l_hstResult.put((String)(l_vtColumnName.elementAt(l_nCoumnCnt-1)),l_strTemp);
					}
				} // END-FOR
				
				l_arrResult.add(l_hstResult);

			} // END-WHILE
			
            ioParam.setColName(l_vtColumnName);
			if(nRowcnt == 0) {
				LoggingWriter.setLogDebug(SqlAdapter.class.getName(),"@SqlAdaptor==== " + MessageDefine.M_SELECT_NOT_RESULT);
	            ioParam.setMessage(MessageDefine.M_SELECT_NOT_RESULT);
			}
		} catch(Exception e) {
			LoggingWriter.setLogError(SqlAdapter.class.getName(),"@SqlAdaptor==== ExtractResult Make Error = " + e.getMessage());
            ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
            l_arrResult = null;
		}

		return l_arrResult;
	}
    
	/**
     * �����ͺ��̽����� ����� ���ڵ带 ������ ����� ArrayList�� �����ϴ� �޼ҵ�.
     * @param p_dbResultSet	ResultSet	�����ͺ��̽��� ���� ����� ���ڵ��
     * @param ioParam	InoutParameter	�Է��Ķ���� ��ü
     * @return String					��� ArrayList
     */
     protected HashMap extractSingle(ResultSet p_dbResultSet, InoutParameter ioParam) {
        HashMap<String,String> l_hstResult=new HashMap<String,String>();
 		ResultSetMetaData l_rsmdMetaData = null;
 		int l_nColumnCount               = 0;
 		int[] l_arColumnTypes            = null;
 		Vector<String> l_vtColumnName            = new Vector<String>();
 	

 		try {

 			l_rsmdMetaData = p_dbResultSet.getMetaData();
 			l_nColumnCount = l_rsmdMetaData.getColumnCount();
 			l_arColumnTypes = new int[l_nColumnCount+1];
 			for (int i=1; i <= l_nColumnCount; i++) {
 				l_arColumnTypes[i] = l_rsmdMetaData.getColumnType(i);
 				l_vtColumnName.addElement( l_rsmdMetaData.getColumnName(i) );
 			}

 			String l_strTemp   = "";
 			BigDecimal decimal = null;
 			Clob l_dbClob      = null;
 			int	l_nCoumnCnt    = 0;
 			int nRowcnt        = 0;

 			if(p_dbResultSet.next()) {
 				
 				nRowcnt++;
 				
 				

 				for (l_nCoumnCnt = 1; l_nCoumnCnt <= l_nColumnCount; l_nCoumnCnt++) {

 		            switch(l_arColumnTypes[l_nCoumnCnt]) {
 						case Types.SMALLINT :
 							l_strTemp = String.valueOf(p_dbResultSet.getShort(l_nCoumnCnt));
 							break;

 						case Types.INTEGER :
 							l_strTemp = String.valueOf(p_dbResultSet.getLong(l_nCoumnCnt));
 							break;

 						case Types.NUMERIC :
 							l_strTemp = p_dbResultSet.getString(l_nCoumnCnt);
 							if (l_strTemp != null) {
 								if (l_strTemp.substring(0,1).equals(".")) {
 									l_strTemp = "0" + l_strTemp;					// ���� .x ������ ��쿡 0.x ���·� ������ش�.
 								} else if (l_strTemp.length() >= 2 && l_strTemp.substring(0,2).equals("-.")) {
 									l_strTemp = "-0" + l_strTemp.substring(1);		// ���� -.x ������ ��쿡 -0.x ���·� ������ش�.
 								}
 							}
 							break;

 					    case Types.DECIMAL :
 							decimal = p_dbResultSet.getBigDecimal(l_nCoumnCnt);
 							l_strTemp = decimal.floatValue() + "";
 							break;

 						case Types.BIGINT :
 							l_strTemp = p_dbResultSet.getLong(l_nCoumnCnt) + "";
 							break;

 						case Types.REAL :
 							l_strTemp = p_dbResultSet.getFloat(l_nCoumnCnt) + "";
 							break;

 						case Types.FLOAT :
 						case Types.DOUBLE :
 							l_strTemp = p_dbResultSet.getDouble(l_nCoumnCnt) + "";
 							break;

 						case Types.VARCHAR :
 						case Types.LONGVARCHAR : // DataType�� LONG �� ��� : LONGVARCHAR
 							l_strTemp = p_dbResultSet.getString(l_nCoumnCnt);
 							break;

 						case Types.DATE :
 							if(p_dbResultSet.getTimestamp(l_nCoumnCnt) != null){
 								l_strTemp = p_dbResultSet.getTimestamp(l_nCoumnCnt).toString();
 							}else{
 								l_strTemp = "";
 							}

 							break;

 						case Types.TIME :
 							l_strTemp = String.valueOf(p_dbResultSet.getTime(l_nCoumnCnt));
 							break;

 						case Types.TIMESTAMP :
 							if(p_dbResultSet.getTimestamp(l_nCoumnCnt) != null){
 								l_strTemp = p_dbResultSet.getTimestamp(l_nCoumnCnt).toString();
 							}else{
 								l_strTemp = "";
 							}

 							break;

 						case Types.CHAR :	// Enumeration Type �� ���
 							l_strTemp = p_dbResultSet.getString(l_nCoumnCnt);
 							break;



 						default :
 							// l_strTemp = l_arColumnTypes[l_nCoumnCnt]+":UNKNOWN";
							l_strTemp = p_dbResultSet.getString(l_nCoumnCnt);
 							break;
 					}

 					if(l_strTemp == null){
 						l_hstResult.put((String)(l_vtColumnName.elementAt(l_nCoumnCnt-1)),"");
 					}else{
 						l_strTemp = l_strTemp.toString();
 						l_hstResult.put((String)(l_vtColumnName.elementAt(l_nCoumnCnt-1)),l_strTemp);
 					}
 				} // END-FOR
 				
 				

 			} // END-WHILE
 			
 			if(nRowcnt == 0) {
 				LoggingWriter.setLogDebug(SqlAdapter.class.getName(),"@SqlAdaptor==== " + MessageDefine.M_SELECT_NOT_RESULT);
 	            ioParam.setMessage(MessageDefine.M_SELECT_NOT_RESULT);
 			}
 		} catch(Exception e) {
 			LoggingWriter.setLogError(SqlAdapter.class.getName(),"@SqlAdaptor==== ExtractResult Make Error = " + e.getMessage());
             ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
             l_hstResult = null;
 		}

 		return l_hstResult;
 	}    

     
 	/**
 	* SQL�� �Է¹� ���������� int �� �����ϴ� �޼ҵ�.
     * @param con		Connection		Database Connection ��ü
     * @param p_strSql	String			SQL��
     * @param ioParam	InoutParameter	�Է��Ķ���� ��ü
     * @return ArrayList 				��� ArrayList
 	*/
 	protected int excuteUpdate(Connection con, String p_strSql, InoutParameter ioParam, List inputList) {

 		PreparedStatement ps = null;
 		
 		int result=0;
 		HashObject ho           = ioParam.getInputHashObject();
 		try {
 			LoggingWriter.setLogSql(SqlAdapter.class.getName(),"@SqlAdaptor==== SELECT SQL : \n" + p_strSql);
 			ps = con.prepareStatement(p_strSql);
 			int iPSNo = 1;
 			for(int i=0;i<inputList.size();i++, iPSNo++){
 				// TODO iteration 
 				
 				String[] paramValue=(String[])inputList.get(i);
 				if(paramValue[1] !=null && !paramValue[1].equals("") && paramValue[1].equals("int")){
 					ps.setInt(iPSNo,Integer.parseInt((String)ho.get(paramValue[0],HashObject.YES)));
 				}else if (paramValue[1].equals("Array")) {
     				String[] parArrValue = (String[])ho.getArray(paramValue[0]);

					for (int j=0; j<parArrValue.length; j++, iPSNo++)
     					ps.setString(iPSNo, (String)parArrValue[j]);
 				}else{
 					
 					ps.setString(iPSNo,(String)ho.get(paramValue[0],HashObject.YES));
 				}		
 			}	
 		
 			result          = ps.executeUpdate();
 		
 		} catch (SQLException e) {
 			LoggingWriter.setLogError(SqlAdapter.class.getName(),"@SqlAdaptor==== SQL Error = " + e.getMessage());
             ioParam.setMessage(MessageDefine.M_SELECT_FAILED);
             
             e.printStackTrace();
 		} catch (NumberFormatException e) {
 			// TODO Auto-generated catch block
 			e.printStackTrace();
 		} catch (Exception e) {
 			// TODO Auto-generated catch block
 			e.printStackTrace();
 		} finally {
             if(ps != null) try {ps.close();} catch(Exception ex) {};
 		}

 		return result;
 	}


}
