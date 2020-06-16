const http = require('./http.js')
const HOST = require('../constants/config.js')

function listVideo(area="港台", order="最热", limit=30, offset=0) {
  return http.get(`${HOST.WY_HOST}/mv/all?area=${area}&order=${order}&limit=${limit}&offset=${offset}`)
}

function videoMv(id) {
  return http.get(`${HOST.WY_HOST}/mv/url?id=${id}`)
}

module.exports.listVideo = listVideo
module.exports.videoMv = videoMv