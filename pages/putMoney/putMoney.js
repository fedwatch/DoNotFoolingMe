import util from '../../utils/util'

var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
//获取系统信息
wx.getSystemInfo({
  success: function (res) {
    canvasw = res.windowWidth;//设备宽度
    canvash = res.windowHeight;
    console.log(canvasw)
    console.log(canvash)
  }
});



Page({
  data: {
    src: "",
    imageUrl:""
  },


  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  canvasStart: function (event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
  },
  canvasMove: function (event) {
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
      // context.lineTo(event.changedTouches[0].x, event.changedTouches[0].y);
      // context.stroke();
      // context.draw()
    };
    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };
    };
    context.clearRect(0, 0, canvasw, canvash);
    context.stroke();
    context.draw(true);
  },
  canvasEnd: function (event) {
    isButtonDown = false;
  },
  cleardraw: function () {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  },


  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const ctx = wx.createCanvasContext('shareCanvas');
    // ctx.drawImage("https://img3.doubanio.com/view/photo/l/public/p2327709524.jpg", 0, 0, 300, 400);
    // ctx.draw();
  


    wx.getImageInfo({
      src: '/files/images/logo.png',
      success: function (res) {
        console.log(res)
        console.log(res.path)
      }
    });
    // 使用 wx.createContext 获取绘图上下文 context
    context = wx.createCanvasContext('canvas');
    context.beginPath()
    context.setStrokeStyle('#ffff00');
    context.setLineWidth(3);
    context.setLineCap('round');
    context.setLineJoin('round');



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const _ = this;
    var context = wx.createCanvasContext();
    context.setFillStyle('red')
    //第二步绘制这里我们绘制个矩形 
    //x, y, widht, height
    context.rect(0, 0, 100, 100);
    //绘制的样式进行描边绘制，fill为填充位置
    context.stroke();
    context.fill();

    wx.drawCanvas({
      canvasId: 'cat',
      actions: context.getActions(),
    })


    var context = wx.createCanvasContext();
    context.rect(0, 0, 200, 200)
    context.stroke();
    context.rotate(5 * Math.PI / 180)
    context.rect(0, 0, 200, 200)
    context.stroke();
    context.rotate(5 * Math.PI / 180)
    context.rect(0, 0, 200, 200)
    context.stroke()

    wx.drawCanvas({
      canvasId: 'cat2',
      actions: context.getActions()
    });


    wx.canvasGetImageData({
      canvasId: 'cat2',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      success(res) {
        let data = res.data;
        let base64 = wx.arrayBufferToBase64(data)
        _.setData({
          imageUrl:"data:image/png;base64,"+base64
        });
        console.log(base64)
        console.log(res) 
        console.log(res.width) // 100
        console.log(res.height) // 100
        console.log(res.data instanceof Uint8ClampedArray) // true
        console.log(res.data.length) 
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSetting({

    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  drawFont: function (ctx, content, height,color) {
    ctx.setFontSize(16);
    ctx.setFillStyle(color);
    ctx.fillText(content, this.data.offset, height);
  },
  getImage:function(){
    console.log("getImage clicked")
    // if (arrx.length == 0) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '内容不能为空！',
    //     showCancel: false
    //   });
    //   return false;
    // };
    //生成图片
    wx.canvasToTempFilePath({
      canvasId: 'cat2',
      success: function (res) {
        console.log(res.tempFilePath);
        //存入服务器
        wx.uploadFile({
          url: 'a.php', //接口地址
          filePath: res.tempFilePath,
          name: 'file',
          formData: { //HTTP 请求中其他额外的 form data 
            'user': 'test'
          },
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
          }
        });
      }
    })

  },
  savePic: function () {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.windowWidth,
      height: that.data.contentHeight,
      canvasId: 'cat2',
      success: function (res) {
        util.savePicToAlbum(res.tempFilePath)
      }
    })
  }

})