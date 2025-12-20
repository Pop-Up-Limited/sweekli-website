<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { getImagePath } from '@/utils/imagePath'

interface Props {
  label?: string
  title: string
  subtitle?: string
  backgroundImage?: string
  backgroundType?: 'image' | 'gradient'
}

const props = withDefaults(defineProps<Props>(), {
  backgroundType: 'gradient'
})

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

useIntersectionObserver(
  heroRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) isHeroVisible.value = true
  },
  { threshold: 0.2 }
)
</script>

<template>
  <section ref="heroRef" class="page-hero">
    <div class="page-hero__bg">
      <img 
        v-if="backgroundType === 'image' && backgroundImage"
        :src="getImagePath(backgroundImage)"
        alt=""
        loading="eager"
      />
      <div v-else class="hero-gradient"></div>
      <div class="hero-pattern"></div>
      <div v-if="backgroundType === 'image'" class="page-hero__overlay"></div>
    </div>
    <div class="container page-hero__content" :class="{ 'is-visible': isHeroVisible }">
      <span v-if="label" class="page-hero__label">{{ label }}</span>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="subtitle" class="page-hero__subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: calc(80px + var(--spacing-20));
  padding-bottom: var(--spacing-20);
}

@media (max-width: 768px) {
  .page-hero {
    padding-top: calc(70px + var(--spacing-16));
    padding-bottom: var(--spacing-16);
  }
}

.page-hero__bg {
  position: absolute;
  inset: 0;
}

.page-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #282E45 0%, #3D4565 40%, #6F7BD4 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(111, 123, 212, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  animation: floatPattern 15s ease-in-out infinite;
}

@keyframes floatPattern {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.05) rotate(1deg); }
}

.page-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(40, 46, 69, 0.9) 0%, rgba(111, 123, 212, 0.7) 100%);
}

.page-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.page-hero__content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.page-hero__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: var(--spacing-4);
}

.page-hero__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  color: var(--color-white);
}

.page-hero__subtitle {
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.7;
}
</style>

import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { getImagePath } from '@/utils/imagePath'

interface Props {
  label?: string
  title: string
  subtitle?: string
  backgroundImage?: string
  backgroundType?: 'image' | 'gradient'
}

const props = withDefaults(defineProps<Props>(), {
  backgroundType: 'gradient'
})

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

useIntersectionObserver(
  heroRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) isHeroVisible.value = true
  },
  { threshold: 0.2 }
)
</script>

<template>
  <section ref="heroRef" class="page-hero">
    <div class="page-hero__bg">
      <img 
        v-if="backgroundType === 'image' && backgroundImage"
        :src="getImagePath(backgroundImage)"
        alt=""
        loading="eager"
      />
      <div v-else class="hero-gradient"></div>
      <div class="hero-pattern"></div>
      <div v-if="backgroundType === 'image'" class="page-hero__overlay"></div>
    </div>
    <div class="container page-hero__content" :class="{ 'is-visible': isHeroVisible }">
      <span v-if="label" class="page-hero__label">{{ label }}</span>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="subtitle" class="page-hero__subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: calc(80px + var(--spacing-20));
  padding-bottom: var(--spacing-20);
}

@media (max-width: 768px) {
  .page-hero {
    padding-top: calc(70px + var(--spacing-16));
    padding-bottom: var(--spacing-16);
  }
}

.page-hero__bg {
  position: absolute;
  inset: 0;
}

.page-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #282E45 0%, #3D4565 40%, #6F7BD4 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(111, 123, 212, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  animation: floatPattern 15s ease-in-out infinite;
}

@keyframes floatPattern {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.05) rotate(1deg); }
}

.page-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(40, 46, 69, 0.9) 0%, rgba(111, 123, 212, 0.7) 100%);
}

.page-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.page-hero__content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.page-hero__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: var(--spacing-4);
}

.page-hero__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  color: var(--color-white);
}

.page-hero__subtitle {
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.7;
}
</style>

