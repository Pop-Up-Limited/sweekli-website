<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { getImagePath } from '@/utils/imagePath'

const { t, locale } = useI18n()
const router = useRouter()

const heroRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

// Blog articles from original website
const articles = computed(() => [
  {
    id: 1,
    title: locale.value === 'en' 
      ? 'Anta and MUSINSA: Leading the Next Wave of Fashion in China'
      : '安踏与MUSINSA：引领中国时尚新浪潮',
    excerpt: locale.value === 'en'
      ? 'Exploring how these brands are reshaping the fashion landscape in China through innovative strategies and consumer engagement.'
      : '探索这些品牌如何通过创新策略和消费者参与重塑中国时尚格局。',
    date: '2025-09-19',
    category: locale.value === 'en' ? 'Fashion' : '时尚',
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/1 home banner/1-PC.jpg'),
    slug: 'anta-musinsa-leading-next-wave-fashion-china'
  },
  {
    id: 2,
    title: locale.value === 'en'
      ? 'Here\'s What 10 New Outdoor Lifestyle Brands Are Bringing for Spring/Summer'
      : '10个新户外生活方式品牌为春夏带来的新趋势',
    excerpt: locale.value === 'en'
      ? 'Today, "outdoors" is no longer just about camping, hiking, climbing, or fishing. The concept now stretches to outdoor living at home, camping-inspired coffee shops and bars, and a more integrated commercial ecosystem.'
      : '如今，"户外"不再只是关于露营、徒步、攀岩或钓鱼。这个概念现在延伸到家庭户外生活、露营风格的咖啡店和酒吧，以及更融合的商业生态系统。',
    date: '2025-08-13',
    category: locale.value === 'en' ? 'Lifestyle' : '生活方式',
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-12_03.jpg'),
    slug: '10-new-outdoor-lifestyle-brands-spring-summer'
  },
  {
    id: 3,
    title: locale.value === 'en'
      ? 'How Is Louis Vuitton Deepening Its Brand Influence in China?'
      : '路易威登如何深化其在中国的影响力？',
    excerpt: locale.value === 'en'
      ? 'An in-depth look at how luxury brands are adapting their strategies to connect with Chinese consumers in new and meaningful ways.'
      : '深入探讨奢侈品牌如何调整策略，以新的、有意义的方式与中国消费者建立联系。',
    date: '2025-06-27',
    category: locale.value === 'en' ? 'Luxury' : '奢侈品',
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-12_02.jpg'),
    slug: 'louis-vuitton-deepening-brand-influence-china'
  }
])

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  if (locale.value === 'en') {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

const viewArticle = (article: typeof articles.value[0]) => {
  // Navigate to article detail page or open in modal
  // For now, we'll use a placeholder API endpoint
  router.push(`/insights/${article.slug}`)
}

useIntersectionObserver(
  heroRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) isHeroVisible.value = true
  },
  { threshold: 0.2 }
)
</script>

<template>
  <main class="insights-page">
    <!-- Hero Section -->
    <section ref="heroRef" class="insights-hero">
      <div class="insights-hero__bg">
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
      </div>
      <div class="container insights-hero__content" :class="{ 'is-visible': isHeroVisible }">
        <span class="insights-hero__label">{{ locale === 'en' ? 'INSIGHTS' : '行业洞察' }}</span>
        <h1 class="insights-hero__title">{{ t('insights.hero.title') }}</h1>
        <p class="insights-hero__subtitle">{{ t('insights.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="insights-section section">
      <div class="container">
        <div class="insights-grid">
          <article 
            v-for="article in articles" 
            :key="article.id"
            class="article-card"
            @click="viewArticle(article)"
          >
            <div class="article-card__image">
              <img :src="article.image" :alt="article.title" loading="lazy" />
              <div class="article-card__category">{{ article.category }}</div>
            </div>
            <div class="article-card__content">
              <time class="article-card__date">{{ formatDate(article.date) }}</time>
              <h3 class="article-card__title">{{ article.title }}</h3>
              <p class="article-card__excerpt">{{ article.excerpt }}</p>
              <a class="article-card__link">
                {{ locale === 'en' ? 'Read more' : '阅读更多' }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </article>
        </div>

        <!-- Load More / View All -->
        <div class="insights-actions">
          <button class="btn btn--secondary">
            {{ locale === 'en' ? 'View All Articles' : '查看所有文章' }}
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.insights-page {
  padding-top: 0;
}

/* Hero */
.insights-hero {
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 80px;
  padding-bottom: var(--spacing-20);
}

@media (max-width: 768px) {
  .insights-hero {
    padding-top: 70px;
    padding-bottom: var(--spacing-16);
  }
}

.insights-hero__bg {
  position: absolute;
  inset: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #282E45 0%, #3D4565 40%, #6F7BD4 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(111, 123, 212, 0.4) 0%, transparent 50%);
  animation: floatPattern 15s ease-in-out infinite;
}

@keyframes floatPattern {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.05) rotate(1deg); }
}

.insights-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.insights-hero__content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.insights-hero__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: var(--spacing-4);
}

.insights-hero__title {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  color: var(--color-white);
}

.insights-hero__subtitle {
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.7;
}

/* Articles Section */
.insights-section {
  padding: var(--spacing-24) 0;
  background: var(--color-white);
}

.insights-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-12);
}

@media (min-width: 768px) {
  .insights-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .insights-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Article Card */
.article-card {
  background: var(--color-white);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.article-card__image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.article-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.article-card:hover .article-card__image img {
  transform: scale(1.1);
}

.article-card__category {
  position: absolute;
  top: var(--spacing-4);
  left: var(--spacing-4);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(40, 46, 69, 0.9);
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.article-card__content {
  padding: var(--spacing-6);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.article-card__date {
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.article-card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
  line-height: 1.4;
}

.article-card__excerpt {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.6;
  margin-bottom: var(--spacing-4);
  flex: 1;
}

.article-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-accent-purple);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.article-card__link:hover {
  gap: var(--spacing-3);
  color: var(--color-primary);
}

.article-card__link svg {
  transition: transform var(--transition-fast);
}

.article-card__link:hover svg {
  transform: translateX(4px);
}

/* Actions */
.insights-actions {
  text-align: center;
  padding-top: var(--spacing-8);
}
</style>

