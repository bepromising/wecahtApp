//app.js
// const bmap = require('./utils/bmap-wx.js');
const User = require('./api/user.js').User;

App({
  onLaunch: function () {
    let _this = this;
    // let BMap = new bmap.BMapWX({
    //   ak: 'elwxlzWPwvdFpbASxZwMt6L1W6W1bSiS'
    // });
    // this.globalData.BMap = BMap;

    wx.getSystemInfo({
      success: function (res) {
        _this.globalData.systemInfo = res;
      }
    });
  },

  getLogin () {
    let _this = this;
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          if (res.code) {
            _this.globalData.code = res.code;
            wx.request({
              url: User.login,
              data: {
                code: res.code
              },
              method: 'POST',
              success: function (data) {
                if (data.data.result.userLevel === '0') {
                  wx.redirectTo({
                    url: '/pages/noRole/index',
                  });
                  reject(false);
                }
                
                _this.globalData.token = data.data.result.token;
                _this.globalData.userType = data.data.result.userType;
                _this.globalData.userId = data.data.result.userId;
                if (data.data.result.userLevel !== '0') {
                  _this.globalData.userLevelValue = data.data.result.userLevelValue;
                }
                resolve(true);
              },
              fail: function (e) {
                wx.redirectTo({
                  url: '/pages/noRole/index',
                });
              }
            })
          }
        }
      });
    })
  },
  globalData: {
    token: null,
    BMap: null,
    userType: '0',
    userLevelValue: null,
    userId: null,
    userInfo: null,
    location: {
      contacts: null
    },
    selectProducts: []
  }
})