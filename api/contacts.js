'use strict'

const baseUrl = require('./index.js').config.baseUrl;

const API = {
  deleteContacts: baseUrl + '/contacts/delete.do',
  list: baseUrl + '/contacts/list.do',
  update: baseUrl + '/contacts/update.do',
  save: baseUrl + '/contacts/save.do',
  getContacts: baseUrl + '/contacts/get.do',
};

module.exports.Contacts = API;