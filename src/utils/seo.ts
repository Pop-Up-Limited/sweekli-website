import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  path?: string
}

export function useSEO(config: SEOConfig) {
  const { locale } = useI18n()
  const baseUrl = 'https://www.sweekli.com'
  const fullPath = config.path ? `${baseUrl}${config.path}` : baseUrl
  
  useHead({
    title: `${config.title} - Sweekli`,
    meta: [
      {
        name: 'description',
        content: config.description
      },
      {
        name: 'keywords',
        content: config.keywords || 'Sweekli, 思维颗粒, China market, APAC, brand distribution, e-commerce, marketing'
      },
      // Open Graph
      {
        property: 'og:title',
        content: `${config.title} - Sweekli`
      },
      {
        property: 'og:description',
        content: config.description
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: fullPath
      },
      {
        property: 'og:image',
        content: config.ogImage || `${baseUrl}/logos/sweekli-logo-minimal.svg`
      },
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: `${config.title} - Sweekli`
      },
      {
        name: 'twitter:description',
        content: config.description
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: fullPath
      }
    ]
  })
}

