const makePriceEntry = require('../database/index_postgres.js').makePriceEntry;
const stopWatch = require('statman-stopwatch');
const sw = new stopWatch(true);
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prices').del()
    .then(async function () {
      // Inserts seed entries
      // let rows = [];
      let lastIndex = 0;
      for (let i = 0; i <= 10000000; i+=200) {
        await makePriceEntry(lastIndex, i);
        lastIndex=i;
      }
      return console.log(`Seeded in ${sw.read()/60000} mins`)
    })
    .then(async ()=>{
          await knex.raw("CREATE INDEX pricesId on prices (id)").then(()=>{
           console.log('index created on id column')
          });
          return console.log(`Seeded in ${sw.read()/60000} mins`)
        })
};
