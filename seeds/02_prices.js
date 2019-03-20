const makePriceEntry = require('../database/generate_fake_data').makePriceEntry;
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prices').del()
    .then(async function () {
      // Inserts seed entries
      // let rows = [];
      let lastIndex = 0;
      for (let i = 0; i <= 10000000; i+=1000) {
        await makePriceEntry(lastIndex, i);
        lastIndex=i;
      }
    });
};
