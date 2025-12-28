<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getImagePath } from '@/utils/imagePath'
import { useSEO } from '@/utils/seo'
import PageHero from '@/components/common/PageHero.vue'
import { fetchBlogPosts, type BlogPost } from '@/utils/contentful-api'

const { t, locale } = useI18n()

useSEO({
  title: locale.value === 'en' ? 'Market Insights & Trends' : '行业洞察',
  description: locale.value === 'en'
    ? 'Stay updated with the latest trends, strategies, and insights from China and APAC market.'
    : '了解中国和亚太市场的最新趋势、策略和洞察。',
  path: '/insights'
})
const router = useRouter()

// 静态文章数据作为后备
const staticArticles = computed(() => [
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
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Missions 1.jpg'),
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
    image: getImagePath('/images/Sweekli 官网介绍 图片素材/3 About/Our Missions 2.jpg'),
    slug: 'louis-vuitton-deepening-brand-influence-china'
  }
])

// 使用 ref 来存储文章，初始值为静态数据
const articles = ref<typeof staticArticles.value | BlogPost[]>(staticArticles.value)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  if (locale.value === 'en') {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

// 不再需要跳转到详情页

// 尝试从 Contentful 加载文章，如果失败则使用静态数据
onMounted(async () => {
  try {
    const currentLocale = locale.value === 'en' ? 'en' : 'zh'
    console.log('Loading Contentful posts for locale:', currentLocale)
    const posts = await fetchBlogPosts(currentLocale)
    console.log('Fetched posts:', posts)
    // 如果 Contentful 有数据，使用 Contentful 数据；否则保持静态数据
    if (posts && posts.length > 0) {
      console.log('Using Contentful posts, count:', posts.length)
      articles.value = posts
    } else {
      console.log('No Contentful posts found, using static data')
    }
  } catch (err) {
    console.error('Failed to load articles from Contentful, using static data:', err)
    // 静默失败，继续使用静态数据
  }
})

</script>

<template>
  <main class="insights-page">
    <!-- Hero Section -->
    <PageHero
      :label="locale === 'en' ? 'INSIGHTS' : '行业洞察'"
      :title="t('insights.hero.title')"
      :subtitle="t('insights.hero.subtitle')"
      background-type="gradient"
    />

    <!-- Articles Grid -->
    <section class="insights-section section">
      <div class="container">
        <div class="insights-grid">
          <article 
            v-for="article in articles" 
            :key="article.id"
            class="article-card"
          >
            <div class="article-card__image">
              <img :src="article.image" :alt="article.title" loading="lazy" />
              <div class="article-card__category">{{ article.category }}</div>
            </div>
            <div class="article-card__content">
              <time class="article-card__date">{{ formatDate(article.date) }}</time>
              <h3 class="article-card__title">{{ article.title }}</h3>
              <p class="article-card__excerpt">{{ article.excerpt }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.insights-page {
  padding-top: 0;
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
  display: flex;
  flex-direction: column;
  /* 不设置固定高度，让内容完整显示 */
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
  /* 不限制行数，显示完整内容 */
}
</style>

