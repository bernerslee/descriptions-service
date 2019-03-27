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

const pool = new Pool({
  user: 'huy',
  host: 'localhost',
  database: 'sdc',
  password: '1',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

app.get('/houses/:id', (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query(`SELECT * FROM houses where id = ${req.params.id}`, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
      res.status(200)
      res.send(result.rows);
    })
  })
});

app.get('/prices/:id', (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query(`SELECT * FROM prices where id = ${req.params.id}`, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
      res.status(200)
      res.send(result.rows);
    })
  })
});

app.post('/prices/:id', (req, res) => {
  // table.integer('id');
  //   table.integer('price');
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    var query = 'INSERT INTO prices(id, price) VALUES($1, $2)';
    var value = [req.params.id, Number(req.query.price)];
    client.query(query, value, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result)
      res.status(200)
      res.send(result);
    })
  })
});

app.post('/houses/:id', (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    var query = 'INSERT INTO houses(id, street, city, state, zipcode, description) VALUES($1, $2, $3, $4, $5, $6)';
    var value = [req.params.id, req.query.street, req.query.city, req.query.state, req.query.zipcode, req.query.description];
    client.query(query, value, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result)
      res.status(200)
      res.send(result);
    })
  })
});

// Create / POST - create a new item
// Read / GET - read an item
// Update / PUT - update an item
// Delete / DELETE - delete an item

module.exports = app; // make available for testing