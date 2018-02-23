package nlz.com;


import java.util.ArrayList;
import java.util.Locale;
import java.util.ResourceBundle;
import java.util.HashMap;
import java.util.Vector;


public class InoutParameter {

    private String m_strClass;      // 클래스 ID
    private String m_strCmd;        // 메서드 ID
    private HashObject m_shArgv;    // 입력 파라미터
    private String m_strMessage;    // 메시지
    private int m_intResult;        // 처리결과
    private String m_strUrl;        // 처리결과url
    private ArrayList m_arrList;    // 처리결과ArrayList
    private HashMap resultSingle;    // 처리결과 single
    private String messageType="" ;    // 메시지  타입
    private String m_strMessageDetail;    // 메시지상세
    private Vector m_vtColumnName;     // 컬럼명

    private static ResourceBundle bndl;

    public InoutParameter() {
        m_strClass   = EventDefine.E_UNDEFINED_EVENT;
        m_shArgv     = null;
        m_strMessage = MessageDefine.M_UNDEFINED_MESSAGE;
        m_intResult  = EventDefine.E_SERVICE_INIT;
        m_strUrl     = null;
        m_arrList    = null;

        bndl = ResourceBundle.getBundle( "nlz.classes" , Locale.KOREA );
    }


    /* 초기화 */
    public void setClear() {
        m_strClass     = EventDefine.E_UNDEFINED_EVENT;
        m_shArgv     = null;
        m_strMessage = MessageDefine.M_UNDEFINED_MESSAGE;
        m_intResult  = EventDefine.E_SERVICE_INIT;
        m_strUrl     = null;
        m_arrList    = null;

    }


    /* 클래스 ID */
    public void setClassID(String id) {
//      m_strClass = id;
        m_strClass = bndl.getString( id );
    }

    public String getClassID() {

        return m_strClass;
    }


    /* 메서드 ID */
    public void setMethodID(String id) {
        m_strCmd = id;
    }

    public String getMethodID() {

        return m_strCmd;
    }


    /* 입력 파라미터 */
    public void setInputParam(HashObject id){
        m_shArgv = id;
    }

    public HashObject getInputHashObject() {
        return m_shArgv;
    }


    /* 처리결과 */
    public void setIntResult(int intResult) {
        m_intResult = intResult;
    }

    public int getIntResult() {
        return m_intResult;
    }


    /* 처리결과url */
    public void setResultURL(String strUrl) {
        m_strUrl = strUrl;
    }

    public String getResultURL() {
        return m_strUrl;
    }


    /* 처리결과arrayList */
    public void setResultList(ArrayList arrList) {
        m_arrList = arrList;
    }

    public ArrayList getResultList() {
        return m_arrList;
    }

    public void setColName(Vector vt) {
        m_vtColumnName = vt;
    }

    public Vector getColName() {
        return m_vtColumnName;
    }


    /* 메시지 */
    public void setMessage(String id) {
        m_strMessage = id;
    }

    public String getMessage() {
        return m_strMessage;
    }


    public void setMessageDetail(String msg) {
        m_strMessageDetail = msg;
    }

    public String getMessageDetail() {
        return m_strMessageDetail;
    }

    public HashMap getResultSingle() {
        return resultSingle;
    }


    public void setResultSingle(HashMap resultSingle) {
        this.resultSingle = resultSingle;
    }
    public String getMessageType() {
        return messageType;
    }
    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }



}
