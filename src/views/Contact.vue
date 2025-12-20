<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { submitContactForm } from '@/utils/saas-integration'
import PageHero from '@/components/common/PageHero.vue'

const { t, locale } = useI18n()

// Form state
const form = ref({
  name: '',
  email: '',
  company: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    const response = await submitContactForm({
      name: form.value.name,
      email: form.value.email,
      company: form.value.company,
      message: form.value.message
    })

    if (response.ok) {
      isSubmitted.value = true
      form.value = { name: '', email: '', company: '', message: '' }
    } else {
      const data = await response.json().catch(() => ({}))
      errorMessage.value = data.error || (locale.value === 'en' 
        ? 'Failed to send message. Please try again.' 
        : '发送失败，请稍后重试。')
    }
  } catch (error) {
    console.error('Submit error:', error)
    errorMessage.value = locale.value === 'en' 
      ? 'Network error. Please check your connection.' 
      : '网络错误，请检查您的网络连接。'
  } finally {
    isSubmitting.value = false
  }
}

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
                <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
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

.form-error {
  margin-top: var(--spacing-4);
  color: var(--color-error);
  font-size: var(--font-size-sm);
  text-align: center;
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
