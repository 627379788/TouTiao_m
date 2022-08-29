<template>
    <div class="history_container">
        <van-cell title="搜索历史">
            <div v-if="isDeleteShow" class="default">
                <span @click="$emit('deleteAllHistory',[])">全部删除&nbsp;&nbsp;</span>
                <span @click="isDeleteShow = false">完成</span>
            </div>
           <van-icon v-else name="delete-o" @click="isDeleteShow = true"></van-icon>
        </van-cell>
        <van-cell :title="item" v-for="(item,index) in historyList" :key="index" @click="deleteHistory(item,index)">
            <template #right-icon>
                <van-icon v-show="isDeleteShow" name="close" class="close-icon" />
            </template>
        </van-cell>
    </div>
</template>
<script>
    export default {
        name: 'searchHistory',
        props: {
            historyList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                // 控制删除图标标识
                isDeleteShow: false
            }
        },
        methods: {
            // 删除单个历史记录
            deleteHistory(text, index) {
                // 删除状态下，删除对应的搜索历史
                if (this.isDeleteShow) {
                    return this.historyList.splice(index, 1)
                }
                // 非删除状态下，搜索相应的结果
                this.$emit('search', text)
            }
        },
        created() {
        }
    }
</script>
<style lang="less" scoped>
    .history_container {
        padding-top: 100px;
    }
</style>