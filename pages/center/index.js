// pages/center/index.js
const app = getApp()
Page({
  data: { 
  },
  onLoad: function (options) {
    if(app.islogin){
      this.setData({
        userInfo:app.globalData.customUserInfo
      })
    }else{
       app.loginPromise.then(res=>{
       this.setData({
        userInfo:app.globalData.customUserInfo
      })
    }).catch(res=>  {
      wx.redirectTo({
        url: 'pages/logoin/logoin',
      })
    })
    }
  },

  upLoad() {
    const that = this;
    wx.chooseImage({
      success(res) {
        // debugger
        const tempFilePaths = res.tempFilePaths[0]
        wx.uploadFile({
          filePath: tempFilePaths,
          name: 'avatarfile',
          url: 'https://showme.myhope365.com/api/system/user/profile/update/avatar/nos',
          header: {
            'cookie': wx.getStorageSync('cookie')
          },
          method: 'post',
          /* formData:{
            fileUseForEnum:"DEFAULT"
          }, */
          success: (res) => {
            // debugger
          },
        })
        console.log(res)
        that.setData({
          img:res.tempFilePaths
        })
      }
    })
  },
  onShareAppMessage: function () {  
  },
  change(e){
    wx.navigateTo({
      url: '/pages/userinfo/index',
    })
  }
})