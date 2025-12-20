<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import CTASection from '@/components/home/CTASection.vue'

const { t, locale } = useI18n()

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

const capabilities = computed(() => [
  {
    image: '/images/Sweekli 官网介绍 图片素材/4 Solutions/1 Distribution/Our Distribution Capabilities/Distribution_01.jpg',
    title: locale.value === 'en' ? 'Omnichannel Distribution' : '全渠道分销',
    desc: locale.value === 'en' 
      ? 'Comprehensive distribution network across department stores, concept stores, and specialty retailers.'
      : '覆盖百货商店、概念店和专业零售商的全方位分销网络。'
  },
  {
    image: '/images/Sweekli 官网介绍 图片素材/4 Solutions/1 Distribution/Our Distribution Capabilities/Distribution_02.jpg',
    title: locale.value === 'en' ? 'Retail Partnerships' : '零售合作',
    desc: locale.value === 'en'
      ? 'Strategic partnerships with leading retail chains and independent stores.'
      : '与领先零售连锁店和独立商店的战略合作。'
  },
  {
    image: '/images/Sweekli 官网介绍 图片素材/4 Solutions/1 Distribution/Our Distribution Capabilities/Distribution_03.jpg',
    title: locale.value === 'en' ? 'Inventory Management' : '库存管理',
    desc: locale.value === 'en'
      ? 'Advanced inventory tracking and optimization systems.'
      : '先进的库存跟踪和优化系统。'
  },
  {
    image: '/images/Sweekli 官网介绍 图片素材/4 Solutions/1 Distribution/Our Distribution Capabilities/Distribution_04.jpg',
    title: locale.value === 'en' ? 'Channel Strategy' : '渠道策略',
    desc: locale.value === 'en'
      ? 'Data-driven channel selection and optimization.'
      : '数据驱动的渠道选择和优化。'
  }
])

const channels = computed(() => [
  {
    name: locale.value === 'en' ? 'Department Stores' : '百货商店',
    icon: '🏬'
  },
  {
    name: locale.value === 'en' ? 'Concept & Fashion Stores' : '概念与时尚店',
    icon: '👔'
  },
  {
    name: locale.value === 'en' ? 'Design & Home Stores' : '设计与家居店',
    icon: '🏠'
  },
  {
    name: locale.value === 'en' ? 'Bookstores & Art Stores' : '书店与艺术店',
    icon: '📚'
  },
  {
    name: locale.value === 'en' ? 'CE & Apple Resellers' : '消费电子与苹果授权店',
    icon: '💻'
  }
])

useIntersectionObserver(
  heroRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isHeroVisible.value = true
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
          src="/images/Sweekli 官网介绍 图片素材/4 Solutions/1 Distribution/1-2_副本.jpg" 
          alt="Distribution"
          loading="eager"
        />
        <div class="solution-hero__overlay"></div>
      </div>
      <div class="container solution-hero__content" :class="{ 'is-visible': isHeroVisible }">
        <span class="solution-hero__label">{{ locale === 'en' ? 'SOLUTION' : '解决方案' }}</span>
        <h1 class="solution-hero__title">{{ t('solutions.distribution.hero.title') }}</h1>
        <p class="solution-hero__subtitle">{{ t('solutions.distribution.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="solution-section">
      <div class="container">
        <div class="solution-header">
          <span class="solution-label">{{ locale === 'en' ? 'OUR CAPABILITIES' : '我们的能力' }}</span>
          <h2 class="solution-title">{{ t('solutions.distribution.capabilities.title') }}</h2>
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

    <!-- Channels -->
    <section class="solution-section solution-section--alt">
      <div class="container">
        <div class="solution-header">
          <span class="solution-label">{{ locale === 'en' ? 'DISTRIBUTION CHANNELS' : '分销渠道' }}</span>
          <h2 class="solution-title">{{ t('solutions.distribution.channels.title') }}</h2>
          <p class="solution-subtitle">{{ t('solutions.distribution.channels.subtitle') }}</p>
        </div>
        <div class="channels-grid">
          <div v-for="(channel, index) in channels" :key="index" class="channel-card">
            <div class="channel-card__icon">{{ channel.icon }}</div>
            <h3 class="channel-card__name">{{ channel.name }}</h3>
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

/* Channels Grid */
.channels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-6);
}

.channel-card {
  background: var(--color-white);
  padding: var(--spacing-8);
  border-radius: var(--radius-2xl);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.channel-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.channel-card__icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-4);
}

.channel-card__name {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}
</style>

