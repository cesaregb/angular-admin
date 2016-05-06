# To build:
# docker build -t cesaregb/process-admin:v1 -f Dockerfile .
# docker push cesaregb/process-admin:v1
#
# To run:
# run docker mongo....
# docker run -p 27017:27017 --name mongo-admin -d mongo
# docker run -p 9000:9000 --link mongo-admin:mongo -it process-admin:v1
# docker run -p 9000:9000 --link mongo-admin:mongo -it --entrypoint bash process-admin:v1

# docker run -p 9000:9000-it process-admin:v1
# docker run -p 9000:9000 -it --entrypoint bash process-admin:v1
FROM cesaregb/process-admin-dependencies:v1
MAINTAINER Cesar Gonzalez, cesareg.borjon@gmail.com

#sett the environment to be used...
ENV NODE_ENV=development
ENV DOCKER=dockerDB
ENV PORT=9000
EXPOSE 9000

# Instllation done by dependencies image.
# ADD dist/package.json package.json
# RUN npm install
COPY dist .
# RUN chmod -R 700 .
# WORKDIR app

ENTRYPOINT ["npm", "start"]
