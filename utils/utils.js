function getStarsList(stars){
  var number = Math.round(stars / 10)
  var res = [];
  for (var i = 1; i <= 5; i ++) {
    if (i <= number) {
      res.push(1);
    } else {
      res.push(0);
    }
  }
  return res;
}

/**请求电影数据 */
function requestMovie(url, callback){
  wx.request({
    url:url,
    header:{
      "Content-type":"json"
    },
    success:callback
  })
}

module.exports = {
  getStarsList:getStarsList,
  requestMovie:requestMovie
}