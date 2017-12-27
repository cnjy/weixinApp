var utils = require("../../utils/utils.js");
var app = getApp();

// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult:{},
    searchShow:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //获取正在热映
    this.getMovieListData(app.doubanMovieUrl+"/in_theaters?start=0&count=3", "inTheaters", "正在热映");
    //获取即将上映
    this.getMovieListData(app.doubanMovieUrl + "/coming_soon?start=0&count=3", "comingSoon", "即将上映");
    //获取Top250
    this.getMovieListData(app.doubanMovieUrl + "/top250?start=0&count=3", "top250", "TOP250");
    
   
  },


  /*获取电影列表数据 */
  getMovieListData:function(url, key, categoryName){

    var that = this;

    wx.request({
      url: url,
      header: {
        "Content-type": "josn"
      },
      method: "GET",
      dataType: "json",
      success: function (res) {
        console.log(res.data.subjects);
        var movies = [];

        res.data.subjects.forEach(function (item, index) {
          var movie = {};
          var title = item.title;
          if (title.length > 6) {
            title = title.substr(0, 6)+"...";
          }

          movie.id = item.id;
          movie.title = title;
          movie.imageUrl = item.images.small;
          movie.average = item.rating.average;
          movie.stars = utils.getStarsList(item.rating.stars);
          movies.push(movie);
        });


      
        var data = {}
        data[key] = {
          "categoryName": categoryName,
          "movies": movies
        }

        that.setData(data);

      }

    })

  },

  /*点击电影 跳转详情 */
  onMovieTap:function(event){
    var id = event.currentTarget.dataset.id;
   // console.log(id);
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id='+id
    })
  },

  /* 点击加载更多*/
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: '/pages/movie-more/movie-more?cate='+category
    })
  },
 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /*表单获取焦点 */
  bindInputFocus:function(){
    this.setData({
      searchShow:true
    })
  },

  /**表单失去焦点 进行搜索 */
  bindInputBlur:function(event){
    var value = event.detail.value;
    
    this.getMovieListData(app.doubanMovieUrl+"/search?q="+value+"&count=1000", "searchResult", "搜索结果");
  },

  /*关闭搜索界面 */
  onCloseTap:function(){
    this.setData({
      searchShow:false
    })
  }

})