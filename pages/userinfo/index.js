// pages/userinfo/index.js
const Apicms = require('../../api/cms.js')
const uesrInfo = require('../../api/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
 

  onShow: function () {
    uesrInfo.userInfo().then(res=>{
      // console.log(res) 
      this.setData({
        img:res.data.data.avatar,
        userInfo:res.data.data,
        userName:res.data.data.userName,
        email:res.data.data.email
      })
    })
  },
  onChange(e){
    this.setData({  
      [e.currentTarget.dataset.key]:e.detail
    })
    console.log(e)
  },
  changeUserName(){
    Apicms.chenguserInfo(this.data.userName,this.data.email).then(res=>{
      this.setData({
        userName:this.data.userName,
        email:this.data.email 
      })
    })
  },
})