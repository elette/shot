package nlz.com;


import java.io.File;
import java.io.FileOutputStream;
import java.util.Calendar;
import java.util.Date;
import java.text.SimpleDateFormat;


public class LoggingWriter {

	private static String m_log_level = "INFO"; // LOG LEVEL(DEBUG,INFO,SQL,CONN)
	private static String m_sys_out   = "Y";    // SYSTEM OUT(Y,N)
	private static String m_file_out  = "Y";    // FILE OUT(Y,N)

	private static FileOutputStream out = null;	// LOG STREAM

	public LoggingWriter(String log_level, String sys_out, String file_out, String file_dir) {
		m_log_level = log_level;
		m_sys_out   = sys_out;
		m_file_out  = file_out;
		
		if(m_file_out.equals("Y")) {
			try {
				File file = new File(file_dir + "/" + getCurrentDate() + ".log");
				if(!file.exists()) {
					file.createNewFile();
				}
				out       = new FileOutputStream(file,true);
			} catch(Exception e) {
				System.out.println("LoggingWriter Create Error : " + e.toString());
			}
		}
	}

	public static void setLogAll(String className,String str){
		writeLog("ALL",className,str);
	}

	public static void setLogInfo(String className,String str){
		if(m_log_level.equals("INFO")) writeLog("INFO",className,str);
	}

	public static void setLogDebug(String className,String str){
		if(m_log_level.equals("DEBUG")) writeLog("DEBUG",className,str);
	}

	public static void setLogConn(String className,String str){
		if(m_log_level.equals("CONN") || m_log_level.equals("DEBUG")) writeLog("CONN",className,str);
	}

	public static void setLogSql(String className,String str){
		if(m_log_level.equals("SQL") || m_log_level.equals("DEBUG")) writeLog("SQL",className,str);
	}

	public static void setLogError(String className,String str){
		writeErrorLog(className,str);
	}

	private static void writeLog(String log_level,String className,String str) {
		if(m_sys_out.equals("Y")) System.out.println(log_level + " [" + getCurrentTime() + "] : " + str + ":" + className);
		if(m_file_out.equals("Y")) writeFileLog(log_level + " [" + getCurrentTime() + "] : " + str + ":" + className + "\n");
	}

	private static void writeErrorLog(String className,String str) {
		if(m_sys_out.equals("Y")) System.out.println("*ERROR" + " [" + getCurrentTime() + "] : " + str + ":" + className);
		if(m_file_out.equals("Y")) writeFileLog("*ERROR" + " [" + getCurrentTime() + "] : " + str + ":" + className);
	}

	private static void writeFileLog(String str) {
		if(out != null) {
			try {
				out.write(str.getBytes());
				out.flush();
			} catch(Exception e) {
				System.out.println("LoggingWriter writeFileLog Error : " + e.toString());
			}
		}
	}

	public static String getCurrentDate() {
		String dateStr = "";

		dateStr = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

		return dateStr;
	}

	public static String getCurrentTime() {
		String timeStr = "";

		// Calendar rightNow = Calendar.getInstance();
		// int hour = rightNow.get(Calendar.HOUR);
		// int min = rightNow.get(Calendar.MINUTE);
		// int sec = rightNow.get(Calendar.SECOND);
		// int ampm = rightNow.get(Calendar.AM_PM);
		
		// String ampmStr = "";
		// if(ampm==0) {
			// ampmStr = "AM";
		// } else {
			// ampmStr = "PM";
		// }

		// timeStr = getCurrentDate() + ampmStr + "-" + hour + ":" + min + ":" + sec;

		//
		timeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		return timeStr;
	}

}
