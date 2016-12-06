#-*- coding: utf-8 -*-

import sys, requests
from bs4 import BeautifulSoup

reload(sys)
sys.setdefaultencoding('utf-8')

pageArg = sys.argv[1]

webpage = 'http://agora.media.daum.net/debate' if pageArg=='1' else 'http://agora.media.daum.net/best/best?groupId=1&bbsId=all'

selParam = 'strong > a' if pageArg=='1' else 'td > a'
viewlist = []
request = requests.get(webpage)
soup = BeautifulSoup(request.text)

for link in soup.select(selParam) :
    title = link.text
    url = link.get('href')
    # print (title)
    # print (url)
    if pageArg=='1' and url.find("agora")>0 or pageArg!='1' and url.find("debate")>0 :
        viewlist.append(title+'||'+url)

for strlist in viewlist :
    print (strlist)

