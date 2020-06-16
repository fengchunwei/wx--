// // pages/myHome/myHome.js
// Page({
//   data: {
//     list:[],
//     inputValue:'',
//   },
//   onLoad: function (options) {
//     wx.getStorage({
//       key: 'key',
//       success:(res)=>{
//         console.log(res)
//         this.setData({
//           list:res.data
//         })
//       }
//     })
//   },
//   getValue(e){
//    this.setData({
//      value:e.detail.value,
//    })
//   },

//   //添加内容
//   addUpcoming(){
//       // wx.showToast({ // 显示Toast
//       //   title: '已发送',
//       //   icon: 'success',
//       //   duration: 1500
//       // })
//       // wx.hideToast() // 隐藏Toast

//       wx.showLoading({
//         title: '提交中..'
//       }),
//       wx.setStorage({
//         data: this.data.value,
//         key: 'key',
//         success(){
//           console.log('成功')
//           setTimeout(()=>{
//             wx.hideLoading();
//             wx.showToast({ // 显示Toast
//                 title: '已提交',
//                 icon: 'success',
//                 duration: 1500
//               })
//           },3000)
//         }
//       })
//     var obj = {id:Date.now(),content:this.data.value,isFinish:false}
//     this.data.list.push(obj)
//     this.setData({
//       list:this.data.list,
//       inputValue: ''
//     })

//     wx.setStorage({
//       data: this.data.list,
//       key: 'key',
//       success(res){
//         console.log(res)
//       }
//     })
//   },

//   //选中
//   changeChecked(e){
//     let index = e.currentTarget.dataset.index;
//     this.data.list[index].isFinish =  !this.data.list[index].isFinish
//     this.setData({
//       list:this.data.list
//     })
//     wx.setStorage({
//       data: this.data.list,
//       key: 'key',
//     })
//   },
  
//    //删除
//    delect(e){
//       wx.showModal({
//         content: '是否删除记录',
//         confirmText: '是',
//         cancelText: '否',
//         success: function(res) {
//           if (res.confirm) {
//             console.log('用户点击主操作')
//           }
//         }
//       })
//      console.log(e.currentTarget.dataset.index)
//      this.data.list.splice(e.currentTarget.dataset.index,1)
//      this.setData({
//       list:this.data.list
//      }) 
//      wx.setStorage({
//        data: this.data.list,
//        key: 'key',
//      })
//   },
// })



// 





//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
