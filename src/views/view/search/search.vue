<template>
    <div class="search_container">
       <!-- 搜索栏 -->
       <form action="/" class="searchArea">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
                @focus="isShowResult = false"
                @clear="searchText = ''"
                background="#3296fa"
            />
        </form>
        <!-- 搜索结果组件 -->
        <SearchResult v-if="isShowResult"
        :searchText = "searchText"
        />
        <!-- 搜索联想组件 -->
        <SearchSuggestion
        v-else-if="searchText"
        :searchText = "searchText"
        @searchStr="onSearch"
        />
        <!-- 搜索历史组件 -->
        <SearchHistory v-else
        :historyList="historyList"
        @search="onSearch"
        @deleteAllHistory="historyList = $event"
        />
    </div>
</template>
<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setStorage, getStorage } from '@/utils/storage'

    export default {
        name: 'searchIndex',
        components: {
            SearchResult,
            SearchSuggestion,
            SearchHistory
        },
        watch: {
            // 监听搜索历史集合变化，完成本地存储操作
            historyList: {
                handler() {
                    setStorage('search-history', this.historyList)
                }
            }
        },
        data() {
            return {
                // 搜索栏内容
                searchText: '',
                // 控制搜索结果组件标识
                isShowResult: false,
                // 搜索历史记录集合
                historyList: []
            }
        },
        methods: {
            // 搜索函数
            onSearch(val) {
                this.searchText = val
                const index = this.historyList.indexOf(val)
                if (index !== -1) {
                    this.historyList.splice(index, 1)
                }
                this.historyList.unshift(val)
                // 展示结果组件
                this.isShowResult = true
            },
            // 取消函数
            onCancel() {
                this.$router.back()
            }
        },
        created() {
            this.historyList = getStorage('search-history') || []
        }
    }
</script>
<style lang="less" scoped>
    .search_container {
        .van-search__action {
            color: #ffffff
        }
        .searchArea {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1;
        }
    }
</style>