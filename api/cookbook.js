'use strict'

const baseUrl = require('./index.js').config.baseUrl;

const API = {
  deleteCoodBook: baseUrl + '/cookbook/delete.do',
  list: baseUrl + '/cookbook/list.do',
  update: baseUrl + '/cookbook/update.do',
  save: baseUrl + '/cookbook/save.do',
  getCoodBook: baseUrl + '/cookbook/get.do',
};

module.exports.Cookbook = API;