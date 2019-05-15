'use strict'

const baseUrl = require('./index.js').config.baseUrl;

const API = {
  cancel: baseUrl + '/order/cancel.do',
  comment: baseUrl + '/order/comment.do',
  confirm: baseUrl + '/order/confirm.do',
  getOrder: baseUrl + '/order/get.do',
  list: baseUrl + '/order/list.do',
  pay: baseUrl + '/order/pay.do',
  place: baseUrl + '/order/place.do',
  deliver: baseUrl + '/order/deliver.do',
  receive: baseUrl + '/order/receive.do',
  listComment: baseUrl + '/order/listComment.do',
};

module.exports.Order = API;