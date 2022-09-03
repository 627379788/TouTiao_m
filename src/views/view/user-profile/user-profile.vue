<template>
    <div class="profile_container">
        <!-- 导航栏区域 -->
        <van-nav-bar
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
        class="profile_nav_bar"
        />
        <!-- 文件选择器 -->
        <input type="file" ref="file" hidden="true" @change="onChangeFile">
        <van-cell title="头像" is-link @click="$refs.file.click()">
            <van-image
            class="avatar"
            :src="userData.photo"
            fit="cover"
            round
            />
        </van-cell>
        <van-cell title="昵称" is-link :value="userData.name" @click="showPopup = true"></van-cell>
        <van-cell title="性别" is-link :value="userData.gender === 0 ? '男' : '女'" @click="showGenderPopup = true"></van-cell>
        <van-cell title="生日" is-link :value="userData.birthday" @click="showBirthdayPopup = true"></van-cell>
        <!-- 修改姓名弹出层  利用v-if重新渲染初始化数据-->
        <van-popup
        v-if="showPopup"
        v-model="showPopup"
        position="bottom"
        :style="{ height: '100%' }">
        <UpdataName
        @closePopup="showPopup = false"
        v-model="userData.name">
    </UpdataName>
        </van-popup>
        <!-- 修改性别弹出层 -->
        <van-popup v-if="showGenderPopup" v-model="showGenderPopup" position="bottom">
            <UpdateGender
            @close="showGenderPopup = false"
            :gender="userData.gender"
            @updateGenders="userData.gender = $event">
        </UpdateGender>
        </van-popup>
        <!-- 修改生日弹出层 -->
        <van-popup v-if="showBirthdayPopup" v-model="showBirthdayPopup" position="bottom">
            <UpdateBirthday v-model="userData.birthday" @close="showBirthdayPopup = false"></UpdateBirthday>
        </van-popup>
        <!-- 修改用户头像层 -->
        <van-popup v-if="showAvatarPopup" v-model="showAvatarPopup" position="bottom" :style="{ height: '100%'}">
            <UpdateAvatar :img="img" @close="showAvatarPopup = false" @successUpdatePhoto="userData.photo = $event">
            </UpdateAvatar>
        </van-popup>
    </div>
</template>
<script>
    import { getUserData } from '@/api/user'
    import UpdataName from './components/updata-name.vue'
    import UpdateGender from './components/updata-gender.vue'
    import UpdateBirthday from './components/updata-birthday.vue'
    import UpdateAvatar from './components/updata-avatar.vue'
    export default {
        name: 'UserProfile',
        components: {
            UpdataName,
            UpdateGender,
            UpdateBirthday,
            UpdateAvatar
        },
        data() {
            return {
                // 用户信息
                userData: {},
                showPopup: false,
                showGenderPopup: false,
                showBirthdayPopup: false,
                showAvatarPopup: false,
                img: null
            }
        },
        methods: {
            // 获取用户信息
            async getUserInfo() {
                try {
                    const { data } = await getUserData()
                    this.userData = data.data
                } catch (error) {
                    console.log(error)
                }
            },
            // 获取文件blob数据
            onChangeFile () {
                // 获取文件对象
                const file = this.$refs.file.files[0]
                // 基于文件对象获取blob数据
                this.img = window.URL.createObjectURL(file)
                // 展示修改头像弹出层
                this.showAvatarPopup = true
                // 如果选择同一个文件，不同触发change事件，解决办法确保每一个使用完的value值为空
                console.log(this.$refs.file.value)
                this.$refs.file.value = ''
            }
        },
        created() {
            this.getUserInfo()
        }
    }
</script>
<style lang="less" scoped>
    .profile_container {
        .van-popup {
            background-color: #f5f7f9;
        }
        /deep/.profile_nav_bar {
        background-color: #3296fb;
        .van-nav-bar__title {
            color: #fff;
        }
        .van-icon {
            color: #fff !important;
        }
        }
        .avatar {
            width: 50px;
            height: 50px;
        }
    }
</style>