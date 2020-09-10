//app.js
App({
  dbObj:{},
  onLaunch: function (options) {
    wx.cloud.init()
    var sysInfo = wx.getSystemInfoSync();
    var version = sysInfo.version;
    var tmp = version.split(".");
    if (tmp[0]<=6){
      if (tmp[0] == 6){
        if ( tmp[1] <= 5) {
          if( tmp[1] == 5){
            if (tmp[2] < 10) {
              wx.showModal({
                title: '提示',
                content: '您的微信版本过低，请到http://weixin.qq.com/下载最新版本！',
                showCancel: false
              });
            }
          }else{
            wx.showModal({
              title: '提示',
              content: '您的微信版本过低，请到http://weixin.qq.com/下载最新版本！',
              showCancel: false
            });
          }
        }
      }else{
        wx.showModal({
          title: '提示',
          content: '您的微信版本过低，请到http://weixin.qq.com/下载最新版本！',
          showCancel: false
        });
      }
    }
  },
  requestUrl: {
    loginUrl: 'https://www.up70.com/api/projectoption',
    logoutUrl: 'https://www.up70.com/LISTS/2',
    getCustListUrl: '/apiJS/custInfoVerifyJS/getCustListBySlsmanId',
    getCustInfoUrl: '/apiJS/custInfoVerifyJS/getCustInfoByLicenseCode',
    updateCustInfoUrl: '/apiJS/custInfoVerifyJS/updateCustInfo'
  },
  doRequest : function (url, data, cb, method){
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    var rootDocment = "";
    var isProxy = wx.getStorageSync("isProxy");
    if (isProxy == "0"){
      rootDocment = wx.getStorageSync("url"); 
    }else{
      rootDocment = 'https://tcenter02.xinshangmeng.com' + wx.getStorageSync("proxy");
    }
    var token = wx.getStorageSync("token");
    if (token == null || token == ""){
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
    var header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    if (!method) {
      method = 'get';
    }
    if (method == 'post'){
      header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    } else if (method == 'get'){
      header = { 'Content-Type': 'application/json' };
    }
    if (data && method == 'post'){
      data.token = encodeURIComponent(token);
      url = rootDocment + url;
    } else {
      url = rootDocment + url + "?token=" + encodeURIComponent(encodeURIComponent(token));
    }
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: function (res) {
        if (res.data.CODE == "500" && res.data.MSG.indexOf("token")>=0){
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
        return typeof cb == "function" && cb(res.data)
      },
      fail: function (res) {
        return typeof cb == "function" && cb(false)
      },
      complete:function(){
        wx.hideToast();
      }
    })
  },
  hump2underline:function(str){
    if (str != ""){
      return str.replace(/([A-Z])/g, "_$1").toLowerCase();
    }
    return '';
  },
  underline2hump:function(str){
    if (str != "") {
      var re = /_(\w)/g;
      str = str.toLowerCase().replace(re, function (all, letter) {
        return letter.toUpperCase();
      });
      return str;
    }
    return '';
  },
})