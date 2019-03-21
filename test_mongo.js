const HouseModel = require('./database/index_mongo').HouseModel;
const PriceModel = require('./database/index_mongo').PriceModel;

HouseModel.find({id: 9999990}).explain().then(data=>console.log(data));
PriceModel.find({id: 9999990}).explain().then(data=>console.log(data));

