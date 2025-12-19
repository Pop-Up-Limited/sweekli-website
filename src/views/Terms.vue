<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
  <main class="legal-page">
    <div class="container">
      <h1 class="legal-title">{{ locale === 'en' ? 'Terms of Service' : '服务条款' }}</h1>
      <p class="legal-updated">{{ locale === 'en' ? 'Last updated: December 2025' : '最后更新：2025年12月' }}</p>

      <div class="legal-content">
        <section class="legal-section">
          <h2>{{ locale === 'en' ? '1. Acceptance of Terms' : '1. 条款接受' }}</h2>
          <p>
            {{ locale === 'en' 
              ? 'By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.'
              : '通过访问或使用我们的服务，您同意受这些服务条款以及所有适用法律法规的约束。'
            }}
          </p>
        </section>

        <section class="legal-section">
          <h2>{{ locale === 'en' ? '2. Use of Services' : '2. 服务使用' }}</h2>
          <p>
            {{ locale === 'en'
              ? 'You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account.'
              : '您同意仅出于合法目的并按照本条款使用我们的服务。您有责任维护您账户的机密性。'
            }}
          </p>
        </section>

        <section class="legal-section">
          <h2>{{ locale === 'en' ? '3. Intellectual Property' : '3. 知识产权' }}</h2>
          <p>
            {{ locale === 'en'
              ? 'All content, trademarks, and intellectual property on our platform are owned by Sweekli or our partners. Unauthorized use is prohibited.'
              : '我们平台上的所有内容、商标和知识产权均归思维颗粒或我们的合作伙伴所有。禁止未经授权的使用。'
            }}
          </p>
        </section>

        <section class="legal-section">
          <h2>{{ locale === 'en' ? '4. Limitation of Liability' : '4. 责任限制' }}</h2>
          <p>
            {{ locale === 'en'
              ? 'Sweekli shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.'
              : '思维颗粒不对因您使用我们的服务而产生的任何间接、附带、特殊或后果性损害承担责任。'
            }}
          </p>
        </section>

        <section class="legal-section">
          <h2>{{ locale === 'en' ? '5. Contact Us' : '5. 联系我们' }}</h2>
          <p>
            {{ locale === 'en'
              ? 'If you have any questions about these Terms of Service, please contact us at legal@sweekli.com.'
              : '如果您对本服务条款有任何疑问，请通过 legal@sweekli.com 联系我们。'
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



