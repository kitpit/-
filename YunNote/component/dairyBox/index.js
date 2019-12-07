// component/dairyBox/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    date: {
      type: String
    },
    week: {
      type: String
    },
    time: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    temperature: {
      type: String
    },
    message: {
      type: JSON
    },
    deleteStyle: {
      type: String
    },
    turnFlag: {
      type: Boolean
    },
    displayBox: {
      type: String
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    changeDeleteFlag: false
  },

  methods: {
    //跳转到详细页面
    turnToDetail: function () {
      var _this = this;
      var id = _this.data.message.id;
      if (_this.properties.turnFlag){
        wx.navigateTo({
          url: '../../pages/dairyPage/dairyPage?id=' + id
        })
      }
    },

    //删除标签
    deleteBox: function(){
      var _this = this;
      var changeFlag = _this.data.changeDeleteFlag;
      console.log("flag"+ changeFlag)
      if(_this.properties.turnFlag == false){
        if (changeFlag == false) {
            _this.setData({
              deleteStyle: "background-color: blue",
              changeDeleteFlag: true
            })
            //向父组件传值id
            var idMessage = {
              id: _this.properties.message.id,
              cancel: false
            }
            console.log(_this.properties.message.id)
            this.triggerEvent('getId', idMessage)
        } else if (changeFlag == true) {
            _this.setData({
              deleteStyle: "background-color: white",
              changeDeleteFlag: false
            })
            //向父组件传要取消删除的id
            var idMessage = {
              cancel: true, 
              id: _this.properties.message.id
            }
            console.log(_this.properties.message.id)
            this.triggerEvent('getId', idMessage)
        }
      }
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