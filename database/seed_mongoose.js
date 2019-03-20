const HouseModel = require('./index_mongo').HouseModel;
const PriceModel = require('./index_mongo').PriceModel;
const facker = require('faker');
const stopWatch = require('statman-stopwatch');
const sw = new stopWatch(true);

let objH =function (index) {
    let obj = {
        id:  index,
        street: facker.address.streetAddress(),
        city: facker.address.city(),
        state: facker.address.stateAbbr(),
        zipcode: facker.address.zipCode(),
        description: facker.lorem.paragraphs(2)
    }
    return obj;
}

let objP =function (num) {
    let obj = {
        id: num,
        price: facker.commerce.price(200000, 2000000, 0)
    }
    return obj;
}


let saveHouseCollections = async function (lastIndex, num) {
    let collections = [];
    for (let i = lastIndex; i < num; i++) {
        await collections.push(objH(i));
    }
    await HouseModel.insertMany(collections, { ordered: false }).then((err, data) => {
        if (err) {
            console.log(err)
        } else {
            // collections = [];
            console.log('Saved'+ i);
        }
    })
}

let savePriceCollections = async function (lastIndex, num) {
    let collections = [];
    for (let i = lastIndex; i < num; i++) {
        await collections.push(objP(i));
    }
    await PriceModel.insertMany(collections, { ordered: false }).then((err, data) => {
        if (err) {
            console.log(err)
        } else {
            // collections = [];
            console.log('Saved'+ i);
        }
    })
}


let seed = async function() {
    let lastIndex = 0;
    await HouseModel.deleteMany((err)=> {
                console.log(err)
            });
    await PriceModel.deleteMany((err)=> {
        console.log(err)
    });
    for (let i = 0; i <= 10000000; i+=20000) {

        await saveHouseCollections(lastIndex, i);
        await savePriceCollections(lastIndex, i);
        lastIndex = i;
        // collections = [];
    }
    return console.log(`Seeding in ${sw.read()/60000} mins`)
}
seed();
