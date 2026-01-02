<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useSEO } from '@/utils/seo'
import CTASection from '@/components/home/CTASection.vue'
import PageHero from '@/components/common/PageHero.vue'

const { t, locale } = useI18n()

useSEO({
  title: locale.value === 'en' ? 'Our Services' : '我们的业务',
  description: locale.value === 'en'
    ? 'We provide end-to-end market entry, e-commerce operations, retail distribution, marketing and PR services.'
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
        image: '/images/services/strategy.jpg'
      },
      {
        title: t('services.items.ecommerce.title'),
        desc: t('services.items.ecommerce.desc'),
        features: [
          t('services.items.ecommerce.features.0'),
          t('services.items.ecommerce.features.1'),
          t('services.items.ecommerce.features.2'),
          t('services.items.ecommerce.features.3')
        ],
        image: '/images/services-ecommerce.jpg'
      },
      {
        title: t('services.items.marketing.title'),
        desc: t('services.items.marketing.desc'),
        features: [
          t('services.items.marketing.features.0'),
          t('services.items.marketing.features.1'),
          t('services.items.marketing.features.2'),
          t('services.items.marketing.features.3')
        ],
        image: '/images/services-marketing.jpg'
      },
      {
        title: t('services.items.distribution.title'),
        desc: t('services.items.distribution.desc'),
        features: [
          t('services.items.distribution.features.0'),
          t('services.items.distribution.features.1'),
          t('services.items.distribution.features.2')
        ],
        image: '/images/services-distribution.jpg'
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
        image: '/images/services-ecommerce-zh.jpg'
      },
      {
        title: t('services.items.content.title'),
        desc: t('services.items.content.desc'),
        features: [
          t('services.items.content.features.0'),
          t('services.items.content.features.1'),
          t('services.items.content.features.2')
        ],
        image: '/images/services-content-zh.jpg'
      },
      {
        title: t('services.items.marketing.title'),
        desc: t('services.items.marketing.desc'),
        features: [
          t('services.items.marketing.features.0'),
          t('services.items.marketing.features.1'),
          t('services.items.marketing.features.2')
        ],
        image: '/images/services-marketing-zh.jpg'
      },
      {
        title: t('services.items.distribution.title'),
        desc: t('services.items.distribution.desc'),
        features: [
          t('services.items.distribution.features.0'),
          t('services.items.distribution.features.1'),
          t('services.items.distribution.features.2')
        ],
        image: '/images/services-distribution-zh.jpg'
      },
      {
        title: t('services.items.supply.title'),
        desc: t('services.items.supply.desc'),
        features: [
          t('services.items.supply.features.0'),
          t('services.items.supply.features.1'),
          t('services.items.supply.features.2')
        ],
        image: '/images/services-supply-zh.jpg'
      }
    ]
  }
})

const platforms = [
  { name: 'Tmall', logo: '/images/platform-logos/platform-1.png' },
  { name: 'JD', logo: '/images/platform-logos/platform-2.png' },
  { name: 'Douyin', logo: '/images/platform-logos/platform-3.png' },
  { name: 'WeChat', logo: '/images/platform-logos/platform-4.png' },
  { name: 'RED', logo: '/images/platform-logos/platform-5.png' },
  { name: 'Platform 6', logo: '/images/platform-logos/platform-6.png' },
  { name: 'Platform 7', logo: '/images/platform-logos/platform-7.png' },
  { name: 'Platform 8', logo: '/images/platform-logos/platform-8.png' }
]

</script>

<template>
  <main class="services-page">
    <!-- Hero Section -->
    <PageHero
      :label="locale === 'en' ? 'OUR SERVICES' : '我们的服务'"
      :title="t('services.hero.title')"
      :subtitle="t('services.hero.subtitle')"
      background-type="image"
      :background-image="locale === 'en' ? '/images/services-hero-1.jpg' : '/images/services-hero-2.jpg'"
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
              <img :src="platform.logo" :alt="platform.name" />
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
            <div class="process-step__icon">
              <img src="/images/process-icons/icon-1.png" alt="Discovery" />
            </div>
            <div class="step-content">
              <h3>{{ t('services.process.steps.discovery.title') }}</h3>
              <p>{{ t('services.process.steps.discovery.desc') }}</p>
            </div>
          </div>
          <div class="process-step">
            <div class="process-step__icon">
              <img src="/images/process-icons/icon-2.png" alt="Strategy" />
            </div>
            <div class="step-content">
              <h3>{{ t('services.process.steps.strategy.title') }}</h3>
              <p>{{ t('services.process.steps.strategy.desc') }}</p>
            </div>
          </div>
          <div class="process-step">
            <div class="process-step__icon">
              <img src="/images/process-icons/icon-3.png" alt="Execution" />
            </div>
            <div class="step-content">
              <h3>{{ t('services.process.steps.execution.title') }}</h3>
              <p>{{ t('services.process.steps.execution.desc') }}</p>
            </div>
          </div>
          <div class="process-step">
            <div class="process-step__icon">
              <img src="/images/process-icons/icon-4.png" alt="Optimization" />
            </div>
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
  background: transparent;
  padding: var(--spacing-4);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
}

.platform-card__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.platform-card__logo img {
  max-width: 100%;
  max-height: 32px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all var(--transition-base);
}

.platform-card:hover .platform-card__logo img {
  filter: grayscale(0%);
  opacity: 1;
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

@media (min-width: 1024px) {
  .process-timeline {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-6);
  }
}

@media (max-width: 768px) {
  .process-timeline {
    grid-template-columns: 1fr;
  }
}

.process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.process-step__icon {
  width: 64px;
  height: 64px;
  margin-bottom: var(--spacing-4);
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3);
}

.process-step__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
