import baseUrl from './config.js'

const request = (url = '', data = {}, type = 'GET', header = {}) = {
  return new Promise((resolve, reject) => {
    uni.request({
      method: type,
      url: baseUrl + url,
      data: data,
      header: header,
      dataType: 'json',
    }).then((response) => {
      setTimeout(function(){
        uni.hideLoading()
      }, 200)
      let [error, res] = response;
      resolve(res.data);
    }).catch(error => {
      let [err, res] = error;
      reject(err)
    })
  })
}
export default request;