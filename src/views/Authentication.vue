<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '@vueuse/head'
import { verifyProduct as verifyProductAPI } from '@/utils/saas-integration'

const { t, locale } = useI18n()

const code = ref('')
const isVerifying = ref(false)
const result = ref<'authentic' | 'invalid' | null>(null)
const errorMessage = ref('')

// Camera scanning
const showCamera = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const streamRef = ref<MediaStream | null>(null)
const isScanning = ref(false)
const scanResult = ref('')

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

// Camera functions
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' } // Use back camera on mobile
    })
    streamRef.value = stream
    if (videoRef.value) {
      videoRef.value.srcObject = stream
      showCamera.value = true
      isScanning.value = true
    }
  } catch (error) {
    console.error('Camera access error:', error)
    errorMessage.value = locale.value === 'en'
      ? 'Unable to access camera. Please enter code manually.'
      : '无法访问摄像头，请手动输入验证码。'
  }
}

const stopCamera = () => {
  if (streamRef.value) {
    streamRef.value.getTracks().forEach(track => track.stop())
    streamRef.value = null
  }
  showCamera.value = false
  isScanning.value = false
}

// Check if mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (typeof window !== 'undefined' && window.innerWidth < 768)

const scanQRCode = () => {
  // QR code scanning logic would go here
  // For now, this is a placeholder - you may need to integrate a QR code library
  // like jsQR or html5-qrcode
  if (scanResult.value) {
    code.value = scanResult.value
    stopCamera()
    verifyProduct()
  }
}

onMounted(() => {
  // Cleanup on unmount
})

onUnmounted(() => {
  stopCamera()
})
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
            <div v-if="!result && !showCamera" class="auth-form">
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
              
              <!-- Camera button for mobile -->
              <button 
                v-if="isMobile"
                class="auth-camera-btn"
                @click="startCamera"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                {{ locale === 'en' ? 'Scan QR Code' : '扫描二维码' }}
              </button>
              
              <p class="auth-hint">
                {{ locale === 'en' 
                  ? 'Enter the unique code found on your product packaging.'
                  : '请输入产品包装上的唯一验证码。'
                }}
              </p>
              <p v-if="errorMessage" class="auth-error">{{ errorMessage }}</p>
            </div>

            <!-- Camera View -->
            <div v-if="showCamera" class="auth-camera">
              <div class="auth-camera__header">
                <button class="auth-camera__close" @click="stopCamera">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
                <h3 class="auth-camera__title">
                  {{ locale === 'en' ? 'Scan QR Code' : '扫描二维码' }}
                </h3>
              </div>
              <video 
                ref="videoRef"
                class="auth-camera__video"
                autoplay
                playsinline
              ></video>
              <div class="auth-camera__overlay">
                <div class="auth-camera__frame"></div>
              </div>
              <p class="auth-camera__hint">
                {{ locale === 'en' 
                  ? 'Position the QR code within the frame'
                  : '请将二维码对准扫描框'
                }}
              </p>
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
  max-width: 100%;
}

@media (min-width: 640px) {
  .auth-input {
    width: auto;
    max-width: 300px;
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
  white-space: nowrap;
}

@media (min-width: 640px) {
  .auth-submit {
    width: auto;
    flex-shrink: 0;
  }
}

/* Camera Button */
.auth-camera-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  width: 100%;
  padding: var(--spacing-4) var(--spacing-6);
  margin-top: var(--spacing-4);
  background: var(--color-gray-100);
  color: var(--color-primary);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.auth-camera-btn:hover {
  background: var(--color-gray-200);
  border-color: var(--color-accent-purple);
}

/* Camera View */
.auth-camera {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.auth-camera__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.auth-camera__close {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: var(--color-white);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.auth-camera__close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.auth-camera__title {
  font-size: var(--font-size-lg);
  color: var(--color-white);
  margin: 0;
  flex: 1;
  text-align: center;
}

.auth-camera__video {
  width: 100%;
  height: auto;
  display: block;
  background: var(--color-gray-900);
}

.auth-camera__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.auth-camera__frame {
  width: 250px;
  height: 250px;
  border: 3px solid var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}

.auth-camera__hint {
  position: absolute;
  bottom: var(--spacing-6);
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-lg);
  z-index: 10;
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
