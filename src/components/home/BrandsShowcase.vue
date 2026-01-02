<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { getImagePath } from '@/utils/imagePath'

const { locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Brand data with logo paths - using new unified size logos
const brands = computed(() => [
  { name: 'brand1', logo: getImagePath('/images/brands-showcase/brand-1-logo.png') },
  { name: 'brand2', logo: getImagePath('/images/brands-showcase/brand-2-logo.png') },
  { name: 'brand3', logo: getImagePath('/images/brands-showcase/brand-3-logo.png') },
  { name: 'brand4', logo: getImagePath('/images/brands-showcase/brand-4-logo.png') },
  { name: 'brand5', logo: getImagePath('/images/brands-showcase/brand-5-logo.png') },
  { name: 'brand6', logo: getImagePath('/images/brands-showcase/brand-6-logo.png') },
  { name: 'brand7', logo: getImagePath('/images/brands-showcase/brand-7-logo.png') },
  { name: 'brand8', logo: getImagePath('/images/brands-showcase/brand-8-logo.png') },
  { name: 'brand9', logo: getImagePath('/images/brands-showcase/brand-9-logo.png') },
  { name: 'brand10', logo: getImagePath('/images/brands-showcase/brand-10-logo.png') },
  { name: 'brand11', logo: getImagePath('/images/brands-showcase/brand-11-logo.png') },
  { name: 'brand12', logo: getImagePath('/images/brands-showcase/brand-12-logo.png') },
  { name: 'brand13', logo: getImagePath('/images/brands-showcase/brand-13-logo.png') },
  { name: 'brand14', logo: getImagePath('/images/brands-showcase/brand-14-logo.png') }
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
  text-align: center;
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
  overflow: hidden;
  padding: 0;
  background: var(--color-white);
  opacity: 0;
  transition: opacity 0.8s ease 0.3s;
}

.brands__marquee.is-visible {
  opacity: 1;
}

.brands__track {
  display: flex;
  gap: var(--spacing-12);
  align-items: center;
  animation: marquee 40s linear infinite;
  padding: 0;
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
  padding: var(--spacing-2) var(--spacing-8);
  background: var(--color-white);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.brand-item:hover {
  transform: translateY(-2px);
}

.brand-item img {
  height: 60px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
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
  text-align: center;
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
