<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { getImagePath } from '@/utils/imagePath'
import { useSEO } from '@/utils/seo'
import PageHero from '@/components/common/PageHero.vue'

const { t, locale } = useI18n()

useSEO({
  title: locale.value === 'en' ? 'Partner Brands' : '合作品牌',
  description: locale.value === 'en'
    ? 'We work with leading global brands across multiple categories including tech accessories, bags & footwear, and gift & lifestyle.'
    : '我们与多个领域的全球领先品牌合作，包括数码配件、包袋鞋履、礼品与生活方式等。',
  path: '/brands'
})

const categories = computed(() => [
  {
    name: t('brandsPage.categories.tech'),
    brands: [
      { 
        name: 'Wildflower', 
        logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Wildflower-Logo-wf-02.png'),
        image: getImagePath('/images/Sweekli 英文 PDF内图片素材/1  Success Stories/Wildflower.png')
      },
      { 
        name: 'Case-Mate', 
        logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/case-mate.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/case-mate 1.png')
      },
      { 
        name: 'Twelve South', 
        logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/twelvesouth.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/twelvesouth 1.png')
      },
      { 
        name: 'Satechi', 
        logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Satechi .png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Satechi  1.png')
      },
      { 
        name: 'Native Union', 
        logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/native union.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Native Union 1.png')
      },
      { 
        name: 'iDeal of Sweden', 
        logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/iDeal of Sweden.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Ideal of Sweden 1.png')
      },
      { 
        name: 'Holdit', 
        logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Holdit.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Holdit 1.png')
      },
      { 
        name: 'String Ting', 
        logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/String Ting.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/String Ting 1.png')
      }
    ]
  },
  {
    name: t('brandsPage.categories.bags'),
    brands: [
      { 
        name: 'Notabag', 
        logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/notabag.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/2 Bags&Footwear 包袋鞋履/notabag1.png')
      },
      { 
        name: 'Urth', 
        logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/Urth .png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/2 Bags&Footwear 包袋鞋履/Urth 1.png')
      },
      { 
        name: 'Spingle Move', 
        logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/SPINGLE.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/2 Bags&Footwear 包袋鞋履/SPINGLE1.png')
      }
    ]
  },
  {
    name: t('brandsPage.categories.gift'),
    brands: [
      { 
        name: 'suckUK', 
        logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/3 Gift&Lifestyle/suckUK.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/3 Gift&Lifestyle 家居生活/suck uk 1.png')
      },
      { 
        name: 'OTOTO', 
        logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/3 Gift&Lifestyle/OTOTO.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/3 Gift&Lifestyle 家居生活/OTOTO 1.png')
      },
      { 
        name: 'Fressko', 
        logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/3 Gift&Lifestyle/Fressko.png'),
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/3 Gift&Lifestyle 家居生活/Fressko 1.png')
      }
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
            <div class="brand-card__image">
              <img 
                :src="brand.image || brand.logo" 
                :alt="brand.name"
                loading="lazy"
              />
            </div>
            <div class="brand-card__logo">
              <img 
                :src="brand.logo" 
                :alt="brand.name"
                loading="lazy"
                @error="($event.target as HTMLImageElement).parentElement!.innerHTML = `<span class='brand-name'>${brand.name}</span>`"
              />
            </div>
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

/* Adjust logo sizes for specific brands */
/* Native Union logo - 250x80 ratio (3.125:1) */
.brand-card:nth-child(5) .brand-card__logo img {
  max-width: 250px;
  max-height: 80px;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* Responsive adjustments for Native Union logo */
@media (max-width: 639px) {
  .brand-card:nth-child(5) .brand-card__logo img {
    max-width: 180px;
    max-height: 58px;
  }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .brand-card:nth-child(5) .brand-card__logo img {
    max-width: 200px;
    max-height: 64px;
  }
}

@media (min-width: 1024px) {
  .brand-card:nth-child(5) .brand-card__logo img {
    max-width: 250px;
    max-height: 80px;
  }
}

.brand-card:nth-child(7) .brand-card__logo img,
.brand-card:nth-child(8) .brand-card__logo img {
  max-width: 100px;
  max-height: 45px;
}

.brand-card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--transition-base);
}

.brand-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.brand-card__image {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--color-gray-50);
}

.brand-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top; /* 裁剪图片，只显示上半部分，避免显示图片下半部分的logo */
  transition: transform var(--transition-slow);
}

.brand-card:hover .brand-card__image img {
  transform: scale(1.1);
}

.brand-card__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-6);
  min-height: 80px;
}

.brand-card__logo img {
  max-width: 120px;
  max-height: 50px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all var(--transition-base);
}

.brand-card:hover .brand-card__logo img {
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
