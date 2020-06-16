// pages/mvDetail/index.jscon
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
const app = getApp()

const wangyiApi = require('../../api/wangyi.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    danmulist:[],
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.lodeUrlPromeies = wangyiApi.videoMv(options.id).then(res => {
      this.setData({
        url: res.data.data.url,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取(
    this.setData({
      customUserInfo: app.globalData.customUserInfo,

    })
    this.mvVideo = wx.createVideoContext('mvVideo')
    this.lodeUrlPromeies.then(() => {
      this.groupId = "danmu"+ this.data.id
      wx.connectSocket({
        url: `wss://showme.myhope365.com/websocketChat?username=${this.data.customUserInfo.loginName}&password=111&courseId=${this.groupId}&nickName=${this.data.customUserInfo.userName}&avatar=${this.data.customUserInfo.avatar}`,
        header: {
          "Cookie": ''
        }
      })

      wx.onSocketOpen((result) => {
        //当websocket建立之后会执行
        wx.sendSocketMessage({
          data:JSON.stringify({
            cmd: 19, // 命令 
            type: 1,  // 类型 固定值
            groupId: this.groupId,  //  分组的id
            userId: this.data.customUserInfo.loginName // 用户id（这里可以用loginName）
          })
        })
      })
      //每次有新的消息的时候都会执行这个函数
      wx.onSocketMessage((result) => {
        const data = JSON.parse(result.data)
        console.log(data)
        if (data.command == 20 && data.code == 10018) {
          //获取历史成功
          //后续处理
          //包含data属性，之后说明，这个群组是有历史记录的
          this.setData({
            danmuList:data.data.groups[this.groupId].map(item=>{
              let content = JSON.parse(item.content)
              return{
                ...content,
                time:parseInt(content.time)
              }
            })
          })
        } else if (data.command == 6) {
          // 登录成功提示
        } else if (data.command == 11) {
          //需要把新的消息展示出来
          // 接受新消息
          let content = JSON.parse(data.data.content)
          this.mvVideo.sendDanmu(content);
        } else if (data.command == 12 && data.code == 10000) {
          wx.showToast({
            title: '发送成功',
          })
        } else {
          //其他消息
          // console.log(result)
        }
      })
    })
  },

  //用户输入
  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  handTimeupdate(e){
    this.currentTime = e.detail.currentTime
  },
  senddanMu() {
    if (!this.data.inputValue) {
      wx.showToast({
        title: '请输入内容',
      })
      return
    }
    let msgContent = {
      text:this.data.inputValue,
      color:getRandomColor(),
      time:this.currentTime

    }
    let msg = {
      from: this.data.customUserInfo.loginName, // 发送人，当前用户的用户名
      createTime: new Date().getTime(), // 发送时间
      cmd: 11, // 命令固定内容
      group_id: this.groupId, // 分组id。  想要发送到哪个组里
      chatType: 1, //  聊天类型 固定内容
      msgType: 0, // 消息类型 固定内容
      content: msgContent, // 消息内容，自己设计结构，比如你想发送图片（图片上传的接口）
      nickName: this.data.customUserInfo.userName, // 用户昵称
      avatar: this.data.customUserInfo.avatar, // 用户头像
      type: "1" // 消息类型。 你可以自己设计，发送过去是什么，返回的就是什么（1: 普通文本 2: 图片 3：点赞 4， 送花）
    };
    wx.sendSocketMessage({
      data: JSON.stringify(msg),
    })
  },
})