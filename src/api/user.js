/* 用户相关的请求模块 */
import request from '@/utils/request'

// 用户登录请求
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

// 发送验证码请求
export const sentSms = sms => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${sms}`
    })
}

// 获取用户信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
    })
}

// 获取用户频道信息
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}

// 关注用户
export const followUser = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}

// 取消关注用户
export const isFollowUser = (target) => {
    return request({
        method: 'Delete',
        url: `/v1_0/user/followings/${target}`
    })
}

// 获取用户身份信息
export const getUserData = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user/profile`
    })
}

// 编辑用户个人资料
export const updateUserInfo = (data) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}

// 编辑用户照片资料
export const updateUserPhoto = (data) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
    })
}