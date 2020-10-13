FROM node:13

WORKDIR /app
COPY . .

RUN npm install
RUN npm install -g typescript
RUN tsc -b

CMD node ./dist/app.js