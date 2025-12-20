/**
 * Contentful API 集成
 * 用于从 Contentful CMS 获取博客文章
 */

import { createClient, Entry, Asset } from 'contentful'

// Contentful 配置
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID || 'wbpsfgfg62v2'
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || 'DN_cZeDWpTQcwTgML-lYyvDkLOemgEAOcQXsIlcACsk'
const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'

// 创建 Contentful Client
export const contentfulClient = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  environment: ENVIRONMENT,
})

// Contentful 文章字段类型
interface ContentfulBlogPostFields {
  slug: { [locale: string]: string }
  title: { [locale: string]: string }
  excerpt: { [locale: string]: string }
  content: { [locale: string]: any } // Rich text
  coverImage: { [locale: string]: Asset }
  publishDate: { [locale: string]: string }
  category: { [locale: string]: string }
}

interface ContentfulBlogPost extends Entry {
  fields: ContentfulBlogPostFields
}

// 转换后的文章类型（用于网站展示）
export interface BlogArticle {
  id: string
  title: string
  excerpt: string
  content?: any // Rich text content
  date: string
  category: string
  image: string
  slug: string
}

/**
 * 获取图片 URL
 */
function getImageUrl(asset: Asset | undefined): string {
  if (!asset || !asset.fields?.file) {
    return ''
  }
  const file = asset.fields.file
  if (file.url?.startsWith('//')) {
    return `https:${file.url}`
  }
  return file.url || ''
}

/**
 * 获取本地化字段值
 */
function getLocalizedField(
  field: { [locale: string]: any } | undefined,
  locale: string
): string {
  if (!field) return ''
  
  // 优先使用指定语言，如果没有则使用英文，再没有则使用第一个可用值
  return field[locale] || field['en-US'] || field[Object.keys(field)[0]] || ''
}

/**
 * 转换 Contentful 文章为网站格式
 */
function transformArticle(
  entry: ContentfulBlogPost,
  locale: string = 'en-US'
): BlogArticle {
  const fields = entry.fields
  const contentLocale = locale === 'zh' ? 'zh-CN' : 'en-US'
  
  // 获取封面图片
  const coverImageAsset = fields.coverImage?.[contentLocale] || fields.coverImage?.['en-US']
  const imageUrl = getImageUrl(coverImageAsset)
  
  return {
    id: entry.sys.id,
    title: getLocalizedField(fields.title, contentLocale),
    excerpt: getLocalizedField(fields.excerpt, contentLocale),
    content: fields.content?.[contentLocale] || fields.content?.['en-US'],
    date: fields.publishDate?.[contentLocale] || fields.publishDate?.['en-US'] || entry.sys.createdAt,
    category: getLocalizedField(fields.category, contentLocale),
    image: imageUrl,
    slug: fields.slug?.[contentLocale] || fields.slug?.['en-US'] || entry.sys.id,
  }
}

/**
 * 获取所有博客文章
 */
export async function getBlogArticles(
  locale: string = 'en-US',
  options?: {
    limit?: number
    skip?: number
    orderBy?: string
    featured?: boolean
  }
): Promise<BlogArticle[]> {
  try {
    const query: any = {
      content_type: 'blogPost',
      order: options?.orderBy === 'date' ? '-fields.publishDate' : '-sys.createdAt',
      locale: locale === 'zh' ? 'zh-CN' : 'en-US',
    }

    if (options?.limit) {
      query.limit = options.limit
    }

    if (options?.skip) {
      query.skip = options.skip
    }

    // 如果 Content Model 有 featured 字段，可以添加筛选
    // if (options?.featured) {
    //   query['fields.featured'] = true
    // }

    const response = await contentfulClient.getEntries<ContentfulBlogPostFields>(query)
    
    return response.items.map((entry) => 
      transformArticle(entry as ContentfulBlogPost, locale)
    )
  } catch (error) {
    console.error('Error fetching blog articles from Contentful:', error)
    return []
  }
}

/**
 * 根据 slug 获取单篇文章
 */
export async function getBlogArticleBySlug(
  slug: string,
  locale: string = 'en-US'
): Promise<BlogArticle | null> {
  try {
    const contentLocale = locale === 'zh' ? 'zh-CN' : 'en-US'
    
    const response = await contentfulClient.getEntries<ContentfulBlogPostFields>({
      content_type: 'blogPost',
      'fields.slug': slug,
      locale: contentLocale,
      limit: 1,
    })

    if (response.items.length === 0) {
      return null
    }

    return transformArticle(response.items[0] as ContentfulBlogPost, locale)
  } catch (error) {
    console.error('Error fetching blog article by slug:', error)
    return null
  }
}

/**
 * 获取文章总数（用于分页）
 */
export async function getBlogArticlesCount(): Promise<number> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blogPost',
      limit: 0,
    })
    return response.total
  } catch (error) {
    console.error('Error fetching blog articles count:', error)
    return 0
  }
}

