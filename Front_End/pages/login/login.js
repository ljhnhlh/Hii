// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success:function(res){
        if(res.code){
          console.log(res.code)
          wx.request({
            url: 'http://localhost:3000/login',
            data:{
              code :res.code
            },
            success:function(res){
              console.log(res.data);
            },
            
            fail:function(){
              console.log('login fail')
             wx.redirectTo({
               url: 'pages/login/login',
             })
            }
          })
          wx.showToast({ // 显示Toast

            title: '已发送',

            icon: 'success',

            duration: 1500

          })

        }else{
          console.log('fail')
        }
      },
      fail:function(){
        console.log('fail')
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})