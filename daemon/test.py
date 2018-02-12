from pyparsing import *
import cherrypy
from cherrypy import expose, tools
from jinja2 import Environment, FileSystemLoader
import multiprocessing

input = open("db2diag.log", 'r')
data = input.read()
env = Environment(loader=FileSystemLoader('template'))

def LogParse(shared_level, shared_logs):
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
    cond = ZeroOrMore(condition + restOfLine).setResultsName("condition")

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
                "FUNCTION":tokens.function,
                "CONDITIONS":tokens.condition
             }
        # logitems.setdefault(tokens.timestamp,[]).append(item)
        logitems[str(tokens.timestamp)] = item

        levels.setdefault(tokens.level,[]).append(tokens.timestamp)

    print (len(logitems))

    shared_level.update(levels)
    shared_logs.update(logitems)

    for it in levels:
        print it + ": ", len(levels[it])

    print (len(shared_logs))
    print (shared_logs.get('2017-09-14-11.14.19.489345'))

shared_level = {}
shared_logs = {}
LogParse(shared_level, shared_logs)

