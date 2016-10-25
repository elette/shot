package nlz.db;


import java.sql.*;
import java.sql.Connection;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
// import javax.sql.DataSource;
import javax.sql.PooledConnection;
import javax.sql.ConnectionPoolDataSource;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import java.util.*;
import com.ibm.db2.jcc.*;
import org.netezza.*;
import com.vertica.jdbc.*;
import oracle.jdbc.driver.*;
import nlz.com.EventDefine;

public class ConnectionPool {

	private static ConnectionPool instance = null;
    private Context initCtx                = null;
    private Context envCtx                 = null;
    private DataSource ds                  = null;
    // private DB2ConnectionPoolDataSource ds = null;
    // private DB2PooledConnection pc         = null;
    private Connection pc                  = null;
    // private Object[] pc = null;
    private PoolProperties props           = null;
	
	private String[][] InfoDB = new String[][]{};

    /**
     * 생성자
     * @throws NamingException 데이터소스 찾지 못할 때 예외처리
     */
//     public ConnectionPool(String JNDINames) throws NamingException {
//         initCtx  = new InitialContext();
//         envCtx   = (Context)initCtx.lookup("java:/comp/env");
//         ds       = (DataSource)envCtx.lookup(JNDINames);
//         instance = this;
//     }

    public ConnectionPool() {}

    public ConnectionPool(String dbms, String host, int port, String db, String user, String pass) throws NamingException { //public
		try{
			props = new PoolProperties();
			// for DB2 connection
			if (dbms.equals("DB2")) {
				props.setUrl("jdbc:db2://" + host + ":" + port + "/" + db);
				props.setDriverClassName("com.ibm.db2.jcc.DB2Driver");
				props.setValidationQuery("SELECT 1 FROM SYSIBM.SYSDUMMY1");
				props.setConnectionProperties("[DriverType=4;DefaultIsolationLevel=1;clientProgramName=diagmon;]");

			// for Netezza connection
			}else if (dbms.equals("NETEZZA")) {
				props.setUrl("jdbc:netezza://" + host + ":" + port + "/" + db);
				props.setDriverClassName("org.netezza.Driver");
				props.setValidationQuery("SELECT 1");
			// props.setConnectionProperties("[DriverType=4;DefaultIsolationLevel=1;clientProgramName=diagmon;]");
			}else if (dbms.equals("VERTICA")) {
				props.setUrl("jdbc:vertica://" + host + ":" + port + "/" + db);
				props.setDriverClassName("com.vertica.jdbc.Driver");
				props.setValidationQuery("SELECT 1");
				props.setConnectionProperties("[ConnectionLoadBalance=1;SessionLabel=diagmon;]");
			}else if (dbms.equals("ORACLE")) {
				props.setUrl("jdbc:oracle:thin:@//" + host + ":" + port + "/" + db);
				props.setDriverClassName("oracle.jdbc.driver.OracleDriver");
				props.setValidationQuery("SELECT 1 FROM DUAL");
				props.setConnectionProperties("[ConnectionLoadBalance=1;SessionLabel=diagmon;]");
			}

			props.setUsername(user);
			props.setPassword(pass);
			// props.setJmxEnabled(true);
			props.setDefaultAutoCommit(true);
			props.setTestWhileIdle(true);
			props.setTestOnBorrow(true);
			props.setTestOnReturn(false);
			props.setValidationInterval(30000);
			props.setTimeBetweenEvictionRunsMillis(30000);
			// props.setMaxActive(10);
			props.setMinIdle(2);
			props.setInitialSize(4);
			props.setMaxWait(10000);
			props.setRemoveAbandonedTimeout(60);
			props.setMinEvictableIdleTimeMillis(30000);
			props.setLogAbandoned(true);
			props.setRemoveAbandoned(false);

			ds = new DataSource();
			ds.setPoolProperties(props);

			pc = ds.getConnection();
		  
			InfoDB = new String[][]{{"DBMS",dbms}, {"HOST",host}, {"PORT",String.valueOf(port)}, {"DB",db}, {"USER",user}};
			
			instance = this;

		} catch(SQLException e) {
            e.printStackTrace();
		}
    }

    /**
     * 인스턴스를 얻는다.
     * @throws NamingException 데이터소스 찾지 못할 때 예외처리
     */
    public static ConnectionPool getInstance() {
        return ConnectionPool.instance;
    }

    /**
     * 데이터베이스 커넥션을 얻는다.
     * @return 데이터베이스 커넥션
     * @throws Exception 데이터베이스 커넥션 생성시 예외처리
     */
    public Connection getConnection() throws Exception {
        // return pc.getDB2Connection(props);
		// System.out.println("POOL Active: " + ds.getActive() + ", Idle: " + ds.getIdle());
        // return ((PooledConnection)pc).getConnection();
		return ds.getConnection();
		// return pc;
    }

    public void releaseConnection() throws Exception {
		// ((PooledConnection)pc).close();
		pc.close();
        // pc = null;
		ds.close();
        ds = null;
        instance = null;
		InfoDB = new String[][]{};
    }
	
	public int getCheckConnection() {
        int resultInt           = 0;
        Connection con          = null;
        PreparedStatement ps    = null;
        ResultSet l_rsResult    = null;
		
		if (InfoDB.length == 0) {
			resultInt = EventDefine.E_SQL_ERROR;
			return resultInt;
		}
		try{

            StringBuffer query = new StringBuffer();

			if (InfoDB[0][1].equals("DB2")) 
				query.append("SELECT 1 FROM SYSIBM.SYSDUMMY1");
			else if (InfoDB[0][1].equals("NETEZZA")) 
				query.append("SELECT 1");

            con = instance.getConnection();
            ps = con.prepareStatement(query.toString());
            l_rsResult = ps.executeQuery();

            if(l_rsResult == null) {
                resultInt = EventDefine.E_SQL_ERROR;
            } else {
                resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            }

        } catch(SQLException e) {
            resultInt = EventDefine.E_SQL_ERROR;
            e.printStackTrace();
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        } finally {
            if(l_rsResult != null) try {l_rsResult.close();} catch(Exception ex) {};
            if(ps != null) try {ps.close();} catch(Exception ex) {};
            if(con != null) try {con.close();} catch(Exception ex) {};
        }
        return resultInt;
	}
	
	public String[][] infoDB() {
		return InfoDB;
	}


}
