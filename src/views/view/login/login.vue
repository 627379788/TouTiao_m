<template>
    <div class="login-container">
        <!-- 导航栏区域 -->
        <van-nav-bar
        title="登录" class="page-nav-bar">
        <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
        </van-nav-bar>
        <!-- form表单区域 -->
        <van-form @submit="onSubmit" ref="loginRef">
            <van-field
                v-model="user.mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules="userFormRule.mobile"
                type="number"
                maxlength="11"
            >
            <i slot="left-icon" class="toutiao icon-shouji"></i></van-field>
            <van-field
                v-model="user.code"
                name="code"
                placeholder="请输入验证码"
                :rules="userFormRule.code"
                type="number"
                maxlength="6"
            ><i slot="left-icon" class="toutiao icon-yanzhengma"></i>
                <template #button>
                    <van-count-down :time="1000 * 60" format="ss" @finish="showTimeCount = false" v-if="showTimeCount"/>
                    <van-button v-else round size="small" type="default" class="v-yzm-but" native-type="button" @click="sendSmsBut">发送验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn">
                <van-button  block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { login, sentSms } from '@/api/user'
import router from '../../../router'
export default {
    name: 'login',
    data () {
        return {
            // 用户表单数据
            user: {
                mobile: '13911111111',
                code: '246810'
            },
            // 用户表单验证规则
            userFormRule: {
                mobile: [
                    { required: true, message: '手机号码不能为空' },
                    { pattern: /^1[3|5|9|8|7]\d{9}$/, message: '手机号格式不正确' }
                ],
                code: [
                    { required: true, message: '验证码不能为空' },
                    { pattern: /^\d{6}$/, message: '验证码格式不正确' }
                ]
            },
            // 展示计时器标识
            showTimeCount: false
        }
    },
    methods: {
        async onSubmit() {
            // 1.获取表单数据
            const user = this.user
            // 2.表单数据验证
            this.$toast.loading({
                message: '登录中...',
                forbidClick: true, // 禁用背景点击
                duration: 0 // 设置持续时间
                })
            // 3.发起请求
            try {
                const { data: res } = await login(user)
                // 登录成功，保存token值
                this.$store.commit('setUser', res.data)
                this.$toast.success('登录成功')
                router.back()
            } catch (err) {
                if (err.response.status === 400) {
                     this.$toast.fail('用户名或密码错误')
                } else {
                    this.$toast.fail('请稍后再试')
                }
            }
            // 4.根据请求的响应执行对应的业务逻辑
        },
        // 发送验证码功能
        async sendSmsBut() {
            // 1.验证手机号是否合法
            try {
                await this.$refs.loginRef.validate('mobile')
            } catch (error) {
                return console.log(error)
            }
            // 2.验证通过显示倒计时
            this.showTimeCount = true
            // 3. 发送验证码
            try {
                await sentSms(this.user.mobile)
                this.$toast('发送成功')
            } catch (error) {
                if (error.response.status === 429) {
                    this.$toast('发送验证码太频繁，请稍后再试')
                } else {
                    this.$toast('发送失败')
                }
            }
        }
    },
    created() {}
}
</script>
<style scoped lang="less">
.login-container{
    .toutiao {
        font-size: 37px;
    }
    .v-yzm-but {
        width: 152px;
        height: 46px;
        line-height: 46px;
        font-size: 22px;
        color:#666666;
        background-color: #ededed;
    }
    .login-btn {
        padding: 53px 33px;
        .van-button--info {
            background-color: #6db4fb;
            border:none;
        }
    }
}
</style>