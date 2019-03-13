//app.js
var util = require("./utils/util.js");
const V = "1.0"; //版本

App({

  //appid
  APP_ID: "wx0f919a9a7ed40f52",
  //服务器地址
  CDN_URL: "https://zuji.weixinpy.com/redBagWar/",
  HTTP_SERVER: "https://wxapp.xiguazuji.com/",
  // HTTP_SERVER: "https://tscapp.xiguazuji.com/xgApp/",
  // HTTP_SERVER: "http://192.168.2.183:8080/xgApp/",
  //缓存
  CACHE_PREFIX: "_redBagWar",


  globalData: {
    userInfo: {}
  },

  //小程序启动加载
  onLaunch: function () {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        console.log("有新版本")
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        });
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          wx.showModal({
            title: '更新提示',
            content: '新版本下载失败，请检查网络',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        });
      } else {
        console.log("已经是最新版本了")
      }
    })
  },

  onHide: function () {

  },

  //获取用户信息
  getUserInfo: function (cb) {
    //已经登录，获取用户基本信息
    if (this.globalData.openid) {
      cb(this.globalData.userInfo);
    } else {
      // 登录，获取用户openid
      wx.login({
        success: res => {
          //从开发服务器获取openid
          var code = res.code;
          wx.request({
            url: this.HTTP_SERVER + 'redpacket/JSession/jscode2session.htm',
            method: "POST",
            data: {
              appId: this.APP_ID,
              jscode: code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: res => {
              //回调
              if (typeof cb === "function") {
                this.globalData.userInfo = {};
                this.prepareGlobalData(res.data);

                cb(this.globalData.userInfo);
              }
            },
            fail: function (res) {
              console.log("jscode2session fail");
            },
            //完成一定会执行
            complete: res => {

            }
          });
        }
      });
    }
  },

  //全局数据
  prepareGlobalData: function (resData) {
    var userInfo = resData.data;
    this.globalData.openid = userInfo.openid; //判断用户是否登录
    this.globalData.sessionkey = resData.sessionkey;
    this.globalData.userInfo = userInfo; //用户信息
  },

  //重新绑定用户信息
  rebindUserInfo: function (res, cb) {
    var userInfo = res.detail.userInfo;
    if (userInfo) {
      this.globalData.userInfo.avatarUrl = userInfo.avatarUrl;
      this.globalData.userInfo.nickName = userInfo.nickName;
      this.globalData.userInfo.province = userInfo.province;
      if (typeof cb === "function") {
        cb();
      }
    } else {
      wx.showToast({
        title: '授权失败',
        mask: true,
        image: '../../images/error.png?t=1'
      });
    }
  },

  //根据授权获取用户信息
  getScopeUserInfo: function (cb) {
    var openid = this.globalData.userInfo.openid;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              userInfo.openid = openid;
              //已经授权
              cb(userInfo);
            }
          });
        } else {
          cb(null);
        }
      }
    })
  },

  //获取当前版本号
  getVersion: function () {
    return V;
  },

  //成语的缓存 getter & setter
  getLocalStorage: function (key) {
    key = this.CACHE_PREFIX + V + key;
    return wx.getStorageSync(key);
  },

  //设置缓存
  setLocalStorage: function (key, value) {
    key = this.CACHE_PREFIX + V + key;
    wx.setStorageSync(key, value);
  },

  //删除缓存
  removeLocalStorage: function (key) {
    key = this.CACHE_PREFIX + V + key;
    wx.removeStorage({
      key: key,
      success: function (res) { },
    })
  },

  //获取缓存中今天的缓存
  getTodayStorage: function (key) {
    var dateStr = util.getDateStr(new Date());
    key = this.CACHE_PREFIX + V + key + "_" + dateStr;
    return wx.getStorageSync(key);
  },

  //重置缓存中的今天缓存
  setTodayStorage: function (key, value) {
    var dateStr = util.getDateStr(new Date());
    key = this.CACHE_PREFIX + V + key + "_" + dateStr;
    wx.setStorageSync(key, value);
  }
})
  