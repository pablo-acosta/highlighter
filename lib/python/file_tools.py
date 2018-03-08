#!/usr/bin/env python

import logging

PATH = 'files/'
FILE_NAME = "Highlighter.zip"


class FileTools(object):
    def __init__(self, database_connection):
        self.database_connection = database_connection
        self.logger = logging.getLogger('file')

    def get_file(self):
        file_path = PATH + FILE_NAME

        file_data = None
        with open(file_path, "rb") as file_in:
            file_data = file_in.read()

        self.logger.info("File read: " + FILE_NAME)
        return {'filename': FILE_NAME, 'file_data': file_data}
