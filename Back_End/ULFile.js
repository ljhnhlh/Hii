var app = require('express')();
var bodyParser = require('body-parser');
var formidable = require('formidable')
var fs = require('fs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ULFile', function(req, res) {
    // console.log(req);


    res.end('success');
});



app.listen(8000);
console.log('listen on 8000');