<template>
    <div class="brithday_container">
        <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        />
    </div>
</template>
<script>
    import dayjs from 'dayjs'
    import { updateUserInfo } from '@/api/user'
    export default {
        name: 'UpdateBirthday',
        props: {
            value: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                minDate: new Date(1970, 0, 1),
                maxDate: new Date(2025, 10, 1),
                currentDate: new Date(this.value)
            }
        },
        methods: {
            async onConfirm() {
                try {
                    this.$toast.loading({
                    message: '保存中...',
                    forbidClick: true, // 禁用背景点击
                    duration: 0 // 设置持续时间
                    })
                    // 把日期格式的时间转换为字符串格式
                    const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
                    await updateUserInfo({
                        birthday: birthday
                    })
                    // 关闭弹层
                    this.$emit('close')
                    // 更新视图
                    this.$emit('input', birthday)
                    // 提示修改成功
                    this.$toast.success('更新成功')
                } catch (error) {
                    this.$toast.fail('更新失败')
                    console.log(error)
                }
            }
        },
        created() {}
    }
</script>
<style lang="less" scoped>
</style>