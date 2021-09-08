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
      <i class="el-icon-s-home"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <template #title>内容管理</template>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-picture"></i>
      <template #title>素材管理</template>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-s-promotion"></i>
      <template #title>发布文章</template>
    </el-menu-item>
     <el-menu-item index="/comment">
      <i class="el-icon-s-comment"></i>
      <template #title>评论管理</template>
    </el-menu-item>
     <el-menu-item index="/fans">
      <i class="el-icon-s-data"></i>
      <template #title>粉丝管理</template>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <template #title>个人设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'LayoutAside',
  setup (props) {
    const methods = reactive({
      handleOpen: (key, keyPath) => {
        console.log(key, keyPath)
      },
      handleClose: (key, keyPath) => {
        console.log(key, keyPath)
      }
    })
    return {
      ...toRefs(methods)
    }
  }
})
</script>

<style scoped>
.el-menu-vertical-demo{
  text-align: left;
  height: 100%;
}

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
