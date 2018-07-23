import util from './utils/util.js'
import API from './utils/api.js'
import { sha256, sha224 } from './utils/js-sha256'
//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    goToH5(url) {
        wx.navigateTo({
            url: '../h5/h5?url=' + url + "&type=special"
        })
    },
    getSignurature(args) {
        var keys = Object.keys(args);
        var secret = '6aa258a1656551250ff22331cfe0b6ba';
        keys = keys.sort()
        var newArgs = {};
        keys.forEach(function (key) {
            if(args[key] === '') {
                return
            }
            newArgs[key.toLowerCase()] = args[key];
        });

        var string = '';
        for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }

        string = string.substr(1) + secret;
        return sha256(string);
    },

    globalData: {
        userInfo: null
    }
})