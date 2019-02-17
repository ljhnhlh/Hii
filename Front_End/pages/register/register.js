// pages/register/register.
var url = 'http://localhost:3000'

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

function wx_get_request(pathname, data) {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: url + pathname,
            data: data,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
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
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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