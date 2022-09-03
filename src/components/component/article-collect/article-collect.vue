<template>
        <van-icon  :name="value ? 'star' : 'star-o'"
        :class=" {collected : value }" @click='onColllect'/>
</template>
<script>
    import { articleCollect, articleUncollect } from '@/api/article'
    export default {
        name: 'CollectArticle',
        props: {
            value: {
            type: Boolean,
            required: true
            },
            target: {
                type: [String, Number, Object],
                required: true
            }
        },
        data() {
            return {}
        },
        methods: {
            // 取消或者关注文章
            async onColllect() {
                try {
                    if (this.value) {
                        // 已关注，执行取消关注文章逻辑
                        await articleUncollect(this.target)
                    } else {
                        // 未关注，执行关注文章逻辑
                        await articleCollect(this.target)
                    }
                    this.$emit('input', !this.value)
                    this.$toast.success(!this.value ? '关注文章成功' : '取消关注成功')
                } catch (error) {
                    this.$toast('操作失败，请稍后再试')
                    console.log(error)
                }
            }
        },
        created() {}
    }
</script>
<style lang="less" scoped>
    .collected {
        color: #ffa500
    }
</style>