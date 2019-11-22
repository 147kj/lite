//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面初始数据
   */ 
  data: {
    username: "张三",
    qaList: {},
    searchWord:""
  },
  setSearchWord :function(e){
    //console.log(e.detail.value)
    this.setData({ searchWord: e.detail.value})
  },
  searchContent : function(){
    //console.log(this.data.searchWord)
    if (this.data.searchWord!=""){
      wx.navigateTo({
        url: '../searchList/searchList?searchWord=' + this.data.searchWord,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log("页面加载")
    this.onGetOpenid()
    this.getNewList()
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.setData({ searchWord:""})
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
    
  },
  getNewList:function(){
    console.log("刷新列表")
    const db = wx.cloud.database()
    // 查询当前用户所有的 ttl_qa
    db.collection('ttl_qa').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          qaList: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        //console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        // wx.navigateTo({
        //   url: '../userConsole/userConsole',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
      }
    })
  }
})