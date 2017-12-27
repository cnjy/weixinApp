var postDataModule = require("../../data/posts-data.js");

// pages/post-detail/post-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var postId = options.postId || 1;
    this.setData({
      postData:postDataModule.postList[postId],
      postId:postId
    });
    wx.setNavigationBarTitle({
      title:that.data.postData.title
    });

    //读取缓存 判断本文字是否在 收藏中
    wx.getStorage({
      key: 'collectionList',
      success: function(res) {
        if (res.data.indexOf(postId) >= 0) {
          that.setData({
            collected:true
          })
        }
      },
      fail:function(){
        wx.setStorageSync("collectionList", []);
      }
    })
  },


  /*添加或取消收藏收藏 */
  onCollectionTap:function(){
    var collected = this.data.collected;
    var collectionList = wx.getStorageSync("collectionList");

    if (collected) {
      //取消收藏 
      collectionList.splice(collectionList.indexOf(this.data.postId) ,1);

    } else {
      //添加收藏
      collectionList.push(this.data.postId);
    }

    var that = this;
    //更新缓存
    wx.setStorage({
      key: 'collectionList',
      data: collectionList,
      success:function(){
        that.setData({
          collected:!collected
        });

        wx.showToast({
          title: collected ? '取消收藏' : "收藏成功",
          icon:"success",
          duration:2000
        })

      }
    })


  },

  /**分享 
  onShareTap:function(){
   wx.showActionSheet({
     itemList: ["发送给朋友", "分享到朋友圈","发送到QQ","分享到QQ空间"],
   })
  },*/

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
    return {
      
    }
  }
})