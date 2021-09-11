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
      <el-radio-group v-model="radio1">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
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
      radio1: '全部'
    })
    // 请求图片素材
    getImages().then(res => {
      data.images = res.data.data.results
      console.log(res)
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style>

</style>
