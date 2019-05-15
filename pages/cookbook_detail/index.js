// pages/cookbook_detail/index.js
const app = getApp();
const Cookbook = require('../../api/cookbook.js').Cookbook;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cookbook: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "刷新中",
      mask: true
    });
    this.get(options.cookbookId);
  },

  get: function (id) {
    let _this = this;
    wx.request({
      url: Cookbook.list,
      method: 'POST',
      data: {
        cookbookId: id
      },
      header: {
        'x-shiro-authorization': app.globalData.token
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        _this.setData({
          cookbook: res.data.result.list[0]
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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