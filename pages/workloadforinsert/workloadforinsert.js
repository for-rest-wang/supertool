// pages/workloadforinsert/workloadforinsert.js
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    project_id:'',
    project_name:'',
    work_type:'',
    delivery_center:'',
    is_pre:'',
    days:'',    
    project_list:[],
    index:0,
    work_type_list:[],
    init_work_type_list:['研发','售前','实施','服务'],
    type_index:0,
    days_list:[],
    init_days_list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    days_index:0,    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getprojectbydept',
      data:{
        dept_id: wx.getStorageSync("deptid"),
        dept_type: wx.getStorageSync("depttype"),
      },
      complete: res => {
        var list_obj = res['result']
        this.data.project_id = list_obj[this.data.index].id
        this.data.project_name = list_obj[this.data.index].project_name
        this.data.delivery_center = list_obj[this.data.index].delivery_center_id
        this.data.is_pre = list_obj[this.data.index].is_pre
        this.setData({
          project_list:res['result'],
          index:this.data.index,
          work_type_list: this.data.init_work_type_list,
          days_list: this.data.init_days_list,
          type_index:this.data.type_index,
          days_index:this.data.days_index          
        })
        this.data.work_type = this.data.work_type_list[this.data.type_index]
        this.data.days = this.data.days_list[this.data.days_index]
      }
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.project_name = this.data.project_list[e.detail.value].project_name
    this.setData({
      index: e.detail.value,
      project_id: this.data.project_list[e.detail.value].id,
      project_name: this.data.project_list[e.detail.value].project_name,      
      delivery_center: this.data.project_list[e.detail.value].delivery_center_id,
      is_pre: this.data.project_list[e.detail.value].is_pre
    })
  },
  bindTypePickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      type_index: e.detail.value,
      work_type: this.data.work_type_list[e.detail.value],
    })
  },
  bindDaysPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      days_index: e.detail.value,
      days: this.data.days_list[e.detail.value],
    })
  },
  save: function (){    
    console.log(this.data.work_type)
    wx.cloud.callFunction({
      name: 'addworkload',
      data:{
        user_id: wx.getStorageSync("userid"),
        user_name: wx.getStorageSync("username"),
        dept_id: wx.getStorageSync("deptid"),
        workload_month: wx.getStorageSync("workload_month"),
        project_id: this.data.project_id,
        project_name: this.data.project_name,
        delivery_center: this.data.delivery_center,
        is_pre: this.data.is_pre,
        work_type: this.data.work_type,
        days: this.data.days,
        fill_in_time: util.formatTime(new Date())
      },
      complete: res => {
        console.log(res)
        wx.reLaunch({
          url: "/pages/workloadlist/workloadlist"
        });
      }
    })
  },
  back: function() {
    wx.reLaunch({
      url: "/pages/workloadlist/workloadlist"
    });
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