// pages/bagDetail/bagDetail.js
const server = require("../../utils/server.js");
const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  destWidth: 980,
  destHeight: 1869,
  data: {
    bagLaunch: "",
    showAssistModule: false,
    askforModule: false,
    sendModule: true,
    restMoney: 306,
    sponsorComp: "",
    notcollected: true,
    showFirstModule: false,
    activeid: "",
    enoughThe: false,
    words: [],
    description: "",
    systemword: "颦",
    headflag: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    //获取用户系统
    wx.getSystemInfo({
      success: res => {
        var iphone = true;
        var system = res.system;
        if (system.indexOf("iOS") > -1) {
          iphone = true;
        } else {
          iphone = false;
        }
        this.setData({
          iphone: iphone
        });
      }
    });
    server.getLuckyDrawHead(res => {
      var head = res.data.head;
      if (head) {
        util.getRandomArrayElementsHead(head, 8, res => {
          this.setData({
            drawhead: res
          })
        })
      }
    })
    var activeid = Number(options.activeid);
    this.data.activeid = activeid
    var friendopenid = options.targetid;
    this.data.friendopenid = friendopenid;
    var keyword = options.tapword;
    if (!friendopenid) {
      friendopenid = ""
      this.setData({
        goindex: false
      })
    } else {
      this.setData({
        goindex: true
      })
    }
    //获取当前登录用户
    server.getUserInfo(friendopenid, activeid, res => {
      this.data.isnew = res.isnew;
      var userInfo = app.globalData.userInfo;

      // 获取活动的详细信息
      server.getactiveDetail(activeid, res => {
        
        var res = res.data.data;
        this.data.activityStatus = res.status;
        if (this.data.activityStatus) {
          this.setData({
            notcollected: false,
            lingqutext: "活动已结束"
          })
        } else {
          this.setData({
            lingqutext: "领取随机红包"
          })
        }

        var words = (res.words).split(",");
        this.setData({
          gotMoney: res.gotMoney,
          surplusMoney: res.surplusMoney,
          bannerurl: res.bannerurl,
          sponsorDescription: res.sponsorDescription,
          activityName: res.activityName,
          sponsorAppname: res.sponsorAppname,
          description: res.description,
          totalMoney: res.totalMoney,

        })

        //获取用户文字的个数
        server.getactiveUserDetail(activeid, res => {
          
          if (res.data.data.status == 0) {
            this.setData({
              lingqutext: "邀请好友一起集字",
              notcollected: true
            })
          } else if (res.data.data.status == 1) {
            this.setData({
              lingqutext: "领取随机红包",
              notcollected: false
            })
          } else if (res.data.data.status == 2) {
            this.setData({
              lingqutext: "已领"+res.data.data.money+"元，分享好友",
              notcollected:false
            })
          }
          var words = res.data.data.words;
          this.setData({
            words: words
          })

          if (options.sharetype) {
            var sharetype = options.sharetype;
            // if (!this.data.showFirstModule){
            this.setData({
              showAssistModule: true
            })
            console.log(sharetype)
            switch (sharetype) {
              case "askfor":
                this.setData({
                  askforModule: true,
                  sendModule: false,
                  askword: keyword
                })
                break;
              case "send":
                this.setData({
                  askforModule: false,
                  sendModule: true,
                  sendword: keyword
                })
                break;
            }

            // }
          }
          if (this.data.activityStatus == 0 && res.data.data.word != "") {
            this.setData({
              showFirstModule: true,
              systemword: res.data.data.word
            })
          }
        })
      })
    });

    wx.showShareMenu({
      withShareTicket: true
    });
  },
  togoredpacket() {
    wx.navigateTo({
      url: '/pages/gotredpacket/gotredpacket?activity=' + this.data.activeid
    })
  },
  toindex() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  //关闭赏给他弹窗
  closeAskModule: function () {
    this.setData({
      showAssistModule: false,
      askforModule: false
    })
  },

  //赏给你
  accept: function () {
    var friendopenid = this.data.friendopenid;
    var activeid = this.data.activeid;
    var word = this.data.askword;
    server.giveWordApiFromMe(friendopenid, activeid, word, res => {
      if (res.data.data == 0) {
        this.setData({
          enoughThe: false
        })
        //字数余额不足
        wx.showModal({
          title: "提示",
          content: '您的字数不够了',
          showCancel: false
        })
      } else if (res.data.data == 2) {
        this.setData({
          enoughThe: false
        })
        wx.showModal({
          title: "提示",
          content: '自己可没办法给自己赠送哦',
          showCancel: false
        })
      } else {
        //赠送
        this.iscollected();
        var askword = this.data.askword;
        console.log(askword);
        var words = this.data.words;
        console.log(words);
        for (var i = 0; i < words.length; i++) {
          if (words[i].key == askword) {
            words[i].value -= 1;
            break;
          }
        }
        this.setData({
          words: words
        })
      }
      this.setData({
        showAssistModule: false,
        askforModule: false
      })
    })
  },

  //关闭第一次弹窗
  closeFirstMo: function () {
    this.setData({
      showFirstModule: false
    })

  },

  //愉快收下
  hapytake: function () {
    var friendopenid = this.data.friendopenid;
    var activeid = this.data.activeid;
    var sendword = this.data.sendword;
    var that = this;
    server.getWordApi(friendopenid, activeid, sendword, res => {
      switch (res.data.data) {
        case 0:
          wx.showModal({
            title: '提示',
            content: '当前字已被领取',
            showCancel: false
          })
          break;
        case -1:
          wx.showModal({
            title: '提示',
            content: '服务器繁忙',
            showCancel: false
          })
          break;
        case 1:
          that.iscollected();
          wx.showToast({
            title: '已成功收下',
          })
          var words = this.data.words;
          for (var i = 0; i < words.length; i++) {
            if (words[i].key == sendword) {
              words[i].value += 1
              break;
            }
          }
          this.setData({
            words: words
          })


      }
    })

    this.setData({
      showAssistModule: false,
      sendModule: false
    })
  },

  iscollected: function () {
    server.getactiveUserDetail(res => {
      if (res.data.data.status == 0) {
        this.setData({
          lingqutext: "邀请好友一起集字",
          notcollected: true
        })
      } else if (res.data.data.status == 1) {
        this.setData({
          lingqutext: "领取随机红包",
          notcollected: false
        })
      } else if (res.data.data.status == 2) {
        this.setData({
          lingqutext: "已领"+res.data.data.money+"元，分享好友",
          notcollected: true
        })
      }
      var words = res.data.data.words;
      this.setData({
        words: words
      })
    })
  },
  withdraw: function (e) {
    if (typeof (e.detail.userInfo) == "undefined") { //授权失败
      wx.showToast({
        title: '请授权',
      })
      return;
    } else {
      if (app.globalData.userInfo.nickname==""){
        //授权成功,更新用户信息
        server.updateUser(e.detail.userInfo, res => {
          app.globalData.userInfo.nickname = e.detail.userInfo.nickName
          app.globalData.userInfo.avatarurl = e.detail.userInfo.avatarUrl
          app.globalData.userInfo.sex = e.detail.userInfo.gender
        })
      }
    }

    server.redpacketCashForMoeny(this.data.activeid, res => {
      switch (res.data.data) {
        case 6: wx.showModal({
          title: '提示',
          content: '服务器繁忙，请稍后再试',
          showCancel: false
        }); break;
        case 5:
        case 4: wx.showModal({
          title: '提示',
          content: '活动已经结束',
          showCancel: false
        }); break;
        case 3: wx.showModal({
          title: '提示',
          content: '您已经领过红包了，不可重复领取',
          showCancel: false
        }); break;
        case 2: wx.showModal({
          title: '提示',
          content: '字没有集齐，无法领取',
          showCancel: false
        }); break;
        case 1: wx.showModal({
          title: '提示',
          content: '服务器异常，请稍后再试',
          showCancel: false
        }); break;
        case 0:
          //赠送
          this.iscollected();
          wx.showModal({
            title: '提示',
            content: '领取成功，1~3个工作日会打入您的微信零钱中',
            showCancel: false
          }); break;
      }
    })
  },

  //弹出分享弹窗
  showShare: function (e) {
    if (typeof (e.detail.userInfo) == "undefined") { //授权失败
      wx.showToast({
        title: '请授权',
      })
      return;
    } else {
      if (app.globalData.userInfo.nickname == "") {
        //授权成功,更新用户信息
        server.updateUser(e.detail.userInfo, res => {
          app.globalData.userInfo.nickname = e.detail.userInfo.nickName
          app.globalData.userInfo.avatarurl = e.detail.userInfo.avatarUrl
          app.globalData.userInfo.sex = e.detail.userInfo.gender

          var userhasnum = e.target.dataset.tapcla;
          var tapword = e.target.dataset.tapword;
          if (userhasnum == 0) {
            this.setData({
              showShareflag: true,
              sharetype: "askfor",
              shareword: tapword
            })
          } else {
            this.setData({
              showShareflag: true,
              sharetype: "send",
              shareword: tapword
            })
          }
        })
      }else{
        var userhasnum = e.target.dataset.tapcla;
        var tapword = e.target.dataset.tapword;
        if (userhasnum == 0) {
          this.setData({
            showShareflag: true,
            sharetype: "askfor",
            shareword: tapword
          })
        } else {
          this.setData({
            showShareflag: true,
            sharetype: "send",
            shareword: tapword
          })
        }
      }
    }

    
  },
  //关闭分享弹窗
  closeShowShare:function(){
    this.setData({
      showShareflag: false
    })
  },
  //提交formid
  formSubmit:function(e){
    server.sendFormid(e.detail.formId)
  },




  //点击开始画图
  again: function () {
    var that = this;
    wx.showLoading({
      title: '图片生成中...',
      mask: true
    });
    var that = this;
    if (that.data.headflag) {
      wx.getImageInfo({
        src: app.CDN_URL + "Qrcode.jpg",
        success: function (res1) {
          that.data.acode = res1.path;
              that.prepareDrawCtx();
              //显示图片
              setTimeout(function () {
                that.drawImageShow(res => {
                  that.setData({
                    showModalStatus: true,
                    hiddenCanvas: true,
                    headflag: false,
                    imagePath: res.tempFilePath,
                  });
                })
              }, 500)
        }
      })
    } else {
      that.prepareDrawCtx();
      setTimeout(function () {
        that.drawImageShow(res => {
          that.setData({
            showModalStatus: true,
            hiddenCanvas: true,
            imagePath: res.tempFilePath
          });
        });
      }, 500)
    }
  },


  //canvas画图
  prepareDrawCtx: function () {
    this.setData({
      hiddenCanvas: false
    });
    const ctx = wx.createCanvasContext('shareCanvas');
    var componyname = this.data.sponsorAppname;
    var totalMoney = this.data.totalMoney;
    ctx.drawImage("../../images/canvasbg.png",0,0,this.destWidth,this.destHeight);
    ctx.textAlign = 'center';
    ctx.setFillStyle("#fff");
    ctx.setFontSize(40);
    ctx.fillText(componyname, 490, 208);
    ctx.setFontSize(50);
    ctx.fillText("发起了一个抽奖活动", 490, 300);
    ctx.drawImage("../../images/bg-top.jpg", 60, 440, 860, 480);
    ctx.save();
    ctx.beginPath();
    ctx.setFontSize(52);
    ctx.setFillStyle("#000");
    ctx.setTextAlign("left");
    ctx.fillText("红包金额：" + totalMoney+"元", 68, 1060);
    ctx.drawImage(this.data.acode, 360, 1250, 300, 300);

    //主要图片绘制end
    //底部end
    this.context = ctx;
  },


  //画图
  drawImageShow: function (cb) {
    //图片显示
    var that = this;
    var ctx = that.context;
    ctx.draw(false, drawRes => {
      if (that.data.iphone) {
        wx.canvasToTempFilePath({
          destWidth: that.destWidth,
          destHeight: that.destHeight,
          width: that.destWidth,
          height: that.destHeight,
          canvasId: 'shareCanvas',
          success: function (res) {
            if (cb) {
              cb(res);
            }
          },
          complete: function (res) {
            wx.hideLoading();
          }
        });
      } else {
        setTimeout(function () {
          wx.canvasToTempFilePath({
            destWidth: that.destWidth,
            destHeight: that.destHeight,
            width: that.destWidth,
            height: that.destHeight,
            canvasId: 'shareCanvas',
            success: function (res) {
              if (cb) {
                cb(res);
              }
            },
            complete: function (res) {
              wx.hideLoading();
            }
          });
        }.bind(this), 300);
      }
    });
  },

  hiddenAssistModule:function(){
    this.setData({
      showAssistModule:false
    })
  },

  hiddenshreflag:function(){
    this.setData({
      showShareflag:false
    })
  },
  hiddenFirstModule:function(){
    this.setData({
      showFirstModule:false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    var that = this;
    var title="快来和我一起抢红包！"
    if (e.from === 'button') {
      var activeid = this.data.activeid;
      var tapword = this.data.shareword;

      var openid = app.globalData.openid;
      var sharetype = this.data.sharetype;
      if (sharetype&&sharetype == "askfor") {
        title = '帮帮我领红包，还差一个"'+ tapword+'"字'
      } else if(sharetype&&sharetype=="send"){
        title = '送你一个"' + tapword+'"字，祝你领红包'
        server.giveFriApi(activeid, tapword, res => {
          switch (res.data.data) {
            case -1:
              wx.showModal({
                title: '提示',
                content: '请求异常',
                showCancel: false
              })
              break;
            case 0:
              wx.showModal({
                title: '提示',
                content: '字数不足',
                showCancel: false
              })
              break;
            case 1:
              wx.showModal({
                title: '提示',
                content: '赠送成功，快去提醒你的小伙伴领取吧',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
              that.iscollected();
          }
        })
      }
      return {
        imageUrl: "",
        title: title,
        path: '/pages/bagDetail/bagDetail?sharetype=' + sharetype + '&tapword=' + tapword + '&activeid=' + activeid + '&targetid=' + openid
      }
    }
  }
})