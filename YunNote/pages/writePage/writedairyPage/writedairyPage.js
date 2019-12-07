// pages/dairyPage/dairyPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelShow: "display: none",
    hiddenModal: true,
    content: null,
    title: null,
    tag: null,
    tagList: [],
    tagListId: null,
  },

  //弹出添加标签框
  addLabel: function () {
    var _this = this;
    _this.setData({
      hiddenModal: false
    })
  },

  //取消添加标签
  cancel: function () {
    var _this = this;
    _this.setData({
      hiddenModal: true
    })
  },

  //删除标签
  deleteLabel: function (e) {
    var _this = this;
    const data = e.currentTarget.dataset;
    _this.setData({
      hiddenDeleteModal: true,
      tagListId: data.id
    })
  },
  //取消删除标签
  cancelDelete: function () {
    var _this = this;
    _this.setData({
      hiddenDeleteModal: false
    })
  },
  confirmDelete: function(){
    var _this = this;
    var deleteTag = _this.data.tagList[_this.data.tagListId];

    console.log("ssssaaaaa" + _this.data.tagListId);
    var afterDeleteList = _this.data.tagList.filter((item) => {
      return item != deleteTag
    })
    _this.setData({
      tagList: afterDeleteList
    })
  },
  //确认添加标签
  confirm: function () {
    var _this = this;
    _this.setData({
      hiddenModal: true
    })

    //将标签添加进数组
    var tag = _this.data.tag;
    console.log(tag)
    if (tag) {
      _this.setData({
        tagList: [..._this.data.tagList, tag]
      });
    }
    console.log(_this.data.tagList)
  },

  addTag: function (e) {
    var _this = this;
    _this.setData({
      tag: e.detail.value
    })
  },
  //展示标签
  showLabel: function () {
    var _this = this;
    _this.setData({
      labelShow: "display: block",
    })
  },

  //隐藏标签
  hideLabel: function () {
    var _this = this;
    _this.setData({
      labelShow: "display: none"
    })
  },
  //获取textarea内的内容
  bindText: function (e) {
    var _this = this;
    _this.setData({
      content: e.detail.value
    })
  },

  bindTitle: function(e){
    var _this = this;
    _this.setData({
      title: e.detail.value
    })
  },
  //发送笔记
  sendDairy: function () {
    var _this = this;
    var content = _this.data.content;
    var title = _this.data.title;
    var url = getApp().globalData.url;
    if (content) {
      wx.request({
        url: url + '/api/v1.0/new/post/Diary',
        method: "POST",
        header: {
          'Authorization': wx.getStorageSync("token")
        },
        data: {
          title: title,
          body: content,
          tag: _this.data.tagList,
          token: wx.getStorageSync("token")
        },
        success: function () {
          console.log("跳转")
          wx.navigateTo({
            url: '../../index/index',
          })
        }
      })
    } else {
      console.log("error");
      wx.showToast({
      title: '内容不能为空',
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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