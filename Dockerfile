# To build:
# docker build -t process-admin:v1 -f Dockerfile .
#
# To run:
# docker run -p 3000:3000 -it process-admin:v1
# docker run -p 3000:3000 -it --entrypoint bash process-admin:v1
FROM nodesource/node:4.0
MAINTAINER Cesar Gonzalez, cesareg.borjon@gmail.com

#sett the environment to be used... 
ENV NODE_ENV=docker

ADD dist/package.json package.json
RUN npm install
ADD dist .

#ENTRYPOINT ["node","app.js"]
ENTRYPOINT ["npm", "start"]
