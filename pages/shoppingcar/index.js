// pages/shoppingcar/index.js

const app = getApp();
const Dialog = require('../../zanUI/dialog/dialog');
const Cart = require('../../api/cart.js').Cart;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainHeight: 0,
    checkedAll: false,
    hasProducts: false,
    products: [
    ]
  },

  onLoad: function () {
    var that = this;
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    that.setData({
      mainHeight: app.globalData.systemInfo.windowHeight
    });
    this.getCartList();
  },

  onShow: function () {
    this.setData({
      checkedAll: false
    })
    this.getCartList();
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: "刷新中",
      mask: true
    });
    this.getCartList();
  },

  getCartList: function () {
    let _this = this;
    wx.request({
      url: Cart.list,
      method: 'POST',
      data: {
        paginationFlag: false,
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
            products: res.data.result.list,
            hasProducts: true
          });
        } else {
          _this.setData({
            products: [],
            hasProducts: false
          });
        }
      }
    })
  },

  goToIndex: function () {
    wx.switchTab({
      url: '../index/index',
    });
  },

  checked: function (e) {
    let index = e.currentTarget.dataset.index,
        checked = `products[${index}].checked`;
    
    this.setData({
      [checked]: !this.data.products[index].checked
    });
    console.log(this.data.products);
  },

  subtract: function (e) {
    let index = e.currentTarget.dataset.index,
      num = this.data.products[index].goodsCount,
      num_str = `products[${index}].goodsCount`;
    if (num === 1) return;
    this.setData({
      [num_str]: num - 1
    });
  },

  add: function (e) {
    let index = e.currentTarget.dataset.index,
      num = this.data.products[index].goodsCount,
      num_str = `products[${index}].goodsCount`;
    this.setData({
      [num_str]: num + 1
    });
  },

  checkedAll: function () {
    let products = this.data.products,
        isAll = this.data.checkedAll;
    this.setData({ checkedAll: !isAll });
    for (let i = 0; i < products.length; i++) {
      let str = `products[${i}].checked`;
      this.setData({
        [str]: !isAll
      });
    }
  },

  delete: function () {
    let _this = this;
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
      let products = _this.data.products, dataArr = [];
      if (res.type === 'delete') {
        for (let i = 0; i < products.length; i++) {
          if (products[i].checked) {
            dataArr.push({ cartId: products[i].cartId})
          }
        }
        _this.deleteCart(dataArr);
        if (!_this.data.products.length) this.setData({ hasProducts: false});
      }
    });
  },

  deleteCart: function (data) {
    let _this = this;
    wx.request({
      url: Cart.deleteCart,
      method: 'POST',
      data: {
        cartList: data
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        if (res.data.success) {
          _this.getCartList();
        }
      }
    })
  },

  tocheckedOrder: function () {
    let products = this.data.products, pro_arr = [];

    for (let i = 0; i < products.length; i++) {
      if (products[i].checked) {
        let data = {
          goodsId: products[i].goodsInfo.goodsId,
          goodsName: products[i].goodsInfo.goodsName,
          goodsNum: products[i].goodsCount,
          goodsPrice: products[i].goodsInfo.goodsPrice,
          goodsThum: products[i].goodsInfo.fileInfoList[0].fileAccessUrl,
          goodsThumFileId: products[i].goodsInfo.fileInfoList[0].fileId
        }
        pro_arr.push(data)
      }
    }

    app.globalData.selectProducts = pro_arr;
    
    wx.navigateTo({
      url: '../checkedOrder/index'
    })
  }

})