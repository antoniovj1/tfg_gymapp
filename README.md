[![Build Status](https://travis-ci.org/antoniovj1/infraestructura_virtual_ugr.svg?branch=master)](https://travis-ci.org/antoniovj1/infraestructura_virtual_ugr)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/antoniovj1/infraestructura_virtual_ugr)

# Proyecto Infraestrucutra Virtual

[Descripción del proyecto](https://antoniovj1.github.io/infraestructura_virtual_ugr/)

[Documentación API RESTful](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/API)


## Requisitos
* npm
* node.js
* mongodb

## Ejecución
 ```
 1. npm install
 2. Ejecutar mongodb
 3. node server.js
 ```
 
 > [Más información sobre la ejecución](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/Hito-2)

 
## Despliegue
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/antoniovj1/infraestructura_virtual_ugr)

https://infraestructuravirtual.herokuapp.com/

>> Es necesario tener instalado Heroku Toolbelt

```
git clone https://github.com/antoniovj1/infraestructura_virtual_ugr.git 
cd infraestructura_virtual_ugr

heroku create 

heroku addons:add mongolab 

heroku config:set NODE_ENV=production

git push heroku master
heroku open
```

> [Más información sobre el despliege](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/Hito-3)



___
###### Universidad de Granada (UGR)
___
