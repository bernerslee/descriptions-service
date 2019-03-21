const knex = require('./database/generate_fake_data').knex;
const {performance} = require('perf_hooks');
const testHouseSelect = function() {
    let t0 = performance.now();
    knex('houses').where({id: 9999990}).select().then(data=>{
        console.log(data);
    })
    let t1 = performance.now();
    console.log("Execution time for using knex.selec\(\) to query 'houses' table in Postgres DB is  " + (t1 - t0) + " milliseconds.");
}

testHouseSelect();

const testPriceSelect = function() {
    let t0 = performance.now();
    knex('prices').where({id: 9999990}).select().then(data=>{
        console.log(data);
    })
    let t1 = performance.now();
    console.log("Execution time for using knex.select\(\) to query 'prices' table Postgres DB is  " + (t1 - t0) + " milliseconds.");
}

testPriceSelect();
