#!usr/bin/python
import ctypes
import logging

_libc = None


def set_process_title(title):
    global _libc
    if _libc is None:
        _libc = ctypes.cdll.LoadLibrary('libc.so.6')
        _libc.prctl(15, title, 0, 0, 0)


def initialise_logging(source=None):
    from logging.handlers import TimedRotatingFileHandler
    logger = logging.getLogger()
    logger.setLevel('INFO')
    handler = TimedRotatingFileHandler(source, when='midnight')
    formatter = logging.Formatter('%(asctime)s - %(name)s - \
                                   %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    handler.setLevel('INFO')
    logger.addHandler(handler)
