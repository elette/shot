# -*- encoding: utf-8 -*-
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

reload(sys)
sys.setdefaultencoding('utf-8')

# reload(sys)  # Reload does the trick!
# sys.setdefaultencoding('utf-8')

xmlFile = sys.argv[1]
# xmlFile = 'C:\\apache-tomcat-8.5.9\\webapps\\shot\\news.xml'
# _sites = {}
# _pages = {}
env = Environment(loader=FileSystemLoader('template'))

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
		end = par[1].find('/', 8) if par[1].find('/', 8) > -1 else len(par[1])
		baseurl = par[1][:end]
		request = requests.get(par[1], headers=headers)
		soup = BeautifulSoup(request.text, 'html.parser')

		for link in soup.select(par[2]) :
			title = link.text.encode('utf-8')
			# print (par[0] + ' - TITLE >' + title)
			url = link.get('href')
			url = (baseurl + url) if url.find('http') < 0 else url
			# print (url) 
			title = urllib.quote(title).replace('\+','%20').replace('%2C',',').replace('%3A',':').replace('%3F','?').replace('%3D','=').replace('%26','&')
			# title = urllib.quote(title)
			url = urllib.quote_plus(url.encode('utf-8'))
			if url.find(par[3])>0 :
				viewlist.append({"title":title, "url":url})
		sites[par[0]] = viewlist
		# print (par[0])
		# print (sites.values())
		with lock:
			# shared_sites[par[0]] = viewlist
			shared_sites.update(sites)
		sites.clear()

		for page in viewlist:
			request = requests.get(urllib.unquote(page['url']))
			soup = BeautifulSoup(request.text)
			contents = ""
			# print (par[0] + ', ' + par[4] + ', ' + page['url'])
			# print ('----' + soup.select(par[4])[0].text)
			try:
				# print ('----' + soup.select(par[4])[0].text)
				ctitle = soup.select(par[4])[0].text + '<br>'
			except:
				ctitle = '<br>'
			for content in soup.select(par[5]) :
				contents += content.text.encode('utf-8').join('<br>')
			# print ('>>>>' + par[1] + '<<<<' + '>>>>' + par[2] + '<<<<' + par[4])
			# print (ctitle)
			# print (par[0] + "--------------" + ctitle)

			# pages[page['url']] = ctitle.encode('utf-8') + contents.encode('utf-8')
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
			arg_list = ("news", 600.0, self.news_lock, self.shared_sites, self.shared_pages, par)
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

