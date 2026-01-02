/**
 * SaaS 服务配置
 * 在这里填入你使用的 SaaS 服务的配置信息
 */

export const saasConfig = {
  // ============================================
  // 1. 联系我们表单 (Contact Form)
  // ============================================
  // 推荐服务：Formspree, Typeform, Google Forms, JotForm
  
  contact: {
    // 方式1: Formspree (最简单，免费版每月50条)
    // 注册地址: https://formspree.io
    // 使用方式: 注册后获取 endpoint URL，填入下方
    provider: 'formspree', // 'formspree' | 'typeform' | 'custom'
    
    // Formspree 配置
    formspree: {
      endpoint: '', // 例如: 'https://formspree.io/f/YOUR_FORM_ID'
      // 可选：自定义字段映射
      fieldMapping: {
        name: 'name',
        email: 'email',
        company: 'company',
        message: 'message'
      }
    },
    
    // Typeform 配置（如果需要嵌入）
    typeform: {
      formId: '', // Typeform 表单 ID
      embedUrl: '' // Typeform 嵌入 URL
    },
    
    // 自定义 API（如果使用其他服务）
    custom: {
      endpoint: '', // 你的 API endpoint
      method: 'POST', // 'POST' | 'GET'
      headers: {} // 自定义 headers
    }
  },

  // ============================================
  // 2. Newsletter 邮件订阅
  // ============================================
  // 推荐服务：Mailchimp, ConvertKit, SendGrid
  
  newsletter: {
    provider: 'mailchimp', // 'mailchimp' | 'convertkit' | 'sendgrid' | 'custom'
    
    // Mailchimp 配置
    mailchimp: {
      apiKey: '', // Mailchimp API Key
      listId: '', // 邮件列表 ID
      serverPrefix: '', // 例如: 'us1', 'us2' 等
      endpoint: '' // 自动生成: `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`
    },
    
    // ConvertKit 配置
    convertkit: {
      apiKey: '', // ConvertKit API Key
      formId: '', // 表单 ID
      endpoint: '' // `https://api.convertkit.com/v3/forms/${formId}/subscribe`
    },
    
    // SendGrid 配置
    sendgrid: {
      apiKey: '', // SendGrid API Key
      listId: '', // 联系人列表 ID
      endpoint: 'https://api.sendgrid.com/v3/marketing/contacts'
    },
    
    // 自定义
    custom: {
      endpoint: ''
    }
  },

  // ============================================
  // 3. 产品验真 (Product Authentication)
  // ============================================
  // 推荐：自定义 API 或第三方防伪服务
  
  authentication: {
    provider: 'custom', // 'custom' | 'third-party'
    
    // 自定义 API - cha12315.com
    custom: {
      endpoint: 'https://cha12315.com/api/wiki.html', // cha12315.com API endpoint
      method: 'POST',
      // 请求格式
      requestFormat: {
        code: 'code' // 字段名映射
      }
    },
    
    // 第三方服务（如果有）
    thirdParty: {
      serviceName: '', // 服务商名称
      endpoint: '',
      apiKey: ''
    }
  },

  // ============================================
  // 4. 职位申请 (Careers)
  // ============================================
  // 推荐：使用表单服务（如 Formspree）或 CRM
  
  careers: {
    provider: 'formspree', // 'formspree' | 'typeform' | 'crm' | 'custom'
    
    // Formspree 配置（推荐）
    formspree: {
      endpoint: '', // 例如: 'https://formspree.io/f/YOUR_CAREER_FORM_ID'
    },
    
    // CRM 配置（如 HubSpot）
    crm: {
      provider: 'hubspot', // 'hubspot' | 'salesforce' | 'pipedrive'
      hubspot: {
        portalId: '',
        formId: '',
        endpoint: '' // HubSpot 表单提交 endpoint
      }
    },
    
    // 自定义
    custom: {
      endpoint: ''
    }
  },

  // ============================================
  // 5. Blog/Insights 文章
  // ============================================
  // 推荐：CMS 服务（Contentful, Strapi, Sanity）或静态数据
  
  blog: {
    provider: 'static', // 'static' | 'cms' | 'custom'
    
    // CMS 配置
    cms: {
      provider: 'contentful', // 'contentful' | 'strapi' | 'sanity'
      contentful: {
        spaceId: '',
        accessToken: '',
        environment: 'master'
      },
      strapi: {
        endpoint: '', // Strapi API endpoint
        apiKey: ''
      }
    },
    
    // 自定义 API
    custom: {
      endpoint: '' // 文章列表 API
    }
  }
}

// 环境变量配置（可选，更安全）
// 在 .env 文件中配置，然后在这里读取
export const getSaasConfig = () => {
  return {
    contact: {
      ...saasConfig.contact,
      formspree: {
        ...saasConfig.contact.formspree,
        endpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || saasConfig.contact.formspree.endpoint
      }
    },
    newsletter: {
      ...saasConfig.newsletter,
      mailchimp: {
        ...saasConfig.newsletter.mailchimp,
        apiKey: import.meta.env.VITE_MAILCHIMP_API_KEY || saasConfig.newsletter.mailchimp.apiKey,
        listId: import.meta.env.VITE_MAILCHIMP_LIST_ID || saasConfig.newsletter.mailchimp.listId
      }
    },
    // ... 其他配置
  }
}

