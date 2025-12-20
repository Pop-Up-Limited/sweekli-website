<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const { t, locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Parallax effect for images
const imageRefs = ref<(HTMLElement | null)[]>([])

const handleScroll = () => {
  imageRefs.value.forEach((img, index) => {
    if (!img) return
    const rect = img.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)))
    const translateY = (scrollProgress - 0.5) * 30 * (index % 2 === 0 ? 1 : -1)
    img.style.transform = `translateY(${translateY}px)`
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const steps = computed(() => [
  {
    num: '01',
    title: locale.value === 'en' ? 'We Pick Each Other.' : '双向选择',
    desc: locale.value === 'en' 
      ? "We don't work with just anyone. You're a strong global brand. We're your perfect China partner. If we're a fit — we move."
      : '我们只与具有明确竞争优势的品牌合作。当愿景一致时，我们建立战略合作伙伴关系。',
    image: '/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-1_01.jpg'
  },
  {
    num: '02',
    title: locale.value === 'en' ? 'We Buy Your Products.' : '采购库存',
    desc: locale.value === 'en'
      ? 'You ship us inventory at wholesale. That\'s it. No setup. No team. No risk on your side.'
      : '您只需以批发价向我们供货。无需设置团队，无需承担风险。',
    image: '/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-12_02.jpg'
  },
  {
    num: '03',
    title: locale.value === 'en' ? 'We Run the Business.' : '全面运营',
    desc: locale.value === 'en'
      ? 'We launch, price, promote, and manage your entire online presence across multiple platforms.'
      : '我们负责上市、定价、推广，并在多个平台管理您的整个线上业务。',
    image: '/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-12_03.jpg'
  },
  {
    num: '04',
    title: locale.value === 'en' ? 'You Get Profits and Peace of Mind.' : '收获利润与安心',
    desc: locale.value === 'en'
      ? 'We grow your brand, protect your equity, and send you the results — without you lifting a finger in-market.'
      : '我们发展您的品牌，保护您的权益，并向您交付成果——您无需在市场上操心任何事。',
    image: '/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC05476.JPG'
  }
])

useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true
    }
  },
  { threshold: 0.1 }
)
</script>

<template>
  <section ref="sectionRef" class="how-it-works section">
    <div class="container">
      <h2 class="section-title" :class="{ 'is-visible': isVisible }">
        <span v-if="locale === 'en'" class="title-content">
          <span class="word">How</span>
          <span class="word">It</span>
          <span class="word">Works</span>
          <span class="word">—</span>
          <span class="word-group">
            <span class="word">Simple</span>
            <span class="word">as</span>
          </span>
          <span class="word-group accent">
            <span class="word">1,</span>
            <span class="word">2,</span>
            <span class="word">3,</span>
            <span class="word">4</span>
          </span>
        </span>
        <span v-else class="title-content">
          <span class="word">合作流程</span>
          <span class="word">—</span>
          <span class="word accent">简单四步</span>
        </span>
      </h2>

      <div class="steps" :class="{ 'is-visible': isVisible }">
        <div 
          v-for="(step, index) in steps" 
          :key="index" 
          class="step"
          :style="{ '--index': index }"
        >
          <span class="step__number">{{ step.num }}</span>
          <div class="step__content">
            <div class="step__image">
              <img 
                :ref="el => imageRefs[index] = el as HTMLElement"
                :src="step.image" 
                :alt="step.title" 
                loading="lazy"
                class="parallax-image"
              />
            </div>
            <div class="step__text">
              <h3 class="step__title">{{ step.title }}</h3>
              <p class="step__desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-it-works {
  position: relative;
  background: #faf8f3;
  padding: var(--spacing-24) 0;
}

.section-title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-semibold);
  text-align: center;
  margin-bottom: var(--spacing-16);
  letter-spacing: -0.02em;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.section-title.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.title-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.15em;
}

.word {
  display: inline-block;
}

.word-group {
  display: inline-flex;
  gap: 0.15em;
}

.accent {
  color: var(--color-accent-purple);
}

/* Steps Grid */
.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);
  align-items: stretch;
}

@media (min-width: 768px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .steps {
    grid-template-columns: repeat(4, 1fr);
  }
}

.step {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--index) * 0.1s + 0.2s);
  display: flex;
  flex-direction: column;
}

.steps.is-visible .step {
  opacity: 1;
  transform: translateY(0);
}

.step__number {
  display: block;
  font-family: var(--font-family-display);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-purple);
  margin-bottom: var(--spacing-6);
  letter-spacing: -0.02em;
  line-height: 1;
}

.step__content {
  background: var(--color-white);
  border-radius: var(--radius-3xl);
  overflow: hidden;
  border: 1px solid var(--color-gray-100);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

.step:hover .step__content {
  transform: translateY(-8px);
  border-color: var(--color-accent-purple-light);
}

.step__image {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  position: relative;
}

.step__image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(111, 123, 212, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.step:hover .step__image::after {
  opacity: 1;
}

.step__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.step:hover .step__image img {
  transform: scale(1.08);
}

.step__text {
  padding: var(--spacing-8);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.step__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.step__desc {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  line-height: 1.75;
  margin: 0;
  flex: 1;
}
</style>
