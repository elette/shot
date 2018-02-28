# -*- coding: utf-8 -*-
# import pysize
import cherrypy
from cherrypy import expose, tools
from cherrypy.lib.static import serve_file
import os, sys, requests, urllib
from sys import getsizeof
from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
import multiprocessing
import time, datetime
from newspaper import Article
import newspaper

reload(sys)
sys.setdefaultencoding('utf-8')

xmlFile = sys.argv[1]
env = Environment(loader=FileSystemLoader('template'))

searchfile = open("text.txt", 'r')

def get_size(obj, seen=None):
    """Recursively finds size of objects"""
    size = sys.getsizeof(obj)
    if seen is None:
        seen = set()
    obj_id = id(obj)
    if obj_id in seen:
        return 0
    # Important mark as seen *before* entering recursion to gracefully handle
    # self-referential objects
    seen.add(obj_id)
    if isinstance(obj, dict):
        size += sum([get_size(v, seen) for v in obj.values()])
        size += sum([get_size(k, seen) for k in obj.keys()])
    elif hasattr(obj, '__dict__'):
        size += get_size(obj.__dict__, seen)
    elif hasattr(obj, '__iter__') and not isinstance(obj, (str, bytes, bytearray)):
        size += sum([get_size(i, seen) for i in obj])
    return size

def NewsList(cluster, interval, lock, shared_sites, shared_pages, par):
	headers = {'Accept-Encoding': 'none'}
	sites = {}
	pages = {}
	while True:
		viewlist = []
		searchitem = searchfile.read()
		end = par[1].find('/', 8) if par[1].find('/', 8) > -1 else len(par[1])
		baseurl = par[1][:end]
		reqUrl = par[1] + 'q=' + searchitem.decode('utf-8') + '&oq=' + searchitem.decode('utf-8') + '&sourceid=chrome&ie=UTF-8' if par[0] == 'Search' else par[1]
		# log( par[0] + ' - ' + reqUrl)
		response = requests.get(reqUrl, headers=headers)
		soup = BeautifulSoup(response.text, 'html.parser')

		# articlelist = newspaper.build(par[1])
		# for article in articlelist.articles:
		# 	print(article.title.encode('cp949'))
		# 	print(article.title, article.url, '\n')

		# print '='*50

		for link in soup.select(par[2]) :
			title = link.text.encode('utf-8')
			# print (par[0] + ' - TITLE >' + title)
			url = link.get('href')
			url = (baseurl + url) if url.find('http') < 0 else url
			title = urllib.quote(title).replace('\+','%20').replace('%2C',',').replace('%3A',':').replace('%3F','?').replace('%3D','=').replace('%26','&').replace('%24','$').replace('%2B','+')
			# title = urllib.quote(title)
			if url.find(par[3])>0 :
				url = url.split("?q=")[1].split("&sa=U")[0] if par[0] == 'Search' else url
				url = urllib.quote_plus(url.encode('utf-8'))
				viewlist.append({"title":title, "url":url})
		sites[par[0]] = viewlist
		# print (par[0])
		# print (sites.values())
		with lock:
			shared_sites.update(sites)
		sites.clear()

		for page in viewlist:
			# response = requests.get(urllib.unquote(page['url']))
			# soup = BeautifulSoup(response.text)
			contents = ""
# print (par[0] + ', ' + par[4] + ', ' + page['url'])
# print ('----' + soup.select(par[4])[0].text)
			# try:
			# 	# print ('----' + soup.select(par[4])[0].text)
			# 	ctitle = soup.select(par[4])[0].text + '<br>'
			# except:
			# 	ctitle = '<br>'

			# for content in soup.select(par[5]) :
			# 	contents += content.text.encode('utf-8').join('<br>')
# print ('>>>>' + par[1] + '<<<<' + '>>>>' + par[2] + '<<<<' + par[4])
# print (ctitle)
# print (par[0] + "--------------" + ctitle)

# pages[page['url']] = ctitle.encode('utf-8') + contents.encode('utf-8')

# contents = ''.join(soup.findAll(text=True))
# tree = lxml.html.fromstring(response.text)
# contents = tree.text_content().strip()
			
			article = Article(urllib.unquote(page['url']))
			article.download()
			article.parse()

			ctitle = article.title
			topimage = "<img class='article' src='" + article.top_image + "'><br>"
			contents = topimage + article.text.encode('utf-8')

			# pages[page['url']] = ctitle
			pages[page['url']] = ctitle.encode('utf-8') + contents
			# log (page['ctitle'] + '====' + page['url'])

		with lock:
			shared_pages.update(pages)

		log (par[0] + ' (' + str(len(pages)) + ') - ' + str(get_size(pages,set())) )
		pages.clear()
		time.sleep(interval)

def log(message):
	ts = time.time()
	sts = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
	print ("[%s] : %s"% (sts, message))


class Init(object):
	def __init__(self):

		self.news_lock = multiprocessing.Lock()
		self.manager = multiprocessing.Manager()
		self.shared_sites = self.manager.dict()
		self.shared_pages = self.manager.dict()

		self.news_process = []

		doc = ET.parse(xmlFile)
		root = doc.getroot()
		i = 0
		for news in root.iter("item"):
			par = [news.findtext("name"), news.findtext("page"), news.findtext("anchor"), news.findtext("filter"), news.findtext("title"), news.findtext("content")]
			arg_list = ("news", 600.0, self.news_lock, self.shared_sites, self.shared_pages, par)
			self.news_process.append(multiprocessing.Process(target=NewsList, name=news.findtext("name"), args=arg_list))
			self.news_process[i].daemon = True
			self.news_process[i].start()
			i = i + 1

	@expose
	def list(self, site):
		cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
		cherrypy.response.headers['Content-Type'] = 'text/xml'

		# return _sites.get(site)	
		templateVars = { "items" : self.shared_sites.get(site)	}
		tmpl = env.get_template('newslist.xml')
		return tmpl.render(templateVars)

	@expose
	def get(self, page):
		cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
		cherrypy.response.headers['Content-Type'] = 'text/html'
		tmpl = env.get_template('newspage.html')
		return tmpl.render(content=self.shared_pages.get(urllib.quote_plus(page)))


if __name__ == '__main__':
	cherrypy.config.update({
		'server.socket_host': '127.0.0.1',
      'server.socket_port': 9090,
      # 'global': {
      'engine.autoreload.on': False
        # }
		})
	cherrypy.quickstart(Init(), "/")
