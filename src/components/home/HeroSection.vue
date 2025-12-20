<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

const { t, locale } = useI18n()
const isLoaded = ref(false)

const titleWords = computed(() => {
  return t('hero.title').split(' ')
})

// 生成随机位置偏移和大小 - 每次页面加载都生成新的随机值
const generateRandomOffsets = () => {
  // 生成三个不同的大小，确保有明显对比（最小180px，最大400px）
  const sizes = []
  sizes.push(180 + Math.random() * 220) // 180-400px
  sizes.push(180 + Math.random() * 220)
  sizes.push(180 + Math.random() * 220)
  
  // 确保至少有一个明显不同的大小（差异至少120px）
  const minSize = Math.min(...sizes)
  const maxSize = Math.max(...sizes)
  if (maxSize - minSize < 120) {
    const midIndex = sizes.indexOf(Math.max(...sizes.filter(s => s !== maxSize && s !== minSize)))
    if (midIndex >= 0) {
      sizes[midIndex] = minSize + 120 + Math.random() * 100
    } else {
      sizes[0] = minSize + 120 + Math.random() * 100
    }
  }
  
  return [
    { 
      x: Math.random() * 120 - 60,
      y: Math.random() * 80 - 40,
      startX: Math.random() * 200 - 100,
      startY: Math.random() * 100 - 50,
      size: sizes[0]
    },
    { 
      x: Math.random() * 120 - 60,
      y: Math.random() * 80 - 40,
      startX: Math.random() * 200 - 100,
      startY: Math.random() * 100 - 50,
      size: sizes[1]
    },
    { 
      x: Math.random() * 120 - 60,
      y: Math.random() * 80 - 40,
      startX: Math.random() * 200 - 100,
      startY: Math.random() * 100 - 50,
      size: sizes[2]
    }
  ]
}

const randomOffsets = ref(generateRandomOffsets())

onMounted(() => {
  randomOffsets.value = generateRandomOffsets()
  setTimeout(() => {
    requestAnimationFrame(() => {
      isLoaded.value = true
    })
  }, 100)
})
</script>

<template>
  <section class="hero">
    <div class="hero__bg">
      <div class="hero__gradient"></div>
      
      <!-- Floating particles (米散悬浮球) - 三个颜色随机排列在title周围 -->
      <div 
        v-if="randomOffsets[0]"
        class="particle particle--1" 
        :class="{ 'is-loaded': isLoaded }"
        :style="{ 
          '--random-x': `${randomOffsets[0].x}px`, 
          '--random-y': `${randomOffsets[0].y}px`,
          '--start-x': `${randomOffsets[0].startX}px`,
          '--start-y': `${randomOffsets[0].startY}px`,
          '--particle-size': `${randomOffsets[0].size}px`
        }"
      ></div>
      <div 
        v-if="randomOffsets[1]"
        class="particle particle--2" 
        :class="{ 'is-loaded': isLoaded }"
        :style="{ 
          '--random-x': `${randomOffsets[1].x}px`, 
          '--random-y': `${randomOffsets[1].y}px`,
          '--start-x': `${randomOffsets[1].startX}px`,
          '--start-y': `${randomOffsets[1].startY}px`,
          '--particle-size': `${randomOffsets[1].size}px`
        }"
      ></div>
      <div 
        v-if="randomOffsets[2]"
        class="particle particle--3" 
        :class="{ 'is-loaded': isLoaded }"
        :style="{ 
          '--random-x': `${randomOffsets[2].x}px`, 
          '--random-y': `${randomOffsets[2].y}px`,
          '--start-x': `${randomOffsets[2].startX}px`,
          '--start-y': `${randomOffsets[2].startY}px`,
          '--particle-size': `${randomOffsets[2].size}px`
        }"
      ></div>
      
      <div class="hero__pattern"></div>
    </div>

    <div class="container hero__container">
      <div class="hero__content" :class="{ 'is-loaded': isLoaded }">
        <h1 class="hero__title">
          <span 
            v-for="(word, index) in titleWords" 
            :key="index"
            class="hero__word"
            :style="{ '--delay': `${0.1 + index * 0.05}s` }"
          >
            {{ word }}&nbsp;
          </span>
        </h1>
        
        <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>
        
        <div class="hero__actions">
          <RouterLink to="/contact" class="hero__cta hero__cta--primary">
            <span class="hero__cta-text-wrapper">
              <span class="hero__cta-text hero__cta-text--default">{{ t('hero.cta') }}</span>
              <span class="hero__cta-text hero__cta-text--hover">{{ t('hero.cta') }}</span>
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
          <RouterLink to="/about" class="hero__cta hero__cta--secondary">
            {{ locale === 'en' ? 'Learn More' : '了解更多' }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #faf8f3;
  color: var(--color-primary);
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #faf8f3 0%, #f5f3ed 50%, #f0ede6 100%);
}

.particle {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0;
  will-change: transform;
  z-index: 1;
}

.particle.is-loaded {
  opacity: 1;
  animation: particleEnter 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
              particleFloat 25s ease-in-out 3s infinite;
}

.particle--1 {
  width: var(--particle-size, 300px);
  height: var(--particle-size, 300px);
  background: #8FB5DA;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.particle--2 {
  width: var(--particle-size, 280px);
  height: var(--particle-size, 280px);
  background: #CC6E6F;
  top: 15%;
  right: 5%;
  animation-delay: 3s;
}

.particle--3 {
  width: var(--particle-size, 260px);
  height: var(--particle-size, 260px);
  background: #F8C569;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 6s;
}

@media (max-width: 768px) {
  .particle--1 {
    top: 5%;
    left: 0%;
    width: calc(var(--particle-size, 300px) * 0.7);
    height: calc(var(--particle-size, 300px) * 0.7);
  }
  
  .particle--2 {
    top: 5%;
    right: 0%;
    width: calc(var(--particle-size, 280px) * 0.7);
    height: calc(var(--particle-size, 280px) * 0.7);
  }
  
  .particle--3 {
    bottom: 10%;
    left: 50%;
    width: calc(var(--particle-size, 260px) * 0.7);
    height: calc(var(--particle-size, 260px) * 0.7);
  }
}

@keyframes particleEnter {
  0% {
    transform: translateY(calc(100vh + var(--start-y, 0px))) translateX(calc(var(--start-x, 0px))) scale(0.5);
    opacity: 0.4;
  }
  100% {
    transform: translateY(calc(var(--random-y, 0px))) translateX(calc(var(--random-x, 0px))) scale(1);
    opacity: 1;
  }
}

@keyframes particleFloat {
  0%, 100% { 
    transform: translateY(calc(var(--random-y, 0))) translateX(calc(var(--random-x, 0))) scale(1);
  }
  25% { 
    transform: translateY(calc(var(--random-y, 0) - 20px)) translateX(calc(var(--random-x, 0) + 15px)) scale(1.05);
  }
  50% { 
    transform: translateY(calc(var(--random-y, 0) + 15px)) translateX(calc(var(--random-x, 0) - 10px)) scale(0.98);
  }
  75% { 
    transform: translateY(calc(var(--random-y, 0) - 10px)) translateX(calc(var(--random-x, 0) + 20px)) scale(1.02);
  }
}

.hero__pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(111, 123, 212, 0.04) 1px, transparent 0);
  background-size: 40px 40px;
  opacity: 0.5;
}

.hero__container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: var(--spacing-32) 0 var(--spacing-20);
  min-height: 100vh;
}

@media (max-width: 768px) {
  .hero__container {
    padding: var(--spacing-24) 0 var(--spacing-16);
  }
}

.hero__content {
  max-width: 1000px;
}

.hero__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: var(--spacing-8);
  color: var(--color-primary);
}

.hero__word {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay);
}

.hero__content.is-loaded .hero__word {
  opacity: 1;
  transform: translateY(0);
}

.hero__subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  color: var(--color-gray-600);
  max-width: 720px;
  margin: 0 auto var(--spacing-12);
  line-height: 1.75;
  font-weight: var(--font-weight-normal);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s;
}

.hero__content.is-loaded .hero__subtitle {
  opacity: 1;
  transform: translateY(0);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-4);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s;
}

.hero__content.is-loaded .hero__actions {
  opacity: 1;
  transform: translateY(0);
}

.hero__cta {
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

.hero__cta--primary {
  background: linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-accent-purple-dark) 100%);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.hero__cta--primary .hero__cta-text {
  color: var(--color-white);
}

.hero__cta--primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hero__cta-text-wrapper {
  position: relative;
  display: inline-block;
  overflow: hidden;
  height: 1.5em;
  line-height: 1.5em;
  vertical-align: middle;
  min-width: 100px;
}

.hero__cta-text {
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  line-height: 1.5em;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  color: var(--color-white);
}

.hero__cta-text--default {
  top: 0;
  transform: translateY(0);
}

.hero__cta-text--hover {
  top: -1.5em;
  transform: translateY(0);
}

.hero__cta--primary:hover .hero__cta-text--default {
  transform: translateY(100%);
}

.hero__cta--primary:hover .hero__cta-text--hover {
  transform: translateY(1.5em);
}

.hero__cta--primary svg {
  transition: transform var(--transition-fast);
}

.hero__cta--primary:hover svg {
  transform: translateX(2px);
}

.hero__cta--secondary {
  background: var(--color-white);
  color: var(--color-primary);
  border: none;
  transition: background 0.3s cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero__cta--secondary:hover {
  background: var(--color-gray-50);
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .hero__cta {
    width: 100%;
    max-width: 280px;
  }
}
</style>

import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

const { t, locale } = useI18n()
const isLoaded = ref(false)

const titleWords = computed(() => {
  return t('hero.title').split(' ')
})

// 生成随机位置偏移和大小 - 每次页面加载都生成新的随机值
const generateRandomOffsets = () => {
  // 生成三个不同的大小，确保有明显对比（最小180px，最大400px）
  const sizes = []
  sizes.push(180 + Math.random() * 220) // 180-400px
  sizes.push(180 + Math.random() * 220)
  sizes.push(180 + Math.random() * 220)
  
  // 确保至少有一个明显不同的大小（差异至少120px）
  const minSize = Math.min(...sizes)
  const maxSize = Math.max(...sizes)
  if (maxSize - minSize < 120) {
    const midIndex = sizes.indexOf(Math.max(...sizes.filter(s => s !== maxSize && s !== minSize)))
    if (midIndex >= 0) {
      sizes[midIndex] = minSize + 120 + Math.random() * 100
    } else {
      sizes[0] = minSize + 120 + Math.random() * 100
    }
  }
  
  return [
    { 
      x: Math.random() * 120 - 60,
      y: Math.random() * 80 - 40,
      startX: Math.random() * 200 - 100,
      startY: Math.random() * 100 - 50,
      size: sizes[0]
    },
    { 
      x: Math.random() * 120 - 60,
      y: Math.random() * 80 - 40,
      startX: Math.random() * 200 - 100,
      startY: Math.random() * 100 - 50,
      size: sizes[1]
    },
    { 
      x: Math.random() * 120 - 60,
      y: Math.random() * 80 - 40,
      startX: Math.random() * 200 - 100,
      startY: Math.random() * 100 - 50,
      size: sizes[2]
    }
  ]
}

const randomOffsets = ref(generateRandomOffsets())

onMounted(() => {
  randomOffsets.value = generateRandomOffsets()
  setTimeout(() => {
    requestAnimationFrame(() => {
      isLoaded.value = true
    })
  }, 100)
})
</script>

<template>
  <section class="hero">
    <div class="hero__bg">
      <div class="hero__gradient"></div>
      
      <!-- Floating particles (米散悬浮球) - 三个颜色随机排列在title周围 -->
      <div 
        v-if="randomOffsets[0]"
        class="particle particle--1" 
        :class="{ 'is-loaded': isLoaded }"
        :style="{ 
          '--random-x': `${randomOffsets[0].x}px`, 
          '--random-y': `${randomOffsets[0].y}px`,
          '--start-x': `${randomOffsets[0].startX}px`,
          '--start-y': `${randomOffsets[0].startY}px`,
          '--particle-size': `${randomOffsets[0].size}px`
        }"
      ></div>
      <div 
        v-if="randomOffsets[1]"
        class="particle particle--2" 
        :class="{ 'is-loaded': isLoaded }"
        :style="{ 
          '--random-x': `${randomOffsets[1].x}px`, 
          '--random-y': `${randomOffsets[1].y}px`,
          '--start-x': `${randomOffsets[1].startX}px`,
          '--start-y': `${randomOffsets[1].startY}px`,
          '--particle-size': `${randomOffsets[1].size}px`
        }"
      ></div>
      <div 
        v-if="randomOffsets[2]"
        class="particle particle--3" 
        :class="{ 'is-loaded': isLoaded }"
        :style="{ 
          '--random-x': `${randomOffsets[2].x}px`, 
          '--random-y': `${randomOffsets[2].y}px`,
          '--start-x': `${randomOffsets[2].startX}px`,
          '--start-y': `${randomOffsets[2].startY}px`,
          '--particle-size': `${randomOffsets[2].size}px`
        }"
      ></div>
      
      <div class="hero__pattern"></div>
    </div>

    <div class="container hero__container">
      <div class="hero__content" :class="{ 'is-loaded': isLoaded }">
        <h1 class="hero__title">
          <span 
            v-for="(word, index) in titleWords" 
            :key="index"
            class="hero__word"
            :style="{ '--delay': `${0.1 + index * 0.05}s` }"
          >
            {{ word }}&nbsp;
          </span>
        </h1>
        
        <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>
        
        <div class="hero__actions">
          <RouterLink to="/contact" class="hero__cta hero__cta--primary">
            <span class="hero__cta-text-wrapper">
              <span class="hero__cta-text hero__cta-text--default">{{ t('hero.cta') }}</span>
              <span class="hero__cta-text hero__cta-text--hover">{{ t('hero.cta') }}</span>
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
          <RouterLink to="/about" class="hero__cta hero__cta--secondary">
            {{ locale === 'en' ? 'Learn More' : '了解更多' }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #faf8f3;
  color: var(--color-primary);
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #faf8f3 0%, #f5f3ed 50%, #f0ede6 100%);
}

.particle {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0;
  will-change: transform;
  z-index: 1;
}

.particle.is-loaded {
  opacity: 1;
  animation: particleEnter 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
              particleFloat 25s ease-in-out 3s infinite;
}

.particle--1 {
  width: var(--particle-size, 300px);
  height: var(--particle-size, 300px);
  background: #8FB5DA;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.particle--2 {
  width: var(--particle-size, 280px);
  height: var(--particle-size, 280px);
  background: #CC6E6F;
  top: 15%;
  right: 5%;
  animation-delay: 3s;
}

.particle--3 {
  width: var(--particle-size, 260px);
  height: var(--particle-size, 260px);
  background: #F8C569;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 6s;
}

@media (max-width: 768px) {
  .particle--1 {
    top: 5%;
    left: 0%;
    width: calc(var(--particle-size, 300px) * 0.7);
    height: calc(var(--particle-size, 300px) * 0.7);
  }
  
  .particle--2 {
    top: 5%;
    right: 0%;
    width: calc(var(--particle-size, 280px) * 0.7);
    height: calc(var(--particle-size, 280px) * 0.7);
  }
  
  .particle--3 {
    bottom: 10%;
    left: 50%;
    width: calc(var(--particle-size, 260px) * 0.7);
    height: calc(var(--particle-size, 260px) * 0.7);
  }
}

@keyframes particleEnter {
  0% {
    transform: translateY(calc(100vh + var(--start-y, 0px))) translateX(calc(var(--start-x, 0px))) scale(0.5);
    opacity: 0.4;
  }
  100% {
    transform: translateY(calc(var(--random-y, 0px))) translateX(calc(var(--random-x, 0px))) scale(1);
    opacity: 1;
  }
}

@keyframes particleFloat {
  0%, 100% { 
    transform: translateY(calc(var(--random-y, 0))) translateX(calc(var(--random-x, 0))) scale(1);
  }
  25% { 
    transform: translateY(calc(var(--random-y, 0) - 20px)) translateX(calc(var(--random-x, 0) + 15px)) scale(1.05);
  }
  50% { 
    transform: translateY(calc(var(--random-y, 0) + 15px)) translateX(calc(var(--random-x, 0) - 10px)) scale(0.98);
  }
  75% { 
    transform: translateY(calc(var(--random-y, 0) - 10px)) translateX(calc(var(--random-x, 0) + 20px)) scale(1.02);
  }
}

.hero__pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(111, 123, 212, 0.04) 1px, transparent 0);
  background-size: 40px 40px;
  opacity: 0.5;
}

.hero__container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: var(--spacing-32) 0 var(--spacing-20);
  min-height: 100vh;
}

@media (max-width: 768px) {
  .hero__container {
    padding: var(--spacing-24) 0 var(--spacing-16);
  }
}

.hero__content {
  max-width: 1000px;
}

.hero__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: var(--spacing-8);
  color: var(--color-primary);
}

.hero__word {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay);
}

.hero__content.is-loaded .hero__word {
  opacity: 1;
  transform: translateY(0);
}

.hero__subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  color: var(--color-gray-600);
  max-width: 720px;
  margin: 0 auto var(--spacing-12);
  line-height: 1.75;
  font-weight: var(--font-weight-normal);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s;
}

.hero__content.is-loaded .hero__subtitle {
  opacity: 1;
  transform: translateY(0);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-4);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s;
}

.hero__content.is-loaded .hero__actions {
  opacity: 1;
  transform: translateY(0);
}

.hero__cta {
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

.hero__cta--primary {
  background: linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-accent-purple-dark) 100%);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.hero__cta--primary .hero__cta-text {
  color: var(--color-white);
}

.hero__cta--primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hero__cta-text-wrapper {
  position: relative;
  display: inline-block;
  overflow: hidden;
  height: 1.5em;
  line-height: 1.5em;
  vertical-align: middle;
  min-width: 100px;
}

.hero__cta-text {
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  line-height: 1.5em;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  color: var(--color-white);
}

.hero__cta-text--default {
  top: 0;
  transform: translateY(0);
}

.hero__cta-text--hover {
  top: -1.5em;
  transform: translateY(0);
}

.hero__cta--primary:hover .hero__cta-text--default {
  transform: translateY(100%);
}

.hero__cta--primary:hover .hero__cta-text--hover {
  transform: translateY(1.5em);
}

.hero__cta--primary svg {
  transition: transform var(--transition-fast);
}

.hero__cta--primary:hover svg {
  transform: translateX(2px);
}

.hero__cta--secondary {
  background: var(--color-white);
  color: var(--color-primary);
  border: none;
  transition: background 0.3s cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero__cta--secondary:hover {
  background: var(--color-gray-50);
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .hero__cta {
    width: 100%;
    max-width: 280px;
  }
}
</style>
