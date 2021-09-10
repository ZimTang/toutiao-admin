import axios from 'axios'
import JSONBIGINT from 'json-bigint'

// 创建一个axios实例
const request = axios.create({
  // 请求的基础路径
  baseURL: 'http://api-toutiao-web.itheima.net/',
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      // 通过json-bigint库 处理超过js数据最大值的情况 将超过安全范围的js数值 转为bigint类型
      return JSONBIGINT.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
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
