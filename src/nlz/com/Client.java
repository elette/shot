package nlz.com;

import java.io.File;
import java.io.FileWriter;
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



public class Client {
    String pgmID        = "Client";
    private static SAXBuilder builder  = null;
    private static String file  = "";
    private static File xmlFile = null;
    private Document doc        = null;

    public Client () {
    }
    public Client (String client_path) {
        file = client_path;
        builder = new SAXBuilder();
        xmlFile = new File(file);
    }

    public int list(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXCUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        try {

            ioParam.setResultURL("/" + xmlFile.getName());
            resultInt = EventDefine.E_DOEXCUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXCUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }


    public int insNode(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXCUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        try {

            ioParam.setResultURL("/jsp/com/listClient.jsp");
            String strNode      = "item"; //(String)ho.get("Node",HashObject.YES);
            String strName  	= (String)ho.get("Name",HashObject.YES);
            String strCseq  	= (String)ho.get("CSEQ",HashObject.YES);
            String strDBMS  	= (String)ho.get("DBMS",HashObject.YES);
            String strSystem  	= (String)ho.get("System",HashObject.YES);
            String strServer  	= (String)ho.get("Server",HashObject.YES);
            String strPort  	= (String)ho.get("Port",HashObject.YES);
            String strDatabase 	= (String)ho.get("Database",HashObject.YES);
            String strInstance  = (String)ho.get("Instance",HashObject.YES);
            String strPass  	= (String)ho.get("Pass",HashObject.YES);
            String strVersion  	= (String)ho.get("Version",HashObject.YES);
            String strDesc      = (String)ho.get("Desc",HashObject.YES);

            doc = (Document) builder.build(xmlFile);

            Element rootNode = doc.getRootElement();

//             // get document
//             Element docNode = rootNode.getChild(strNode);

            // add new element
            Element childNode = new Element(strNode);
            childNode.setAttribute("name", strName);
            childNode.setAttribute("cseq", strCseq);

            childNode.addContent(new Element("dbms").setText(strDBMS));
            childNode.addContent(new Element("system").setText(strSystem));
            childNode.addContent(new Element("server").setText(strServer));
            childNode.addContent(new Element("port").setText(strPort));
            childNode.addContent(new Element("database").setText(strDatabase));
            childNode.addContent(new Element("instance").setText(strInstance));
            childNode.addContent(new Element("pass").setText(strPass));
            childNode.addContent(new Element("version").setText(strVersion));
            childNode.addContent(new Element("desc").setContent(new CDATA(strDesc)));

            rootNode.addContent(childNode);

            XMLOutputter xmlOutput = new XMLOutputter();

            // display nice nice
            xmlOutput.setFormat(Format.getPrettyFormat());
//             xmlOutput.output(doc, new FileWriter(xmlFile));
//          FileOutputStream fos = new FileOutputStream(xmlFile);
            xmlOutput.output(doc, new FileOutputStream(xmlFile));
//          fos.close();

//             xmlOutput.output(doc, System.out);

            resultInt = EventDefine.E_DOEXCUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
        } catch (IOException ioe) {
            LoggingWriter.setLogError(pgmID,"@Business==== IO Error ====" + ioe.getMessage());
            resultInt = EventDefine.E_DOEXCUTE_ERROR;
            ioe.printStackTrace();
        } catch (JDOMException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== JDOM Error ====" + e.getMessage());
            resultInt = EventDefine.E_DOEXCUTE_ERROR;
            e.printStackTrace();
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXCUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }

    public int delNode(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXCUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        try {
            ioParam.setResultURL("/jsp/com/listClient.jsp");
            String strCseq      = (String)ho.get("CSEQ",HashObject.YES);

            doc = (Document) builder.build(xmlFile);

            XPath xpath = XPath.newInstance("/customer/item[@cseq='" + strCseq +"']");
            Element el = (Element) xpath.selectSingleNode(doc);
            el.getParent().removeContent(el);

            XMLOutputter xmlOutput = new XMLOutputter();

            xmlOutput.setFormat(Format.getPrettyFormat());
            xmlOutput.output(doc, new FileOutputStream(xmlFile));

            resultInt = EventDefine.E_DOEXCUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
        } catch (IOException ioe) {
            LoggingWriter.setLogError(pgmID,"@Business==== IO Error ====" + ioe.getMessage());
            resultInt = EventDefine.E_DOEXCUTE_ERROR;
            ioe.printStackTrace();
        } catch (JDOMException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== JDOM Error ====" + e.getMessage());
            resultInt = EventDefine.E_DOEXCUTE_ERROR;
            e.printStackTrace();
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXCUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }

}