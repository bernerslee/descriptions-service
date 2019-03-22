const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001
const db = require('./../database/index.js')
const cors = require('cors');
const { Pool, Client } = require('pg')


app.use(express.static(__dirname + '/./../client/dist'))
app.use('/:id', express.static(__dirname + '/./../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({origin:"http://localhost:3000"}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.get('/houses/:id', (req, res) => {
  const client = new Client({
    user: 'huy',
    host: 'localhost',
    database: 'sdc',
    password: '1',
    // port: 3211,
  })

const pool = new Pool({
  user: 'huy',
  host: 'localhost',
  database: 'sdc',
  password: '1',
})

  // client.connect()
  // .then(() => {
  //   return
    pool.query(`SELECT * FROM houses where id = ${req.params.id}`)
  // })
  .then((data) => {
      console.log(data)
        res.status(200)
        res.send(data);
        pool.end();
        // client.end();
  })
  .catch(err => {
    console.error(err);
    res.status(404).send()
  });
});

app.get('/prices/:id', (req, res) => {
  const client = new Client({
    user: 'huy',
    host: 'localhost',
    database: 'sdc',
    password: '1',
    // port: 3211,
  })

const pool = new Pool({
  user: 'huy',
  host: 'localhost',
  database: 'sdc',
  password: '1',
})

  client.connect()
  .then(() => {
    return client.query(`SELECT * FROM prices where id = ${req.params.id}`)
  })
  .then((data) => {
      console.log(data)
        res.status(200)
        res.send(data);
        client.end();
  })
  .catch(err => {
    console.error(err);
    res.status(404).send()
  });
});

module.exports = app; // make available for testing