var app = require('express')();
var request = require('request')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    console.log('///');

    res.end('Hello world')
})
app.get('/HaveRegisted', function(req, res) {
    var code = req.query.code;
    var url = 'https://api.weixin.qq.com/sns/jscode2session?' +
        'appid=' + 'wx08dea5e778f278de&' +
        'secret=' + '77fc034ff68fe7799e4e8723466a50d7&' +
        'js_code=' + code +
        '&grant_type=' + 'authorization_code';
    request({
            url: url
        },
        function(err, response, body) {
            if (!err) {
                // console.log(body);
                console.log(body);
                //获取appid，判断是否已注册，数据库查询


                res.end(body)
            } else {
                console.log(err);

            }
        })
})
app.get('/login', function(req, res) {
    console.log('ggoood');
    console.log();

    console.log(req.query.code);
    console.log(req.header('sessionId'));

    // var code = req.query.code;
    var code = req.query.code;
    var url = 'https://api.weixin.qq.com/sns/jscode2session?' +
        'appid=' + 'wx08dea5e778f278de&' +
        'secret=' + '77fc034ff68fe7799e4e8723466a50d7&' +
        'js_code=' + code +
        '&grant_type=' + 'authorization_code';
    // console.log(url);

    request({
                url: url
            },
            function(err, response, body) {
                if (!err) {
                    // console.log(body);
                    console.log(body);
                    res.end(body)
                } else {
                    console.log(err);

                }
            })
        // request.get({
        //         url: 'https://api.weixin.qq.com/sns/jscode2session',
        //         json: true,
        //         qs: {
        //             appid: 'wx08dea5e778f278de',
        //             secret: '77fc034ff68fe7799e4e8723466a50d7',
        //             js_code: code,
        //             grant_type: 'authorization_code'
        //         }
        //     },
        //     function(err, response, body) {
        //         if (!err) {
        //             // console.log(body);
        //             console.log(body);
        //             res.end(body)
        //         } else {
        //             console.log(err);

    //         }
    //     })

    // res.end('afasf')
})
app.listen(3000);
console.log('listen on 3000');