var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/js/we-cropper.js")), e = wx.getSystemInfoSync();

if (e.screenHeight - e.windowHeight < 100) o = 60; else var o = 5;

var r = e.windowWidth, a = e.windowHeight - o, i = getApp();

Page({
    data: {
        cropperOpt: {
            id: "cropper",
            width: r,
            height: a,
            scale: 2.5,
            src: "",
            zoom: 8,
            cut: {
                x: (r - 300) / 2,
                y: (a - 300) / 2,
                width: 300,
                height:150
            }
        }
    },
    touchStart: function(t) {
        this.wecropper.touchStart(t);
    },
    touchMove: function(t) {
        this.wecropper.touchMove(t);
    },
    touchEnd: function(t) {
        this.wecropper.touchEnd(t);
    },
    getCropperImage: function() {
        this.wecropper.getCropperImage(function(t) {
          i.globalData.imgurl=t;
            t && (wx.navigateBack({
                delta: 1
            }));
        });
    },
    onLoad: function(e) {
        var o = e.filepath ? e.filepath : "";
        if ("" != o) {
            this.data.cropperOpt.src = o;
            var r = this.data.cropperOpt;
            new t.default(r).on("ready", function(t) {}).on("beforeDraw", function(t, e) {}).updateCanvas();
        } else wx.navigateBack({
            delta: 1
        });
    }
});