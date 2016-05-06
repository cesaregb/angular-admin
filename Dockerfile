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

FROM digitallyseamless/nodejs-bower-grunt

RUN apt-get update && apt-get install -y ruby ruby-compass && \
            apt-get clean && \
            rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set instructions on build.
ADD package.json /app/
RUN npm install
ADD bower.json /app/
ADD .bowerrc /app/
WORKDIR /app
RUN bower install
ADD . /app
RUN grunt build --force
WORKDIR /app/dist
ENV NODE_ENV development
RUN npm install

# Define working directory.
WORKDIR /app

# Define default command.
ENTRYPOINT ["npm", "start"]

# Expose ports.
EXPOSE 9000
