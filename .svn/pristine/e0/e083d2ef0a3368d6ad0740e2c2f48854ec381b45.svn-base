const app = getApp();
const server = require("../../utils/server.js");
// pages/correlativeactivities/correlativeactivities.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allAcArr: null,
    haspeople: 6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        server.toPaticipater(res => {
          this.setData({
            allAcArr: res.data.data
          })
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

  tobagDetail: function (e) {
    var activeid = e.currentTarget.dataset.activeid;
    console.log(activeid);
    wx.navigateTo({
      url: '/pages/bagDetail/bagDetail?activeid=' + activeid,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})