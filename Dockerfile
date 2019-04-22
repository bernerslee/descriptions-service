FROM node:10.15.3-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install

RUN npm install -g knex

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]