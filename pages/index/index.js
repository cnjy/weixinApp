var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"我的小程序",
    a:100,
    b:200,
    itemList:["小艳艳","大艳艳","艳艳的妹妹","艳艳的姐姐","艳艳的表妹"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success:function(res){
       that.setData(res.userInfo);
      },
      fail:function(){
        that.setData({
          "avatarUrl":"/images/avatar/5.png",
          "nickName":"游客"
        })
      }
    })  
  },

  startPage:function(){
    wx.switchTab({
      url:"/pages/posts/posts"
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