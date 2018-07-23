//map.js
import util from '../../utils/util'

Page({
    data: {
        mapCtx:null,
        currentLongitude: "121.43687",
        currentLatitude: "31.18826",
        scale:18,
        markers: [{
            iconPath: "data:image/jpeg;base64,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",
            id: 0,
            latitude: 37.320012,
            longitude: 113.324520,
            width: 50,
            height: 50
        }],
        polyline: null,
        controls: null
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    controltap(e) {
        console.log(e.controlId)
    },
    onLoad: function () {
        const _ = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude


                var speed = res.speed
                var accuracy = res.accuracy



              // wx.openLocation({
              //   latitude: latitude,
              //   longitude: longitude,
              //   scale: 28
              // })


                _.setData({
                    currentLongitude: longitude,
                    currentLatitude: latitude
                })
                console.log(res)

            }
        })


        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('map')
        console.log("------ // 使用 wx.createMapContext 获取 map 上下文 ------")
        console.log(this.mapCtx)


        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(log => {
                return util.formatTime(new Date(log))
            })
        })
    },

  /**
   * 获取位置
   */
    getCenterLocation: function () {
      console.log("getCenterLocation clicked")
        this.mapCtx.getCenterLocation({
            success: function (res) {
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },
    /**
     * 移动位置
     */
    moveToLocation: function () {
        this.mapCtx.moveToLocation()
    },
    /**
     * 移动标注
     */
    translateMarker: function () {
        this.mapCtx.translateMarker({
            markerId: 1,
            autoRotate: true,
            duration: 1000,
            destination: {
                latitude: 23.10229,
                longitude: 113.3345215,
            },
            animationEnd() {
                console.log('animation end')
            }
        })
    },
    /**
     * 缩放视野展示所有经纬度
     */
    includePoints: function () {
        this.mapCtx.includePoints({
            padding: [10],
            points: [{
                latitude: 23.10229,
                longitude: 113.3345211,
            }, {
                latitude: 23.00229,
                longitude: 113.3345211,
            }]
        })
    },
    scaleToBig:function () {
        const _ = this;
        _.setData({
            scale: _.data.scale + 1
        })
        
    },
    scaleToSmall:function () {

        const _ = this;
        _.setData({
            scale: _.data.scale - 1
        })
        
    }
})
