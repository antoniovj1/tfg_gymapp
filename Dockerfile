# Tells the Docker which base image to start.
FROM node

# Adds files from the host file system into the Docker container.  
ADD . /app

# Sets the current working directory for subsequent instructions
WORKDIR /app

RUN npm install
RUN npm install -g nodemon
RUN npm install -g webpack
RUN webpack


#expose a port to allow external access
EXPOSE 8080

# Start application
CMD ["nodemon", "server.js"] 
