// const knex = require('./database/index_postgres').knex;
// const { performance } = require('perf_hooks');
// const {Pool} = require('pg-pool');

// const pool = new Pool({
//     user: 'postgres',
//     host: '13.57.190.82',
//     database: 'sdc',
//     password: 'huy',
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
// })

// let testPoolHouses = function() {
//     let t0 = performance.now();
//     pool.connect((err, client, release) => {
//         if (err) {
//           return console.error('Error acquiring client', err.stack)
//         }
//         client.query(`EXPLAIN ANALYZE SELECT * FROM houses where id = 9999999`, (err, result) => {
//           release()
//           if (err) {
//             return console.error('Error executing query', err.stack)
//           }
//           console.log(result.rows)
//           let t1 = performance.now();
//           console.log("Execution time for using pg pool query to query 'houses' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
//         })
//       })
// }

// testPoolHouses();

// let testPoolPrices = function() {
//     let t0 = performance.now();
//     pool.connect((err, client, release) => {
//         if (err) {
//           return console.error('Error acquiring client', err.stack)
//         }
//         client.query(`SELECT * FROM prices where id = 9999990`, (err, result) => {
//           release()
//           if (err) {
//             return console.error('Error executing query', err.stack)
//           }
//           console.log(result.rows)

//           let t1 = performance.now();
//           console.log("Execution time for using pg pool query to query 'prices' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
//         })
//       })
// }

// testPoolPrices();

const redis = require('redis');
const clientRedis = redis.createClient("6379", "13.57.39.5");

clientRedis.on('connect', function() {
    console.log('Redis client connected');
});

clientRedis.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

clientRedis.hget(`house:9999990`, 'data', function (error, result) {
  if (error) {
    console.log(error);
    //throw error;
  } else if (result) {
    console.log(JSON.parse(result));
  }});