// othercust.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    enumMap:{
      '2210':'客户经理'
    },
    userid:"",
    comName:"",
    dbError:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userType = wx.getStorageSync("userType");
    var userTypeName = '';
    if (this.data.enumMap[userType]){
      userTypeName = this.data.enumMap[userType];
    }
    this.setData({
      userid: wx.getStorageSync("userid"),
      username: wx.getStorageSync("username"),
      mail: wx.getStorageSync("mail"),
      company: wx.getStorageSync("company"),
      department: wx.getStorageSync("department"),
      subdepartment: wx.getStorageSync("subdepartment"),
    });
  },

  loginout:function(){
    // try {
    //   wx.clearStorageSync();
    // } catch (e) {
    //   console.error("清理本地缓存出错："+e);
    // }
    wx.setStorageSync('user_name', "");
    wx.setStorageSync('pwd', "");
    wx.reLaunch({
      url: '../login/login'
    })
  },



  uploadLog:function(){
    var id = "";
    var account = wx.getStorageSync("userId");
    var person = wx.getStorageSync("slsmanId");
    var com = wx.getStorageSync("comId");
    var log = wx.getStorageSync("logInfo");
    id += wx.getStorageSync("proxy").replace(/\//g, "") + "-" + com + "-" + account;

    wx.request({
      url: "https://tcenter02.xinshangmeng.com/pic/sf/us/wxlogs/" + id,
      method: 'post',
      header: { 'Content-Type': 'application/json' },
      data:{
        id: id,
        account: account,
        person: person,
        com: com,
        log: log
      },
      success: function (res) {
        if(res && res.statusCode=="200"){
          wx.showModal({
            title: '提示',
            content: '日志上传成功',
            showCancel: false
          });
        }else{
          wx.showModal({
            title: '提示',
            content: '日志上传失败：' + res.data,
            showCancel: false
          });
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '日志上传异常：' + res.data,
          showCancel: false
        });
      }
    })
  },

  getNetInfo:function(){
    this.setData({
      dbError: "",
      picDBStatus: "",
      picDBError: "",
      picStatus: "",
      picError: "",
      centerStatus: "",
      centerError: "",
      tcenterStatus: "",
      tcenterError: "",
      proxyStatus: "",
      proxyError: "",
    });
    // var error = wx.getStorageSync("dbError");
    // if (error != null && "" != error){
    //   this.setData({
    //     dbError: error
    //   });
    // }
    this.testPicDB();
    this.testPic();
    this.testCenter();
    this.testTcenter();
    this.testProxy();
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