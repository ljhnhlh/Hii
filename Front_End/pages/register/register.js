// pages/register/register.
var url = 'http://localhost:3000'
var app = getApp();

function login() {
    return new Promise(function(resolve, reject) {
        wx.login({
            success: function(res) {
                resolve(res.code)
            },
            fail: function(err) {
                reject(err)
            }
        })
    })
}

function wx_post_request(pathname, data) {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: url + pathname,
            data: data,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                resolve(res)
            },
            fail: function(err) {
                reject(err)
            },
            complete: function() {
                // complete
            }
        })
    })

}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        selectShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
        selectData: ['15:10', '15:15', '15:20'], //下拉列表的数据
        index: 0, //选择的下拉列表下标
        array: ['中山大学', '华南理工大学', '华南师范大学', '广州大学', '广州工业大学', '广州中医药大学', '广州药科大学', '星海音乐学院']
    },
    /**
     * 生命周期函数--监听页面加载
     */
    bindPickerChange: function(e) {
        var value = e.detail.value;
        
        console.log(this.data.array[value]);
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    onLoad: function(options) {

    },
    bindGetUserInfo(e) {
        var login1 = login();
        var that = this;
        console.log(e.detail.userInfo)
        login1.then(function(loginData) {
          console.log(loginData)
            var userInfo = {
              code: loginData,
                school: that.data.array[that.data.index],
              gender: e.detail.userInfo.gender,
              nickName: e.detail.userInfo.nickName,
              avatarUrl: e.detail.userInfo.avatarUrl
            }
            var wxrq = wx_post_request('/register', userInfo);
            wxrq.then(function(rqdata) {
                //存储sessionId 和expireTime
                rqdata = JSON.parse(rqdata);
                if (rqdata.success) {
                    wx.setStorageSync('sessionId', rqdata.sessionId);
                    wx.setStorageSync('expireTime', rqdata.expireTime);
                    app.globalData.sessionId = rqdata.sessionId;
                    app.globalData.userInfo = e.detail.userInfo;
                    wx.redirectTo({
                        url: '/pages/discover/discover',
                        fail: function() {
                            wx.showToast({
                                title: '加载失败',
                                icon: 'none',
                                duration: 1500
                            })
                        }
                    })
                }
            })
        })

        // console.log(e.detail.userInfo)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})