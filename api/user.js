'use strict'

const baseUrl = require('./index.js').config.baseUrl;

const API = {
  login: baseUrl + '/user/loginByXcx.do',
  logout: baseUrl + '/user/logout.do',
  sumbitWxUserInfo: baseUrl + '/user/sumbitWxUserInfo.do',
};

module.exports.User = API;