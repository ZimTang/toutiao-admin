<template>
  <div class="settingsContainer">
      <el-card class="box-card">
        <template #header>
        <!-- 面包屑导航 start-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
          </el-breadcrumb>
        <!-- 面包屑导航 end-->
        </template>
        <el-row>
          <el-col :span="13">
            <el-form ref="form" :model="user" label-width="80px" :rules="rules">
              <el-form-item label="编号">
                {{user.id}}
              </el-form-item>
              <el-form-item label="手机">
                {{user.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称" prop="name">
                <el-input type="textarea" v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍" prop="intro">
                <el-input type="textarea" v-model="user.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="textarea" v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onUpdateUser" :loading="updateUserLoading">保存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :offset="4" :span="4">
            <el-avatar shape="square" :size="150" fit="cover" :src="user.photo"></el-avatar>
            <p @click="$refs.file.click()">修改头像</p>
            <input type="file" ref="file" hidden @change="onFileChange">
          </el-col>
        </el-row>
      </el-card>
      <el-dialog
        title="提示"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <vue-picture-cropper
          :boxStyle="{
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f8f8',
            margin: 'auto'
          }"
          :img="previewImage"
          :options="{
            viewMode: 1,
            dragMode: 'crop',
            aspectRatio: 16 / 9,
            preview: preview,
          }"
          @ready="ready"
        />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onUpdateAvatar" :loading="updateAvatarLoading">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { reactive, toRefs, ref } from 'vue'
import { getUserProfile, updateUserAvatar, updateUser } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import eventBus from '@/utils/eventBus.js'
export default {
  name: 'SettingsIndex',
  components: {
    VuePictureCropper
  },
  setup () {
    const form = ref(null)
    const myImage = ref(null)
    const file = ref(null)
    const data = reactive({
      user: {
        email: '',
        id: '',
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      // 控制上传图片裁切预览的显示状态
      dialogVisible: false,
      // 预览显示的图片
      previewImage: '',
      // 更新头像的loading
      updateAvatarLoading: false,
      // 更新用户资料的loading
      updateUserLoading: false,
      // 表单验证
      rules: {
        name: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入用户名称'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value.length > 7) {
                callback(new Error('用户名长度不能超过七个字符'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        intro: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入媒体介绍'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: (rule, value, callback) => {
              const patt = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
              if (value === '') {
                callback(new Error('请输入邮箱'))
              } else if (!patt.test(value)) {
                callback(new Error('邮箱格式不正确'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    })

    const methods = reactive({
      // 获取用户资料
      loadProfile () {
        getUserProfile().then(res => {
          data.user = res.data.data
        })
      },
      // 显示图片裁剪的预览
      onFileChange () {
        // 利用window.URL.createObjectURL 这个API 获取图片预览地址
        const blobData = window.URL.createObjectURL(file.value.files[0])
        data.previewImage = blobData
        data.dialogVisible = true
        console.log('file change')
        // 解决上传同一张文件不触发的问题
        file.value.value = ''
      },
      // 更新用户头像
      onUpdateAvatar () {
        data.updateAvatarLoading = true
        cropper.getBlob()
          .then((blob) => {
            console.log(blob)
            const fd = new FormData()
            fd.append('photo', blob)
            // 请求更新用户头像
            updateUserAvatar(fd).then(res => {
              data.updateAvatarLoading = false
              // 关闭dialog
              data.dialogVisible = false
              ElMessage({
                type: 'success',
                message: '更新头像成功'
              })
              // 更新视图展示
              data.user.photo = res.data.data.photo
              // 更新顶部用户头像
              eventBus.$emit('update-user-avatar', data.user.photo)
            }, rea => {
              ElMessage({
                type: 'error',
                message: '更新头像失败'
              })
              data.updateAvatarLoading = false
            })
          })
      },
      // 更新用户资料
      onUpdateUser () {
        const { name, intro, email } = data.user
        // 验证表单
        form.value.validate((valid) => {
          if (valid) {
            data.updateUserLoading = true
            updateUser({
              name,
              intro,
              email
            }).then(res => {
              data.updateUserLoading = false
              ElMessage({
                type: 'success',
                message: '更新用户资料成功'
              })
              // 更新顶部用户信息
              eventBus.$emit('update-user', res.data.data, data.user.photo)
              console.log(res)
            }, rea => {
              data.updateUserLoading = false
              ElMessage({
                type: 'error',
                message: '更新用户资料失败'
              })
            })
          } else {
            alert('表单有误，请重新修改后再次保存')
            return false
          }
        })
      }
    })

    // 获取用户信息
    methods.loadProfile()
    return {
      ...toRefs(data),
      ...toRefs(methods),
      file,
      myImage,
      form
    }
  }
}
</script>

<style lang="less" scoped>
.prviewImage-wrapper{
  .previewImage{
    display: block;
    max-width: 100%;
    height: 200px;
  }
}
</style>
