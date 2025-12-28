<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { getImagePath } from '@/utils/imagePath'
import { useSEO } from '@/utils/seo'
import PageHero from '@/components/common/PageHero.vue'

const { t, locale } = useI18n()

useSEO({
  title: locale.value === 'en' ? 'About Sweekli' : '关于思维颗粒',
  description: locale.value === 'en'
    ? 'We help global lifestyle, fashion and tech brands enter, scale and succeed in the China and APAC market through end-to-end distribution and marketing capabilities.'
    : '我们帮助全球生活方式、时尚和科技品牌通过端到端的分销和营销能力进入、扩展并在中国和亚太市场取得成功。',
  path: '/about'
})

const values = computed(() => {
  if (locale.value === 'en') {
    return [
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-47.png'),
        title: t('about.values.customerCentric.title'),
        desc: t('about.values.customerCentric.desc')
      },
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-48.png'),
        title: t('about.values.inclusive.title'),
        desc: t('about.values.inclusive.desc')
      },
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-49.png'),
        title: t('about.values.integrity.title'),
        desc: t('about.values.integrity.desc')
      },
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-47.png'),
        title: t('about.values.peopleFirst.title'),
        desc: t('about.values.peopleFirst.desc')
      },
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-48.png'),
        title: t('about.values.innovation.title'),
        desc: t('about.values.innovation.desc')
      },
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-49.png'),
        title: t('about.values.partnership.title'),
        desc: t('about.values.partnership.desc')
      }
    ]
  } else {
    return [
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-47.png'),
        title: t('about.values.customerCentric.title'),
        desc: t('about.values.customerCentric.desc')
      },
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-48.png'),
        title: t('about.values.inclusive.title'),
        desc: t('about.values.inclusive.desc')
      },
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-49.png'),
        title: t('about.values.integrity.title'),
        desc: t('about.values.integrity.desc')
      },
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-47.png'),
        title: t('about.values.peopleFirst.title'),
        desc: t('about.values.peopleFirst.desc')
      },
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-48.png'),
        title: t('about.values.innovation.title'),
        desc: t('about.values.innovation.desc')
      },
      {
        icon: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Values icon/icon 2-49.png'),
        title: t('about.values.partnership.title'),
        desc: t('about.values.partnership.desc')
      }
    ]
  }
})

const stats = computed(() => {
  if (locale.value === 'en') {
    return [
      { value: '10+', label: 'E-commerce Flagship Stores' },
      { value: '5', label: 'Office Locations' },
      { value: '500+', label: 'Retail Outlets Covered' },
      { value: '50+', label: 'Team Size' },
      { value: '35%', label: '5-Year CARG' },
      { value: '30+', label: 'International Brands Operated' }
    ]
  } else {
    return [
      { value: '10+', label: '电商平台旗舰店' },
      { value: '5', label: '办公地点' },
      { value: '500+', label: '线下覆盖门店' },
      { value: '50+', label: '团队规模' },
      { value: '35%', label: '公司近5年年均增长' },
      { value: '30+', label: '运营国际品牌' }
    ]
  }
})

</script>

<template>
  <main class="about-page">
    <!-- Hero Section -->
    <PageHero
      :label="locale === 'en' ? 'ABOUT US' : '关于我们'"
      :title="t('about.hero.title')"
      :subtitle="t('about.hero.subtitle')"
      background-type="image"
      :background-image="'/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC05476.JPG'"
    />

    <!-- Stats Section -->
    <section class="about-stats">
      <div class="container">
        <div class="about-stats__grid">
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="about-stat-item"
          >
            <span class="about-stat-item__value">{{ stat.value }}</span>
            <span class="about-stat-item__label">{{ stat.label }}</span>
          </div>
        </div>
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
              :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0056.JPG')" 
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
              :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0527.JPG')" 
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

    <!-- Where We Work Section -->
    <section class="about-section about-where-we-work">
      <div class="container">
        <div class="about-where-we-work__header">
          <span class="about-where-we-work__label">{{ t('about.whereWeWork.title') }}</span>
        </div>
        <div class="about-where-we-work__grid">
          <div 
            v-for="(location, index) in (locale === 'en' ? ['Shenzhen', 'Shanghai', 'Hong Kong', 'Taipei', 'Seoul'] : ['深圳', '上海', '香港', '台北', '首尔'])"
            :key="index"
            class="location-card"
          >
            <div class="location-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <span class="location-card__name">{{ location }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Gallery -->
    <section class="about-gallery">
      <div class="gallery-track">
        <div class="gallery-item">
          <img :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_3760.JPG')" alt="Team" loading="lazy" />
        </div>
        <div class="gallery-item">
          <img :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4325.JPG')" alt="Office" loading="lazy" />
        </div>
        <div class="gallery-item">
          <img :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4336.JPG')" alt="Culture" loading="lazy" />
        </div>
        <div class="gallery-item">
          <img :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC04807.JPG')" alt="Work" loading="lazy" />
        </div>
        <!-- Duplicate for seamless loop -->
        <div class="gallery-item">
          <img :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_3760.JPG')" alt="Team" loading="lazy" />
        </div>
        <div class="gallery-item">
          <img :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4325.JPG')" alt="Office" loading="lazy" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  padding-top: 0;
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

@media (min-width: 1200px) {
  .values-grid {
    grid-template-columns: repeat(3, 1fr);
  }
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

/* Stats Section */
.about-stats {
  background: var(--color-gray-50);
  padding: var(--spacing-16) 0;
}

.about-stats__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-8);
}

@media (min-width: 768px) {
  .about-stats__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .about-stats__grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

.about-stat-item {
  text-align: center;
  padding: var(--spacing-6);
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.about-stat-item__value {
  display: block;
  font-family: var(--font-family-display);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-purple);
  margin-bottom: var(--spacing-2);
}

.about-stat-item__label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.4;
}

/* Where We Work */
.about-where-we-work {
  background: var(--color-white);
}

.about-where-we-work__header {
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.about-where-we-work__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-purple);
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.about-where-we-work__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-6);
  max-width: 800px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .about-where-we-work__grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.location-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
  background: var(--color-gray-50);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
}

.location-card:hover {
  background: var(--color-accent-purple);
  color: var(--color-white);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.location-card__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-purple);
  transition: color var(--transition-fast);
}

.location-card:hover .location-card__icon {
  color: var(--color-white);
}

.location-card__name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  transition: color var(--transition-fast);
}

.location-card:hover .location-card__name {
  color: var(--color-white);
}
</style>
