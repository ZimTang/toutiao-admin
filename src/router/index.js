import { createRouter, createWebHashHistory } from 'vue-router'
// 在Vue-cli创建的项目中 @ 表示 src 目录
// 好处：不受到当前文件路径影响
// 路由懒加载
const Login = () => import('@/views/login/index.vue')
const Home = () => import('@/views/home/index.vue')
const Layout = () => import('@/views/layout/index.vue')
const Article = () => import('@/views/article/index.vue')

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
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 配置路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login') {
    next()
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
