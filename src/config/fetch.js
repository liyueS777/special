import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index'
axios.defaults.timeout = 30000 // 响应时间,超时500
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
// axios.defaults.headers.Auth = 123
// 添加一个请求拦截器


// 获取CancelToken
let pending = []
let CancelToken = axios.CancelToken
let removePending = (config, f) => {
  let flagUrl = config.url + '&' + config.method
  if (pending.indexOf(flagUrl) !== -1) {
    if (f) {
      f() // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1) // 把这条记录从数组中移除
    }
  } else {
    if (f) {
      pending.push(flagUrl)
    }
  }
}

axios.interceptors.request.use(function (config) {
  // 全局添加cancelToken

  config.cancelToken = new CancelToken((c) => {
    removePending(config, c)
    })
  return config;
  if (!window.localStorage.getItem("S_LOGIN_MESSAGE")) {
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
  removePending(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  return response
}, function (error) {
  // 对返回的错误进行一些处理
  //当取消请求的时候会有 {message: undefined} ;这个是取消请求返回,如果在全局处理错误的话,这种不应该作为处理或者另外算一种;
  // 'message' in error ?Vue.prototype.$message('不能重复请求哦'):Vue.prototype.$message('数据请求异常~')
  return Promise.reject(error)
})
// 返回在vue模板中的调用接口
export default function (method, url, params) {
  return new Promise((resolve, reject) => {
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
