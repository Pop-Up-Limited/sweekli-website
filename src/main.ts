import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { initGoogleAnalytics, trackPageView } from './utils/analytics'

import './styles/variables.css'
import './styles/global.css'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)
app.use(i18n)

// 初始化 Analytics
// Vercel Analytics 通过 App.vue 中的 <Analytics /> 组件自动处理
// Google Analytics（可选，需要配置 VITE_GA_MEASUREMENT_ID）
if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
  initGoogleAnalytics()
}

// 跟踪路由变化
router.afterEach((to) => {
  trackPageView(to.path)
})

app.mount('#app')
