function showToast(test) {
    wx.showToast({ // 显示Toast
        title: test,
        icon: 'none',
        duration: 1500
    })
}

module.exports = {
    showToast: showToast
}