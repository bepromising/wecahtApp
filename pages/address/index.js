// pages/address/index.js
const app = getApp();
const Dialog = require('../../zanUI/dialog/dialog');
const Contacts = require('../../api/contacts.js').Contacts;

Page({
  data: {
    mainHeight: 0,
    addressArr: []
  },

  onLoad: function () {
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({ mainHeight: res.windowHeight});
      }
    });
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
        if (res.data.result.list) {
          _this.setData({
            addressArr: res.data.result.list
          });
        } else {
          _this.setData({
            addressArr: []
          });
        }
      }
    })
  },

  delete: function (e) {
    let index = e.currentTarget.dataset.index,
        id = this.data.addressArr[index].contactsId,
        _this = this;
    Dialog({
      message: '真的要删除吗？',
      selector: '#zan-dialog-delete',
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
        _this.deleteContact(id);
      }
    });
  },

  deleteContact: function (contactsId) {
    let _this = this;
    wx.request({
      url: Contacts.deleteContacts,
      method: 'POST',
      data: {
        contactsId: contactsId
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        _this.getContactsList();
      }
    })
  },

  edit: function (e) {
    let index = e.currentTarget.dataset.index;
    let address = this.data.addressArr[index];
    wx.navigateTo({
      url: `../address_detail/index?contactsId=${address.contactsId}`,
    });

  }


})