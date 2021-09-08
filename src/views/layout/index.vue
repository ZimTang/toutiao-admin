<template>
  <el-container class="layout-container">
    <el-aside width="auto" >
      <LayoutAside :collapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header>
        <div class="title">
          <i :class="{'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold': isCollapse}" @click="handleCollapse"></i>
          <span class="company_name">江苏传智播客科技教育有限公司</span>
          <!-- <el-radio-group v-model="isCollapse" class="hide-button">
            <el-button :label="false" icon="el-icon-s-fold" @click="handleCollapse">
            </el-button>
          </el-radio-group> -->
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img :src="user.photo" alt="" class="avatar">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click="onlogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import LayoutAside from './components/aside.vue'
export default {
  name: 'LayoutIndex',
  components: {
    LayoutAside
  },
  setup () {
    // 数据
    const state = reactive({
      // 保存用户数据
      user: {}
    })
    const isCollapse = ref(false)
    // dialog弹框
    const dialogVisible = ref(false)

    const handleCollapse = function () {
      isCollapse.value = !isCollapse.value
    }

    const router = useRouter()
    getUserProfile().then(res => {
      state.user = res.data.data
      console.log(res.data.data)
    })
    const onlogout = () => {
      ElMessageBox
        .confirm('确认关闭？')
        .then((_) => {
          localStorage.removeItem('token')
          router.push('/login')
        })
        .catch((_) => {
        })
    }
    return {
      ...toRefs(state),
      onlogout,
      dialogVisible,
      isCollapse,
      handleCollapse
    }
  }
}
</script>

<style scoped lang="less">
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.el-header{
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i{
    line-height: 60px;
    margin-right: 5px;
  }
}
  .el-footer {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    // text-align: center;
  }

  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
    .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .avatar-wrap{
    display: flex;
    align-items: center;
    .avatar{
      width: 40px;
      height: 40px;
      border-radius: 5%;
      margin-right: 10px;
    }

  }

  .title{
    display: flex;
  }

  .hide-button{
    line-height: 65px;
    margin-right: 10px;
  }
</style>
