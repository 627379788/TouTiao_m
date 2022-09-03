<template>
    <div class="avatar_container">
      <img :src="img" class="avatarImg" ref="img">
      <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
      </div>
    </div>
</template>
<script>
    import Cropper from 'cropperjs'
    import 'cropperjs/dist/cropper.css'
    import { updateUserPhoto } from '@/api/user'
    export default {
        name: 'UpdateAvatar',
        props: {
            img: {
                type: [Object, String],
                required: true
            }
        },
        data() {
            return {
                cropper: {}
            }
        },
        methods: {
            onConfirm() {
                this.cropper.getCroppedCanvas().toBlob(blob => {
                    this.updatePhoto(blob)
                })
            },
            // 修改用户照片
            async updatePhoto(blob) {
                try {
                    this.$toast.loading({
                        message: '更新中...',
                        forbidClick: true,
                        duration: 0
                    })
                    // 注意请求头参数content-Type是multipart/form-data时，传输的参数类型必须是formdata
                    const formData = new FormData()
                    formData.append('photo', blob)
                    const { data } = await updateUserPhoto(formData)
                    // 关闭弹出层
                    this.$emit('close')
                    // 更新视图
                    this.$emit('successUpdatePhoto', data.data.photo)
                    // 提示修改成功
                    this.$toast.success('更新成功')
                } catch (error) {
                    this.$toast.fail('更新失败')
                }
            }
        },
        created() {},
        mounted() {
            const image = this.$refs.img
            const cropper = new Cropper(image, {
                viewMode: 1,
                dragMode: 'move',
                aspectRatio: 1,
                // autoCropArea: 1,
                cropBoxMovable: false,
                cropBoxResizable: false,
                background: false
            })
            this.cropper = cropper
        }
    }
</script>
<style lang="less" scoped>
    .avatar_container {
        background-color: #000000;
        height: 100%;
        .avatarImg {
            max-width: 100%;
        }
        .toolbar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
        }
        .cancel,.confirm {
            width: 90px;
            height: 90px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
    }
</style>