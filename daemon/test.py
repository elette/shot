import cherrypy
import multiprocessing
import time

def PageWeb(cluster, sleep_interval, lock, shared_result):
    counter = 0
    while True:
        HTML = '''<!doctype html>
                 <html lang="en">
                    <head><meta charset="utf-8">
                     <title>Widget</title>
                     <link rel="stylesheet" href="css/font-awesome.min.css">
                 </head>
                <body style="background-color: #1F1F1F">'''+str(counter)+'''</body>
                </html>'''
        counter += 1
        with lock:
            shared_result[0] = HTML
        time.sleep(sleep_interval)

class HelloWorld(object):
    def __init__(self):
        self.re7_lock = multiprocessing.Lock()
        self.manager = multiprocessing.Manager()
        self.re7_result = self.manager.list()
        self.re7_result.append('')
        arg_list = ("re7", 5.0, self.re7_lock, self.re7_result)
        self.re7_process = multiprocessing.Process(target=PageWeb, args=arg_list)
        self.re7_process.daemon = True
        self.re7_process.start()

    @cherrypy.expose
    def re7(self):
        with self.re7_lock:
            return str(self.re7_result[0])

if __name__ == '__main__':
    cherrypy.config.update({'server.socket_host': '127.0.0.1',
                            'server.socket_port': 9090,
                                                     })
    cherrypy.quickstart(HelloWorld())