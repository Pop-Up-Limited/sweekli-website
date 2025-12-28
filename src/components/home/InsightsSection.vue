<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { getImagePath } from '@/utils/imagePath'
import { fetchBlogPosts, type BlogPost } from '@/utils/contentful-api'

const { locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// 静态文章数据作为后备
const staticArticles = computed(() => [
  {
    id: '1',
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
    id: '2',
    title: locale.value === 'en'
      ? 'Here\'s What 10 New Outdoor Lifestyle Brands Are Bringing for Spring/Summer'
      : '10个新户外生活方式品牌为春夏带来的新趋势',
    excerpt: locale.value === 'en'
      ? 'Today, "outdoors" is no longer just about camping, hiking, climbing, or fishing. The concept now stretches to outdoor living at home...'
      : '如今，"户外"不再只是关于露营、徒步、攀岩或钓鱼。这个概念现在延伸到家庭户外生活...',
    date: '2025-08-13',
    category: locale.value === 'en' ? 'Lifestyle' : '生活方式',
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Missions 1.jpg'),
    slug: '10-new-outdoor-lifestyle-brands-spring-summer'
  },
  {
    id: '3',
    title: locale.value === 'en'
      ? 'How Is Louis Vuitton Deepening Its Brand Influence in China?'
      : '路易威登如何深化其在中国的影响力？',
    excerpt: locale.value === 'en'
      ? 'An in-depth look at how luxury brands are adapting their strategies to connect with Chinese consumers in new and meaningful ways.'
      : '深入探讨奢侈品牌如何调整策略，以新的、有意义的方式与中国消费者建立联系。',
    date: '2025-06-27',
    category: locale.value === 'en' ? 'Luxury' : '奢侈品',
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Missions 2.jpg'),
    slug: 'louis-vuitton-deepening-brand-influence-china'
  }
])

// 使用 ref 来存储文章，初始值为静态数据
const articles = ref<typeof staticArticles.value | BlogPost[]>(staticArticles.value)

// 根据当前语言获取文章（只取前3篇）
const currentLocale = computed(() => locale.value === 'en' ? 'en' : 'zh')
const latestArticles = computed(() => articles.value.slice(0, 3))

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  if (locale.value === 'en') {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

useIntersectionObserver(
  sectionRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      isVisible.value = true
    }
  },
  { threshold: 0.2 }
)

// 加载文章 - 尝试从 Contentful 加载，如果失败则使用静态数据
onMounted(async () => {
  try {
    console.log('InsightsSection: Loading Contentful posts for locale:', currentLocale.value)
    const posts = await fetchBlogPosts(currentLocale.value)
    console.log('InsightsSection: Fetched posts:', posts)
    // 如果 Contentful 有数据，使用 Contentful 数据；否则保持静态数据
    if (posts && posts.length > 0) {
      console.log('InsightsSection: Using Contentful posts, count:', posts.length)
      articles.value = posts
    } else {
      console.log('InsightsSection: No Contentful posts found, using static data')
    }
  } catch (err) {
    console.error('InsightsSection: Failed to load articles from Contentful, using static data:', err)
    // 静默失败，继续使用静态数据
  }
})
</script>

<template>
  <section ref="sectionRef" class="insights-section section">
    <div class="container">
      <!-- Header -->
      <div class="insights-section__header" :class="{ 'is-visible': isVisible }">
        <span class="insights-section__label">{{ locale === 'en' ? 'INSIGHTS' : '行业洞察' }}</span>
        <h2 class="insights-section__title">
          {{ locale === 'en' ? 'Latest Market Insights' : '最新市场洞察' }}
        </h2>
        <p class="insights-section__subtitle">
          {{ locale === 'en'
            ? 'Stay updated with the latest trends, strategies, and insights from China and APAC market.'
            : '了解中国电商市场的最新趋势、策略和洞察。'
          }}
        </p>
      </div>

      <!-- Articles Grid -->
      <div class="insights-section__grid" :class="{ 'is-visible': isVisible }">
        <article 
          v-for="(article, index) in latestArticles" 
          :key="article.id"
          class="insight-card"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="insight-card__wrapper">
            <div class="insight-card__image">
              <img :src="article.image" :alt="article.title" loading="lazy" />
              <div class="insight-card__category">{{ article.category }}</div>
            </div>
            <div class="insight-card__content">
              <time class="insight-card__date">{{ formatDate(article.date) }}</time>
              <h3 class="insight-card__title">{{ article.title }}</h3>
              <p class="insight-card__excerpt">{{ article.excerpt }}</p>
            </div>
          </div>
        </article>
      </div>

      <!-- View All Link -->
      <div class="insights-section__footer" :class="{ 'is-visible': isVisible }">
        <RouterLink to="/insights" class="insights-section__cta">
          {{ locale === 'en' ? 'View All Insights' : '查看所有洞察' }}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.insights-section {
  padding: var(--spacing-24) 0;
  background: var(--color-white);
}

.insights-section__header {
  text-align: center;
  margin-bottom: var(--spacing-12);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.insights-section__header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.insights-section__label {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-purple);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: var(--spacing-4);
}

.insights-section__title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-4);
}

.insights-section__subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Articles Grid */
.insights-section__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-10);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}

.insights-section__grid.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: 768px) {
  .insights-section__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .insights-section__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Insight Card */
.insight-card {
  background: var(--color-white);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  animation-delay: var(--delay, 0s);
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 500px; /* 固定高度，用于首页裁剪 */
}

.insight-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.insight-card__wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.insight-card__image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.insight-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.insight-card:hover .insight-card__image img {
  transform: scale(1.1);
}

.insight-card__category {
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
  backdrop-filter: blur(10px);
}

.insight-card__content {
  padding: var(--spacing-6);
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.insight-card__date {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.insight-card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.insight-card__excerpt {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.6;
  margin-bottom: var(--spacing-4);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}


/* Footer CTA */
.insights-section__footer {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s,
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s;
}

.insights-section__footer.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.insights-section__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-4) var(--spacing-8);
  background: linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-accent-purple-dark) 100%);
  color: var(--color-white);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.insights-section__cta:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  gap: var(--spacing-3);
}

.insights-section__cta svg {
  transition: transform var(--transition-fast);
}

.insights-section__cta:hover svg {
  transform: translateX(4px);
}
</style>

