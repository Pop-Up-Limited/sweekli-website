<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { computed, ref, onUnmounted } from 'vue'

const { t, locale } = useI18n()

const currentYear = new Date().getFullYear()
const showQRModal = ref(false)

const openQRModal = () => {
  // 检测是否为移动设备
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768
  if (isMobile) {
    showQRModal.value = true
    document.body.style.overflow = 'hidden'
  }
}

const closeQRModal = () => {
  showQRModal.value = false
  document.body.style.overflow = ''
}

onUnmounted(() => {
  document.body.style.overflow = ''
})

const quickLinks = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/about', label: t('nav.about') },
  { path: '/services', label: t('nav.services') },
  { path: '/brands', label: t('nav.brands') },
  { path: '/insights', label: t('nav.insights') },
  { path: '/contact', label: t('nav.contact') }
])

const legalLinks = computed(() => [
  { path: '/privacy', label: t('footer.privacy') },
  { path: '/terms', label: t('footer.terms') }
])

const socialLinks = computed(() => [
  { name: 'WeChat', icon: 'wechat', url: '#', qrCode: '/QR%20code.png' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/13655930/' },
  { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/sweekli/' }
])
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <!-- Brand Column -->
        <div class="footer__brand">
          <RouterLink to="/" class="footer__logo">
            <img 
              src="/sweekli-logo-white.png" 
              alt="Sweekli"
              class="footer__logo-img"
            />
          </RouterLink>
          <p class="footer__tagline">{{ t('footer.tagline') }}</p>
          
          <div class="footer__social">
            <div v-for="social in socialLinks" :key="social.name" class="footer__social-item">
              <a v-if="social.name !== 'WeChat'" :href="social.url" target="_blank" rel="noopener noreferrer" class="footer__social-link" :aria-label="social.name">
              <svg v-if="social.icon === 'wechat'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zm-2.93 4.27a.983.983 0 1 1 0 1.966.983.983 0 0 1 0-1.966zm5.86 0a.983.983 0 1 1 0 1.966.983.983 0 0 1 0-1.966z"/>
                <path d="M23.707 14.628c0-3.485-3.397-6.31-7.59-6.31-4.193 0-7.59 2.825-7.59 6.31 0 3.486 3.397 6.31 7.59 6.31.858 0 1.687-.109 2.464-.315a.704.704 0 0 1 .589.083l1.583.922a.259.259 0 0 0 .137.044.24.24 0 0 0 .237-.242c0-.058-.024-.117-.039-.175l-.325-1.23a.482.482 0 0 1 .175-.544c1.509-1.116 2.483-2.79 2.483-4.607l-.214-.246zm-9.394-1.139a.811.811 0 1 1 0-1.622.811.811 0 0 1 0 1.622zm3.622 0a.811.811 0 1 1 0-1.622.811.811 0 0 1 0 1.622z"/>
              </svg>
              <svg v-else-if="social.icon === 'linkedin'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <svg v-else-if="social.icon === 'instagram'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              </a>
              <!-- WeChat QR Code -->
              <div v-else class="footer__wechat-wrapper">
                <a 
                  href="#" 
                  class="footer__social-link" 
                  :aria-label="social.name"
                  @click.prevent="openQRModal"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zm-2.93 4.27a.983.983 0 1 1 0 1.966.983.983 0 0 1 0-1.966zm5.86 0a.983.983 0 1 1 0 1.966.983.983 0 0 1 0-1.966z"/>
                    <path d="M23.707 14.628c0-3.485-3.397-6.31-7.59-6.31-4.193 0-7.59 2.825-7.59 6.31 0 3.486 3.397 6.31 7.59 6.31.858 0 1.687-.109 2.464-.315a.704.704 0 0 1 .589.083l1.583.922a.259.259 0 0 0 .137.044.24.24 0 0 0 .237-.242c0-.058-.024-.117-.039-.175l-.325-1.23a.482.482 0 0 1 .175-.544c1.509-1.116 2.483-2.79 2.483-4.607l-.214-.246zm-9.394-1.139a.811.811 0 1 1 0-1.622.811.811 0 0 1 0 1.622zm3.622 0a.811.811 0 1 1 0-1.622.811.811 0 0 1 0 1.622z"/>
                  </svg>
                </a>
                <!-- Desktop hover popup -->
                <div class="footer__wechat-popup" @click.stop>
                  <img :src="social.qrCode" alt="WeChat QR Code" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer__col">
          <h4 class="footer__title">{{ t('footer.quickLinks') }}</h4>
          <ul class="footer__list">
            <li v-for="link in quickLinks" :key="link.path" v-show="locale !== 'zh' || link.path !== '/insights'">
              <RouterLink :to="link.path" class="footer__link">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer__col">
          <h4 class="footer__title">{{ t('footer.contact') }}</h4>
          <ul class="footer__list">
            <li>
              <a href="mailto:contact@sweekli.com" class="footer__link">contact@sweekli.com</a>
            </li>
            <li class="footer__address">
              {{ locale === 'en' 
                ? 'Shenzhen / Shanghai / Hong Kong / Taipei / Seoul'
                : '深圳 / 上海 / 香港 / 台北 / 首尔' }}
            </li>
          </ul>
        </div>

        <!-- Customer Service / Verify Product Link -->
        <div class="footer__col">
          <h4 class="footer__title">{{ t('footer.customerService') }}</h4>
          <ul class="footer__list">
            <li>
              <RouterLink to="/authentication" class="footer__link">{{ t('footer.verifyProduct') }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          © {{ currentYear }} Sweekli. {{ t('footer.rights') }}
        </p>
        <div class="footer__legal">
          <RouterLink v-for="link in legalLinks" :key="link.path" :to="link.path" class="footer__legal-link">
            {{ link.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>

  <!-- Mobile QR Code Modal -->
  <Transition name="fade">
    <div 
      v-if="showQRModal" 
      class="qr-modal-backdrop"
      @click="closeQRModal"
    >
      <div class="qr-modal" @click.stop>
        <button class="qr-modal__close" @click="closeQRModal" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div class="qr-modal__content">
          <h3 class="qr-modal__title">{{ locale === 'en' ? 'Scan WeChat QR Code' : '扫描微信二维码' }}</h3>
          <div class="qr-modal__image">
            <img :src="socialLinks.find(s => s.name === 'WeChat')?.qrCode" alt="WeChat QR Code" />
          </div>
          <p class="qr-modal__hint">{{ locale === 'en' ? 'Scan with WeChat to follow us' : '使用微信扫描二维码关注我们' }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.footer {
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-16) 0 var(--spacing-8);
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-10);
  margin-bottom: var(--spacing-12);
}

@media (min-width: 640px) {
  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer__grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

/* Brand Column */
.footer__brand {
  max-width: 280px;
}

.footer__logo {
  display: inline-block;
  margin-bottom: var(--spacing-4);
}

.footer__logo-img {
  height: 24px;
  width: auto;
}

.footer__tagline {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: var(--spacing-6);
}

.footer__social {
  display: flex;
  gap: var(--spacing-3);
  position: relative;
}

.footer__social-item {
  position: relative;
}

.footer__wechat-wrapper {
  position: relative;
}

.footer__wechat-popup {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: var(--spacing-2);
  padding: var(--spacing-2);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-fast);
  z-index: 1000;
  width: 120px;
  height: 120px;
  /* 防止出界 */
  max-width: calc(100vw - var(--spacing-4));
  margin-left: auto;
  margin-right: auto;
}

/* 确保在移动端不显示hover弹窗 */
@media (max-width: 767px) {
  .footer__wechat-popup {
    display: none;
  }
}

/* 桌面端防止出界 */
@media (min-width: 768px) {
  .footer__wechat-popup {
    /* 默认居中显示，但如果会出界则调整 */
    left: 50%;
    transform: translateX(-50%);
    /* 确保不会超出视口 */
    max-width: min(120px, calc(100vw - var(--spacing-4)));
  }
  
  /* 如果右侧会出界，显示在左侧 */
  .footer__wechat-wrapper:last-child .footer__wechat-popup {
    left: auto;
    right: 0;
    transform: none;
  }
  
  /* 如果左侧会出界，显示在右侧 */
  .footer__wechat-wrapper:first-child .footer__wechat-popup {
    left: 0;
    right: auto;
    transform: none;
  }
}

.footer__wechat-popup::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--color-white);
}

.footer__wechat-wrapper:hover .footer__wechat-popup,
.footer__wechat-popup:hover {
  opacity: 1;
  visibility: visible;
}

.footer__wechat-popup img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.footer__social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: var(--color-white);
  transition: all var(--transition-fast);
}

.footer__social-link:hover {
  background: var(--color-accent-purple);
  transform: translateY(-3px);
}

/* Column Styles */
.footer__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--spacing-5);
  color: rgba(255, 255, 255, 0.5);
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.footer__link {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer__link:hover {
  color: var(--color-white);
}

.footer__address {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.6);
}

/* Newsletter */

.footer__form {
  display: flex;
  gap: var(--spacing-2);
}

.footer__input {
  flex: 1;
  padding: var(--spacing-3) var(--spacing-4);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
}

.footer__input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.footer__input:focus {
  outline: none;
  border-color: var(--color-accent-purple);
  background: rgba(255, 255, 255, 0.15);
}

.footer__submit {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6f7bd4 0%, #434dc4 100%);
  border: none;
  border-radius: var(--radius-lg);
  color: var(--color-white);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.footer__submit:hover {
  transform: translateX(2px);
}

.footer__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.footer__newsletter-message {
  margin-top: var(--spacing-2);
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

/* Bottom Bar */
.footer__bottom {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding-top: var(--spacing-8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

@media (min-width: 768px) {
  .footer__bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
}

.footer__copyright {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.5);
}

/* QR Code Modal */
.qr-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: var(--spacing-4);
}

.qr-modal {
  position: relative;
  background: var(--color-white);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-2xl);
}

.qr-modal__close {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-100);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-gray-600);
  transition: all var(--transition-fast);
}

.qr-modal__close:hover {
  background: var(--color-gray-200);
  color: var(--color-primary);
}

.qr-modal__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-6);
}

.qr-modal__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  margin: 0;
}

.qr-modal__image {
  width: 250px;
  height: 250px;
  padding: var(--spacing-4);
  background: var(--color-white);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-modal__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.qr-modal__hint {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.footer__legal {
  display: flex;
  gap: var(--spacing-6);
}

.footer__legal-link {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer__legal-link:hover {
  color: var(--color-white);
}
</style>
