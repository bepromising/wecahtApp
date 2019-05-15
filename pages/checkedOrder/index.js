// pages/order_detail/index.js
const app = getApp();
const Order = require('../../api/order.js').Order;
const Toast = require('../../zanUI/toast/toast.js');

Page({
  data: {
    mainHeight: 0,
    form: {
      orderGoodsList: [],
      contactsAddr: null,
      contactsName: null,
      contactsPhone: null,
      userId: null
    },
    totalPrice: 0
  },

  onLoad: function () {
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({ mainHeight: res.windowHeight });
      }
    });

    this.setData({
      ['form.userId']: app.globalData.userId
    })
    this.getProducts();
  },

  onShow: function () {
    this.getLocationAddr();
  },

  getProducts: function () {
    let products = app.globalData.selectProducts;
    let totalPrice = this.getTotalPrice(products);
    this.setData({
      ['form.orderGoodsList']: products,
      totalPrice: totalPrice
    })
  },

  getLocationAddr: function () {
    if (app.globalData.location.contacts) {
      this.setData({
        ['form.contactsAddr']: app.globalData.location.contacts.contactsAddr,
        ['form.contactsName']: app.globalData.location.contacts.contactsName,
        ['form.contactsPhone']: app.globalData.location.contacts.contactsPhone
      })
    }
  },

  getTotalPrice: function (data) {
    let total = 0;
    for(let i = 0; i < data.length; i++) {
      total += data[i].goodsPrice * data[i].goodsNum
    }
    return total.toFixed(2);
  },

  changeUserRemark: function (e) {
    let userRemark = e.detail.value;
    this.setData({
      ['form.userRemark']: userRemark
    });
  },

  toSelectAddr:function () {
    wx.navigateTo({
      url: '../selectAddress/index'
    })
  },

  hasRole: function (data) {
    let _this = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          _this.place(data);
        } else {
          wx.navigateTo({
            url: '../noRole/index',
          })
        }
      }
    });
  },

  place: function (data) {
    data.orderGoodsList.map(item => {
      item.goodsNum = item.goodsNum.toFixed(1);
    })
    wx.request({
      url: Order.place,
      method: 'POST',
      data: data,
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.navigateTo({
          url: `../order_detail/index?orderId=${res.data.result.orderId}`,
        });
      }
    })
  },

  placeOrder: function () {
    let data = this.data.form;
    if (!data.contactsAddr) {
      Toast({
        selector: '#zan-toast-noAddr',
        message: '请选择地址！'
      });
      return;
    }

    this.hasRole(data);
  }
})