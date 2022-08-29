<template>
    <!-- 文章列表项组件 -->
          <van-cell class="article-item">
            <!-- 文章标题 -->
            <div slot="title" class="article_title van-multi-ellipsis--l2">{{article.title}}</div>
            <div slot="label">
                <div v-if="article.cover.type === 3" class="article-image3">
                    <span class="cover-image" v-for="(image,index) in article.cover.images" :key="index">
                        <van-image
                        class="cover-item-image"
                        :src="image"
                        fit="cover"
                        />
                    </span>
                </div>
                <!-- 文章底部信息 -->
                <div class="article-item-content">
                    <span>{{article.aut_name}}</span>
                    <span>{{article.comm_count}}</span>
                    <span>{{article.pubdate|relativeTime}}</span>
                </div>
            </div>
            <van-image
            v-if="article.cover.type === 1"
            slot="default"
            class="van-image1"
            :src="article.cover.images[0]"
            fit="cover"
            />
          </van-cell>
</template>
<script>
    export default {
        name: 'articleItem',
        data() {
            return {}
        },
        props: {
            article: {
                type: Object,
                required: true
            }
        },
        methods: {},
        created() {}
    }
</script>
<style lang="less" scoped>
.article-item {
    .article_title {
        font-size:32px;
        color:#3a3a3a;
    }
    .van-cell__value {
        flex:unset;
        width:232px;
        height:146px;
        padding-left: 25px;
        .van-image1 {
            width: 100%;
            height: 146px;
        }
    }
    .article-item-content {
        font-size: 23px;
        color:#b4b4b4;
        margin-top: 30px;
        span {
            margin-right: 25px;
        }
    }
    .article-image3 {
        display: flex;
        margin-top: 30px;
        .cover-image {
        flex:1;
        height: 146px;
        &:not(:last-child) {
            padding-left: 4px;
        }
        .cover-item-image {
            width: 100%;
            height: 146px;
            }
        }
    }
}
</style>