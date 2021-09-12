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
      <el-table :data="articles" style="width: 100%" class="table-list">
        <el-table-column prop="title" label="日期" width="180"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" width="180"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column prop="comment_status" label="评论状态">
          <template v-slot="scope">
            {{ scope.row.comment_status ? '正常' : '关闭'}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template v-slot='scope'>
             <el-switch :disabled="scope.row.statusDisabled" v-model="scope.row.comment_status" active-color="#13ce66" inactive-color="#ff4949" @change="onStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      background
    >
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, updateAritcle } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import { reactive, toRefs } from 'vue'
export default {
  name: 'CommentIndex',
  setup () {
    const data = reactive({
      page: 1,
      // 文章列表
      articles: [],
      // 总条目数
      totalCount: '',
      // 每页显示条目的个数
      pageSize: 10
    })
    const methods = reactive({
      handleSizeChange: (pageSize) => {
        data.pageSize = pageSize
        methods.loadAritcles(1)
      },
      handleCurrentChange: (page) => {
        data.page = page
        methods.loadAritcles(page)
      },
      onStatusChange (article) {
        article.statusDisabled = true
        updateAritcle(article.id, article.comment_status).then(res => {
          article.statusDisabled = false
          console.log(res)
          ElMessage.success({
            type: 'success',
            message: article.comment_status ? '开启文章修改' : '关闭文章修改'
          })
        })
      },
      loadAritcles (page = 1) {
        // 初始化文章列表
        getArticles({
          response_type: 'comment',
          per_page: data.pageSize,
          page
        }).then(res => {
          data.articles = res.data.data.results
          data.totalCount = res.data.data.total_count
          data.articles.forEach(item => {
            item.statusDisabled = false
          })
        })
      }
    })
    methods.loadAritcles()

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
