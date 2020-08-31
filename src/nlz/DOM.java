package nlz;

import java.io.File;
import java.io.FileWriter;
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



public class DOM {
    String pgmID        = "DOM";
    private static SAXBuilder builder  = null;
    private static String file  = "";
    private static File xmlFile = null;
    private Document doc        = null;

    public DOM () {
    }
    public DOM (String config_path) {
        file = config_path;
        builder = new SAXBuilder();
        xmlFile = new File(file);
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

    public int insNode(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        try {

            ioParam.setResultURL("/jsp/com/listDom.jsp");
            String strNode      = "item"; //(String)ho.get("Node",HashObject.YES);
            String strCategory  = (String)ho.get("Category",HashObject.YES);
            String strSchema    = (String)ho.get("Schema",HashObject.YES);
            String strName      = (String)ho.get("Name",HashObject.YES);
            String strSql       = (String)ho.get("Sql",HashObject.YES);
            String strDesc      = (String)ho.get("Desc",HashObject.YES);

            doc = (Document) builder.build(xmlFile);

            Element rootNode = doc.getRootElement();

//             // get document
//             Element docNode = rootNode.getChild(strNode);

            // add new element
            Element childNode = new Element(strNode);

            childNode.setAttribute("cat", strCategory);
            childNode.addContent(new Element("schema").setText(strSchema));
            childNode.addContent(new Element("name").setText(strName));
            childNode.addContent(new Element("sql").setContent(new CDATA(strSql)));
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

            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
        } catch (IOException ioe) {
            LoggingWriter.setLogError(pgmID,"@Business==== IO Error ====" + ioe.getMessage());
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            ioe.printStackTrace();
        } catch (JDOMException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== JDOM Error ====" + e.getMessage());
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }

    public int delNode(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        try {
            ioParam.setResultURL("/jsp/com/listDom.jsp");
            String strName      = (String)ho.get("Name",HashObject.YES);

            doc = (Document) builder.build(xmlFile);

            XPathExpression<Element>  xpath = XPathFactory.instance().compile("//item[name='" + strName +"']", Filters.element());

            //Element el = (Element) xpath.selectSingleNode(doc);
            Element el = (Element)xpath.evaluate(doc);
            el.getParent().removeContent(el);

            XMLOutputter xmlOutput = new XMLOutputter();

            xmlOutput.setFormat(Format.getPrettyFormat());
            xmlOutput.output(doc, new FileOutputStream(xmlFile));

            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
        } catch (IOException ioe) {
            LoggingWriter.setLogError(pgmID,"@Business==== IO Error ====" + ioe.getMessage());
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            ioe.printStackTrace();
        } catch (JDOMException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== JDOM Error ====" + e.getMessage());
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }

    public int getNode(InoutParameter ioParam) {

        int resultInt = EventDefine.E_DOEXECUTE_INIT;
        HashObject ho = ioParam.getInputHashObject();
        try {
            ioParam.setResultURL("/jsp/com/getDom.jsp");
            String strName      = (String)ho.get("Name",HashObject.YES);

            doc = (Document) builder.build(xmlFile);

            XPathExpression<Element>  xpath = XPathFactory.instance().compile("//item[name='" + strName +"']/sql", Filters.element());

            //Element el = (Element) xpath.selectSingleNode(doc);
            Element el = (Element)xpath.evaluate(doc);
			ho.put("BOARD_SQL",el.getText());

			ioParam.setInputParam(ho);
            resultInt = EventDefine.E_DOEXECUTE_SUCCESS;
            LoggingWriter.setLogDebug(pgmID,"@Business==== " + MessageDefine.M_SELECT_OK);
        } catch (IOException ioe) {
            LoggingWriter.setLogError(pgmID,"@Business==== IO Error ====" + ioe.getMessage());
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            ioe.printStackTrace();
        } catch (JDOMException e) {
            LoggingWriter.setLogError(pgmID,"@Business==== JDOM Error ====" + e.getMessage());
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        } catch (Exception e) {
            resultInt = EventDefine.E_DOEXECUTE_ERROR;
            e.printStackTrace();
        }
        return resultInt;
    }
	
}