//index.js
//获取应用实例
import API from '../../utils/api';
import util from '../../utils/util'
let app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        newarr: [],
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        const _ = this;

        let params = {
            encrypted_data: '',
            iv: '',
            ticket: ''
        };
        let sign = app.getSignurature(params)


        wx.request({
            url: API.GET_ESS_LIST,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            data: Object.assign(params, {sign: sign}),
            success: res => {

            }
        })



        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },


    clickBtn: function () {
        var res = wx.getSystemInfoSync();
        console.log(res);
    },
    
    
    
    iopdf:function(e){

      wx.downloadFile({
        url: 'http://example.com/somefile.pdf',
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })


    }
})
