# To build:
# docker build -t process-admin:v1 -f Dockerfile .
#
# To run:
# run docker mongo....
#   docker run -p 27017:27017 --name mongo-admin -d mongo
# docker run -p 9001:9001 --link mongo-admin:mongo -it process-admin:v1
# docker run -p 9001:9001 --link mongo-admin:mongo -it --entrypoint bash process-admin:v1

# docker run -p 9001:9001-it process-admin:v1
# docker run -p 9001:9001 -it --entrypoint bash process-admin:v1
FROM process-admin-dependencies:v1
MAINTAINER Cesar Gonzalez, cesareg.borjon@gmail.com

#sett the environment to be used...
ENV NODE_ENV=docker
ENV PORT=9001
EXPOSE 9001

# Instllation done by dependencies image.
# ADD dist/package.json package.json
# RUN npm install
COPY dist .
# RUN chmod -R 700 .
# WORKDIR app

#ENTRYPOINT ["node","app.js"]
ENTRYPOINT ["npm", "start"]
