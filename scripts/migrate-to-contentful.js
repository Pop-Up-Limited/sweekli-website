/**
 * 将现有博客文章迁移到 Contentful
 * 
 * 使用方法：
 * 1. 确保已安装 contentful-management: npm install contentful-management
 * 2. 运行: node scripts/migrate-to-contentful.js
 */

const contentful = require('contentful-management')

const SPACE_ID = 'wbpsfgfg62v2'
const MANAGEMENT_TOKEN = 'CFPAT-M5hBhkZGc1pH0KslULtoNlMyAjsTPvEnlYFKhUpcMVs'
const ENVIRONMENT = 'master'

// 现有博客文章数据
const articles = [
  {
    titleEn: 'Anta and MUSINSA: Leading the Next Wave of Fashion in China',
    titleZh: '安踏与MUSINSA：引领中国时尚新浪潮',
    excerptEn: 'Exploring how these brands are reshaping the fashion landscape in China through innovative strategies and consumer engagement.',
    excerptZh: '探索这些品牌如何通过创新策略和消费者参与重塑中国时尚格局。',
    date: '2025-09-19',
    categoryEn: 'Fashion',
    categoryZh: '时尚',
    slug: 'anta-musinsa-leading-next-wave-fashion-china',
    imagePath: '/images/Sweekli 官网介绍 图片素材/1 home banner/1-PC.jpg'
  },
  {
    titleEn: 'Here\'s What 10 New Outdoor Lifestyle Brands Are Bringing for Spring/Summer',
    titleZh: '10个新户外生活方式品牌为春夏带来的新趋势',
    excerptEn: 'Today, "outdoors" is no longer just about camping, hiking, climbing, or fishing. The concept now stretches to outdoor living at home, camping-inspired coffee shops and bars, and a more integrated commercial ecosystem.',
    excerptZh: '如今，"户外"不再只是关于露营、徒步、攀岩或钓鱼。这个概念现在延伸到家庭户外生活、露营风格的咖啡店和酒吧，以及更融合的商业生态系统。',
    date: '2025-08-13',
    categoryEn: 'Lifestyle',
    categoryZh: '生活方式',
    slug: '10-new-outdoor-lifestyle-brands-spring-summer',
    imagePath: '/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-12_03.jpg'
  },
  {
    titleEn: 'How Is Louis Vuitton Deepening Its Brand Influence in China?',
    titleZh: '路易威登如何深化其在中国的影响力？',
    excerptEn: 'An in-depth look at how luxury brands are adapting their strategies to connect with Chinese consumers in new and meaningful ways.',
    excerptZh: '深入探讨奢侈品牌如何调整策略，以新的、有意义的方式与中国消费者建立联系。',
    date: '2025-06-27',
    categoryEn: 'Luxury',
    categoryZh: '奢侈品',
    slug: 'louis-vuitton-deepening-brand-influence-china',
    imagePath: '/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-12_02.jpg'
  }
]

async function migrateArticles() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN
  })

  try {
    const space = await client.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT)
    const contentType = await environment.getContentType('blogPost')

    console.log('开始迁移文章到 Contentful...\n')

    for (const article of articles) {
      try {
        // 检查是否已存在相同 slug 的文章
        const existingEntries = await environment.getEntries({
          content_type: 'blogPost',
          'fields.slug': article.slug
        })

        if (existingEntries.items.length > 0) {
          console.log(`文章 "${article.titleEn}" (slug: ${article.slug}) 已存在，跳过...`)
          continue
        }

        // 创建新文章
        const entry = await environment.createEntry('blogPost', {
          fields: {
            titleEn: {
              'en-US': article.titleEn
            },
            titleZh: {
              'en-US': article.titleZh
            },
            excerptEn: {
              'en-US': article.excerptEn
            },
            excerptZh: {
              'en-US': article.excerptZh
            },
            date: {
              'en-US': article.date
            },
            categoryEn: {
              'en-US': article.categoryEn
            },
            categoryZh: {
              'en-US': article.categoryZh
            },
            slug: {
              'en-US': article.slug
            }
          }
        })

        // 发布文章
        await entry.publish()

        console.log(`✅ 成功创建并发布文章: "${article.titleEn}"`)
      } catch (error) {
        console.error(`❌ 创建文章 "${article.titleEn}" 失败:`, error.message)
      }
    }

    console.log('\n迁移完成！')
    console.log('\n注意：图片需要手动在 Contentful 中上传并关联到文章。')
    console.log('图片路径参考：')
    articles.forEach(article => {
      console.log(`  - ${article.slug}: ${article.imagePath}`)
    })
  } catch (error) {
    console.error('迁移失败:', error)
  }
}

// 运行迁移
migrateArticles().catch(console.error)

