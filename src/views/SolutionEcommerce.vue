<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useSEO } from '@/utils/seo'
import CTASection from '@/components/home/CTASection.vue'
import { getImagePath } from '@/utils/imagePath'

const { t, locale } = useI18n()

useSEO({
  title: locale.value === 'en' ? 'E-Commerce Operations' : '电商运营',
  description: locale.value === 'en'
    ? 'Full-service e-commerce management across all major Chinese platforms.'
    : '在中国所有主流平台提供全方位电商管理服务。',
  path: '/solutions/ecommerce'
})

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

const capabilities = computed(() => [
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/2 E-Commerce/2 Our E-Commerce Capabilities/5_01.jpg'),
    title: locale.value === 'en' ? 'Store Management' : '店铺管理',
    desc: locale.value === 'en' 
      ? 'Full-service management of Tmall, JD, and other major platforms.'
      : '天猫、京东等主流平台的全方位店铺管理。'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/2 E-Commerce/2 Our E-Commerce Capabilities/5_02.jpg'),
    title: locale.value === 'en' ? 'Product Optimization' : '产品优化',
    desc: locale.value === 'en'
      ? 'SEO-optimized listings and conversion-focused product pages.'
      : 'SEO优化的产品列表和转化导向的产品页面。'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/2 E-Commerce/2 Our E-Commerce Capabilities/5_03.jpg'),
    title: locale.value === 'en' ? 'Customer Service' : '客户服务',
    desc: locale.value === 'en'
      ? '24/7 Chinese-language customer support.'
      : '24/7中文客户支持服务。'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/2 E-Commerce/2 Our E-Commerce Capabilities/5_04.jpg'),
    title: locale.value === 'en' ? 'Data Analytics' : '数据分析',
    desc: locale.value === 'en'
      ? 'Comprehensive performance tracking and insights.'
      : '全面的性能跟踪和数据分析。'
  }
])

const works = computed(() => [
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/2 E-Commerce/3 Our Works  E-commerce Flagship Stores/4.jpg'),
    title: locale.value === 'en' ? 'Tmall Flagship Store' : '天猫旗舰店'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/2 E-Commerce/3 Our Works  E-commerce Flagship Stores/5.jpg'),
    title: locale.value === 'en' ? 'JD Store' : '京东店铺'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/2 E-Commerce/3 Our Works  E-commerce Flagship Stores/6.jpg'),
    title: locale.value === 'en' ? 'Cross-Platform Management' : '跨平台管理'
  }
])

useIntersectionObserver(
  heroRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) isHeroVisible.value = true
  },
  { threshold: 0.2 }
)
</script>

<template>
  <main class="solution-page">
    <!-- Hero Section -->
    <section ref="heroRef" class="solution-hero">
      <div class="solution-hero__bg">
        <img 
          :src="getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/2 E-Commerce/PC.jpg')" 
          alt="E-Commerce"
          loading="eager"
        />
        <div class="solution-hero__overlay"></div>
      </div>
      <div class="container solution-hero__content" :class="{ 'is-visible': isHeroVisible }">
        <span class="solution-hero__label">{{ locale === 'en' ? 'SOLUTION' : '解决方案' }}</span>
        <h1 class="solution-hero__title">{{ t('solutions.ecommerce.hero.title') }}</h1>
        <p class="solution-hero__subtitle">{{ t('solutions.ecommerce.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="solution-section">
      <div class="container">
        <div class="solution-header">
          <span class="solution-label">{{ locale === 'en' ? 'OUR CAPABILITIES' : '我们的能力' }}</span>
          <h2 class="solution-title">{{ t('solutions.ecommerce.capabilities.title') }}</h2>
        </div>
        <div class="capabilities-grid">
          <div v-for="(capability, index) in capabilities" :key="index" class="capability-card">
            <div class="capability-card__image">
              <img :src="capability.image" :alt="capability.title" loading="lazy" />
            </div>
            <div class="capability-card__content">
              <h3 class="capability-card__title">{{ capability.title }}</h3>
              <p class="capability-card__desc">{{ capability.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Works -->
    <section class="solution-section solution-section--alt">
      <div class="container">
        <div class="solution-header">
          <span class="solution-label">{{ locale === 'en' ? 'OUR WORKS' : '我们的作品' }}</span>
          <h2 class="solution-title">{{ t('solutions.ecommerce.works.title') }}</h2>
          <p class="solution-subtitle">{{ t('solutions.ecommerce.works.subtitle') }}</p>
        </div>
        <div class="works-grid">
          <div v-for="(work, index) in works" :key="index" class="work-card">
            <div class="work-card__image">
              <img :src="work.image" :alt="work.title" loading="lazy" />
            </div>
            <h3 class="work-card__title">{{ work.title }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <CTASection />
  </main>
</template>

<style scoped>
.solution-page {
  padding-top: 0;
}

/* Hero */
.solution-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 80px;
  padding-bottom: var(--spacing-20);
}

@media (max-width: 768px) {
  .solution-hero {
    padding-top: 70px;
    padding-bottom: var(--spacing-16);
  }
}

.solution-hero__bg {
  position: absolute;
  inset: 0;
}

.solution-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.solution-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(40, 46, 69, 0.9) 0%, rgba(111, 123, 212, 0.8) 100%);
}

.solution-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.solution-hero__content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.solution-hero__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: var(--spacing-4);
}

.solution-hero__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  color: var(--color-white);
}

.solution-hero__subtitle {
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.7;
}

/* Sections */
.solution-section {
  padding: var(--spacing-24) 0;
  background: var(--color-white);
}

.solution-section--alt {
  background: var(--color-gray-50);
}

.solution-header {
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.solution-label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-purple);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--spacing-3);
}

.solution-title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-4);
}

.solution-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto;
}

/* Capabilities Grid */
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 768px) {
  .capabilities-grid {
    grid-template-columns: 1fr;
  }
}

.capability-card {
  background: var(--color-white);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.capability-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.capability-card__image {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.capability-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.capability-card:hover .capability-card__image img {
  transform: scale(1.1);
}

.capability-card__content {
  padding: var(--spacing-6);
}

.capability-card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
}

.capability-card__desc {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.6;
}

/* Works Grid */
.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: 1fr;
  }
}

.work-card {
  background: var(--color-white);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.work-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.work-card__image {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.work-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.work-card:hover .work-card__image img {
  transform: scale(1.1);
}

.work-card__title {
  padding: var(--spacing-4);
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-align: center;
}
</style>

