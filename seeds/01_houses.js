const facker = require('faker');
const makeHouseEntry = require('../database/generate_fake_data').makeHouseEntry;
const stopWatch = require('statman-stopwatch');
const sw = new stopWatch(true);
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('houses').del()
    .then(async function () {
      // Inserts seed entries

      let lastIndex = 0;
      for (let i = 0; i <= 10000000; i+=200) {
        await makeHouseEntry(lastIndex, i);
        lastIndex=i;
      }
      return console.log(`Seeded in ${sw.read()/60000} mins`)
    });
};
