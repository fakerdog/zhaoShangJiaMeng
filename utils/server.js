const app = getApp();

//获取首页展示的数据
function getFristActiveData(cb) {
  wx.showLoading({
    title: '数据加载中...',
    mask: true
  });
  var flag = false;
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketActivity/queryForIndex.htm',
    method: "POST",
    data: {},
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}

//获取全部活动的数据
function getAllActiveData(cb) {
  wx.showLoading({
    title: '数据加载中...',
    mask: true
  });
  var flag = false;
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketActivity/queryAll.htm',
    data: {},
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencodedn', // 默认值
      'sessionkey': app.globalData.sessionkey
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}

//根据活动id获取活动详情所有信息
function getactiveDetail(activeid, cb) {
  wx.showLoading({
    title: '数据加载中...',
  })
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketActivity/getById.htm',
    method: "POST",
    data: {
      "id": activeid
    },
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "sessionkey": app.globalData.sessionkey
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res)
      }
    },
    fail: function (res) {

    },
    complete: function (res) {
      wx.hideLoading()
    }
  })
}

//根据活动id获取用户字数数据
function getactiveUserDetail(activeid, cb) {
  wx.showLoading({
    title: '数据加载中...',
  })
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketUserActivity/getByActivityId.htm',
    method: "POST",
    data: {
      "activityid": activeid
    },
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "sessionkey": app.globalData.sessionkey
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res)
      }
    },
    fail: function (res) {  

    },
    complete: function (res) {
      wx.hideLoading()
    }
  })
}

//获取20个头像
function getLuckyDrawHead(cb) {
  wx.showLoading({
    title: '数据加载中...',
  });
  var flag = false;
  wx.request({
    url: 'https://zuji.weixinpy.com/luckyDraw/luckydrawheadjson-v1.json',
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}

//获取用户信息
function getUserInfo(friendopenid,activityid,cb) {
  //已经登录，获取用户基本信息
  // 登录，获取用户openid
  wx.login({
    success: res => {
      //从开发服务器获取openid
      var code = res.code;
      wx.request({
        url: app.HTTP_SERVER + 'redpacket/JSession/jscode2session.htm',
        method: "POST",
        data: {
          appId: app.APP_ID,
          jscode: code,
          friendopenid: friendopenid,
          activityid: activityid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: res => {
          //回调
          if (typeof cb === "function") {
            app.globalData.userInfo = {};
            app.prepareGlobalData(res.data);

            cb(app.globalData.userInfo);
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

//赠送的接口
//根据活动id获取用户字数数据
function giveFriApi(activityid,word,cb) {
  wx.showLoading({
    title: '数据加载中...',
  })
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketWordRecord/giveawayWord.htm',
    method: "POST",
    data: {
      "activityid": activityid,
      "word":word
    },
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "sessionkey": app.globalData.sessionkey
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res)
      }
    },
    fail: function (res) {

    },
    complete: function (res) {
      wx.hideLoading()
    }
  })
}

//接受字的接口
function getWordApi(friendopenid,activityid,word,cb) {
  wx.showLoading({
    title: '数据加载中...',
  })
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketWordRecord/receiveWord.htm',
    method: "POST",
    data: {
      "friendopenid":friendopenid,
      "activityid": activityid,
      "word": word
    },
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "sessionkey": app.globalData.sessionkey
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res)
      }
    },
    fail: function (res) {

    },
    complete: function (res) {
      wx.hideLoading()
    }
  })
}

//赏给他
function giveWordApiFromMe(friendopenid, activityid, word, cb) {
  wx.showLoading({
    title: '数据加载中...',
  })
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketWordRecord/giveawayWordByOpeind.htm',
    method: "POST",
    data: {
      "friendopenid": friendopenid,
      "activityid": activityid,
      "word": word
    },
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "sessionkey": app.globalData.sessionkey
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res)
      }
    },
    fail: function (res) {

    },
    complete: function (res) {
      wx.hideLoading()
    }
  })
}


//参与的红包页面
function toPaticipater(cb) {
  wx.showLoading({
    title: '数据加载中...',
    mask: true
  });
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketActivity/queryAllJoinActivity.htm',
    data: {},
    method: "POST",
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencodedn'
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}

//领取的红包
function toReciverbag(cb) {
  wx.showLoading({
    title: '数据加载中...',
    mask: true
  });
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketActivity/queryAllGetRepacketActivity.htm',
    data: {},
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencodedn',
      'sessionkey': app.globalData.sessionkey
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}

//发起的红包
function toLauchbag(cb) {
  wx.showLoading({
    title: '数据加载中...',
    mask: true
  });
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketActivity/queryAllMyActivity.htm',
    data: {},
    method: "POST",
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencodedn'
      
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}

function redpacketCashForMoeny(activityid, cb, cb2) {
  wx.showLoading({
    title: '红包领取中...',
  });
  wx.login({
    success: res => {
      //从开发服务器获取openid
      var code = res.code;
      wx.request({
        url: app.HTTP_SERVER + 'redpacket/redpacketIssue/redpacketCashForMoeny.htm',
        method: "POST",
        data: {
          activityid: activityid,
          jscode: code
        },
        header: {
          'appid': app.APP_ID,
          'sessionkey': app.globalData.sessionkey,
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (typeof cb === "function") {
            cb(res);

          }
        },
        fail: function (res) {
          if (typeof cb === "function") {
            cb2(res);

          }
        },
        complete: function (res) {
          wx.hideLoading();
        }
      });
    }
  })
}
function getUser(cb){
  wx.showLoading({
    title: '数据加载中...',
    mask: true
  });
  wx.request({
    url: app.HTTP_SERVER + '/redpacket/redpacketUser/getUser.htm',
    data: {},
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencodedn', // 默认值
      'sessionkey': app.globalData.sessionkey
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}
function updateUser(userInfo,cb) {
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketUser/updateUser.htm',
    method: "POST",
    data: {
      nickname: userInfo.nickName,
      avatarurl: userInfo.avatarUrl,
      sex: userInfo.gender
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
    }
  });
}
//获取全部活动的数据
function getreceiveUser(activityid,cb) {
  wx.showLoading({
    title: '数据加载中...',
    mask: true
  });

  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketWithDetail/listDetailByActivityid.htm',
    data: {
      activityid: activityid
    },
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      'sessionkey': app.globalData.sessionkey
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}
//发起新红包活动
function createActivity(activity, tempfile, cb) {
  //上传文件接口
  wx.showLoading({
    title: '数据上传中...',
    mask: true
  });
  wx.uploadFile({
    url: app.HTTP_SERVER + 'redpacket/redpacketActivity/createActivity.htm',
    filePath: tempfile,
    name: 'tempfile',
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'multipart/form-data', // 默认值
    },
    formData: {
      activityName: activity.activityName,
      totalMoney: activity.totalMoney,
      redpacketUpperlimit: activity.redpacketUpperlimit,
      redpacketLowerlimit: activity.redpacketLowerlimit,
      words: activity.words,
      description: activity.description

    },
    success: function (res) {
      var data =JSON.parse(res.data)
      cb(data)
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  })
}

//传输formid
function sendFormid(formid) {
  wx.request({
    url: app.HTTP_SERVER + 'app/commonrest/submitFormid.htm',
    method: "POST",
    data: {
      appId: app.APP_ID,
      formid: formid,
      assistId: 0
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: res => {
      console.log("formid上传成功")
    }
  })
}

//获取system设置
function getSysInfo(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'redpacket/redpacketstaticconfigure/getSysInfo.htm',
    method: "POST",
    data: {
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: res => {
      cb(res)
    }
  })
}

function getAdvertisementJson(cb) {
  wx.showLoading({
    title: '数据加载中...',
  });
  var flag = false;
  wx.request({
    url: app.CDN_URL+'advertisementjson.json',
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) { },
    complete: function (res) {
      wx.hideLoading();
    }
  });
}

module.exports = {
  getAllActiveData: getAllActiveData,
  getFristActiveData: getFristActiveData,
  getLuckyDrawHead,
  getactiveDetail,
  getUserInfo,
  getactiveUserDetail,
  giveFriApi,
  getWordApi,
  giveWordApiFromMe,
  toPaticipater,
  toReciverbag,
  toLauchbag,
  redpacketCashForMoeny,
  getUser,
  updateUser,
  getreceiveUser,
  createActivity,
  sendFormid,
  getSysInfo,
  getAdvertisementJson
}