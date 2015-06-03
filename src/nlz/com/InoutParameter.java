package nlz.com;


import java.util.ArrayList;
import java.util.Locale;
import java.util.ResourceBundle;
import java.util.HashMap;
import java.util.Vector;


public class InoutParameter {

    private String m_strClass;      // Ŭ���� ID
    private String m_strCmd;        // �޼��� ID
    private HashObject m_shArgv;    // �Է� �Ķ����
    private String m_strMessage;    // �޽���
    private int m_intResult;        // ó�����
    private String m_strUrl;        // ó�����url
    private ArrayList m_arrList;    // ó�����ArrayList
    private HashMap resultSingle;    // ó����� single
    private String messageType="" ;    // �޽���  Ÿ��
    private String m_strMessageDetail;    // �޽�����
    private Vector m_vtColumnName;     // �÷���

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


    /* �ʱ�ȭ */
    public void setClear() {
        m_strClass     = EventDefine.E_UNDEFINED_EVENT;
        m_shArgv     = null;
        m_strMessage = MessageDefine.M_UNDEFINED_MESSAGE;
        m_intResult  = EventDefine.E_SERVICE_INIT;
        m_strUrl     = null;
        m_arrList    = null;

    }


    /* Ŭ���� ID */
    public void setClassID(String id) {
//      m_strClass = id;
        m_strClass = bndl.getString( id );
    }

    public String getClassID() {

        return m_strClass;
    }


    /* �޼��� ID */
    public void setMethodID(String id) {
        m_strCmd = id;
    }

    public String getMethodID() {

        return m_strCmd;
    }


    /* �Է� �Ķ���� */
    public void setInputParam(HashObject id){
        m_shArgv = id;
    }

    public HashObject getInputHashObject() {
        return m_shArgv;
    }


    /* ó����� */
    public void setIntResult(int intResult) {
        m_intResult = intResult;
    }

    public int getIntResult() {
        return m_intResult;
    }


    /* ó�����url */
    public void setResultURL(String strUrl) {
        m_strUrl = strUrl;
    }

    public String getResultURL() {
        return m_strUrl;
    }


    /* ó�����arrayList */
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


    /* �޽��� */
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
