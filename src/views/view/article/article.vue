<template>
    <div class="article-container">
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        left-arrow
        title="黑马头条"
        @click-left="$router.back()"
      ></van-nav-bar>
      <!-- /导航栏 -->
      <div class="main-wrap" >
        <!-- 加载中 -->
        <div class="loading-wrap" v-if="loading">
          <van-loading
            color="#3296fa"
            vertical
          >加载中</van-loading>
        </div>
        <!-- /加载中 -->
        <!-- 加载完成-文章详情 -->
        <div class="article-detail markdown-body" ref="article-detail" v-else-if="articleData.title">
          <!-- 文章标题 -->
          <h1 class="article-title">{{articleData.title}}</h1>
          <!-- /文章标题 -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="articleData.aut_photo"
            />
            <div slot="title" class="user-name">{{articleData.aut_name}}</div>
            <div slot="label" class="publish-date">{{articleData.pubdate | relativeTime}}</div>
            <!-- 关注用户组件 -->
            <!--
              发起通知，模板中用$event接受参数
              当传递给子组件的数据既要实用还要修改时 使用简写方式：在组件上使用v-model
              默认的props为value 事件名称为@input
              如果需要修改v-model的规则名称，可以通过子组件的model修改
              注意：一个组件上只能使用一次 v-model
                    如果多个数据要实现类似 v-model的效果 可以使用.sync修饰符
            -->
            <FollowIndex
            v-model ="articleData.is_followed"
            :aut_id="articleData.aut_id"
            class="follow-btn"
            >
            </FollowIndex>
          </van-cell>
          <!-- /用户信息 -->

          <!-- 文章内容 -->
          <div class="article-content" v-html="articleData.content"></div>
          <van-divider>正文结束</van-divider>
          <!-- 评论组件 -->
          <CommentList
          :source="articleData.art_id"
          @onLoadResult="commentData = $event"
          :list = "list"
          ></CommentList>
          <!-- 底部区域 -->
          <div class="article-bottom">
              <van-button
                  class="comment-btn"
                  type="default"
                  round
                  size="small"
                  @click="showPopup = true"
                >写评论</van-button>
              <van-icon
                  name="comment-o"
                  :badge="commentData.total_count"
                  color="#777"
                />
                <!-- 关注图标组件 -->
                <CollectArticle
                  CollectArticle
                  v-model="articleData.is_collected"
                  :target="articleData.art_id"
                ></CollectArticle>
                <!-- 点赞文章组件 -->
                <LikeIndex
                v-model="articleData.attitude"
                :target="articleData.art_id"
                ></LikeIndex>
              <van-icon name="share" color="#777777"></van-icon>
          </div>
          <!-- /底部区域 -->
          <!-- 评论弹出层 -->
          <van-popup v-model="showPopup"  position="bottom">
            <CommentPost
            :target = "articleData.art_id"
            @onPostSuccess = "onPostSuccess">
          </CommentPost>
          </van-popup>
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else-if="errStatus === 404">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </div>
    </div>
  </template>

  <script>
  import { getArticleById } from '@/api/article'
  import { ImagePreview } from 'vant'
  import FollowIndex from '@/components/component/follow-user/follow-user'
  import CollectArticle from '@/components/component/article-collect/article-collect'
  import LikeIndex from '@/components/component/article-like/article-like'
  import CommentList from './comment-list/comment-list'
  import CommentPost from '@/components/component/comment-post/comment-post'
  export default {
    name: 'ArticleIndex',
    components: {
        FollowIndex,
        CollectArticle,
        LikeIndex,
        CommentList,
        CommentPost
    },
    props: {
      // 使用props获取动态路由的数据
      articleId: {
        type: [Number, String, Object],
        required: true
      }
    },
    data () {
      return {
        // 文章详情信息
        articleData: {},
        // loading展示标识
        loading: true,
        // 错误状态码
        errStatus: 0,
        // 关注用户请求loading标识
        followLoading: false,
        // 评论接口数据
        commentData: {},
        // 控制评论弹出层标识
        showPopup: false,
        list: []
      }
    },
    computed: {},
    watch: {
    },
    created () {
        this.getArticleById()
    },
    mounted () {},
    methods: {
        // 获取文章详细信息
        async getArticleById () {
            try {
                const { data } = await getArticleById(this.articleId)
                this.articleData = data.data
            } catch (error) {
                this.$toast('获取文章信息失败')
                if (error.response && error.response.status === 404) {
                    this.errStatus = 404
                }
            }
            // 无论获取文章信息成功失败，都得关闭加载提示
            this.loading = false
            // 视图驱动不是立即的，需要加个0毫秒的定时器
            setTimeout(() => {
                // 获取文章信息的dom节点
                const articleDOM = this.$refs['article-detail']
                this.imaPreview(articleDOM)
            }, 0)
        },
        // 获取文章失败，点击重试函数
        loadArticle() {
            this.loading = true
            this.getArticleById()
        },
        // 文章图片预览函数
        imaPreview(articleDOM) {
            // 获取文章DOM中的所有img节点
            const imgs = articleDOM.querySelectorAll('img')
            // 预览图片集合
            const imgsList = []
            // for循环遍历每一个imgDom对象，给他们绑定一个单击事件,并在单击事件中调用图片预览效果
            imgs.forEach((img, index) => {
                imgsList.push(img.src)
                img.onclick = () => {
                      ImagePreview({
                            // 预览图片的地址数组
                            images: [
                                ...imgsList
                            ],
                            // 起始位置
                            startPosition: index
                      })
                }
            })
        },
        // 发送评论成功函数
        onPostSuccess(data) {
          // 关闭弹出层
          this.showPopup = false
          // 添加评论数据
          this.list.unshift(data.new_obj)
          // 发布成功，总数量++
          this.commentData.total_count++
        }
    }
  }
  </script>

  <style scoped lang="less">
    @import './github-markdown.css';
  .article-container {
    .main-wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 92px;
      bottom: 88px;
      overflow-y: scroll;
      background-color: #fff;
    }
    .article-detail {
      .article-title {
        font-size: 40px;
        padding: 50px 32px;
        margin: 0;
        color: #3a3a3a;
      }

      .user-info {
        padding: 0 32px;
        .avatar {
          width: 70px;
          height: 70px;
          margin-right: 17px;
        }
        .van-cell__label {
          margin-top: 0;
        }
        .user-name {
          font-size: 24px;
          color: #3a3a3a;
        }
        .publish-date {
          font-size: 23px;
          color: #b7b7b7;
        }
        .follow-btn {
          width: 170px;
          height: 58px;
        }
      }

      .article-content {
        padding: 55px 32px;
        /deep/ p {
          text-align: justify;
        }
      }
    }

    .loading-wrap {
      padding: 200px 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
    }

    .error-wrap {
      padding: 200px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      .van-icon {
        font-size: 122px;
        color: #b4b4b4;
      }
      .text {
        font-size: 30px;
        color: #666666;
        margin: 33px 0 46px;
      }
      .retry-btn {
        width: 280px;
        height: 70px;
        line-height: 70px;
        border: 1px solid #c3c3c3;
        font-size: 30px;
        color: #666666;
      }
    }

    .article-bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      height: 88px;
      border-top: 1px solid #d8d8d8;
      background-color: #fff;
      .comment-btn {
        width: 282px;
        height: 46px;
        border: 2px solid #eeeeee;
        font-size: 30px;
        line-height: 46px;
        color: #a7a7a7;
      }
      .van-icon {
        font-size: 40px;
        .van-info {
          font-size: 16px;
          background-color: #e22829;
        }
      }
    }
  }
  </style>