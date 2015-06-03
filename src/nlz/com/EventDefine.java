package nlz.com;


public class EventDefine {

	/* 공통 */
	public final static String E_UNDEFINED_EVENT = "100";	// 초기값.
	public final static int E_PARAMETER_ERROR 	 = 101;	// 파라미터 오류.
	public final static int E_SQL_ERROR 		 = 102;	// SQL문 오류.
	public final static int E_QUERY_NOT_RESULT 	 = 103;	// SELECT 결과 갯수 없음.

	/* Service 에서 사용하는 변수*/
	public final static int E_SERVICE_INIT    	 = 200;	// 초기값.
	public final static int E_SERVICE_OK    	 = 201;	// Service 정상.
	public final static int E_SERVICE_ERROR   	 = 202;	// Service 오류.

	/* EventFactory 에서 사용하는 변수*/
	public final static int E_EVENT_INIT    	 = 300;	// 초기값.
	public final static int E_EVENT_ID_OK    	 = 301;	// EventID 정상.
	public final static int E_EVENT_ID_ERROR   	 = 302;	// EventID 오류.

	/* doExcute 에서 사용하는 변수*/
	public final static int E_DOEXCUTE_INIT 	 = 400;	// 초기값.
	public final static int E_DOEXCUTE_SUCCESS 	 = 401;	// 성공.
	public final static int E_DOEXCUTE_ERROR 	 = 402;	// 실패.

	/* Login 에서 사용하는 변수*/
	public final static int E_LOGIN_INIT    	 = 500;	// 초기값.
	public final static int E_LOGIN_SUCCESS 	 = 501;	// 성공.
	public final static int E_LOGIN_ERROR   	 = 503;	// 실패.
	public final static int E_LOGIN_PWD_ERROR  	 = 504;	// 로그인 암호 오류.
}
