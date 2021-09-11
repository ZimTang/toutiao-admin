<template>
  <div class="ImageIndexContainer">
    <el-card class="box-card">
      <template #header>
      <!-- 面包屑导航 start-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      <!-- 面包屑导航 end-->
      </template>
      <div class="image-header">
        <el-radio-group v-model="collect" @change="onCollectChange" style="display:flex">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
          <el-button type="success" @click="uploadImage">上传素材</el-button>
      </div>
      <div style="margin-top:20px">
         <el-row :gutter="10">
          <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="(image,index) in images" :key="index"
            ><div class="grid-content bg-purple images" >
              <el-image
                style="width: 100px; height: 100px"
                :src="image.url"
                fit="cover"
              ></el-image>
              <div class="shade_box" >
                <el-button
                 v-loading="image.loading"
                 type="warning"
                 :icon="!image.is_collected ? 'el-icon-star-off': 'el-icon-star-on'"
                 circle
                 size="mini"
                 @click="onStarImage(image)"
                 ></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="onDeleteImage(image)"></el-button>
              </div>
            </div
          ></el-col>
        </el-row>
      </div>

    <el-pagination background :page-size="pageSize" layout="prev, pager, next" :total="total_count" class="box1" @current-change="onCurrentPage" :current-change="page"></el-pagination>
    </el-card>
    <el-dialog
      title="提示"
      v-model="dialogUploadVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :headers="uploadHeaders"
        :on-success="successUpload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
        </template>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, starImage, deleteImage } from '@/api/image'
import { reactive, toRefs } from 'vue'
export default {
  name: 'ImageIndex',
  setup () {
    const data = reactive({
      // 存放所有图片
      images: [],
      // 是否展示收藏的图片
      collect: false,
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      // 总图片数量
      total_count: '',
      // 当前页数
      page: 1,
      // 控制每页的图片数量
      pageSize: 10
    })
    console.log(data.uploadHeaders)
    const methods = reactive({
      // 请求图片素材
      loadImages (page, collect = false) {
        getImages({
          collect,
          page,
          per_page: data.pageSize
        }).then(res => {
          data.images = res.data.data.results
          data.total_count = res.data.data.total_count
          data.images.forEach(item => {
            item.loading = false
          })
          console.log(res.data.data)
        })
      },
      // 根据点击的全部或收藏按钮来展示素材图片
      onCollectChange () {
        console.log(data.collect)
        methods.loadImages(data.page, data.collect)
      },
      // 点击上传图片
      uploadImage () {
        data.dialogUploadVisible = true
      },
      // 成功上传素材图片
      successUpload () {
        data.dialogUploadVisible = false
      },
      onCurrentPage (page) {
        data.page = page
        methods.loadImages(data.page)
      },
      // 收藏图片
      onStarImage (img) {
        img.loading = true
        img.is_collected = !img.is_collected
        starImage({
          collect: img.is_collected
        }, img.id).then(res => {
          console.log(res)
          img.loading = false
        })
      },
      // 删除图片
      onDeleteImage (img) {
        img.loading = true
        deleteImage(img.id).then(res => {
          img.loading = false
          methods.loadImages()
          console.log(res)
        })
      }
    })

    // 初始化图片素材
    methods.loadImages(data.page, data.collect)
    return {
      ...toRefs(data),
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="less" scoped>
.image-header{
  display: flex;
  justify-content: space-between;
}
.box1{
  margin-top: 40px;
}

.images{
  position: relative;
}

.shade_box{
  width: 100px;
  height: 30px;
  background-color: gray;
  opacity: 80%;
  position: absolute;
  z-index: 999;
  bottom: 4px;
  display: flex;
  justify-content: space-around;
}
</style>
