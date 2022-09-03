<template>
    <van-button
    v-if="is_followed"
    class="follow-btn"
    round
    :loading = 'isloading'
    size="small"
    @click="onFollow()">
        已关注
    </van-button>
    <van-button
    v-else
    :loading = 'isloading'
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow()">
        关注
    </van-button>
</template>
<script>
    import { followUser, isFollowUser } from '@/api/user.js'
    export default {
        name: 'FollowIndex',
        model: {
            prop: 'is_followed',
            event: 'updateIsFollow'
        },
        props: {
            is_followed: {
                type: Boolean,
                required: true
            },
            aut_id: {
                type: [String, Number, Object],
                required: true
            }
        },
        data() {
            return {
                isloading: false
            }
        },
        methods: {
             // 关注或取消关注用户函数
            async onFollow() {
                this.isloading = true // 发起请求，开启loading
                try {
                if (this.is_followed) {
                    // 已经关注，取消关注
                    await isFollowUser(this.target)
                } else {
                    // 未关注，关注用户 用户不能关注自己
                    await followUser(this.target)
                }
                    // 修改关注标识
                    // this.articleDara.is_followed = !this.articleDara.is_followed
                    this.$emit('updateIsFollow', !this.is_followed)
                } catch (error) {
                    let message = '关注作者失败'
                    console.log(error)
                    if (error.response && error.response.status === 400) {
                        message = '不能关注自己'
                    }
                    this.$toast(message)
                }
                this.isloading = false // 发起结束，关闭loading
            }
        },
        created() {}
    }
</script>
<style lang="less" scoped>
</style>