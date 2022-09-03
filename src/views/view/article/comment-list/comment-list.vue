<template>
    <div class="comment_container">
        <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
         error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
        >
  <CommentItem v-for="(item, index) in list" :key="index" :comment=item @updateIsLiking = "item.is_liking = $event"></CommentItem>
</van-list>
    </div>
</template>
<script>
    import { getArticleComment } from '@/api/comment'
    import CommentItem from './comment-item.vue'
    export default {
        name: 'CommentList',
        components: {
            CommentItem
        },
        props: {
            source: {
            type: [String, Number, Object],
            required: 'true'
            },
            list: {
                type: Array,
                // 设置参数默认值
                default: () => []
            }
        },
        data() {
            return {
                // list: [],
                loading: false,
                finished: false,
                offset: null,
                limit: 10,
                error: false
            }
        },
        methods: {
            async onLoad() {
            // 异步更新数据
                try {
                // 1.获取数据
                const { data } = await getArticleComment({
                    type: 'a',
                    source: this.source,
                    offset: this.offset,
                    limit: this.limit
                })
                const { results } = data.data
                console.log(data)
                // 把总数量通过自定义事件的方式传给父组件
                this.$emit('onLoadResult', data.data)
                // 2.把数据赋值给列表
                this.list.push(...results)
                // 3.修改状态
                this.loading = false
                // 4.判断是否还有数据
                if (results.length) {
                    // 数据未加载完
                    this.offset = data.data.last_id
                } else {
                    // 数据已经加载完了
                    this.finished = true
                }
                } catch (error) {
                    this.loading = false
                    this.error = true
                }
            }
        },
        created() {
            this.onLoad()
        }
    }
</script>
<style lang="less" scoped>
</style>