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
    console.log('Fetching job postings from Contentful...')
    const jobs = await fetchJobPostings()
    console.log('Fetched jobs:', jobs)
    
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

const benefits = computed(() => {
  try {
    const items = t('careers.benefits.items', { returnObjects: true })
    if (Array.isArray(items) && items.length > 0) {
      // 中文版：去掉desc（设为空字符串）
      if (locale.value === 'zh') {
        return items.map(item => ({ ...item, desc: '' })) as Array<{title: string, desc: string}>
      }
      return items as Array<{title: string, desc: string}>
    }
    // 如果翻译失败，使用后备数据
    return locale.value === 'en' ? [
      { title: 'Statutory / Five insurances and one fund', desc: 'Comprehensive social insurance coverage' },
      { title: 'Annual regular physical examination', desc: 'Health is most important' },
      { title: 'More than legally stipulated', desc: 'Ample annual leave' },
      { title: 'No clocking in for work', desc: 'Flexible working hours' },
      { title: 'Overtime compensation', desc: 'Subsidies or compensatory leave' },
      { title: 'Rental subsidies', desc: 'Enjoy rental support' },
      { title: 'Free gym and classes', desc: 'All kinds of classes available' },
      { title: 'Perfect promotion mechanism', desc: 'Clear career progression' },
      { title: 'Stock options', desc: 'Provided for excellent employees' },
      { title: 'Learning opportunities', desc: 'Recharge at all times' },
      { title: 'Office snacks', desc: 'Eat freely' },
      { title: 'Afternoon tea', desc: 'Internet-famous afternoon tea' },
      { title: 'Holiday benefits', desc: 'Various care benefits' },
      { title: 'Free product experience', desc: 'Own products' },
      { title: 'Team building', desc: 'Super rich activities and dinners' },
      { title: 'Travel activities', desc: 'Irregular travel opportunities' }
    ] : [
      { title: '法定的/五险一金', desc: '' },
      { title: '每年定期体检/健康最重要', desc: '' },
      { title: '超过法律规定的充足年假', desc: '' },
      { title: '我们这儿上班不打卡', desc: '' },
      { title: '如果加班会有补贴或调休', desc: '' },
      { title: '租房享有租房补贴', desc: '' },
      { title: '免费健身房游泳团课样样有', desc: '' },
      { title: '完善的晋升机制', desc: '' },
      { title: '优秀员工提供股票期权', desc: '' },
      { title: '得到混沌等课程时刻充电', desc: '' },
      { title: '办公室零食畅吃', desc: '' },
      { title: '不定期各类网红下午茶', desc: '' },
      { title: '节日有各种关怀福利', desc: '' },
      { title: '自家产品免费体验', desc: '' },
      { title: '超丰富团建活动和聚餐', desc: '' },
      { title: '不定期旅游活动', desc: '' }
    ]
  } catch (error) {
    console.error('Error loading benefits:', error)
    return []
  }
})

const whyJoin = computed(() => {
  try {
    const items = t('careers.whyJoin.items', { returnObjects: true })
    console.log('WhyJoin items:', items)
    if (Array.isArray(items) && items.length > 0) {
      return items as string[]
    }
    // 如果翻译失败，使用后备数据
    console.warn('WhyJoin translation failed, using fallback')
    return locale.value === 'en' ? [
      'Work with global brands and international colleagues',
      'Open and young culture',
      'Diverse career paths',
      'Benefits above industry standards',
      'Fast growth and high visibility'
    ] : [
      '与全球优秀品牌和国际化同事共事',
      '开放的年轻文化氛围',
      '多元发展路径',
      '超过行业水平的福利待遇',
      '成长速度快、能见度高'
    ]
  } catch (error) {
    console.error('Error loading whyJoin:', error)
    return []
  }
})

// 员工故事部分已移除，待确认需求

// 思维颗粒的生活 - 员工活动照片轮播
const lifeImages = computed(() => {
  if (locale.value === 'zh') {
    return [
      '/images/careers-life/1.jpg',
      '/images/careers-life/2.jpg',
      '/images/careers-life/3.jpg',
      '/images/careers-life/4.jpg',
      '/images/careers-life/5.jpg',
      '/images/careers-life/6.jpg',
      '/images/careers-life/7.jpg',
      '/images/careers-life/8.jpg',
      '/images/careers-life/9.jpg',
      '/images/careers-life/10.jpg'
    ]
  } else {
    return [
      getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_3760.JPG'),
      getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4325.JPG'),
      getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4336.JPG'),
      getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/DSC04807.JPG'),
      getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0056.JPG'),
      getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_0527.JPG'),
      getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/极限飞盘IMG_1433.JPG'),
      getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/极限飞盘IMG_1433 2.JPG')
    ]
  }
})

const activeLifeIndex = ref(0)

const nextLifeImage = () => {
  activeLifeIndex.value = (activeLifeIndex.value + 1) % lifeImages.value.length
}

const prevLifeImage = () => {
  activeLifeIndex.value = (activeLifeIndex.value - 1 + lifeImages.value.length) % lifeImages.value.length
}

// 员工故事
const employeeStories = computed(() => {
  if (locale.value === 'zh') {
    return [
      {
        name: '陈光毅',
        title: '运营总监',
        quote: '吸引我的是公司融洽的氛围，公司未来的愿景和对我的信任。',
        image: '/images/employee-stories/陈光毅.jpg'
      },
      {
        name: 'Amber',
        title: '媒介策划',
        quote: '在工作中追求乐趣，在乐趣中找到自己。',
        image: '/images/employee-stories/Amber.jpg'
      },
      {
        name: '钟羽',
        title: '资深设计师',
        quote: '有趣的灵魂万里挑一，不设边界，无惧挑战。',
        image: '/images/employee-stories/钟羽.jpg'
      }
    ]
  } else {
    return [
      {
        name: '员工A',
        title: '电商运营经理',
        quote: '在思维颗粒工作让我有机会与全球优秀品牌合作，每天都在学习新的东西，成长速度很快。',
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_3760.JPG')
      },
      {
        name: '员工B',
        title: '品牌营销专员',
        quote: '这里的工作氛围非常开放，同事们都很年轻有活力，大家一起为品牌创造价值，很有成就感。',
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4325.JPG')
      },
      {
        name: '员工C',
        title: '客户成功经理',
        quote: '思维颗粒给了我很多学习和发展的机会，公司提供的福利待遇也很不错，是一个很好的平台。',
        image: getImagePath('/images/Sweekli 中文 PDF内图片素材/4 公司文化/IMG_4336.JPG')
      }
    ]
  }
})

const activeStoryIndex = ref(0)

const nextStory = () => {
  activeStoryIndex.value = (activeStoryIndex.value + 1) % employeeStories.value.length
}

const prevStory = () => {
  activeStoryIndex.value = (activeStoryIndex.value - 1 + employeeStories.value.length) % employeeStories.value.length
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
      :background-image="locale === 'en' ? '/images/careers-hero-1.jpg' : '/images/careers-hero-2.jpg'"
    />

    <!-- Culture Section -->
    <section v-if="locale === 'zh'" class="careers-culture section">
      <div class="container">
        <h2 class="section-title text-center">{{ t('careers.culture') }}</h2>
        <div class="culture-tags">
          <span class="culture-tag">真实 - Real</span>
          <span class="culture-tag">成长 - Grow</span>
          <span class="culture-tag">创意 - Creative</span>
          <span class="culture-tag">专业 - Professional</span>
          <span class="culture-tag">责任 - Responsibility</span>
        </div>
        <div class="culture-grid">
          <div class="culture-item">
            <img 
              src="/images/careers-culture/1.jpg" 
              alt="真实 - Real"
              loading="lazy"
            />
          </div>
          <div class="culture-item">
            <img 
              src="/images/careers-culture/2.jpg" 
              alt="成长 - Grow"
              loading="lazy"
            />
          </div>
          <div class="culture-item">
            <img 
              src="/images/careers-culture/3.jpg" 
              alt="专业 - Professional"
              loading="lazy"
            />
          </div>
          <div class="culture-item">
            <img 
              src="/images/careers-culture/4.jpg" 
              alt="责任 - Responsibility"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="careers-benefits section" :data-locale="locale">
      <div class="container">
        <h2 class="section-title text-center">{{ t('careers.benefits.title') }}</h2>
        <div class="benefits-grid">
          <div v-for="(benefit, index) in benefits" :key="index" class="benefit-card">
            <div class="benefit-card__icon-wrapper">
              <div class="benefit-card__icon-bg">
                <!-- 0: 五险一金 - 保险/盾牌 -->
                <svg v-if="index === 0" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <!-- 1: 定期体检 - 医疗/健康 -->
                <svg v-else-if="index === 1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
                  <path d="M12 8v8"/>
                  <path d="M8 12h8"/>
                </svg>
                <!-- 2: 充足年假 - 日历 -->
                <svg v-else-if="index === 2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                  <path d="M8 14h.01"/>
                  <path d="M12 14h.01"/>
                  <path d="M16 14h.01"/>
                  <path d="M8 18h.01"/>
                  <path d="M12 18h.01"/>
                  <path d="M16 18h.01"/>
                </svg>
                <!-- 3: 不打卡 - 时钟/灵活时间 -->
                <svg v-else-if="index === 3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <!-- 4: 加班补贴 - 金钱 -->
                <svg v-else-if="index === 4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <!-- 5: 租房补贴 - 房子 -->
                <svg v-else-if="index === 5" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <!-- 6: 免费健身房 - 健身 -->
                <svg v-else-if="index === 6" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6.5 6.5h11v11h-11z"/>
                  <path d="M6.5 17l5-5 5 5"/>
                  <path d="M12 12l-5-5 5-5"/>
                </svg>
                <!-- 7: 晋升机制 - 上升箭头 -->
                <svg v-else-if="index === 7" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 19V5"/>
                  <path d="M5 12l7-7 7 7"/>
                </svg>
                <!-- 8: 股票期权 - 图表 -->
                <svg v-else-if="index === 8" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
                <!-- 9: 学习机会 - 书本 -->
                <svg v-else-if="index === 9" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                <!-- 10: 办公室零食 - 食物 -->
                <svg v-else-if="index === 10" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                  <path d="M7 2v20"/>
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/>
                </svg>
                <!-- 11: 下午茶 - 茶/咖啡 -->
                <svg v-else-if="index === 11" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
                <!-- 12: 节日福利 - 礼物 -->
                <svg v-else-if="index === 12" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12"/>
                  <rect x="2" y="7" width="20" height="5"/>
                  <line x1="12" y1="22" x2="12" y2="7"/>
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                </svg>
                <!-- 13: 免费产品体验 - 产品/盒子 -->
                <svg v-else-if="index === 13" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                <!-- 14: 团建活动 - 团队 -->
                <svg v-else-if="index === 14" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <!-- 15: 旅游活动 - 旅行/地图 -->
                <svg v-else-if="index === 15" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <!-- 默认图标（打勾） -->
                <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
            </div>
            <h3 class="benefit-card__title">{{ benefit.title }}</h3>
            <p v-if="locale !== 'zh'" class="benefit-card__desc">{{ benefit.desc }}</p>
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
            :class="{ 'why-join-item--zh': locale === 'zh' }"
            :style="locale === 'zh' ? { backgroundColor: ['#ffebe6', '#e2f0e3', '#ffebe6', '#eddff0', '#dce8ff'][index] } : {}"
          >
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
            <div class="stories-carousel__track">
              <div 
                v-for="(story, index) in employeeStories" 
                :key="index"
                v-show="activeStoryIndex === index"
                class="story-card"
              >
                <div class="story-card__image">
                  <img :src="story.image" :alt="story.name" loading="lazy" />
                </div>
                <div class="story-card__content">
                  <h3 class="story-card__name">{{ story.name }}</h3>
                  <p class="story-card__title">{{ story.title }}</p>
                  <p class="story-card__quote">{{ story.quote }}</p>
                </div>
              </div>
            </div>
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

    <!-- Work Locations -->
    <section class="careers-locations section">
      <div class="container">
        <h2 class="section-title text-center">{{ locale === 'en' ? 'Work Locations' : '工作地点' }}</h2>
        <div class="locations-grid">
          <div class="location-item">
            <div class="location-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="location-item__name">{{ locale === 'en' ? 'Shenzhen' : '深圳' }}</h3>
            <p class="location-item__address">{{ locale === 'en' ? 'Block 6, Cloud Park, Bantian Street, Longgang District' : '龙岗区坂田街道天安云谷二期 6 栋' }}</p>
          </div>
          <div class="location-item">
            <div class="location-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="location-item__name">{{ locale === 'en' ? 'Shanghai' : '上海' }}</h3>
            <p class="location-item__address">{{ locale === 'en' ? 'Floor 2, 588 East Yan\'an Road' : '延安东路 588 号 2 楼' }}</p>
          </div>
          <div class="location-item">
            <div class="location-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="location-item__name">{{ locale === 'en' ? 'Hong Kong' : '香港' }}</h3>
            <p class="location-item__address">{{ locale === 'en' ? '11F, 200 Hennessy Road, Wan Chai' : '湾仔轩尼诗道 200 号 11 楼' }}</p>
          </div>
          <div class="location-item">
            <div class="location-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="location-item__name">{{ locale === 'en' ? 'Taipei' : '台北' }}</h3>
            <p class="location-item__address">{{ locale === 'en' ? 'No. 83, Section 1, Chongqing South Road' : '重庆南路一段 83 号' }}</p>
          </div>
          <div class="location-item">
            <div class="location-item__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="location-item__name">{{ locale === 'en' ? 'Seoul' : '首尔' }}</h3>
            <p class="location-item__address">{{ locale === 'en' ? 'Coming Soon' : '即将开业' }}</p>
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
                      href="https://www.zhipin.com/gongsi/6610e8248c51d6341nR63di6.html"
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

/* Section通用样式 */
.section {
  padding: var(--spacing-16, 4rem) 0;
}

@media (max-width: 768px) {
  .section {
    padding: var(--spacing-12, 3rem) 0;
  }
}

/* Section Title */
.section-title {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: var(--spacing-12);
  color: var(--color-primary);
}

/* Culture Tags */
.culture-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-8);
}

.culture-tag {
  display: inline-block;
  padding: var(--spacing-2) var(--spacing-5);
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  white-space: nowrap;
}

/* Culture Grid */
.culture-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
}

@media (min-width: 768px) {
  .culture-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.culture-item {
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 4/3;
  background: var(--color-gray-50);
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

/* 中文版：4列布局 */
@media (min-width: 768px) {
  .careers-benefits:lang(zh) .benefits-grid,
  .careers-benefits[data-locale="zh"] .benefits-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.benefit-card {
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  text-align: center;
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 中文版：去掉desc后，调整间距 */
.careers-benefits[data-locale="zh"] .benefit-card__icon-wrapper {
  margin-bottom: var(--spacing-4);
}

.careers-benefits[data-locale="zh"] .benefit-card__title {
  margin-bottom: 0;
  margin-top: var(--spacing-4);
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
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-purple);
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
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-3);
}

.why-join-item {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: 9999px;
  transition: all var(--transition-base);
  white-space: normal;
  word-wrap: break-word;
}

.why-join-item--zh {
  color: var(--color-primary);
}

.why-join-item--zh .why-join-item__text {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  line-height: 1.5;
}

.why-join-item__text {
  font-size: var(--font-size-base);
  color: var(--color-primary);
  line-height: 1.5;
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
