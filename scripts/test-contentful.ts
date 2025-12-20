/**
 * 测试 Contentful 连接和内容获取
 * 用于验证 Contentful 集成是否正常工作
 */

import { createClient } from 'contentful'

const SPACE_ID = 'wbpsfgfg62v2'
const ACCESS_TOKEN = 'SC3uHU9IpDRUupw9kgCNwYibHVDetHX42LEheBRnxwU'
const ENVIRONMENT = 'master'

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  environment: ENVIRONMENT,
  host: 'preview.contentful.com', // 使用 Preview API
})

async function testContentful() {
  console.log('🔍 测试 Contentful 连接...\n')

  try {
    // 1. 测试空间连接
    console.log('1️⃣ 测试空间连接...')
    const space = await client.getSpace()
    console.log(`✅ 空间名称: ${space.name}`)
    console.log(`✅ 空间 ID: ${space.sys.id}\n`)

    // 2. 测试获取 Content Type
    console.log('2️⃣ 测试获取 Content Type...')
    const contentType = await client.getContentType('blogPost')
    console.log(`✅ Content Type: ${contentType.name}`)
    console.log(`✅ 字段列表:`)
    contentType.fields.forEach((field: any) => {
      console.log(`   - ${field.id} (${field.type})${field.localized ? ' [本地化]' : ''}`)
    })
    console.log()

    // 3. 测试获取所有文章（英文）
    console.log('3️⃣ 测试获取文章（英文）...')
    const entriesEn = await client.getEntries({
      content_type: 'blogPost',
      locale: 'en-US',
      limit: 10,
    })
    console.log(`✅ 找到 ${entriesEn.total} 篇文章`)
    if (entriesEn.items.length > 0) {
      entriesEn.items.forEach((entry: any) => {
        console.log(`   - ${entry.fields.title || '无标题'} (ID: ${entry.sys.id})`)
        if (entry.fields.title) {
          console.log(`     标题 (en-US): ${entry.fields.title}`)
        }
        if (entry.fields.title && typeof entry.fields.title === 'object') {
          console.log(`     可用语言: ${Object.keys(entry.fields.title).join(', ')}`)
        }
      })
    }
    console.log()

    // 4. 测试获取所有文章（中文）
    console.log('4️⃣ 测试获取文章（中文）...')
    const entriesZh = await client.getEntries({
      content_type: 'blogPost',
      locale: 'zh',
      limit: 10,
    })
    console.log(`✅ 找到 ${entriesZh.total} 篇文章`)
    if (entriesZh.items.length > 0) {
      entriesZh.items.forEach((entry: any) => {
        console.log(`   - ${entry.fields.title || '无标题'} (ID: ${entry.sys.id})`)
        if (entry.fields.title) {
          console.log(`     标题 (zh-CN): ${entry.fields.title}`)
        }
        if (entry.fields.title && typeof entry.fields.title === 'object') {
          console.log(`     可用语言: ${Object.keys(entry.fields.title).join(', ')}`)
        }
      })
    }
    console.log()

    // 5. 测试获取所有可用语言
    console.log('5️⃣ 测试获取所有可用语言...')
    const locales = await client.getLocales()
    console.log(`✅ 可用语言:`)
    locales.items.forEach((locale: any) => {
      console.log(`   - ${locale.code} (${locale.name})${locale.default ? ' [默认]' : ''}`)
    })
    console.log()

    console.log('✅ 所有测试通过！Contentful 集成正常工作。')
    console.log('\n📝 提示:')
    console.log('   - 如果看到文章但没有中英文内容，需要在 Contentful 后台为每个字段填写双语内容')
    console.log('   - 在 Contentful 后台，切换到不同语言（右上角语言选择器）来填写不同语言的内容')
    console.log('   - 确保所有字段都启用了 Localization')

  } catch (error: any) {
    console.error('❌ 错误:', error.message)
    if (error.response) {
      console.error('   状态码:', error.response.status)
      console.error('   详情:', JSON.stringify(error.response.data, null, 2))
    }
    process.exit(1)
  }
}

testContentful()

