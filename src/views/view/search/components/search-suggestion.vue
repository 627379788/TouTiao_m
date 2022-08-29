<template>
    <div class="suggestion_container">
        <van-cell v-for="(text,index) in searchSuggestList" :key="index" icon="search" @click="$emit('searchStr',text)">
            <div slot="title" v-html="highlight(text)"></div>
        </van-cell>
    </div>
</template>
<script>
    import { getSearchSuggestions } from '@/api/search'
    import { debounce } from 'loadsh'
    export default {
        name: 'searchSuggestion',
        props: {
            searchText: {
                type: String,
                required: true
            }
        },
        watch: {
            searchText: {
                // watch当观察对象的值发现变化时，会立即触发handler函数
                // handler函数的名称是固定的
                handler: debounce(function(value) { // debounce loadsh中的防抖函数
                    this.loadSearchSuggestions(value)
                }, 300),
                immediate: true // 设置函数被监听时立刻执行
            }
        },
        data() {
            return {
                // 联想建议数据
                searchSuggestList: []
            }
        },
        methods: {
            // 获取联想建议函数
            async loadSearchSuggestions(q) {
                try {
                    const { data } = await getSearchSuggestions(q)
                    this.searchSuggestList = data.data.options
                } catch (error) {
                    this.$toast('获取联想建议失败')
                }
            },
            // 联想搜索关键字高亮
            highlight(text) {
                text = text + ''
                const highlightStr = `<span class='active'>${this.searchText}</span>`
                /*
                    RegExp 正则表达式构造函数 适用于动态字符串匹配
                    参数1: 匹配模式字符串，它会根据这个字符串创建正则对象
                    参数2: 匹配模式，写在字符串中
                */
                const reg = new RegExp(this.searchText, 'gi')
                return text.replace(reg, highlightStr)
            }
        },
        created() {}
    }
</script>
<style lang="less" scoped>
    .suggestion_container {
        padding-top: 100px;
        /deep/.active {
            color: #3296fa;
        }
    }
</style>