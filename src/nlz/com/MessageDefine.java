package nlz.com;


public class MessageDefine {

	/* 공통 */
	public final static String M_UNDEFINED_MESSAGE = "";

	/* Service 에서 사용하는 변수*/
	public final static String M_SERVICE_OK     = "Services OK.";	//"서비스가 잘 수행되었습니다.";
	public final static String M_SERVICE_FAILED = "Services FAIL.";	//"서비스 오류가 발생하였습니다.";

	/* EventFactory 에서 사용하는 변수*/
	public final static String M_NO_EVENTID = "Event Not Defined.";	//"이벤트가 정의 되어있지 않습니다.";
	public final static String M_NO_CLASS   = "Class Not Exists.";	//"클래스가 존재하지 않습니다.";


	/* doExcute 에서 사용하는 변수*/
	public final static String M_PARAM_UN_MATCH    = "Parameters Unmatched.";	//"파라미터가 일치하지 않습니다.";
	public final static String M_SELECT_OK         = "Select OK.";	//"정상적으로 조회되었습니다.";
	public final static String M_SELECT_NOT_RESULT = "No Result.";	//"해당 데이터가 존재하지 않습니다.";
	public final static String M_SELECT_FAILED     = "Select FAIL.";	//"조회시 오류가 발생하였습니다.";
	public final static String M_INSERT_OK         = "Insert OK.";	//"저장되었습니다.";
	public final static String M_INSERT_FAILED     = "Insert FAIL.";	//"저장시 오류가 발생하였습니다.";
	public final static String M_UPDATE_OK         = "Update OK.";	//"수정되었습니다.";
	public final static String M_UPDATE_FAILED     = "Update FAIL.";	//"수정시 오류가 발생하였습니다.";
	public final static String M_DELETE_OK         = "Delete OK.";	//"삭제되었습니다.";
	public final static String M_DELETE_FAILED     = "Delete FAIL.";	//"삭제시 오류가 발생하였습니다.";
	
	public final static String M_DUPLICATE_YES		   = "Duplicated.";	//"이미 등록되어있습니다.";
	public final static String M_DUPLICATE_NO		   = "No Duplicated.";	//"등록 할 수 있는 정보 입니다.";
	
	public final static String TYPE_POP_PARENT_GO	   = "popgo";
	public final static String TYPE_POP_CLOSE_	   = "popclose";
	public final static String TYPE_IFRAME_PARENT_GO		= "iframego";
	
	
	
}
