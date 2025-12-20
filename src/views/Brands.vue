<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { getImagePath } from '@/utils/imagePath'

const { t } = useI18n()

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

const categories = computed(() => [
  {
    name: t('brandsPage.categories.tech'),
    brands: [
      { name: 'Wildflower', logo: '/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Wildflower-Logo-wf-02.png' },
      { name: 'Case-Mate', logo: '/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/case-mate.png' },
      { name: 'Twelve South', logo: '/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/twelvesouth.png' },
      { name: 'Satechi', logo: '/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Satechi .png' },
      { name: 'Native Union', logo: '/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/native union.png' },
      { name: 'iDeal of Sweden', logo: '/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/iDeal of Sweden.png' },
      { name: 'Holdit', logo: '/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Holdit.png' },
      { name: 'String Ting', logo: '/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/String Ting.png' }
    ]
  },
  {
    name: t('brandsPage.categories.bags'),
    brands: [
      { name: 'Notabag', logo: '/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/notabag.png' },
      { name: 'Urth', logo: '/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/Urth .png' },
      { name: 'Spingle Move', logo: '/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/SPINGLE.png' }
    ]
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
  <main class="brands-page">
    <!-- Hero -->
    <section ref="heroRef" class="brands-hero">
      <div class="brands-hero__bg">
        <img 
          :src="getImagePath('/images/Sweekli 英文 PDF内图片素材/1  Success Stories/Wildflower.png')" 
          alt="Partner Brands"
        />
        <div class="brands-hero__overlay"></div>
      </div>
      <div class="container brands-hero__content" :class="{ 'is-visible': isHeroVisible }">
        <h1 class="brands-hero__title">{{ t('brandsPage.hero.title') }}</h1>
        <p class="brands-hero__subtitle">{{ t('brandsPage.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Brand Categories -->
    <section 
      v-for="(category, catIndex) in categories" 
      :key="catIndex" 
      class="brands-section section"
      :class="{ 'brands-section--alt': catIndex % 2 === 1 }"
    >
      <div class="container">
        <h2 class="brands-section__title">{{ category.name }}</h2>
        <div class="brands-grid">
          <div 
            v-for="(brand, index) in category.brands" 
            :key="index"
            class="brand-card"
          >
            <img 
              :src="brand.logo" 
              :alt="brand.name"
              loading="lazy"
              @error="($event.target as HTMLImageElement).parentElement!.innerHTML = `<span class='brand-name'>${brand.name}</span>`"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.brands-page {
  padding-top: 0;
}

/* Hero */
.brands-hero {
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 80px;
  padding-bottom: var(--spacing-20);
}

.brands-hero__bg {
  position: absolute;
  inset: 0;
}

.brands-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brands-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(40, 46, 69, 0.9) 0%, rgba(111, 123, 212, 0.8) 100%);
}

.brands-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  padding: var(--spacing-8) 0;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

@media (max-width: 768px) {
  .brands-hero {
    padding-top: 70px;
    padding-bottom: var(--spacing-16);
  }
}

.brands-hero__content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.brands-hero__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: var(--color-white);
  margin-bottom: var(--spacing-4);
}

.brands-hero__subtitle {
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
}

/* Sections */
.brands-section {
  background: var(--color-white);
}

.brands-section--alt {
  background: var(--color-gray-50);
}

.brands-section__title {
  font-family: var(--font-family-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  text-align: center;
  margin-bottom: var(--spacing-12);
  color: var(--color-primary);
}

/* Brands Grid */
.brands-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-6);
}

@media (min-width: 640px) {
  .brands-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .brands-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.brand-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-8);
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  min-height: 120px;
  transition: all var(--transition-base);
}

.brand-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.brand-card img {
  max-width: 140px;
  max-height: 60px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all var(--transition-base);
}

.brand-card:hover img {
  filter: grayscale(0%);
  opacity: 1;
}

.brand-card :deep(.brand-name) {
  font-family: var(--font-family-display);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-500);
  text-align: center;
}
</style>
