var app = getApp();
var utils = require("../../utils/utils.js");

// pages/movie-more/movie-more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //更改导航栏标题
    wx.setNavigationBarTitle({
      title: options.cate,
    });

    var that = this;

    var url = "";
    switch(options.cate){
      case "正在热映": url = app.doubanMovieUrl+"/in_theaters";break;
      case "即将上映": url = app.doubanMovieUrl+"/coming_soon"; break;
      case "TOP250": url = app.doubanMovieUrl+"/top250"; 
      break;
    }

    this.setData({
      url:url,
      start:0
    })

    utils.requestMovie(url, this.processData);
  },

  processData:function(res){
    var movies = [];

    res.data.subjects.forEach(function(item, index){
      var movie = {};
      var title = item.title;
      if (title.length > 6) {
        title = title.substr(0, 6)+"...";
      }
      movie.id = item.id;
      movie.imageUrl = item.images.medium;
      movie.title = title;
      movie.average = item.rating.average;
      movie.stars = utils.getStarsList(item.rating.stars);
      movies.push(movie);
    });

    if (this.data.start === 0) {
      var totalMovies = movies;
    } else {
      var totalMovies = this.data.movies.concat(movies)
    }

    this.setData({
      "movies":totalMovies
    });

    this.data.start += 20;


    //隐藏加载样式
    wx.hideNavigationBarLoading();

    //停止下拉刷新
    wx.stopPullDownRefresh();
  },

  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //下拉刷新
    wx.showNavigationBarLoading();
    this.data.start = 0;
    utils.requestMovie(this.data.url, this.processData);

  },

  /**
   * 页面上拉触底事件的处理函数 上拉加载
   */
  onReachBottom: function () {
    //显示加载
    wx.showNavigationBarLoading();
    utils.requestMovie(this.data.url+"?start="+this.data.start+"&count=20", this.processData);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**点击电影跳转详情 */
  onMovieTap:function(event){
    var id = event.currentTarget.dataset.id;
    //console.log(id);
    wx.navigateTo({
      url:"/pages/movie-detail/movie-detail?id="+id
    })

  }
})