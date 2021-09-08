import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/styles/index.less'
// eslint-disable-next-line import/no-duplicates
import ElementPlus from 'element-plus'
// eslint-disable-next-line import/no-duplicates
import { ElButton } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus).use(ElButton).use(router).mount('#app')
