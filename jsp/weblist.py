#-*- coding: utf-8 -*-

import sys, requests
from bs4 import BeautifulSoup

reload(sys)
sys.setdefaultencoding('utf-8')

parPage = sys.argv[1]
parAnchor = sys.argv[2]
parFilter = sys.argv[3]

headers = {'Accept-Encoding': 'none'}
viewlist = []
request = requests.get(parPage, headers=headers)
soup = BeautifulSoup(request.text)

for link in soup.select(parAnchor) :
    title = link.text.replace('\n', '')
    url = link.get('href')
    # print (title)
    # print (url)
    if url.find(parFilter)>0 :
        viewlist.append(title+'||'+url)

for strlist in viewlist :
    print (strlist)

