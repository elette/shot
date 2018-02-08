# -*- encoding: utf-8 -*-
import requests, urllib2
from newspaper import Article

url = 'http://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=100&oid=023&aid=0003350999'
article = Article(url)
article.download()
article.parse()
print(article.title)
print(article.text)
