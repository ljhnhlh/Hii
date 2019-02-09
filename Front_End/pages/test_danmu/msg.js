// templeate/msg.js
var page = undefined;
var doommList = [];
var showList = [];
class Doomm {
    constructor(id, text, top, time, color) {
        this.top = top;
        this.text = text;
        this.time = time;
        this.color = color;
        this.display = true;
        let that = this;
        this.id = id;
        setTimeout(function() {
                var id = that.id;
                doommList[id].push(that);
                showList[id].splice(showList[id].indexOf(that), 1); //动画完成，从列表中移除这项
                showList.push(doommList[id].slice(0, 1));
                doommList[id].shift();
                page.setData({
                    showList: showList
                })
                console.log(id);

            }, this.time * 1000) //定时器动画完成后执行。
    }
}

function getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}

Page({

    openDanmu() {
        var ite_temp = this.data.ite;
        // console.log(ite_temp);

        ite_temp.forEach(e => {
            var id = e.id;
            doommList[id] = new Array();
            e.comment.forEach(el => {
                doommList[id].push(new Doomm(id, el.commentText, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()))
            })

        });
        // console.log(doommList);

        var t = 0;
        //初始化，使得一开始就有3条
        ite_temp.forEach(e => {
            var id = e.id;
            showList[id] = new Array();
            doommList[id].forEach(el => {


                showList[id].push(el);


            })

            doommList[id].splice(0, 3);
            console.log(showList[id]);
            console.log(doommList[id]);
        })

        this.setData({
            showList: showList,
            open: true
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        showList: [],
        ite: [{
                'id': 0,
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
                        'commentText': 'adfasfffffffffffffffffffffffffffffffffffffffffffffffffffffffsadfds'
                    },
                    {
                        'user1': 'u1',
                        'user2': 'u2',
                        'commentText': 'adfasfsadfds'
                    }
                ]

            },
            {
                'id': 1,
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
                'id': 2,
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
                'id': 3,
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
        ],
        open: true
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
        page = this;
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