<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { getImagePath } from '@/utils/imagePath'

const { locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const services = [
  {
    title: '品牌运营',
    desc: '本地化策略、内容创意、视觉设计、账号运营、品牌营销',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/icon-01.png')
  },
  {
    title: '电商运营',
    desc: '天猫、抖音、小红书、京东等渠道的旗舰店全托管运营',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/icon-02.png')
  },
  {
    title: '内容营销',
    desc: '达人合作、小红书种草、明星推广、短视频拍摄与内容矩阵',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/icon-40.png')
  },
  {
    title: '零售分销',
    desc: '覆盖全国 500+ 门店，包括潮店、3C 数码、百货、生活方式集合店',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/53 -53.png')
  },
  {
    title: '供应链管理',
    desc: '海外采购、进口通关、仓储配送、售后服务',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/icon-01.png')
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
            <img :src="service.icon" :alt="service.title" />
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
  display: grid;
  grid-template-columns: 1fr;
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

@media (min-width: 768px) {
  .services-overview__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .services-overview__grid {
    grid-template-columns: repeat(3, 1fr);
  }
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
}

.service-item__icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
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

