<template>
    <div class="layout_container">
        <!-- 路由出口 子路由占位符 -->
        <router-view></router-view>
        <!-- 导航栏区域 route属性 开启路由模式配合to跳转页面 -->
        <!-- route属性出错，正确切换默认子路由:去掉route属性，增加active标识 -->
        <van-tabbar class="tabbar_container" v-model="adcitve" route>
            <van-tabbar-item to="/home">
                <i slot="icon" class="toutiao icon-shouye" />
                <span class="text">首页</span>
            </van-tabbar-item>
            <van-tabbar-item to="/qa">
                <i slot="icon" class="toutiao icon-wenda"/>
                <span class="text">问答</span>
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <i slot="icon" class="toutiao icon-shipin"/>
                <span class="text">视频</span>
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <i slot="icon" class="toutiao icon-wode"/>
                <span class="text">{{$store.state.user? '我的':'未登录'}}</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    export default {
        name: 'layoutIndex',
        data() {
            return {
                adcitve: 0
            }
        },
        methods: {},
        created() {}
    }
</script>
<style lang="less" scoped>
    .layout_container{
        .tabbar_container {
            i.toutiao {
                font-size: 40px;
            }
            .text {
                font-size: 20px;
            }
        }
    }
</style>