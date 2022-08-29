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