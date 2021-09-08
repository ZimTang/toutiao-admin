import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
  // 请求的基础路径
  baseURL: 'http://api-toutiao-web.itheima.net/'
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  // 统一设置token
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  // console.log(config)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 导出请求方法
export default request
