<template>
   <div class="updataName-container">
    <van-nav-bar
        title="设置昵称"
        left-text="返回"
        right-text="完成"
        @click-left="$emit('closePopup')"
        @click-right="onUpdate"
        />
    <!-- 文本框区域 -->
    <div class="filed-name">
        <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
        />
    </div>
   </div>
</template>
<script>
    import { updateUserInfo } from '@/api/user'
    export default {
        name: 'UpdataName',
        props: {
            value: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                message: this.value
            }
        },
        methods: {
            // 修改用户基本信息
            async onUpdate() {
                try {
                    this.$toast.loading({
                    message: '保存中...',
                    forbidClick: true, // 禁用背景点击
                    duration: 0 // 设置持续时间
                    })
                    if (!this.message) {
                        return this.$toast('昵称不能为空')
                    }
                    await updateUserInfo({
                        name: this.message
                    })
                    // 关闭弹层
                    this.$emit('closePopup')
                    // 更新视图
                    this.$emit('input', this.message)
                    // 提示修改成功
                    this.$toast.success('更新成功')
                } catch (error) {
                    this.$toast.fail('更新失败')
                }
            }
        },
        created() {}
    }
</script>
<style lang="less" scoped>
    .filed-name {
        margin:15px;
    }
</style>