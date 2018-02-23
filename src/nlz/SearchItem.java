package nlz;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import nlz.com.HashObject;
import nlz.com.InoutParameter;
import nlz.com.LoggingWriter;

import java.util.*;


public class SearchItem {
    private static String pgmID        = "SearchItem";

	public static void writeItem(InoutParameter ioParam) throws IOException {
        HashObject ho		 = ioParam.getInputHashObject();
    	FileOutputStream out = null;	// FILE STREAM
    	String m_sys_out	 = "";
		
		try {
            String item  = (String)ho.get("ITEM",HashObject.YES);
			
			String title = "../webapps/shot/daemon/text.txt";
			File file 		 = new File(title);
			String str		 = item;
			if(!file.exists()) {
				file.createNewFile();
			}
			out       = new FileOutputStream(file,true);
			out.write(str.getBytes());
			out.flush();
		} catch (IOException ioe) {
            LoggingWriter.setLogError(pgmID,"@Business==== IO Error ====" + ioe.getMessage());
            ioe.printStackTrace();
        } catch(Exception e) {
			System.out.println("SearchItem Error : " + e.toString());
		} finally{
			out.close();
		}

	}

}
