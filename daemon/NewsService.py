# -*- encoding: utf-8 -*-
import cherrypy
from cherrypy import expose, tools
from cherrypy.lib.static import serve_file
import os, sys, requests, urllib
from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
import multiprocessing
import time, datetime

reload(sys)
sys.setdefaultencoding('utf-8')

# reload(sys)  # Reload does the trick!
# sys.setdefaultencoding('utf-8')

xmlFile = sys.argv[1]
# _sites = {}
# _pages = {}
env = Environment(loader=FileSystemLoader('template'))

def NewsList(cluster, interval, lock, shared_sites, shared_pages, par):
	headers = {'Accept-Encoding': 'none'}
	sites = {}
	pages = {}
	while True:
		viewlist = []
		request = requests.get(par[1], headers=headers)
		soup = BeautifulSoup(request.text)
		# print (par)
		for link in soup.select(par[2]) :
			title = link.text.replace('\n', '')
			url = link.get('href')
			title = urllib.quote(title.encode('utf-8')).replace('\+','%20')
			url = urllib.quote_plus(url.encode('utf-8'))
			if url.find(par[3])>0 :
				viewlist.append({"title":title, "url":url})

		sites[par[0]] = viewlist
		# print (par[0])
		# print (_sites.values())
		with lock:
			# shared_sites[par[0]] = viewlist
			shared_sites.update(sites)

		for page in viewlist:
			request = requests.get(urllib.unquote(page['url']))
			soup = BeautifulSoup(request.text)
			contents = ''
			# print (par[0] + ', ' + par[4])
			try:
				title = soup.select(par[4])[0].text + '<br>'
			except IndexError :
				title = ''
			for content in soup.select(par[5]) :
				contents += content.text + '<br>'

			pages[page['url']] = title.encode('utf-8') + contents.encode('utf-8') 

		with lock:
			shared_pages.update(pages)

		log (shared_sites.keys() )
		time.sleep(interval)

def log(message):
	ts = time.time()
	sts = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
	print ("[%s] : %s"% (sts, message))


class Init(object):
	def __init__(self):
		# self._sites = {}
		# self._pages = {}

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
			arg_list = ("news", 60.0, self.news_lock, self.shared_sites, self.shared_pages, par)
			self.news_process.append(multiprocessing.Process(target=NewsList, args=arg_list))
			self.news_process[i].daemon = True
			self.news_process[i].start()
			i = i + 1

	# doc = ET.parse(xmlFile)
	# root = doc.getroot()
	# for news in root.iter("item"):
	# 	# print (NewsList([news.findtext("name"), news.findtext("page"), news.findtext("anchor"), news.findtext("filter"), news.findtext("title"), news.findtext("content")]).getNewsList(news.findtext("name")))

	# 	print (news.findtext("name") + '\n' + news.findtext("page") + '\n' + news.findtext("anchor") + '\n' + news.findtext("filter") + '\n' + news.findtext("title") + '\n' + news.findtext("content"))

	# 	NewsList([news.findtext("name"), news.findtext("page"), news.findtext("anchor"), news.findtext("filter"), news.findtext("title"), news.findtext("content")])

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
		return tmpl.render(content=self.shared_pages.get(urllib.quote_plus(page.encode('utf-8'))))


if __name__ == '__main__':
	cherrypy.config.update({'server.socket_host': '127.0.0.1',
	                        'server.socket_port': 9090,
							                         })
	cherrypy.quickstart(Init(), "/")

