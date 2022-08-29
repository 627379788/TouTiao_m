<template>
    <div class="home_container">
         <!-- 导航栏区域 -->
        <van-nav-bar class="page-nav-bar" fixed>
            <van-button class="nav-btn" slot="title" icon="search" type="info" round size="small" to="/search">搜索</van-button>
        </van-nav-bar>
        <!-- 标签页区域 -->
        <van-tabs class="tab-nav" v-model="active" animated swipeable swipe-threshold="4">
            <van-tab :title="channel.name" v-for="channel in userChannel" :key="channel.id">
            <!-- 文章列表组件 -->
            <articleList :channel="channel"></articleList>
            </van-tab>
            <div slot="nav-right" class="placeholder"></div>
            <div slot="nav-right" class="hamburger-btn">
                <i class="toutiao icon-gengduo" @click="isShowPopup = true"></i>
            </div>
        </van-tabs>
        <!-- 弹出层区域 -->
        <van-popup
        v-model="isShowPopup"
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '100%' }"
        >
        <channelEdit :channelList="userChannel" :active="active" @updateChannel="showChannel"></channelEdit>
        </van-popup>
    </div>
</template>
<script>
import { getUserChannels } from '@/api/user'
import articleList from './components/article-list.vue'
import channelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getStorage } from '@/utils/storage'
    export default {
        name: 'homeIndex',
        components: {
            articleList,
            channelEdit
        },
        computed: {
            ...mapState(['user'])
        },
        data() {
            return {
                active: 0,
                // 用户频道列表
                userChannel: [],
                // 控制弹出层标识
                isShowPopup: false
            }
        },
        methods: {
            // 获取用户频道
            async getChannels () {
                // 1.登录状态
                if (this.user) {
                    // 调用接口 获取用户频道
                    const { data } = await getUserChannels()
                    this.userChannel = data.data.channels
                } else {
                    // 未登录,且本地存储有频道数据
                    if (getStorage('User-Channels')) {
                        this.userChannel = getStorage('User-Channels')
                    } else {
                    // 未登录，且本地存储没有数据
                    const { data } = await getUserChannels()
                    this.userChannel = data.data.channels
                    }
                }
            },
            // 切换展示频道信息
            showChannel(index, showPopup = true) {
                // 切换频道active
                this.active = index
                // 关闭弹出层
                this.isShowPopup = showPopup
            }
        },
        created() {
            // 获取用户频道
            this.getChannels()
        }
    }
</script>
<style lang="less" scoped>
.home_container {
    padding-top: 167px;
    padding-bottom: 110px;
     .nav-btn {
        width: 555px;
        height: 64px;
        font-size: 28px;
        background-color: #5babfb;
        border:none;
         .van-icon {
            font-size: 32px;
         }
    }
    // 加deep深度样式 确保后面的子元素能够获取样式
    /deep/ .tab-nav {
        .van-tabs__wrap{
            height: 82px!important;
            position: fixed;
            top: 85px;
            z-index: 1;
            left: 0;
            right: 0;
        }
        .van-tab {
            border-right: 1px solid #edeff3;
            // flex布局宽高失效，利用min-width加宽度
            min-width:200px;
            font-size: 28px;
            color: #777;
        }
        .van-tab--active{
            color: #333;
        }
        .van-tabs__line{
            bottom: 8px;
            width: 31px;
            height: 6px;
            background-color: #3296fa;
        }
        .van-tabs__nav--line{
            padding-bottom: 0;
        }
         .placeholder {
                // 1表示参与flex计算 0表示不参与
                flex-shrink: 0;
                width: 39px;
                height: 48px;
            }
        .hamburger-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 66px;
            height: 82px;
            position: fixed;
            right: 0;
            background-color: #fff;
            opacity: 0.902;
            .toutiao{
                font-size:33px;
            }
            // &表示父元素
            &:before {
                content: "";
                position: absolute;
                left: 0;
                width: 1px;
                height: 100%;
                background: url("~@/assets/gradient-gray-line.png");
                background-size: contain;
            }
        }
    }
}
</style>