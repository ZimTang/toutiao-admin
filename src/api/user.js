/*
  用户相关请求模块
*/
import request from '@/utils/request'

// 用户登录
export const doLogin = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取用户信息
export const getUserProfile = (token) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile',
    headers: {
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjMwOTE4MDk4fQ.jLk5l9S8-LpKB9B9V2_QZ8WI4A-69jpxf71shWg_RMw
      Authorization: 'Bearer ' + token
    }
  })
}

// 修改用户信息
