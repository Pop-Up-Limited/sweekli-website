<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const { t, locale } = useI18n()

const currentYear = new Date().getFullYear()

const quickLinks = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/about', label: t('nav.about') },
  { path: '/services', label: t('nav.services') },
  { path: '/brands', label: t('nav.brands') },
  { path: '/contact', label: t('nav.contact') }
])

const legalLinks = computed(() => [
  { path: '/privacy', label: t('footer.privacy') },
  { path: '/terms', label: t('footer.terms') }
])

const socialLinks = [
  { name: 'WeChat', icon: 'wechat', url: '#' },
  { name: 'LinkedIn', icon: 'linkedin', url: '#' },
  { name: 'Instagram', icon: 'instagram', url: '#' }
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <!-- Brand Column -->
        <div class="footer__brand">
          <RouterLink to="/" class="footer__logo">
            <img 
              src="/sweekli-logo-white.svg" 
              alt="Sweekli"
              class="footer__logo-img"
            />
          </RouterLink>
          <p class="footer__tagline">{{ t('footer.tagline') }}</p>
          
          <div class="footer__social">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" class="footer__social-link" :aria-label="social.name">
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
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer__col">
          <h4 class="footer__title">{{ t('footer.quickLinks') }}</h4>
          <ul class="footer__list">
            <li v-for="link in quickLinks" :key="link.path">
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
              {{ locale === 'en' ? 'Shanghai, China' : '中国上海' }}
            </li>
            <li class="footer__address">
              {{ locale === 'en' ? 'Los Angeles, USA' : '美国洛杉矶' }}
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="footer__col footer__newsletter">
          <h4 class="footer__title">{{ t('footer.stayUpdated') }}</h4>
          <p class="footer__newsletter-desc">{{ t('footer.newsletterDesc') }}</p>
          <form class="footer__form" @submit.prevent>
            <input 
              type="email" 
              :placeholder="t('footer.emailPlaceholder')" 
              class="footer__input"
              required
            />
            <button type="submit" class="footer__submit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </form>
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
    grid-template-columns: 2fr 1fr 1fr 2fr;
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
  height: 32px;
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
.footer__newsletter-desc {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: var(--spacing-4);
}

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
