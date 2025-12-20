<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { getBlogArticles, type BlogArticle } from '@/utils/contentful'

const { locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const articles = ref<BlogArticle[]>([])
const isLoading = ref(true)

// 获取最新 3 篇文章
const fetchLatestArticles = async () => {
  try {
    const localeCode = locale.value === 'zh' ? 'zh' : 'en'
    const fetchedArticles = await getBlogArticles(localeCode, {
      limit: 3,
      orderBy: 'date'
    })
    articles.value = fetchedArticles
  } catch (error) {
    console.error('Failed to fetch latest articles:', error)
    articles.value = []
  } finally {
    isLoading.value = false
  }
}

// 监听语言变化
watch(locale, () => {
  fetchLatestArticles()
})

onMounted(() => {
  fetchLatestArticles()
})

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
            ? 'Stay updated with the latest trends, strategies, and insights from China\'s e-commerce market.'
            : '了解中国电商市场的最新趋势、策略和洞察。'
          }}
        </p>
      </div>

      <!-- Articles Grid -->
      <div v-if="!isLoading && articles.length > 0" class="insights-section__grid" :class="{ 'is-visible': isVisible }">
        <article 
          v-for="(article, index) in articles" 
          :key="article.id"
          class="insight-card"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <RouterLink :to="`/insights/${article.slug}`" class="insight-card__link">
            <div class="insight-card__image">
              <img 
                v-if="article.image" 
                :src="article.image" 
                :alt="article.title" 
                loading="lazy"
                @error="($event.target as HTMLImageElement).src = '/images/placeholder.jpg'"
              />
              <div v-else class="insight-card__image-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div class="insight-card__category">{{ article.category }}</div>
            </div>
            <div class="insight-card__content">
              <time class="insight-card__date">{{ formatDate(article.date) }}</time>
              <h3 class="insight-card__title">{{ article.title }}</h3>
              <p class="insight-card__excerpt">{{ article.excerpt }}</p>
              <span class="insight-card__read-more">
                {{ locale === 'en' ? 'Read more' : '阅读更多' }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </RouterLink>
        </article>
      </div>
      
      <!-- Loading State -->
      <div v-else-if="isLoading" class="insights-section__loading">
        <p>{{ locale === 'en' ? 'Loading...' : '加载中...' }}</p>
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
}

.insight-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.insight-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
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
}

.insight-card__read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-accent-purple);
  transition: all var(--transition-fast);
}

.insight-card:hover .insight-card__read-more {
  gap: var(--spacing-3);
  color: var(--color-primary);
}

.insight-card__read-more svg {
  transition: transform var(--transition-fast);
}

.insight-card:hover .insight-card__read-more svg {
  transform: translateX(4px);
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

/* Loading State */
.insights-section__loading {
  text-align: center;
  padding: var(--spacing-12);
  color: var(--color-gray-600);
}

.insight-card__image-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-400);
}
</style>


import { ref, onMounted, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { getBlogArticles, type BlogArticle } from '@/utils/contentful'

const { locale } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const articles = ref<BlogArticle[]>([])
const isLoading = ref(true)

// 获取最新 3 篇文章
const fetchLatestArticles = async () => {
  try {
    const localeCode = locale.value === 'zh' ? 'zh' : 'en'
    const fetchedArticles = await getBlogArticles(localeCode, {
      limit: 3,
      orderBy: 'date'
    })
    articles.value = fetchedArticles
  } catch (error) {
    console.error('Failed to fetch latest articles:', error)
    articles.value = []
  } finally {
    isLoading.value = false
  }
}

// 监听语言变化
watch(locale, () => {
  fetchLatestArticles()
})

onMounted(() => {
  fetchLatestArticles()
})

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
            ? 'Stay updated with the latest trends, strategies, and insights from China\'s e-commerce market.'
            : '了解中国电商市场的最新趋势、策略和洞察。'
          }}
        </p>
      </div>

      <!-- Articles Grid -->
      <div v-if="!isLoading && articles.length > 0" class="insights-section__grid" :class="{ 'is-visible': isVisible }">
        <article 
          v-for="(article, index) in articles" 
          :key="article.id"
          class="insight-card"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <RouterLink :to="`/insights/${article.slug}`" class="insight-card__link">
            <div class="insight-card__image">
              <img 
                v-if="article.image" 
                :src="article.image" 
                :alt="article.title" 
                loading="lazy"
                @error="($event.target as HTMLImageElement).src = '/images/placeholder.jpg'"
              />
              <div v-else class="insight-card__image-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div class="insight-card__category">{{ article.category }}</div>
            </div>
            <div class="insight-card__content">
              <time class="insight-card__date">{{ formatDate(article.date) }}</time>
              <h3 class="insight-card__title">{{ article.title }}</h3>
              <p class="insight-card__excerpt">{{ article.excerpt }}</p>
              <span class="insight-card__read-more">
                {{ locale === 'en' ? 'Read more' : '阅读更多' }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </RouterLink>
        </article>
      </div>
      
      <!-- Loading State -->
      <div v-else-if="isLoading" class="insights-section__loading">
        <p>{{ locale === 'en' ? 'Loading...' : '加载中...' }}</p>
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
}

.insight-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.insight-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
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
}

.insight-card__read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-accent-purple);
  transition: all var(--transition-fast);
}

.insight-card:hover .insight-card__read-more {
  gap: var(--spacing-3);
  color: var(--color-primary);
}

.insight-card__read-more svg {
  transition: transform var(--transition-fast);
}

.insight-card:hover .insight-card__read-more svg {
  transform: translateX(4px);
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

/* Loading State */
.insights-section__loading {
  text-align: center;
  padding: var(--spacing-12);
  color: var(--color-gray-600);
}

.insight-card__image-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-400);
}
</style>

