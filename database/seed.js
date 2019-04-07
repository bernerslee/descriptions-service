const facker = require('faker');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'database',
    user : 'huy',
    password : '1',
    database : 'sdc',
  },
  pool: {
      min: 0,
      max: 10,
  },
  acquireConnectionTimeout: 10000
});

let house = function (num) {
    let obj = {
      id:  num,
      street:  facker.address.streetAddress(),
      city:  facker.address.city(),
      state: facker.address.stateAbbr(),
      zipcode:  facker.address.zipCode(),
      description: facker.lorem.paragraphs(2)
    }
    return obj;
  }

async function makeHouseEntry(lastIndex, id) {
    let rows = [];
    let chunkSize = 200;

    for (let i = lastIndex; i < id; i++) {
      await rows.push(house(i));
    }
    await knex.batchInsert('houses', rows, chunkSize)
                  .then(function(data) { console.log(data) })
                  .catch(function(error) { console.log(error) });
}

module.exports = { makeHouseEntry };