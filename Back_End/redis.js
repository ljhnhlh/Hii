var redis = require('redis')
client = redis.createClient();

client.on('error', function(err) {
    console.log('error ' + err);

});
a = [1, 2, 3, 4, 5, 6, 7]
client.hset("a", a, redis.print);
client.hkeys('a', function(err, result) {
    console.log(err);
    // console.log(result[0]);
    console.log(result[0]);


    // client.end(true)
})