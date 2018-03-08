#!/usr/bin/env python

import tornado.web
import tornado.httpserver
import logging
import datetime
import file_tools


class DownloadFileHandler(tornado.web.RequestHandler):

    def initialize(self, main_database):
        self.logger = logging.getLogger('DownloadFileHTTPHandler')
        self.database = main_database
        self.file_tools = file_tools.FileTools(self.database)

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods',
                        'POST, GET, OPTIONS, DELETE')  

    def get(self, cnonce, code):
        if code:
            codes_collection = self.database.Codes
            code_doc = codes_collection.find_one({'code_id': code}) 
            if code_doc:
                self.logger.info("Valid code: " + code)
                accesses_collection = self.database.Accesses
                access_doc = {'cnonce': cnonce, 'code': code, 
                              'time': datetime.datetime.utcnow()}
                accesses_collection.insert(access_doc)

                result = self.file_tools.get_file()
                if result:
                    self.set_header('Content-Type', 'application/octet-stream')
                    self.set_header('Content-Disposition',
                                    'attachment; filename=%s'
                                    % result['filename'])
                    self.finish(result['file_data'])
                else:
                    self.set_status(500)
                    self.finish()
            else:
                self.logger.warning("Unknown code: " + code)
                self.set_status(403)
                self.finish()
        else:
            self.logger.warning("Missing code")
            self.set_status(403)
            self.finish()

    def options(self, session, cnonce):
        self.set_status(204)
        self.finish()
        self.logger.info("Init OK")
