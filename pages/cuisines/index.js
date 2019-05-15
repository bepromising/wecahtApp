// pages/categories/index.js
const app = getApp();
const Class = require('../../api/class.js').Class;
const parseTreeNode = require('../../utils/tramsform.js').parseTreeNode;

Page({
  data: {
    mainActiveIndex: 0,
    second_height: 0,
    tree: [],
    kinds: [],
  },

  onLoad: function () {
    var that = this
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    that.setData({
      second_height: app.globalData.systemInfo.windowHeight - app.globalData.systemInfo.windowWidth / 750 * 104,
    });
  },

  onShow: function () {
    this.getAllClass();
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: "刷新中",
      mask: true
    });
    this.getAllClass();
  },

  getAllClass() {
    let _this = this;
    wx.request({
      url: Class.list,
      data: {
        paginationFlag: false,
        classType: '2'
      },
      method: 'POST',
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        let tree = parseTreeNode(res.data.result.list, '0', 'parentId', 'classId');
        _this.setData({
          tree: tree,
          kinds: tree[0].children,
          mainActiveIndex: 0
        });
      }
    })
  },

  tapLeft: function (e) {
    let index = e.target.dataset.index, _this = this;
    this.setData({ mainActiveIndex: index, kinds: _this.data.tree[index].children });
  },

  search: function (e) {
    wx.navigateTo({
      url: '../products/index?goodsName=' + e.detail.value,
    })
  },

  toProducts: function (e) {
    let classId = e.currentTarget.dataset.classid;
    wx.navigateTo({
      url: '../products/index?secondClassId=' + classId,
    })
  },

})