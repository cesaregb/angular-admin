# To build:
# docker build -t cesaregb/process-admin -f Dockerfile .
# docker push cesaregb/process-admin:v1
#
# To run:
# run docker mongo....
# docker run -p 27017:27017 --name mongo-admin -d mongo
# docker run -p 9000:9000 --link mongo-admin:mongo -it cesaregb/process-admin
# docker run -p 9000:9000 --link mongo-admin:mongo -it --entrypoint bash cesaregb/process-admin

# docker run -p 9000:9000-it process-admin:v1
# docker run -p 9000:9000 -it --entrypoint bash process-admin:v1

FROM cesaregb/process-admin-dependencies:v1

#Current workingdir is app from dependencies image.
WORKDIR /app
ADD bower.json /app
ADD .bowerrc /app

RUN bower install
ADD . /app

RUN grunt build --force
WORKDIR /app/dist
ENV NODE_ENV development
ENV DOCKER useDockerDb

# Define default command.
ENTRYPOINT ["npm", "start"]

# Expose ports.
EXPOSE 9000
