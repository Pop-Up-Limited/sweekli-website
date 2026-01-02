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
        logo: getImagePath('/images/brands-showcase/brand-1-logo.png'),
        image: getImagePath('/images/brands-showcase/1-wildflower.png')
      },
      { 
        name: 'Case-Mate', 
        logo: getImagePath('/images/brands-showcase/brand-2-logo.png'),
        image: getImagePath('/images/brands-showcase/2-case-mate.png')
      },
      { 
        name: 'String Ting', 
        logo: getImagePath('/images/brands-showcase/brand-3-logo.png'),
        image: getImagePath('/images/brands-showcase/3-string-ting.png')
      },
      { 
        name: 'Holdit', 
        logo: getImagePath('/images/brands-showcase/brand-4-logo.png'),
        image: getImagePath('/images/brands-showcase/4-holdit.png')
      },
      { 
        name: 'iDeal of Sweden', 
        logo: getImagePath('/images/brands-showcase/brand-5-logo.png'),
        image: getImagePath('/images/brands-showcase/5-ideal-of-sweden.png')
      },
      { 
        name: 'Native Union', 
        logo: getImagePath('/images/brands-showcase/brand-7-logo.png'),
        image: getImagePath('/images/brands-showcase/7-native-union.png')
      },
      { 
        name: 'Satechi', 
        logo: getImagePath('/images/brands-showcase/brand-8-logo.png'),
        image: getImagePath('/images/brands-showcase/8-satechi.png')
      },
      { 
        name: 'Twelve South', 
        logo: getImagePath('/images/brands-showcase/brand-9-logo.png'),
        image: getImagePath('/images/brands-showcase/9-twelve-south.png')
      }
    ]
  },
  {
    name: t('brandsPage.categories.bags'),
    brands: [
      { 
        name: 'Notabag', 
        logo: getImagePath('/images/brands-showcase/brand-10-logo.png'),
        image: getImagePath('/images/brands-showcase/10-notabag.png')
      },
      { 
        name: 'Urth', 
        logo: getImagePath('/images/brands-showcase/brand-11-logo.png'),
        image: getImagePath('/images/brands-showcase/11-urth.png')
      },
      { 
        name: 'Spingle Move', 
        logo: getImagePath('/images/brands-showcase/brand-12-logo.png'),
        image: getImagePath('/images/brands-showcase/12-spingle.png')
      }
    ]
  },
  {
    name: t('brandsPage.categories.gift'),
    brands: [
      { 
        name: 'suckUK', 
        logo: getImagePath('/images/brands-showcase/brand-13-logo.png'),
        image: getImagePath('/images/brands-showcase/13-suckuk.png')
      },
      { 
        name: 'OTOTO', 
        logo: getImagePath('/images/brands-showcase/brand-14-logo.png'),
        image: getImagePath('/images/brands-showcase/14-ototo.png')
      },
      { 
        name: 'Fressko', 
        logo: getImagePath('/images/brands-showcase/brand-15-logo.png'),
        image: getImagePath('/images/brands-showcase/15-fressko.png')
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
      :background-image="'/images/brands-hero-2.jpg'"
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

.brands-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-6);
}

/* Brands Grid */


.brand-card {
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
  max-width: 280px;
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
  transition: transform var(--transition-slow);
}

.brand-card:hover .brand-card__image img {
  transform: scale(1.1);
}

.brand-card__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  min-height: 60px;
  background: transparent;
}

.brand-card__logo img {
  max-width: 100%;
  max-height: 70px;
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
