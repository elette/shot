package nlz.com;


import java.util.*;


public class CommonFunction {

	public final static int DT_NULL  = 1;
	public final static int DT_MINUS = 2;
	public final static int DT_SLASH = 3;

	public final static Calendar cal = Calendar.getInstance();
	
	public static int getInt(String str) {
		try {
			return Integer.parseInt(str);
		} catch(Exception e) {
			return 0;
		}
	}
	
	public static int getYear() {
		return cal.get(Calendar.YEAR);
	}

	public static int getMonth() {
		return cal.get(Calendar.MONTH);
	}

	public static int getDate() {
		return cal.get(Calendar.DAY_OF_MONTH);
	}

	public static int getHour() {
		return cal.get(Calendar.HOUR_OF_DAY);
	}

	public static int getMinute() {
		return cal.get(Calendar.MINUTE);
	}

	public static int getSecond() {
		return cal.get(Calendar.SECOND);
	}

	public static String getYMD(String format) {
		String ymd = "";
		
		int yyyy = getYear();
		int mm   = getMonth();
		int dd   = getDate();
		
		ymd += yyyy;
		ymd += format;

		if(mm < 10) ymd += "0";
		ymd += mm;
		ymd += format;
		
		if(dd < 10) ymd += "0";
		ymd += dd;

		return ymd;
	}

	public static String getHMS(String format) {
		String hms = "";
		
		int hh = getHour();
		int mi = getMinute();
		int ss = getSecond();
		
		if(hh < 10) hms += "0";
		hms += hh;
		hms += format;
		
		if(mi < 10) hms += "0";
		hms += mi;
		hms += format;
		
		if(ss < 10) hms += "0";
		hms += ss;

		return hms;
	}

	public static String getYMDHMS(int type) {
		String ymdhms = "";
		
		int hh = getHour();
		int mi = getMinute();
		int ss = getSecond();
		
		if(type == CommonFunction.DT_NULL) {
			ymdhms += getYMD("");
			ymdhms += getHMS("");
		} else if(type == CommonFunction.DT_MINUS) {
			ymdhms += getYMD("-");
			ymdhms += " ";
			ymdhms += getHMS(":");
		} else if(type == CommonFunction.DT_SLASH) {
			ymdhms += getYMD("/");
			ymdhms += " ";
			ymdhms += getHMS(":");
		}

		return ymdhms;
	}

}
