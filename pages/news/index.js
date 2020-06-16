
const cmsnew = require('../../api/xiangqing.js')

Page({
  data: {
    listr:[]
  },
  onLoad: function (options) {
    console.log(options.id)
    cmsnew.detal(options.id).then(res=>{
      console.log(res)
      this.setData({
        listr:res.data.data
      })
    })
  },
})