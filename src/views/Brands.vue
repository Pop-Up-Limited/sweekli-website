<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { getImagePath } from '@/utils/imagePath'
import PageHero from '@/components/common/PageHero.vue'

const { t, locale } = useI18n()

const categories = computed(() => [
  {
    name: t('brandsPage.categories.tech'),
    brands: [
      { name: 'Wildflower', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Wildflower-Logo-wf-02.png') },
      { name: 'Case-Mate', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/case-mate.png') },
      { name: 'Twelve South', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/twelvesouth.png') },
      { name: 'Satechi', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Satechi .png') },
      { name: 'Native Union', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/native union.png') },
      { name: 'iDeal of Sweden', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/iDeal of Sweden.png') },
      { name: 'Holdit', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Holdit.png') },
      { name: 'String Ting', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/String Ting.png') }
    ]
  },
  {
    name: t('brandsPage.categories.bags'),
    brands: [
      { name: 'Notabag', logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/notabag.png') },
      { name: 'Urth', logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/Urth .png') },
      { name: 'Spingle Move', logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/SPINGLE.png') }
    ]
  }
])

</script>

<template>
  <main class="brands-page">
    <!-- Hero -->
    <PageHero
      :label="locale === 'en' ? 'OUR BRANDS' : '合作品牌'"
      :title="t('brandsPage.hero.title')"
      :subtitle="t('brandsPage.hero.subtitle')"
      background-type="image"
      :background-image="'/images/Sweekli 英文 PDF内图片素材/1  Success Stories/Wildflower.png'"
    />

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

import { computed } from 'vue'
import { getImagePath } from '@/utils/imagePath'
import PageHero from '@/components/common/PageHero.vue'

const { t, locale } = useI18n()

const categories = computed(() => [
  {
    name: t('brandsPage.categories.tech'),
    brands: [
      { name: 'Wildflower', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Wildflower-Logo-wf-02.png') },
      { name: 'Case-Mate', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/case-mate.png') },
      { name: 'Twelve South', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/twelvesouth.png') },
      { name: 'Satechi', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Satechi .png') },
      { name: 'Native Union', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/native union.png') },
      { name: 'iDeal of Sweden', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/iDeal of Sweden.png') },
      { name: 'Holdit', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Holdit.png') },
      { name: 'String Ting', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/String Ting.png') }
    ]
  },
  {
    name: t('brandsPage.categories.bags'),
    brands: [
      { name: 'Notabag', logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/notabag.png') },
      { name: 'Urth', logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/Urth .png') },
      { name: 'Spingle Move', logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/SPINGLE.png') }
    ]
  }
])

</script>

<template>
  <main class="brands-page">
    <!-- Hero -->
    <PageHero
      :label="locale === 'en' ? 'OUR BRANDS' : '合作品牌'"
      :title="t('brandsPage.hero.title')"
      :subtitle="t('brandsPage.hero.subtitle')"
      background-type="image"
      :background-image="'/images/Sweekli 英文 PDF内图片素材/1  Success Stories/Wildflower.png'"
    />

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
