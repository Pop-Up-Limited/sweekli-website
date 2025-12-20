import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/Services.vue')
    },
    {
      path: '/solutions/distribution',
      name: 'solution-distribution',
      component: () => import('@/views/SolutionDistribution.vue')
    },
    {
      path: '/solutions/ecommerce',
      name: 'solution-ecommerce',
      component: () => import('@/views/SolutionEcommerce.vue')
    },
    {
      path: '/solutions/marketing',
      name: 'solution-marketing',
      component: () => import('@/views/SolutionMarketing.vue')
    },
    {
      path: '/brands',
      name: 'brands',
      component: () => import('@/views/Brands.vue')
    },
    {
      path: '/insights',
      name: 'insights',
      component: () => import('@/views/Insights.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/Contact.vue')
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: () => import('@/views/Authentication.vue')
    },
    {
      path: '/careers',
      name: 'careers',
      component: () => import('@/views/Careers.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/Privacy.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/Terms.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退），使用保存的位置
    if (savedPosition) {
      return savedPosition
    }
    // 如果有锚点，滚动到锚点
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // 否则滚动到顶部
    return new Promise((resolve) => {
      // 等待下一个 tick 确保 DOM 已更新
      setTimeout(() => {
        resolve({ top: 0, left: 0, behavior: 'instant' })
      }, 0)
    })
  }
})

export default router
