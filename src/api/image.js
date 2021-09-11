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

// 收藏文章
export const starImage = (data, imageId) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/user/images/' + imageId,
    data
  })
}

// 收藏文章
export const deleteImage = (imageId) => {
  return request({
    method: 'DELETE',
    url: '/mp/v1_0/user/images/' + imageId
  })
}
