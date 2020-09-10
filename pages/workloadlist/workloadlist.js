// pages/workloadlist/workloadlist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workloadlist: [],
    workload_month: wx.getStorageSync("workload_month"),
    dataLoaded:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      workload_month: wx.getStorageSync("workload_month"),
    })
    wx.cloud.callFunction({
      name: 'getworkload',
      data:{
        user_id: wx.getStorageSync("userid"),
        workload_month: wx.getStorageSync("workload_month"),
      },
      complete: res => {
        this.setData({
          workloadlist: res['result'],
          dataLoaded: true
        })
      }
    })
  },
  add:function(event){
    wx.reLaunch({
      url: '../workloadforinsert/workloadforinsert'
    })
  },
  detail:function(event){
    console.log("test:" + event.currentTarget.id)
    wx.navigateTo({
      url: '../workloaddetail/workloaddetail?id=' + event.currentTarget.id,
      success: function(res){
        //
      },
      fail: function(){
        //
      },complete: function(){
        //
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

  }
})