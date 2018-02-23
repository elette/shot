#-*- coding: utf-8 -*-

import urllib2, re, string
import sgmllib

# reload(sys)
# sys.setdefaultencoding('utf-8')
#enter_point ='http://' +  raw_input('enter url: ') # enter point
# enter_point ='http://' + 'www.daum.net'
enter_point ='http://agora.media.daum.net/debate'
# enter_point = 'http://agora.media.daum.net/best/best?groupId=1&bbsId=all'

# db_name = 'base.txt' # input data base name
# db_name = 'view.txt' 

def uniq(seq):
        set = {}
        map(set.__setitem__, seq, [])
        return set.keys()

def geturls(url):
        items = []
        request = urllib2.Request(url)
        request.add_header('User-Agent', 'iBot ;)')
        content = urllib2.urlopen(request).read()
        items = re.findall('href="http://.*?"', content)
        urls = []
        for item in items:
                item = item.replace('href=','')
                item = item.replace('"','')
                urls.append(item)
        return urls

allurls = uniq(geturls(enter_point))

# for url in allurls:
#         urls = geturls(url)
#         for u in urls: allurls.append(u)
#         allurls = uniq(allurls)
#         db.write(string.join(urls,'\n'))
#         print url+' ['+str(len(allurls))+']'

viewlist = []
for url in allurls:
    urls = geturls(url)
    for u in urls: 
            if u.find("agora") and u.find("debate")>0:
                    # print u
                    viewlist.append(u)
    # allurls = uniq(allurls)
    # db.write(string.join(urls,'\n'))
    # print url+' ['+str(len(allurls))+']'
    viewlist = uniq(viewlist)

for strlist in viewlist:
    print (strlist)

# import request

# from bs4 import BeautifulSoup




# def spider(max_pages):

# page = 1

# while page < max_pages:

# url = 'http://creativeworks.tistory.com/' + str(page)

# source_code = requests.get(url)

# plain_text = source_code.text

# soup = BeautifulSoup(plain_text, 'lxml')

# for link in soup.select('h2 > a'):

# href = "http://creativeworks.tistory.com" + link.get('href')

# title = link.string

# print(href)

# print(title)

# get_single_article(href)

# page += 1



# def get_single_article(item_url):

# source_code = requests.get(item_url)

# plain_text = source_code.text

# soup = BeautifulSoup(plain_text, 'lxml')



# for contents in soup.select('p > span'):

# print(contents.text)



# spider(2)
