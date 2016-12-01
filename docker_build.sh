#!/bin/bash

docker build -t ivugr .
docker run -d --name mongoDB mongo

docker run --link=mongoDB:mongodb -it ivugr

