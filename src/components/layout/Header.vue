<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

const { t, locale } = useI18n()
const route = useRoute()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = computed(() => {
  const links = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/brands', label: t('nav.brands') },
    { path: '/contact', label: t('nav.contact') }
  ]
  
  // Add careers link only for Chinese
  if (locale.value === 'zh') {
    links.push({ path: '/careers', label: t('nav.careers') })
  }
  
  return links
})

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
  document.documentElement.lang = locale.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': isScrolled, 'is-open': isMobileMenuOpen }">
    <div class="container header__container">
      <!-- Logo - 文字logo，始终使用深色版本 -->
      <RouterLink to="/" class="header__logo" @click="closeMobileMenu">
        <img 
          src="/logos/画板 84 副本.svg" 
          alt="Sweekli" 
          class="logo-img"
        />
      </RouterLink>

      <!-- Navigation -->
      <Transition name="slide">
        <nav v-if="isMobileMenuOpen" class="header__nav is-open">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="header__link"
            :class="{ 'is-active': route.path === link.path }"
            @click="closeMobileMenu"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </Transition>

      <!-- Actions -->
      <div class="header__actions">
        <button class="header__lang" @click="toggleLanguage">
          {{ locale === 'en' ? '中' : 'EN' }}
        </button>
        
        <RouterLink to="/authentication" class="header__auth">
          {{ t('nav.auth') }}
        </RouterLink>

        <!-- Mobile Menu Toggle -->
        <button 
          class="header__hamburger" 
          :class="{ 'is-open': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Overlay - 使用 Teleport 传送到 body，确保覆盖整个页面 -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="header__overlay" @click="closeMobileMenu"></div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  padding: var(--spacing-4) 0;
  transition: all var(--transition-base);
  background: rgba(250, 248, 243, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
}

.header.is-scrolled {
  padding: var(--spacing-3) 0;
  box-shadow: var(--shadow-md);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 32px;
  width: auto;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.header__logo:hover .logo-img {
  opacity: 0.8;
  transform: scale(1.05);
}

.header.is-scrolled .logo-img {
  height: 28px;
}

/* Navigation */
.header__nav {
  display: none;
  gap: var(--spacing-8);
}

@media (min-width: 1024px) {
  .header__nav {
    display: flex;
  }
}

.header__link {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  text-decoration: none;
  position: relative;
  padding: var(--spacing-2) 0;
  transition: color var(--transition-fast);
}

.header__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-accent-purple);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform var(--transition-fast);
}

.header__link:hover::after,
.header__link.is-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Actions */
.header__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.header__lang {
  width: 36px;
  height: 36px;
  border: 2px solid var(--color-gray-300);
  border-radius: 50%;
  background: transparent;
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.header__lang:hover {
  background: var(--color-accent-purple);
  border-color: var(--color-accent-purple);
  color: var(--color-white);
}

.header__auth {
  display: none;
  padding: var(--spacing-2) var(--spacing-5);
  background: linear-gradient(135deg, #6f7bd4 0%, #434dc4 100%);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-fast);
}

@media (min-width: 768px) {
  .header__auth {
    display: block;
  }
}

.header__auth:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(111, 123, 212, 0.3);
}

/* Hamburger */
.header__hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

@media (min-width: 1024px) {
  .header__hamburger {
    display: none;
  }
}

.header__hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  transition: all var(--transition-fast);
}

.header__hamburger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.header__hamburger.is-open span:nth-child(2) {
  opacity: 0;
}

.header__hamburger.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu */
@media (max-width: 1023px) {
  .header__nav.is-open {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 320px;
    height: 100vh;
    background: #faf8f3;
    padding: calc(var(--spacing-20) + 60px) var(--spacing-8) var(--spacing-8);
    gap: var(--spacing-1);
    z-index: calc(var(--z-header) + 2);
    pointer-events: auto;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  }

  /* 使用 Vue Transition 的 slide 动画 */
  .slide-enter-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .slide-leave-active {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .slide-enter-from {
    transform: translateX(100%);
  }

  .slide-leave-to {
    transform: translateX(100%);
  }
}

  .header__nav.is-open .header__link {
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    padding: var(--spacing-4) 0;
    border-bottom: 1px solid var(--color-gray-100);
  }
}

/* Overlay - 覆盖整个屏幕，但侧边栏在遮罩之上 */
.header__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: calc(var(--z-header) + 1);
  cursor: pointer;
  pointer-events: auto;
  backdrop-filter: blur(2px);
}

.fade-enter-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
