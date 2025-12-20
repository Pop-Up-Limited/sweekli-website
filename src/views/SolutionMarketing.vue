<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import CTASection from '@/components/home/CTASection.vue'
import { getImagePath } from '@/utils/imagePath'

const { t, locale } = useI18n()

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

const capabilities = computed(() => [
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/2 Our Marketing Capabilities/6_01.jpg'),
    title: locale.value === 'en' ? 'KOL & Influencer Marketing' : 'KOL与网红营销',
    desc: locale.value === 'en' 
      ? 'Strategic partnerships with top influencers and KOLs across platforms.'
      : '与各平台顶级影响者和KOL的战略合作。'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/2 Our Marketing Capabilities/6_02.jpg'),
    title: locale.value === 'en' ? 'Social Media Management' : '社交媒体管理',
    desc: locale.value === 'en'
      ? 'Comprehensive social media strategy and content creation.'
      : '全面的社交媒体策略和内容创作。'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/2 Our Marketing Capabilities/6_03.jpg'),
    title: locale.value === 'en' ? 'Livestream Commerce' : '直播电商',
    desc: locale.value === 'en'
      ? 'Engaging livestream shopping experiences that drive sales.'
      : '吸引人的直播购物体验，推动销售增长。'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/2 Our Marketing Capabilities/6_04.jpg'),
    title: locale.value === 'en' ? 'Brand Events' : '品牌活动',
    desc: locale.value === 'en'
      ? 'Pop-up stores, exhibitions, and experiential marketing events.'
      : '快闪店、展览和体验式营销活动。'
  }
])

const works = computed(() => [
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/博主推荐-1.jpg'),
    title: locale.value === 'en' ? 'Influencer Campaigns' : '网红推广'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/4 快闪.jpg'),
    title: locale.value === 'en' ? 'Pop-up Events' : '快闪活动'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/4 展会 3.jpg'),
    title: locale.value === 'en' ? 'Exhibitions' : '展会活动'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/明星-01.jpg'),
    title: locale.value === 'en' ? 'Celebrity Partnerships' : '明星合作'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/微博-小红书-得物.jpg'),
    title: locale.value === 'en' ? 'Social Media Content' : '社交媒体内容'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/新闻报道 0.jpg'),
    title: locale.value === 'en' ? 'Press Coverage' : '媒体报道'
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
          :src="getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/PC.jpg')" 
          alt="Marketing"
          loading="eager"
        />
        <div class="solution-hero__overlay"></div>
      </div>
      <div class="container solution-hero__content" :class="{ 'is-visible': isHeroVisible }">
        <span class="solution-hero__label">{{ locale === 'en' ? 'SOLUTION' : '解决方案' }}</span>
        <h1 class="solution-hero__title">{{ t('solutions.marketing.hero.title') }}</h1>
        <p class="solution-hero__subtitle">{{ t('solutions.marketing.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="solution-section">
      <div class="container">
        <div class="solution-header">
          <span class="solution-label">{{ locale === 'en' ? 'OUR CAPABILITIES' : '我们的能力' }}</span>
          <h2 class="solution-title">{{ t('solutions.marketing.capabilities.title') }}</h2>
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
          <h2 class="solution-title">{{ t('solutions.marketing.works.title') }}</h2>
          <p class="solution-subtitle">{{ t('solutions.marketing.works.subtitle') }}</p>
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

@media (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
  }
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


import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import CTASection from '@/components/home/CTASection.vue'
import { getImagePath } from '@/utils/imagePath'

const { t, locale } = useI18n()

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

const capabilities = computed(() => [
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/2 Our Marketing Capabilities/6_01.jpg'),
    title: locale.value === 'en' ? 'KOL & Influencer Marketing' : 'KOL与网红营销',
    desc: locale.value === 'en' 
      ? 'Strategic partnerships with top influencers and KOLs across platforms.'
      : '与各平台顶级影响者和KOL的战略合作。'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/2 Our Marketing Capabilities/6_02.jpg'),
    title: locale.value === 'en' ? 'Social Media Management' : '社交媒体管理',
    desc: locale.value === 'en'
      ? 'Comprehensive social media strategy and content creation.'
      : '全面的社交媒体策略和内容创作。'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/2 Our Marketing Capabilities/6_03.jpg'),
    title: locale.value === 'en' ? 'Livestream Commerce' : '直播电商',
    desc: locale.value === 'en'
      ? 'Engaging livestream shopping experiences that drive sales.'
      : '吸引人的直播购物体验，推动销售增长。'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/2 Our Marketing Capabilities/6_04.jpg'),
    title: locale.value === 'en' ? 'Brand Events' : '品牌活动',
    desc: locale.value === 'en'
      ? 'Pop-up stores, exhibitions, and experiential marketing events.'
      : '快闪店、展览和体验式营销活动。'
  }
])

const works = computed(() => [
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/博主推荐-1.jpg'),
    title: locale.value === 'en' ? 'Influencer Campaigns' : '网红推广'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/4 快闪.jpg'),
    title: locale.value === 'en' ? 'Pop-up Events' : '快闪活动'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/4 展会 3.jpg'),
    title: locale.value === 'en' ? 'Exhibitions' : '展会活动'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/明星-01.jpg'),
    title: locale.value === 'en' ? 'Celebrity Partnerships' : '明星合作'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/微博-小红书-得物.jpg'),
    title: locale.value === 'en' ? 'Social Media Content' : '社交媒体内容'
  },
  {
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/3 Our Works/新闻报道 0.jpg'),
    title: locale.value === 'en' ? 'Press Coverage' : '媒体报道'
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
          :src="getImagePath('/images/Sweekli 官网介绍 图片素材/4 Solutions/3 Marketing/PC.jpg')" 
          alt="Marketing"
          loading="eager"
        />
        <div class="solution-hero__overlay"></div>
      </div>
      <div class="container solution-hero__content" :class="{ 'is-visible': isHeroVisible }">
        <span class="solution-hero__label">{{ locale === 'en' ? 'SOLUTION' : '解决方案' }}</span>
        <h1 class="solution-hero__title">{{ t('solutions.marketing.hero.title') }}</h1>
        <p class="solution-hero__subtitle">{{ t('solutions.marketing.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="solution-section">
      <div class="container">
        <div class="solution-header">
          <span class="solution-label">{{ locale === 'en' ? 'OUR CAPABILITIES' : '我们的能力' }}</span>
          <h2 class="solution-title">{{ t('solutions.marketing.capabilities.title') }}</h2>
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
          <h2 class="solution-title">{{ t('solutions.marketing.works.title') }}</h2>
          <p class="solution-subtitle">{{ t('solutions.marketing.works.subtitle') }}</p>
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

@media (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
  }
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

