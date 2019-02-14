// pages/login/login.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {


        // 查看是否授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            console.log(res.userInfo)
                        }
                    })
                }
            }
        })
        wx.login({
            success: function(res) {
                if (res.code) {
                    console.log(res.code)
                    wx.request({
                        url: 'http://localhost:3000/login',
                        data: {
                            code: res.code
                        },
                        header: { 'sessionId': 'sessionId' },
                        success: function(res) {
                            wx.getUserInfo({
                                success: function(res) {
                                    var userInfo = res.userInfo;
                                    console.log(userInfo.nickName)
                                    console.log(userInfo.avatarUrl)
                                }
                            })
                            console.log(res.data);
                            console.log(res.header)
                        },

                        fail: function() {
                            console.log('login fail')
                            wx.redirectTo({
                                url: '/pages/login/login',
                            })
                        }
                    })
                    wx.showToast({ // 显示Toast

                        title: '成功',

                        icon: 'none',

                        duration: 1500

                    })
                } else {
                    console.log('fail  1')
                }
            },
            fail: function(err) {
                console.log(err)
                console.log('fail 2')
            }

        })
    },
    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
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