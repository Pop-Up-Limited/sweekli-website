<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { RouterLink } from 'vue-router'

const { locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

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
  <section ref="sectionRef" class="join-us-section section">
    <div class="container">
      <div class="join-us-section__content" :class="{ 'is-visible': isVisible }">
        <div class="join-us-section__text">
          <span class="join-us-section__label">加入我们</span>
          <h2 class="join-us-section__title">加入思维颗粒</h2>
          <p class="join-us-section__desc">
            与全球优秀品牌和国际化同事共事，在开放的年轻文化氛围中成长，享受超过行业水平的福利待遇。
          </p>
          <RouterLink to="/careers" class="join-us-section__button">
            了解更多
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
        </div>
        <div class="join-us-section__image">
          <img 
            :src="locale === 'zh' ? '/images/join-us.jpg' : '/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC05476.JPG'" 
            alt="Join Us"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.join-us-section {
  background: linear-gradient(180deg, #faf8f3 0%, #f5f3ed 50%, #f0ede6 100%);
  padding: var(--spacing-24) 0;
}

.join-us-section__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-12);
  align-items: center;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.join-us-section__content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: 1024px) {
  .join-us-section__content {
    grid-template-columns: 1fr 1fr;
  }
}

.join-us-section__text {
  text-align: center;
}

@media (min-width: 1024px) {
  .join-us-section__text {
    text-align: left;
  }
}

.join-us-section__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-purple);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--spacing-4);
}

.join-us-section__title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-6);
  line-height: 1.2;
}

.join-us-section__desc {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  line-height: 1.7;
  margin-bottom: var(--spacing-8);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 1024px) {
  .join-us-section__desc {
    margin-left: 0;
    margin-right: 0;
  }
}

.join-us-section__button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-4) var(--spacing-8);
  background: linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-accent-purple-dark) 100%);
  color: var(--color-white);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.join-us-section__button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  gap: var(--spacing-3);
}

.join-us-section__button svg {
  transition: transform var(--transition-fast);
}

.join-us-section__button:hover svg {
  transform: translateX(4px);
}

.join-us-section__image {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.join-us-section__image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform var(--transition-slow);
}

.join-us-section__image:hover img {
  transform: scale(1.05);
}
</style>

