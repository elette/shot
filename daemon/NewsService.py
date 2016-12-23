# -*- encoding: utf-8 -*-
import cherrypy
from cherrypy import expose, tools
from cherrypy.lib.static import serve_file
import os, sys, requests, urllib
from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET

reload(sys)
sys.setdefaultencoding('utf-8')

# reload(sys)  # Reload does the trick!
# sys.setdefaultencoding('utf-8')

xmlFile = sys.argv[1]
_sites = {}
env = Environment(loader=FileSystemLoader('template'))

class NewsList(object):
	# _sites = {}
	def __init__(self, par):
		headers = {'Accept-Encoding': 'none'}
		global _sites
		viewlist = []
		request = requests.get(par[1], headers=headers)
		soup = BeautifulSoup(request.text)

		for link in soup.select(par[2]) :
			title = link.text.replace('\n', '')
			url = link.get('href')
			title = urllib.quote(title.encode('utf-8')).replace('\+','%20')
			url = urllib.quote_plus(url.encode('utf-8'))
			if url.find(par[3])>0 :
				viewlist.append({"title":title, "url":url})

		_sites[par[0]] = viewlist


class Init(object):
	doc = ET.parse(xmlFile)
	root = doc.getroot()
	for news in root.iter("item"):
		# print (NewsList([news.findtext("name"), news.findtext("page"), news.findtext("anchor"), news.findtext("filter"), news.findtext("title"), news.findtext("content")]).getNewsList(news.findtext("name")))

		NewsList([news.findtext("name"), news.findtext("page"), news.findtext("anchor"), news.findtext("filter"), news.findtext("title"), news.findtext("content")])

	@expose
	def list(self, site):
		cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
		cherrypy.response.headers['Content-Type'] = 'text/xml'
		# cherrypy.response.headers['Access-Control-Allow-Origin'] = 'http:\/\/localhost:8080'
		# cherrypy.response.headers['Access-Control-Allow-Credentials'] = 'true'
		# cherrypy.response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
		# # cherrypy.response.headers['Access-Control-Allow-Headers'] = '*'
		# cherrypy.response.headers['Access-Control-Allow-Headers'] = 'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization'

		# return _sites.get(site)	
		templateVars = { "items" : _sites.get(site)	}
		tmpl = env.get_template('newslist.xml')
		return tmpl.render(templateVars)


# print (_sites['Daum agora'])

cherrypy.config.update({'server.socket_host': '127.0.0.1',
                        'server.socket_port': 9090,
						                         })
cherrypy.quickstart(Init(), "/")








# env = Environment(loader=FileSystemLoader('static'))

# person_mentions = {}
# with open("./word_count.txt") as f:
# 	for line in f:
# 		(key, val) = line.split("|")
# 		person_mentions[key] = int(val)

# keys = person_mentions.keys()
# vals = person_mentions.values()

# class ReferCount:

# 	@expose
# 	def index(self):
# 		if person_mentions.values() == 0:
# 			return "No Mention Data"
# 		else:
# 			retval = ""
# 			for key in keys:
# 				retval += (key+", "+str(person_mentions[key])+"<br>")
# 			return  retval

# 	@expose
# 	def who(self, name):
# 		retdic = {}
# 		total_cnt = 0
# 		for key in keys:
# 			try:
# 				if name in key:
# 					retdic[key] =  person_mentions[key]
# 					print retdic[key]
# 					#retdic.append({key: person_mentions[key]})
# 			except UnicodeDecodeError as e:
# 				print "예외발생: 문자열: "+key

# 		total_cnt = reduce(lambda x, y : x + y, retdic.values())

# 		retdic.update({"TOTAL_CNT": total_cnt})

# 		templateVars = {"name" : name,
# 						"items" : retdic
# 						}

# 		tmpl = env.get_template('who.html')
# 		return tmpl.render(templateVars)

# 	@expose
# 	def compare(self, namelist):
# 		retdic = {}
# 		total_cnt = 0
# 		whos = namelist.split(",")

# 		for who in whos:
# 			retdic.update({who:0})

# 		for key in keys:
# 			try:
# 				for who in whos:
# 					if who in key:
# 						retdic.update({who:(retdic[who]+person_mentions[key])})
# 			except UnicodeDecodeError as e:
# 				print "예외발생: 문자열: "+key


# 		templateVars = { "items" : retdic,
# 						"values" : retdic.values(),
# 						}

# 		tmpl = env.get_template('compare.html')
# 		return tmpl.render(templateVars)

# cherrypy.quickstart(ReferCount(), "/", 'server.conf')
