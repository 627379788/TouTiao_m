// 封装axios请求模块
import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'
const request = axios.create({
    // 配置基准路径 减少请求代码
    baseURL: 'http://toutiao.itheima.net',
    // 自定义后端返回数据格式，axios默认采用json格式转换
    transformResponse: [function(data) {
        try {
            return jsonBig.parse(data)
        } catch (error) {
            return data
        }
    }]
})

// Add a request interceptor 添加一个请求拦截器
request.interceptors.request.use(function(config) {
    // config 请求配置对象
    // 解构出user对象
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, function(error) {
    // 请求失败，抛出错误
    return Promise.reject(error)
})

// 导出request函数对象
export default request