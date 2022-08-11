<template>
    <div class="my_container">
        <!-- 未登录 -->
       <div v-if="!user" class="header not-login">
            <div class="login_div"  @click="$router.push('/login')">
                <img class="login_img" src="~@/assets/mobile.png" alt="">
                <span class="text">登录 / 注册</span>
            </div>
       </div>
       <!-- 已登录 -->
       <div  v-else class="header is-login">
        <div class="base-info">
            <div class="info-right">
                <van-image round class="right-image" fit="cover" :src="userInfo.photo"/>
                <span class="text">{{userInfo.name}}</span>
            </div>
            <div class="info-left">
               <van-button type="default" round class="edit_but" size="mini"><span>编辑资料</span></van-button>
            </div>
        </div>
        <div class="data-state">
            <div class="data-info">
                <div class="count">{{userInfo.art_count}}</div>
                <div class="text">头条</div>
            </div>
            <div class="data-info">
                <div class="count">{{userInfo.follow_count}}</div>
                <div class="text">关注</div>
            </div>
            <div class="data-info">
                <div class="count">{{userInfo.fans_count}}</div>
                <div class="text">粉丝</div>
            </div>
            <div class="data-info">
                <div class="count">{{userInfo.like_count}}</div>
                <div class="text">获赞</div>
            </div>
        </div>
    </div>
       <!-- Grid 宫格 -->
        <van-grid :column-num="2" clickable class="grid-nav cb-9">
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao icon-shoucang"></i>
                <span slot="text" class="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item">
                 <i slot="icon" class="toutiao icon-lishi"></i>
                <span slot="text" class="text">历史</span>
            </van-grid-item>
        </van-grid>
        <!-- cell单元格 -->
        <van-cell title="消息通知" is-link  />
        <van-cell class="cb-9" title="小智同学" is-link  />
        <van-cell v-if="user" class="exit-login" title="退出登录" clickable @click="login_out"/>

    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
    export default {
        name: 'myIndex',
        data() {
            return {
                userInfo: {}
            }
        },
        methods: {
            // 退出登录函数
            login_out() {
                // 组件中使用dialog前面要加this.$dialog
                this.$dialog.confirm({
                title: '确定要退出吗?'
                })
                .then(() => {
                    // 点击确定 删除store以及localStorage中的user
                    this.$store.commit('setUser', null)
                })
                .catch(() => {
                    // 点击取消 执行
                    this.$toast('取消退出')
                })
            },
            // 获取用户信息
            async getUser() {
                try {
                    const { data } = await getUserInfo()
                    this.userInfo = data.data
                } catch (error) {
                    this.$toast('获取用户信息失败')
                }
            }
        },
        computed: {
            ...mapState(['user'])
        },
        created() {
            // 已经登录则获取用户信息
            if (this.user) {
                this.getUser()
            }
        }
    }
</script>
<style lang="less" scoped>
.my_container {
    .header {
        height: 361px;
        // ~@css别名使用
        background: url("~@/assets/banner.png");
        background-size: cover;
    }
     .not-login{
            display: flex;
            align-items: center;
            justify-content: center;
            .login_div{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                .login_img {
                    height: 132px;
                    width: 132px;
                }
                .text{
                    font-size: 28px;
                    margin-top: 15px;
                    color: #fff;
                }
            }
        }
     .is-login {
        .base-info {
            height: 231px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .info-right {
                padding: 76px 32px 23px;
                display:flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                .right-image {
                    height: 132px;
                    width: 132px;
                    border: 4px solid #fff;
                    margin-right: 20px;
                }
                .text {
                    font-size: 30px;
                    color:#fff;
                }
            }
            .info-left {
                padding-right: 32px;
                .edit_but {
                    padding: 0 20px;
                    font-size: 20px;
                }
            }
        }
        .data-state {
            height: 130px;
            display: flex;
            .data-info {
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color: #fff;
                .count {
                    font-size: 36px;
                }
                .text {
                    font-size: 23px;
                }
            }
        }
     }
     .grid-nav {
        .grid-item {
            .toutiao {
                font-size: 45px;
            }
            .icon-shoucang {
                color: #eb5253;
            }
            .icon-lishi {
                color: #ff9d1e;
            }
            .text {
                font-size: 28px;
            }
        }
     }
     .cb-9 {
        border-bottom: 10px solid #f5f7f9;
     }
     .exit-login {
        color: #d86262;
        font-size: 30px;
        text-align: center;
        line-height: 48.56px;
     }
}
</style>