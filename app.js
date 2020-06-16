const userApi = require('./api/user.js')
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


    //一步操作
    // 获取用户信息放到promise
    const userInfopromise = new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                //请求成功
                resolve(res.userInfo)
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                // if (this.userInfoReadyCallback) {
                //   this.userInfoReadyCallback(res)
                // }
              },
              fail() {
                reject('获取用户信息失败')
              }
            })
          } else {
            reject('用户没有授权')
          }
        },
        fail() {
          reject('获取用户配置失败')
        }
      })
    });
    this.userInfopromise = userInfopromise;
    //通过接口判断登录状态
    //为什么要判断登陆状态
    //登陆之后惠济路cookie的(手动记录)，只要cookie不过期。用改一直是登陆状态(不必重复登录)
    //记录用户账号和密码，每次调用登陆接口
    const loginPromise = new Promise((resolve, reject) => {
      if (wx.getStorageSync('isLogin')) {
        //获取账号密码
        userApi.login(wx.getStorageSync('username'), wx.getStorageSync('password')).then(res => {
          if (res.data.code == 0) {
            if (res.cookies.join(";").includes("JSESSIONID"))
              wx.setStorageSync("cookie", res.cookies.join(";"))
            this.globalData.customUserInfo = res.data.data
            resolve(res)
          } else {
            wx.removeStorageSync("username")
            wx.removeStorageSync("password")
            wx.setStorageSync("isLogin", false)
            wx.removeStorageSync("cookie")
            reject(res)
          }
        }).catch(err => {
          reject(err)
        })
        // 调用登陆接口
      } else {
        reject()
      }
    })
    this.loginPromise = loginPromise;
    userInfopromise.then(res => {
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  onShow() {
    console.log('option')
  },
  onHide() {

  },
  onError() {

  },

  globalData: {
    userInfo: null,
    customUserInfo: []
  },
  userInfopromise: null,
  loginPromise: null,
  isLogin: false
})