<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const { locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Animated counter logic
const animatedValues = ref<number[]>([0, 0, 0, 0])
let animationStarted = false

const stats = computed(() => {
  if (locale.value === 'en') {
    return [
      { 
        value: 30, 
        suffix: '+',
        label: 'Partner Brands'
      },
      { 
        value: 50, 
        suffix: '+',
        label: 'Multinational Professionals'
      },
      { 
        value: 35, 
        suffix: '%',
        label: '5-YEAR CARG'
      },
      { 
        value: 10, 
        suffix: '',
        label: 'Years of Experience'
      }
    ]
  } else {
    return [
      { 
        value: 30, 
        suffix: '+',
        label: '运营国际品牌'
      },
      { 
        value: 50, 
        suffix: '+',
        label: '团队规模'
      },
      { 
        value: 10, 
        suffix: '+',
        label: '电商平台旗舰店'
      },
      { 
        value: 500, 
        suffix: '+',
        label: '线下覆盖门店'
      }
    ]
  }
})

const animateCounters = () => {
  // 重置动画状态
  animationStarted = false
  animatedValues.value = [0, 0, 0, 0]
  
  const duration = 2000
  const startTime = performance.now()

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    // 使用当前locale的stats值
    const currentStats = stats.value
    animatedValues.value = currentStats.map((stat) => {
      if (stat.suffix === '%') {
        return Math.floor(stat.value * easeOutQuart)
      }
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
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting && !isVisible.value) {
      isVisible.value = true
      animateCounters()
    }
  },
  { threshold: 0.3 }
)

// 监听locale变化，立即更新数值并重新动画
watch(() => locale.value, () => {
  // 立即更新为当前语言对应的最终值
  const currentStats = stats.value
  animatedValues.value = currentStats.map((stat) => stat.value)
  
  // 如果section可见，重新动画
  if (isVisible.value) {
    // 重置动画状态
    animationStarted = false
    // 从当前值开始动画到最终值
    animateCounters()
  }
})
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
  background: linear-gradient(90deg, #5867ac 0%, #8a88e4 100%);
  padding: var(--spacing-24) 0;
  position: relative;
  overflow: hidden;
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
  color: #ffebec;
  line-height: 1;
  margin-bottom: var(--spacing-3);
  letter-spacing: -0.03em;
}

.stat-item__label {
  display: block;
  font-size: var(--font-size-base);
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: var(--font-weight-medium);
}
</style>
