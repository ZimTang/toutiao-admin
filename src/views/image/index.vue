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
      <el-radio-group v-model="collect" @change="onCollectChange">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <div style="margin-top:20px">
         <el-row :gutter="10">
          <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="(image,index) in images" :key="index"
            ><div class="grid-content bg-purple">
              <el-image
                style="width: 100px; height: 100px"
                :src="image.url"
                fit="cover"
              ></el-image>
            </div
          ></el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getImages } from '@/api/image'
import { reactive, toRefs } from 'vue'
export default {
  name: 'ImageIndex',
  setup () {
    const data = reactive({
      // 存放所有图片
      images: [],
      // 是否展示收藏的图片
      collect: false
    })
    const methods = reactive({
      // 请求图片素材
      loadImages (collect = false) {
        getImages({
          collect
        }).then(res => {
          data.images = res.data.data.results
          console.log(res)
        })
      },
      onCollectChange () {
        methods.loadImages(data.collect)
      }
    })

    // 初始化图片素材
    methods.loadImages()
    return {
      ...toRefs(data),
      ...toRefs(methods)
    }
  }
}
</script>

<style>

</style>
