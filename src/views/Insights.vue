<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import PageHero from '@/components/common/PageHero.vue'
import { getBlogArticles, type BlogArticle } from '@/utils/contentful'

const { t, locale } = useI18n()
const router = useRouter()

// 文章数据
const articles = ref<BlogArticle[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// 获取文章列表
const fetchArticles = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const localeCode = locale.value === 'zh' ? 'zh' : 'en'
    const fetchedArticles = await getBlogArticles(localeCode, {
      limit: 50, // 获取所有文章
      orderBy: 'date'
    })
    
    articles.value = fetchedArticles
  } catch (err) {
    console.error('Failed to fetch articles:', err)
    error.value = locale.value === 'en' 
      ? 'Failed to load articles. Please try again later.' 
      : '加载文章失败，请稍后重试。'
  } finally {
    isLoading.value = false
  }
}

// 监听语言变化，重新获取文章
watch(locale, () => {
  fetchArticles()
})

// 组件挂载时获取文章
onMounted(() => {
  fetchArticles()
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  if (locale.value === 'en') {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

const viewArticle = (article: BlogArticle) => {
  router.push(`/insights/${article.slug}`)
}

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
        <!-- Loading State -->
        <div v-if="isLoading" class="insights-loading">
          <p>{{ locale === 'en' ? 'Loading articles...' : '加载文章中...' }}</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="insights-error">
          <p>{{ error }}</p>
          <button @click="fetchArticles" class="btn btn--primary">
            {{ locale === 'en' ? 'Retry' : '重试' }}
          </button>
        </div>

        <!-- Articles Grid -->
        <div v-else-if="articles.length > 0" class="insights-grid">
          <article 
            v-for="article in articles" 
            :key="article.id"
            class="article-card"
            @click="viewArticle(article)"
          >
            <div class="article-card__image">
              <img 
                v-if="article.image" 
                :src="article.image" 
                :alt="article.title" 
                loading="lazy"
                @error="($event.target as HTMLImageElement).src = '/images/placeholder.jpg'"
              />
              <div v-else class="article-card__image-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
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

        <!-- Empty State -->
        <div v-else class="insights-empty">
          <p>{{ locale === 'en' ? 'No articles found.' : '暂无文章。' }}</p>
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

/* Loading & Error States */
.insights-loading,
.insights-error,
.insights-empty {
  text-align: center;
  padding: var(--spacing-16);
  color: var(--color-gray-600);
}

.insights-error {
  color: var(--color-error);
}

.insights-error button {
  margin-top: var(--spacing-4);
}

.article-card__image-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-400);
}
</style>

