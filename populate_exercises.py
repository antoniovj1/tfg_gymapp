# -*- coding: utf-8 -*-
# TODO: Añadir datos con sentido
 
from pymongo import MongoClient
 
connection = MongoClient("mongodb://localhost:27017")
db = connection.iv.movements
 

db.insert({ "name":"Dominadas",
  "material": "Barra",
  "muscles":[{"name":"bicep","percentage":20},
             {"name":"pectoral","percentage":10},
             {"name":"dorsal","percentage":60},
             {"name":"abdominales","percentage":10}
             ]
                })

db.insert({ "name":"Press Banca",
  "material": "Barra",
  "muscles":[{"name":"tricep","percentage":20},
             {"name":"pectoral","percentage":60},
             {"name":"hombro","percentage":10},
             {"name":"abdominales","percentage":10}
             ]
                })
db.insert({ "name":"Sentadillas",
  "material": "Barra",
  "muscles":[{"name":"cuadricep","percentage":50},
             {"name":"glueteo","percentage":20},
             {"name":"femoral","percentage":20},
             {"name":"abdominales","percentage":10}
             ]
                })
db.insert({ "name":"Curl Femoral",
  "material": "Barra",
  "muscles":[{"name":"femoral","percentage":80},
             {"name":"glutep","percentage":20}
             ]
                })
db.insert({ "name":"Remo Polea Baja",
  "material": "Barra",
  "muscles":[{"name":"bicep","percentage":20},
             {"name":"pectoral","percentage":10},
             {"name":"dorsal","percentage":50},
             {"name":"lumbar","percentage":20}
             ]
                })
db.insert({ "name":"Elevaciones de Gemelos",
  "material": "Barra",
  "muscles":[{"name":"gemelos","percentage":60},
             {"name":"soleo","percentage":40}
             ]
                })                                                                                


print('+-+-+-+-+-+-+-+-+-+-+-+-+-+-')
print('Inserted ' + str(db.count()) + ' movements')
print('+-+-+-+-+-+-+-+-+-+-+-+-+-+-')
 
connection.close()