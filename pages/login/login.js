//login.js
//获取应用实例
// const db = wx.cloud.database()
const app = getApp()

Page({
  formSubmit: function (e) {
    if (e.detail.value.user_name.length == 0 || e.detail.value.pwd.length == 0) {
      wx.showModal({
        title: '提示',
        content: '用户名或密码不能为空',
        showCancel: false
      });
      return;
    } else {
      this.setData({
        tip: '',
        user_name: e.detail.value.user_name.trim(),
        pwd: e.detail.value.pwd.trim()
      });
    }    
    wx.cloud.callFunction({
      name: 'logauth',
      data:{
        user_id:this.data.user_name,
        password:this.data.pwd
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        if(res['result']['status']){
          var user_info = res['result']['logInfo']

          wx.setStorageSync('remember', this.data.remember);
          wx.setStorageSync('userid', user_info['userid']);
          wx.setStorageSync('password', this.data.pwd);
          wx.setStorageSync('username', user_info['username']);
          wx.setStorageSync('mail', user_info['mail']);
          wx.setStorageSync('company', user_info['company']);
          wx.setStorageSync('department', user_info['department']);
          wx.setStorageSync('subdepartment', user_info['subdepartment']);
          wx.setStorageSync('deptid', user_info['deptid']);
          wx.setStorageSync('depttype', user_info['depttype'].toString());
          wx.cloud.callFunction({
            name: 'getsetting',
            data:{
              key: 'workload_month',
            },
            complete: res => {
              console.log(res['result'])
              wx.setStorageSync('workload_month', res['result']);
            }
          });
          wx.reLaunch({
            url: "/pages/workloadlist/workloadlist"
          });
        }else{
          console.log('login error!')
          wx.showModal({
            title: '提示',
            content: '用户名或密码错误！',
            showCancel: false
          });
        }
      }
    })

  },
  formReset: function () {
    this.setData({
      tip: '',
      user_name: '',
      pwd: ''
    })
  },
  rememberBtnChange: function (e) {
    this.setData({
      remember: e.detail.value
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    keyBoardShow: false,// 如果正在输入,软键盘弹出，整体需上移
    tip: '',
    user_name: '',
    pwd: '',
    remember: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_name: wx.getStorageSync('userid'),
      pwd: wx.getStorageSync('password'),
      remember: wx.getStorageSync('remember') == '' ? this.data.remember : wx.getStorageSync('remember')
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
