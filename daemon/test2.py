# -*- coding: utf-8 -*-

import os, sys, requests, urllib
from bs4 import BeautifulSoup
from newspaper import Article
import newspaper

reload(sys)
sys.setdefaultencoding('utf-8')

articlelist = newspaper.build('http://media.daum.net/digital')
for article in articlelist.articles:
	print(article.url)

