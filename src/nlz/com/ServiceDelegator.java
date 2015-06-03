package nlz.com;

import nlz.com.HashObject;

public class ServiceDelegator {
	
	private static ServiceDelegator m_objSelf = null;

	public ServiceDelegator() {
	}
	/**
	* Ŭ���̾�Ʈ���� ������ ���񽺸� ��û�ϱ� ���Ͽ� ����ؾ� �� SingleTon Instance.
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
	* html���� �̺�Ʈ�� �����ϰ� �� �޼ҵ带 ȣ���Ѵ�.
	* �̺�Ʈ�� ���� ó���� ����� ���� �޼ҵ带 ȣ���Ѵ�.
	* @param  ioParam
	* @return the desired integer.  �����ϸ� 0 �̻� , �����ϸ� -1
	* @exception  Exception  ���exception�� ���Ͽ� ����ó��
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
			 * EventFactory �� �����ϰ� �Է�Parameter �� �Ѱ��ش�. 
			 * @return the desired integer. �����ϸ� 0�̻�, �����ϸ� -1
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
		LoggingWriter.setLogAll(ioParam.getClassID(),"@ServiceDelegator==== ServiceDelegator [����ð�  : " + runningTime + " ms] ");
		LoggingWriter.setLogAll(ioParam.getClassID() ,"@ServiceDelegator# Service Delegator END   #:");
		
		return returnResultValue;
	}

}
