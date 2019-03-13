// pages/advertisement/advertisement.js
var app = getApp();
var server = require("../../utils/server.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    server.getAdvertisementJson(res=>{
      this.setData({
        minis:res.data
      })
    })
  },

  showCodeImage:function(e){
    wx.previewImage({
      current: this.data.minis[e.target.dataset.index].codeimg, // 当前显示图片的http链接
      urls: [this.data.minis[e.target.dataset.index].codeimg] // 需要预览的图片http链接列表
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})