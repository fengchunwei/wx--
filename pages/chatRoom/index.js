// pages/chatRoom/index.js
const app = getApp()
const HOST = require('../../constants/config.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //展示所有消息，根据不同类型消息展示不同的内容
    //{type:'',content:''}//
    list: [],
    inputValue: '',
    lastMsgId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      customUserInfo: app.globalData.customUserInfo,
      groupId: options.id,

    })
    console.log(app.globalData.customUserInfo)
    //password随便填
    //courseId 分组Id
    //
    let groupId = this.data.groupId
    // debugger
    
    wx.connectSocket({
      url: `wss://showme.myhope365.com/websocketChat?username=${this.data.customUserInfo.loginName}&password=22222&courseId=${groupId}&nickName=${this.data.customUserInfo.userName}`,
      header:{
        "Cookie":""
      }
    })
   wx.onSocketError((result) => {
     console.log("连接异常...")
     console.log(result)
   })
    wx.onSocketOpen((result) => {
      console.log("连接已经建立")
      let getHistoryCmd = {
        cmd: 19, // 命令 
        type: 1, // 类型 固定值
        groupId: groupId, //  分组的id
        userId: this.data.customUserInfo.loginName // 用户id（这里可以用loginName）
      }
      //历史记录
      wx.sendSocketMessage({
        data: JSON.stringify(getHistoryCmd),
      })
    });
    //接受服务端请求
    wx.onSocketMessage((result) => {
      // console.log(result)
      const data = JSON.parse(result.data)
      // console.log(data)
      if (data.command == 20 && data.code == 10018) {
        //获取历史成功
        //后续处理
        //包含data属性，之后说明，这个群组是有历史记录的
        // debugger
        if (data.data) {
          const list = this.data.list.concat(data.data.groups[this.data.groupId])
          this.setData({
            list: list,
            lastMsgId: `msg${list.length-1}`
          })
        }
      } else if (data.command == 6) {
        // 登录成功提示
      } else if (data.command == 11) {
        //需要把新的消息展示出来
        // 接受新消息
        this.data.list.push(data.data)
        this.setData({
          list: this.data.list,
          inputValue:'',
          lastMsgId: `msg${this.data.list.length-1}`
        })
      } else if (data.command == 12 && data.code == 10000) {
        wx.showToast({
          title: '发送成功',
        })
      } else {
        //其他消息
        // console.log(result)
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.closeSocket({
      code: 1000,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  sendMsg() {

    if (!this.data.inputValue) {
      wx.showToast({
        title: '请输入内容',
      })
      return
    }
    let msg = {
      from: this.data.customUserInfo.loginName, // 发送人，当前用户的用户名
      createTime: new Date().getTime(), // 发送时间
      cmd: 11, // 命令固定内容
      group_id: this.data.groupId, // 分组id。  想要发送到哪个组里
      chatType: 1, //  聊天类型 固定内容
      msgType: 0, // 消息类型 固定内容
      content: this.data.inputValue, // 消息内容，自己设计结构，比如你想发送图片（图片上传的接口）
      nickName: this.data.customUserInfo.userName, // 用户昵称
      avatar: this.data.customUserInfo.avatar, // 用户头像
      type: "1" // 消息类型。 你可以自己设计，发送过去是什么，返回的就是什么（1: 普通文本 2: 图片 3：点赞 4， 送花）
    };
    wx.sendSocketMessage({
      data: JSON.stringify(msg),
    })
  },
  // 发送图片
  sendImg() {
    wx.chooseImage({
      complete: (res) => {
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'file',
          //接口地址
          url: HOST.BASE_HOST + '/api/nos/upload/image',
          formData: {
            fileUseForEnum: 'DEFAULT'
          },
          header:{
            "cookie":wx.getStorageSync('cookie')
          },
          success:res=>{
            // JSON.parse(res.data).url
            let msg = {
              from: this.data.customUserInfo.loginName, // 发送人，当前用户的用户名
              createTime: new Date().getTime(), // 发送时间
              cmd: 11, // 命令固定内容
              group_id: this.data.groupId, // 分组id。  想要发送到哪个组里
              chatType: 1, //  聊天类型 固定内容
              msgType: 0, // 消息类型 固定内容
              content: JSON.parse(res.data).url, // 消息内容，自己设计结构，比如你想发送图片（图片上传的接口）
              nickName: this.data.customUserInfo.userName, // 用户昵称
              avatar: this.data.customUserInfo.avatar, // 用户头像
              type: "2" // 消息类型。 你可以自己设计，发送过去是什么，返回的就是什么（1: 普通文本 2: 图片 3：点赞 4， 送花）
            };
            wx.sendSocketMessage({
              data: JSON.stringify(msg),
            })
          }
        })
      },
    })
  }
})