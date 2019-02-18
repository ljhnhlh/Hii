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
                    console.log(body);
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
                console.log(openid + "xxxxx");

                var str = 'select 1 from user where openid = ? limit 1;'
                connection.query(str, openid, function(err, rows, fields) {
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

function addUserInfo(data, userInfo) {
    return new Promise(function(resolve, reject) {
        var str = 'insert into user set ?';
        console.log(data.openid);

        connection.query(str, {
            openid: data.openid,
            nikname: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender,
            school: userInfo.school,
            wechat: null,
            alipay: null
        }, function(err, rows, filed) {
            if (err) {
                reject(err)
                    // console.log(err);
            } else {
                console.log('success');
                resolve(data)
            }

        })
    })
}
app.post('/register', function(req, res) {
    /**
     * req.body :{
                code: wx.login返回的code,
                school: 用户的学校,
                gender: 用户的性别，1为男，0为女,
                nickName: 用户昵称，
                avatarUrl: 用户头像地址
            }
     * 
     * 
     */
    var ss = {
            success: false,
            sessionId: '',
            expiredTime: 30
        }
        //使用code 获取openId

    var getIdAndsessionKey = getOpenId(req.body.code);
    //获取到信息了，调用addUserInfo,使用mysql存入用户信息
    getIdAndsessionKey.then(function(data) {
        data = JSON.parse(data);
        console.log(data.openid);

        addUserInfo(data, req.body).then(function(sqlData) {

            console.log(sqlData);

            //获取sessionId
            var sessionId = uuidv1();
            //redis 存储sessionId
            client.hset(sessionId, sqlData.openid + "," + sqlData.session_key, 'dsd', redis.print)
                //返回sessionId
            ss.sessionId = sessionId;
            ss.success = true;
            console.log('success');

            res.end(JSON.stringify(ss));

        })
    }).catch(function(err) {
        // console.log(err);
        res.end(ss);
    })
})

app.listen(3000);
console.log('listen on 3000');