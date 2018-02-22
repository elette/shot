package nlz;

import java.io.File;
import java.io.FileWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.*;

// import org.apache.xml.serializer;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.CDATA;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
import org.jdom.xpath.XPath;

import nlz.com.EventDefine;
import nlz.com.HashObject;
import nlz.com.InoutParameter;
import nlz.com.LoggingWriter;
import nlz.com.MessageDefine;


class ProcOutThread extends Thread {
    InputStream is;

    public ProcOutThread(InputStream is) {
        this.is = is;
    }

    public void run() {
        try {
            InputStreamReader isr = new InputStreamReader(is);
            BufferedReader br = new BufferedReader(isr);
            String line = null;
            while ( (line = br.readLine()) != null)
                System.out.println(line);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

}

public class News {
    private static String pgmID        = "News";
    private static SAXBuilder builder  = null;
    private static String file  = "";
    private static File xmlFile = null;
    private Document doc        = null;
    private Process p           = null;
    private ProcOutThread po1   = null;
    private ProcOutThread po2   = null;

    public News () {
    }
    public News (String config_path) {
        file = config_path;
        builder = new SAXBuilder();
        xmlFile = new File(file);
    }

    public int launch(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        try {
            ioParam.setResultURL("/" + xmlFile.getName());
            // String[] cmd = {"C:/Python27/python.exe", "C:/apache-tomcat-8.5.9/webapps/shot/daemon/NewsService.py", "C:/apache-tomcat-8.5.9/webapps/shot/news.xml"} ;
            String[] cmd = "cmd /c cd C:\\apache-tomcat-8.5.9\\webapps\\shot\\daemon && python NewsService.py ..\\news.xml".split(" ");
            p = Runtime.getRuntime().exec(cmd);
            po1 = new ProcOutThread(p.getInputStream());
            po1.start();
            po2 = new ProcOutThread(p.getErrorStream());
            po2.start();
            p.getOutputStream().close();

            p.waitFor();
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }

    public int stop(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        try {
            ioParam.setResultURL("/" + xmlFile.getName());
            if (p != null) {
                p.getErrorStream().close(); 
                p.getInputStream().close(); 
                po1.interrupt();
                po2.interrupt();
                p.destroy();
                p.destroyForcibly();
                p.waitFor();
            }
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }

    public int list(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        try {
            ioParam.setResultURL("/" + xmlFile.getName());
            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }

    public int writeItem(InoutParameter ioParam) throws IOException {
        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho        = ioParam.getInputHashObject();
        FileOutputStream out = null;    // FILE STREAM
        String m_sys_out     = "";
        
        try {
            ioParam.setResultURL("/" + xmlFile.getName());
            String item  = (String)ho.get("ITEM",HashObject.YES);
            
            String filename = "../webapps/shot/daemon/text.txt";
            File file        = new File(filename);
            if(!file.exists()) {
                file.createNewFile();
            }
            out       = new FileOutputStream(file,false);
            out.write(item.getBytes());
            out.flush();
            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
        } catch (IOException ioe) {
            LoggingWriter.setLogError(pgmID,"@Business==== IO Error ====" + ioe.getMessage());
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            ioe.printStackTrace();
        } catch(Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            System.out.println("SearchItem Error : " + e.toString());
        } finally{
            out.close();
        }
        return resultInt;

    }

}