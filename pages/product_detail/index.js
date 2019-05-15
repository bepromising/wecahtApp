// pages/product_detail/index.js
const Product = require('../../api/product.js').Product;
const app = getApp();
const Cart = require('../../api/cart.js').Cart;
const Toast = require('../../zanUI/toast/toast.js');

Page({
  data: {
    mainHeight: 0,
    swiperImg: {
      autoplay: false,
      interval: 3000,
    },
    product: null,
    num: 1
  },

  onLoad: function (options) {
    let _this = this;
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({ mainHeight: res.windowHeight });
      }
    });
    this.getProduct(options.id);
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: "刷新中",
      mask: true
    });
    this.getProduct(this.data.product.goodsId);
  },

  saveCart: function () {
    let product = this.data.product, _this = this,
      num = this.data.num,
      data = {
        goodsId: product.goodsId,
        goodsCount: num
      };
    wx.request({
      url: Cart.save,
      method: 'POST',
      data: {
        cartList: [data]
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        Toast({
          selector: '#zan-toast-addCart',
          message: '加入购物车成功'
        });
      }
    })
  },

  getProduct: function (goodsId) {
    let _this = this;
    wx.request({
      url: Product.getPro,
      method: 'POST',
      data: {
        goodsId: goodsId
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        _this.setData({
          product: res.data.result
        });
      }
    })

  },

  subtract: function (e) {
    let num = this.data.num;
    if (num === 1) return;
    this.setData({
      num: num - 1
    });
  },

  add: function (e) {
    let num = this.data.num;
    this.setData({
      num: num + 1
    });
  },

  tocheckedOrder: function () {
    let product = this.data.product,
      num = this.data.num, data;

    data = {
      goodsId: product.goodsId,
      goodsName: product.goodsName,
      goodsNum: num,
      goodsPrice: product.goodsPrice,
      goodsThum: product.fileInfoList[0].fileAccessUrl,
      goodsThumFileId: product.fileInfoList[0].fileId
    }
    app.globalData.selectProducts = [data];
    wx.navigateTo({
      url: '../checkedOrder/index'
    })
  },

  showVideo: function (e) {
    let product = this.data.product;
    // let index = e.currentTarget.dataset.index;
    console.log(product);
    let video = wx.createVideoContext('shipin', this);
    console.log('2',video);
    video.requestFullScreen({ direction: 0 });
    video.play();

  }

})