//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function (options) {
    wx.getStorage({
      key: 'key',
      cuccess:(res)=>{
        this.setData({
          list:res.data
        })
      }
    })
  }
})
