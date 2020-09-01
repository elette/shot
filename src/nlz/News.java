package nlz;

import java.io.File;
import java.io.FileWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.*;

// import org.apache.xml.serializer;
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

    Process p           = null;
    ProcOutThread po1   = null;
    ProcOutThread po2   = null;

    public News () {
    }

    public News (String config_path) {
        file = config_path;
        builder = new SAXBuilder();
        xmlFile = new File(file);
        p = null;
        po1   = null;
        po2   = null;
    }

    public int launch(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        try {
            ioParam.setResultURL("/" + xmlFile.getName());
            // String[] cmd = {"C:/Python27/python.exe", "C:/apache-tomcat-8.5.9/webapps/shot/daemon/NewsService.py", "C:/apache-tomcat-8.5.9/webapps/shot/news.xml"} ;
            // String[] cmd = "cmd /c cd " + System.getProperty("user.dir") + "\\webapps\\shot\\daemon && python NewsService.py ..\\news.xml".split(" ");
            String[] cmd = {"cmd.exe", "/C", "cd " + System.getProperty("user.dir") + "\\webapps\\shot\\daemon && python NewsService.py ..\\news.xml"};
System.out.println(cmd.toString());
            // if (p == null) {
                p = Runtime.getRuntime().exec(cmd);
                po1 = new ProcOutThread(p.getInputStream());
                po1.start();
                po2 = new ProcOutThread(p.getErrorStream());
                po2.start();
                p.getOutputStream().close();

                // p.waitFor();
                LoggingWriter.setLogAll(pgmID,"@Business==== " + "News Service Started.");
            // }else{
            if (p != null) {
                LoggingWriter.setLogAll(pgmID,"@Business==== " + "Already Started..");
            }
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        // } finally {
        //     try {
        //         if (p != null)
        //             p.destroy();
        //     } catch (Exception e) {
        //         resultInt = EventDefine.E_DOEXECUTE_ERROR;
        //         e.printStackTrace();
        //     }
        }
        return resultInt;
    }

    public int stop(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        Process p2           = null;
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
            String[] cmd = "taskkill /im python* /f".split(" ");
            p2 = Runtime.getRuntime().exec(cmd);
            p2.getErrorStream().close(); 
            p2.getInputStream().close(); 
            p2.getOutputStream().close();
            p2.waitFor();

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