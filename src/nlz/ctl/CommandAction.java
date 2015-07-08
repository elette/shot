package nlz.ctl;


import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.Enumeration;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import nlz.com.EventDefine;
import nlz.com.HashObject;
import nlz.com.InoutParameter;
import nlz.com.LoggingWriter;
import nlz.com.MessageDefine;
import nlz.com.ServiceDelegator;
import nlz.db.ConnectionPool;
import nlz.com.DOM;
import nlz.com.Client;
import nlz.com.Log;
import nlz.DataRest;


public class CommandAction extends HttpServlet {

    private LoggingWriter loggingWriter = null;
    private static ConnectionPool pool  = null;
    private String CTX_PATH             = "";
    private DOM xmlDom                  = null;
    private Client xmlDomClient         = null;
	private Log fileLog					= null;


    /** Servlet init 메소드
     *@param config        ServletConfig
     */
    public void init(ServletConfig config) throws ServletException {

        try {
            CTX_PATH           = config.getInitParameter("CTX_PATH");
            String DATA_SOURCE = config.getInitParameter("DATA_SOURCE");
            String LOG_LEVEL   = config.getInitParameter("LOG_LEVEL");
            String SYS_OUT     = config.getInitParameter("SYS_OUT");
            String FILE_OUT    = config.getInitParameter("FILE_OUT");
            String LOG_DIR     = config.getInitParameter("LOG_DIR");
            String CONFIG_PATH = config.getInitParameter("CONFIG_PATH"); //XML파일 output (설정, 쿼리, snap)
            String CLIENT_PATH = config.getInitParameter("CLIENT_PATH"); //고객 접속정보
            String LOG_PATH    = config.getInitParameter("LOG_PATH"); //로그 저장 경로

            loggingWriter = new LoggingWriter(LOG_LEVEL,SYS_OUT,FILE_OUT,LOG_DIR);
            xmlDom        = new DOM(CONFIG_PATH);
            xmlDomClient  = new Client(CLIENT_PATH);
			fileLog       =	new Log(LOG_PATH);

            super.init(config);

            LoggingWriter.setLogAll("","###############################################################");
            LoggingWriter.setLogAll(""," Application Starting...");
//          LoggingWriter.setLogAll(""," CTX_PATH    : " + CTX_PATH);
//          LoggingWriter.setLogAll(""," DATA_SOURCE : " + DATA_SOURCE);
            LoggingWriter.setLogAll(""," LOG_LEVEL   : " + LOG_LEVEL);
            LoggingWriter.setLogAll(""," SYS_OUT     : " + SYS_OUT);
            LoggingWriter.setLogAll(""," FILE_OUT    : " + FILE_OUT);
            LoggingWriter.setLogAll(""," LOG_DIR     : " + LOG_DIR);
            LoggingWriter.setLogAll(""," CONFIG_PATH : " + CONFIG_PATH);
            LoggingWriter.setLogAll(""," CLIENT_PATH : " + CLIENT_PATH);
            LoggingWriter.setLogAll(""," LOG_PATH    : " + LOG_PATH);
            LoggingWriter.setLogAll("","###############################################################");

        } catch(Exception e) {
            System.out.println("CommandAction init Error : " + e.toString());
        }

    }

    /** XML생성 서블릿 service 메소드
     *@param req           HttpServletRequest
     *@param res           HttpServletResponse
     */
    public void service(HttpServletRequest req, HttpServletResponse res)
        throws ServletException, IOException {

        ServiceDelegator sd    = ServiceDelegator.getInstance();
        InoutParameter ioParam = new InoutParameter();

        String cid             = "";
        String cmd             = "";

        HashObject ho          = new HashObject();

        PrintWriter out        = null;

        try {
            ho.put("IP",req.getRemoteAddr());

            setHttpParameterAtEntityObject(req, ho);

            ho.print();

            cid  = (String)ho.get("CID", HashObject.YES);
            cmd  = (String)ho.get("CMD", HashObject.YES);

            ioParam.setClassID(cid);
            ioParam.setMethodID(cmd);
            ioParam.setInputParam(ho);

            int resultValue = sd.doService(ioParam);
            ioParam.setIntResult(resultValue);
            req.setAttribute("IOPARAM", ioParam);

            getServletContext().getRequestDispatcher(ioParam.getResultURL()).forward(req, res);

        } catch (Exception e) {
            ioParam.setIntResult(EventDefine.E_SERVICE_ERROR);
            ioParam.setMessage(MessageDefine.M_SERVICE_FAILED);
            LoggingWriter.setLogError("CommandAction","@CommandAction==== Service Error ====" + e.getMessage());
            e.printStackTrace();
            getServletContext().getRequestDispatcher("/jsp/err/errMsg.jsp").forward(req, res);
        }

    }


    /** 세션 및 파라미터를 HashObject에 저장 메소드
     *@param req           HttpServletRequest
     *@param ho            HashObject
     */
    public void setHttpParameterAtEntityObject(HttpServletRequest req, HashObject ho) throws Exception {

        Enumeration keys = null;
        String key       = null;
        String[] value   = null;

        for(keys = req.getParameterNames(); keys.hasMoreElements();) {
            key   = (String)keys.nextElement();
            value = req.getParameterValues(key);
            // for(int i=0;i<value.length;i++){
                // String value_temp= new String(value[i].getBytes("8859_1"),"UTF-8");
                // value[i]=URLDecoder.decode(value_temp,"euc-kr");
            // }
            ho.put(key, value);
        }

        ho.print();

        HttpSession session = req.getSession();
        String session_yn   = (String)session.getAttribute("S_YN");

        //여기에 세션처리해서 HashObject로 파라미터 형태로 넘기세요.
        if(session_yn != null && session_yn.equals("Y")) {
            ho.put("S_USER_ID",(String)session.getAttribute("S_USER_ID"));
            ho.put("S_USER_NM",(String)session.getAttribute("S_USER_NM"));
            ho.put("S_YN"     ,(String)session.getAttribute("S_YN"));
        }else{
            session.setMaxInactiveInterval(0);
            ho.put("S_YN","N");
            ho.put("S_USER_ID","admin");
        }
    }

    public int initConnectionPool(InoutParameter ioParam) {
        int resultInt = EventDefine.E_DOEXCUTE_INIT;
        ioParam.setResultURL("/jsp/com/connMsg.jsp");
        if (pool != null) {
			resultInt = pool.getCheckConnection();
		}
		if (resultInt != EventDefine.E_DOEXCUTE_SUCCESS) {
            HashObject ho = ioParam.getInputHashObject();
            try {
//              ho.print();
                String DBMS = (String)ho.get("DBMS",HashObject.YES);
                String HOST = (String)ho.get("HOST",HashObject.YES);
                int    PORT = Integer.parseInt((String)ho.get("PORT",HashObject.YES));
                String DB   = (String)ho.get("DB",HashObject.YES);
                String USER = (String)ho.get("USER",HashObject.YES);
                String PASS = (String)ho.get("PASS",HashObject.YES);

                pool = new ConnectionPool(DBMS, HOST, PORT, DB, USER, PASS);
                resultInt = EventDefine.E_DOEXCUTE_SUCCESS;
                ioParam.setMessage(MessageDefine.M_SERVICE_OK);
            } catch(Exception e) {
                resultInt = EventDefine.E_DOEXCUTE_ERROR;
                ioParam.setMessage(MessageDefine.M_SERVICE_FAILED);
                System.out.println("CommandAction initConnectionPool Error : " + e.toString());
            }
        }
        return resultInt;
    }

    public synchronized int releaseConnectionPool(InoutParameter ioParam) {
        int resultInt = EventDefine.E_DOEXCUTE_INIT;
		try {
			if (pool != null) {
				pool.releaseConnection();
				pool = null;
			}
			resultInt = EventDefine.E_DOEXCUTE_SUCCESS;
			ioParam.setMessage(MessageDefine.M_SERVICE_OK);
			ioParam.setResultURL("/jsp/com/connMsg.jsp");
		} catch(Exception e) {
			resultInt = EventDefine.E_DOEXCUTE_ERROR;
			ioParam.setMessage(MessageDefine.M_SERVICE_FAILED);
			ioParam.setResultURL("/jsp/err/errMsg.jsp");
			System.out.println("CommandAction releaseConnectionPool Error : " + e.toString());
		}
        return resultInt;
    }

    public int getConnected(InoutParameter ioParam) {
        int resultInt           = 0;

        ioParam.setResultURL("/jsp/com/connMsg.jsp");
		resultInt = pool.getCheckConnection();
        return resultInt;
    }
	
	public int getInfoDB(InoutParameter ioParam) {
		int resultInt = EventDefine.E_DOEXCUTE_SUCCESS;
		ioParam.setResultURL("/jsp/com/dbinfo.jsp");
		HashObject ho = ioParam.getInputHashObject();
		try {
			if(pool != null) {
				ho.put("DBINFO", pool.infoDB());
			}else {
				ho.put("DBINFO", new String[][]{});
			}
		} catch(Exception e) {
			resultInt = EventDefine.E_DOEXCUTE_ERROR;
			ioParam.setMessage(MessageDefine.M_SERVICE_FAILED);
			System.out.println("dbinfo Error : " + e.toString());
		}
		ioParam.setInputParam(ho);
		return resultInt;
	}

}
