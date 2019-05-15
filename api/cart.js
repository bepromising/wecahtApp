'use strict'

const baseUrl = require('./index.js').config.baseUrl;

const API = {
  deleteCart: baseUrl + '/cart/delete.do',
  list: baseUrl + '/cart/list.do',
  update: baseUrl + '/cart/update.do',
  save: baseUrl + '/cart/save.do',
};

module.exports.Cart = API;