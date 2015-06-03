package nlz.com;

import nlz.com.HashObject;

public class ServiceDelegator {
	
	private static ServiceDelegator m_objSelf = null;

	public ServiceDelegator() {
	}
	/**
	* 클라이언트에서 서버에 서비스를 요청하기 위하여 취득해야 할 SingleTon Instance.
	* @return ServiceDelegator
	*/
	public static ServiceDelegator getInstance() {
		LoggingWriter.setLogAll(ServiceDelegator.class.getName() ,"@ServiceDelegator# Service Delegator START #:");
		if (null == ServiceDelegator.m_objSelf)	{
			ServiceDelegator.m_objSelf = new ServiceDelegator();
			LoggingWriter.setLogDebug(ServiceDelegator.class.getName() , "@ServiceDelegator==== Create ServiceDelegator ====");
		} else {
			LoggingWriter.setLogDebug(ServiceDelegator.class.getName() ,"@ServiceDelegator==== Reuse  ServiceDelegator ====");
		}
		return ServiceDelegator.m_objSelf;
	}
	/**
	* html에서 이벤트를 셋팅하고 이 메소드를 호출한다.
	* 이벤트에 따라 처리를 담당할 메인 메소드를 호출한다.
	* @param  ioParam
	* @return the desired integer.  성공하면 0 이상 , 실패하면 -1
	* @exception  Exception  모든exception에 대하여 예외처리
	*/
	public int doService(InoutParameter ioParam){
		long startTime = System.currentTimeMillis();
		ioParam.setIntResult(EventDefine.E_EVENT_INIT);
		ioParam.setMessage(MessageDefine.M_UNDEFINED_MESSAGE);
		int returnResultValue = -1;
		HashObject ho = ioParam.getInputHashObject();

		try	{
			LoggingWriter.setLogDebug(ioParam.getClassID() ,"@ServiceDelegator==== doService Start ====");
			LoggingWriter.setLogInfo(ServiceDelegator.class.getName() ,"@ServiceDelegator==== Menu Class ID [ " + ioParam.getClassID() + " ] ====" );
			/**
			 * EventFactory 를 생성하고 입력Parameter 를 넘겨준다. 
			 * @return the desired integer. 성공하면 0이상, 실패하면 -1
			 */
			EventFactory eventFactory = new EventFactory();
			returnResultValue = eventFactory.doExcute(ioParam); 

			LoggingWriter.setLogInfo(ioParam.getClassID() ,"@ServiceDelegator==== Message : " + ioParam.getMessage() + " ====");
			LoggingWriter.setLogDebug(ioParam.getClassID() ,"@ServiceDelegator==== doService End ====");
			long endTime = System.currentTimeMillis();
			long runningTime = endTime - startTime;
			ho.put("RUNTIME", runningTime);
		} catch (Exception e) {
			returnResultValue = EventDefine.E_SERVICE_ERROR;
            ioParam.setMessage(MessageDefine.M_SERVICE_FAILED);
			LoggingWriter.setLogError(ioParam.getClassID() ,"@ServiceDelegator==== doService Exeption ====" + e.getMessage());
		}
		ioParam.setInputParam(ho);
		
		long endTime = System.currentTimeMillis();
		long runningTime = endTime - startTime;
		LoggingWriter.setLogAll(ioParam.getClassID(),"@ServiceDelegator==== ServiceDelegator [수행시간  : " + runningTime + " ms] ");
		LoggingWriter.setLogAll(ioParam.getClassID() ,"@ServiceDelegator# Service Delegator END   #:");
		
		return returnResultValue;
	}

}
