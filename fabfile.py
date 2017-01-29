from fabric.api import *
import os
import time

def info_servidor():
    run ('cat /proc/cpuinfo')

def install_app():
    run ('rm -rf infraestructura_virtual_ugr')
    run ('git clone https://github.com/antoniovj1/infraestructura_virtual_ugr.git')
    run ('cd infraestructura_virtual_ugr && npm install')

def start_app():
    run ('sudo service nginx start')
    run ('sudo service mongod start')
    run ('sleep 7 && cd infraestructura_virtual_ugr && sudo pm2 start server.js')

def restart_app():
    run ('sudo service nginx restart')
    run ('cd infraestructura_virtual_ugr && sudo pm2 restart server')

def logs_app():
    run ('cd infraestructura_virtual_ugr && sudo pm2 logs server')
    
def stop_app():
    run ('cd infraestructura_virtual_ugr && sudo pm2 stop server')
    run ('sudo service mongod stop')
    run ('sudo service nginx stop')

def kill_app():
    run ('cd infraestructura_virtual_ugr && sudo pm2 delete server')
    run ('sudo service mongod stop')
    run ('sudo service nginx stop')

def update_app():
    installApp()

def test_app():
    run('sudo service mongod start')
    run('cd infraestructura_virtual_ugr && sudo node server.js')

    