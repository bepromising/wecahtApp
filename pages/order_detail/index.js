// pages/order_detail/index.js
const Order = require('../../api/order.js').Order;
const app = getApp();

Page({
  data: {
    mainHeight: 0,
    order: {},
    status_style: {
      color: '#49B63E', // 完成 '#49B63E' ； 关闭 '#B65441' ； 未完成 '#B6AA27'
      icon: 'passed', // 完成 'passed' ； 关闭 'close' ； 未完成 'clock'
    },
    totalPrice: 0
  },

  onLoad: function (option) {
    let _this = this;
    this.getOrder(option.orderId);
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({ mainHeight: res.windowHeight });
      }
    });
  },

  getOrder: function (orderId) {
    let _this = this;
    wx.request({
      url: Order.getOrder,
      method: 'POST',
      data: {
        orderId
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        _this.setData({
          order: res.data.result
        });
        _this.changeStyle(res.data.result.orderState);
        _this.getTotalPrice(res.data.result.orderGoodsList);
      }
    })
  },

  changeStyle: function (orderState) {
    if (orderState === '4') {
      this.setData({
        ['status_style.color']: '#49B63E',
        ['status_style.icon']: 'passed'
      });
    } else if (orderState === '99') {
      this.setData({
        ['status_style.icon']: 'close',
        ['status_style.color']: '#B65441',
      });
    } else {
      this.setData({
        ['status_style.icon']: 'clock',
        ['status_style.color']: '#B6AA27'
      });
    }
  },

  getTotalPrice: function (data) {
    let total = 0;
    for (let i = 0; i< data.length; i++) {
      total += data[i].goodsNum * data[i].goodsPrice
    }

    this.setData({
      totalPrice: total.toFixed(2)
    })
  },

  pay: function () {
    let orderId = this.data.order.orderId;
    wx.request({
      url: Order.pay,
      method: 'POST',
      data: {
        orderId
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.requestPayment({
          timeStamp: res.data.result.timeStamp,
          nonceStr: res.data.result.nonceStr,
          package: res.data.result.package,
          signType: res.data.result.signType,
          paySign: res.data.result.paySign,
          success: function (res) {
            wx.switchTab({
              url: '../index/index',
            });
          }
        })
      }
    })
  },

  comment: function () {
    let orderId = this.data.order.orderId;
    wx.navigateTo({
      url: `../comment/index?orderId=${orderId}`,
    })
  }
})