//引入数据的模块
var postDataModule = require("../../data/posts-data.js");
// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:postDataModule.postList
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
  
  },

  /*跳转到文字详情页 */
  getPostDetail:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?postId='+postId
    })
  }
})