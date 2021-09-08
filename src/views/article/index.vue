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
        <div class="filter-header">根据筛选条件共查询到{{articles.total_count ? articles.total_count : 0}}条数据</div>
      </template>
        <!-- 表格 start -->
      <el-table class="search-table" :data="articles" style="width: 100%">
        <el-table-column prop="date" label="封面" width="180"> </el-table-column>
        <el-table-column prop="title" label="标题" width="180"> </el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template v-slot="scope">
            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="warning">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" width="180"> </el-table-column>
        <el-table-column prop="address" label="操作" width="180">
          <template>
            <el-button
              size="mini"
              circle
              icon="el-icon-edit"
              type="primary"
            >
            </el-button>
            <el-button
              size="mini"
              circle
              icon="el-icon-delete"
              type="danger"
            >
            </el-button>
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
import { reactive, ref } from 'vue'
export default {
  name: 'ArticleIndex',
  setup () {
    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })

    const tableData = reactive([
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
    ])

    let articles = reactive([])

    const defaultTime1 = reactive([new Date(2000, 1, 1, 12, 0, 0)])
    const value1 = ref('')

    // 获取文章数据
    getArticles().then(res => {
      articles = res.data.data
      console.log(articles.total_count)
      console.log(res)
    })

    return {
      form,
      defaultTime1,
      value1,
      tableData,
      articles
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

</style>
