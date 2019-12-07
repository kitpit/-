// pages/dairyPage/dairyPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelShow: "display: none",
    id: null,
    hiddenDeleteModal: true,
    hiddenAddModal: true,
    content: null,
    title: null,
    addtag: null,
    tagList: null,
    tagList1: null,
    tagList2: null,
    tagList3: null,
    message: null,
    tagListId: null
  },

  //弹出添加标签框
  addLabel: function () {
    var _this = this;
    _this.setData({
      hiddenDeleteModal: false
    })
  },

  //取消删除标签
  cancelDelete: function () {
    var _this = this;
    _this.setData({
      hiddenDeleteModal: true
    })
  },

  //取消添加标签
  cancelAdd: function () {
    var _this = this;
    _this.setData({
      hiddenAddModal: true
    })
  },

  //确认添加标签
  confirmAdd: function () {
    var _this = this;
    //将标签添加进数组
    var tag = _this.data.addtag;
    _this.setData({
      hiddenAddModal: true
    })
    var url = getApp().globalData.url;
    wx.request({
      url: url + '/api/v1.0/add/post/' + _this.data.id + '/' + tag,
      method: 'POST',
      header: {
        'Authorization': wx.getStorageSync("token")
      },
      success: function(res){
        console.log("对了")
      }
    })
    console.log("sssssss")
    console.log(tag)
    if(_this.data.tagList1 == null){
      _this.setData({
        tagList1 : tag
      })
    } else if (_this.data.tagList2 == null){
      _this.setData({
        tagList2: tag
      })
    } else if (_this.data.tagList3 == null){
      _this.setData({
        tagList3: tag
      })
    }

  },
  //确认删除标签
  confirmDelete: function () {
    var _this = this;
    var url = getApp().globalData.url;
    _this.setData({
      hiddenDeleteModal: true
    })

    //删除标签内容

    if (_this.data.tagListId == 1) {
      console.log("ssssss")
      wx.request({
        url: url + "/api/v1.0/delete/post/" + _this.data.id + "/" + _this.data.tagList1,
        method: "DELETE",
        header: {
          'Authorization': wx.getStorageSync("token")
        },
        success: function(res){
          console.log(res)
          _this.setData({
            tagList1: null
          })
        }
      })
    } else if (_this.data.tagListId == 2){
      wx.request({
        url: url + "/api/v1.0/delete/post/" + _this.data.id + "/" + _this.data.tagList2,
        method: "DELETE",
        header: {
          'Authorization': wx.getStorageSync("token")
        },
        success: function (res) {
          console.log(res)
          _this.setData({
            tagList2: null
          })
        }
      })
    } else if (_this.data.tagListId == 3){
      wx.request({
        url: url + "/api/v1.0/delete/post/" + _this.data.id + "/" + _this.data.tagList3,
        method: "DELETE",
        header: {
          'Authorization': wx.getStorageSync("token")
        },
        success: function (res) {
          console.log(res)
          _this.setData({
            tagList3: null
          })
        }
      })
    }


  },

  addTag: function (e) {
    var _this = this;
    console.log(e.detail.value)
    _this.setData({
      addtag: e.detail.value
    })
  },
  //展示标签
  deleteLabel: function (e) {
    var _this = this;
    const data = e.currentTarget.dataset;
    _this.setData({
      hiddenDeleteModal: false,
      tagListId: data.id
    })
  },



  showLabel: function(){
    var _this = this;
    _this.setData({
      hiddenAddModal: false,
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

  bindTitle: function (e) {
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
        url: url + '/api/v1.0/edit/post/' + _this.data.id,
        method: "PUT",
        header: {
          'Authorization': wx.getStorageSync("token")
        },
        data: {
          title: title,
          body: content, 
          token: wx.getStorageSync("token")
        },
        success: function () {
          wx.navigateBack({

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
    var _this = this;
    var url = getApp().globalData.url;
    _this.setData({
      id: options.id
    })
    wx.request({
      url: url + '/api/v1.0/get/post/' + options.id,
      header: {
        'Authorization': wx.getStorageSync("token")
      },
      success: function (res) {
        _this.setData({
          title: res.data.title,
          content: res.data.body,
        })
        if(res.data.tags){
          _this.setData({
            tagList1: res.data.tags[0],
            tagList2: res.data.tags[1],
            tagList3: res.data.tags[2]
          })
        }
        console.log(res.data);
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