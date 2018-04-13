# Proyecto Infraestructra Virtual

<p align="center">
<a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/antoniovj1/infraestructura_virtual_ugr.svg"></a>
<a href="https://travis-ci.org/antoniovj1/infraestructura_virtual_ugr"><img src="https://travis-ci.org/antoniovj1/infraestructura_virtual_ugr.svg?branch=master" alt="Build Status"></a>
<a href="https://david-dm.org/antoniovj1/infraestructura_virtual_ugr"><img src="https://david-dm.org/antoniovj1/infraestructura_virtual_ugr.svg" alt="Dependency Status"></a>
<a href="https://david-dm.org/antoniovj1/infraestructura_virtual_ugr/?type=dev"><img src="https://david-dm.org/antoniovj1/infraestructura_virtual_ugr/dev-status.svg" alt="devDependency Status"></a>
<a href="https://heroku.com/deploy?template=https://github.com/antoniovj1/infraestructura_virtual_ugr"><img src="https://www.herokucdn.com/deploy/button.png" alt="Heroku Deploy"></a>
</p>


[![google-cloud-platform](https://s20.postimg.org/z79sumogt/google_cloud_platform_5643dc63.png)](http://146.148.24.77/)

[Descripción del proyecto](https://antoniovj1.github.io/infraestructura_virtual_ugr/)

[Documentación API RESTful](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/API)


## Requisitos
* npm
* node.js
* mongodb

## Ejecución
 ```
 1. npm install o npm install --only=dev
 2. Ejecutar mongodb (Manjaro sudo mongod --config /etc/mongodb.conf)
 3. node server.js
 ```

### Util
 ```
 1. nodemon
 2. npm-check-updates

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
 y que debe ejecutar después de la instalación `"postinstall": "webpack --config ./webpack.config.js --display-error-details --progress --colors"`

```
{
  "name": "proyecto",
  "version": "1.0.0",
  "description": "Proyecto infraestructura virtual",
  "main": "server.js",
  "engines": {
    "node": "7.4.0"
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

EXPOSE 80

CMD ["nodemon", "server.js"] 
```
[Más información sobre Docker](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/Hito-4)



## Despliegue IaaS
[![google-cloud-platform](https://s20.postimg.org/z79sumogt/google_cloud_platform_5643dc63.png)](http://146.148.24.77/)

Para este último Hito, vamos a llevar a cabo un despliege de nuestro proyecto 
haciendo uso de [`Vagrant`](https://www.vagrantup.com/), [`Ansible`](https://www.ansible.com/) y
 [`Fabric`](http://www.fabfile.org/), sobre [`Google Compute Engine`](https://cloud.google.com/compute/).


### Prerequisitos para el despliege.

Antes de poder llevar a cabo el desplique necesitamos realizar los siguientes pasos.

1. Obtener una cuenta el GCE y crear un proyecto
2. Añadir clave SSH a GCE como se indica en [Clave SSH](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/Hito-5#1-ssh)
2. Obtener los sigueintes datos:
    
    - project_id
    - client_email
    - json_key_location

    Los pasos para obtenerlos se detallan en [Obtener credenciales](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/Hito-5#2-credenciales)

3. Instalación de las dependencias 
    
  - vagrant y [vagrant-google](https://github.com/mitchellh/vagrant-google)
  - ansible 
  - fabric

  En ArchLinux la instalación se puede realizar mediante el comando `sudo pacman -S vagrant ansible fabric`
     y `vagrant plugin install vagrant-google`   

  > Aunque no es estrictamente necesario para realizar el despliege, es interesante instalar la consola de GCE para realizar tareas de administración.
 
4. Establecer las variables de entrono con los datos obtenidos.

  - export PROJECT_ID=project_id
  - export CLIENT_EMAIL=client_email
  - export KEY_LOCATION=json_key_location



### Despligue

Una vez que tenemos instaladas las dependencias y configuradas las variables realizar el despliegue es muy sencillo.

>En GCE nos encontramos con un problema, no se pueden abrir los puertos desde vagrant, por ello debemos realizarlo a mano, como se indica en [Abrir puerto HTTP](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/Hito-5#4-puerto-http)

#### Creacion máquina virtual y provisionamiento (Vagrant + Ansible)
Tan solo debemos ejecutar: 
``` bash 
vagrant up --provider=google
```

#### Administración de la aplicación (Fabric)

Haciendo uso de la conexión SSH y los comandos disponibles ([Comandos Fabric](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/Hito-5#3-fabric))
podemos administrar nuestro proyecto con comandos de la siguiente forma:

```bash
fab -H user@ip_maquina -i /path/clave/privada/ssh función_fabric

#Ejemplo
fab -H antonio@123.123.123.123 -i ~/.ssh/id_rsa install_app
```
> **Podemos acceder a nuestro proyecto introduciendo la IP externa de la máquina en un navegador**
[![google-cloud-platform](https://s20.postimg.org/z79sumogt/google_cloud_platform_5643dc63.png)](http://146.148.24.77/)

### Explicación archivos vagrantfile, ansible.ym y fabfile.py

#### vagranfile

En este archivo se describle la configuración para la creación de la máquina virtual en GCE.

```shell
Vagrant.configure("2") do |config|
  config.vm.box = "google/gce"

  config.vm.provider :google do |google, override|
    #Credenciales
    google.google_project_id = ENV['PROJECT_ID']
    google.google_client_email = ENV['CLIENT_EMAIL']
    google.google_json_key_location = ENV['KEY_LOCATION']

    #Configuración tipo MV
    google.machine_type = "g1-small"
    google.zone = "europe-west1-b"
    google.name = "infraestructuravirtual"
    google.image = "ubuntu-1604-xenial-v20160721"

    # SSH
    override.ssh.username = "antonio"
    override.ssh.private_key_path = "/home/antonio/.ssh/id_rsa"
  end

  #rsync (desactivado)
   config.vm.synced_folder ".", "/projectsrc", type: "rsync",
    rsync__exclude: ".git/", :disabled => true

  #Ansible - Provisionamiento
  config.vm.provision "ansible" do |ansible|
        ansible.sudo = true
        ansible.playbook = "ansible.yml"
        ansible.host_key_checking = false
  end
end

```
El archivo de configuración es muy simple, en primer lugar obtiene los datos de las variables de entorno para realizar la autentificación
, luego especifica el tipo de máquina que se quiere, la zona, el nombre y el SO. Después se indica la localización de la clave SSH y finalmente se llama a `ansible` para que realize el provisionamiento.


#### ansible.yml

En este archivo se especifican las configuraciones que deben realizarse a la máquina que se ha desplegado en GCE.

```yml
---
- hosts: all
  become: true
  remote_user: antonio

  vars:
    - homeDir: /home/ubuntu
    - appDir : infraestructura_virtual_ugr
    - default: server {  listen 80; server_name YOUR_SERVERS_IP_ADDRESS;  location / { proxy_pass "http://127.0.0.1:80"; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'; proxy_cache_bypass $http_upgrade; }}

  tasks:
  - name: Node.js + NPM
    shell: "curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -"

  - name: Add Mongo Key
    apt_key: id=EA312927  keyserver=keyserver.ubuntu.com

  - name: Add Mongo Repo
    apt_repository: repo='deb http://repo.mongodb.org/apt/ubuntu {{ansible_distribution_release}}/mongodb-org/3.2 multiverse'                                     

  - name: Update
    become: true
    shell: "apt-get update"

  - name: Install Packages
    apt: name={{ item }}  state=latest
    with_items:
      - build-essential
      - git
      - mcrypt
      - curl
      - mongodb-org
      - nginx  
      - nodejs   

  - name: PM2 (para mantener Node funcionando)
    npm: name=pm2 global=yes 

  - name: Node.js ln -s
    file:
      src: /usr/bin/nodejs
      dest: /usr/bin/nod
      force: yes
      state: link

  - name: Nginx reverse proxy
    copy: content="{{ default }}" dest=/etc/nginx/sites-available/default
```
En este caso se lleva a cabo la instalación de `git, mongo, nginx node , build-essencial y pm2` y se realiza una pequeña configuración para que `nginx` actue como reverse proxy.


#### fabfile.py

En este archivo hay escritas una serie de funciones que nos permiten desplegar y administrar nuestro proyecto.
La explicación de todas las funciones se puede consultar en [Comandos Fabric](https://github.com/antoniovj1/infraestructura_virtual_ugr/wiki/Hito-5#3-fabric)
A continuación se muestra la estructura que siguen las funciones:

```python
from fabric.api import *
import os
import time

def info_servidor():
    run ('cat /proc/cpuinfo')

def install_app():
    """Clona el repositorio e instala las dependencias"""
    with shell_env(NODE_ENV='production'):
        run ('rm -rf infraestructura_virtual_ugr')
        run ('git clone https://github.com/antoniovj1/infraestructura_virtual_ugr.git')
        run ('cd infraestructura_virtual_ugr && npm install')


def start_app():
    """Inicia la aplicación (node,mongo y nginx)"""
    run ('sudo service mongod start')
    run ('sleep 7 && cd infraestructura_virtual_ugr && sudo pm2 start server.js')
    run ('sudo service nginx restart')

    .
    .
    .
```
Como se puede ver es muy simple, tan solo son una serie de funciones que ejecutan comandos en nuestra máquina remota.
Para realizar la administración del servidor `NodeJS` se hace uso de [`PM2`](http://pm2.keymetrics.io/), un progrma que permite que administrar las ejecuciones de `NodeJS` y evitar que se cierren cuando haya una excepción.

##### Recursos interesante:
 - [Nginx Reverse Proxy](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)


___
###### Universidad de Granada (UGR)
___
