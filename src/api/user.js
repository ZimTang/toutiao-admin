/*
  用户相关请求模块
*/
import request from '@/utils/request'

// 用户登录
export const doLogin = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}

// 修改用户头像
// 必须是formdata格式的数据
export const updateUserAvatar = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

// 修改用户资料
export const updateUser = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
