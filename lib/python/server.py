#!/usr/bin/env python

import tornado.ioloop
import tornado.web
import tornado.httpserver
from pymongo import MongoClient
import time
import logging
import download_file_http_handler
from utils import set_process_title
from utils import initialise_logging

LOG_FILE = 'logs/highlighter.log'

if __name__ == '__main__':
    
    set_process_title("[highlighter]")
    initialise_logging(LOG_FILE)
    logger = logging.getLogger('server')

    logger.info('Starting server')
    delay = 3
    while True:
        logger.info('Opening database connection...')
        try:
            database = MongoClient('localhost', 27017)['highlighter']
            logger.info('Connected to database')
            break
        except:
            logger.info('Failed to open connection with database')
            delay = min(5, delay + 1)
            time.sleep(delay)
    
    http_application = tornado.web.Application(
        handlers=[(r'/api/(.*)/file/download/(.*)',
                   download_file_http_handler.DownloadFileHandler,
                   {'main_database': database})])

    http_server = tornado.httpserver.HTTPServer(http_application)
    http_server.listen(8000)

    logger.info('Starting IO loop...')
    ioloop = tornado.ioloop.IOLoop.instance()
    ioloop.start()
