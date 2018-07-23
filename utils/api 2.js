/**
 * /utils/api.js
 */
import conf from '../conf.js'

const apiPathPrefix = '/Minipromember/Api'
/*
const domain = {
    // env symbol, app.onLaunch will initial this value
    test: 'https://innisfree-test.e.verystar.cn/Minipromember/Api',
    prod: 'https://innisfree.e.verystar.cn/Minipromember/Api'
}*/

const st_success = '200'

const formatRequest = (result) => {
    return result.statusCode == 200 ? {
        data: result.data.data,
        errMsg: result.data.msg,
        header: result.header,
        retCode: result.data.retcode
    } : {
        data: null,
        errMsg: result.errMsg,
        header: result.header,
        retCode: result.statusCode
    }
}

const api = {
    init: function(env = 'prod') {
        let _api = {}
        let defaultParam = {}

        // determine env, default 'test' environment
        // console.log(env, 'api.js line 37')
        env = env === 'prod' ? 'prod' : 'test'

        // build api library
        Object.keys(interfaces).map((api_name) => {
            _api[api_name] = ((_name) => {
                let url = conf.domain[env] + apiPathPrefix + interfaces[_name].url
                return (parameters = {}) => {
                    let error = false
                    let pms = new Promise((resolve, reject) => {
                        Object.keys(defaultParam).map((key) => {
                            if(interfaces[_name].params.indexOf(key) != -1) {
                                parameters[key] = defaultParam[key]
                            }
                        })
                        interfaces[_name].params.map((key) => {
                            if (key[0] !== '!' && !!parameters[key] == false) {
                              reject({ errMsg: `parameters ${key} is null`, errCode: '__FED_ERROR__'})
                                error = true
                            }
                        })
                        // console.log(error)
                        if (!error) {
                            let json = Object.assign({},
                                {url: parameters.url || url },
                                {method: interfaces[_name].method},
                                {data: parameters},
                                {header: {'content-type':'application/x-www-form-urlencoded'}},
                                {success: res => res.data.retcode != st_success ? reject(formatRequest(res)) : resolve(formatRequest(res))},
                                {fail: res => reject(formatRequest(res))}
                            )
                            // console.log('api line63 json output', json)
                            wx.request(json)
                        }
                    })
                    return pms
                }
            })(api_name)
        })
        _api.defaultParam = function(param, value) {
            // console.log('_api.defaultParam line72', defaultParam)
            defaultParam[param] = value
        }
        return _api
    }
}

const interfaces = {
    auth: {
        url: '/auth',
        method: 'POST',
        params: ['js_code']
    },
    setUserAuth: {
        url: '/getAuthUserInfo',
        method: 'POST',
        params: ['openid','ticket','encrypted_data','iv']
    },
    card: {
        url: '/card',
        method: 'POST',
        params: ['openid','ticket']
    },
    setPrivacy: {
        url: '/privacy',
        method: 'POST',
        params: ['openid','ticket','is_check']
    },
    userinfo: {
        url: '/getUserInfo',
        method: 'POST',
        params: ['openid','ticket']
    },
    pointList: {
        url: '/getPointList',
        method: 'POST',
        params: ['openid','ticket']
    },
    couponList: {
        url: '/getCouponList',
        method: 'POST',
        params: ['openid','ticket']
    },
    getQrodeData: {
        url: '/getDynamicCode',
        method: 'POST',
        params: ['openid','ticket','member_id']
    }
}

export default api