<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { getImagePath } from '@/utils/imagePath'

const { t, locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const reasons = computed(() => [
  {
    title: locale.value === 'en' ? 'World\'s Largest Consumer Market' : '全球最大消费市场',
    desc: locale.value === 'en' 
      ? 'China has over 1.4 billion consumers with a rapidly growing middle class eager for quality international products.'
      : '中国拥有超过14亿消费者，中产阶级快速增长，对优质国际产品需求旺盛。',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/icon-01.png')
  },
  {
    title: locale.value === 'en' ? 'Unique E-commerce Ecosystem' : '独特电商生态',
    desc: locale.value === 'en'
      ? 'Navigate complex platforms like Tmall, JD, Douyin, and WeChat with our platform expertise and established relationships.'
      : '凭借我们的平台专业知识和建立的关系，驾驭天猫、京东、抖音、微信等复杂平台。',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/icon-02.png')
  },
  {
    title: locale.value === 'en' ? 'Cultural & Regulatory Complexity' : '文化与法规复杂性',
    desc: locale.value === 'en'
      ? 'We handle cross-border compliance, localization, and cultural adaptation — all the things that trip up brands going solo.'
      : '我们处理跨境合规、本地化和文化适应——这些都是品牌独自进入时会遇到的问题。',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/icon-03.png')
  }
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
  <section ref="sectionRef" class="why-china section">
    <div class="container">
      <div class="why-china__grid">
        <div class="why-china__left" :class="{ 'is-visible': isVisible }">
          <span class="why-china__label">{{ locale === 'en' ? 'OPPORTUNITY' : '机遇' }}</span>
          <h2 class="why-china__title">
            {{ locale === 'en' ? 'Why China?' : '为什么选择中国?' }}
          </h2>
          <p class="why-china__intro">
            {{ locale === 'en' 
              ? 'The opportunity is massive. The challenges are real. We help you capture the first and overcome the second.'
              : '机遇巨大，挑战真实。我们帮助您把握机遇，克服挑战。'
            }}
          </p>
          <div class="why-china__image">
            <img 
              ref="imageRef"
              :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC05476.JPG')" 
              alt="China Market" 
              loading="lazy"
              class="parallax-image"
            />
          </div>
        </div>

        <div class="why-china__right">
          <div 
            v-for="(reason, index) in reasons" 
            :key="index" 
            class="reason-card"
            :class="{ 'is-visible': isVisible }"
            :style="{ '--index': index }"
          >
            <div class="reason-card__icon">
              <img :src="reason.icon" :alt="reason.title" />
            </div>
            <div class="reason-card__content">
              <h3 class="reason-card__title">{{ reason.title }}</h3>
              <p class="reason-card__desc">{{ reason.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-china {
  background: linear-gradient(180deg, #faf8f3 0%, #f5f3ed 50%, #f0ede6 100%);
  overflow: hidden;
}

.why-china__grid {
  display: grid;
  gap: var(--spacing-16);
}

@media (min-width: 1024px) {
  .why-china__grid {
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
  }
}

/* Left Column */
.why-china__left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.why-china__left.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.why-china__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-purple);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--spacing-4);
}

.why-china__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  margin-bottom: var(--spacing-6);
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

.why-china__intro {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  line-height: 1.7;
  margin-bottom: var(--spacing-8);
  max-width: 450px;
}

.why-china__image {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.why-china__image img {
  width: 100%;
  height: auto;
  display: block;
}

.parallax-image {
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.why-china__image:hover img {
  transform: scale(1.05);
}

/* Right Column - Reason Cards */
.why-china__right {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.reason-card {
  display: flex;
  gap: var(--spacing-6);
  background: var(--color-white);
  padding: var(--spacing-8);
  border-radius: var(--radius-3xl);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
  border: 1px solid var(--color-gray-100);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--index) * 0.15s + 0.3s);
}

.reason-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.reason-card:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: var(--color-accent-purple-light);
}

.reason-card__icon {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

/* 使用品牌配色，每个图标不同颜色，避免重复 */
.reason-card:nth-child(1) .reason-card__icon {
  background: rgba(111, 123, 212, 0.12); /* 品牌紫色 */
}

.reason-card:nth-child(2) .reason-card__icon {
  background: rgba(255, 90, 39, 0.12); /* 品牌橙色 */
}

.reason-card:nth-child(3) .reason-card__icon {
  background: rgba(139, 232, 156, 0.12); /* 品牌绿色 */
}

.reason-card:hover .reason-card__icon {
  transform: scale(1.08) rotate(5deg);
}

.reason-card:nth-child(1):hover .reason-card__icon {
  background: rgba(111, 123, 212, 0.2);
}

.reason-card:nth-child(2):hover .reason-card__icon {
  background: rgba(255, 90, 39, 0.2);
}

.reason-card:nth-child(3):hover .reason-card__icon {
  background: rgba(139, 232, 156, 0.2);
}

.reason-card__icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.reason-card__content {
  flex: 1;
}

.reason-card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.reason-card__desc {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  line-height: 1.75;
  margin: 0;
}
</style>

import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { getImagePath } from '@/utils/imagePath'

const { t, locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const reasons = computed(() => [
  {
    title: locale.value === 'en' ? 'World\'s Largest Consumer Market' : '全球最大消费市场',
    desc: locale.value === 'en' 
      ? 'China has over 1.4 billion consumers with a rapidly growing middle class eager for quality international products.'
      : '中国拥有超过14亿消费者，中产阶级快速增长，对优质国际产品需求旺盛。',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/icon-01.png')
  },
  {
    title: locale.value === 'en' ? 'Unique E-commerce Ecosystem' : '独特电商生态',
    desc: locale.value === 'en'
      ? 'Navigate complex platforms like Tmall, JD, Douyin, and WeChat with our platform expertise and established relationships.'
      : '凭借我们的平台专业知识和建立的关系，驾驭天猫、京东、抖音、微信等复杂平台。',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/icon-02.png')
  },
  {
    title: locale.value === 'en' ? 'Cultural & Regulatory Complexity' : '文化与法规复杂性',
    desc: locale.value === 'en'
      ? 'We handle cross-border compliance, localization, and cultural adaptation — all the things that trip up brands going solo.'
      : '我们处理跨境合规、本地化和文化适应——这些都是品牌独自进入时会遇到的问题。',
    icon: getImagePath('/images/Sweekli 英文 PDF内图片素材/3 icon/icon-03.png')
  }
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
  <section ref="sectionRef" class="why-china section">
    <div class="container">
      <div class="why-china__grid">
        <div class="why-china__left" :class="{ 'is-visible': isVisible }">
          <span class="why-china__label">{{ locale === 'en' ? 'OPPORTUNITY' : '机遇' }}</span>
          <h2 class="why-china__title">
            {{ locale === 'en' ? 'Why China?' : '为什么选择中国?' }}
          </h2>
          <p class="why-china__intro">
            {{ locale === 'en' 
              ? 'The opportunity is massive. The challenges are real. We help you capture the first and overcome the second.'
              : '机遇巨大，挑战真实。我们帮助您把握机遇，克服挑战。'
            }}
          </p>
          <div class="why-china__image">
            <img 
              ref="imageRef"
              :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC05476.JPG')" 
              alt="China Market" 
              loading="lazy"
              class="parallax-image"
            />
          </div>
        </div>

        <div class="why-china__right">
          <div 
            v-for="(reason, index) in reasons" 
            :key="index" 
            class="reason-card"
            :class="{ 'is-visible': isVisible }"
            :style="{ '--index': index }"
          >
            <div class="reason-card__icon">
              <img :src="reason.icon" :alt="reason.title" />
            </div>
            <div class="reason-card__content">
              <h3 class="reason-card__title">{{ reason.title }}</h3>
              <p class="reason-card__desc">{{ reason.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-china {
  background: linear-gradient(180deg, #faf8f3 0%, #f5f3ed 50%, #f0ede6 100%);
  overflow: hidden;
}

.why-china__grid {
  display: grid;
  gap: var(--spacing-16);
}

@media (min-width: 1024px) {
  .why-china__grid {
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
  }
}

/* Left Column */
.why-china__left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.why-china__left.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.why-china__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-purple);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--spacing-4);
}

.why-china__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  margin-bottom: var(--spacing-6);
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

.why-china__intro {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  line-height: 1.7;
  margin-bottom: var(--spacing-8);
  max-width: 450px;
}

.why-china__image {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.why-china__image img {
  width: 100%;
  height: auto;
  display: block;
}

.parallax-image {
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.why-china__image:hover img {
  transform: scale(1.05);
}

/* Right Column - Reason Cards */
.why-china__right {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.reason-card {
  display: flex;
  gap: var(--spacing-6);
  background: var(--color-white);
  padding: var(--spacing-8);
  border-radius: var(--radius-3xl);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
  border: 1px solid var(--color-gray-100);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--index) * 0.15s + 0.3s);
}

.reason-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.reason-card:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: var(--color-accent-purple-light);
}

.reason-card__icon {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

/* 使用品牌配色，每个图标不同颜色，避免重复 */
.reason-card:nth-child(1) .reason-card__icon {
  background: rgba(111, 123, 212, 0.12); /* 品牌紫色 */
}

.reason-card:nth-child(2) .reason-card__icon {
  background: rgba(255, 90, 39, 0.12); /* 品牌橙色 */
}

.reason-card:nth-child(3) .reason-card__icon {
  background: rgba(139, 232, 156, 0.12); /* 品牌绿色 */
}

.reason-card:hover .reason-card__icon {
  transform: scale(1.08) rotate(5deg);
}

.reason-card:nth-child(1):hover .reason-card__icon {
  background: rgba(111, 123, 212, 0.2);
}

.reason-card:nth-child(2):hover .reason-card__icon {
  background: rgba(255, 90, 39, 0.2);
}

.reason-card:nth-child(3):hover .reason-card__icon {
  background: rgba(139, 232, 156, 0.2);
}

.reason-card__icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.reason-card__content {
  flex: 1;
}

.reason-card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.reason-card__desc {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  line-height: 1.75;
  margin: 0;
}
</style>
