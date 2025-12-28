<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { verifyProduct as verifyProductAPI } from '@/utils/saas-integration'

const { t, locale } = useI18n()

const code = ref('')
const isVerifying = ref(false)
const result = ref<'authentic' | 'invalid' | null>(null)
const errorMessage = ref('')

// SEO配置
useHead({
  title: locale.value === 'en' 
    ? 'Verify Product - Sweekli' 
    : '正品查询 - 思维颗粒',
  meta: [
    {
      name: 'description',
      content: locale.value === 'en'
        ? 'Verify the authenticity of your Sweekli product. Enter your product code to check if your product is genuine.'
        : '验证您的思维颗粒产品的真实性。请输入产品验证码进行查询。'
    }
  ]
})

const verifyProduct = async () => {
  if (!code.value.trim()) return
  
  isVerifying.value = true
  result.value = null
  errorMessage.value = ''
  
  try {
    const response = await verifyProductAPI(code.value.trim())
    const data = await response.json()
    
    if (response.ok && data.success !== false) {
      // 根据 API 响应判断结果
      result.value = data.authentic === true ? 'authentic' : 'invalid'
    } else {
      result.value = 'invalid'
      errorMessage.value = data.message || (locale.value === 'en' 
        ? 'Verification failed. Please check the code.' 
        : '验证失败，请检查验证码。')
    }
  } catch (error) {
    console.error('Verify error:', error)
    result.value = 'invalid'
    errorMessage.value = locale.value === 'en' 
      ? 'Network error. Please try again.' 
      : '网络错误，请稍后重试。'
  } finally {
    isVerifying.value = false
  }
}

const reset = () => {
  code.value = ''
  result.value = null
  errorMessage.value = ''
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-section">
      <div class="container">
        <div class="auth-card">
          <div class="auth-header">
            <div class="auth-logo">
              <img 
                src="/画板 67.svg" 
                alt="Sweekli"
              />
            </div>
            <h1 class="auth-title">{{ t('auth.title') }}</h1>
            <p class="auth-subtitle">{{ t('auth.subtitle') }}</p>
          </div>

          <Transition name="fade" mode="out-in">
            <!-- Input State -->
            <div v-if="!result" class="auth-form">
              <div class="auth-input-group">
                <input 
                  v-model="code"
                  type="text"
                  :placeholder="t('auth.placeholder')"
                  class="auth-input"
                  @keyup.enter="verifyProduct"
                />
                <button 
                  class="auth-submit"
                  :disabled="isVerifying || !code.trim()"
                  @click="verifyProduct"
                >
                  <span v-if="isVerifying" class="auth-spinner"></span>
                  <span v-else>{{ t('auth.button') }}</span>
                </button>
              </div>
              
              <p class="auth-hint">
                {{ locale === 'en' 
                  ? 'Enter the unique code found on your product packaging.'
                  : '请输入产品包装上的唯一验证码。'
                }}
              </p>
              <p v-if="errorMessage" class="auth-error">{{ errorMessage }}</p>
            </div>

            <!-- Result State -->
            <div v-else class="auth-result" :class="{ 'auth-result--success': result === 'authentic' }">
              <div class="auth-result__icon">
                <span v-if="result === 'authentic'">✓</span>
                <span v-else>✕</span>
              </div>
              <h2 class="auth-result__title">
                {{ result === 'authentic' ? t('auth.result.authentic') : t('auth.result.invalid') }}
              </h2>
              <p class="auth-result__desc">
                {{ result === 'authentic' ? t('auth.result.authenticDesc') : t('auth.result.invalidDesc') }}
              </p>
              <button class="btn btn--secondary" @click="reset">
                {{ locale === 'en' ? 'Verify Another' : '再次验证' }}
              </button>
            </div>
          </Transition>
        </div>

        <!-- Security Badge -->
        <div class="auth-security">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>{{ locale === 'en' ? 'Secure Verification' : '安全验证' }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, var(--color-gray-50) 0%, var(--color-white) 100%);
  padding: var(--spacing-20) 0;
}

.auth-section {
  width: 100%;
}

.auth-card {
  max-width: 500px;
  margin: 0 auto;
  background: var(--color-white);
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-12);
  text-align: center;
}

/* Header */
.auth-logo {
  margin-bottom: var(--spacing-6);
}

.auth-logo img {
  height: 24px;
  margin: 0 auto;
}

.auth-title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.auth-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-8);
}

/* Form */
.auth-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
  width: 100%;
}

@media (min-width: 640px) {
  .auth-input-group {
    flex-direction: row;
  }
}

.auth-input {
  flex: 1;
  padding: var(--spacing-4) var(--spacing-5);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-base);
  text-align: center;
  letter-spacing: 0.1em;
  transition: border-color var(--transition-fast);
  width: 100%;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .auth-input {
    width: auto;
  }
}

.auth-input:focus {
  border-color: var(--color-accent-purple);
}

.auth-submit {
  padding: var(--spacing-4) var(--spacing-6);
  background: linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-accent-purple-dark) 100%);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-xl);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 100px;
  width: 100%;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .auth-submit {
    width: auto;
  }
}


.auth-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(111, 123, 212, 0.3);
}

.auth-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-hint {
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
}

.auth-error {
  margin-top: var(--spacing-3);
  font-size: var(--font-size-sm);
  color: var(--color-error);
  text-align: center;
}

/* Result */
.auth-result {
  padding: var(--spacing-6) 0;
}

.auth-result__icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--color-white);
  background: var(--color-error);
}

.auth-result--success .auth-result__icon {
  background: linear-gradient(135deg, var(--color-success), #059669);
}

.auth-result__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-2);
}

.auth-result--success .auth-result__title {
  color: var(--color-success);
}

.auth-result__desc {
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-6);
}

/* Security Badge */
.auth-security {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  margin-top: var(--spacing-8);
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
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
