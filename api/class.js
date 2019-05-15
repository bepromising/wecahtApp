'use strict'

const baseUrl = require('./index.js').config.baseUrl;

const API = {
  list: baseUrl + '/class/list.do'
};

module.exports.Class = API;