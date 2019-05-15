// pages/suggest/index.js
const Order = require('../../api/order.js').Order;
const app = getApp();

Page({
  data: {
    mainHeight: 0,
    num: 0,
    comment: {
      commentContent: ''
    },
    list: []
  },

  onLoad: function (option) {
    let _this = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     _this.setData({ mainHeight: res.windowHeight });
    //   }
    // });
    this.getComment(option.orderId);
  },

  getComment: function (orderId) {
    let _this = this;
    wx.request({
      url: Order.listComment,
      method: 'POST',
      data: {
        orderId
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        if (res.data.result.list) {
          _this.setData({
            list: res.data.result.list.reverse()
          });
        }
        _this.setData({
          ['comment.orderId']: orderId
        });
      }
    })
  },

  change: function (e) {
    let value = e.detail.value;
 
    this.setData({
      num: e.detail.cursor,
      ['comment.commentContent']: value
    })
  },

  save: function () {
    let data = this.data.comment;
    if (data.commentContent === '') return;
    wx.request({
      url: Order.comment,
      method: 'POST',
      data: data,
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.navigateBack({
          delta: 2
        })
      }
    })
  }
})