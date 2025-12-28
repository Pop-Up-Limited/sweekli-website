<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getImagePath } from '@/utils/imagePath'
import { useSEO } from '@/utils/seo'
import CTASection from '@/components/home/CTASection.vue'
import PageHero from '@/components/common/PageHero.vue'

const { t, locale } = useI18n()

useSEO({
  title: locale.value === 'en' ? 'Our Services' : '我们的业务',
  description: locale.value === 'en'
    ? 'From market entry strategy to daily operations, we handle every aspect of your China and APAC e-commerce journey.'
    : '从市场进入战略到日常运营，我们为您的中国和亚太电商之旅提供全方位服务。',
  path: '/services'
})

const services = computed(() => {
  if (locale.value === 'en') {
    return [
      {
        title: t('services.items.strategy.title'),
        desc: t('services.items.strategy.desc'),
        features: [
          t('services.items.strategy.features.0'),
          t('services.items.strategy.features.1'),
          t('services.items.strategy.features.2')
        ],
        image: getImagePath('/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-1_01.jpg')
      },
      {
        title: t('services.items.ecommerce.title'),
        desc: t('services.items.ecommerce.desc'),
        features: [
          t('services.items.ecommerce.features.0'),
          t('services.items.ecommerce.features.1'),
          t('services.items.ecommerce.features.2')
        ],
        image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/2 E-Commerce/PC.jpg')
      },
      {
        title: t('services.items.marketing.title'),
        desc: t('services.items.marketing.desc'),
        features: [
          t('services.items.marketing.features.0'),
          t('services.items.marketing.features.1'),
          t('services.items.marketing.features.2')
        ],
        image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/1 Distribution/1_副本.jpg')
      },
      {
        title: t('services.items.distribution.title'),
        desc: t('services.items.distribution.desc'),
        features: [
          t('services.items.distribution.features.0'),
          t('services.items.distribution.features.1'),
          t('services.items.distribution.features.2')
        ],
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC05476.JPG')
      }
    ]
  } else {
    return [
      {
        title: t('services.items.ecommerce.title'),
        desc: t('services.items.ecommerce.desc'),
        features: [
          t('services.items.ecommerce.features.0'),
          t('services.items.ecommerce.features.1'),
          t('services.items.ecommerce.features.2')
        ],
        image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/2 E-Commerce/PC.jpg')
      },
      {
        title: t('services.items.content.title'),
        desc: t('services.items.content.desc'),
        features: [
          t('services.items.content.features.0'),
          t('services.items.content.features.1'),
          t('services.items.content.features.2')
        ],
        image: getImagePath('/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-1_01.jpg')
      },
      {
        title: t('services.items.marketing.title'),
        desc: t('services.items.marketing.desc'),
        features: [
          t('services.items.marketing.features.0'),
          t('services.items.marketing.features.1'),
          t('services.items.marketing.features.2')
        ],
        image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/1 Distribution/1_副本.jpg')
      },
      {
        title: t('services.items.distribution.title'),
        desc: t('services.items.distribution.desc'),
        features: [
          t('services.items.distribution.features.0'),
          t('services.items.distribution.features.1'),
          t('services.items.distribution.features.2')
        ],
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC05476.JPG')
      },
      {
        title: t('services.items.supply.title'),
        desc: t('services.items.supply.desc'),
        features: [
          t('services.items.supply.features.0'),
          t('services.items.supply.features.1'),
          t('services.items.supply.features.2')
        ],
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0056.JPG')
      }
    ]
  }
})

const platforms = [
  { name: 'Tmall', logo: '/images/platform-logos/tmall.svg' },
  { name: 'JD', logo: '/images/platform-logos/jd.svg' },
  { name: 'Douyin', logo: '/images/platform-logos/douyin.svg' },
  { name: 'WeChat', logo: '/images/platform-logos/wechat.svg' },
  { name: 'RED', logo: '/images/platform-logos/xiaohongshu.svg' }
]

</script>

<template>
  <main class="services-page">
    <!-- Hero Section -->
    <PageHero
      :label="locale === 'en' ? 'OUR SERVICES' : '我们的服务'"
      :title="t('services.hero.title')"
      :subtitle="t('services.hero.subtitle')"
      background-type="gradient"
    />

    <!-- Services List - Alternating Layout -->
    <section class="services-section">
      <div class="container">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="service-item"
          :class="{ 'service-item--reverse': index % 2 === 1 }"
        >
          <div class="service-item__image">
            <img :src="service.image" :alt="service.title" loading="lazy" />
          </div>
          <div class="service-item__content">
            <h3 class="service-item__title">{{ service.title }}</h3>
            <p class="service-item__desc">{{ service.desc }}</p>
            <ul class="service-item__features">
              <li v-for="(feature, idx) in service.features" :key="idx">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Platforms -->
    <section class="platforms-section">
      <div class="container">
        <div class="platforms-header">
          <span class="platforms-label">{{ locale === 'en' ? 'PLATFORMS' : '平台生态' }}</span>
          <h2 class="platforms-title">{{ t('services.platforms.title') }}</h2>
          <p class="platforms-subtitle">{{ t('services.platforms.subtitle') }}</p>
        </div>
        <div class="platforms-grid">
          <div class="platform-card" v-for="platform in platforms" :key="platform.name">
            <div class="platform-card__logo">
              <span class="platform-name">{{ platform.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="process-section">
      <div class="container">
        <div class="process-header">
          <span class="process-label">{{ locale === 'en' ? 'OUR PROCESS' : '服务流程' }}</span>
          <h2 class="process-title">{{ t('services.process.title') }}</h2>
        </div>
        <div class="process-timeline">
          <div class="process-step">
            <div class="step-number">01</div>
            <div class="step-content">
              <h3>{{ t('services.process.steps.discovery.title') }}</h3>
              <p>{{ t('services.process.steps.discovery.desc') }}</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">02</div>
            <div class="step-content">
              <h3>{{ t('services.process.steps.strategy.title') }}</h3>
              <p>{{ t('services.process.steps.strategy.desc') }}</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">03</div>
            <div class="step-content">
              <h3>{{ t('services.process.steps.execution.title') }}</h3>
              <p>{{ t('services.process.steps.execution.desc') }}</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">04</div>
            <div class="step-content">
              <h3>{{ t('services.process.steps.optimization.title') }}</h3>
              <p>{{ t('services.process.steps.optimization.desc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <CTASection />
  </main>
</template>

<style scoped>
.services-page {
  padding-top: 0;
}

/* Services Section - Alternating Layout */
.services-section {
  padding: var(--spacing-24) 0;
  background: var(--color-white);
}

.service-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-12);
  align-items: center;
  margin-bottom: var(--spacing-16);
  padding: var(--spacing-8) 0;
}

.service-item:last-child {
  margin-bottom: 0;
}

@media (min-width: 1024px) {
  .service-item {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-16);
  }
  
  .service-item--reverse {
    direction: rtl;
  }
  
  .service-item--reverse > * {
    direction: ltr;
  }
}

.service-item__image {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  aspect-ratio: 4/3;
}

.service-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.service-item__image:hover img {
  transform: scale(1.05);
}

.service-item__content {
  padding: var(--spacing-6) 0;
}

.service-item__title {
  font-family: var(--font-family-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-4);
  line-height: 1.2;
}

.service-item__desc {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  line-height: 1.7;
  margin-bottom: var(--spacing-6);
}

.service-item__features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-item__features li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-3);
  line-height: 1.6;
}

.service-item__features svg {
  color: var(--color-accent-purple);
  flex-shrink: 0;
  margin-top: 0.2em;
}

/* Platforms */
.platforms-section {
  padding: var(--spacing-24) 0;
  background: var(--color-gray-50);
}

.platforms-header {
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.platforms-label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--spacing-3);
}

.platforms-title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-4);
}

.platforms-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto;
}

.platforms-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-6);
}

.platform-card {
  background: var(--color-white);
  padding: var(--spacing-6) var(--spacing-10);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-gray-200);
  transition: all var(--transition-base);
}

.platform-card:hover {
  border-color: var(--color-accent-purple);
}

.platform-name {
  font-family: var(--font-family-display);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  font-size: var(--font-size-lg);
}

/* Process */
.process-section {
  padding: var(--spacing-24) 0;
  background: var(--color-white);
}

.process-header {
  text-align: center;
  margin-bottom: var(--spacing-16);
}

.process-label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--spacing-3);
}

.process-title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.process-timeline {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-8);
  max-width: 1000px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .process-timeline {
    grid-template-columns: 1fr;
  }
}

.process-step {
  text-align: center;
  position: relative;
}

.step-number {
  font-family: var(--font-family-display);
  font-size: 3rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-purple);
  opacity: 0.3;
  margin-bottom: var(--spacing-4);
}

.step-content h3 {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.step-content p {
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

</style>
