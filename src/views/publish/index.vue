<template>
  <div class="publish-container">
    <el-card class="box-card">
        <template #header>
        <!-- 面包屑导航 start-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.query.id ? '修改文章': '发布文章' }}</el-breadcrumb-item>
          </el-breadcrumb>
        <!-- 面包屑导航 end-->
        </template>
        <el-form ref="form" :model="article" label-width="80px" :rules="formRules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model="article.content"></el-input>
            <!-- <QuillEditor theme="snow" v-model="article.content"/> -->
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <template v-if="article.cover.type > 0">
              <upload-cover
                :key="cover"
                v-for="(cover, index) in article.cover.type"
                @updateCover="onUpdateCover(index, $event)"
                :coverImg="article.cover.images[index]"
              />
            </template>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
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
            <el-button @click="onPublish($event,false)">存入草稿</el-button>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { getArticleChannels, addArticle, getArticle, updateArticle } from '@/api/article'
import { reactive, toRefs, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UploadCover from './components/upload-cover.vue'
// 引入富文本编辑器
// import { QuillEdito  r } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
export default {
  name: 'PublishIndex',
  // components: {
  //   QuillEditor
  // },
  components: {
    UploadCover
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const form = ref(null)
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
      channels: [],
      // 表单验证规则
      formRules: {
        title: [
          {
            required: true, message: '请输入标题内容', trigger: 'blur'
          }
        ],
        content: [
          {
            required: true, message: '请输入标题内容', trigger: 'blur'
          },
          {
            min: 5,
            message: '长度至少5个字符',
            trigger: 'blur'
          }
        ],
        channel_id: [
          {
            required: true, message: '请选择频道', trigger: 'change'
          }
        ]
      }
    })

    const methods = reactive({
      // 修改文章：加载原文章的内容
      loadPublish: () => {
        getArticle(route.query.id).then(res => {
          data.article = res.data.data
        })
      },
      onPublish: ($event, draft = false) => {
        const articleId = route.query.id
        form.value.validate(valide => {
          if (!valide) {
            return null
          } else {
            // 如果是修改文章 则执行修改操作
            if (articleId) {
              updateArticle(articleId, data.article, draft).then(res => {
                ElMessage({
                  showClose: true,
                  message: draft ? '存入草稿成功' : '修改文章成功',
                  type: 'success'
                })
                console.log(res)
                router.push('/article')
              })
            } else {
              // 如果是新建文章，则执行新建操作
              addArticle(data.article, draft).then(res => {
                console.log(res)
                ElMessage({
                  showClose: true,
                  message: '添加文章成功',
                  type: 'success'
                })
                router.push('/article')
              })
            }
          }
        })
      },
      // 自定义事件
      onUpdateCover (index, url) {
        // 将子组件的封面图的url传给父组件
        data.article.cover.images[index] = url
      }
    })
    // 获取文章分类
    getArticleChannels().then(res => {
      data.channels = res.data.data.channels
    })

    // 判断是新建文章还是编辑文章
    if (route.query.id) {
      methods.loadPublish()
    }

    return {
      ...toRefs(data),
      ...toRefs(methods),
      form
    }
  }
}
</script>

<style>

</style>
