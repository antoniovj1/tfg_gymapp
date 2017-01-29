from fabric.api import *
import os
import time

def info_servidor():
    run ('cat /proc/cpuinfo')

def installApp():
    run ('rm -rf infraestructura_virtual_ugr')
    run ('git clone https://github.com/antoniovj1/infraestructura_virtual_ugr.git')
    run ('cd infraestructura_virtual_ugr && npm install')

def startApp():
    run ('sudo service nginx start')
    run ('sudo service mongod start')
    run ('sleep 7 && cd infraestructura_virtual_ugr && sudo pm2 start server.js')

def restartApp():
    run ('sudo service nginx restart')
    run ('cd infraestructura_virtual_ugr && sudo pm2 restart server')

def logsApp():
    run ('cd infraestructura_virtual_ugr && sudo pm2 logs server')
    
def stopApp():
    run ('cd infraestructura_virtual_ugr && sudo pm2 stop server')
    run ('sudo service mongod stop')
    run ('sudo service nginx stop')

def killApp():
    run ('cd infraestructura_virtual_ugr && sudo pm2 delete server')
    run ('sudo service mongod stop')
    run ('sudo service nginx stop')

def updateApp():
    installApp()

def testApp():
    run('sudo service mongod start')
    run('cd infraestructura_virtual_ugr && sudo node server.js')

    