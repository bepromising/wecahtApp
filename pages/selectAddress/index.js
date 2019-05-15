// pages/address/index.js
const app = getApp();
const Contacts = require('../../api/contacts.js').Contacts;
const isPointInPolygon = require('../../utils/determinationRange.js').isPointInPolygon;
const Dialog = require('../../zanUI/dialog/dialog');

Page({
  data: {
    mainHeight: 0,
    addressArr: []
  },

  onLoad: function () {
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({ mainHeight: res.windowHeight });
      }
    });
    _this.getContactsList();
  },

  onShow: function () {
    this.getContactsList();
  },

  addAddress: function () {
    wx.navigateTo({
      url: '../address_detail/index'
    })
  },

  getContactsList: function () {
    let _this = this;
    wx.request({
      url: Contacts.list,
      method: 'POST',
      data: {
        paginationFlag: false
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        _this.setData({
          addressArr: res.data.result.list
        });
      }
    })
  },

  select: function (e) {
    let index = e.currentTarget.dataset.index, test_point = { lng: 113.018286, lat: 22.867023 },
        address = this.data.addressArr[index];

    let point = {
      lng: address.lng,
      lat: address.lat
    }

    if (!isPointInPolygon(point)) {
      Dialog({
        message: '该地址不在配送范围，请重新选择地址。',
        selector: '#zan-dialog-tips',
        buttons: [{
          text: '取消',
          color: '#cccccc',
          type: 'cancel'
        }, {
          text: '确定',
          color: '#d32d2d',
          type: 'delete'
        }]
      })
    } else {
      app.globalData.location.contacts = address;
      wx.navigateBack({
        delta: 1
      })
    }
  },

  edit: function (e) {
    let index = e.currentTarget.dataset.index;
    let address = this.data.addressArr[index];
    wx.navigateTo({
      url: `../address_detail/index?contactsId=${address.contactsId}`,
    });

  }


})