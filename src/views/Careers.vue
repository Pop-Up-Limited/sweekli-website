<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getImagePath } from '@/utils/imagePath'
import { useSEO } from '@/utils/seo'
import { fetchJobPostings, type JobPosting } from '@/utils/contentful-api'
import PageHero from '@/components/common/PageHero.vue'

const { t, locale } = useI18n()

useSEO({
  title: '加入我们',
  description: '在快速发展的跨境电商公司中开启您的职业生涯。与全球优秀品牌和国际化同事共事，享受超过行业水平的福利待遇。',
  path: '/careers'
})
const router = useRouter()
const showApplyInfo = ref<number | null>(null)

const toggleApplyInfo = (index: number) => {
  showApplyInfo.value = showApplyInfo.value === index ? null : index
}

const goToContact = () => {
  router.push('/contact')
}

// 职位数据 - 从Contentful获取
const positions = ref<JobPosting[]>([])
const positionsLoading = ref(true)
const positionsError = ref(false)

// 从Contentful获取职位数据
onMounted(async () => {
  try {
    positionsLoading.value = true
    positionsError.value = false
    const jobs = await fetchJobPostings()
    
    // 如果Contentful中没有职位，使用默认数据作为后备
    if (jobs.length === 0) {
      console.warn('No job postings found in Contentful, using fallback data')
      positions.value = [
        {
          id: 'fallback-1',
          title: '电商运营经理',
          department: '运营部',
          location: '上海',
          type: '全职',
          description: '',
          requirements: '',
          isActive: true
        },
        {
          id: 'fallback-2',
          title: '品牌营销专员',
          department: '市场部',
          location: '上海',
          type: '全职',
          description: '',
          requirements: '',
          isActive: true
        },
        {
          id: 'fallback-3',
          title: '客户成功经理',
          department: '客户服务',
          location: '上海/远程',
          type: '全职',
          description: '',
          requirements: '',
          isActive: true
        },
        {
          id: 'fallback-4',
          title: '数据分析师',
          department: '数据团队',
          location: '上海',
          type: '全职',
          description: '',
          requirements: '',
          isActive: true
        }
      ]
    } else {
      positions.value = jobs
    }
  } catch (error) {
    console.error('Error loading job postings:', error)
    positionsError.value = true
    // 使用默认数据作为后备
    positions.value = [
      {
        id: 'fallback-1',
        title: '电商运营经理',
        department: '运营部',
        location: '上海',
        type: '全职',
        description: '',
        requirements: '',
        isActive: true
      }
    ]
  } finally {
    positionsLoading.value = false
  }
})

const benefits = computed(() => t('careers.benefits.items', { returnObjects: true }) as Array<{title: string, desc: string}>)

const whyJoin = computed(() => t('careers.whyJoin.items', { returnObjects: true }) as string[])

// 员工故事数据 - 使用员工活动照片
const employeeStories = [
  {
    name: '陈光毅',
    title: '运营总监',
    quote: '吸引的是公司融洽的氛围, 还有对公司未来的愿景和对我的信任。',
    image: getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_3760.JPG')
  },
  {
    name: 'Amber',
    title: '媒介策划',
    quote: '在工作中追求乐趣, 在乐趣中找到自己。',
    image: getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4325.JPG')
  },
  {
    name: '钟羽',
    title: '资深设计师',
    quote: '有趣的灵魂万里挑一, 不设边界, 不惧挑战。',
    image: getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4336.JPG')
  }
]

const activeStoryIndex = ref(0)

const nextStory = () => {
  activeStoryIndex.value = (activeStoryIndex.value + 1) % employeeStories.length
}

const prevStory = () => {
  activeStoryIndex.value = (activeStoryIndex.value - 1 + employeeStories.length) % employeeStories.length
}

// 思维颗粒的生活 - 员工活动照片轮播
// 使用About页面gallery中的员工活动照片
const lifeImages = [
  getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_3760.JPG'),
  getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4325.JPG'),
  getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4336.JPG'),
  getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC04807.JPG'),
  getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0056.JPG'),
  getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0527.JPG'),
  getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/极限飞盘IMG_1433.JPG'),
  getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/极限飞盘IMG_1433 2.JPG')
]

const activeLifeIndex = ref(0)

const nextLifeImage = () => {
  activeLifeIndex.value = (activeLifeIndex.value + 1) % lifeImages.length
}

const prevLifeImage = () => {
  activeLifeIndex.value = (activeLifeIndex.value - 1 + lifeImages.length) % lifeImages.length
}

</script>

<template>
  <main class="careers-page">
    <!-- Hero -->
    <PageHero
      :label="locale === 'en' ? 'CAREERS' : '加入我们'"
      :title="t('careers.title')"
      :subtitle="t('careers.subtitle')"
      background-type="image"
      :background-image="'/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC05476.JPG'"
    />

    <!-- Culture Section -->
    <section class="careers-culture section">
      <div class="container">
        <h2 class="section-title text-center">{{ t('careers.culture') }}</h2>
        <div class="culture-grid">
          <div class="culture-item">
            <img 
              :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0056.JPG')" 
              alt="Team collaboration"
              loading="lazy"
            />
          </div>
          <div class="culture-item">
            <img 
              :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0527.JPG')" 
              alt="Office environment"
              loading="lazy"
            />
          </div>
          <div class="culture-item">
            <img 
              :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_3760.JPG')" 
              alt="Team activities"
              loading="lazy"
            />
          </div>
          <div class="culture-item">
            <img 
              :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4325.JPG')" 
              alt="Work life"
              loading="lazy"
            />
          </div>
          <div class="culture-item">
            <img 
              :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4336.JPG')" 
              alt="Team culture"
              loading="lazy"
            />
          </div>
          <div class="culture-item">
            <img 
              :src="getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/极限飞盘IMG_1433.JPG')" 
              alt="Team activity"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="careers-benefits section">
      <div class="container">
        <h2 class="section-title text-center">{{ t('careers.benefits.title') }}</h2>
        <div class="benefits-grid">
          <div v-for="(benefit, index) in benefits" :key="index" class="benefit-card">
            <div class="benefit-card__icon-wrapper">
              <div class="benefit-card__icon-bg"></div>
            </div>
            <h3 class="benefit-card__title">{{ benefit.title }}</h3>
            <p class="benefit-card__desc">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Work Locations -->
    <section class="careers-locations section">
      <div class="container">
        <h2 class="section-title text-center">工作地点</h2>
        <div class="locations-grid">
          <div class="location-item">
            <div class="location-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="location-item__name">深圳</h3>
            <p class="location-item__address">龙岗区坂田街道天安云谷二期 6 栋</p>
          </div>
          <div class="location-item">
            <div class="location-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="location-item__name">上海</h3>
            <p class="location-item__address">延安东路 588 号 2 楼</p>
          </div>
          <div class="location-item">
            <div class="location-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="location-item__name">香港</h3>
            <p class="location-item__address">湾仔轩尼诗道 200 号 11 楼</p>
          </div>
          <div class="location-item">
            <div class="location-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="location-item__name">台北</h3>
            <p class="location-item__address">重庆南路一段 83 号</p>
          </div>
          <div class="location-item">
            <div class="location-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="location-item__name">首尔</h3>
            <p class="location-item__address">即将开业</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Life at Sweekli -->
    <section class="careers-life section">
      <div class="container">
        <h2 class="section-title text-center">{{ t('careers.lifeAtSweekli.title') }}</h2>
        <div class="life-carousel">
          <div class="life-carousel__wrapper">
            <TransitionGroup name="fade-slide" tag="div" class="life-carousel__track">
              <div 
                v-for="(image, index) in lifeImages" 
                :key="index"
                v-show="index === activeLifeIndex"
                class="life-carousel__item"
              >
                <img :src="image" :alt="`Life at Sweekli ${index + 1}`" loading="lazy" />
              </div>
            </TransitionGroup>
            <button class="life-carousel__btn life-carousel__btn--prev" @click="prevLifeImage" aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button class="life-carousel__btn life-carousel__btn--next" @click="nextLifeImage" aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            <div class="life-carousel__dots">
              <button 
                v-for="(_, index) in lifeImages" 
                :key="index"
                class="life-carousel__dot"
                :class="{ 'is-active': index === activeLifeIndex }"
                @click="activeLifeIndex = index"
                :aria-label="`Image ${index + 1}`"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Join -->
    <section class="careers-why-join section">
      <div class="container">
        <h2 class="section-title text-center">{{ t('careers.whyJoin.title') }}</h2>
        <div class="why-join-list">
          <div 
            v-for="(reason, index) in whyJoin" 
            :key="index"
            class="why-join-item"
          >
            <div class="why-join-item__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span class="why-join-item__text">{{ reason }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Employee Stories -->
    <section class="careers-stories section">
      <div class="container">
        <h2 class="section-title text-center">{{ t('careers.employeeStories.title') }}</h2>
        <div class="stories-carousel">
          <div class="stories-carousel__wrapper">
            <TransitionGroup name="fade-slide" tag="div" class="stories-carousel__track">
              <div 
                v-for="(story, index) in employeeStories" 
                :key="story.name"
                v-show="index === activeStoryIndex"
                class="story-card"
              >
                <div class="story-card__image">
                  <img :src="story.image" :alt="story.name" loading="lazy" />
                </div>
                <div class="story-card__content">
                  <h3 class="story-card__name">{{ story.name }}</h3>
                  <p class="story-card__title">{{ story.title }}</p>
                  <blockquote class="story-card__quote">{{ story.quote }}</blockquote>
                </div>
              </div>
            </TransitionGroup>
            <button class="stories-carousel__btn stories-carousel__btn--prev" @click="prevStory" aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button class="stories-carousel__btn stories-carousel__btn--next" @click="nextStory" aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            <div class="stories-carousel__dots">
              <button 
                v-for="(_, index) in employeeStories" 
                :key="index"
                class="stories-carousel__dot"
                :class="{ 'is-active': index === activeStoryIndex }"
                @click="activeStoryIndex = index"
                :aria-label="`Story ${index + 1}`"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Open Positions -->
    <section class="careers-positions section">
      <div class="container">
        <h2 class="section-title text-center">{{ t('careers.positions') }}</h2>
        
        <!-- 加载状态 -->
        <div v-if="positionsLoading" class="positions-loading">
          <p>{{ locale === 'en' ? 'Loading positions...' : '正在加载职位...' }}</p>
        </div>
        
        <!-- 错误状态 -->
        <div v-else-if="positionsError" class="positions-error">
          <p>{{ locale === 'en' ? 'Failed to load positions. Please try again later.' : '加载职位失败，请稍后重试。' }}</p>
        </div>
        
        <!-- 空状态 -->
        <div v-else-if="positions.length === 0" class="positions-empty">
          <p>{{ locale === 'en' ? 'No open positions at the moment. Please check back later.' : '目前暂无开放职位，请稍后再查看。' }}</p>
        </div>
        
        <!-- 职位列表 -->
        <div v-else class="positions-list">
          <div v-for="(position, index) in positions" :key="position.id" class="position-card">
            <div class="position-card__main">
              <h3 class="position-card__title">{{ position.title }}</h3>
              <div class="position-card__meta">
                <span>{{ position.department }}</span>
                <span>{{ position.location }}</span>
                <span>{{ position.type }}</span>
              </div>
            </div>
            <div class="position-card__actions">
              <button 
                class="btn btn--primary"
                @click="toggleApplyInfo(index)"
              >
                {{ t('careers.apply') }}
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2"
                  :class="{ 'rotated': showApplyInfo === index }"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              
              <!-- 申请信息下拉菜单 -->
              <Transition name="slide-down">
                <div v-if="showApplyInfo === index" class="apply-info">
                  <div class="apply-info__content">
                    <p class="apply-info__text">
                      {{ locale === 'en' 
                        ? 'Please send your resume and contact information to:' 
                        : '请将您的简历和联系方式发送至：' 
                      }}
                    </p>
                    <a 
                      href="mailto:careers@sweekli.com" 
                      class="apply-info__email"
                      @click.stop
                    >
                      careers@sweekli.com
                    </a>
                    <p class="apply-info__note">
                      {{ t('careers.applyPlatform.text') }}
                    </p>
                    <a 
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn--secondary btn--small"
                    >
                      {{ t('careers.applyPlatform.button') }}
                    </a>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.careers-page {
  padding-top: 0;
}


/* Section Title */
.section-title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: var(--spacing-12);
  color: var(--color-primary);
}

/* Culture Grid */
.culture-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
}

@media (min-width: 768px) {
  .culture-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.culture-item {
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 1;
}

.culture-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.culture-item:hover img {
  transform: scale(1.1);
}

/* Benefits */
.careers-benefits {
  background: var(--color-gray-50);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-6);
}

@media (min-width: 768px) {
  .benefits-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.benefit-card {
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  text-align: center;
  transition: all var(--transition-base);
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.benefit-card__icon-wrapper {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-4);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.benefit-card__icon-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-radius: var(--radius-xl);
  position: absolute;
}

.benefit-card__icon {
  display: block;
  font-size: 2.5rem;
  margin-bottom: var(--spacing-3);
  position: relative;
  z-index: 1;
}

.benefit-card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.benefit-card__desc {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

/* Positions */
.positions-loading,
.positions-error,
.positions-empty {
  text-align: center;
  padding: var(--spacing-12) var(--spacing-4);
  color: var(--color-gray-600);
  max-width: 800px;
  margin: 0 auto;
}

.positions-loading p,
.positions-error p,
.positions-empty p {
  font-size: var(--font-size-base);
  margin: 0;
}

.positions-error {
  color: var(--color-error, #dc2626);
}

.positions-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  max-width: 800px;
  margin: 0 auto;
}

.position-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

@media (min-width: 640px) {
  .position-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.position-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateX(4px);
}

.position-card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.position-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
}

.position-card__meta span {
  position: relative;
}

.position-card__meta span:not(:last-child)::after {
  content: '•';
  position: absolute;
  right: calc(var(--spacing-2) * -1);
}

/* Actions */
.position-card__actions {
  position: relative;
  width: 100%;
}

@media (min-width: 640px) {
  .position-card__actions {
    width: auto;
    min-width: 150px;
  }
}

.position-card__actions .btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
}

.position-card__actions .btn svg {
  transition: transform var(--transition-fast);
}

.position-card__actions .btn svg.rotated {
  transform: rotate(180deg);
}

/* Apply Info Dropdown */
.apply-info {
  margin-top: var(--spacing-4);
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-200);
}

.apply-info__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.apply-info__text {
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  margin: 0;
}

.apply-info__email {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-purple);
  text-decoration: none;
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--color-white);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-200);
  text-align: center;
  transition: all var(--transition-fast);
}

.apply-info__email:hover {
  background: var(--color-accent-purple);
  color: var(--color-white);
  border-color: var(--color-accent-purple);
}

.apply-info__note {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0;
  text-align: center;
}

.btn--small {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
}

/* Slide Down Animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  opacity: 1;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}

/* Work Locations */
.careers-locations {
  background: var(--color-gray-50);
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-6);
}

@media (min-width: 768px) {
  .locations-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .locations-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.location-item {
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  text-align: center;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.location-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.location-item__icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-radius: var(--radius-xl);
  color: var(--color-accent-purple);
}

.location-item__name {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.location-item__address {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.5;
}

/* Life at Sweekli */
.careers-life {
  background: var(--color-white);
}

.life-carousel {
  max-width: 1000px;
  margin: 0 auto;
}

.life-carousel__wrapper {
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.life-carousel__track {
  position: relative;
  aspect-ratio: 16/9;
  min-height: 400px;
}

.life-carousel__item {
  position: absolute;
  inset: 0;
}

.life-carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.life-carousel__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  z-index: 10;
  color: var(--color-primary);
}

.life-carousel__btn:hover {
  background: var(--color-white);
  box-shadow: var(--shadow-lg);
}

.life-carousel__btn--prev {
  left: var(--spacing-4);
}

.life-carousel__btn--next {
  right: var(--spacing-4);
}

.life-carousel__dots {
  position: absolute;
  bottom: var(--spacing-4);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-2);
  z-index: 10;
}

.life-carousel__dot {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.life-carousel__dot.is-active {
  background: var(--color-white);
  transform: scale(1.2);
}

/* Why Join */
.careers-why-join {
  background: var(--color-gray-50);
}

.why-join-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.why-join-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.why-join-item:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-md);
}

.why-join-item__icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(111, 123, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-radius: var(--radius-lg);
  color: var(--color-accent-purple);
}

.why-join-item__text {
  font-size: var(--font-size-base);
  color: var(--color-primary);
  line-height: 1.6;
  flex: 1;
}

/* Employee Stories */
.careers-stories {
  background: var(--color-white);
}

.stories-carousel {
  max-width: 1000px;
  margin: 0 auto;
}

.stories-carousel__wrapper {
  position: relative;
  background: var(--color-gray-50);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.stories-carousel__track {
  position: relative;
  min-height: 500px;
}

.story-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  padding: var(--spacing-8);
}

@media (min-width: 768px) {
  .story-card {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-8);
    padding: var(--spacing-12);
  }
}

.story-card__image {
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 1;
}

.story-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-card__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-4) 0;
}

@media (min-width: 768px) {
  .story-card__content {
    padding: 0;
  }
}

.story-card__name {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.story-card__title {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-6);
}

.story-card__quote {
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  line-height: 1.7;
  font-style: italic;
  margin: 0;
  position: relative;
  padding-left: var(--spacing-6);
}

.story-card__quote::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -10px;
  font-size: 4rem;
  color: var(--color-accent-purple);
  opacity: 0.3;
  font-family: serif;
}

.stories-carousel__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: var(--color-white);
  border: 2px solid var(--color-gray-200);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  z-index: 10;
  color: var(--color-primary);
}

.stories-carousel__btn:hover {
  border-color: var(--color-accent-purple);
  color: var(--color-accent-purple);
}

.stories-carousel__btn--prev {
  left: var(--spacing-4);
}

.stories-carousel__btn--next {
  right: var(--spacing-4);
}

.stories-carousel__dots {
  position: absolute;
  bottom: var(--spacing-4);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-2);
  z-index: 10;
}

.stories-carousel__dot {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.stories-carousel__dot.is-active {
  background: var(--color-white);
  transform: scale(1.2);
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-active {
  position: absolute;
  width: 100%;
}
</style>
