<template>
  <div class="upload-cover" @click="showDialog">
    <img :src="coverImg" alt="" class="cover-img" ref="coverImg">
    <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">素材库内容</el-tab-pane>
        <el-tab-pane label="上传" name="second">
          <input type="file" @change="onFileChange" ref="file">
          <img src="" alt="" class="cover-img" ref="previewImg">
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadImage } from '@/api/image.js'
// import { uploadImage } from '@/api/image.js'
export default {
  name: 'UploadCover',
  props: ['coverImg'],
  setup () {
    const data = reactive({
      dialogVisible: false,
      activeName: {},
      // 预览图片的地址
      previewImg: ''
    })
    return {
      ...toRefs(data)
    }
  },
  methods: {
    // 选择上传图片的回调
    onFileChange () {
      const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      console.log(blob)
      console.log(this.$refs.previewImg)
      this.$refs.previewImg.src = blob
    },
    showDialog () {
      this.dialogVisible = true
    },
    // 确认按钮的回调
    onCoverConfirm () {
      // 判断是否选择的是上传栏目
      if (this.activeName === 'second') {
        // 判断是否选择图片
        console.log(this.$refs.file.files[0])
        if (!this.$refs.file.files[0]) {
          ElMessage({
            type: 'error',
            message: '请选择需要上传的图片'
          })
          return
        } else {
          const fd = new FormData()
          fd.append('image', this.$refs.file.files[0])
          uploadImage(fd).then(res => {
            this.$emit('updateCover', res.data.data.url)
            // console.log(res)
            // this.$emit('update-cover)
            this.$refs.coverImg.src = res.data.data.url
          }, rea => {
            ElMessage({
              type: 'error',
              message: '上传失败'
            })
          })
        }
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
.upload-cover{
  width: 150px;
  height: 120px;
}
.cover-img{
  width: 150px;
  height: 120px;
}

</style>
