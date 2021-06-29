# -*- encoding: utf-8 -*-
from pyparsing import *
import cherrypy
from cherrypy import expose, tools
from jinja2 import Environment, FileSystemLoader
import multiprocessing

diagfile = open("db2diag.log", 'r')
data = diagfile.read()
env = Environment(loader=FileSystemLoader('template'))

def LogParse(lock, shared_level, shared_logs):
    #------------------------------------------------------------------------
    # Define Grammars
    #------------------------------------------------------------------------

    integer = Word(nums)
    strnums = Word(alphanums)
    end = Literal("\n").suppress()
    NL = LineEnd()
    all = SkipTo(end)

    # date = Combine(integer + "-" + integer + "-" + integer)
    # time = Combine(integer + "." + integer + "." + integer)
    date = Word(nums, exact=4) + "-" + Word(nums, exact=2) + "-" + Word(nums, exact=2)
    time = Word(nums, exact=2) + "." + Word(nums, exact=2) + "." + Word(nums, exact=2)
    timestamp = Combine(date + "-" + time + "." + Word(nums, exact=6))
    tsetc = Combine("+" + Word(nums, exact=3))
    tsref = timestamp.setResultsName("timestamp")

    # level = Combine (Group(Literal("LEVEL: ") + all))
    levref = "LEVEL" + ZeroOrMore(White())+":" + strnums.setResultsName("level")
    pidref = "PID" + ZeroOrMore(White())+":" + integer.setResultsName("pid")
    tidref = "TID" + ZeroOrMore(White())+":" + integer.setResultsName("tid")
    procref = "PROC" + ZeroOrMore(White())+":" + Word(alphanums).setResultsName("proc") + Optional(White() + integer)

    verb1 = Combine ("INSTANCE"+ all)
    verb2 = Combine ("HOSTNAME"+ all)
    verb3 = Combine ("APPHDL"+ all)
    verb4 = Combine ("AUTHID"+ all)
    verb5 = Combine ("EDUID"+ all)
    verb = verb1 | verb2 | verb3 | verb4 | verb5
    verbline = ZeroOrMore(verb + restOfLine)

    line = OneOrMore(CharsNotIn('\n')) + Suppress(NL)
    emptyline = ~line
    paragraph = ZeroOrMore(line) + emptyline

    cond1 = Combine (Literal("MESSAGE")+ all)
    cond2 = Combine (Literal("DATA")+ all)
    cond3 = Combine (Literal("RETCODE")+ all)
    cond4 = Combine (Literal("CHANGE")+ all)
    # cond5 = Combine (White(max=0) + strnums + all)
    # cond6 = Combine (strnums + all)
    condition = cond1 | cond2 | cond3 | cond4
    cond = ZeroOrMore(condition).setResultsName("condition")

    # function = Combine (Literal("FUNCTION:") + all)
    funcref = "FUNCTION" + ZeroOrMore(White())+":" + Combine(strnums+all).setResultsName("function")

    logEntry = tsref + tsetc + Word(alphanums) + White(max=0) + levref + pidref + tidref + procref + verbline + funcref + cond + paragraph
    # + paragraph

    # logEntry = paragraph
    #------------------------------------------------------------------------
    # print logEntry

    logitems={}
    levels={}
    for tokens in logEntry.searchString(data):
        item={
                "LEVEL":tokens.level,
                "PID":tokens.pid,
                "TID":tokens.tid,
                "PROC":tokens.proc,
                "FUNCTION":tokens.function
                # ,
                # "CONDITIONS":tokens.condition
             }
        # logitems.setdefault(tokens.timestamp,[]).append(item)
        logitems[tokens.timestamp] = item
        # {"LEVEL":"W", "PID":"12345"}

        levels.setdefault(tokens.level,[]).append(tokens.timestamp)

    print (len(logitems))

    with lock:
        shared_level.update(levels)
        shared_logs.update(logitems)

    for it in levels:
        print (it + ": ", len(levels[it]))

    # print (len(shared_logs))

class Init(object):
    def __init__(self):
        self.log_lock = multiprocessing.Lock()
        self.manager = multiprocessing.Manager()

        self.shared_level = self.manager.dict()
        self.shared_logs = self.manager.dict()

        # self.parse_process = []

        arg_list = (self.log_lock, self.shared_level, self.shared_logs)
        # self.parse_process.append(multiprocessing.Process(name='LogParse', target=LogParse, args=arg_list))
        multiprocessing.Process(name='LogParse', target=LogParse, args=arg_list).start()
        # self.parse_process[0].daemon = True
        # self.parse_process[0].start()

    @expose
    def status(self):
        cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
        cherrypy.response.headers['Content-Type'] = 'text/xml'

        templateVars = { "items" : self.shared_level }
        tmpl = env.get_template('status.xml')
        return tmpl.render(templateVars)

    @expose
    def listitem(self, level):
        cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
        cherrypy.response.headers['Content-Type'] = 'text/xml'

        templateVars = { "items" : self.shared_level.get(level) }
        tmpl = env.get_template('listitem.xml')
        return tmpl.render(templateVars)

    @expose
    def getitem(self, item):
        cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
        cherrypy.response.headers['Content-Type'] = 'text/html'

        templateVars = { "items" : self.shared_logs.get(item) }
        # print (item, self.shared_logs.get(item))
        tmpl = env.get_template('getitem.html')
        return tmpl.render(templateVars)

if __name__ == '__main__':
    cherrypy.config.update({
        'server.socket_host': '127.0.0.1',
      'server.socket_port': 9092,
      # 'global': {
      'engine.autoreload.on': False
        # }
        })
    cherrypy.quickstart(Init(), "/daemon/log/")
