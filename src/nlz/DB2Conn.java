package nlz;

import java.io.Reader;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class DB2Conn {
 
 private boolean fileQueryUse = true;
 
 public static void main(String[] args) {
	new DB2Conn().execute();
 }
 
 private void execute() {
	Connection conn = null;
	PreparedStatement stmt = null;
	ResultSet rs	= null;
		 try{
	 conn = getConnection();
	 StringBuffer query = new StringBuffer(); 
	 query.append("	SELECT 1 AS COL from SYSIBM.SYSDUMMY1 ");
	 
	
	 stmt	= conn.prepareStatement(query.toString() );
	 
	 rs= stmt.executeQuery();
	 
	 // rs를 리스트로 변환. 
	 ArrayList reVal= getResultData(rs);
	 
	 HashMap info = null;
	 for (int i = 0; i < reVal.size(); i++) {
		info = (HashMap)reVal.get(i);
		System.out.println(info);
	 }
	 
		 }catch (Exception e) {
			e.printStackTrace();
		 }finally {
			connClose(conn, stmt, rs);
		 }
	
 }
 /**
	* resultSet을	리스트로 만드는 방법 
	* 리스트 형식 List<Map> rows = new ArrayList<Map>();
	* @param rs
	* @return
	*/
 public ArrayList getResultData(ResultSet rs){
	if (rs == null) {
	 return new ArrayList();
	}
	
	ArrayList rows = new ArrayList();
	ResultSetMetaData rsmd = null;
	try {
	 rsmd = rs.getMetaData();
	
	 int count = rsmd.getColumnCount();
	 String [] columns_key = new String[count];
	 
	 for (int i = 1; i <= count; i++) {
		columns_key[i - 1] = rsmd.getColumnName(i);
	 }
	 
	 HashMap columns = null;
	 Reader input = null;
	 char[] buffer	= null;
	 int byteRead=-1;
	 while (rs.next()) {
	 
		columns = new HashMap(count);
		for (int i = 1; i <= count; i++) {		
		 
		 if(rs.getObject(columns_key[i-1])	instanceof Clob){
			try{
			 StringBuffer output = new StringBuffer();
			 input = rs.getCharacterStream(columns_key[i-1]);
			 buffer = new char[1024];
			 while((byteRead=input.read(buffer,0,1024))!=-1){
				output.append(buffer,0,byteRead);
			 }
			 input.close();
			 columns.put(columns_key[i-1], output.toString());
			}catch(Exception e){
			 System.out.println("CLOB data error = "+e.getMessage());
			}		 
		 }else{
			columns.put(columns_key[i-1], rs.getObject(columns_key[i-1]));
		 }
		}
		rows.add(columns);
	 }
	}catch (SQLException e1) {
	 e1.printStackTrace();
	}catch(Exception e){
	 e.printStackTrace();
	}
	
	return rows;
	
 }
 /**
	* db2 커넥션 얻는 부분. 
	* @return
	*/
 public static Connection getConnection (){
	
 
	String jdbc_url = "jdbc:db2://아이피:포트/DB명";
	String db_id = "loginid"; 
	String db_pwd = "password"; 
		 Connection conn = null;
		
		 try{
				 Class.forName("com.ibm.db2.jcc.DB2Driver");
	 conn = DriverManager.getConnection(jdbc_url, db_id, db_pwd);
		 }
		 catch (Exception e) {
			e.printStackTrace();
			return null;
		 }
		 
		 return conn; 
 }
 
 public static void connClose(Connection conn ,	PreparedStatement stmt, ResultSet rs){
	try {if(rs != null) rs.close();}catch (Exception e) {}
	try {if(stmt != null) stmt.close();}catch (Exception e) {}
	try {if(conn != null) conn.close();}catch (Exception e) {}
	
 }
}

