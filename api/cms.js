const HOST = require('../constants/config.js')
const http = require('./http.js')

function getNewslist(pageNum=1,pageSize=10){
  return http.post(HOST.BASE_HOST+"/api/cms/article/open/list",{
    pageNum:pageNum,
    pageSize:pageSize
  });
}

function chengimg(){
  return http.post(HOST.BASE_HOST+"/api/system/user/profile/update/avatar/nos",{
  
  });
}

function chenguserInfo(userName,email){
  return http.post(HOST.BASE_HOST+"/api/system/user/profile/update",{
    userName:userName,
    email:email
  });
}
exports.getNewslist = getNewslist;
exports.chengimg = chengimg;
exports.chenguserInfo = chenguserInfo;
