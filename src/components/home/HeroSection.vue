<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

const { t, locale } = useI18n()
const isLoaded = ref(false)

const titleWords = computed(() => {
  return t('hero.title').split(' ')
})

onMounted(() => {
  // 延迟触发动画，确保页面加载完成
  setTimeout(() => {
    requestAnimationFrame(() => {
      isLoaded.value = true
    })
  }, 100)
})
</script>

<template>
  <section class="hero">
    <!-- Light background with floating particles -->
    <div class="hero__bg">
      <!-- Light background -->
      <div class="hero__gradient"></div>
      
      <!-- Floating particles (米散悬浮球) -->
      <div class="particle particle--1" :class="{ 'is-loaded': isLoaded }"></div>
      <div class="particle particle--2" :class="{ 'is-loaded': isLoaded }"></div>
      <div class="particle particle--3" :class="{ 'is-loaded': isLoaded }"></div>
      <div class="particle particle--4" :class="{ 'is-loaded': isLoaded }"></div>
      <div class="particle particle--5" :class="{ 'is-loaded': isLoaded }"></div>
      <div class="particle particle--6" :class="{ 'is-loaded': isLoaded }"></div>
      
      <!-- Subtle grid pattern -->
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
            <span>{{ t('hero.cta') }}</span>
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

      <!-- Scroll Indicator -->
      <div class="hero__scroll" :class="{ 'is-loaded': isLoaded }">
        <div class="hero__scroll-line">
          <div class="hero__scroll-dot"></div>
        </div>
        <span class="hero__scroll-text">{{ t('hero.scrollDown') }}</span>
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
  background: var(--color-white);
  color: var(--color-primary);
}

/* Background */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #ffffff 0%, #fafbfc 50%, #f5f7fa 100%);
}

/* Floating particles (米散悬浮球) - 精致设计 */
.particle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.particle.is-loaded {
  opacity: 1;
  animation: particleFloat 20s ease-in-out infinite;
}

.particle--1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.15), rgba(139, 92, 246, 0.1));
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.particle--2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(249, 194, 110, 0.12), rgba(236, 72, 153, 0.08));
  top: 60%;
  right: 8%;
  animation-delay: 2s;
}

.particle--3 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.1), rgba(67, 77, 196, 0.08));
  bottom: 15%;
  left: 10%;
  animation-delay: 4s;
}

.particle--4 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(168, 85, 247, 0.08));
  top: 30%;
  right: 15%;
  animation-delay: 1s;
}

.particle--5 {
  width: 320px;
  height: 320px;
  background: linear-gradient(135deg, rgba(249, 194, 110, 0.1), rgba(255, 107, 107, 0.06));
  bottom: 25%;
  right: 5%;
  animation-delay: 3s;
}

.particle--6 {
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.08), rgba(139, 92, 246, 0.06));
  top: 50%;
  left: 2%;
  animation-delay: 5s;
}

@keyframes particleFloat {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
  }
  25% { 
    transform: translate(30px, -40px) scale(1.05);
  }
  50% { 
    transform: translate(-20px, 30px) scale(0.98);
  }
  75% { 
    transform: translate(40px, 20px) scale(1.02);
  }
}

.hero__pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(111, 123, 212, 0.08) 1px, transparent 0);
  background-size: 32px 32px;
  opacity: 0.3;
}

/* Content */
.hero__container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-20) 0;
}

.hero__content {
  max-width: 1000px;
}

/* Title */
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

/* Subtitle */
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

/* CTA Buttons */
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
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all var(--transition-base);
}

.hero__cta--primary {
  background: linear-gradient(135deg, #6f7bd4 0%, #8b5cf6 50%, #a855f7 100%);
  color: var(--color-white);
  box-shadow: 0 8px 24px rgba(111, 123, 212, 0.25), 0 2px 8px rgba(111, 123, 212, 0.15);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5) var(--spacing-10);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.hero__cta--primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(111, 123, 212, 0.35), 0 4px 12px rgba(111, 123, 212, 0.2);
}

.hero__cta--primary svg {
  transition: transform var(--transition-fast);
}

.hero__cta--primary:hover svg {
  transform: translateX(4px);
}

.hero__cta--secondary {
  background: var(--color-white);
  border: 2px solid var(--color-gray-200);
  color: var(--color-primary);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5) var(--spacing-10);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.hero__cta--secondary:hover {
  background: var(--color-gray-50);
  border-color: var(--color-accent-purple);
  color: var(--color-accent-purple);
  box-shadow: 0 4px 12px rgba(111, 123, 212, 0.15);
}

/* Scroll Indicator */
.hero__scroll {
  position: absolute;
  bottom: var(--spacing-10);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3);
  opacity: 0;
  transition: opacity 0.8s ease 1s;
}

.hero__scroll.is-loaded {
  opacity: 1;
}

.hero__scroll-line {
  width: 2px;
  height: 60px;
  background: var(--color-gray-200);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

.hero__scroll-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: linear-gradient(to bottom, #6f7bd4, transparent);
  border-radius: 2px;
  animation: scrollLine 2s ease-in-out infinite;
}

@keyframes scrollLine {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(200%); }
  100% { transform: translateY(-100%); }
}

.hero__scroll-text {
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

/* Responsive */
@media (max-width: 768px) {
  .hero__scroll {
    display: none;
  }
  
  .hero__cta {
    width: 100%;
    max-width: 280px;
  }
}
</style>
