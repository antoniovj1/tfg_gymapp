# -*- coding: utf-8 -*-

from fabric.api import *
import os
import time


def info_servidor():
    """Muestra información del servidor"""
    run('cat /proc/cpuinfo')


def install_app():
    """Clona el repositorio e instala las dependencias"""
    with shell_env(NODE_ENV='production'):
        run('rm -rf infraestructura_virtual_ugr')
        run('git clone https://github.com/antoniovj1/infraestructura_virtual_ugr.git')
        run('cd infraestructura_virtual_ugr && npm install')


def start_app():
    """Inicia la aplicación (node,mongo y nginx)"""
    run('sudo service mongod start')
    run('sleep 7 && cd infraestructura_virtual_ugr && sudo pm2 start server.js')
    run('sudo service nginx restart')


def restart_app():
    """Reinicia la aplicación"""
    run('sudo service nginx restart')
    run('sudo pm2 restart server')


def logs_app():
    """Muestra los logs de la aplicación"""
    run('sudo pm2 logs server')


def stop_app():
    """Detiene la aplicación"""
    run('sudo pm2 stop server')
    # run ('sudo service mongod stop')
    # run ('sudo service nginx stop')


def kill_app():
    run('sudo pm2 delete server')
    # run ('sudo service mongod stop')
    # run ('sudo service nginx stop')


def update_app():
    """Actualiza la aplicación"""
    kill_app()
    install_app()
    start_app()


def monitoring_pm2():
    """Monitorización app"""
    run('sudo pm2 monit')


def list_pm2():
    """Lista de apps ejecutandose"""
    run('sudo pm2 list')


def drop_databas():
    """Borra la base de datos"""
    run('mongo iv --eval "db.dropDatabase()"')
