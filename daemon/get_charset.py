import re
import urllib2

def  get_charset(url):
    resp = urllib2.urlopen(url)
    #retrieve charset from header
    headers = ''.join(resp.headers.headers)
    charset_from_header_list = re.findall('charset=(.*)', headers)
    charset_from_header = charset_from_header_list[-1] if charset_from_header_list else ''

    #retrieve charset from html
    html = resp.read()
    charset_from_html_list = re.findall('Content-Type.*charset=["\']?(.*)["\']', html)
    charset_from_html = charset_from_html_list[-1]  if charset_from_html_list else ''

    return charset_from_html if charset_from_html else charset_from_header


print get_charset('http://www.mediatoday.co.kr/?mod=news&act=articleList&sc_code=&sc_area=A&sc_level=T&view_type=T')