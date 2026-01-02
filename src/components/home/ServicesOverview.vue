<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const services = [
  {
    title: '品牌运营',
    desc: '本地化策略、内容创意、视觉设计、账号运营、品牌营销',
    iconType: 'brand'
  },
  {
    title: '电商运营',
    desc: '天猫、抖音、小红书、京东等渠道的旗舰店全托管运营',
    iconType: 'ecommerce'
  },
  {
    title: '内容营销',
    desc: '达人合作、小红书种草、明星推广、短视频拍摄与内容矩阵',
    iconType: 'marketing'
  },
  {
    title: '零售分销',
    desc: '覆盖全国 500+ 门店，包括潮店、3C 数码、百货、生活方式集合店',
    iconType: 'distribution'
  },
  {
    title: '供应链管理',
    desc: '海外采购、进口通关、仓储配送、售后服务',
    iconType: 'supply'
  }
]

useIntersectionObserver(
  sectionRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      isVisible.value = true
    }
  },
  { threshold: 0.2 }
)
</script>

<template>
  <section ref="sectionRef" class="services-overview section">
    <div class="container">
      <div class="services-overview__header" :class="{ 'is-visible': isVisible }">
        <span class="services-overview__label">我们的业务范围</span>
        <h2 class="services-overview__title">我们的业务范围</h2>
      </div>

      <div class="services-overview__grid" :class="{ 'is-visible': isVisible }">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="service-item"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="service-item__icon">
            <!-- 品牌运营 -->
            <svg v-if="service.iconType === 'brand'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <!-- 电商运营 -->
            <svg v-else-if="service.iconType === 'ecommerce'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <!-- 内容营销 -->
            <svg v-else-if="service.iconType === 'marketing'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <!-- 零售分销 -->
            <svg v-else-if="service.iconType === 'distribution'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <!-- 供应链管理 -->
            <svg v-else-if="service.iconType === 'supply'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <h3 class="service-item__title">{{ service.title }}</h3>
          <p class="service-item__desc">{{ service.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-overview {
  background: var(--color-white);
  padding: var(--spacing-24) 0;
}

.services-overview__header {
  text-align: center;
  margin-bottom: var(--spacing-12);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.services-overview__header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.services-overview__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-purple);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--spacing-3);
}

.services-overview__title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.services-overview__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-6);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}

.services-overview__grid.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.service-item {
  background: var(--color-gray-50);
  padding: var(--spacing-8);
  border-radius: var(--radius-2xl);
  text-align: center;
  transition: all var(--transition-base);
  border: 1px solid var(--color-gray-100);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: var(--delay, 0s);
  flex: 0 0 100%;
  max-width: 100%;
}

@media (min-width: 768px) {
  .service-item {
    flex: 0 0 calc(50% - var(--spacing-3));
    max-width: calc(50% - var(--spacing-3));
  }
}

@media (min-width: 1024px) {
  .service-item {
    flex: 0 0 calc(33.333% - var(--spacing-4));
    max-width: calc(33.333% - var(--spacing-4));
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-item:hover {
  transform: translateY(-8px);
  border-color: var(--color-accent-purple);
  box-shadow: var(--shadow-lg);
}

.service-item__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-4);
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-purple);
}

.service-item__icon svg {
  width: 32px;
  height: 32px;
}

.service-item__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
}

.service-item__desc {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.6;
  margin: 0;
}
</style>

