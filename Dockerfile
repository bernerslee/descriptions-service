FROM node:10.15.3-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install

RUN npm install -g knex

RUN npm run build

RUN knex migrate:latest

RUN npm run seed_postgres

EXPOSE 8080

CMD ["npm", "start"]