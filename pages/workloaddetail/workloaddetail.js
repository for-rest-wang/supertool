// pages/workloaddetail/workloaddetail.js
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
    days:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('test_detail:' + options.id)    
    wx.cloud.callFunction({
      name: 'getworkloaddetail',
      data:{
        id: options.id
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        this.setData({
          id:res['result']['id'],
          project_name:res['result']['project_id'],          
          project_name:res['result']['project_name'],
          work_type:res['result']['work_type'],
          delivery_center:res['result']['delivery_center'],
          days:res['result']['days'],
        })
      }
    })
  },
  forupdate: function(event) {
    wx.navigateTo({
      url: '../workloadforupdate/workloadforupdate?id=' + this.data.id,
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
  delete: function (){    
    wx.showModal({
      title: '提示',
      content: '删除后将不可恢复，是否删除！',
      showCancel: true,
      success :(res)=> {
        if (res.cancel) {
           //点击取消,默认隐藏弹框
        } else {
           //点击确定
           wx.cloud.callFunction({
            name: 'deleteworkload',
            data:{
              workload_id: this.data.id.toString(),
            },
            complete: res => {
              console.log(res)
              wx.reLaunch({
                url: "/pages/workloadlist/workloadlist"
              });
            }
          })
        }
     },
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