// 文章评论相关接口
import request from '@/utils/request'

// 获取文章评论或回复文章评论
export const getArticleComment = (params) => {
    return request({
        mothod: 'GET',
        url: '/v1_0/comments',
        params
    })
}

// 取消对评论或评论回复点赞
export const deleteCommentLikings = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/comment/likings/${target}`
    })
}

// 对评论或评论回复点赞
export const commentLikings = target => {
    return request({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: {
            target
        }
    })
}

// 对文章或者评论进行评论
export const addComments = data => {
    return request({
        method: 'POST',
        url: '/v1_0/comments',
        data
    })
}