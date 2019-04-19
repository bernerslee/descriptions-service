var redis = require('redis');
var client = redis.createClient('3001', '13.57.190.82');

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});