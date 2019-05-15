// pages/noRole/index.js
const app = getApp();
const User = require('../../api/user.js').User;

Page({
  data: {

  },
  onPullDownRefresh: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          app.globalData.code = res.code;
          wx.request({
            url: User.login,
            data: {
              code: res.code
            },
            method: 'POST',
            success: function (data) {
              if (data.data.result.userLevel === '0') {
                return;
              }

              app.globalData.token = data.data.result.token;
              app.globalData.userType = data.data.result.userType;
              app.globalData.userId = data.data.result.userId;
              app.globalData.userLevelValue = data.data.result.userLevelValue;
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        }
      }
    });
  },

})