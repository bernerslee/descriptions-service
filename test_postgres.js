const knex = require('./database/index_postgres').knex;
const { performance } = require('perf_hooks');
const {Pool} = require('pg');

const pool = new Pool({
    user: 'huy',
    host: 'localhost',
    database: 'sdc',
    password: '1',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

let testPoolHouses = function() {
    let t0 = performance.now();
    pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack)
        }
        client.query(`SELECT * FROM houses where id = 9999990`, (err, result) => {
          release()
          if (err) {
            return console.error('Error executing query', err.stack)
          }
          console.log(result.rows)
          let t1 = performance.now();
          console.log("Execution time for using pg pool query to query 'houses' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
        })
      })
}

testPoolHouses();

let testPoolPrices = function() {
    let t0 = performance.now();
    pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack)
        }
        client.query(`SELECT * FROM prices where id = 9999990`, (err, result) => {
          release()
          if (err) {
            return console.error('Error executing query', err.stack)
          }
          console.log(result.rows)

          let t1 = performance.now();
          console.log("Execution time for using pg pool query to query 'prices' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
        })
      })
}

testPoolPrices();



