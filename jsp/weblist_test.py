#-*- coding: utf-8 -*-

import sys, requests
from bs4 import BeautifulSoup

reload(sys)
sys.setdefaultencoding('utf-8')

# pageArg = sys.argv[1]

webpage = 'http://news.naver.com'

selParam = 'ul > li > a'
viewlist = []
request = requests.get(webpage)
soup = BeautifulSoup(request.text)

for link in soup.select(selParam) :
    title = link.text
    url = link.get('href')
    # print (title)
    # print (url)
    if url.find("read.nhn")>0 :
        viewlist.append(title+'||'+url)

for strlist in viewlist :
    print (strlist)

