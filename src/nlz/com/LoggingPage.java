package nlz.com;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import nlz.db.ConnectionPool;
import nlz.db.SqlAdapter;


public class LoggingPage extends SqlAdapter {


	String pgmID        = "LoggingPage";
    ConnectionPool pool = null;

    public LoggingPage() {
    	pool = ConnectionPool.getInstance();
    }
    /**
     * @param       null
     * @return      void
     * @description 방문페이지 로깅
     */
    public void logVisitPage(String userID, String cid, String cmd) {

		Connection 		con  	= null;

		PreparedStatement pstmt = null;
		
        try{
        	
			StringBuffer query = new StringBuffer();
			
			query.append(" INSERT INTO TB_VST_PAGE ");
			query.append("      ( SCRPGMID, USRID, VSTTIME, VSTFRQ ) ");
			query.append(" SELECT SCRPGMID, ?, SYSDATE, 1 ");
			query.append("   FROM TB_SCR_PGM ");
			query.append("  WHERE PGMPATH = ? ");
			
        	con = pool.getConnection();
        	
        	pstmt = con.prepareStatement(query.toString());
        	pstmt.setString(1, userID );
        	pstmt.setString(2, "CID=" + cid + "&CMD=" + cmd);
        	int cnt = pstmt.executeUpdate();
    	
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_INSERT_OK);
   		
        } catch(SQLException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== SQL Error ====" + e.getMessage());
        	e.printStackTrace();
        } catch (Exception e) {
            LoggingWriter.setLogError(pgmID,"@Business==== Error ====" + e.getMessage());
        	e.printStackTrace();
        } finally {
            if(con != null) try {con.close();} catch(Exception ex) {};
        }
    }

}
