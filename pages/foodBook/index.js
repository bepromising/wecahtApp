// pages/foodBook/index.js
const app = getApp();
const Cookbook = require('../../api/cookbook.js').Cookbook;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cookbooks: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: "刷新中",
      mask: true
    });
    this.getAll();
  },

  getAll: function (e) {
    let data;
    if (e) {
      data = {
        cookbookName: e.detail.value,
        paginationFlag: false
      }
    } else {
      data = {
        paginationFlag: false
      }
    }
    let _this = this;
    wx.request({
      url: Cookbook.list,
      method: 'POST',
      data: data,
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.hideLoading();
        _this.setData({
          cookbooks: res.data.result.list
        });
      }
    })
  },

  toDetail: function (e) {
    let index = e.currentTarget.dataset.index
    let cookbook = this.data.cookbooks[index];
    wx.navigateTo({
      url: `../cookbook_detail/index?cookbookId=${cookbook.cookbookId}`,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: "刷新中",
      mask: true
    });
    this.getAll();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})