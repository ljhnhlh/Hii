//app.js
var url = 'http://localhost:3000'
var app = getApp();

function getcode() {
    return new Promise(function(reslove, reject) {
        wx.login({
            success: function(res) {
                resolve(res.code)
            },
            fail: function() {
                reject(err)
            }

        })
    })
}

function request_server(pathName, data_collect, sessionId) {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: url + pathName,
            data: { data_collect: data_collect },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: { sessionId: sessionId }, // 设置请求的 header
            success: function(res) {
                resolve(res)
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    })
}
App({
    onLaunch: function() {
        wx.clearStorageSync('sessionId')
        wx.clearStorageSync('expiredTime')
        wx.clearStorageSync('time')
        var sessionId = wx.getStorageSync('sessionId')
        var expiredTime = wx.getStorageSync('expiredTime')
        var time = wx.getStorageSync('time')
        console.log(sessionId + " ," + expiredTime + " ," + time);

        console.log(sessionId + ',' + expiredTime + 'sads')
        var that = this;
        if (!sessionId || !expiredTime) {
            //无sessionId
            //查找是否注册
            wx.login({
                success: function(res) {
                    wx.request({
                        url: url + '/HaveRegisted',
                        data: { code: res.code },
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function(response) {

                            var data = response.data;
                            if (!data.ss) {
                                wx.redirectTo({
                                    url: '/pages/register/register',
                                    success: function() {
                                        console.log('success');
                                    }
                                })
                            } else {
                                //设置sessionId,

                                wx.setStorageSync('sessionId', data.sessionId)
                                wx.setStorageSync('expiredTime', data.expiredTime)
                                that.globalData.sessionId = data.sessionId;
                                that.globalData.expiredTime = data.expiredTime;
                            }
                        },

                    })
                },
                fail: function() {
                    wx.showToast({ // 显示Toast
                        title: '加载失败',
                        icon: 'none',
                        duration: 1500
                    })
                }

            })

        } else {
            //有sessionId
            //先判断是否超时
            var now = new Date();
            console.log(sessionId + "xxxxxxx")
            if (now - time >= 1) {
                //sessionId 超时：获取新的sessionId并写入缓存
                wx.login({
                    success: function(res) {
                        wx.request({
                            url: url + '/login',
                            data: { code: res.code },
                            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                            // header: {}, // 设置请求的 header
                            success: function(response) {
                                // response = JSON.parse(response);
                                console.log(response)
                                if (response.data.success) {
                                    that.globalData.sessionId = response.data.sessionId;
                                    var time = new Date();
                                    wx.setStorageSync('sessionId', response.data.sessionId)
                                    wx.setStorageSync('time', time);
                                    wx.setStorageSync('expiredTime', response.data.expiredTime)
                                    wx.redirectTo({
                                        url: '/pages/discover/discover',
                                    })
                                } else {
                                    console.log('redirect to register');

                                    wx.redirectTo({
                                        url: '/pages/register/register',
                                    })
                                }

                            },
                            fail: function() {
                                //获取sessionId失败
                                wx.showToast({ // 显示Toast
                                    title: '加载失败',
                                    icon: 'none',
                                    duration: 1500
                                })
                            },
                        })
                    },
                    fail: function() {
                        //获取login code 失败
                        wx.showToast({ // 显示Toast
                            title: '加载失败',
                            icon: 'none',
                            duration: 1500
                        })
                    },
                })

            } else {
                //正常使用
                //每次正常使用的时候，请求超过5次就增加sessionId的使用时长半小时
                // console.log('good');

                that.globalData.sessionId = sessionId;
            }
        }






        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
            // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        sessionId: null,
        userInfo: null
    }
})