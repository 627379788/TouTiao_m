import Vue from 'vue'
import Vuex from 'vuex'
import { setStorage, getStorage } from '@/utils/storage'
Vue.use(Vuex)
const tokenKey = 'userToken'
export default new Vuex.Store({
    state: {
        // 存储当前的token
        user: getStorage(tokenKey)
    },
    mutations: {
        // 设置token值
        setUser(state, data) {
            state.user = data
                // 把token值存储到本地存储,防止刷新页面token值消失
            setStorage(tokenKey, data)
        }
    },
    actions: {

    }
})