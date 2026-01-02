<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSEO } from '@/utils/seo'
import PageHero from '@/components/common/PageHero.vue'
import TallyForm from '@/components/common/TallyForm.vue'

const { t, locale } = useI18n()

useSEO({
  title: locale.value === 'en' ? 'Contact Us' : '联系我们',
  description: locale.value === 'en'
    ? 'Ready to explore the China and APAC market? Get in touch with our team. We have offices in Shenzhen, Shanghai, Hong Kong, Taipei, and Seoul.'
    : '准备好探索中国和亚太市场了吗？联系我们。我们在深圳、上海、香港、台北和首尔设有办公室。',
  path: '/contact'
})

</script>

<template>
  <main class="contact-page">
    <!-- Hero -->
    <PageHero
      :label="locale === 'en' ? 'GET IN TOUCH' : '联系我们'"
      :title="t('contact.hero.title')"
      :subtitle="t('contact.hero.subtitle')"
      background-type="image"
      :background-image="locale === 'en' ? '/images/contact-hero-1.jpg' : '/images/contact-hero-2.jpg'"
      :show-logo="false"
    />

    <!-- Contact Section -->
    <section class="contact-section section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <TallyForm form-id="lbqLJB" />
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <template v-if="locale === 'zh'">
              <!-- 中文版：三个联系方法 -->
              <div class="contact-method">
                <h3 class="contact-method__title">消费者联系</h3>
                <p class="contact-method__desc">产品咨询、售后服务等</p>
                <a href="mailto:service@sweekli.com" class="contact-method__email">service@sweekli.com</a>
              </div>

              <div class="contact-method">
                <h3 class="contact-method__title">市场合作联系</h3>
                <p class="contact-method__desc">媒体合作、品牌合作等</p>
                <a href="mailto:marketing@sweekli.com" class="contact-method__email">marketing@sweekli.com</a>
              </div>

              <div class="contact-method">
                <h3 class="contact-method__title">销售合作联系</h3>
                <p class="contact-method__desc">品牌代理、渠道合作等</p>
                <a href="mailto:sales@sweekli.com" class="contact-method__email">sales@sweekli.com</a>
              </div>

              <div class="contact-info__offices">
                <h3 class="contact-info__title">{{ t('contact.offices.title') }}</h3>
                <div class="offices-list">
                  <span class="office-location">{{ t('contact.offices.shenzhen') }}</span>
                  <span class="office-location">{{ t('contact.offices.shanghai') }}</span>
                  <span class="office-location">{{ t('contact.offices.hongkong') }}</span>
                  <span class="office-location">{{ t('contact.offices.taipei') }}</span>
                  <span class="office-location">{{ t('contact.offices.seoul') }}</span>
                </div>
              </div>
            </template>

            <template v-else>
              <!-- 英文版：保持原有结构 -->
              <h3 class="contact-info__title">{{ t('contact.offices.title') }}</h3>
              
              <div class="office-card">
                <h4 class="office-card__name">{{ t('contact.offices.shenzhen') }}</h4>
                <p class="office-card__address">Shenzhen</p>
                <a href="mailto:contact@sweekli.com" class="office-card__email">contact@sweekli.com</a>
              </div>

              <div class="office-card">
                <h4 class="office-card__name">{{ t('contact.offices.shanghai') }}</h4>
                <p class="office-card__address">Shanghai</p>
                <a href="mailto:shanghai@sweekli.com" class="office-card__email">shanghai@sweekli.com</a>
              </div>

              <div class="office-card">
                <h4 class="office-card__name">{{ t('contact.offices.hongkong') }}</h4>
                <p class="office-card__address">Hong Kong</p>
                <a href="mailto:hk@sweekli.com" class="office-card__email">hk@sweekli.com</a>
              </div>

              <div class="office-card">
                <h4 class="office-card__name">{{ t('contact.offices.taipei') }}</h4>
                <p class="office-card__address">Taipei</p>
                <a href="mailto:taipei@sweekli.com" class="office-card__email">taipei@sweekli.com</a>
              </div>

              <div class="office-card">
                <h4 class="office-card__name">{{ t('contact.offices.seoul') }}</h4>
                <p class="office-card__address">Seoul (Coming Soon)</p>
              </div>

              <div class="contact-info__general">
                <h4>General Inquiries</h4>
                <a href="mailto:contact@sweekli.com">contact@sweekli.com</a>
              </div>
            </template>
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

/* 中文版联系方法 */
.contact-method {
  background: var(--color-gray-50);
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-6);
}

.contact-method__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.contact-method__desc {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-3);
}

.contact-method__email {
  font-size: var(--font-size-base);
  color: var(--color-accent-purple);
  text-decoration: none;
  transition: color var(--transition-fast);
  display: block;
}

.contact-method__email:hover {
  color: var(--color-primary);
}

.contact-info__offices {
  margin-top: var(--spacing-8);
  padding-top: var(--spacing-8);
  border-top: 1px solid var(--color-gray-200);
}

.offices-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  margin-top: var(--spacing-4);
}

.office-location {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--color-gray-100);
  border-radius: var(--radius-lg);
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
