# SaaS 服务快速接入指南

## 🚀 快速开始

所有 SaaS 服务配置都在 `src/config/saas.ts` 文件中，只需要填入你的服务配置即可！

---

## 📋 需要接入的服务清单

### 1. 📧 联系我们表单 (Contact Form)

**推荐服务**: **Formspree** (最简单，免费版每月50条)

#### 使用 Formspree（推荐）

1. 注册账号: https://formspree.io
2. 创建表单，获取 endpoint URL（例如：`https://formspree.io/f/YOUR_FORM_ID`）
3. 在 `src/config/saas.ts` 中配置：

```typescript
contact: {
  provider: 'formspree',
  formspree: {
    endpoint: 'https://formspree.io/f/YOUR_FORM_ID', // 填入你的 endpoint
  }
}
```

**完成！** 表单会自动提交到 Formspree，你可以在 Formspree 后台查看所有提交。

#### 其他选项

- **Typeform**: 适合需要更复杂表单的场景
- **Google Forms**: 免费但样式受限
- **自定义 API**: 如果你有自己的后端

---

### 2. 📬 Newsletter 邮件订阅

**推荐服务**: **Mailchimp** (免费版支持 500 联系人)

#### 使用 Mailchimp

1. 注册账号: https://mailchimp.com
2. 创建邮件列表，获取：
   - API Key（在 Account > Extras > API keys）
   - List ID（在 Audience > Settings > Audience name and defaults）
   - Server Prefix（API Key 中的前缀，例如 `us1`）

2. 在 `src/config/saas.ts` 中配置：

```typescript
newsletter: {
  provider: 'mailchimp',
  mailchimp: {
    apiKey: 'YOUR_API_KEY',
    listId: 'YOUR_LIST_ID',
    serverPrefix: 'us1', // 从 API Key 中获取
  }
}
```

#### 其他选项

- **ConvertKit**: 适合内容创作者
- **SendGrid**: 适合开发者
- **自定义 API**: 如果你有自己的邮件服务

---

### 3. 🔐 产品验真

**推荐**: 使用你自己的 API 或第三方防伪服务

在 `src/config/saas.ts` 中配置：

```typescript
authentication: {
  provider: 'custom',
  custom: {
    endpoint: 'https://your-api.com/verify', // 你的验真 API
    method: 'POST',
  }
}
```

**API 响应格式**:
```json
{
  "authentic": true,  // true = 正品, false = 假货
  "message": "验证成功"
}
```

---

### 4. 💼 职位申请 (Careers)

**推荐**: 使用 **Formspree**（支持文件上传）

1. 在 Formspree 创建新表单
2. 在 `src/config/saas.ts` 中配置：

```typescript
careers: {
  provider: 'formspree',
  formspree: {
    endpoint: 'https://formspree.io/f/YOUR_CAREER_FORM_ID',
  }
}
```

---

### 5. 📝 Blog/Insights 文章

**当前**: 使用静态数据（硬编码）

如果需要动态内容，可以：
- 使用 CMS（Contentful, Strapi, Sanity）
- 或继续使用静态数据（手动更新）

---

## ⚙️ 配置步骤

### 步骤 1: 打开配置文件

编辑文件：`src/config/saas.ts`

### 步骤 2: 填入你的服务配置

找到对应的服务，填入配置信息：

```typescript
export const saasConfig = {
  contact: {
    provider: 'formspree', // 选择服务商
    formspree: {
      endpoint: '你的 endpoint', // 填入配置
    }
  },
  // ... 其他服务
}
```

### 步骤 3: 完成！

代码已经自动集成了这些服务，配置好后直接使用即可。

---

## 🔒 安全提示（可选）

如果不想在代码中暴露 API Key，可以使用环境变量：

1. 创建 `.env` 文件：
```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
VITE_MAILCHIMP_API_KEY=your_api_key
VITE_MAILCHIMP_LIST_ID=your_list_id
```

2. 在 `src/config/saas.ts` 中会自动读取环境变量

---

## 📦 推荐服务对比

| 服务 | 免费额度 | 优点 | 适用场景 |
|------|---------|------|----------|
| **Formspree** | 50条/月 | 最简单，零代码 | 表单提交 |
| **Mailchimp** | 500联系人 | 功能强大 | 邮件营销 |
| **ConvertKit** | 1000订阅者 | 适合内容创作者 | 邮件订阅 |
| **Typeform** | 10条/月 | 交互体验好 | 复杂表单 |

---

## ✅ 检查清单

- [ ] Contact 表单配置完成
- [ ] Newsletter 订阅配置完成
- [ ] 产品验真 API 配置完成
- [ ] 职位申请表单配置完成（如需要）
- [ ] 测试所有表单提交功能
- [ ] 检查错误处理

---

## 🆘 常见问题

**Q: Formspree 免费版够用吗？**  
A: 免费版每月 50 条，对于小型网站通常够用。超出后可以升级或使用其他服务。

**Q: Mailchimp 需要验证域名吗？**  
A: 免费版不需要，但验证域名可以提高邮件送达率。

**Q: 可以同时使用多个服务吗？**  
A: 可以，每个功能可以独立选择不同的服务商。

**Q: 如何测试配置是否正确？**  
A: 在网站上提交表单，然后到对应的 SaaS 服务后台查看是否收到数据。

---

## 📞 需要帮助？

如果遇到问题，检查：
1. 配置信息是否正确
2. API Key 是否有效
3. 网络请求是否成功（打开浏览器开发者工具查看）

