//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
      }
    })
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: 'https://i.smallrabbit.xin/api/v1.0/login',
          data: {
            code: res.code
          },
          success: function (res) {
            console.log(res.data.token)
            wx.setStorageSync("token", res.data.token)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        }
      }
    })
  },
  globalData: {
    url: "https://i.smallrabbit.xin"
  }
})