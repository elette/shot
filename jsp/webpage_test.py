#-*- coding: utf-8 -*-

import sys, requests
from bs4 import BeautifulSoup

reload(sys)
sys.setdefaultencoding('utf-8')

# webpage = sys.argv[1]
webpage = 'http://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=102&oid=001&aid=0008872599'

request = requests.get(webpage)
soup = BeautifulSoup(request.text)

title = soup.select('h3[id="articleTitle"]')[0].text
print (title)
content = soup.select('div[id="articleBodyContents"]')[0].text
print (content)

