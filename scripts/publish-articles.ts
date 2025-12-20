/**
 * Contentful 文章发布脚本
 * 将现有的 3 篇文章发布到 Contentful
 * 
 * 使用方法：
 * 1. 在 Contentful Settings > API keys 创建 Management API Token
 * 2. 设置环境变量：CONTENTFUL_MANAGEMENT_TOKEN=your_token
 * 3. 运行：npx tsx scripts/publish-articles.ts
 */

import { createClient } from 'contentful-management'

const SPACE_ID = 'wbpsfgfg62v2'
const ENVIRONMENT = 'master'
const CONTENT_TYPE_ID = 'blogPost'

// Management API Token
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN || 'CFPAT-M5hBhkZGc1pH0KslULtoNlMyAjsTPvEnlYFKhUpcMVs'

if (!MANAGEMENT_TOKEN) {
  console.error('❌ 错误：需要设置 CONTENTFUL_MANAGEMENT_TOKEN 环境变量')
  console.log('📝 获取 Management API Token 步骤：')
  console.log('1. 登录 Contentful: https://app.contentful.com/')
  console.log('2. 进入 Settings > API keys')
  console.log('3. 点击 "Content management tokens" 标签（不是 Content preview tokens）')
  console.log('4. 点击 "Generate personal token"')
  console.log('5. 输入名称（如：Article Publisher）')
  console.log('6. 复制 token（只显示一次，请保存）')
  console.log('7. 运行：CONTENTFUL_MANAGEMENT_TOKEN=your_token npx tsx scripts/publish-articles.ts')
  console.log('')
  console.log('⚠️  注意：Content Preview API Token 只能用于预览，不能创建内容')
  console.log('   你需要的是 Management API Token（Content management tokens）')
  process.exit(1)
}

// 3 篇文章的数据
const articles = [
  {
    slug: 'anta-musinsa-leading-next-wave-fashion-china',
    title: {
      'en-US': 'Anta and MUSINSA: Leading the Next Wave of Fashion in China',
      'zh-CN': '安踏与MUSINSA：引领中国时尚新浪潮'
    },
    summary: {
      'en-US': 'Exploring how these brands are reshaping the fashion landscape in China through innovative strategies and consumer engagement.',
      'zh-CN': '探索这些品牌如何通过创新策略和消费者参与重塑中国时尚格局。'
    },
    content: {
      'en-US': {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Exploring how these brands are reshaping the fashion landscape in China through innovative strategies and consumer engagement.',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      },
      'zh-CN': {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: '探索这些品牌如何通过创新策略和消费者参与重塑中国时尚格局。',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }
    },
    publishDateTime: '2025-09-19T00:00:00Z',
    category: {
      'en-US': 'Fashion',
      'zh-CN': '时尚'
    }
  },
  {
    slug: '10-new-outdoor-lifestyle-brands-spring-summer',
    title: {
      'en-US': 'Here\'s What 10 New Outdoor Lifestyle Brands Are Bringing for Spring/Summer',
      'zh-CN': '10个新户外生活方式品牌为春夏带来的新趋势'
    },
    excerpt: {
      'en-US': 'Today, "outdoors" is no longer just about camping, hiking, climbing, or fishing. The concept now stretches to outdoor living at home, camping-inspired coffee shops and bars, and a more integrated commercial ecosystem.',
      'zh-CN': '如今，"户外"不再只是关于露营、徒步、攀岩或钓鱼。这个概念现在延伸到家庭户外生活、露营风格的咖啡店和酒吧，以及更融合的商业生态系统。'
    },
    content: {
      'en-US': {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Today, "outdoors" is no longer just about camping, hiking, climbing, or fishing. The concept now stretches to outdoor living at home, camping-inspired coffee shops and bars, and a more integrated commercial ecosystem.',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      },
      'zh-CN': {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: '如今，"户外"不再只是关于露营、徒步、攀岩或钓鱼。这个概念现在延伸到家庭户外生活、露营风格的咖啡店和酒吧，以及更融合的商业生态系统。',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }
    },
    publishDate: '2025-08-13T00:00:00Z',
    category: {
      'en-US': 'Lifestyle',
      'zh-CN': '生活方式'
    }
  },
  {
    slug: 'louis-vuitton-deepening-brand-influence-china',
    title: {
      'en-US': 'How Is Louis Vuitton Deepening Its Brand Influence in China?',
      'zh-CN': '路易威登如何深化其在中国的影响力？'
    },
    excerpt: {
      'en-US': 'An in-depth look at how luxury brands are adapting their strategies to connect with Chinese consumers in new and meaningful ways.',
      'zh-CN': '深入探讨奢侈品牌如何调整策略，以新的、有意义的方式与中国消费者建立联系。'
    },
    content: {
      'en-US': {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'An in-depth look at how luxury brands are adapting their strategies to connect with Chinese consumers in new and meaningful ways.',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      },
      'zh-CN': {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: '深入探讨奢侈品牌如何调整策略，以新的、有意义的方式与中国消费者建立联系。',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      }
    },
    publishDate: '2025-06-27T00:00:00Z',
    category: {
      'en-US': 'Luxury',
      'zh-CN': '奢侈品'
    }
  }
]

async function publishArticles() {
  try {
    console.log('🚀 开始连接到 Contentful...')
    
    const client = createClient({
      accessToken: MANAGEMENT_TOKEN,
    })

    const space = await client.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT)

    console.log(`✅ 已连接到 Space: ${space.name}`)
    console.log(`✅ 环境: ${ENVIRONMENT}`)
    console.log(`📝 准备发布 ${articles.length} 篇文章...\n`)

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i]
      console.log(`\n[${i + 1}/${articles.length}] 正在创建文章: ${article.slug}`)

      try {
        // 检查是否已存在
        const existingEntries = await environment.getEntries({
          content_type: CONTENT_TYPE_ID,
          'fields.slug[en-US]': article.slug,
          limit: 1,
        })

        if (existingEntries.items.length > 0) {
          console.log(`⚠️  文章已存在，跳过: ${article.slug}`)
          continue
        }

        // 创建新条目（包含中英文内容）
        const entry = await environment.createEntry(CONTENT_TYPE_ID, {
          fields: {
            slug: {
              'en-US': article.slug,
            },
            title: {
              'en-US': article.title['en-US'],
              'zh-CN': article.title['zh-CN'],
            },
            summary: {
              'en-US': article.summary['en-US'],
              'zh-CN': article.summary['zh-CN'],
            },
            content: {
              'en-US': article.content['en-US'],
              'zh-CN': article.content['zh-CN'],
            },
            publishDateTime: {
              'en-US': article.publishDateTime,
              'zh-CN': article.publishDateTime,
            },
            category: {
              'en-US': article.category['en-US'],
              'zh-CN': article.category['zh-CN'],
            },
            // 注意：封面图片需要先上传到 Contentful，这里先留空
            // coverImage 字段需要手动在 Contentful 后台添加
          },
        })

        console.log(`✅ 文章已创建 (ID: ${entry.sys.id})`)

        // 发布文章
        if (entry.isDraft()) {
          const publishedEntry = await entry.publish()
          console.log(`✅ 文章已发布: ${article.slug}`)
        }
      } catch (error: any) {
        console.error(`❌ 创建文章失败: ${article.slug}`)
        console.error(`   错误: ${error.message}`)
        if (error.details?.errors) {
          console.error(`   详情:`, error.details.errors)
        }
      }
    }

    console.log('\n🎉 完成！所有文章已发布到 Contentful')
    console.log('📝 注意：封面图片需要在 Contentful 后台手动上传')
    console.log('   1. 进入 Content > 找到刚创建的文章')
    console.log('   2. 点击 Cover Image 字段')
    console.log('   3. 上传图片并保存')
    console.log('   4. 重新发布文章')
  } catch (error: any) {
    console.error('❌ 错误:', error.message)
    if (error.response?.data) {
      console.error('   详情:', error.response.data)
    }
    process.exit(1)
  }
}

publishArticles()

