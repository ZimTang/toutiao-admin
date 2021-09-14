/*
  文章相关请求接口
*/
import request from '@/utils/request'

// 获取素材库
export const getImages = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 收藏图片
export const starImage = (data, imageId) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/user/images/' + imageId,
    data
  })
}

// 删除图片
export const deleteImage = (imageId) => {
  return request({
    method: 'DELETE',
    url: '/mp/v1_0/user/images/' + imageId
  })
}

// 上传图片
export const uploadImage = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}
