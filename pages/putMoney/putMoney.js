import util from '../../utils/util'

var context = null; // 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
//获取系统信息
wx.getSystemInfo({
  success: function(res) {
    canvasw = res.windowWidth; //设备宽度
    canvash = res.windowHeight;
    console.log(canvasw)
    console.log(canvash)
  }
});


// wx.getSetting({
//   success(res) {
//     if (!res.authSetting['scope.record']) {
//       wx.authorize({
//         scope: 'scope.record',
//         success() {
//           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
//           // wx.startRecord()
//         }
//       })
//     }


//     wx.authorize({
//       scope: 'scope.userLocation',
//       success() {

//         wx.getLocation({
//           type: 'wgs84',
//           success: function(res) {
//             var latitude = res.latitude
//             var longitude = res.longitude
//             var speed = res.speed
//             var accuracy = res.accuracy

//             console.log(latitude)
//           }
//         })

//       }
//     })


//     wx.authorize({
//       scope: 'scope.address',
//       success() {


//       }
//     })

//     wx.authorize({
//       scope: 'scope.camera',
//       success() {
//         // wx.chooseImage({
//         //   count: 1, // 默认9
//         //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//         //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//         //   success: function(res) {
//         //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//         //     var tempFilePaths = res.tempFilePaths
//         //   }
//         // })

//       }
//     })


//     wx.authorize({
//       scope: 'scope.writePhotosAlbum',
//       success() {


//       }
//     })


//     wx.authorize({
//       scope: 'scope.invoiceTitle',
//       success() {


//       }
//     })

//     wx.authorize({
//       scope: 'scope.werun',
//       success() {


//       }
//     })


//   }
// })



Page({
  data: {
    src: "",
    imageUrl: "",
    x: 0,
    y: 0,
      rotate:30,
      fontFamily:'',
      fontSize:'',
      text:"dddd"
  },
  
  tap: function(e) {
    this.setData({
      x: 30,
      y: 30
    });
  },
  onChange: function(e) {
    console.log(e.detail)
  },
  onScale: function(e) {
    console.log(e.detail)
  },

  canvasIdErrorCallback: function(e) {
    console.error(e.detail.errMsg)
  },
  canvasStart: function(event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
  },
  canvasMove: function(event) {
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
      // context.lineTo(event.changedTouches[0].x, event.changedTouches[0].y);
      // context.stroke();
      // context.draw()
    }
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
  canvasEnd: function(event) {
    isButtonDown = false;
  },
  cleardraw: function() {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  },

    addRotate(){
      console.log("addRotate clicked")
      const _ = this;
      _.setData({
          rotate:30
      });
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // const ctx = wx.createCanvasContext('shareCanvas');
    // ctx.drawImage("https://img3.doubanio.com/view/photo/l/public/p2327709524.jpg", 0, 0, 300, 400);
    // ctx.draw();


    wx.getImageInfo({
      src: '/files/images/logo.png',
      success: function(res) {
        console.log(res)
        console.log(res.path)
      }
    });
    // 使用 wx.createContext 获取绘图上下文 context
    context = wx.createCanvasContext('canvas');
    context.beginPath()
    context.setStrokeStyle('#ffff00');
    context.setLineWidth(2);
    context.setLineCap('round');
    context.setLineJoin('round');


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const _ = this;
    // var context = wx.createCanvasContext();
    // context.setFillStyle('red')
    // //第二步绘制这里我们绘制个矩形
    // //x, y, widht, height
    // context.rect(0, 0, 100, 100);
    // //绘制的样式进行描边绘制，fill为填充位置
    // context.stroke();
    // context.fill();
    //
    // wx.drawCanvas({
    //   canvasId: 'cat',
    //   actions: context.getActions(),
    // })


    // var context = wx.createCanvasContext();
    // context.rect(0, 0, 200, 200)
    // context.stroke();
    // context.rotate(5 * Math.PI / 180)
    // context.rect(0, 0, 200, 200)
    // context.stroke();
    // context.rotate(5 * Math.PI / 180)
    // context.rect(0, 0, 200, 200)
    // context.stroke()

    // wx.drawCanvas({
    //   canvasId: 'cat2',
    //   actions: context.getActions()
    // });


    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.getSetting({});
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  drawFont: function(ctx, content, height, color) {
    ctx.setFontSize(16);
    ctx.setFillStyle(color);
    ctx.fillText(content, this.data.offset, height);
  },
  getImage: function() {
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
      success: function(res) {
        console.log(res.tempFilePath);
        //存入服务器
        wx.uploadFile({
          url: 'a.php', //接口地址
          filePath: res.tempFilePath,
          name: 'file',
          formData: { //HTTP 请求中其他额外的 form data
            'user': 'test'
          },
          success: function(res) {
            console.log(res);
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {}
        });
      }
    })

  },
  savePic: function() {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.windowWidth,
      height: that.data.contentHeight,
      canvasId: 'cat2',
      success: function(res) {
        util.savePicToAlbum(res.tempFilePath)
      }
    })
  },
  getAuthority: function() {

    const that = this;

    if (that.getSysInfo() && wx.openSetting) {

      wx.openSetting({

        success: res => {

          console.log('success');

        }

      });

    }

  },

  getSysInfo: function() {

    let SDKVersion = "";

    wx.getSystemInfo({

      success: res => {

        SDKVersion = res.SDKVersion;

      }

    });

    console.log(SDKVersion);

    let versionArr = SDKVersion.split(".");

    console.log(versionArr);

    if (Number(versionArr[0] < 2)) {

      return true;

    }

    if (Number(versionArr[0]) === 2 && Number(versionArr[2]) < 7) {

      return true;

    }

    return false;

  },

  getBase64Data(canvasId){
    wx.canvasGetImageData({
      canvasId: canvasId,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      success(res) {
        let data = res.data;
        let base64 = wx.arrayBufferToBase64(data)
        _.setData({
          imageUrl: "data:image/png;base64," + ''
        });
        console.log(base64)
        console.log(res)
        console.log(res.width) // 100
        console.log(res.height) // 100
        console.log(res.data instanceof Uint8ClampedArray) // true
        console.log(res.data.length)
      }
    })
  }

})