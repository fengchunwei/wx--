const HOST = ''
function get(url,option = {}){

  const cookie= wx.getStorageSync("cookie") || "";
  let optionFinal = {
    url:HOST+ url,
    method:'get',
    header:{
      'X-Requested-With':'XMLHttpRequest',
      // "Cookie":cookie
    },
    ...option,
  }
  optionFinal.header.Cookie= cookie; 
//promise,解决异步问题
return new Promise((resolve,reject)=>{
  wx.request({
    ...optionFinal,
    success(res){
      //通用拦截逻辑
  resolve(res)
},
fail(err){
  reject(err)
}
  })
})
}

function post(url,data,option = {}){
  //promise,解决异步问题
  const cookie = wx.getStorageSync("cookie") || "";
  let optionFinal = {
    url: HOST+ url,
    method:'post',
    header:{
      'X-Requested-With':'XMLHttpRequest',
      "content-type": "	application/x-www-form-urlencoded"
    },
    data:data, 
    ...option,
  }
  optionFinal.header.Cookie= cookie; 
  return new Promise((resolve,reject)=>{
    wx.request({
      ...optionFinal,
      success(res){
            //通用拦截逻辑
        resolve(res)
      },fail(err){
        reject(err)
      }
    })
  })
  }

module.exports={
  get,
  post 
}