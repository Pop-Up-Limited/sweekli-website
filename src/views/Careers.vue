<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getImagePath } from '@/utils/imagePath'
import PageHero from '@/components/common/PageHero.vue'

const { t, locale } = useI18n()
const router = useRouter()
const showApplyInfo = ref<number | null>(null)

const toggleApplyInfo = (index: number) => {
  showApplyInfo.value = showApplyInfo.value === index ? null : index
}

const goToContact = () => {
  router.push('/contact')
}

const positions = [
  {
    title: '电商运营经理',
    department: '运营部',
    location: '上海',
    type: '全职'
  },
  {
    title: '品牌营销专员',
    department: '市场部',
    location: '上海',
    type: '全职'
  },
  {
    title: '客户成功经理',
    department: '客户服务',
    location: '上海/远程',
    type: '全职'
  },
  {
    title: '数据分析师',
    department: '数据团队',
    location: '上海',
    type: '全职'
  }
]

const benefits = [
  { icon: '💰', title: '有竞争力的薪资', desc: '行业领先的薪酬待遇' },
  { icon: '📈', title: '职业发展', desc: '清晰的晋升通道和培训机会' },
  { icon: '🌏', title: '国际化环境', desc: '与全球品牌合作的机会' },
  { icon: '🏖️', title: '带薪年假', desc: '充足的休假时间' },
  { icon: '🏥', title: '医疗保险', desc: '全面的医疗保障' },
  { icon: '🎉', title: '团建活动', desc: '丰富的团队活动' }
]

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
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="careers-benefits section">
      <div class="container">
        <h2 class="section-title text-center">{{ t('careers.benefits.title') }}</h2>
        <div class="benefits-grid">
          <div v-for="(benefit, index) in benefits" :key="index" class="benefit-card">
            <span class="benefit-card__icon">{{ benefit.icon }}</span>
            <h3 class="benefit-card__title">{{ benefit.title }}</h3>
            <p class="benefit-card__desc">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Open Positions -->
    <section class="careers-positions section">
      <div class="container">
        <h2 class="section-title text-center">{{ t('careers.positions') }}</h2>
        <div class="positions-list">
          <div v-for="(position, index) in positions" :key="index" class="position-card">
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
                      {{ locale === 'en'
                        ? 'Or fill out the contact form below:'
                        : '或填写下方的联系表单：'
                      }}
                    </p>
                    <button 
                      class="btn btn--secondary btn--small"
                      @click="goToContact"
                    >
                      {{ locale === 'en' ? 'Go to Contact Form' : '前往联系表单' }}
                    </button>
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
    grid-template-columns: repeat(4, 1fr);
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

.benefit-card__icon {
  display: block;
  font-size: 2.5rem;
  margin-bottom: var(--spacing-3);
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
</style>
