<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const { t, locale } = useI18n()

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

// Form state
const form = ref({
  name: '',
  email: '',
  company: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSubmitting.value = false
  isSubmitted.value = true
  
  // Reset form
  form.value = { name: '', email: '', company: '', message: '' }
}

useIntersectionObserver(
  heroRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isHeroVisible.value = true
  },
  { threshold: 0.2 }
)
</script>

<template>
  <main class="contact-page">
    <!-- Hero -->
    <section ref="heroRef" class="contact-hero">
      <div class="contact-hero__bg"></div>
      <div class="container contact-hero__content" :class="{ 'is-visible': isHeroVisible }">
        <h1 class="contact-hero__title">{{ t('contact.hero.title') }}</h1>
        <p class="contact-hero__subtitle">{{ t('contact.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <Transition name="fade" mode="out-in">
              <form v-if="!isSubmitted" class="contact-form" @submit.prevent="handleSubmit">
                <div class="form-group">
                  <label :for="'name'">{{ t('contact.form.name') }}</label>
                  <input 
                    id="name"
                    v-model="form.name"
                    type="text" 
                    required
                    :placeholder="locale === 'en' ? 'John Doe' : '张三'"
                  />
                </div>

                <div class="form-group">
                  <label :for="'email'">{{ t('contact.form.email') }}</label>
                  <input 
                    id="email"
                    v-model="form.email"
                    type="email" 
                    required
                    placeholder="you@company.com"
                  />
                </div>

                <div class="form-group">
                  <label :for="'company'">{{ t('contact.form.company') }}</label>
                  <input 
                    id="company"
                    v-model="form.company"
                    type="text"
                    :placeholder="locale === 'en' ? 'Your Company' : '您的公司'"
                  />
                </div>

                <div class="form-group">
                  <label :for="'message'">{{ t('contact.form.message') }}</label>
                  <textarea 
                    id="message"
                    v-model="form.message"
                    rows="5" 
                    required
                    :placeholder="locale === 'en' ? 'Tell us about your brand...' : '请介绍您的品牌...'"
                  ></textarea>
                </div>

                <button type="submit" class="btn btn--primary btn--lg" :disabled="isSubmitting">
                  <span v-if="isSubmitting">{{ locale === 'en' ? 'Sending...' : '发送中...' }}</span>
                  <span v-else>{{ t('contact.form.submit') }}</span>
                </button>
              </form>

              <div v-else class="contact-success">
                <div class="contact-success__icon">✓</div>
                <h3>{{ locale === 'en' ? 'Message Sent!' : '消息已发送！' }}</h3>
                <p>{{ locale === 'en' ? 'We\'ll get back to you within 24 hours.' : '我们将在24小时内回复您。' }}</p>
              </div>
            </Transition>
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

/* Hero */
.contact-hero {
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 80px;
  padding-bottom: var(--spacing-20);
}

.contact-hero__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent-purple) 100%);
}

.contact-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  padding: var(--spacing-8) 0;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

@media (max-width: 768px) {
  .contact-hero {
    padding-top: 70px;
    padding-bottom: var(--spacing-16);
  }
}

.contact-hero__content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-hero__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: var(--color-white);
  margin-bottom: var(--spacing-4);
}

.contact-hero__subtitle {
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
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

/* Form */
.contact-form {
  background: var(--color-white);
  padding: var(--spacing-10);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
}

.form-group {
  margin-bottom: var(--spacing-6);
}

.form-group label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-4);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-accent-purple);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

/* Success State */
.contact-success {
  background: var(--color-white);
  padding: var(--spacing-16);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  text-align: center;
}

.contact-success__icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--color-success), #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--color-white);
  margin: 0 auto var(--spacing-6);
}

.contact-success h3 {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-2);
}

.contact-success p {
  color: var(--color-gray-600);
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
