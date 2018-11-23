import axios from 'axios'
import router from '@/router/index'
axios.defaults.timeout = 30000    // 响应时间,超时500
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'  // 配置请求头
// axios.defaults.headers.Auth = 123
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  if(!window.localStorage.getItem("S_LOGIN_MESSAGE")){
    router.push('login')
  }
    return config
  }, function (error) {
    // 当出现请求错误是做一些事
    return Promise.reject(error)
  })

  // 添加一个返回拦截器
axios.interceptors.response.use(function (response) {
  // if(!window.localStorage.getItem("S_LOGIN_MESSAGE")){
  //   router.push('login')
  // }
  // 对返回的数据进行一些处理
  return response
}, function (error) {
  // 对返回的错误进行一些处理
  return Promise.reject(error)
})

// 返回在vue模板中的调用接口
export default function (method, url, params) {
    return new Promise((resolve, reject) => {
      // if (params) {
      //   params = qs.stringify(params)
      // }
      axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null
      })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }