<template>
    <van-cell class="comment-item" >
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div slot="title" class="title-wrap">
        <div class="user-name">{{comment.aut_name }}</div>
        <van-button
          :loading="likeLoading"
          class="like-btn"
          :class="{
            liked : comment.is_liking
          }"
          @click="onLike()"
          :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        >{{comment.like_count || '赞'}}</van-button>
      </div>
      <div slot="label">
        <p class="comment-content">{{comment.content}}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
          <van-button
            class="reply-btn"
            round
          >回复 {{comment.reply_count}}</van-button>
        </div>
      </div>
    </van-cell>
  </template>

  <script>
  import { deleteCommentLikings, commentLikings } from '@/api/comment'
  export default {
    name: 'CommentItem',
    components: {},
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data () {
      return {
        likeLoading: false
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        // 文章点赞或取消点赞
        async onLike() {
            this.likeLoading = true
            try {
                if (this.comment.is_liking) {
                    // 已点赞，取消点赞
                    await deleteCommentLikings(this.comment.com_id)
                    this.$toast.success('取消点赞成功')
                    this.comment.like_count--
                } else {
                    // 未点赞， 执行点赞的代码逻辑
                    await commentLikings(this.comment.com_id)
                    this.$toast.success('点赞成功')
                    this.comment.like_count++
                }
                this.$emit('updateIsLiking', !this.comment.is_liking)
            } catch (error) {
                this.$toast('操作失败')
                console.log(error)
            }
            this.likeLoading = false
        }
    }
  }
  </script>

  <style scoped lang="less">
  .comment-item {
    .avatar {
      width: 72px;
      height: 72px;
      margin-right: 25px;
    }
    .title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-name {
        color: #406599;
        font-size: 26px;
      }
    }
    .comment-content {
      font-size: 32px;
      color: #222222;
      word-break: break-all;
      text-align: justify;
    }
    .comment-pubdate {
      font-size: 19px;
      color: #222;
      margin-right: 25px;
    }
    .bottom-info {
      display: flex;
      align-items: center;
    }
    .reply-btn {
      width: 135px;
      height: 48px;
      line-height: 48px;
      font-size: 21px;
      color: #222;
    }
    .like-btn {
      height: 30px;
      padding: 0;
      border: none;
      font-size: 19px;
      line-height: 30px;
      margin-right: 7px;
      .van-icon {
        font-size: 30px;
      }
      &.liked {
        color: #e5645f;
      }
    }
  }
  </style>