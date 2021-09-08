<template>
  <div class="publish-container">
    <el-card class="box-card">
        <template #header>
        <!-- 面包屑导航 start-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>发布文章</el-breadcrumb-item>
          </el-breadcrumb>
        <!-- 面包屑导航 end-->
        </template>
        <el-form ref="form" :model="article" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="article.name"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="article.content"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel,index) in channels"
              :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onPublish">发表</el-button>
            <el-button>存入草稿</el-button>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle } from '@/api/article'
import { reactive, toRefs } from 'vue'
export default {
  name: 'PublishIndex',
  setup () {
    const data = reactive({
      article: {
        title: '', // 文章标题
        content: '', // 文章内容,
        cover: {
          type: 0, // 封面的类型
          // -1 自动 0 无图 1-1张 3-3张
          images: []
        },
        channel_id: null
      },
      // 文章频道列表
      channels: []
    })

    getArticleChannels().then(res => {
      data.channels = res.data.data.channels
      console.log(data.channels)
    })

    const onPublish = () => {
      // 找到数据接口
      // 封装请求方法
      // 请求提交表单
      addArticle(data.article).then(res => {
        console.log(res)
      })
      // 处理响应结果
    }

    return {
      ...toRefs(data),
      onPublish
    }
  }
}
</script>

<style>

</style>
