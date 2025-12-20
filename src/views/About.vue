<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const { t, locale } = useI18n()

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

const values = computed(() => [
  {
    icon: '/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-47.png',
    title: t('about.values.integrity'),
    desc: t('about.values.integrityDesc')
  },
  {
    icon: '/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-48.png',
    title: t('about.values.excellence'),
    desc: t('about.values.excellenceDesc')
  },
  {
    icon: '/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-49.png',
    title: t('about.values.partnership'),
    desc: t('about.values.partnershipDesc')
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
  <main class="about-page">
    <!-- Hero Section -->
    <section ref="heroRef" class="about-hero">
      <div class="about-hero__bg">
        <img 
          src="/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC05476.JPG" 
          alt="Sweekli Team" 
          loading="eager"
        />
        <div class="about-hero__overlay"></div>
      </div>
      <div class="container about-hero__content" :class="{ 'is-visible': isHeroVisible }">
        <span class="about-hero__label">{{ locale === 'en' ? 'ABOUT US' : '关于我们' }}</span>
        <h1 class="about-hero__title">{{ t('about.hero.title') }}</h1>
        <p class="about-hero__subtitle">{{ t('about.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="about-section">
      <div class="container">
        <div class="about-grid">
          <div class="about-card">
            <span class="about-card__label">{{ locale === 'en' ? 'OUR MISSION' : '我们的使命' }}</span>
            <h2 class="about-card__title">{{ t('about.mission.title') }}</h2>
            <p class="about-card__content">{{ t('about.mission.content') }}</p>
          </div>
          <div class="about-card__image">
            <img 
              src="/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0056.JPG" 
              alt="Mission"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="about-section about-section--alt">
      <div class="container">
        <div class="about-grid about-grid--reverse">
          <div class="about-card">
            <span class="about-card__label">{{ locale === 'en' ? 'OUR STORY' : '我们的故事' }}</span>
            <h2 class="about-card__title">{{ t('about.story.title') }}</h2>
            <p class="about-card__content">{{ t('about.story.content') }}</p>
          </div>
          <div class="about-card__image">
            <img 
              src="/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0527.JPG" 
              alt="Our Story"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="about-section about-values">
      <div class="container">
        <div class="about-values__header">
          <span class="about-values__label">{{ locale === 'en' ? 'OUR VALUES' : '我们的价值观' }}</span>
          <h2 class="about-values__title">{{ t('about.values.title') }}</h2>
        </div>
        <div class="values-grid">
          <div v-for="(value, index) in values" :key="index" class="value-card">
            <div class="value-card__icon">
              <img :src="value.icon" :alt="value.title" />
            </div>
            <h3 class="value-card__title">{{ value.title }}</h3>
            <p class="value-card__desc">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Gallery -->
    <section class="about-gallery">
      <div class="gallery-track">
        <div class="gallery-item">
          <img src="/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_3760.JPG" alt="Team" loading="lazy" />
        </div>
        <div class="gallery-item">
          <img src="/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4325.JPG" alt="Office" loading="lazy" />
        </div>
        <div class="gallery-item">
          <img src="/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4336.JPG" alt="Culture" loading="lazy" />
        </div>
        <div class="gallery-item">
          <img src="/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC04807.JPG" alt="Work" loading="lazy" />
        </div>
        <!-- Duplicate for seamless loop -->
        <div class="gallery-item">
          <img src="/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_3760.JPG" alt="Team" loading="lazy" />
        </div>
        <div class="gallery-item">
          <img src="/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4325.JPG" alt="Office" loading="lazy" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  padding-top: 0;
}

/* Hero */
.about-hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 80px;
  padding-bottom: var(--spacing-24);
}

@media (max-width: 768px) {
  .about-hero {
    padding-top: 70px;
    padding-bottom: var(--spacing-16);
  }
}

.about-hero__bg {
  position: absolute;
  inset: 0;
}

.about-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(40, 46, 69, 0.9) 0%, rgba(111, 123, 212, 0.7) 100%);
}

.about-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.about-hero__content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.about-hero__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: var(--spacing-4);
}

.about-hero__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  color: var(--color-white);
}

.about-hero__subtitle {
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.7;
}

/* Sections */
.about-section {
  padding: var(--spacing-24) 0;
}

.about-section--alt {
  background: var(--color-gray-50);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-12);
  align-items: center;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .about-grid--reverse {
    direction: rtl;
  }
  
  .about-grid--reverse > * {
    direction: ltr;
  }
}

.about-card__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-purple);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--spacing-3);
}

.about-card__title {
  font-family: var(--font-family-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  color: var(--color-primary);
}

.about-card__content {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  line-height: 1.8;
}

.about-card__image {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.about-card__image img {
  width: 100%;
  height: auto;
  transition: transform var(--transition-slow);
}

.about-card__image:hover img {
  transform: scale(1.05);
}

/* Values */
.about-values {
  background: var(--color-white);
}

.about-values__header {
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.about-values__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-purple);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--spacing-3);
}

.about-values__title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-8);
}

.value-card {
  background: var(--color-gray-50);
  padding: var(--spacing-8);
  border-radius: var(--radius-2xl);
  text-align: center;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.value-card__icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-6);
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-card__icon img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.value-card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
}

.value-card__desc {
  color: var(--color-gray-600);
  line-height: 1.6;
}

/* Gallery */
.about-gallery {
  overflow: hidden;
  padding: var(--spacing-4) 0;
  background: var(--color-gray-50);
}

.gallery-track {
  display: flex;
  gap: var(--spacing-4);
  animation: scroll 40s linear infinite;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.gallery-item {
  flex-shrink: 0;
  width: 400px;
  height: 280px;
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.gallery-item:hover img {
  transform: scale(1.1);
}
</style>
