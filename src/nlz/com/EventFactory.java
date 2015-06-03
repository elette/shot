package nlz.com;


import java.lang.reflect.Method;


public class EventFactory {

    public EventFactory(){
    }

    /**
    * Event로부터 EventHander를 생성
    * @param      ioParam
    * @return     int
    * @exception  Exception
    */
    public int doExcute(InoutParameter ioParam){

        /** ioParam으로부터 EventHander를 생성한다.*/
        String classID  = ioParam.getClassID();
        String methodID = ioParam.getMethodID();

        int resultInt = EventDefine.E_EVENT_INIT;
        try{
            Class<?> eventHander  = Class.forName(classID);
            Object bizObj      = eventHander.newInstance();

            Class[] paramClass = new Class[1];
            paramClass[0]      = ioParam.getClass();

            Object[] paramObj  = new Object[1];
            paramObj[0]        = ioParam;

            /** 클래스에서 메소드(doExcute)를 생성한다.
             * paramClass에 입력 파라메타를 담아서 넘긴다.
             */
            Method method = eventHander.getMethod(methodID,paramClass);
            LoggingWriter.setLogDebug(EventFactory.class.getName(),"@EventFactory==== " + classID + " EventHander Create Success ====");
            LoggingWriter.setLogDebug(EventFactory.class.getName(),"@EventFactory==== " + methodID + " EventMethod Create Success ====");

            /** 메소드를 실행시킨다. */
            Object obj = method.invoke(bizObj,paramObj);
            resultInt = CommonFunction.getInt(obj.toString());
        } catch (Exception ex) {
            resultInt = EventDefine.E_EVENT_ID_ERROR;
            ioParam.setMessage(MessageDefine.M_NO_CLASS);
            LoggingWriter.setLogError(EventFactory.class.getName(),"@EventFactory==== EventHander Create Error ====" + classID + ": " + ex.getMessage());
            LoggingWriter.setLogError(EventFactory.class.getName(),"@EventFactory==== EventMethod Create Error ====" + methodID);
        }

        return resultInt;
    }

}
