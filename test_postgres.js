const knex = require('./database/generate_fake_data').knex;
const {performance} = require('perf_hooks');

const testHouseSelect = async function() {
    let t0 = performance.now();
    await knex('houses').where({id: 9999990}).select().then(data=>{
        console.log(data);
    })
    let t1 = performance.now();
    console.log("Execution time for using knex.selec\(\) to query 'houses' table in Postgres DB is  " + (t1 - t0) + " milliseconds.");
}

testHouseSelect();

const testPriceSelect = async function() {
    let t0 = performance.now();
    await knex('prices').where({id: 9999990}).select().then(data=>{
        console.log(data);
    })
    let t1 = performance.now();
    console.log("Execution time for using knex.select\(\) to query 'prices' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
}

testPriceSelect();

const testHouseRaw = async function() {
    let t0 = performance.now();
    await knex.raw('SELECT * FROM houses where id \= 9999990').then(data=>{
        console.log(data);
    })
    let t1 = performance.now();
    console.log("Execution time for using knex.raw\(\) to query 'houses' table in Postgres DB is  " + (t1 - t0) + " milliseconds.");
}

testHouseRaw();

const testPriceRaw = async function() {
    let t0 = performance.now();
    await knex.raw('SELECT * FROM prices where id \= 9999990').then(data=>{
        console.log(data);
    })
    let t1 = performance.now();
    console.log("Execution time for using knex.raw\(\) to query 'prices' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
}

testPriceRaw();