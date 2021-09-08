
<template>
  <div class="login-container">
    <div class="login-head"></div>
    <!--
        配置 Form 表单验证：
        1. 必须给el-form组件绑定model为表单数据对象
        2. 给需要验证的表单项 el-form-item 绑定 prop 属性
     -->
    <el-form ref="form" :model="user" class="login-form" :rules="formRules" >
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
        <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree" label="我已阅读并同意用户协议和隐私条款"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
        type="primary"
        @click="onLogin"
        class="login-button"
        :plain="true"
        :loading="loginLoading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { doLogin } from '@/api/user'
import { ElMessage } from 'element-plus'
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
  methods: {
  },
  setup () {
    // 引入路由
    const router = useRouter()
    const data = reactive({
      // 用户
      user: {
        // 手机号
        mobile: '',
        // 验证码
        code: '',
        // 用户是否同意协议
        agree: false
      },
      // 登录是否在加载中
      loginLoading: false,
      // 表单验证规则配置
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|4|5|6|7|8|9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            message: '请勾选同意用户协议',
            trigger: 'change'
          }
        ]
      }
    })
    // 获取表单
    const form = ref(null)

    const methods = reactive({
      // 发送登录请求
      login: () => {
        data.loginLoading = true
        doLogin(data.user).then(res => {
          ElMessage({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
          data.loginLoading = false
          localStorage.setItem('token', res.data.data.token)
          // 跳转到首页
          router.push({
            name: 'home'
          })
          // 登录成功
          console.log(res)
        }).catch(err => {
          // 登录失败
          ElMessage({
            showClose: true,
            message: '用户名或验证码输入错误',
            type: 'error'
          })
          data.loginLoading = false
          console.log(err)
        })
      },
      // 点击登录按钮执行事件
      onLogin: () => {
        form.value.validate((valid, err) => {
          // 如果表单验证失败，停止请求提交
          if (!valid) {
            return
          }
          // 验证成功 登录
          methods.login()
        })
      }
    })

    return {
      ...toRefs(data),
      ...toRefs(methods),
      form
    }
  }
}
</script>

<style lang="less">
.login-container{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-head{
    width: 300px;
    height: 57px;
    background: url('./logo_index.png') no-repeat;
    margin-bottom: 30px;
  }
  .login-form{
    background-color: #fff;
    padding: 50px;
    .login-button{
      width: 100%;
    }
  }
}

</style>
