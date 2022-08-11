import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // 路由组件存放地址
    routes: [{
            // 登录
            name: 'login',
            path: '/login',
            // 懒加载方式加载组件
            component: () =>
                import ('@/views/view/login/login.vue')
        },
        {
            // 默认
            name: 'layoutIndex',
            path: '/',
            // 懒加载方式加载组件
            component: () =>
                import ('@/views/view/layout/layout.vue'),
            // 子路由
            children: [{
                path: '/home', // 首页 path: '' 默认子路由
                name: 'homeIndex',
                // 懒加载方式加载组件
                component: () =>
                    import ('@/views/view/home/home.vue')
            }, {
                // 问答
                name: 'qaIndex',
                path: '/qa',
                // 懒加载方式加载组件
                component: () =>
                    import ('@/views/view/qa/qa.vue')
            }, {
                // 视频
                name: 'videoIndex',
                path: '/video',
                // 懒加载方式加载组件
                component: () =>
                    import ('@/views/view/video/video.vue')
            }, {
                // 我的
                name: 'myIndex',
                path: '/my',
                // 懒加载方式加载组件
                component: () =>
                    import ('@/views/view/my/my.vue')
            }]
        }
    ]
})