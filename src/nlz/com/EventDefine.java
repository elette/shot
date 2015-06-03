package nlz.com;


public class EventDefine {

	/* ���� */
	public final static String E_UNDEFINED_EVENT = "100";	// �ʱⰪ.
	public final static int E_PARAMETER_ERROR 	 = 101;	// �Ķ���� ����.
	public final static int E_SQL_ERROR 		 = 102;	// SQL�� ����.
	public final static int E_QUERY_NOT_RESULT 	 = 103;	// SELECT ��� ���� ����.

	/* Service ���� ����ϴ� ����*/
	public final static int E_SERVICE_INIT    	 = 200;	// �ʱⰪ.
	public final static int E_SERVICE_OK    	 = 201;	// Service ����.
	public final static int E_SERVICE_ERROR   	 = 202;	// Service ����.

	/* EventFactory ���� ����ϴ� ����*/
	public final static int E_EVENT_INIT    	 = 300;	// �ʱⰪ.
	public final static int E_EVENT_ID_OK    	 = 301;	// EventID ����.
	public final static int E_EVENT_ID_ERROR   	 = 302;	// EventID ����.

	/* doExcute ���� ����ϴ� ����*/
	public final static int E_DOEXCUTE_INIT 	 = 400;	// �ʱⰪ.
	public final static int E_DOEXCUTE_SUCCESS 	 = 401;	// ����.
	public final static int E_DOEXCUTE_ERROR 	 = 402;	// ����.

	/* Login ���� ����ϴ� ����*/
	public final static int E_LOGIN_INIT    	 = 500;	// �ʱⰪ.
	public final static int E_LOGIN_SUCCESS 	 = 501;	// ����.
	public final static int E_LOGIN_ERROR   	 = 503;	// ����.
	public final static int E_LOGIN_PWD_ERROR  	 = 504;	// �α��� ��ȣ ����.
}
