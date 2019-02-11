var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    console.log('///');

    res.end('Hello world')
})
app.get('/login', function(req, res) {
    console.log('ggoood');
    console.log(req.query.code);
    var code = req.query.code;


    res.end('afasf')
})
app.listen(3000);
console.log('listen on 3000');