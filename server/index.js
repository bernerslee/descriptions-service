require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.argv[2] || 3001
const cors = require('cors');
const { Pool, Client } = require('pg');

const redis = require('redis');
const clientRedis = redis.createClient('6379', '54.215.233.92');

clientRedis.on('connect', function() {
    console.log('Redis client connected');
});

clientRedis.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


app.use(express.static(__dirname + '/./../client/dist'))
app.use('/loaderio-4c92d8d75e9b156fa6177d9dfd91bbec.txt',express.static(__dirname + '/./../loaderio-4c92d8d75e9b156fa6177d9dfd91bbec.txt'));
app.use('/:id', express.static(__dirname + '/./../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({origin:"localhost:3001"}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const pool = new Pool({
  user: 'postgres',
  host: '54.183.88.92',
  database: 'sdc',
  password: 'huy',
  max: 100,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

app.get('/houses/:id', (req, res) => {
  clientRedis.get(`http://ec2-13-52-163-168.us-west-1.compute.amazonaws.com:3001/houses/${req.params.id}`, function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    } else if (result) {
      res.send(JSON.parse(result));
      res.end();
    } else {
      pool.connect((err, client, release) => {
          if (err) {
            return console.error('Error acquiring client', err.stack)
          }
          client.query(`SELECT * FROM houses where id = ${req.params.id}`, (err, result) => {
            release()
            if (err) {
              return console.error('Error executing query', err.stack)
            }
            res.status(200)
            clientRedis.set(`http://ec2-13-52-163-168.us-west-1.compute.amazonaws.com:3001/houses/${req.params.id}`, JSON.stringify(result.rows), (err,response)=>{
              if(err) {
                console.log(err)
              } else {
                console.log(response);
              }
            });
            res.send(result.rows);
          })
        })
      }
  });
});



app.get('/prices/:id', (req, res) => {
  clientRedis.get(`http://ec2-13-52-163-168.us-west-1.compute.amazonaws.com:3001/prices/${req.params.id}`, function (error, result) {
    if (error) {
      console.log(error);
      throw error;
    } else if (result) {
      res.send(JSON.parse(result));
      res.end();
    } else {
      pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack)
        }
        client.query(`SELECT * FROM prices where id = ${req.params.id}`, (err, result) => {
          release()
          if (err) {
            return console.error('Error executing query', err.stack)
          }
          res.status(200)
          clientRedis.set(`http://ec2-13-52-163-168.us-west-1.compute.amazonaws.com:3001/prices/${req.params.id}`, JSON.stringify(result.rows), (err, response) => {
            if (err) {
              console.log(err)
            } else {
              console.log(response);
            }
          });
          res.send(result.rows);
        })
      })
    }
  });
});

app.post('/prices/:id', (req, res) => {
  // table.integer('id');
  //   table.integer('price');
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    let query = 'INSERT INTO prices(id, price) VALUES($1, $2)';
    let value = [req.params.id, Number(req.query.price)];
    client.query(query, value, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
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
    let query = 'INSERT INTO houses(id, street, city, state, zipcode, description) VALUES($1, $2, $3, $4, $5, $6)';
    let value = [req.params.id, req.query.street, req.query.city, req.query.state, req.query.zipcode, req.query.description];
    client.query(query, value, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      res.status(200)
      res.send(result);
    })
  })
});

app.delete('/prices/:id', (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    let query = `DELETE FROM prices WHERE id = ${req.params.id}`;
    client.query(query, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      res.status(200)
      res.send(result);
    })
  })
});

app.delete('/houses/:id', (req, res) => {
  // table.integer('id');
  //   table.integer('price');
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    let query = `DELETE FROM houses WHERE id = ${req.params.id}`;

    client.query(query, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      res.status(200)
      res.send(result);
    })
  })
});

app.put('/prices/:id', (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    let arr = [];
    for (let i in req.body) {
      arr.push(`${i} = ${req.body[i]}`);
    }
    let value = arr.join(', ')
    let query = `UPDATE prices SET ${value} WHERE id = ${req.params.id}`;
    client.query(query, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      res.status(200)
      res.send(result);
    })
  })
});

app.put('/houses/:id', (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    let arr = [];
    for (let i in req.body) {
      arr.push(`${i} = ${req.body[i]}`);
    }
    let value = arr.join(', ')
    let query = `UPDATE houses SET ${value} WHERE id = ${req.params.id}`;

    client.query(query, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      res.status(200)
      res.send(result);
    })
  })
});

module.exports = app; // make available for testing