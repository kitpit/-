// pages/dairyPage/dairyPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteChooseStyle: "display: none",
    showTypeFlag: "display: none",
    sousouFlag: "display: none",
    listData: null,
    pageType: "日记本",
    sousouContent: null,
    deleteStyle: "display: none",
    turnFlag: true,
    headerStyle: "display: block",
    headerDeleteStyle: "display: none",
    deleteIdList: [],
    displayBox: null,
  },
  //选择类型
  showNoteChoose: function(){
    var _this = this;
    _this.setData({
      noteChooseStyle: "display: block"
    })
  },
  //隐藏选择类型
  hideNoteChoose: function(){
    var _this = this;
    _this.setData({
      showTypeFlag: "display:none"
    })
    console.log("ssss")
  },

  //显示搜索框
  showSousou: function(){
    var _this = this;
    _this.setData({
      sousouFlag: "display: block"
    })
  },
  //隐藏显示框
  hideSousou: function(){
    this.setData({
      sousouFlag: "display: none"
    })
  },
  //显示type
  showType: function(){
    var _this = this;
    _this.setData({
      showTypeFlag: "display: block"
    })
  },
  //清楚选择类型
  clearNoteChoose: function(){
    var _this = this;
    _this.setData({
      noteChooseStyle: "display: none"
    })
  },
  //跳转到笔记页
  returnNote: function(){
    wx.navigateTo({
      url: '../writePage/writenotePage/writenotePage',
    })
  },  

  //跳转到标签
  turnTag: function(){
    wx.navigateTo({
      url: '../labelPage/labelPage',
    })
  },

  //跳转到时光轴
  turnTimeLine: function(){
    wx.navigateTo({
      url: '../timelinePage/timelinePage',
    })
  },
  //跳转到日记页
  returnDairy: function(){
    wx.navigateTo({
      url: '../writePage/writedairyPage/writedairyPage',
    })
  },

  //跳转到备忘录
  returnForget: function(){
    wx.navigateTo({
      url: '../writePage/writeforgPage/writeforgPage',
    })
  },

  //GMT时间转换
  GMTToStr: function(time) {
    let date = new Date(time)
    let Str = date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' +
      date.getDate() + ' ' +
      date.getHours() + ':' +
      date.getMinutes() + ':' +
      date.getSeconds()
    return Str
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.tag)
    var turnTag = options.tag
    //获取日记
    var _this = this;
    var url = getApp().globalData.url;
    var token = wx.getStorageSync("token");
    console.log(_this.data.listData)
    //发送请求
    if(!options.tag){
      wx.request({
        url: url + '/api/v1.0/get/posts/by-kind',
        header: {
          'Authorization': wx.getStorageSync("token")
        },
        data: {
          page: 1,
          kind: "Diary"
        },
        success: (res) => {
          if (res.data.data != null) {
            try {
              for (var i = 0; i < res.data.data.length; i++) {
                res.data.data[i].week = _this.weekChange(res.data.data[i].week)
              }
            }catch(e){
              console.log(e);
            }
            _this.setData({
              listData: res.data.data
            })
          }
        }
      })
    }else{
      console.log("对了")
      _this.setData({
        pageType: "标签"
      })
      wx.request({
        url: url + '/api/v1.0/get/posts/by-tag',
        header: {
          'Authorization': wx.getStorageSync("token")
        },
        data: {
          page: 1,
          tag: turnTag
        },
        success: (res) => {
          if (res.data.data != null) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].week = _this.weekChange(res.data.data[i].week)
            }
            _this.setData({
              listData: res.data.data
            })
            console.log(_this.data.listData)
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
 

  //跳转到日记本
  getDairy: function(){
    var _this = this;
    var url = getApp().globalData.url;
    wx.request({
      url: url + '/api/v1.0/get/posts/by-kind',
      header: {
        'Authorization': wx.getStorageSync("token")
      },
      data: {
        page: 1,
        kind: "Diary"
      },
      success: (res) => {
        if (res.data.data != null) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].week = _this.weekChange(res.data.data[i].week)
          }
          _this.setData({
            listData: res.data.data,
            pageType: "日记本"
          })
        }
      }
    })
  },
  //得到搜索的内容
  getSousouContent: function(e){
    var _this = this;
    _this.setData({
      sousouContent: e.detail.value
    })
  },

  //搜索
  searchBox: function(){
    var _this = this;
    var url = getApp().globalData.url;
    wx.request({
      url: url + '/api/v1.0/search/post',
      header: {
        'Authorization': wx.getStorageSync("token")
      },
      data: {
        kwargs: _this.data.sousouContent,
        page: 1
      },
      success: function(res){
        console.log(res)
        if (res.data.data != null) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].week = _this.weekChange(res.data.data[i].week)
          }
          _this.setData({
            listData: res.data.data,
            pageType: "搜索"
          })
        }
      }
    })

  },
  getForget: function(){
    //得到备忘录的
    var url = getApp().globalData.url;
    var _this = this;
    wx.request({
      url: url + '/api/v1.0/get/posts/by-kind',
      header: {
        'Authorization': wx.getStorageSync("token")
      },
      data: {
        page: 1,
        kind: "Memorandum"
      },
      success: (res) => {
        console.log(res)
        if (res.data.data != null) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].week = _this.weekChange(res.data.data[i].week)
          }
          console.log(res.data.data)
          _this.setData({
            listData: res.data.data,
            pageType: "备忘录"
          })
        }
      }
    })
  },
  //星期筛选
  weekChange: function(item){
    switch(item){
      case "Monday": 
        return "星期一";
        break;
      case "Tuesday":
        return "星期二";
        break;
      case "Wednesday":
        return "星期三";
        break;
      case "Thursday":
        return "星期四";
        break;
      case "Friday":
        return "星期五";
        break;
      case "Saturday":
        return "星期六";
        break;
      case "Sunday":
        return "星期天";
        break;
    }
  },

  //删除内容
  deleteChoose: function(){
    var _this = this;
    _this.setData({
      deleteStyle: "display: block",
      turnFlag: false,
      headerStyle: "display: none",
      headerDeleteStyle: "display: block", 
    })
  },
  cancelDelete: function(){
    var _this = this;
    _this.setData({
      deleteStyle: "display: none",
      turnFlag: true,
      headerStyle: "display: block",
      headerDeleteStyle: "display: none"
    })
  },
  //将选择的id放进数组
  getId: function(e){
    
    var _this = this;

    if(e.detail.cancel == false){
      _this.setData({
        deleteIdList: [..._this.data.deleteIdList, e.detail.id]
      })
      console.log(_this.data.deleteIdList)
    }else if(e.detail.cancel == true){
      _this.setData({
        deleteIdList: _this.data.deleteIdList.filter((item)=>{
          if(item != e.detail.id){
            return item
          }
        })
      })
      console.log(_this.data.deleteIdList)
    }
  },
  deleteAll: function(){
    var url = getApp().globalData.url;
    var _this = this;
    wx.request({
      url: url + "/api/v1.0/delete/posts",
      header: {
        'Authorization': wx.getStorageSync("token")
      },
      method: "DELETE",
      data: {
        id: _this.data.deleteIdList
      },
      success: function(res){
        console.log(res)
        wx.request({
          url: url + '/api/v1.0/get/posts/by-kind',
          header: {
            'Authorization': wx.getStorageSync("token")
          },
          data: {
            page: 1,
            kind: "Diary"
          },
          success: (res) => {
            if (res.data.data != null) {
              for (var i = 0; i < res.data.data.length; i++) {
                res.data.data[i].week = _this.weekChange(res.data.data[i].week)
              }
              _this.setData({
                listData: res.data.data,
                headerDeleteStyle: "display: none",
                headerStyle: "display: block",
                deleteStyle: "display: none"
              })
            }
          }
        })
      }
    })
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