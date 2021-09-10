<template>
  <div class="article-container">
    <el-card class="box-card">
      <template #header>
      <!-- 面包屑导航 start-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      <!-- 面包屑导航 end-->
      </template>
       <!-- 表单 start-->
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择活动区域">
            <el-option
            label="全部"
            :value="null"
             ></el-option>
            <el-option
            :label="channel.name"
            :value="channel.id"
            v-for="(channel, index) in channels"
            :key="index"
             ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="new Date()"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单 end -->
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="filter-header">根据筛选条件共查询到{{total_count ? total_count : 0}}条数据</div>
      </template>
        <!-- 表格 start -->
      <el-table class="search-table" :data="articles" style="width: 100%" v-loading="loading">
        <el-table-column prop="date" label="封面" width="180">
          <template v-slot='scope'>
            <img v-if="scope.row.cover.images[0]" class="article-cover" :src="scope.row.cover.images[0]" alt="">
            <img v-else class="article-cover" src="./no-cover.gif" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"> </el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <!--
            如果需要在自定义列模板中获取当前遍历项数据，
            那么就在template上声明，v-slot="scope"
           -->
          <template v-slot="scope">
            <el-tag :type='articleStatus[scope.row.status].type'>{{articleStatus[scope.row.status].text}}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="warning">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" width="180"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editArticle(scope.row.id)"
              circle
              ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDeleteArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 end -->
      <!-- 分页 start -->
      <el-pagination :disabled="loading" @current-change='onCurrentChange' :page-size="pageSize" :total="total_count" class="box1" layout="prev, pager, next" background :current-page="page"> </el-pagination>
      <!-- 分页 end -->
    </el-card>

  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article.js'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'ArticleIndex',
  setup () {
    const router = useRouter()
    const data = reactive({
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [],
      // 总数据条数
      total_count: '',
      // 每页大小
      pageSize: 10,
      // 查询文章状态
      status: null,
      articleStatus: [
        { text: '草稿', status: 0, type: 'warning' },
        { text: '待审核', status: 1, type: 'warning' },
        { text: '审核通过', status: 2, type: 'success' },
        { text: '审核失败', status: 3, type: 'danger' },
        { text: '已删除', status: 4, type: 'info' }
      ],
      // 频道列表
      channels: [],
      // 频道id
      channelId: null,
      // 时间范围
      rangeDate: [],
      // 加载中
      loading: true,
      // 当前页码
      page: 1
    })

    const methods = reactive({
      // 加载文章数据
      loadArticles: (page = 1) => {
        data.loading = true
        // 获取文章数据
        getArticles({
          page,
          per_page: data.pageSize,
          status: data.status,
          channel_id: data.channelId,
          // 开始日期
          begin_pubdate: data.rangeDate ? data.rangeDate[0] : null,
          // 结束日期
          end_pubdate: data.rangeDate ? data.rangeDate[1] : null
        }).then(res => {
          data.articles = res.data.data.results
          data.total_count = res.data.data.total_count
          data.loading = false
        })
      },
      // 实现分页器跳转功能
      onCurrentChange: (page) => {
        methods.loadArticles(page)
      },
      // 获取频道列表
      loadChannels () {
        getArticleChannels().then(res => {
          data.channels = res.data.data.channels
        })
      },
      // 删除文章
      onDeleteArticle (id) {
        ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteArticle(id.toString()).then(res => {
              console.log(res)
              methods.loadArticles(data.page)
            })
            ElMessage({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      // 编辑文章
      editArticle (id) {
        router.push(`/publish/?id=${id}`)
      }
    })

    // 初始化获取数据
    methods.loadArticles()
    methods.loadChannels()

    return {
      ...toRefs(data),
      ...toRefs(methods)
    }
  }
}
</script>

<style scoped lang="less">
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .box-card{
    margin-bottom: 10px;
  }
  .item {
    margin-bottom: 18px;
  }

  .filter-header{
    font-size: 17px;
    font-weight: bold;
  }

  .box1{
    margin-top: 50px;
  }

  .article-cover{
    width: 100px;
    background-size: cover;
  }

</style>
