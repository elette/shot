#-*- coding: utf-8 -*-

import sys, requests
from bs4 import BeautifulSoup

reload(sys)
sys.setdefaultencoding('utf-8')

parPage = sys.argv[1]
parTitle = sys.argv[2]
parContent = sys.argv[3]

request = requests.get(parPage)
soup = BeautifulSoup(request.text)

title = soup.select(parTitle)[0].text
print (title + '<br>')
content = soup.select(parContent)[0].text
print (content)

