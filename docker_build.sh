#!/bin/bash

docker build -t tfgugr .
docker run -d --name mongoDB mongo

docker run --link=mongoDB:mongodb -it tfgugr

