<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSEO } from '@/utils/seo'
import HeroSection from '@/components/home/HeroSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import HowItWorks from '@/components/home/HowItWorks.vue'
import WhyChina from '@/components/home/WhyChina.vue'
import BrandsShowcase from '@/components/home/BrandsShowcase.vue'
import SuccessStories from '@/components/home/SuccessStories.vue'
import InsightsSection from '@/components/home/InsightsSection.vue'
import CTASection from '@/components/home/CTASection.vue'
import ServicesOverview from '@/components/home/ServicesOverview.vue'
import JoinUsSection from '@/components/home/JoinUsSection.vue'

const { locale, t } = useI18n()

useSEO({
  title: locale.value === 'en' 
    ? 'Your Bridge to China & the APAC Billion-Dollar Market'
    : '全球生活方式品牌中国与亚太市场增长平台',
  description: locale.value === 'en'
    ? 'We help global lifestyle, fashion and tech brands enter, scale and succeed in China and APAC market through end-to-end distribution and marketing capabilities.'
    : '我们将世界范围内兼具设计感、品质与创新力的品牌带入中国与亚洲市场，通过电商、内容、营销与渠道运营，为消费者呈现更美好、更精致的生活方式。',
  path: '/'
})
</script>

<template>
  <main class="home">
    <HeroSection />
    <StatsSection />
    <!-- English version: HowItWorks, WhyChina, SuccessStories, InsightsSection -->
    <!-- Chinese version: ServicesOverview, JoinUsSection -->
    <template v-if="locale === 'en'">
      <WhyChina />
      <BrandsShowcase />
      <SuccessStories />
      <HowItWorks />
      <InsightsSection />
    </template>
    <template v-else>
      <BrandsShowcase />
      <ServicesOverview />
      <JoinUsSection />
    </template>
    <CTASection />
  </main>
</template>

<style scoped>
.home {
  overflow-x: hidden;
}
</style>
