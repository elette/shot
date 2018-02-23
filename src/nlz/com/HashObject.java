package nlz.com;


import java.util.Enumeration;
import java.util.Hashtable;


public class HashObject {

	Hashtable<String,Object> ht;

    String key;
    Object value;
    public static final int YES = 1;
    public static final int NO = 2;

	public HashObject(){
		ht = new Hashtable<String,Object>();
	}

	/** HashTable에 key, value 설정
	 *@param key           key
	 *@param Object        value
	 *@return HashObject   Hashtable
	 */
	public HashObject put(String key, Object value) throws Exception{
		HashObject ho = new HashObject();
		try{

			if(key == null){
				throw new Exception("HashObject put(String, Object) -> 해당되는 Key 값이 Null 입니다.");
			}
			if(value == null){
				throw new Exception("HashObject put(String, Object) -> 해당되는 value 값이 Null 입니다.");
			}
			if((key.trim()).equals("")){
				throw new Exception("HashObject put(String, Object) -> 해당되는 key 값이 blank 입니다.");
			}

		

			ht.put(key, value);
		}catch(Exception ex){
            LoggingWriter.setLogError("HashObject","put() : " + ex.toString());
			ex.printStackTrace();
		}
		return ho;
	}

	/** HashTable에 key로 value값 리턴
	 *@param key       key
	 *@param int       status
	 *@return Object   value
	 */
	public Object get(String key, int status) throws Exception{
		Object value = null;
		try{
			if(!ht.containsKey(key)){
				ht.put(key,"");
			}
			value = ht.get(key);
			if(value == null && status == 1){
				value = new Object();
			} else {
				if(value.getClass().isArray()) {
				    Object[] arr_value = (Object[])value;
				    value = arr_value[0];
				}
			}
		}catch(Exception ex){
            LoggingWriter.setLogError("HashObject","get() : " + ex.toString());
			ex.printStackTrace();
		}
		return value;
	}

	/** HashTable에 key로 value 배열값 리턴
	 *@param key       key
	 *@return String   value
	 */
	public Object[] getArray(String key) throws Exception{
		Object[] arr_value = null;
		try{
		    Object value = ht.get(key);
			if(!value.getClass().isArray()) {
			    arr_value = null;
			} else {
			    arr_value = (Object[])value;
			}
		}catch(Exception ex){
            LoggingWriter.setLogError("HashObject","getString() : " + ex.toString());
			ex.printStackTrace();
		}

		return arr_value;
	
	}


	/** HashTable에 전체 key로 value 출력
	 */
	public void print() {
	    try{
	    	Enumeration allKey = ht.keys();
	    	Enumeration allValue = ht.elements();

			LoggingWriter.setLogDebug("HashObject","##### Print Start #####");

	    	while(allKey.hasMoreElements()){
				LoggingWriter.setLogDebug("HashObject","-> " + allKey.nextElement() + " : " + allValue.nextElement());
	    	}

			LoggingWriter.setLogDebug("HashObject","##### Print End #####");

	    }catch(Exception ex){
            LoggingWriter.setLogError("HashObject","print() : " + ex.toString());
			ex.printStackTrace();
	    }
	}

}
