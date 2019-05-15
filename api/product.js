'use strict'

const baseUrl = require('./index.js').config.baseUrl;

const API = {
  list: baseUrl + '/goods/list.do',
  getPro: baseUrl + '/goods/get.do',
};

module.exports.Product = API;