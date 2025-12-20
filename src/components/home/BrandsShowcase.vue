<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { getImagePath } from '@/utils/imagePath'

const { locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Brand data with logo paths
const brands = computed(() => [
  { name: 'wildflower', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Wildflower-Logo-wf-02.png') },
  { name: 'CASE·MATE', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/case-mate.png') },
  { name: 'String Ting', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/String Ting.png') },
  { name: 'holdit', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Holdit.png') },
  { name: 'IDEAL OF SWEDEN', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/iDeal of Sweden.png') },
  { name: 'VICXXO', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/vicxxo.png') },
  { name: 'twelvesouth', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/twelvesouth.png') },
  { name: 'SATECHI', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Satechi .png') },
  { name: 'Native Union', logo: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/native union.png') },
  { name: 'notabag', logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/notabag.png') },
  { name: 'URTH', logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/Urth .png') },
  { name: 'SPINGLE', logo: getImagePath('/images/Sweekli 官网介绍 图片素材/4 Brands/2 Bags&Footwear 包袋鞋履/SPINGLE.png') }
])

useIntersectionObserver(
  sectionRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      isVisible.value = true
    }
  },
  { threshold: 0.2 }
)
</script>

<template>
  <section ref="sectionRef" class="brands section">
    <div class="container">
      <h2 class="brands__title" :class="{ 'is-visible': isVisible }">
        <span class="word">{{ locale === 'en' ? 'Our' : '合作' }}</span>
        <span class="word">{{ locale === 'en' ? 'Brands.' : '品牌' }}</span>
      </h2>

      <!-- Brands Marquee -->
      <div class="brands__marquee" :class="{ 'is-visible': isVisible }">
        <div class="brands__track">
          <div 
            v-for="(brand, index) in [...(brands || []), ...(brands || [])]" 
            :key="`${brand.name}-${index}`"
            class="brand-item"
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

      <div class="brands__cta" :class="{ 'is-visible': isVisible }">
        <RouterLink to="/brands" class="brands__link">
          <span>...{{ locale === 'en' ? 'and many more' : '更多品牌' }}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brands {
  background: linear-gradient(180deg, #f0ede6 0%, #f5f3ed 50%, #faf8f3 100%);
  overflow: visible;
  padding: var(--spacing-24) 0;
}

.brands__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.02em;
  margin-bottom: var(--spacing-12);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.brands__title.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.word {
  display: inline-block;
  margin-right: 0.2em;
}

/* Marquee */
.brands__marquee {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-bottom: var(--spacing-12);
  overflow: visible;
  padding: var(--spacing-4) 0;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  opacity: 0;
  transition: opacity 0.8s ease 0.3s;
}

.brands__marquee.is-visible {
  opacity: 1;
}

.brands__track {
  display: flex;
  gap: var(--spacing-10);
  animation: marquee 40s linear infinite;
}

.brands__track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.brand-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  min-width: 160px;
  padding: var(--spacing-4) var(--spacing-6);
  background: var(--color-white);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-gray-100);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.brand-item:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(111, 123, 212, 0.1);
  border-color: var(--color-accent-purple-light);
}

.brand-item img {
  max-height: 100%;
  max-width: 140px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: filter 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.brand-item:hover img {
  filter: grayscale(0%);
  opacity: 1;
}

.brand-item :deep(.brand-name) {
  font-family: var(--font-family-display);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-500);
  white-space: nowrap;
}

/* CTA */
.brands__cta {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s;
}

.brands__cta.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.brands__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  transition: all var(--transition-fast);
}

.brands__link:hover {
  color: var(--color-accent-purple);
  gap: var(--spacing-4);
}

.brands__link svg {
  transition: transform var(--transition-fast);
}

.brands__link:hover svg {
  transform: translateX(4px);
}
</style>
