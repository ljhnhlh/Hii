var app = require('express')();
const uuidv1 = require('uuid/v1');
var request = require('request')
var redis = require('redis')
var bodyParser = require('body-parser');
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Hii'
});
connection.connect();
client = redis.createClient();

client.on('error', function(err) {
    console.log('error ' + err);

});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


function getOpenId(code) {
    var url = 'https://api.weixin.qq.com/sns/jscode2session?' +
        'appid=' + 'wx08dea5e778f278de&' +
        'secret=' + '77fc034ff68fe7799e4e8723466a50d7&' +
        'js_code=' + code +
        '&grant_type=' + 'authorization_code';
    return new Promise(
        function(resolve, reject) {
            request({ url: url }, function(err, response, body) {
                if (!err) {
                    resolve(body)
                } else {
                    reject(err)
                }
            })
        }
    )
}

app.get('/', function(req, res) {
    console.log('///');

    res.end('Hello world')
})
app.get('/HaveRegisted', function(req, res) {

    var ssIdORRegister = {
        ss: false,
        sessionId: '',
        expiredTime: 30
    };
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
                body = JSON.parse(body);
                var openid = body.openid;
                console.log(openid);

                var str = 'select 1 from user where openid = ? limit 1;'
                connection.query(str, { 'openid': openid }, function(err, rows, fields) {
                    if (!err) {
                        if (rows[0] === undefined) {
                            //不存在，需要注册
                            console.log("register");

                            ssIdORRegister.ss = false;
                            res.end(JSON.stringify(ssIdORRegister))
                        } else {
                            console.log('not need to registe');

                            //生成sessionId
                            var sessionId = uuidv1();
                            client.hset(sessionId, body.openid + ',' + body.session_key, 'dsd', redis.print);
                            ssIdORRegister.ss = true;
                            ssIdORRegister.sessionId = sessionId;
                            res.end(JSON.stringify(ssIdORRegister))
                        }
                    } else {
                        console.log(err);

                    }
                })

                // res.end(body)
            } else {
                console.log(err);
            }
        })
})
app.get('/login', function(req, res) {


    // console.log(req.query.code);
    // console.log(req.header('sessionId'));

    // var q1 = new getOpenId(res.query.code);
    // q1.then(function(data) {
    //     res.end(data);
    // }).catch(function(err) {
    //     res.end(err)
    // })

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
            var getSession = {
                success: false,
                sessionId: '',
                expiredTime: 30
            }
            if (!err) {
                // console.log(body);

                var sessionId = uuidv1();
                client.hset(sessionId, body.openid + ',' + body.session_key, 'dsd', redis.print)
                getSession.sessionId = sessionId;
                getSession.success = true
            }
            res.end(JSON.stringify(getSession))
        })
})
app.listen(3000);
console.log('listen on 3000');