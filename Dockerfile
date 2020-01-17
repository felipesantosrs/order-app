# NPM VERSION
FROM node:10.15.0

# make project directory
RUN mkdir /project
WORKDIR /project
COPY package.json package.json
COPY app.js app.js
COPY models models
COPY routes routes
COPY queries queries
COPY config config
COPY services services

USER root

# timezone adjustment => ensure Central time
RUN rm -rf /etc/localtime; \
		ln -s /usr/share/zoneinfo/Canada/Vancouver /etc/localtime; \
		echo "Canada/Vancouver" >  /etc/timezone;

# load in application
RUN npm install --production --silent --progress=false

# EXPOSE 3000
CMD ["npm", "start"]