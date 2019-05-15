'use strict'

const baseUrl = require('./index.js').config.baseUrl;

const API = {
  list: baseUrl + '/ad/list.do',
};

module.exports.Ad = API;