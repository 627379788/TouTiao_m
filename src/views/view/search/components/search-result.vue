<template>
    <div class="result_container">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :error.sync="error"
            error-text="请求失败，点击重新加载">
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
</van-list>
    </div>
</template>
<script>
    import { getSearchResults } from '@/api/search'
    export default {
        name: 'searchResult',
        props: {
            searchText: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                page: 1,
                per_page: 10,
                error: false
            }
        },
        methods: {
            async onLoad() {
            // 异步更新数据
                try {
                    /* // 模拟获取数据失败
                    if (Math.random() < 0.5) {
                        JSON.parse('QQDASDSA')
                    } */
                //    1.获取数据
                const { data } = await getSearchResults({
                    page: this.page,
                    per_page: this.per_page,
                    q: this.searchText
                })
                const results = data.data.results
                //    2.赋值数据到列表
                this.list.push(...results)
                //    3.关闭加载提示
                this.loading = false
                //    4.判断是否还有剩余数据
                if (results.length) {
                    this.page++
                } else {
                    this.finished = true
                }
                } catch (err) {
                    this.error = true
                    this.loading = false
                }
            }
        },
        created() {}
    }
</script>
<style lang="less" scoped>
    .result_container {
        padding-top: 100px;
    }
</style>