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