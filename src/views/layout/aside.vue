<template>
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
      <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-menu"></i>
      <template #title>内容管理</template>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-document"></i>
      <template #title>素材管理</template>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-setting"></i>
      <template #title>发布文章</template>
    </el-menu-item>
     <el-menu-item index="/comment">
      <i class="el-icon-setting"></i>
      <template #title>评论管理</template>
    </el-menu-item>
     <el-menu-item index="/fans">
      <i class="el-icon-setting"></i>
      <template #title>粉丝管理</template>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <template #title>个人设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutAside',
  setup () {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose
    }
  }
})
</script>

<style scoped>
.el-menu-vertical-demo{
  text-align: left;
  height: 100%;
}
</style>
