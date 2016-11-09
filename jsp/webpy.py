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
db_name = 'view.txt' # input data base name

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

class Stripper(sgmllib.SGMLParser):
    def __init__(self):
        self.data = []
        sgmllib.SGMLParser.__init__(self)
    def unknown_starttag(self, tag, attrib):
        self.data.append(" ")
    def unknown_endtag(self, tag):
        self.data.append(" ")
    def handle_data(self, data):
        self.data.append(data)
    def gettext(self):
        text = string.join(self.data, "")
        return string.join(string.split(text)) # normalize whitespace

def StripTag(text):
    s = Stripper()
    s.feed(text)
    s.close()
    return s.gettext() 

db = open(db_name,'w')
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


for url in viewlist:
        request = urllib2.Request(url)
        request.add_header('User-Agent', 'iBot ;)')
        # request.add_header('User-Agent', 'Mozilla/5.0')
        content = urllib2.urlopen(request).read()
        # print content
        # startword = '<div id="content_area" style="overflow:hidden">'
        startword = '<div class="tx-content-container">'
        endword = '</div>'
        startpoint = content.find(startword)
        # startpoint += len(startword)
        endpoint = content[startpoint:].find(endword)+len(endword)
        what_i_want = content[startpoint:startpoint+endpoint]

        # print url
        print (StripTag(what_i_want)+'\n\n')
        # print (what_i_want+'\n\n')
        # a= raw_input("")
        # print "next..."
        # db.write(StripTag(what_i_want)+'\n\n')

# db.write('\n\n')
db.close()
# print viewlist

