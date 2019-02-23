// pages/create/create.js
var mod = require('../../moduel/moduel.js')
var url = 'http://localhost:8000'

function chooseImgPromise(that) {
    return new Promise(function(resolve, reject) {
        wx.chooseImage({
            count: 9, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function(res) {
                // res = JSON.parse(res)
                console.log(res.tempFilePaths);
                that.setData({
                    imageItem: res.tempFilePaths
                })
            },
            fail: function(err) {
                console.log(err);
                mod.showToast('选择图片失败')

            }
        })
    })
}

function uplfile(urlPath, filePath) {
    return new Promise(function(resolve, reject) {
        wx.uploadFile({
            url: url + urlPath,
            filePath: filePath,
            name: 'name',
            // header: {}, // 设置请求的 header
            // formData: {}, // HTTP 请求中其他额外的 form data
            success: function(res) {
                console.log(res);
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
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    chooseImage() {
        var that = this;
        var p = chooseImgPromise(that);
    },
    tijiao() {
        uplfile('/ULFile', this.data.imageItem[0]);
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