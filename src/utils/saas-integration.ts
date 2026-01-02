/**
 * SaaS 服务集成工具函数
 * 统一处理各种 SaaS 服务的 API 调用
 */

import { saasConfig } from '@/config/saas'

// ============================================
// 1. 联系我们表单提交
// ============================================
export async function submitContactForm(data: {
  name: string
  email: string
  company?: string
  message: string
}) {
  const config = saasConfig.contact

  switch (config.provider) {
    case 'formspree':
      // Formspree - 最简单的方式
      return fetch(config.formspree.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [config.formspree.fieldMapping.name]: data.name,
          [config.formspree.fieldMapping.email]: data.email,
          [config.formspree.fieldMapping.company]: data.company,
          [config.formspree.fieldMapping.message]: data.message,
        }),
      })

    case 'custom':
      // 自定义 API
      return fetch(config.custom.endpoint, {
        method: config.custom.method as RequestInit['method'],
        headers: {
          'Content-Type': 'application/json',
          ...config.custom.headers,
        },
        body: JSON.stringify(data),
      })

    default:
      throw new Error(`Unsupported contact form provider: ${config.provider}`)
  }
}

// ============================================
// 2. Newsletter 订阅
// ============================================
export async function subscribeNewsletter(email: string) {
  const config = saasConfig.newsletter

  switch (config.provider) {
    case 'mailchimp':
      // Mailchimp API v3
      const endpoint = config.mailchimp.endpoint || 
        `https://${config.mailchimp.serverPrefix}.api.mailchimp.com/3.0/lists/${config.mailchimp.listId}/members`
      
      return fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.mailchimp.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      })

    case 'convertkit':
      // ConvertKit API
      const convertkitEndpoint = config.convertkit.endpoint || 
        `https://api.convertkit.com/v3/forms/${config.convertkit.formId}/subscribe`
      
      return fetch(convertkitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: config.convertkit.apiKey,
          email: email,
        }),
      })

    case 'sendgrid':
      // SendGrid API
      return fetch(config.sendgrid.endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${config.sendgrid.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          list_ids: [config.sendgrid.listId],
          contacts: [{
            email: email,
          }],
        }),
      })

    case 'custom':
      return fetch(config.custom.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

    default:
      throw new Error(`Unsupported newsletter provider: ${config.provider}`)
  }
}

// ============================================
// 3. 产品验真
// ============================================
export async function verifyProduct(code: string) {
  const config = saasConfig.authentication

  switch (config.provider) {
    case 'custom':
      // 使用cha12315.com API
      // API文档: https://cha12315.com/api/wiki.html
      // 根据API文档，请求格式为: POST, Content-Type: application/json, body: {"code": "验证码"}
      const apiUrl = config.custom.endpoint || 'https://cha12315.com/api/wiki.html'
      return fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim(),
        }),
      })

    case 'third-party':
      return fetch(config.thirdParty.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.thirdParty.apiKey}`,
        },
        body: JSON.stringify({ code }),
      })

    default:
      throw new Error(`Unsupported authentication provider: ${config.provider}`)
  }
}

// ============================================
// 4. 职位申请
// ============================================
export async function submitJobApplication(data: {
  positionId: string
  name: string
  email: string
  phone: string
  resume?: File | string
  coverLetter?: string
  [key: string]: any
}) {
  const config = saasConfig.careers

  switch (config.provider) {
    case 'formspree':
      // Formspree 支持文件上传
      const formData = new FormData()
      Object.keys(data).forEach(key => {
        if (data[key] instanceof File) {
          formData.append(key, data[key])
        } else {
          formData.append(key, String(data[key]))
        }
      })

      return fetch(config.formspree.endpoint, {
        method: 'POST',
        body: formData,
      })

    case 'crm':
      // CRM 集成（如 HubSpot）
      if (config.crm?.provider === 'hubspot') {
        return fetch(config.crm.hubspot.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      }
      break

    case 'custom':
      return fetch(config.custom.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

    default:
      throw new Error(`Unsupported careers provider: ${config.provider}`)
  }
}

