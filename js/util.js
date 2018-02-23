/**
 * null check �� �Է°� ���� check
 */
function isNull(str) {
	return ((str == null || str == "" || str == "<undefined>" || str == "undefined") ? true:false);
}
function exist(param) {
	if(isNull(param) || param == "") {
		return false;
	} else {
		return true;
	}
}
/**
 * �Է°��� null������ ���θ� üũ�Ѵ�.
 * @param	input	üũ�� ������Ʈ
 * @return	boolean null�� ��� false, null�� �ƴѰ�� true�� �����Ѵ�.
 */
function checkNull(input) {
	if(input.value == null || trim(input.value) == "") return false;
	else return true;
}
/**
 * �Է°��� ���������� ���θ� üũ
 * @param 	input	üũ�� ������Ʈ
 * @return	boolean ������ ��� true, ���ڰ� �ƴѰ�� false�� �����Ѵ�.
 */
function isNumber(input) {
	var chars = "0123456789";
	if(containsCharsOnly(input, chars)) return true;
	else return false;
}
/**
 * �Է°��� ���������� ���θ� üũ
 * @param 	input	üũ�� ��Ʈ��
 * @return	boolean ������ ��� true, ���ڰ� �ƴѰ�� false�� �����Ѵ�.
 * 2003.07.28 leehs�߰�
 */
function isNumberOnlyString(input) {
	var chars = "0123456789";
	if(containsCharsOnlyString(input, chars)) return true;
	else return false;
}
function isInteger(number) {
	if(number == "") {
		return false;
	}
	for(var i= 0; i < number.length; i++) {
		if(!((number.charAt(i) >= "0" && number.charAt(i) <= "9") ? true:false)) {
			return false;
		}
	}
	return true;
}
function CheckNumber(sVal)
{
	sVal = SelectNum(sVal);
	if (sVal == "") return "";

	var num="0123456789";
	for (var i=0; i<sVal.length; i++)
	{
		if (-1 == num.indexOf(sVal.substring(i,i+1)))
		{
			return "";
		}
	}
	return true;
}
/**
 * ������ üũ
 */
function chkAlpha(id_text)
{
	var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	var i ;
	for ( i=0; i < id_text.length; i++ )  {
		if( alpha.indexOf(id_text.substring(i,i+1)) < 0) {
			return true;
		}
	}
	return true;
}
/**
 * Ư������ üũ
 */
function chkSpecial(id_text)
{
	var nonchar = '~`!@#$%^&*()-_=+\|<>?,./;:"';

	var i ;
	for ( i=0; i < id_text.length; i++ )  {
		if( nonchar.indexOf(id_text.substring(i,i+1)) > 0) {
			return true;
		}
	}
	return false;
}
/**
 * ����ڰ� �Է��� ���ڰ� �ѱ����� �ƴ����� üũ�Ѵ�.
 */
function chkHangul(str) {
	var retCode = 0;
	var i = 0;

	for(i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		var ch = str.substr(i,1).toUpperCase();
		code = parseInt(code);

		if((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") &&
			((code > 255) || (code < 0))) {
			return true;
		}
	}
	return false;
}
/**
 * ����ڰ� �Է��� ���ڰ� �ѱ����� �ƴ����� üũ�Ѵ�.
 * �ѱ� ���� �Ǵ� ������ �Է����� ��쿡�� �ѱ۷� �ν� ���� �ʴ´�.
 * @param    input     üũ�� ������Ʈ
 * @return   boolean   �ѱ۸� �Է����� ��� true�� �����Ѵ�.
 */
function isHangul(input) {
	var src = input.value;
	for (var i=0; i<src.length; i++){
			ch = src.charAt(i);
			if (ch == null || ch == "") return false;
			else if(ch>="��" && ch<="\306R") {}
			else return false;
	}
	return true;
}
/**
 * ����� ���ڸ� üũ�Ѵ�.
 * @param   input       üũ�� ������Ʈ
 * @param   chars       ����� ����
 * @return      boolean     ����� ������ ��� true ����
 */
function containsCharsOnly(input,chars) {
	for (var inx = 0; inx < input.value.length; inx++) {
		if (chars.indexOf(input.value.charAt(inx)) == -1)
			return false;
	}
	return true;
}
/**
 * ����� ���ڸ� üũ�Ѵ�.
 * @param   input       üũ�� ��Ʈ��
 * @param   chars       ����� ����
 * @return      boolean     ����� ������ ��� true ����
 * 2003.07.28 leehs �߰�
 */
function containsCharsOnlyString(input,chars) {
	for (var inx = 0; inx < input.length; inx++) {
		if (chars.indexOf(input.charAt(inx)) == -1)
			return false;
	}
	return true;
}
/**
 * ������� ���� ���ڸ� üũ�Ѵ�.
 * @param    input     üũ�� ������Ʈ
 * @param    chars     ������� ���� ����
 * @return   boolean   ������� ���� �����ϰ�� false����
 */
function containsChars(input,chars) {
	for (var inx = 0; inx < input.value.length; inx++) {
		if (chars.indexOf(input.value.charAt(inx)) != -1)
			return true;
	}
	return false;
}
/**
 * ������� ���� ���ڸ� üũ�Ѵ�. �̸��� ���� : /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/ (abc@cdefg.hi)
 * ��ȭ��ȣ ���� : /^(\d+)-(\d+)-(\d+)$/ (����-����-����)
 * @param    input     üũ�� ������Ʈ
 * @param    format    ����ڰ� ������ ����(�̸��� ��)
 * @return   boolean   �ùٸ� ������ �ƴ� ��� false
 */
function isValidFormat(input,format) {
	if (input.value.search(format) != -1) {
		return true; //�ùٸ� ���� ����
	}
	return false;
}
/**
 * �ð����Ŀ� �´��� üũ
 */
function CheckTimeID(id)
{
	if (id.value == "") return;

	var sRet= CheckTime(id.value) ;
	if (sRet == false)
	{
		alert("�ð������� �߸��ƽ��ϴ�. hhmmss�������� �Է����ּ���");
		id.select();
	}
	else
	{
		id.value = sRet;
	}
}
function CheckTime(sVal)
{
	var sValue = SelectNum(sVal);
	if (sValue == "") return "";
	if (sValue.length == 3)
	{
		if (sValue.substring(1) > "59" )		return "";

		return ("0" + sValue.substring(0,1) + ":" + sValue.substring(1));
	}
	else if (sValue.length == 4)
	{
		if (sValue.substring(0,3) > "24") return "";
		if (sValue.substring(2,4) > "59") return "";
		return (sValue.substring(0,2) + ":" + sValue.substring(2));
	}
	else if (sValue.length == 5)
	{
		if (sValue.substring(1,3) > "59") return "";

		if (sValue.substring(3) > "59") return "";

		return ("0" + sValue.substring(0,1) + ":" + sValue.substring(1,3) + ":" + sValue.substring(3));
	}
	else if (sValue.length == 6)
	{
		if (sValue.substring(0,2) > "24") return "";
		if (sValue.substring(2,4) > "59") return "";
		if (sValue.substring(4) > "59")	return "";

		return (sValue.substring(0,2) + ":" + sValue.substring(2,4) + ":" + sValue.substring(4));
	}
	else
	{
		return "";
	}

}
/**
 * ��¥���Ŀ� �´��� üũ
 */
function CheckDateID(id)
{
	if (id.value == "") return "" ;

	var sRet= CheckDate(id.value) ;
	if (sRet == false)
	{
		alert("��¥������ �߸��ƽ��ϴ�. yyyymmdd�������� �Է����ּ���");
		id.select();
	}
	else
	{
		id.value = sRet;
	}
}
function CheckDate(sValue)
{
//	if (sValue.length != 8)  return "";
	sValue = SelectNum(sValue);
	if ((sValue.length != 8 && sValue.length != 6 && sValue.length != 4 )|| sValue=="")  return "";

	var sYear;
	var sMonth;
	var sDay;
	var sMax;
	var aMaxDay = new Array(31,28,31,30,31,30,31,31,30,31,30,31);


	if (sValue.length == 8 ) //YYYY/MM/DD
	{
		sYear = sValue.substring(0,4);
		sMonth = sValue.substring(4,6);
		sDay = sValue.substring(6,8);
	}
	else if (sValue.length == 6 ) //YYYY/MM
	{
		sYear = sValue.substring(0,4);
		sMonth = sValue.substring(4,6);
	}
	else if (sValue.length == 4 ) //MM/DD
	{
		sMonth = sValue.substring(0,2);
		sDay = sValue.substring(2,4);
	}
	if (parseInt(sMonth) > 12)  return "";

	if (sMonth == "02")
	{
		var nCheckYear = parseInt(sYear);
		if ((nCheckYear % 4 == 0) && (nCheckYear % 100 != 0) || (nCheckYear % 400 == 0))
		{
			sMax = "29";
		}
		else
		{
			sMax = "28";
		}
	}
	else
	{
		sMax = aMaxDay[parseInt(sMonth)];
	}
	if (!sDay && parseInt(sDay) > sMax)  return "";

	var ret="";

	if (sYear != null) ret += sYear + "/" ;
	ret += sMonth;
	if (sDay != null) ret +=  "/" + sDay;

//(sYear + "/" + sMonth + "/" + sDay)
	return ret
}

/************************************************************************************************/
/*										�Է� ������ ����			 								*/
/************************************************************************************************/

/**
 * ����ڰ� �Է��� ���ڼ��� �����Ѵ�.
 *
 * @param    input     üũ���ʵ�(this.form.fildname),����,�ʵ��
 * @return   boolean   üũ������ true����
 */
function chkFldLength(fld,maxlimit,fldnm) {
	var value = fld.value;
	var len = 0;
	for( var i=0; i<value.length; i++ ) {
		if( chkHangul(value.substr(i,1)) ) {
			len += 2;
		} else {
			len++;
		}
	}

	if (len > maxlimit){ // if too long...trim it!
		alert("["+fldnm+"]�� ���ڼ��� �ʹ� �����ϴ�. \n ���� "+maxlimit+"��, "+" �ѱ� "+Math.floor(maxlimit/2)+"�� ���Ϸ� �����ּ���.");
		fld.value = fld.value.substring(0, maxlimit);
		return false;
	} else {
		return true;
	}
}

/************************************************************************************************/
/*										�Է� ������ ������			 								*/
/************************************************************************************************/

/**
 * ����ڰ� �Է��� ������ �� ���ڸ� ����
 */
function SelectNum(sValue)
{
	if (sValue == "") return "";

	sValue = trim(sValue);
	var sResult="";
	var sNum="0123456789";
	var sChar=".,/:-) "
	for (var i=0;i<sValue.length;i++)
	{
		if (-1 != sNum.indexOf(sValue.charAt(i)))
		{
			sResult = sResult + sValue.charAt(i);
		}
		else if (-1 == sChar.indexOf(sValue.charAt(i)))
		{
			return "";
		}
	}

	return sResult;
}
/**
 * �Է��� ����Ÿ�� �ݾ� �������� ���߱�
 */
function HanMoney(sVal)
{
	var index=0;

	for (i=0; i< sVal.length; i++)
	{
		if (sVal.substring(i,i+1) != "0") break;
		index = i;
	}

	sVal = sVal.substring(index);

	if (sVal == "")		sVal="0";

	if (!CheckNumber(sVal)) return "";

	var sValue = SelectNum(sVal);

	var sRet="";

	index = sValue.length;
	for (var i=0;i<index;i+=3)
	{
		if (index > i+3)
		{
			sRet = "," + sValue.substring(index-i-3, index-i) + sRet;
		}
		else
		{
			sRet = sValue.substring(0,index-i) + sRet;
		}
	}
	return sRet;

}
/**
 * 1000 separation ǥ��
 */
function toCurrency(n) {
	if(n == null || n == "") n = "0";
	n += "";
	var len = n.length;
	var cur = n;
	if(len > 3) {
		var rem = eval(len % 3);
		var num = eval((len - rem) / 3);
		if(rem == 0) rem = 3;
		cur = n.substring(0, rem);
		for(var i = 0; i < num; i++) {
			if(rem <= len - 3) {
				cur += "," + n.substring(rem, rem+3);
			}
			rem += 3;
		}
	}
	return (cur);
}
/**
 * �Է°��� �յ� ������ �������ش�.
 * @param		str     ��Ʈ���� ��(object.value)
 * @return      str     �յ� ������ ���ŵ� �Է� ��Ʈ��
 */
function trim(str) {
	return endEnc(firstEnc(str));
}
function firstEnc(str) {
	var len = str.length;
	var i = 0;

	for(i = 0; str.charAt(i) == ' '; i++);
	str = str.substring(i, len);

	return str;
}
function endEnc(str) {
	var i = 0;
	var len = str.length;

	for(i = (len - 1); (str.charAt(i) == ' '); i--);
	str = str.substring(0, i + 1);

	return str;
}
/**
 * Unix path �����ڸ� Win path �����ڷ�
 */
function ConvertToWinFormat(pathStr) {
	sep = "\\\\"
	newStr = pathStr
	while ( newStr.indexOf("/") != -1 ) {
		newStr = replace(newStr, "/", sep)
	}
	return newStr
}

/**
 * ���ڸ� replace�Ѵ�.
 */
function replace(str, pattern, withWhat) {
	x = str.indexOf(pattern)
	if (x != -1) {
		before = str.substring(0, x)
		after = str.substring(x+1, str.length)
		str = before + withWhat + after
	}
	return str
}
/**
 * space�� �״�� �������� �ش�.
 */
function getSpace(msg) {
	var SP = "&nbsp;";
	var str = "";
	for(var i = 0 ; i < msg.length ; i++) {
		if(msg.charAt(i) == ' ' && msg.charAt(i+1) == ' ') {
			str += SP;
		} else {
			str += msg.charAt(i);
		}
	}
	return str;
}
/**
 * Text area�� String�� line ������ ������ html �������� ����.
 */
function text2html(text) {
	myText = new Array();
	myText = text.split("\n");
	var html = "";
	for(var i = 0; i< myText.length;i++) {
		html += myText[i]+"<br>\n";
	}

	return (html);
}
/**
 * html tag�� �����ش�.
 */
function html2text(html) {
	html = unescape(html);
	var LT = "&lt;";
	var text = "";
	for(var i = 0 ; i < html.length ; i++) {
		if(html.charAt(i) == '<') {
			text += LT;
		} else {
			text += html.charAt(i);
		}
	}
	return text;
}
/**
 * 10���� ���ڿ� 0���̱�
 */
function add0(cnt) {
	if(cnt < 10) {
		return "0"+cnt;
	} else {
		return cnt;
	}
}
/**
 * <BR>�� ĳ�������ϰ� �����ǵ� ���ڷ� ��ȯ, &quot;�� '�� ��ȯ
 */
function getHTMLEncoding(as_Val)
{
	var s_Ret = as_Val;
	s_Ret = replace(s_Ret, "<br>", "\r\n");
	s_Ret = replace(s_Ret, "<q>", "'");
	s_Ret = replace(s_Ret, "&quot;", "\"");

	s_Ret = replace(s_Ret, "<BR>", "\r\n");
//	s_Ret = replace(s_Ret, "<Q>", "'");
//	s_Ret = replace(s_Ret, "&QUOT;", "\"");
//	alert ("test");
	return s_Ret;
}
/**
 * �Է��� ����Ÿ�� ��ȭ��ȣ �������� ���߱�
 */
function CheckTelID(id)
{
	if (id.value == "") return "";

	var sRet = CheckTel(id.value) ;
	if (sRet == "")
	{
		alert("��ȭ��ȣ ������ �����ʽ��ϴ�.");
		id.select();
	}
	else
	{
		id.value = sRet;
	}
}
function CheckTel(sVal)
{
	var sTel1,sTel2,sTel3;
	var sTemp;
	var nCnt;

	var sValue = SelectNum(sVal);
	if (sValue == "") return "";

	if (sValue.length == 4) return ""

	if (sValue.length < 7 || sValue.length > 11) return ""

	sTel3 = sValue.substring(sValue.length-4,sValue.length)
	sTemp = sValue.substring(0, sValue.length-4);

	if (sTemp.substring(0,1) != "0")
	{
		if (sValue.length > 8 ) return "";
		return ("02-" + sTemp + "-" + sTel3);
	}

	switch (sTemp.substring(0,2))
	{
		case "02":  //����
			nCnt=2;
			break;
		case "01":  //�ڵ���or pcs
			nCnt=3;
			break;
		default:
			switch (sTemp.substring(0,3))
			{
				case "031":
				case "032":
				case "033":
				case "041":
				case "042":
				case "043":
				case "051":
				case "052":
				case "053":
				case "054":
				case "055":
				case "061":
				case "062":
				case "063":
				case "064":
					nCnt=3;
					break;
				default:
					return "";
			}

	}

	sTel1 = sTemp.substring(0,nCnt);
	sTel2 = sTemp.substring(nCnt, sTemp.length);

	return (sTel1 + "-" + sTel2 + "-" + sTel3);
}
/**
 * HOST ���۽� �ʿ�(�ݰ����� -> ���� (myHalf2Full(HalfVal) ȣ��)
 */
function Half2Full(HalfVal)
{
        var arg;
        arg = myHalf2Full(HalfVal);
	return arg;
}
/**
 * HOST ���۽� �ʿ�(�ݰ����� -> ����)
 */
function myHalf2Full(HalfVal)
{
	var stFinal = "";
        var ascii;
        for( i = 0; i < HalfVal.length; i++)
        {
                ascii = HalfVal.charCodeAt(i);
                if( (31 < ascii && ascii < 128))
                {
                  stFinal += FullChar[ascii-32];
                }
                else
                {
                  stFinal += HalfVal.charAt(i);
                }
        }
        return stFinal;
}

/************************************************************************************************/
/*										Date ���� �޼ҵ�											*/
/************************************************************************************************/

/**
 * date�� sep format date�� ��ȯ
 */
function toKoDate(date) {
	var now = new Date(date);

	var year = now.getYear();
	if(year < 1900) year += 1900;

	var month = now.getMonth() + 1;
	if(month < 10) month = "0" + month;

	var day = now.getDate();
	if(day < 10) day = "0" + day;

	var hour = now.getHours();
	if(hour < 10) hour = "0" + hour;

	var min = now.getMinutes();
	if(min < 10) min = "0" + min;

	var cur = year + "�� " + month + "�� " + day + "�� " + hour + "�� " + min + "��";
	return (cur);
}
function toDate(date, sep) {
	if(isNull(date)) return date;

	var len = date.lastIndexOf("KST");
	if(len != -1) {
		date = date.substring(0, len) + "+0900";
	}

	var now = new Date(date);

	var year = now.getYear();

	if(isNaN(year)) return date;

	if(year < 1900) year += 1900;

	var month = now.getMonth() + 1;
	if(month < 10) month = "0" + month;

	var day = now.getDate();
	if(day < 10) day = "0" + day;

	var hour = now.getHours();
	if(hour < 10) hour = "0" + hour;

	var min = now.getMinutes();
	if(min < 10) min = "0" + min;

	var cur = year + sep + month + sep + day + " " + hour + ":" + min;
	return (cur);
}
function toShortDate(date, sep) {
	if(isNull(date)) return date;

	var len = date.lastIndexOf("KST");
	if(len != -1) {
		date = date.substring(0, len) + "+0900";
	}

	var now = new Date(date);

	var month = now.getMonth() + 1;
	if(month < 10) month = "0" + month;

	var day = now.getDate();
	if(day < 10) day = "0" + day;

	var hour = now.getHours();
	if(hour < 10) hour = "0" + hour;

	var min = now.getMinutes();
	if(min < 10) min = "0" + min;

	var cur = month + sep + day + " " + hour + ":" + min;
	return (cur);
}
/**
 * �������ڸ� ��� �޼ҵ�
 */
function makeRandomNumber() {
	var date = new Date();
	var mon = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();

	return ("" + mon + day + hour + min);
}
/**
 * �������ڸ� ��� �޼ҵ�
 */
function getCurDate() {
	var date = new Date();
	var mon = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();

	if(day < 10) day = "0" + day;
	if(hour < 10) hour = "0" + hour;
	if(min < 10) min = "0" + min;

	return (mon + "�� " + day + "�� " + hour + "�� " + min + "��");
}
function getCurrentDate(sep) {
	var now = new Date();
	var year = now.getYear();
	if(year < 1900) year += 1900;
	var month = now.getMonth() + 1;
	if(month < 10) month = "0" + month;
	var day = now.getDate();
	if(day < 10) day = "0" + day;

	var cur = year + sep + month + sep + day;
	return (cur);
}
function getCurrentHour(sep) {
	var now = new Date();
	var hour = now.getHours();
	if(hour < 10) hour = "0" + hour;
	var min = now.getMinutes();
	if(min < 10) min = "0" + min;
	var sec = now.getSeconds();
	if(sec < 10) sec = "0" + sec;

	var cur = "";
	if(sep == "ko") {
		cur = hour + "�� " + min + "�� " + sec + "��";
	} else {
		cur = hour + sep + min + sep + sec;
	}

	return (cur);
}
/**
 * Ư�� ��¥�Ⱓ(�ϼ�)�� �и��������� �ٲ۴�.
 */
function millsec(cnt) {
	var sec;
	sec = cnt*24*60*60*1000;
	return sec;
}
/**
 * Ư�� ��¥(��,��,��)�� �Ⱓ(�ϼ�)�� �Է¹޾� �Ⱓ�� ���� �ֳ��� üũ�Ѵ�.
 */
function checkday(year,month,date,cnt) {
	var now = new Date();
	var from = new Date(now.getYear(), now.getMonth(), now.getDate());
	var to = new Date(year, month-1, date);
	var fromcnt = from.getTime();
	var tocnt = to.getTime();
	var sec = millsec(cnt);

	if((tocnt-fromcnt) >= sec) {
		return true;
	} else {
		return false;
	}
}

/************************************************************************************************/
/*										��Ű ����													*/
/************************************************************************************************/

/**
 * Cookie�� �����Ѵ�.
 */
function SetCookie(name, value, expires, path, domain, secure) {
   	var	setstr = name + "="
       	       + escape(value)
           	   + ((expires) ? "; expires=" + expires.toGMTString() : "")
               + ((path) ? "; path=" + path : "")
               + ((domain) ? "; domain=" + domain : "")
               + ((secure) ? "; secure" : "");

    document.cookie = setstr;
}
/**
 * Cookie�� ���.
 */
function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while(i < clen) {
        var j = i + alen;
        if(document.cookie.substring(i, j) == arg) {
            var end = document.cookie.indexOf(";", j);
            if(end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(j, end));
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if(i == 0) break;
    }
    return null;
}
/**
 * Cookie�� ����.
 */
function DelCookie(name, path, domain, secure) {
	var setstr = name + "="
				+ ((path) ? "; path=" + path : "")
				+ ((domain) ? "; domain=" + domain : "")
				+ ((secure) ? "; secure" : "");

	document.cookie = setstr;
}

/************************************************************************************************/
/*											�迭 ����												*/
/************************************************************************************************/

/**
 * �迭�����
 */
function makeArray(n) {
	this.length = n;
	for(var i = 0; i < n; i++) {
		this[i] = 0;
	}
	return this;
}
/**
 * �迭�� �� ��Ҹ� �����Ѵ�.
 */
function removearr(arr, index) {
	if(arr == null || arr.length == 0) {
		return arr;
	}

	var arr1 = new Array(arr.length-1);
	var ri = 0;

	for(var i = 0; i < arr.length; i++) {
		if(i != index) {
			arr1[ri] = arr[i];
			ri++;
		}
	}
	return arr1;
}

/************************************************************************************************/
/*											��Ÿ													*/
/************************************************************************************************/

function writeln(str) {
	write(str + "\n");
}
/**
 * �ֹε�Ϲ�ȣ�� üũ�Ѵ�.
 */
function checkSsn(manno) {
	var no,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13;
	c1 = manno.substring(0,1);
	c2 = manno.substring(1,2);
	c3 = manno.substring(2,3);
	c4 = manno.substring(3,4);
	c5 = manno.substring(4,5);
	c6 = manno.substring(5,6);
	c7 = manno.substring(6,7);
	c8 = manno.substring(7,8);
	c9 = manno.substring(8,9);
	c10 = manno.substring(9,10);
	c11 = manno.substring(10,11);
	c12 = manno.substring(11,12);
	c13 = manno.substring(12,13);

	c1 = c1 * 2;
	c2 = c2 * 3;
	c3 = c3 * 4;
	c4 = c4 * 5;
	c5 = c5 * 6;
	c6 = c6 * 7;
	c7 = c7 * 8;
	c8 = c8 * 9;
	c9 = c9 * 2;
	c10 = c10 * 3;
	c11 = c11 * 4;
	c12 = c12 * 5;

	no = c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9 + c10 + c11 + c12;
	no = (no % 11);
	no = 11 - no;

	if (no > 9) {
		no = (no % 10);
	}

	if (no != c13 || (c7 > 2 && c7 < 1)) {
		return false;
	} else {
		return true;
	}
}
/**
 * �Է¹����� ���̸� �����Ѵ�. �ѱ� 2����Ʈ, ��,��,Ư������ 1����Ʈ
 * @param   input       üũ�� ������Ʈ
 * @return      integer     �Է°��� ����Ʈ ��
 */
function getByteLength(input) {
	var byteLength = 0;
	for (var inx = 0; inx < input.value.length; inx++) {
		var oneChar = escape(input.value.charAt(inx));
		if ( oneChar.length == 1 ) {
			byteLength ++;
		} else if (oneChar.indexOf("%u") != -1) {
			byteLength += 2;
		} else if (oneChar.indexOf("%") != -1) {
			byteLength += oneChar.length/3;
		}
	}
	return byteLength;
}
/**
 * �Է¶� Disable ��Ű��
 */
function Disabled(as_Type)
{
	if (!as_Type) as_Type="frmMain";
	var coll = document.all(as_Type);
	if (coll!=null) {
		for (i=0; i<coll.length; i++)
		{
			if (coll.item(i).type == "select-one")
			{
				coll.item(i).className = "CReadOnly";
				coll.item(i).disabled = true ;
			}
			else if((coll.item(i).type == "text") || (coll.item(i).type == "textarea"))
			{
				coll.item(i).className = "CReadOnly";
				coll.item(i).disabled = true ;
			}
		}
	}
}

/**
 * �޼��� �ڽ� ���� �Լ� -> ������� �ʴ´�!!

function TWBMsgBox(sa_Key, sa_Msg, sa_Code, sa_Prog, sa_Loc) {

//	var s_Msg = split(sMsg,"|");
//	if (s_Msg.length == 1)	//��Ʈ��Ʈ���� �߻��ϴ� ��� ��Ʈ
//		alert("C|"+s_Msg+"|"+"|"+"|"+"|");
//	else
//		alert(s_Msg[0]+"|"+s_Msg[1]+"|"+s_Msg[2]+"|"+s_Msg[3]+"|"+s_Msg[4]+"|"+s_Msg[5]);

	if (!sa_Key)  sa_Key = "I";
	if (!sa_Msg)  sa_Msg = "";
	if (!sa_Code)  sa_Code = "";
	if (!sa_Prog)  sa_Prog = "";
	if (!sa_Loc)  sa_Loc = "";
	if (sa_Key=="C")
	{
		return confirm (getHTMLEncoding(sa_Msg));
	}
	else
	{
		alert(sa_Key+"|"+getHTMLEncoding(sa_Msg)+"|"+sa_Code+"|"+sa_Prog+"|"+sa_Loc+"|");
//		alert(sa_Key+"|"+sa_Msg+"|"+sa_Code+"|"+sa_Prog+"|"+sa_Loc);
	}
}
*/

//����� ��ȸ�� �˾�â ī���� -> ������� �ʴ´�!!
function show_calendar(p_form_nm, p_text_nm, p_x, p_y) {
	var width = 220;
	var height = 250;
	var left = p_x - 95;
	var top = p_y;
	var url = '/com/calendar.jsp?p_form_nm=' + p_form_nm + '&p_text_nm=' + p_text_nm;
	var features	= 'dialogWidth:' + width + 'px;'
					+ 'dialogHeight:' + height + 'px;'
					+ 'dialogLeft:' + left + 'px;'
					+ 'dialogTop:' + top + 'px;'
					+ 'edge:Sunken; resizable:No; status:No; scroll:No; center:Yes;';
	/*var myObject = new Object();
	myObject.fstParam = self;*/
	returnValue = window.showModalDialog(url, window, features);
}


var x = 0;
var y = 0;


//â�� ��ġ�� �̺�Ʈ�� ����
if (document.layers) { document.captureEvents(Event.MOUSEDOWN) }
document.onmousedown = FindXY;


function FindXY(loc) {
	x = (document.layers) ? loc.screenX : event.screenX;
    	y = (document.layers) ? loc.screenY : event.screenY;
}

function openOneCalendar(url, form, text) {
	var tmp = (y > screen.height/2) ? (y - 310) : (y + 15);

	window.open(url+'?type=3&isCompare=0&form='+form+'&text='+text,'calendar', 'width=310, height=270,left='+(x-155) + ', top='+ tmp);
}

// JDBC TYPE Ȯ��(������, ������)
function checkDBStrType(jdbc_type) {
	var yn = true;

	switch(jdbc_type) {
		case 1:		//java.sql.Type.CHAR
			yn = true;
			break;
		case 2:		//java.sql.Type.NUMERIC
			yn = false;
			break;
		case 12:	//java.sql.Type.VARCHAR
			yn = true;
			break;
		case 91:	//java.sql.Type.DATE
			yn = true;
			break;
		default:
			yn = true;
	}
	return yn;
}

//Report Script
var currentPage = 0;
var endPage = 0;
var nZoom = 100;
function reportInit(page) {
	this.currentPage = 0;
	this.endPage = page;
	this.nZoom = 100;
}
function reportScript(obj, cmd, saveNm) {
	if(obj) {
		if(cmd == "print") {
			obj.bStretch=0;
			obj.DirectPrint(1);
		} else if(cmd == "save") {
			// ���ҢҢ��� Parameter ��?��
			// "-" = Cell ��?�� f��a��??(line ��?color �죙
			// "w0" = ���ס������� 0 (����v��?ze?)
			// "w1" = ���ס������� 1 (�ơ�: L����G ?OL V; ��? Overwrite ���Ϩ��袬 ���ƨ�?)
			// "w2" = ���ס������� 2 (�ơ�: L����G ?OL V; ��? File Dialog ��| ???)
			// "w3" = ���ס������� 3 (����v��?File Dialog ��| ???)
			obj.SaveExcelExt("", saveNm + ".xls", 1, "", "w3");
		} else if(cmd == "vprev") {
			if (currentPage > 0) {
				currentPage = currentPage - 1;
				obj.ShowPreviewPage(currentPage);
			}
		} else if(cmd == "vnext") {
			if (endPage > 0 && currentPage < endPage) {
				currentPage = currentPage + 1;
				obj.ShowPreviewPage(currentPage);
			}
		} else if(cmd == "zoomin") {
			if (nZoom < 500) {
				nZoom = nZoom + 25;
				obj.InitialPreviewPageEx(nZoom,nZoom);
				obj.ShowPreviewPage(currentPage);
			}
		} else if(cmd == "zoomout") {
			if (nZoom > 25) {
				nZoom = nZoom - 25;
				obj.InitialPreviewPageEx(nZoom,nZoom);
				obj.ShowPreviewPage(currentPage);
			}
		}
	}
}

var DataHeader ="<?xml version=\"1.0\"?>";
DataHeader +="<xmldata xmlns=\"\">";
DataHeader +="<version>1</version>";
DataHeader +="<output>";
DataHeader +="	<rows>";

var DataFooter ="	</rows>";
DataFooter +="</output>";
DataFooter +="</xmldata>";



/**************************************************************************************
* �߰� : do_open_popup
**************************************************************************************/

	// �˾�ȣ��	
	function do_open_popup(pName, pUrl, pLeft, pTop, pWidth, pHeight, pToolbar, pMenubar, pStatusbar, pScrollbar, pResizable) {
		try {
			
			var toolbar_str   = typeof(pToolbar)=='undefined' ? 'yes' : pToolbar;
			var menubar_str   = typeof(pMenubar)=='undefined' ? 'yes' : pMenubar;
			var statusbar_str = typeof(pStatusbar)=='undefined' ? 'yes' : pStatusbar;
			var scrollbar_str = typeof(pScrollbar)=='undefined' ? 'yes' : pScrollbar;
			var resizable_str = typeof(pResizable)=='undefined' ? 'yes' : pResizable;
			var width_value  = pWidth    ? pWidth  : screen.width / 3 * 2;
			var height_value  = pHeight   ? pHeight : screen.height / 2;
			var top_value	 = pTop > 0  ? pTop    : (screen.height - height_value) / 2;
			var left_value   = pLeft > 0 ? pLeft   : (screen.width - width_value) / 2;
			
			var winOpt = "left="+left_value;
			winOpt += ",top="+top_value;
			winOpt += ",width="+width_value;
			winOpt += ",height="+height_value;
			winOpt += ",toolbar="+toolbar_str;
			winOpt += ",menubar="+menubar_str;
			winOpt += ",status="+statusbar_str;
			winOpt += ",scrollbars="+scrollbar_str;
			winOpt += ",resizable="+resizable_str;
	
			var win=window.open(pUrl, pName, winOpt);
			win.focus(); 
			return win;
		} catch(e) {
			window.open(pUrl, pName, 'width='+width_value+',height='+height_vaue);
		}
	}
	

/**
 * ?????? ??????
 * - body ?? ?? table ?? width ?? ???????? ???????? ???????? ????????.
 * 2006.04.14 -> ?????? ???? - xp?? ???? OS?? ???????? ?????? ????????.
 */
function popup_init(dbg,leftmargin,topmargin) {
	try {
		if(typeof(leftmargin) =="undefined"){
			leftmargin=0
		}
		if(typeof(topmargin) =="undefined"){
			topmargin=0
		}
		leftmargin=leftmargin*2	
		var g_fIsSP2 = false;
		g_fIsSP2 = (window.navigator.userAgent.indexOf("SV1") != -1);
		if (g_fIsSP2) { 
			// XP SP2 ??????????..
			sz = 55;
		} else {
			//XP SP2 ?????????? ????.
			sz = 27;
		}
		var el = getObject("popup");
		if( el ){
			self.resizeTo(el.offsetWidth+10+leftmargin, el.offsetHeight+sz+topmargin);
			if(typeof(dbg)!="undefined" && dbg)
				alert((el.offsetWidth+10+leftmargin)+","+(el.offsetHeight+sz+topmargin));
		} else {
			el = document.getElementsByTagName("TABLE")[0];
			self.resizeTo(el.offsetWidth+10+leftmargin, el.offsetHeight+sz+topmargin);
		}
	} catch(e) {
		alert(e.message);
	}
}	


function getObject(objectId) { 
	// checkW3C DOM, then MSIE 4, then NN 4. 
	if(document.getElementById && document.getElementById(objectId)) { 
		return document.getElementById(objectId); 
	} else if (document.all && document.all(objectId)) { 
		return document.all(objectId); 
	} else if (document.layers && document.layers[objectId]) { 
		return document.layers[objectId]; 
	} else { 
		return false; 
	} 
}