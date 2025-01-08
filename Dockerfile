FROM node:lts-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY .env* ./
COPY .babelrc ./
COPY ecosystem.config.js .
COPY package*.json ./

RUN apk add --no-cache --virtual builds-deps build-base python
RUN apk add --no-cache git tzdata
ENV TZ Asia/Jakarta
RUN pwd
RUN ls -lha
RUN npm install pm2 -g
RUN npm install --silent

EXPOSE 4002

CMD [ "npm", "run", "start:development" ]
