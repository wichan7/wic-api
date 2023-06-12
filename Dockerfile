#BASE IMAGE
FROM node:latest

MAINTAINER wichan7@naver.com

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

RUN npm install -g pm2

EXPOSE 3311

CMD ["npm", "start"]