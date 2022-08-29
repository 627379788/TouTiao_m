<template>
    <!-- 文章列表组件 -->
    <div class="article-list">
        <!-- 下拉刷新项 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="refreshText" success-duration="1000">
        <!-- list列表项 -->
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad">
        <!-- <van-cell v-for="(article,id) in list" :key="id" :title="article.title" /> -->
        <articleItem v-for="(article,id) in list" :key="id" :article="article"></articleItem>
    </van-list>
    </van-pull-refresh>
    </div>
</template>
<script>
import { getArticle } from '@/api/article'
import articleItem from '@/components/component/article-item/article-item.vue'
    export default {
        name: 'articleList',
        props: {
            channel: {
                type: Object,
                required: true
            }
        },
        components: {
            articleItem
        },
        data() {
            return {
                // 列表数组
                list: [],
                // 控制加载更多标识
                loading: false,
                // 控制加载完成标识
                finished: false,
                // 时间戳参数
                timestamp: null,
                // 控制错误提示信息
                error: false,
                // 下拉刷新菜单标识
                isLoading: false,
                // 刷新成功展示的文字信息
                refreshText: '刷新成功'
            }
        },
        methods: {
            // 加载文章list函数
            async onLoad() {
            // 异步更新数据 首次加载或者滚动到底部会调用这个方法
            // 数据没铺满页面会再次获取数据
            try {
                // 1.发起请求
                const { data } = await getArticle({
                channel_id: this.channel.id,
                // 时间戳，新数据传当前的时间戳，历史数据传获得参数的时间戳
                timestamp: this.timestamp || Date.now()
            })
                 /* 用random随机数模拟随机网络请求失败情况
                if (Math.random() > 0.5) {
                    JSON.parse('asdasdasd')
                } */
                const { results } = data.data
                // 2.把数据push到数组 ...数组展开运算符
                this.list.push(...results)
                // 3.把loading设为false
                this.loading = false
                // 4.判断数据是否加载完
                if (results.length) {
                    // 没加载完，把时间戳赋值给下次请求
                    this.timestamp = data.data.pre_timestamp
                } else {
                    // 加载完，把完成加载标识设为true
                    this.finished = true
                }
            } catch (error) {
                this.loading = false
                this.error = true
             }
            },
            // 下拉刷新函数
            async onRefresh () {
                try {
               /*  用random随机数模拟随机网络请求失败情况
                 if (Math.random() > 0.5) {
                     JSON.parse('asdasdasd')
                  } */
                // 1.发起请求获取参数
                const { data } = await getArticle({
                channel_id: this.channel.id,
                // 时间戳，获取最新数据传当前的时间戳，
                timestamp: Date.now() })
                // 2.把最新的数据unshift存到数组的最前面
                const { results } = data.data
                this.list.unshift(...results)
                // 结束刷新状态
                this.isLoading = false
                // 3.展示刷新成功消息
                this.refreshText = `刷新成功，新增${results.length}条数据`
                } catch (error) {
                    // 请求失败
                    this.isLoading = false
                    this.refreshText = '刷新失败'
                }
            }
        },
        created() {}
    }
</script>
<style lang="less" scoped>
// vw vh视口 根据浏览器窗口 不受父元素影响
.article-list {
    height:79vh;
    overflow-y:auto;
}
</style>