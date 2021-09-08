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

// 获取文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 新建文章
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      // 是否存为草稿
      draft
    },
    data
  })
}
