// pages/orders/index.js
const Order = require('../../api/order.js').Order;
const app = getApp();
const Dialog = require('../../zanUI/dialog/dialog');

Page({
  data: {
    hasOrders: true,
    mainHeight: 0,
    orders: [],
  },

  onLoad: function () {
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({ mainHeight: res.windowHeight });
      }
    });
  },

  onShow: function () {
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    this.getOrderList();
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: "刷新中",
      mask: true
    });
    this.getOrderList();
  },

  getOrderList: function () {
    let _this = this;
    wx.request({
      url: Order.list,
      method: 'POST',
      data: {
        paginationFlag: false,
        userId: app.globalData.userId
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        if (res.data.result.list) {
          _this.setData({
            orders: res.data.result.list,
            hasOrders: true
          });
        } else {
          _this.setData({
            orders: [],
            hasOrders: false
          });
        }
      }
    })
  },

  toDetail: function (e) {
    let index = e.currentTarget.dataset.index,
        orderId = this.data.orders[index].orderId;

    wx.navigateTo({
      url: `../order_detail/index?orderId=${orderId}`,
    });
  },

  cancelOrder: function (e) {
    let index = e.currentTarget.dataset.index, _this = this,
        orderId = this.data.orders[index].orderId;

    Dialog({
      message: '真的要取消吗？',
      selector: '#zan-dialog-cancel',
      buttons: [{
        // 按钮文案
        text: '取消',
        // 按钮文字颜色
        color: '#cccccc',
        // 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击
        type: 'cancel'
      }, {
        text: '确定',
        color: '#d32d2d',
        type: 'delete'
      }]
    }).then((res) => {
      if (res.type === 'delete') {
        wx.request({
          url: Order.cancel,
          method: 'POST',
          data: {
            orderId
          },
          header: {
            'x-shiro-authorization': app.globalData.token
          },
          success: function (res) {
            _this.getOrderList();
          }
        })
      }
    });
  },  
})