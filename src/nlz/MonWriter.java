package nlz;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.CDATA;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;
import org.jdom2.xpath.XPathFactory;
import org.jdom2.xpath.XPathExpression;
import org.jdom2.filter.Filters;

import nlz.com.HashObject;
import nlz.com.InoutParameter;
import nlz.com.LoggingWriter;

import java.util.*;
import java.text.SimpleDateFormat;


public class MonWriter {
    private static String pgmID        = "MonWriter";

//	public MonWriter() {}
	public static void writeLog(InoutParameter ioParam) throws IOException {
        HashObject ho		 = ioParam.getInputHashObject();
    	FileOutputStream out = null;	// FILE STREAM
    	String m_sys_out	 = "";
		
		try {
            String sys_name  = (String)ho.get("SYSTEM",HashObject.YES);
            String file_name = (String)ho.get("PANEID",HashObject.YES);
            m_sys_out 		 = (String)ho.get("SYSOUT",HashObject.YES);
			
			String title = "../webapps/shot/logs/" + sys_name + "-" + file_name + "_" + getCurrentDate() + ".txt";
			File file 		 = new File(title);
			String str		 = "";
			if(!file.exists()) {
				file.createNewFile();
			}
			out       = new FileOutputStream(file,true);
			if(m_sys_out.equals("Y")) System.out.println("LOG WRITE: [" + getCurrentTime() + "] : " + sys_name + "-" + file_name + "_" + getCurrentDate() + ".txt");

			ArrayList arrList = ioParam.getResultList();
			if (!arrList.isEmpty()) {
 
			    Hashtable hstResult = null;
			    hstResult = (Hashtable)arrList.get(0);
			    Enumeration e = hstResult.keys();
			    Vector vtCol = ioParam.getColName();
			    int cnt = vtCol.size();

			    if (file.length() == 0) {
			    	for(int i=0; i<cnt; i++) {
				    	if (i>0) str += ",";
				    	str += vtCol.elementAt(i);
			    	}
			    	str += "\n";
			    }
		    	for(int i=0; i<arrList.size(); i++) {
		    		for(int j=0; j<cnt; j++) {
			    		hstResult = (Hashtable)arrList.get(i);
		                if (j>0) str += ",";
		                str += hstResult.get(vtCol.elementAt(j));
			        }
			    	str += "\n";
			    }

			}

			out.write(str.getBytes());
			out.flush();
		} catch (IOException ioe) {
            LoggingWriter.setLogError(pgmID,"@Business==== IO Error ====" + ioe.getMessage());
            ioe.printStackTrace();
        } catch(Exception e) {
			System.out.println("MonWriter Error : " + e.toString());
		} finally{
			out.close();
		}

	}

	// Writing query history
	public static void writeHistory(InoutParameter ioParam) throws IOException {
        HashObject ho		 = ioParam.getInputHashObject();
    	SAXBuilder builder   = new SAXBuilder();
		
		try {
            String path 	= (String)ho.get("historyPath",HashObject.YES);
            String host 	= (String)ho.get("HOST",HashObject.YES);
            String strSql	= (String)ho.get("SQL",HashObject.YES);
			
			// String title	= "../webapps/shot/history/" + host + "_" + getCurrentDate() + ".xml";
			String title	= path + "/" + host + "_" + getCurrentDate() + ".xml";
			File xmlFile	= new File(title);
            Document doc 	= null;
			Element rootNode = null;
			if(!xmlFile.exists()) {
				xmlFile.createNewFile();
	            doc = new Document();
	            rootNode = new Element("QUERY");
	            doc.setRootElement(rootNode);
			}
			else {
	            doc = (Document) builder.build(xmlFile);
	            rootNode = doc.getRootElement();
			}
            Element childNode = new Element("item");

            childNode.addContent(new Element("time").setText(getCurrentTime()));
            childNode.addContent(new Element("sql").setContent(new CDATA(strSql)));
		
            rootNode.addContent(childNode);

            XMLOutputter xmlOutput = new XMLOutputter();

            xmlOutput.setFormat(Format.getPrettyFormat());
            xmlOutput.output(doc, new FileOutputStream(xmlFile));

		} catch (IOException ioe) {
            LoggingWriter.setLogError(pgmID,"@Business==== IO Error ====" + ioe.getMessage());
            ioe.printStackTrace();
        } catch (JDOMException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== JDOM Error ====" + e.getMessage());
            e.printStackTrace();
        } catch(Exception e) {
			System.out.println("MonWriter Error : " + e.toString());
		}

	}

	public static String getCurrentDate() {
		String dateStr = "";
		dateStr = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		return dateStr;
	}

	public static String getCurrentTime() {
		String timeStr = "";
		timeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		return timeStr;
	}

}
