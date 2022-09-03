/* 文章相关的请求模块 */
import request from '@/utils/request'
// 获取文章新闻推荐
export const getArticle = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}

// 获取文章详情信息
export const getArticleById = articleId => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${articleId}`
    })
}

// 收藏文章
export const articleCollect = target => {
    return request({
        method: 'POST',
        url: `/v1_0/article/collections`,
        data: {
            target
        }
    })
}

// 取消收藏文章
export const articleUncollect = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`
    })
}

// 点赞文章
export const articleLiked = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/likings',
        data: {
            target
        }
    })
}

// 取消点赞文章
export const articleUnliked = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`
    })
}