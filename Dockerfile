#BASE IMAGE
FROM node:latest

MAINTAINER wichan7@naver.com

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3311

CMD ["npm", "start"]