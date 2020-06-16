// pages/logoin/index.js
const userApi = require('../../api/user.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(e) {
    this.setData({
      [e.currentTarget.dataset.key]: e.detail
    })
  },
  login() {
    userApi.login(this.data.username, this.data.password).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '登陆成功',
        })
        if (res.cookies.join(";").includes("JSESSIONID")){
          wx.setStorageSync("cookie", res.cookies.join(";"))
        }
        wx.setStorageSync("username", this.data.username)
        wx.setStorageSync("password", this.data.password)
        wx.setStorageSync("isLogin", true)
        app.isLogin = true
        app.globalData.customUserInfo = res.data.data
        setTimeout(() => {
          userApi.userInfo().then(res => {
            // debugger
          })
        }, 1000)
      }
    })
  }

})