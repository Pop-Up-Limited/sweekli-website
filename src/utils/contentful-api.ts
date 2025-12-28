/**
 * Contentful API 工具函数
 * 用于获取博客文章数据
 */

import { contentfulConfig, CONTENTFUL_API_BASE } from '@/config/contentful'
import { getImagePath } from '@/utils/imagePath'

export interface BlogPost {
  id: string
  title: string
  titleEn?: string
  titleZh?: string
  excerpt: string
  excerptEn?: string
  excerptZh?: string
  date: string
  category: string
  categoryEn?: string
  categoryZh?: string
  image: string
  slug: string
  content?: string
  contentEn?: string
  contentZh?: string
}

interface ContentfulAsset {
  sys: { id: string }
  fields: {
    file: {
      url: string
    }
  }
}

interface ContentfulEntry {
  sys: {
    id: string
    createdAt: string
    publishedAt?: string
  }
  fields: {
    // 实际 Contentful schema 中的字段
    title?: string | { 'en-US'?: string; 'zh-Hans'?: string }
    titleEn?: string
    titleZh?: string
    excerpt?: string | { 'en-US'?: string; 'zh-Hans'?: string }
    excerptEn?: string
    excerptZh?: string
    date?: string
    publishDateTime?: string
    category?: string | { 'en-US'?: string; 'zh-Hans'?: string }
    categoryEn?: string
    categoryZh?: string
    image?: {
      sys: { id: string }
    }
    coverImage?: {
      sys: { id: string }
    }
    slug?: string
    content?: string | { 'en-US'?: string; 'zh-Hans'?: string }
    contentEn?: string
    contentZh?: string
  }
}

interface ContentfulResponse {
  items: ContentfulEntry[]
  includes?: {
    Asset?: ContentfulAsset[]
  }
}

/**
 * 获取所有博客文章
 */
export async function fetchBlogPosts(locale: 'en' | 'zh' = 'en'): Promise<BlogPost[]> {
  try {
    // 使用 CDN API 获取已发布的内容
    // 注意：当前 Access Token 是 Content Delivery API Token，只能用于 CDN API
    // 如果需要获取未发布的内容，需要使用 Preview API 和 Preview Access Token
    // 使用 publishDateTime 字段排序，因为实际字段名是 publishDateTime，不是 date
    const url = `${CONTENTFUL_API_BASE}/entries?content_type=${contentfulConfig.contentTypeId}&order=-fields.publishDateTime&include=2&access_token=${contentfulConfig.accessToken}`
    
    console.log('Fetching Contentful posts from CDN API')
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Contentful API error:', response.status, errorText)
      throw new Error(`Contentful API error: ${response.status}`)
    }
    
    const data: ContentfulResponse = await response.json()
    console.log('Contentful API response:', {
      total: data.items.length,
      items: data.items.map(item => ({
        id: item.sys.id,
        title: item.fields.title,
        hasCoverImage: !!item.fields.coverImage,
        hasImage: !!item.fields.image,
        published: item.sys.publishedAt
      })),
      assetsCount: data.includes?.Asset?.length || 0,
      assetIds: data.includes?.Asset?.map(a => a.sys.id) || []
    })
    
    // 获取所有图片资源
    const assets = new Map<string, string>()
    if (data.includes?.Asset) {
      data.includes.Asset.forEach(asset => {
        const url = asset.fields.file.url
        assets.set(asset.sys.id, url.startsWith('//') ? `https:${url}` : url)
      })
    }
    
    // 转换数据格式
    const posts: BlogPost[] = data.items.map(entry => {
      const fields = entry.fields
      
      // 辅助函数：从多语言字段中提取值
      const getLocalizedValue = (field: any, locale: 'en' | 'zh'): string => {
        if (!field) return ''
        if (typeof field === 'string') return field
        if (typeof field === 'object') {
          const localeKey = locale === 'en' ? 'en-US' : 'zh-Hans'
          return field[localeKey] || field['en-US'] || Object.values(field)[0] || ''
        }
        return ''
      }
      
      // 根据语言选择字段 - Contentful 实际字段是 title, 不是 titleEn/titleZh
      // 如果字段是字符串，直接使用；如果是多语言对象，根据 locale 提取
      const title = typeof fields.title === 'string' 
        ? fields.title 
        : (fields.titleEn || getLocalizedValue(fields.title, locale) || '')
      
      // 辅助函数：从 Contentful Rich Text 格式中提取纯文本
      const extractTextFromRichText = (richText: any): string => {
        if (!richText) return ''
        if (typeof richText === 'string') return richText
        
        // 处理 Contentful Rich Text 格式
        if (richText.nodeType === 'document' && richText.content) {
          const extractText = (node: any): string => {
            if (node.nodeType === 'text') {
              return node.value || ''
            }
            if (node.content && Array.isArray(node.content)) {
              return node.content.map(extractText).join('')
            }
            return ''
          }
          return richText.content.map(extractText).join(' ').trim()
        }
        
        // 如果是其他格式，尝试提取文本
        return JSON.stringify(richText).replace(/[{}"\[\]]/g, '').substring(0, 150)
      }
      
      // excerpt 字段可能不存在，使用 content 的前150个字符作为 excerpt
      let excerpt = ''
      if (fields.excerpt) {
        excerpt = typeof fields.excerpt === 'string' 
          ? fields.excerpt 
          : (fields.excerptEn || getLocalizedValue(fields.excerpt, locale) || '')
      } else if (fields.content) {
        // 从 content 中提取文本作为 excerpt
        excerpt = extractTextFromRichText(fields.content)
        if (excerpt.length > 150) {
          excerpt = excerpt.substring(0, 150) + '...'
        }
      }
      
      // category 字段可能不存在，使用默认值
      const category = typeof fields.category === 'string'
        ? fields.category
        : (fields.categoryEn || getLocalizedValue(fields.category, locale) || (locale === 'en' ? 'Uncategorized' : '未分类'))
      
      // 获取图片 URL - 支持 image 和 coverImage 字段
      let imageUrl = ''
      const imageField = fields.coverImage || fields.image
      
      if (imageField) {
        // 处理图片字段 - 可能是对象或引用
        let imageId = ''
        if (typeof imageField === 'object' && imageField.sys?.id) {
          imageId = imageField.sys.id
        } else if (typeof imageField === 'string') {
          imageId = imageField
        }
        
        if (imageId) {
          const assetUrl = assets.get(imageId)
          if (assetUrl) {
            // 确保 URL 是完整的
            imageUrl = assetUrl.startsWith('//') ? `https:${assetUrl}` : assetUrl
            console.log(`Found image for entry ${entry.sys.id}:`, imageUrl)
          } else {
            console.warn(`Image asset not found for ID: ${imageId}, available assets:`, Array.from(assets.keys()))
          }
        }
      }
      
      // 如果没有图片，使用默认图片路径
      if (!imageUrl) {
        console.warn(`No image found for entry ${entry.sys.id}, using default`)
        imageUrl = getImagePath('/images/Sweekli 官网介绍 图片素材/1 home banner/1-PC.jpg')
      }
      
      // 获取日期 - 支持 date 和 publishDateTime 字段
      const date = fields.publishDateTime || fields.date || entry.sys.publishedAt || entry.sys.createdAt
      
      // 获取 slug - 如果没有 slug 字段，使用 ID
      const slug = fields.slug || entry.sys.id
      
      // 将 Rich Text 内容转换为纯文本
      const contentText = extractTextFromRichText(fields.content)
      
      return {
        id: entry.sys.id,
        title,
        titleEn: typeof fields.title === 'string' ? fields.title : (fields.titleEn || getLocalizedValue(fields.title, 'en')),
        titleZh: typeof fields.title === 'string' ? fields.title : (fields.titleZh || getLocalizedValue(fields.title, 'zh')),
        excerpt,
        excerptEn: excerpt,
        excerptZh: excerpt,
        date,
        category,
        categoryEn: category,
        categoryZh: category,
        image: imageUrl,
        slug,
        content: contentText,
        contentEn: contentText,
        contentZh: contentText
      }
    })
    
    console.log('Successfully processed posts:', posts.map(p => ({ id: p.id, title: p.title, hasImage: !!p.image })))
    return posts
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error)
    // 返回空数组，避免页面崩溃
    // 在生产环境中，可以返回默认的静态文章作为后备
    return []
  }
}

/**
 * 根据 slug 获取单篇文章
 */
export async function fetchBlogPostBySlug(slug: string, locale: 'en' | 'zh' = 'en'): Promise<BlogPost | null> {
  try {
    // 使用 CDN API 获取已发布的内容
    const url = `${CONTENTFUL_API_BASE}/entries?content_type=${contentfulConfig.contentTypeId}&fields.slug=${slug}&include=2&access_token=${contentfulConfig.accessToken}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Contentful API error: ${response.status}`)
    }
    
    const data: ContentfulResponse = await response.json()
    
    if (data.items.length === 0) {
      return null
    }
    
    const entry = data.items[0]
    const fields = entry.fields
    
    // 获取图片资源
    let imageUrl = ''
    if (fields.image?.sys?.id && data.includes?.Asset) {
      const asset = data.includes.Asset.find(a => a.sys.id === fields.image.sys.id)
      if (asset) {
        const url = asset.fields.file.url
        imageUrl = url.startsWith('//') ? `https:${url}` : url
      }
    }
    
    if (!imageUrl) {
      imageUrl = getImagePath('/images/Sweekli 官网介绍 图片素材/1 home banner/1-PC.jpg')
    }
    
    const title = locale === 'en' 
      ? (fields.titleEn || fields.title || '')
      : (fields.titleZh || fields.title || '')
    
    const excerpt = locale === 'en'
      ? (fields.excerptEn || fields.excerpt || '')
      : (fields.excerptZh || fields.excerpt || '')
    
    const category = locale === 'en'
      ? (fields.categoryEn || fields.category || '')
      : (fields.categoryZh || fields.category || '')
    
    return {
      id: entry.sys.id,
      title,
      titleEn: fields.titleEn || fields.title,
      titleZh: fields.titleZh || fields.title,
      excerpt,
      excerptEn: fields.excerptEn || fields.excerpt,
      excerptZh: fields.excerptZh || fields.excerpt,
      date: fields.date || entry.sys.createdAt,
      category,
      categoryEn: fields.categoryEn || fields.category,
      categoryZh: fields.categoryZh || fields.category,
      image: imageUrl,
      slug: fields.slug || entry.sys.id,
      content: fields.content,
      contentEn: fields.contentEn || fields.content,
      contentZh: fields.contentZh || fields.content
    }
  } catch (error) {
    console.error('Error fetching blog post from Contentful:', error)
    return null
  }
}

// ============================================
// 职位相关接口和函数
// ============================================

export interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string
  isActive: boolean
  order?: number
}

interface JobPostingEntry {
  sys: {
    id: string
    createdAt: string
    publishedAt?: string
  }
  fields: {
    title?: string
    department?: string
    location?: string
    type?: string
    description?: string
    requirements?: string
    isActive?: boolean
    order?: number
  }
}

interface JobPostingResponse {
  items: JobPostingEntry[]
}

/**
 * 获取所有职位
 */
export async function fetchJobPostings(): Promise<JobPosting[]> {
  try {
    // 获取所有已发布的职位，按order字段排序（如果存在），否则按创建时间倒序
    // 注意：Contentful的order参数格式是 -fields.order,-sys.createdAt
    const url = `${CONTENTFUL_API_BASE}/entries?content_type=${contentfulConfig.jobPostingContentTypeId}&order=-fields.order,-sys.createdAt&access_token=${contentfulConfig.accessToken}`
    
    console.log('Fetching job postings from Contentful')
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Contentful API error:', response.status, errorText)
      throw new Error(`Contentful API error: ${response.status}`)
    }
    
    const data: JobPostingResponse = await response.json()
    console.log('Contentful job postings response:', {
      total: data.items.length,
      items: data.items.map(item => ({
        id: item.sys.id,
        title: item.fields.title,
        isActive: item.fields.isActive,
        published: !!item.sys.publishedAt
      }))
    })
    
    // 转换数据格式，只返回isActive为true的职位
    const jobs: JobPosting[] = data.items
      .filter(entry => {
        // 只返回已发布且isActive为true的职位
        const isPublished = !!entry.sys.publishedAt
        const isActive = entry.fields.isActive !== false // 默认为true
        return isPublished && isActive
      })
      .map(entry => {
        const fields = entry.fields
        return {
          id: entry.sys.id,
          title: fields.title || '',
          department: fields.department || '',
          location: fields.location || '',
          type: fields.type || '',
          description: fields.description || '',
          requirements: fields.requirements || '',
          isActive: fields.isActive !== false,
          order: fields.order || 999 // 如果没有order，默认999（排在最后）
        }
      })
      .sort((a, b) => {
        // 按order排序，数字越小越靠前
        const orderA = a.order || 999
        const orderB = b.order || 999
        return orderA - orderB
      })
    
    console.log('Successfully processed job postings:', jobs.map(j => ({ id: j.id, title: j.title, order: j.order })))
    return jobs
  } catch (error) {
    console.error('Error fetching job postings from Contentful:', error)
    // 返回空数组，避免页面崩溃
    return []
  }
}

