<template>
    <div class="channel_container">
        <!-- 我的频道区域 -->
      <van-cell :border="false">
        <div slot="title" class="channel_title">我的频道</div>
        <van-button type="danger" plain round size="mini" class="edit_but" @click="isShow=!isShow">{{isShow ? "完成" : "编辑"}}</van-button>
      </van-cell>
      <van-grid :gutter="10" class="my_grid">
        <van-grid-item v-for="(channel,index) in channelList" :key="index" @click="editMyChannel(channel,index)">
            <van-icon slot="icon" name="clear" v-show="isShow && !fixedChannel.includes(channel.id)"></van-icon>
            <span slot="text" class="text" :class="{ active: index === active}">{{channel.name}}</span>
        </van-grid-item>
    </van-grid>
    <!-- 推荐频道区域 -->
      <van-cell :border="false">
        <div slot="title" class="channel_title">推荐频道</div>
      </van-cell>
      <van-grid :gutter="10" class="recommend_grid">
        <van-grid-item v-for="(channel,index) in recommendChannels" :key="index" :text="channel.name" icon="plus" @click=addMyChannel(channel)></van-grid-item>
      </van-grid>
    </div>
</template>
<script>
import { getAllChannel, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setStorage } from '@/utils/storage'
    export default {
        name: 'channel_edit',
        props: {
            channelList: {
                type: Array,
                required: true
            },
            active: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                // 所有频道信息集合
                allChannel: [],
                // 控制删除图标标识
                isShow: false,
                // 固定频道集合
                fixedChannel: [0]
            }
        },
        methods: {
            // 获取所有频道信息函数
            async getAllChannels() {
                try {
                    const { data } = await getAllChannel()
                    this.allChannel = data.data.channels
                } catch (error) {
                    console.log(error)
                    this.$toast('获取频道失败')
                }
            },
            // 添加频道
            async addMyChannel (channel) {
                this.channelList.push(channel)
                // 数据持久化，，
                if (this.user) {
                    // 登录状态保存在线上
                    try {
                        await addUserChannel({
                            id: channel.id, // id
                            seq: this.channelList.length // 序列号
                        })
                    } catch (error) {
                        console.log(error)
                        this.$toast('添加用户频道失败，请稍后再试')
                    }
                } else {
                    // 非登录状态保存到本地
                    setStorage('User-Channels', this.channelList)
                }
            },
            // 编辑我的频道
            editMyChannel(channel, index) {
                if (this.isShow) {
                    // 编辑状态，删除频道
                    // 1.判断是不是固定频道
                    if (this.fixedChannel.includes(channel.id)) {
                        return false
                    }
                    // 2. 判断是否删除active前一个，如果是则active减一
                    if (this.active >= index) {
                        this.$emit('updateChannel', this.active - 1)
                    }
                    // 3.根据index移除数组项
                    this.channelList.splice(index, 1)
                    // 4.持久化处理
                    this.deleteChannel(channel)
                } else {
                    // 非编辑状态，跳转频道
                    // 向父组件发送发送一个事件参数
                    this.$emit('updateChannel', index, false)
                }
            },
            //  持久化删除我的频道
            async deleteChannel(channel) {
                if (this.user) {
                    // 登录状态
                    try {
                         await deleteUserChannel(channel.id)
                    } catch (error) {
                        this.$toast('删除频道出错')
                    }
                } else {
                    // 非登录状态,重新存储本地数据
                    setStorage('User-Channels', this.channelList)
                }
            }
        },
        created() {
            // 获取所有频道信息
            this.getAllChannels()
        },
        computed: {
            // 推荐频道 计算属性会观测内部的数据变化 依赖属性发生变化会重新执行计算属性
            recommendChannels() {
                return this.allChannel.filter(channel => {
                    return !this.channelList.find(channels => {
                        return channels.id === channel.id
                    })
                })
            },
            ...mapState(['user'])
        }
    }
</script>
<style lang="less" scoped>
.channel_container {
    .van-cell {
        margin: 20px 0;
    }
    .van-cell__title {
    display: flex;
    align-items: flex-end;
    }
    padding:85px 0;
    .channel_title {
        font-size: 32px;
        color: #333;
    }
    .edit_but {
       width: 104px;
       height: 48px;
       font-size: 26px;
       color: #fa9292;
       border: 1px solid #fa9292;
    }
    /deep/ .van-grid {
        .van-grid-item {
            width: 160px;
            height: 86px;
            .van-grid-item__content {
              background-color: #f3f5f7;
              .van-grid-item__icon-wrapper {
                position:unset;
              }
              .van-grid-item__text,.text {
                font-size: 28px;
                color: #222222;
                margin: 0;
                white-space: nowrap;
              }
              .active {
                color: red;
              }
            }
        }
    }
    /deep/ .recommend_grid {
        .van-grid-item__content {
            flex-direction: row;
            .van-icon-plus {
                font-size: 24px;
                padding-right: 6px;
            }
            .van-grid-item__text {
                margin-top: 0;
                color: #222222;
                white-space: nowrap;
            }
        }
    }
    /deep/ .my_grid {
        .van-icon-clear {
            position: absolute;
            top: -10px;
            right: -10px;
            font-size: 30px;
            z-index: 2;
            color: #cacaca;
        }
    }
}
</style>