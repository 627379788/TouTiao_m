import Vue from 'vue'
// 加载dayjs文件
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 引入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 全局设置中文语言 es6语法
dayjs.locale('zh-cn')

/*  定义全局过滤器
    过滤器相当于一个全局可用的方法(仅供模板使用)
    参数1: 过滤器名称
    参数2: 过滤器函数
    使用方式: {{表达式 | 过滤器名称}}  管道前面的表达式的结果会传递到函数中
    过滤器的返回值会渲染到使用过滤器的模板位置
 */
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})

// 配置相对时间参数
dayjs.extend(relativeTime)