#-*- coding: utf-8 -*-

import sys, requests
from bs4 import BeautifulSoup

reload(sys)
sys.setdefaultencoding('utf-8')

webpage = sys.argv[1]
# webpage = 'http://bbs1.agora.media.daum.net/gaia/do/debate/read?bbsId=D115&articleId=3790995&pageIndex=1'

request = requests.get(webpage)
soup = BeautifulSoup(request.text)

title = soup.select('p[class="title"]')[0].text
print (title)
content = soup.select('div[class="tx-content-container"]')[0].text
print (content)

