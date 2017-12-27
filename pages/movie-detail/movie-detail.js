var utils = require("../../utils/utils.js");
var app = getApp();
// pages/movie-detail/movie-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    wx.request({
      url:app.doubanMovieUrl+"/subject/"+id,
      header:{
        "Content-type":"json"
      },
      success:that.processData
    })
  },


  /*
    * 处理请求成功的数据
   */
  processData:function(res){
    console.log(res);

    var movie = {};
    movie.movieImg = res.data.images.medium;
    movie.title = res.data.title;
    movie.originTitle = res.data.original_title;
    movie.country = res.data.countries[0];
    movie.year = res.data.year;
    movie.commentCount = res.data.comments_count; //评论数
    movie.wishCount = res.data.wish_count; //喜欢数
    movie.directors = this.processPerson(res.data.directors); //导演
    movie.casts = this.processPerson(res.data.casts); //影人
    movie.type = res.data.genres.join("、"); //类型
    movie.summary = res.data.summary;  //简介
    movie.castInfo = this.processCastInfo(res.data.casts); //影人信息
    movie.average = res.data.rating.average; //评分
    movie.stars = utils.getStarsList(res.data.rating.stars); //星星数



    this.setData({
      "movie":movie
    })

  },

  /*处理 导演 影人 */
  processPerson:function(list){
    var arr = []
    list.forEach(function(item, index){
      arr.push(item.name);
    })
    return arr.join(" / ");
  },

  /*处理影人信息 */
  processCastInfo:function(list){
    var arr = [];
    list.forEach(function(item, index){
      arr.push({
        name:item.name,
        img:item.avatars.small
      })
    });
    return arr;
  },

  /*点击图片 */
  onImageTap:function(event){
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current:src,
      urls: [src]
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