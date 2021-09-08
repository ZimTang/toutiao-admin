/*
  文章相关请求接口
*/
import request from '@/utils/request'

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body参数使用data设置
    // Query参数使用params设置
    // Headers参数使用headers设置
    params
  })
}
