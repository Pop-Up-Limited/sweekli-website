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
      path: '/brands',
      name: 'brands',
      component: () => import('@/views/Brands.vue')
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
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
