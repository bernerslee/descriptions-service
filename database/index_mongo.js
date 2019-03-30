const mongoose = require('mongoose');

const uri = 'mongodb://localhost/sdc';
const options = {
    poolSize: 10,
    useNewUrlParser: true
}
const db = mongoose.createConnection(uri, options);

const housesSchema = new mongoose.Schema({
    // name: String
    id:  {type: Number, unique: true},
    street:  String,
    city:  String,
    state: String,
    zipcode:  String,
    description: String,
    date: { type: Date, default: Date.now }
});

let HouseModel = db.model('houses', housesSchema);

const pricesSchema = new mongoose.Schema({
    // name: String
    id:  {type: Number, unique: true},
    price: Number
});

let PriceModel = db.model('prices', pricesSchema);

module.exports = {
    db,
    HouseModel,
    PriceModel
}