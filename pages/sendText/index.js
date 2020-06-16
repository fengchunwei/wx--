// pages/publish/publish.js
const creatTiezi = require('../../api/lintan.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
      
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  afterRead(event) {
    var that = this
    console.log(event)
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    
    wx.uploadFile({
      url: 'https://showme.myhope365.com/api/nos/upload/image', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      header:{
        "cookie":wx.getStorageSync('cookie')
      },
      method:"post",
      formData: { 
        fileUseForEnum:"DEFAULT"
       },
      success:(res)=> {
        debugger
        const data = JSON.parse(res.data)
        console.log(data)
        console.log(data.url)
        that.data.fileList.push({url:data.url})
        // debugger
        that.setData({
          fileList:that.data.fileList,
          coverImgUrl:data.url
        })
        console.log(that.data.coverImgUrl)
      },
    });
  },

  //获取创建帖子的信息
  onChange(e){
    console.log(e)
    this.setData({
      [e.currentTarget.dataset.key]:e.detail.value
    })
  },
  getIntro(e){
    // console.log(e.detail.value)
    this.setData({
      intro:e.detail.value
    })
  },

  add(){
    creatTiezi.getSendList(this.data.categoryId,this.data.title,this.data.intro,this.data.coverImgUrl)
    .then(res=>{
      wx.showToast({
        title: '发布成功',
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    })
  }
})