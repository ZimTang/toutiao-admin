import { createRouter, createWebHashHistory } from 'vue-router'
// 在Vue-cli创建的项目中 @ 表示 src 目录
// 好处：不受到当前文件路径影响
// 路由懒加载
const Login = () => import('@/views/login/index.vue')
const Home = () => import('@/views/home/index.vue')
const Layout = () => import('@/views/layout/index.vue')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        // path为空 会作为默认子路由
        path: '',
        name: 'home',
        component: Home
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
