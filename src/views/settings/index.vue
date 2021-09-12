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
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="编号">
                {{user.id}}
              </el-form-item>
              <el-form-item label="手机">
                {{user.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称">
                <el-input type="textarea" v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input type="textarea" v-model="user.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input type="textarea" v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
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
        <img :src="previewImage" alt="" style="width:100px">
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'SettingsIndex',
  setup () {
    const file = ref(null)
    const data = reactive({
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
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
      previewImage: ''
    })

    const methods = reactive({
      loadProfile () {
        getUserProfile().then(res => {
          data.user = res.data.data
        })
      },
      onFileChange () {
        // 利用window.URL.createObjectURL 这个API 获取图片预览地址
        const blobData = window.URL.createObjectURL(file.value.files[0])
        data.previewImage = blobData
        data.dialogVisible = true
        console.log('file change')
        // 解决上传同一张文件不触发的问题
        file.value.value = ''
      }
    })

    // 获取用户信息
    methods.loadProfile()
    return {
      ...toRefs(data),
      ...toRefs(methods),
      file
    }
  }
}
</script>

<style>

</style>
