/**
 * Contentful 配置
 */
export const contentfulConfig = {
  spaceId: 'wbpsfgfg62v2',
  accessToken: 'DN_cZeDWpTQcwTgML-lYyvDkLOemgEAOcQXsIlcACsk',
  environment: 'master',
  contentTypeId: 'blogPost'
}

// Contentful API 基础 URL
export const CONTENTFUL_API_BASE = `https://cdn.contentful.com/spaces/${contentfulConfig.spaceId}/environments/${contentfulConfig.environment}`

