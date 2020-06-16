const http = require('./http.js')
const HOST = require('../constants/config.js')

function detal(articleId){
  return http.get(HOST.BASE_HOST+ `/api/cms/article/open/detail/${articleId}`)
}
exports.detal = detal