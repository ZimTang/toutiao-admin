<template>
  <div class="commentContainer">
    <el-card class="box-card">
      <template #header>
      <!-- 面包屑导航 start-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      <!-- 面包屑导航 end-->
      </template>
      <el-table :data="tableData" style="width: 100%" class="table-list">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      background
    >
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'CommentIndex',
  setup () {
    const data = reactive({
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      currentPage4: 4
    })
    const methods = reactive({
      handleSizeChange: (val) => {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange: (val) => {
        console.log(`当前页: ${val}`)
      }
    })

    return {
      ...toRefs(data),
      ...toRefs(methods)
    }
  }
}
</script>

<style scoped lang='less'>
.table-list{
  margin-bottom: 50px;
}
</style>
