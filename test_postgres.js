const knex = require('./database/index_postgres').knex;
const { performance } = require('perf_hooks');


// const testHouseSelect = async function() {
//     let t0 = performance.now();
//     await knex('houses').where({id: 9999990}).select().then(data=>{
//         console.log(data);
//     })
//     let t1 = performance.now();
//     console.log("Execution time for using knex.selec\(\) to query 'houses' table in Postgres DB is  " + (t1 - t0) + " milliseconds.");
// }

// testHouseSelect();

// const testPriceSelect = async function() {
//     let t0 = performance.now();
//     await knex('prices').where({id: 9999990}).select().then(data=>{
//         console.log(data);
//     })
//     let t1 = performance.now();
//     console.log("Execution time for using knex.select\(\) to query 'prices' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
// }

// testPriceSelect();

// const testHouseRaw = async function() {
//     let t0 = performance.now();
//     await knex.raw('SELECT * FROM houses where id \= 9999990').then(data=>{
//         console.log(data);
//     })
//     let t1 = performance.now();
//     console.log("Execution time for using knex.raw\(\) to query 'houses' table in Postgres DB is  " + (t1 - t0) + " milliseconds.");
// }

// testHouseRaw();

// const testPriceRaw = async function() {
//     let t0 = performance.now();
//     await knex.raw('SELECT * FROM prices where id \= 9999990').then(data=>{
//         console.log(data);
//     })
//     let t1 = performance.now();
//     console.log("Execution time for using knex.raw\(\) to query 'prices' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
// }

// testPriceRaw();


const { Client, Pool } = require('pg')
const pool = new Pool({
    user: 'huy',
    host: 'localhost',
    database: 'sdc',
    password: '1',
    // port: 3211,
})

const client = new Client({
    user: 'huy',
    host: 'localhost',
    database: 'sdc',
    password: '1',
    // port: 3211,
})

// let testPool = async function() {
//     let t0 = performance.now();
//     await pool.query('SELECT * FROM houses where id \= 9999990').then((err, res) => {
//         console.log(err, res)
//         // pool.end()
//     })
//     let t1 = performance.now();
//     console.log("Execution time for using pg query to query 'houses' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
// }

// testPool();


    // client.connect().then(async () => {
    //     let t0 = performance.now();
    //     await client.query('SELECT * FROM houses where id \= 9999990').then(async (err, res) => {
    //         console.log(err, res)
    //         client.end((err) => {
    //             console.log('client has disconnected')
    //             if (err) {
    //                 console.log('error during disconnection', err.stack)
    //             }
    //         })
    //     })
    //     let t1 = performance.now();
    //     console.log("Execution time for using pg query to query 'houses' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
    // })


// let testClientPrice = async ()=> {
        client.connect().then(async () => {
        let t0 = performance.now();
        await client.query('SELECT * FROM prices where id \= 9999990').then(async (err, res) => {
            console.log(err, res)
            await client.end((err) => {
                console.log('client has disconnected')
                if (err) {
                    console.log('error during disconnection', err.stack)
                }
            })
        })

        let t1 = performance.now();
        console.log("Execution time for using pg query to query 'prices' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
    })
// }

// testClientPrice();


