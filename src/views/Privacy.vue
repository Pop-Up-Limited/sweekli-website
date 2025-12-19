<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
  <main class="legal-page">
    <div class="container">
      <h1 class="legal-title">{{ locale === 'en' ? 'Privacy Policy' : '隐私政策' }}</h1>
      <p class="legal-updated">{{ locale === 'en' ? 'Last updated: December 2025' : '最后更新：2025年12月' }}</p>

      <div class="legal-content">
        <section class="legal-section">
          <h2>{{ locale === 'en' ? '1. Information We Collect' : '1. 我们收集的信息' }}</h2>
          <p>
            {{ locale === 'en' 
              ? 'We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us.'
              : '我们收集您直接提供给我们的信息，例如您填写联系表单、订阅我们的通讯或与我们沟通时提供的信息。'
            }}
          </p>
        </section>

        <section class="legal-section">
          <h2>{{ locale === 'en' ? '2. How We Use Your Information' : '2. 我们如何使用您的信息' }}</h2>
          <p>
            {{ locale === 'en'
              ? 'We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.'
              : '我们使用收集的信息来提供、维护和改进我们的服务，与您沟通，并遵守法律义务。'
            }}
          </p>
        </section>

        <section class="legal-section">
          <h2>{{ locale === 'en' ? '3. Information Sharing' : '3. 信息共享' }}</h2>
          <p>
            {{ locale === 'en'
              ? 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.'
              : '除本政策所述情况外，未经您的同意，我们不会出售、交易或以其他方式将您的个人信息转让给第三方。'
            }}
          </p>
        </section>

        <section class="legal-section">
          <h2>{{ locale === 'en' ? '4. Data Security' : '4. 数据安全' }}</h2>
          <p>
            {{ locale === 'en'
              ? 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
              : '我们采取适当的安全措施，保护您的个人信息免受未经授权的访问、更改、披露或销毁。'
            }}
          </p>
        </section>

        <section class="legal-section">
          <h2>{{ locale === 'en' ? '5. Contact Us' : '5. 联系我们' }}</h2>
          <p>
            {{ locale === 'en'
              ? 'If you have any questions about this Privacy Policy, please contact us at privacy@sweekli.com.'
              : '如果您对本隐私政策有任何疑问，请通过 privacy@sweekli.com 联系我们。'
            }}
          </p>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.legal-page {
  padding: var(--spacing-32) 0 var(--spacing-20);
}

.legal-title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.legal-updated {
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-12);
}

.legal-content {
  max-width: 800px;
}

.legal-section {
  margin-bottom: var(--spacing-10);
}

.legal-section h2 {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-4);
}

.legal-section p {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  line-height: 1.8;
}
</style>



