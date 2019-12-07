// pages/dairyPage/dairyPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagList: null
  },
  
  showTagDetail: function(e){
    var _this = this;
    var tag = e.currentTarget.dataset.content;
    //跳转到详细页面
    wx.navigateTo({
       url: '../index/index?tag=' + tag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this; 
    var url = getApp().globalData.url;
    wx.request({
      url: url + "/api/v1.0/get/user/tags",
      header: {
        'Authorization': wx.getStorageSync("token")
      },
      success: function(res){
        _this.setData({
          tagList: res.data
        })
        console.log(res.data)
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