<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted } from 'vue'
import PageHero from '@/components/common/PageHero.vue'

const { t, locale } = useI18n()

// Handle Tally form height updates
let iframe: HTMLIFrameElement | null = null

const handleMessage = (event: MessageEvent) => {
  // Tally sends height updates via postMessage
  if (event.origin === 'https://tally.so' && iframe) {
    if (typeof event.data === 'object' && event.data.type === 'tally-form-height') {
      iframe.style.height = `${event.data.height}px`
    }
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
  iframe = document.querySelector('.tally-form-iframe') as HTMLIFrameElement
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})

</script>

<template>
  <main class="contact-page">
    <!-- Hero -->
    <PageHero
      :label="locale === 'en' ? 'GET IN TOUCH' : '联系我们'"
      :title="t('contact.hero.title')"
      :subtitle="t('contact.hero.subtitle')"
      background-type="gradient"
    />

    <!-- Contact Section -->
    <section class="contact-section section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form - Tally Form -->
          <div class="contact-form-wrapper">
            <div class="tally-form-container">
              <iframe
                src="https://tally.so/embed/lbqLJB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                frameborder="0"
                scrolling="no"
                width="100%"
                height="100%"
                title="Contact Form"
                class="tally-form-iframe"
              ></iframe>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <h3 class="contact-info__title">{{ t('contact.offices.title') }}</h3>
            
            <div class="office-card">
              <h4 class="office-card__name">{{ t('contact.offices.shenzhen') }}</h4>
              <p class="office-card__address">
                {{ locale === 'en' 
                  ? 'Block 6, Cloud Park, Bantian Street, Shenzhen'
                  : '深圳市坂田街道云里6号'
                }}
              </p>
              <a href="mailto:contact@sweekli.com" class="office-card__email">contact@sweekli.com</a>
              <a href="tel:+8675586525700" class="office-card__phone">+86 755 86525700</a>
            </div>

            <div class="office-card">
              <h4 class="office-card__name">{{ t('contact.offices.shanghai') }}</h4>
              <p class="office-card__address">
                {{ locale === 'en' 
                  ? 'Floor 2, 588 East Yan\'an Road, Shanghai'
                  : '上海市延安东路588号2楼'
                }}
              </p>
              <a href="mailto:shanghai@sweekli.com" class="office-card__email">shanghai@sweekli.com</a>
            </div>

            <div class="office-card">
              <h4 class="office-card__name">{{ t('contact.offices.hongkong') }}</h4>
              <p class="office-card__address">
                {{ locale === 'en'
                  ? '11F, 200 Hennessy Road, Wan Chai, Hong Kong'
                  : '香港湾仔轩尼诗道200号11楼'
                }}
              </p>
              <a href="mailto:hk@sweekli.com" class="office-card__email">hk@sweekli.com</a>
            </div>

            <div class="contact-info__general">
              <h4>{{ locale === 'en' ? 'General Inquiries' : '一般咨询' }}</h4>
              <a href="mailto:contact@sweekli.com">contact@sweekli.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  padding-top: 0;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-12);
}

@media (min-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Tally Form Container */
.tally-form-container {
  background: var(--color-white);
  padding: var(--spacing-10);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  min-height: 600px;
  position: relative;
  overflow: hidden;
}

.tally-form-iframe {
  width: 100%;
  min-height: 600px;
  border: none;
  display: block;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.contact-info__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
}

.office-card {
  background: var(--color-gray-50);
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
}

.office-card__name {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.office-card__address {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-2);
  line-height: 1.6;
}

.office-card__email {
  font-size: var(--font-size-sm);
  color: var(--color-accent-purple);
  display: block;
  margin-bottom: var(--spacing-2);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.office-card__email:hover {
  color: var(--color-primary);
}

.office-card__phone {
  font-size: var(--font-size-sm);
  color: var(--color-accent-purple);
  display: block;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.office-card__phone:hover {
  color: var(--color-primary);
}

.contact-info__general {
  padding-top: var(--spacing-6);
  border-top: 1px solid var(--color-gray-200);
}

.contact-info__general h4 {
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-2);
}

.contact-info__general a {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
