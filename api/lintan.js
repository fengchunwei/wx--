const http = require('./http.js')
const HOST = require('../constants/config.js')
//帖子列表
function getLuntanlist(){
  return http.post(HOST.BASE_HOST+"/api/bbs/bbsPosts/open/list",{
    // postsId:postsId,
    // title:title
  });
}
//发布帖子
function getSendList(categoryId,title,intro,coverImgUrl){
  return http.post(HOST.BASE_HOST+"/api/bbs/bbsPosts/site/add",{
    categoryId,
    title,
    intro,
    coverImgUrl
  });
}
function getLuntanlist(){
  return http.post(HOST.BASE_HOST+"/api/bbs/bbsPosts/open/list",{
    // postsId:postsId,
    // title:title
  });
}



exports.getSendList = getSendList;
exports.getLuntanlist = getLuntanlist;
