FROM node:13

WORKDIR /app

COPY package.json /app

RUN npm install

COPY ./dist /app

CMD node app.js