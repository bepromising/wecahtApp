// pages/products/index.js
const app = getApp();
const Product = require('../../api/product.js').Product;
const Cart = require('../../api/cart.js').Cart;


Page({
  data: {
    products_list: [],
    shoppingModal: {
      num: 1,
      animationData: null,
      show: false,
      product: null
    }
  },
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    this.getProducts(options);
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: "刷新中",
      mask: true
    });
    this.getProducts();
  },

  search: function (e) {
    this.getProducts({goodsName:e.detail.value});
  },

  getProducts: function (data = {}) {
    let _this = this;
    wx.request({
      url: Product.list,
      method: 'POST',
      data: data,
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        _this.setData({
          products_list: res.data.result.list
        });
      }
    })
  },

  addShoppingCar: function (e) {
    let index = e.currentTarget.dataset.index,
      product = this.data.products_list[index];
    this.setData({
      ['shoppingModal.product']: {
        title: product.goodsName,
        price: product.goodsPrice,
        kucun: product.goodsStock || '很多',
        id: product.goodsId,
        goodsUnit: product.goodsUnit,
        img: product.fileInfoList[0].fileAccessUrl,
        imgId: product.fileInfoList[0].fileId
      },
      ['shoppingModal.num']: 1
    });
    this.showModal();
  },

  saveCart: function () {
    let product = this.data.shoppingModal.product, _this = this,
      num = this.data.shoppingModal.num,
      data = {
        goodsId: product.id,
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
        _this.hideModal();
      }
    })
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    animation.translateY(368).step()
    this.setData({
      ['shoppingModal.animationData']: animation.export(),
      ['shoppingModal.show']: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        ['shoppingModal.animationData']: animation.export()
      })
    }.bind(this), 200)
  },


  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(368).step()
    this.setData({
      ['shoppingModal.animationData']: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        ['shoppingModal.animationData']: animation.export(),
        ['shoppingModal.show']: false
      })
    }.bind(this), 200)
  },

  toProductDetail: function (e) {
    let index = e.currentTarget.dataset.goodindex;
    let id = this.data.products_list[index].goodsId;
    wx.navigateTo({
      url: '../product_detail/index?id=' + id,
    })
  },

  subtract: function () {
    let num = this.data.shoppingModal.num,
      num_str = `shoppingModal.num`;
    if (num === 1) return;
    this.setData({
      [num_str]: num - 1
    });
  },

  add: function (e) {
    let num = this.data.shoppingModal.num,
      num_str = `shoppingModal.num`;
    this.setData({
      [num_str]: num + 1
    });
  },

  tocheckedOrder: function () {
    let product = this.data.shoppingModal.product,
      num = this.data.shoppingModal.num, data;

    data = {
      goodsId: product.id,
      goodsName: product.title,
      goodsNum: num,
      goodsPrice: product.price,
      goodsThum: product.img,
      goodsThumFileId: product.imgId
    }
    app.globalData.selectProducts = [data];
    this.hideModal();
    wx.navigateTo({
      url: '../checkedOrder/index'
    })
  }

})