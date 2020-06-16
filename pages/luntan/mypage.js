// pages/waterfall/waterfalls.js
const luntanApi = require("../../api/lintan.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    leftList: [],
    rightList: [],
    leftHeight: 0,
    rightHeight: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    luntanApi.getLuntanlist().then(res => {
      // console.log(res)
      this.setData({
        list: res.data.rows
      })
      for (let item of this.data.list) {
        wx: wx.getImageInfo({
          src: item.coverImgUrl,
          success: (res) => {
            if (this.data.leftHeight <= this.data.rightHeight) {
              this.data.leftList.push(item);
              this.data.leftHeight += res.height / res.width;
            } else {
              this.data.rightList.push(item);
              this.data.rightHeight += res.height / res.width;
            }
            this.setData({
              leftList: this.data.leftList,
              rightList: this.data.rightList,
              leftHeight: this.data.leftHeight,
              rightHeight: this.data.rightHeight
            })
          },
        })
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
  skipPackageA(){
    wx.navigateTo({
      url: '/pages/sendText/index',
    })
  },
  //聊天室
  skipchatRoom(e){
    wx.navigateTo({
      url:  `/pages/chatRoom/index?id=${e.currentTarget.dataset.id}`,
    })
  }
})