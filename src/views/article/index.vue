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
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="defaultTime1"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单 end -->
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="filter-header">根据筛选条件共查询到{{total_count ? total_count : 0}}条数据</div>
      </template>
        <!-- 表格 start -->
      <el-table class="search-table" :data="articles" style="width: 100%">
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
              circle
              ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 end -->
      <!-- 分页 start -->
      <el-pagination class="box1" layout="prev, pager, next" :total="1000" background> </el-pagination>
      <!-- 分页 end -->
    </el-card>

  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import { reactive, toRefs } from 'vue'
export default {
  name: 'ArticleIndex',
  setup () {
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
      total_count: '',
      articleStatus: [
        { text: '草稿', status: 0, type: 'warning' },
        { text: '待审核', status: 1, type: 'warning' },
        { text: '审核通过', status: 2, type: 'success' },
        { text: '审核失败', status: 3, type: 'danger' },
        { text: '已删除', status: 4, type: 'info' }
      ]
    })

    // 获取文章数据
    getArticles().then(res => {
      data.articles = res.data.data.results
      data.total_count = res.data.data.total_count
    })

    return {
      ...toRefs(data)
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
