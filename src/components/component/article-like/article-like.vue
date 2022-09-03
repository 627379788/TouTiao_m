<template>
    <van-icon
    :name="this.value === -1 ? 'good-job-o' : 'good-job'"
    :class="{ liked : this.value === 1}"
    :loading="loading"
     @click="onLike"/>
</template>
<script>
    import { articleLiked, articleUnliked } from '@/api/article'
    export default {
        name: 'LikeIndex',
        props: {
            value: {
                type: Number,
                required: true
            },
            target: {
                type: [Number, String, Object],
                required: true
            }
        },
        data() {
            return {
                loading: false
            }
        },
        methods: {
            // 点赞或取消点赞函数
            async onLike() {
                try {
                    let status = -1
                    if (this.value === -1) {
                        // 未点赞，执行点赞逻辑代码
                        await articleLiked(this.target)
                        status = 1
                    } else {
                        // 已点赞，执行未点赞逻辑代码
                        await articleUnliked(this.target)
                    }
                    this.$emit('input', status)
                    this.$toast.success(status === -1 ? '取消点赞成功' : '点赞成功')
                } catch (error) {
                    this.$toast('操作失败')
                }
            }
        },
        created() {}
    }
</script>
<style lang="less" scoped>
   .liked {
        color: #e5645f !important;
    }
</style>