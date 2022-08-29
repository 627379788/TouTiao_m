import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式
import './styles/global.less'
// 导入vant组件库
import Vant from 'vant'
// 导入vant组件样式
import 'vant/lib/index.css'
// 用于设置 rem 基准值
import 'amfe-flexible'
// 导入dayjs组件
import '@/utils/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')