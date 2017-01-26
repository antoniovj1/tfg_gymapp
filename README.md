[![Build Status](https://travis-ci.org/antoniovj1/infraestructura_virtual_ugr.svg?branch=master)](https://travis-ci.org/antoniovj1/infraestructura_virtual_ugr)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/antoniovj1/infraestructura_virtual_ugr)

# Proyecto Infraestructra Virtual

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
### Descripción de archivos de configuración de Heroku

#### package.json
En este archivo se indica la versión de node que queremos usar en el despliegue ( en el partado engines) y como se 
debe ejecutar el proyecto ( en el apartado scripts), en este caso el servidor se inicia haciendo uso de ` "start": "node server.js"`,
 y que debe ejecutar despues de la instalación `"postinstall": "webpack --config ./webpack.config.js --display-error-details --progress --colors"`

```
{
  "name": "proyecto",
  "version": "1.0.0",
  "description": "Proyecto infraestructura virtual",
  "main": "server.js",
  "engines": {
    "node": "7.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/antoniovj1/infraestructura_virtual_ugr/"
  },
  "scripts": {
    "test": "mocha --timeout 10000",
    "start": "node server.js",
    "postinstall": "webpack --config ./webpack.config.js --display-error-details --progress --colors"
  },
  ```
#### app.json
En este archivo se indica la configuración de el botón para el despliegue en Heroku. En el se indica el repositorio de GitHub y además se muestran
los add-ons necesarios para el despliegue.

```
{
  "name": "Infraestructura virtual UGR",
  "description": "Hito 3",
  "website": "https://github.com/heroku/node-articles-nlp",
  "repository": "https://github.com/antoniovj1/infraestructura_virtual_ugr",
  "logo": "https://node-js-sample.herokuapp.com/node.svg",
  "success_url": "/",
  "keywords": [
    "node",
    "express"
  ],
  "addons": [
    "mongolab"
  ]
}
```
> [Más información sobre el despliege / Despliegue en GitHub](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/Hito-3)

## Contenedores: Docker

El proyecto se compone de dos contenedores, uno para la base de datos
MongoDB y otro para el servidor Node.js (lo cual permite gran escalabilidad
a la aplicación). Ambos contenedores se enlazan con la opccion `--link`
y usando las variables de entrono que encontramos en el archivo `config.js`

[DockerHub - Proyecto](https://hub.docker.com/r/antoniovj1/infraestructura_virtual_ugr/)

#### 1. Local
```
sh docker_build.sh
```

#### 2. DockerHub
```
docker run -d --name mongoDB mongo
docker pull antoniovj1/infraestructura_virtual_ugr
docker run --link=mongoDB:mongodb -it antoniovj1/infraestructura_virtual_ugr
```

### 3. Dockerfile
En este archivo encontramos la configuración de docker

##### [Dockerfile](https://github.com/antoniovj1/infraestructura_virtual_ugr/blob/master/Dockerfile)

En el archivo se indica que se usa node oficial y que se instalan
los paquetes indicados en `package.json` haciendo uso de NPM
```
FROM node

ADD . /app

WORKDIR /app

RUN npm install
RUN npm install -g nodemon
RUN npm install -g webpack
RUN webpack

EXPOSE 8080

CMD ["nodemon", "server.js"] 
```
[Más información sobre Docker](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/Hito-4)
___
###### Universidad de Granada (UGR)
___
