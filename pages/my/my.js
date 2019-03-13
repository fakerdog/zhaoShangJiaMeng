// pages/my/my.js
const app = getApp();
var server = require("../../utils/server.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restmoney:0,
    joinCount:0,
    receiveCount:0,
    sendoutCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },
  toadvert:function(){
    wx.navigateTo({
      url: '/pages/advertisement/advertisement'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    server.getUser(res => {
      app.globalData.userInfo = res.data.data;
      this.setData({
        restmoney: res.data.data.money,
        joinCount: res.data.data.joinCount,
        receiveCount: res.data.data.receiveCount,
        sendoutCount: res.data.data.sendoutCount,
        issponsor: res.data.data.issponsor
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  //参与的红包
  toparticipbag: function() {
    wx.navigateTo({
      url: "/pages/correlativeactivities/correlativeactivities",
    })
  },
  //已领的红包
  toreceivebag: function() {
    wx.navigateTo({
      url: "/pages/receivebagPage/receivebagPage?",
    })
  },
  //发起的红包
  tolauchbag: function() {
    wx.navigateTo({
      url: "/pages/lauchedPage/lauchedPage",
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})