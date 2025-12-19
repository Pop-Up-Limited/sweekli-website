<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const { t, locale } = useI18n()

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

const services = computed(() => [
  {
    icon: '/images/Sweekli 英文 PDF内图片素材/3 icon/icon-38.png',
    title: t('services.items.strategy.title'),
    desc: t('services.items.strategy.desc'),
    features: [
      t('services.items.strategy.features.0'),
      t('services.items.strategy.features.1'),
      t('services.items.strategy.features.2')
    ]
  },
  {
    icon: '/images/Sweekli 英文 PDF内图片素材/3 icon/icon-39.png',
    title: t('services.items.ecommerce.title'),
    desc: t('services.items.ecommerce.desc'),
    features: [
      t('services.items.ecommerce.features.0'),
      t('services.items.ecommerce.features.1'),
      t('services.items.ecommerce.features.2')
    ]
  },
  {
    icon: '/images/Sweekli 英文 PDF内图片素材/3 icon/icon-40.png',
    title: t('services.items.marketing.title'),
    desc: t('services.items.marketing.desc'),
    features: [
      t('services.items.marketing.features.0'),
      t('services.items.marketing.features.1'),
      t('services.items.marketing.features.2')
    ]
  },
  {
    icon: '/images/Sweekli 英文 PDF内图片素材/3 icon/53 -53.png',
    title: t('services.items.operations.title'),
    desc: t('services.items.operations.desc'),
    features: [
      t('services.items.operations.features.0'),
      t('services.items.operations.features.1'),
      t('services.items.operations.features.2')
    ]
  }
])

const platforms = [
  { name: 'Tmall', logo: '/images/platform-logos/tmall.svg' },
  { name: 'JD', logo: '/images/platform-logos/jd.svg' },
  { name: 'Douyin', logo: '/images/platform-logos/douyin.svg' },
  { name: 'WeChat', logo: '/images/platform-logos/wechat.svg' },
  { name: 'RED', logo: '/images/platform-logos/xiaohongshu.svg' }
]

useIntersectionObserver(
  heroRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isHeroVisible.value = true
  },
  { threshold: 0.2 }
)
</script>

<template>
  <main class="services-page">
    <!-- Hero Section -->
    <section ref="heroRef" class="services-hero">
      <div class="services-hero__bg">
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
      </div>
      <div class="container services-hero__content" :class="{ 'is-visible': isHeroVisible }">
        <span class="services-hero__label">{{ locale === 'en' ? 'OUR SERVICES' : '我们的服务' }}</span>
        <h1 class="services-hero__title">{{ t('services.hero.title') }}</h1>
        <p class="services-hero__subtitle">{{ t('services.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-section">
      <div class="container">
        <div class="services-grid">
          <div v-for="(service, index) in services" :key="index" class="service-card">
            <div class="service-card__icon">
              <img :src="service.icon" :alt="service.title" />
            </div>
            <div class="service-card__content">
              <h3 class="service-card__title">{{ service.title }}</h3>
              <p class="service-card__desc">{{ service.desc }}</p>
              <ul class="service-card__features">
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
    <section class="services-cta">
      <div class="container">
        <div class="cta-content">
          <h2>{{ t('services.cta.title') }}</h2>
          <p>{{ t('services.cta.subtitle') }}</p>
          <router-link to="/contact" class="cta-button">
            {{ t('services.cta.button') }}
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.services-page {
  padding-top: 0;
}

/* Hero */
.services-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: var(--spacing-32) 0;
}

.services-hero__bg {
  position: absolute;
  inset: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #282E45 0%, #3D4565 40%, #6F7BD4 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(111, 123, 212, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  animation: floatPattern 15s ease-in-out infinite;
}

@keyframes floatPattern {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.05) rotate(1deg); }
}

.services-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.services-hero__content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.services-hero__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-orange);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: var(--spacing-4);
}

.services-hero__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  color: var(--color-white);
}

.services-hero__subtitle {
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.7;
}

/* Services Grid */
.services-section {
  padding: var(--spacing-24) 0;
  background: var(--color-white);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-8);
}

.service-card {
  background: var(--color-gray-50);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  border: 1px solid var(--color-gray-100);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-accent-purple);
}

.service-card__icon {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-6);
}

.service-card__icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.service-card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
}

.service-card__desc {
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-5);
  line-height: 1.6;
}

.service-card__features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-card__features li {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-2);
}

.service-card__features svg {
  color: var(--color-accent-purple);
  flex-shrink: 0;
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
  color: var(--color-accent-purple);
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
  box-shadow: var(--shadow-lg);
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
  color: var(--color-accent-purple);
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-8);
  max-width: 1000px;
  margin: 0 auto;
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

/* CTA */
.services-cta {
  padding: var(--spacing-24) 0;
  background: linear-gradient(135deg, #282E45 0%, #3D4565 50%, #6F7BD4 100%);
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  margin-bottom: var(--spacing-4);
}

.cta-content p {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--spacing-8);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-3);
  background: var(--color-accent-orange);
  color: var(--color-white);
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  text-decoration: none;
  transition: all var(--transition-base);
}

.cta-button:hover {
  background: #e85b32;
  transform: translateX(4px);
  text-decoration: none;
}

.cta-button svg {
  transition: transform var(--transition-base);
}

.cta-button:hover svg {
  transform: translateX(4px);
}
</style>
