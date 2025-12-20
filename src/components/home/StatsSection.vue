<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const { t, locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Animated counter logic
const animatedValues = ref<number[]>([0, 0, 0, 0])

const stats = computed(() => [
  { 
    value: 50, 
    suffix: '+',
    label: locale.value === 'en' ? 'Partner Brands' : '合作品牌'
  },
  { 
    value: 10, 
    suffix: '+',
    label: locale.value === 'en' ? 'Countries Served' : '服务国家'
  },
  { 
    value: 500, 
    suffix: 'M+',
    label: locale.value === 'en' ? 'GMV Reached' : '累计GMV'
  },
  { 
    value: 7, 
    suffix: '',
    label: locale.value === 'en' ? 'Years of Experience' : '年行业经验'
  }
])

const animateCounters = () => {
  const duration = 2000
  const startTime = performance.now()

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    animatedValues.value = stats.value.map((stat, i) => {
      return Math.floor(stat.value * easeOutQuart)
    })
    
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }
  
  requestAnimationFrame(step)
}

useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !isVisible.value) {
      isVisible.value = true
      animateCounters()
    }
  },
  { threshold: 0.3 }
)
</script>

<template>
  <section ref="sectionRef" class="stats">
    <div class="container stats__container">
      <div class="stats__grid" :class="{ 'is-visible': isVisible }">
        <div 
          v-for="(stat, index) in stats" 
          :key="index" 
          class="stat-item"
          :style="{ '--index': index }"
        >
          <span class="stat-item__value">
            {{ animatedValues[index] }}{{ stat.suffix }}
          </span>
          <span class="stat-item__label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  background: linear-gradient(180deg, #faf8f3 0%, #f5f3ed 50%, #f0ede6 100%);
  padding: var(--spacing-24) 0;
  position: relative;
  overflow: hidden;
}

.stats::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(111, 123, 212, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(249, 194, 110, 0.06) 0%, transparent 50%);
  pointer-events: none;
}

.stats__container {
  position: relative;
  z-index: 1;
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-10);
}

@media (min-width: 768px) {
  .stats__grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-8);
  }
}

.stat-item {
  text-align: center;
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
              transform 1s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--index) * 0.15s);
}

.stats__grid.is-visible .stat-item {
  opacity: 1;
  transform: translateY(0);
}

.stat-item__value {
  display: block;
  font-family: var(--font-family-display);
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: var(--spacing-3);
  letter-spacing: -0.03em;
}

.stat-item__label {
  display: block;
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: var(--font-weight-medium);
}
</style>
