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
          <el-col :xs="12" :sm="6" :md="6" :lg="4"
            ><div class="grid-content bg-purple">
              <el-image
                style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="cover"
              ></el-image>
            </div
          ></el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="4"
            ><div class="grid-content bg-purple">
              <el-image
                style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="cover"
              ></el-image>
            </div
          ></el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="4"
            ><div class="grid-content bg-purple">
              <el-image
                style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="cover"
              ></el-image>
            </div
          ></el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="4"
            ><div class="grid-content bg-purple">
              <el-image
                style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="cover"
              ></el-image>
            </div
          ></el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="4"
            ><div class="grid-content bg-purple">
              <el-image
                style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="cover"
              ></el-image>
            </div
          ></el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="4"
            ><div class="grid-content bg-purple">
              <el-image
                style="height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
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
import { reactive, toRefs } from 'vue'
export default {
  name: 'ImageIndex',
  setup () {
    const data = reactive({
      radio1: '全部'
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style>

</style>
