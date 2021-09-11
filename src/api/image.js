/*
  文章相关请求接口
*/
import request from '@/utils/request'

// 获取文章列表
export const getImages = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
