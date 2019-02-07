// pages/discover/discover.js

var temp = [{ 'a': 1 }, { 'a': 1 }, { 'a': 1 }, { 'a': 1 }];
var tt = 0;
Page({

    /**
     * 页面的初始数据
     */

    data: {
        currentIndex: 0,
        tabname: [{ 'message': '求助' }, { 'message': '快递/外卖' }, { 'message': '企业' }],
        jt: temp,
        ite: [{
                'content': ',mnxc,mdsfjjfdkdkjjdhf',
                'payoff': 'a pan',
                'comment': [{
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    }
                ]

            },
            {
                'content': 'asdfaskjdhsdhdddx,mnxc,mdsfjjfdkdkjjdf',
                'payoff': 'a pan',
                'comment': [{
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    }
                ]

            },
            {
                'content': 'asdfaskjdhsdhdddx,mnxc,mdsfjjfdkdkjjdf',
                'payoff': 'a pan',
                'comment': [{
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    }
                ]

            },
            {
                'content': 'asdfaskjdhsdhdddx,mnxc,mdsfjjfdkdkjjdf',
                'payoff': 'a pan',
                'comment': [{
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    }
                ]

            }
        ]

    },
    lookForUserInfo() {
        wx.navigateTo({
            url: '/pages/Infomation/infomation',
            success: function(res) {
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(123);
    },
    select_nav(e) {
        console.log(temp);
        temp.push({ 'a': tt++ });
        this.setData({
            currentIndex: e.target.dataset.index,
            jt: temp
        });
        this.onLoad();
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
});