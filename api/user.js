const http = require('./http.js')
const HOST = require('../constants/config.js')

function login(username,password,rememberMe=true){
  return http.post(HOST.BASE_HOST+'/api/login',{username,password,rememberMe})
}
function userInfo(){
  return http.get(HOST.BASE_HOST+'/api/login-user/info',{header:{"custom":'123'}})
}
exports.login = login
exports.userInfo = userInfo