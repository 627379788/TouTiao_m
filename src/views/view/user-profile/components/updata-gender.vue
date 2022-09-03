<template>
    <div class="gender_container">
        <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
        :default-index="gender"
        />
    </div>
</template>
<script>
    import { updateUserInfo } from '@/api/user'
    export default {
        name: 'UpdateGender',
        props: {
            gender: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                columns: ['男', '女'],
                updateGender: this.gender
            }
        },
        methods: {
            onChange(picker, value, index) {
                this.updateGender = index
            },
            onCancel() {
                this.$emit('close')
            },
            async onConfirm(value, index) {
                try {
                    this.$toast.loading({
                    message: '保存中...',
                    forbidClick: true, // 禁用背景点击
                    duration: 0 // 设置持续时间
                    })
                    await updateUserInfo({
                        gender: this.updateGender
                    })
                    // 关闭弹层
                    this.$emit('close')
                    // 更新视图
                    this.$emit('updateGenders', this.updateGender)
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
</style>