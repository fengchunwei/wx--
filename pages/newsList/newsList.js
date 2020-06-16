// pages/newsList/newsList.js
const cmsApi = require('../../api/cms.js')
Page({
  data: {
    list:[],
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  onLoad: function (options) { 
    cmsApi.getNewslist(1,10).then(res=>{
      console.log(res)
      this.setData({
        list:res.data.rows  
      })
    });

    wx.getUserInfo({
      success(res){
      },
      fail(err){
      }
    })
  },
  
  open(e){
    wx.navigateTo({
      url: `/pages/news/index?id=${e.currentTarget.dataset.id}&name=123456`, 
    })
  },

    onPullDownRefresh(){
      wx.showToast({
             title: '刷新中',
             icon: 'loading',
             duration: 2000
           })
      setTimeout(()=>{
        wx.stopPullDownRefresh({
          complete: (res) => {},
        })
      },1500)
    },
   onReachBottom: function () {
    console.log("触底加载")
    // wx.showToast({
    //   title: '正在加载中...',
    //   duration : 5000,          // 提示消息的最大持续时间 15s
    //   icon: 'loading'
    // });
   },
   onShareAppMessage:function(){
    return {
      title:'第一个微信小程序'
    }
  },

})


//请求数据,小程序没有跨域问题
    // wx.request({
    //   url: 'http://59.111.92.205:8088/api/cms/article/open/list',
    //   header:{
    //     'X-Requested-With':'XMLHttpRequest',
    //     "content-type": "	application/x-www-form-urlencoded"
    //   },
    //   method:"POST",
    //   data:{
    //     pageNum:1,
    //     pageSize:10
    //   },
    //   success:(res)=>{
    //     //请求结果
    //     console.log(res)
    //     this.setData({
    //       list:res.data.rows  
    //     })
    //   }
    // })
  