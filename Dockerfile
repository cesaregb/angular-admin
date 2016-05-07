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

#Current workingdir is app from dependencies image.
ADD bower.json .
ADD .bowerrc .
RUN bower install
ADD . .
RUN grunt build --force
WORKDIR /dist
ENV NODE_ENV development
RUN npm install

# Define default command.
ENTRYPOINT ["npm", "start"]

# Expose ports.
EXPOSE 9000
