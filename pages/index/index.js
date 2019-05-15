//index.js
//获取应用实例
const app = getApp();
const Product = require('../../api/product.js').Product;
const Ad = require('../../api/ad.js').Ad;
const Cart = require('../../api/cart.js').Cart;


Page({
  data: {
    address: '选择地址',
    swiperImg: {
      autoplay: true,
      interval: 3000,
      imgUrls: []
    },
    swiperKinds: {
      kinds: [{
        name: '今日新品',
        img: '../../assets/img/new.jpg',
        itsType: '1'
      }, {
        name: '套餐优惠',
        img: '../../assets/img/banner3.jpg',
        itsType: '2'
      }]
    },
    products: [],
    shoppingModal: {
      num: 1,
      animationData: null,
      show: false,
      product: null
    }
  },

  onLoad: function () {
    let _this = this;
    wx.showLoading({
      title: "加载中",
      mask: true
    });

    app.getLogin().then(function (res) {
      if (res) {
        _this.getHotProducts();
        _this.getAd();
      }
    });
  },

  onShow: function () {
    if (app.globalData.token) {
      wx.showLoading({
        title: "加载中",
        mask: true
      });
      this.getHotProducts();
      this.getAd();
    }
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: "刷新中",
      mask: true
    });
    this.getHotProducts();
    this.getAd();
  },

  search: function (e) {
    wx.navigateTo({
      url: '../products/index?goodsName=' + e.detail.value,
    })
  },

  getAd: function () {
    let _this = this;
    wx.request({
      url: Ad.list,
      method: 'POST',
      data: {
        paginationFlag: false
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        _this.setData({
          swiperImg: {
            imgUrls: res.data.result.list
          }
        });
      }
    })
  },

  getHotProducts: function () {
    let _this = this;
    wx.request({
      url: Product.list,
      method: 'POST',
      data: {
        paginationFlag:false,
        hotFlag: '1'
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        if (res.data.success) {
          _this.setData({
            products: res.data.result.list
          });
        } else {
          _this.setData({
            products: []
          });
        }
      }
    })
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
  },

  addShoppingCar: function (e) {
    let index = e.currentTarget.dataset.index,
        product = this.data.products[index];
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

  banner_toProduct: function (e) {
    let index = e.currentTarget.dataset.index,
        item = this.data.swiperImg.imgUrls[index];

    if (item.goodsId) {
      wx.navigateTo({
        url: `../product_detail/index?id=${item.goodsId}`
      })
    } 
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
    let id = this.data.products[index].goodsId;
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

  toProducts: function (e) {
    let itsType = e.currentTarget.dataset.itstype, options;
    if (itsType === '1') {
      options = `newFlag=1`;
    } else {
      options = `goodsType=1`;
    }
    wx.navigateTo({
      url: '../products/index?' + options,
    })
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
  }
})
