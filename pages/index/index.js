//index.js
//获取应用实例
const server = require("../../utils/server.js");
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onPullDownRefresh(){
    wx.stopPullDownRefresh();
    server.getFristActiveData(res => {
      this.setData({
        friAct: res.data.data
      })

    });
  },
  onLoad: function () {
    app.getUserInfo(res=>{
      server.getFristActiveData(res => {
        this.setData({
          friAct: res.data.data
        })

      });
    });
    //分享
    wx.showShareMenu({
      withShareTicket: false
    });
  },
  tobagDetail: function (e) {
    var activeid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/bagDetail/bagDetail?activeid=' + activeid,
    })
  },
  //跳转到全部活动列表
  toAllActivity :function(){
    wx.navigateTo({
      url: '/pages/allActives/allActives'
    })
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tohelp:function(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  //用户分享
  onShareAppMessage: function () {
    return {
      title: '红包大作战',
      path: '/pages/index/index'
    }
  },
})
