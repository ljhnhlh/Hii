var app = require('express')();
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    // request.get('http://www.test.com/login')
    //     .on('response', function(response) {
    //         console.log(response.statusCode);

    //         // console.log(response);
    //         res.end();
    //     }).on('body', function(body) {
    //         console.log(body);
    //     });
    request.get({
            url: 'http://www.test.com/login',
            data: {
                fds: 'asdfsd'
            }
        }, function(err, response, body) {
            if (!err) {
                // console.log(body);
                res.end(body)
            }
        })
        // res.end('cannot get');
})


app.listen(8080);