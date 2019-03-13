// pages/draw/draw.js
const app = getApp();
const utils = require("../../utils/util.js");
const server = require("../../utils/server.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar({})
  },

  /**
   * 更换红包图片
   */
  updatePrizeimg: function () {
    wx.chooseImage({
      count: 1,
      success: res => {
        this.setData({
          showAvatar: false
        })
        wx.navigateTo({
          url: '/pages/cutInside/cutInside?filepath=' + res.tempFilePaths
        })
      }
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
    if (app.globalData.imgurl) {
      // this.onChangeBgImage(app.globalData.imgurl)
      this.setData({
        imgurl: app.globalData.imgurl
      })
    }
  },
  tofromSub: function () {
    var activity = {
      activityName: this.data.activityName,
      totalMoney: this.data.totalMoney,
      redpacketUpperlimit: this.data.redpacketUpperlimit,
      redpacketLowerlimit: this.data.redpacketLowerlimit,
      words: this.data.words,
      description: this.data.description
    }

    var bannerurl = this.data.imgurl;
    if (utils.isEmpty(bannerurl)) {
      wx.showToast(
        {
          title: "请选择活动图片",
          duration: 1500
        }
      )
      return false;
    } else if (utils.isEmpty(activity.activityName)) {
      wx.showToast(
        {
          title: "请输入活动名称",
          duration: 1500
        }
      )
      return false;
    } else if (utils.isEmpty(activity.totalMoney)) {
      wx.showToast(
        {
          title: "请输入红包金额",
          duration: 1500
        }
      )
      return false;
    } else if (utils.isEmpty(activity.redpacketUpperlimit)) {
      wx.showToast(
        {
          title: "请输入红包金额上限",
          duration: 1500
        }
      )
      return false;
    } else if (utils.isEmpty(activity.redpacketLowerlimit)) {
      wx.showToast(
        {
          title: "请输入红包金额下限",
          duration: 1500
        }
      )
      return false;
    } else if (utils.isEmpty(activity.words)) {
      wx.showToast(
        {
          title: "请输入红包集字",
          duration: 1500
        }
      )
      return false;
    }

    if (activity.words.length < 4) {
      wx.showToast(
        {
          title: "请输入4至6之家的字数",
          duration: 1500
        }
      )
      return false;
    }
    if (activity.redpacketLowerlimit < 0.3) {
      wx.showToast(
        {
          title: "不可低于0.3元",
          duration: 1500
        }
      )
      return false;
    }

    server.createActivity(activity, bannerurl, res => {
      if (res.data.status==0){

      }
      console.log(res.data)
      wx.showModal({
        title: '提示',
        content: res.data.description,
        showCancel:false
      })
    })



  },
  inputNameValue: function (e) {
    var value = e.detail.value;
    this.setData({
      activityName: value
    })
  },
  inputWordValue: function (e) {
    var value = e.detail.value;
    this.setData({
      words: value
    })
  },
  inputDescriptionValue: function (e) {
    var value = e.detail.value;
    this.setData({
      description: value
    })
  },
  inputCountValue: function (e) {
    var value = e.detail.value;
    this.setData({
      inputCountValue: value
    })
  },
  inputValue: function (e) {
    var index = e.currentTarget.dataset.num;
    var v2 = e.detail.value;
    var psize;
    if (parseInt(Number(v2)) == Number(v2)) {
      psize = 0;
    } else {
      psize = v2.toString().split(".")[1].length
    }
    if (psize > 2) {
      v2 = Number(v2).toFixed(2);
    }
    if (index == 1) {
      this.setData({
        totalMoney: v2
      });
    } else if (index == 2) {
      this.setData({
        redpacketUpperlimit: v2
      });
    } else if (index == 3) {
      this.setData({
        redpacketLowerlimit: v2
      });
    }

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
    wx.reLaunch({
      url: '../index/index'
    })
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