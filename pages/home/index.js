// pages/home/index.js

const app = getApp();
const User = require('../../api/user.js').User;

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    userType: null,
    userLevelValue: null,
  },

  onLoad: function () {
    let _this = this;
    
    this.setData({
      userType: app.globalData.userType,
      userLevelValue: app.globalData.userLevelValue,
    });
    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });

  },

  userInfoReadyCallback: function (res) {
    if (res) {
      app.globalData.userInfo = res.userInfo;
      this.setData({ userInfo: res.userInfo, hasUserInfo: true });
      this.sumbitWxUserInfo(res);
    }
  },

  sumbitWxUserInfo: function (res) {
    wx.request({
      url: User.sumbitWxUserInfo,
      method: 'POST',
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      data: {
        nickName: res.userInfo.nickName,
        avatarUrl: res.userInfo.avatarUrl,
        gender: res.userInfo.gender
      }
    })
  },

  getUserInfo: function (res) {
    if (res.detail.userInfo) {
      app.globalData.userInfo = res.detail.userInfo;
      this.setData({ userInfo: res.detail.userInfo, hasUserInfo: true });
      this.sumbitWxUserInfo(res.detail);
    }
  },

  goTo: function (e) {
    let action = e.currentTarget.dataset.action
    this[action]();
  },

  toLocations: function () {
    wx.navigateTo({
      url: '../address/index',
    })
  },

  toOrders: function () {
    wx.navigateTo({
      url: '../orders/index',
    })
  },

  toSuggests: function () {
    wx.navigateTo({
      url: '../suggest/index',
    })
  },

  toUserOrders: function () {
    wx.navigateTo({
      url: '../userOrder/index',
    })
  },

  toFeebBack: function () {
    wx.navigateTo({
      url: '../feedBack/index',
    })
  },

  toFoodBook: function () {
    wx.navigateTo({
      url: '../foodBook/index',
    })
  }

})