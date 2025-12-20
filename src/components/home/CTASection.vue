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
  { threshold: 0.3 }
)
</script>

<template>
  <section ref="sectionRef" class="cta">
    <!-- Background with gradient -->
    <div class="cta__bg">
      <div class="cta__blob cta__blob--1"></div>
      <div class="cta__blob cta__blob--2"></div>
    </div>

    <div class="container cta__container" :class="{ 'is-visible': isVisible }">
      <span class="cta__label">{{ locale === 'en' ? 'GET STARTED' : '开始合作' }}</span>
      
      <h2 class="cta__title">
        {{ locale === 'en' ? 'Ready to Unlock China?' : '准备好开拓中国市场了吗？' }}
      </h2>

      <p class="cta__desc">
        {{ locale === 'en' 
          ? 'Join 50+ global brands who trusted Sweekli to bring their products to the world\'s largest consumer market.'
          : '加入50多个信任思维颗粒的全球品牌，将您的产品带入全球最大的消费市场。'
        }}
      </p>

      <div class="cta__actions">
        <RouterLink to="/contact" class="cta__btn cta__btn--primary">
          <span>{{ locale === 'en' ? 'Start Partnership' : '开启合作' }}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
        <RouterLink to="/services" class="cta__btn cta__btn--secondary">
          {{ locale === 'en' ? 'Explore Services' : '了解服务' }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  padding: var(--spacing-32) 0;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
}

/* Animated gradient blobs */
.cta__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.cta__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

.cta__blob--1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.6), rgba(139, 92, 246, 0.4));
  top: -30%;
  left: -10%;
  animation: floatCta1 20s ease-in-out infinite;
}

.cta__blob--2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, rgba(249, 194, 110, 0.4), rgba(236, 72, 153, 0.3));
  bottom: -30%;
  right: -10%;
  animation: floatCta2 25s ease-in-out infinite;
}

@keyframes floatCta1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(60px, 40px); }
}

@keyframes floatCta2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-50px, -30px); }
}

.cta__container {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.cta__container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.cta__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: var(--spacing-4);
}

.cta__title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
  margin-bottom: var(--spacing-6);
  color: var(--color-white);
}

.cta__desc {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto var(--spacing-10);
  line-height: 1.7;
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-4);
}

.cta__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border-radius: 9999px;
  text-decoration: none;
  transition: box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  position: relative;
  white-space: nowrap;
  min-width: fit-content;
}

.cta__btn--primary {
  background: linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-accent-purple-dark) 100%);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.cta__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cta__btn--primary span {
  display: inline-block;
  transition: letter-spacing 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.cta__btn--primary:hover span {
  letter-spacing: 0.02em;
}

.cta__btn--primary svg {
  transition: transform var(--transition-fast);
}

.cta__btn--primary:hover svg {
  transform: translateX(2px);
}

.cta__btn--secondary {
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-white);
  border: none;
}

.cta__btn--secondary:hover {
  background: rgba(255, 255, 255, 0.25);
}

.cta__btn--secondary {
  transition: box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.cta__btn--secondary:hover {
  letter-spacing: 0.02em;
}

@media (max-width: 640px) {
  .cta__btn {
    width: 100%;
    max-width: 280px;
  }
}
</style>

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
  { threshold: 0.3 }
)
</script>

<template>
  <section ref="sectionRef" class="cta">
    <!-- Background with gradient -->
    <div class="cta__bg">
      <div class="cta__blob cta__blob--1"></div>
      <div class="cta__blob cta__blob--2"></div>
    </div>

    <div class="container cta__container" :class="{ 'is-visible': isVisible }">
      <span class="cta__label">{{ locale === 'en' ? 'GET STARTED' : '开始合作' }}</span>
      
      <h2 class="cta__title">
        {{ locale === 'en' ? 'Ready to Unlock China?' : '准备好开拓中国市场了吗？' }}
      </h2>

      <p class="cta__desc">
        {{ locale === 'en' 
          ? 'Join 50+ global brands who trusted Sweekli to bring their products to the world\'s largest consumer market.'
          : '加入50多个信任思维颗粒的全球品牌，将您的产品带入全球最大的消费市场。'
        }}
      </p>

      <div class="cta__actions">
        <RouterLink to="/contact" class="cta__btn cta__btn--primary">
          <span>{{ locale === 'en' ? 'Start Partnership' : '开启合作' }}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
        <RouterLink to="/services" class="cta__btn cta__btn--secondary">
          {{ locale === 'en' ? 'Explore Services' : '了解服务' }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  padding: var(--spacing-32) 0;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
}

/* Animated gradient blobs */
.cta__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.cta__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

.cta__blob--1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.6), rgba(139, 92, 246, 0.4));
  top: -30%;
  left: -10%;
  animation: floatCta1 20s ease-in-out infinite;
}

.cta__blob--2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, rgba(249, 194, 110, 0.4), rgba(236, 72, 153, 0.3));
  bottom: -30%;
  right: -10%;
  animation: floatCta2 25s ease-in-out infinite;
}

@keyframes floatCta1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(60px, 40px); }
}

@keyframes floatCta2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-50px, -30px); }
}

.cta__container {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.cta__container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.cta__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: var(--spacing-4);
}

.cta__title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
  margin-bottom: var(--spacing-6);
  color: var(--color-white);
}

.cta__desc {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto var(--spacing-10);
  line-height: 1.7;
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-4);
}

.cta__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border-radius: 9999px;
  text-decoration: none;
  transition: box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  position: relative;
  white-space: nowrap;
  min-width: fit-content;
}

.cta__btn--primary {
  background: linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-accent-purple-dark) 100%);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.cta__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cta__btn--primary span {
  display: inline-block;
  transition: letter-spacing 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.cta__btn--primary:hover span {
  letter-spacing: 0.02em;
}

.cta__btn--primary svg {
  transition: transform var(--transition-fast);
}

.cta__btn--primary:hover svg {
  transform: translateX(2px);
}

.cta__btn--secondary {
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-white);
  border: none;
}

.cta__btn--secondary:hover {
  background: rgba(255, 255, 255, 0.25);
}

.cta__btn--secondary {
  transition: box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.cta__btn--secondary:hover {
  letter-spacing: 0.02em;
}

@media (max-width: 640px) {
  .cta__btn {
    width: 100%;
    max-width: 280px;
  }
}
</style>
