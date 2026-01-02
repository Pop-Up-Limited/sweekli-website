<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { getImagePath } from '@/utils/imagePath'

const { t, locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const activeIndex = ref(0)

const stories = computed(() => [
  {
    brand: 'Wildflower',
    quote: locale.value === 'en' 
      ? '"Sweekli transformed our China presence. In just 18 months, they took us from zero to a recognized brand."'
      : '"Sweekli改变了我们在中国的存在。仅用18个月，他们就将我们从零打造成知名品牌。"',
    result: locale.value === 'en' ? '300% YoY Growth' : '同比增长300%',
    image: getImagePath('/images/Sweekli 中文 PDF内图片素材/2 合作品牌/1 Tech Accessories 数码配件/Wildflower-Logo-wf-02.png'),
    productImage: getImagePath('/images/Sweekli 英文 PDF内图片素材/1  Success Stories/Wildflower.png')
  },
  {
    brand: 'Case-Mate',
    quote: locale.value === 'en'
      ? '"Their platform expertise and market insights have been invaluable for our expansion into China."'
      : '"他们的平台专业知识和市场洞察力对我们进入中国至关重要。"',
    result: locale.value === 'en' ? 'Top 10 on Tmall' : '天猫前10名',
    image: getImagePath('/images/success-stories/case-mate-logo.png'),
    productImage: getImagePath('/images/success-stories/case-mate.jpg')
  },
  {
    brand: 'Native Union',
    quote: locale.value === 'en'
      ? '"The team at Sweekli truly understands both Western brands and Chinese consumers."'
      : '"Sweekli团队真正理解西方品牌和中国消费者。"',
    result: locale.value === 'en' ? '150% Revenue Increase' : '收入增长150%',
    image: getImagePath('/images/success-stories/native-union-logo.png'),
    productImage: getImagePath('/images/success-stories/native-union.jpg')
  }
])

const nextStory = () => {
  activeIndex.value = (activeIndex.value + 1) % stories.value.length
}

const prevStory = () => {
  activeIndex.value = (activeIndex.value - 1 + stories.value.length) % stories.value.length
}

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
  <section ref="sectionRef" class="success-stories section">
    <div class="container">
      <h2 class="success-stories__title" :class="{ 'is-visible': isVisible }">
        <span class="word">{{ locale === 'en' ? 'Success' : '成功' }}</span>
        <span class="word accent">{{ locale === 'en' ? 'Stories.' : '案例' }}</span>
      </h2>

      <div class="carousel" :class="{ 'is-visible': isVisible }">
        <div class="carousel__track">
          <TransitionGroup name="slide">
            <div 
              v-for="(story, index) in stories" 
              :key="story.brand"
              v-show="index === activeIndex"
              class="story-card"
            >
              <div class="story-card__image">
                <img :src="story.productImage" :alt="story.brand" loading="lazy" />
              </div>
              <div class="story-card__content">
                <img :src="story.image" :alt="story.brand" class="story-card__logo" />
                <blockquote class="story-card__quote">{{ story.quote }}</blockquote>
                <div class="story-card__result">
                  <span class="label">{{ locale === 'en' ? 'Result' : '成果' }}</span>
                  <span class="value">{{ story.result }}</span>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <div class="carousel__controls">
          <button class="carousel__btn carousel__btn--prev" @click="prevStory" aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div class="carousel__dots">
            <button 
              v-for="(_, index) in stories" 
              :key="index"
              class="carousel__dot"
              :class="{ 'is-active': index === activeIndex }"
              @click="activeIndex = index"
              :aria-label="`Story ${index + 1}`"
            ></button>
          </div>
          <button class="carousel__btn carousel__btn--next" @click="nextStory" aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.success-stories {
  background: linear-gradient(180deg, #f0ede6 0%, #f5f3ed 50%, #faf8f3 100%);
}

.success-stories__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: var(--font-weight-semibold);
  text-align: center;
  margin-bottom: var(--spacing-12);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.success-stories__title.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.word {
  display: inline-block;
  margin-right: 0.2em;
}

.accent {
  color: var(--color-accent-purple);
}

/* Carousel */
.carousel {
  max-width: 1000px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
}

.carousel.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.carousel__track {
  position: relative;
  min-height: 400px;
}

.story-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  background: var(--color-white);
  border-radius: var(--radius-3xl);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--color-gray-100);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.story-card:hover {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(111, 123, 212, 0.15);
  transform: translateY(-4px) scale(1.01);
}

.story-card__image {
  overflow: hidden;
}

.story-card__image img {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.story-card:hover .story-card__image img {
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .story-card {
    grid-template-columns: 1fr 1fr;
  }
}

.story-card__image {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.story-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-card__content {
  padding: var(--spacing-12);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.story-card__logo {
  max-width: 220px;
  max-height: 80px;
  object-fit: contain;
  margin-bottom: var(--spacing-6);
  filter: grayscale(100%);
}

.story-card__quote {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  font-style: italic;
  color: var(--color-primary);
  line-height: 1.5;
  margin: 0 0 var(--spacing-8);
}

.story-card__result {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.story-card__result .label {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-gray-500);
}

.story-card__result .value {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-purple);
}

/* Controls */
.carousel__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-6);
  margin-top: var(--spacing-8);
}

.carousel__btn {
  width: 48px;
  height: 48px;
  border: 2px solid var(--color-gray-200);
  border-radius: 50%;
  background: var(--color-white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  color: var(--color-primary);
}

.carousel__btn:hover {
  border-color: var(--color-accent-purple);
  color: var(--color-accent-purple);
}

.carousel__dots {
  display: flex;
  gap: var(--spacing-2);
}

.carousel__dot {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: var(--color-gray-200);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.carousel__dot.is-active {
  background: var(--color-accent-purple);
  transform: scale(1.2);
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-leave-active {
  position: absolute;
  width: 100%;
}
</style>
