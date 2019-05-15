// pages/address_detail/index.js
const app = getApp();
const Contacts = require('../../api/contacts.js').Contacts;
const Toast = require('../../zanUI/toast/toast.js');

Page({
  data: {
    contacts: {
      contactsName: null,
      contactsPhone: null,
      contactsAddr: '',
      defaultFlag: '0'
    },
    isDefault: false,
    isEdit: false
  },

  onLoad: function (option) {
    if (Object.keys(option).length) {
      this.getContact(option.contactsId)
    } else {
      this.setData({
        isEdit: false
      });
    }
  },

  getContact: function (contactsId) {
    let _this = this;
    wx.request({
      url: Contacts.getContacts,
      method: 'POST',
      data: {
        contactsId
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        _this.setData({
          contacts: res.data.result,
          isEdit: true,
          isDefault: res.data.result.defaultFlag === '0' ? false : true
        })
      }
    })
  },

  chooseLocation: function () {
    let _this = this;
    wx.chooseLocation({
      success: function (res) {
        _this.setData({ 
          ['contacts.contactsAddr']: res.address,
          ['contacts.lng']: res.longitude.toString(),
          ['contacts.lat']: res.latitude.toString(),
        });
        console.log(_this.data);
      },
      fail: function (err) {
        console.log('err', err);
      }
    })
  },

  // getLocation: function (BMap) {
  //   let _this = this;
  //   BMap.regeocoding({
  //     success: function (res) {
  //     },
  //     fail: function (err) {}
  //   })
  // },

  
  changeName: function (e) {
    let contactsName = e.detail.value;
    this.setData({
      ['contacts.contactsName']: contactsName
    });
  },

  changePhone: function (e) {
    let contactsPhone = e.detail.value;
    this.setData({
      ['contacts.contactsPhone']: contactsPhone
    });
  },

  changeAddress: function (e) {
    let contactsAddr = e.detail.value;
    this.setData({
      ['contacts.contactsAddr']: contactsAddr
    });
  },

  changeSwitch: function (e) {
    let isDefault = e.detail.value,
      defaultFlag = isDefault ? '1' : '0';
    this.setData({
      ['contacts.defaultFlag']: defaultFlag,
      isDefault
    });
  },

  save: function () {
    let _this = this,
        data = this.data.contacts;
    console.log(data);
    if (!data.contactsName || !data.contactsPhone || !data.contactsAddr) {
      Toast({
        selector: '#zan-toast-save',
        message: '请完整填写信息！'
      });
      return;
    }

    wx.request({
      url: Contacts.save,
      method: 'POST',
      data: data,
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  update: function () {
    let _this = this,
      data = this.data.contacts;

    if (!data.contactsName || !data.contactsPhone || !data.contactsAddr) {
      Toast({
        selector: '#zan-toast-save',
        message: '请完整填写信息！'
      });
      return;
    }

    wx.request({
      url: Contacts.update,
      method: 'POST',
      data: data,
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})