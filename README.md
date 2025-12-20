# Sweekli 思维颗粒 - 官网

全球生活方式品牌中国与亚太市场增长平台官方网站。

## 🌐 网站链接

**GitHub Pages**: https://pop-up-limited.github.io/sweekli-website/

> 注意：如果还没有配置 GitHub Pages，需要在仓库 Settings > Pages 中启用

## 📚 后端服务接入

**详细的后端服务接入文档**: 请查看 [后端服务接入文档.md](./后端服务接入文档.md)

该文档包含所有需要接入的后端服务清单、API 接口规范、代码示例和接入检查清单。

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **路由**: Vue Router 4
- **国际化**: Vue I18n 9
- **动画**: GSAP, @vueuse/motion
- **工具库**: @vueuse/core

## 项目结构

```
src/
├── components/
│   ├── home/           # 首页组件
│   │   ├── HeroSection.vue
│   │   ├── StatsSection.vue
│   │   ├── HowItWorks.vue
│   │   ├── WhyChina.vue
│   │   ├── BrandsShowcase.vue
│   │   ├── SuccessStories.vue
│   │   └── CTASection.vue
│   └── layout/         # 布局组件
│       ├── Header.vue
│       └── Footer.vue
├── i18n/               # 国际化
│   ├── en.ts          # 英文翻译
│   ├── zh.ts          # 中文翻译
│   └── index.ts
├── router/             # 路由配置
├── styles/             # 全局样式
│   ├── variables.css  # CSS变量
│   └── global.css     # 全局样式
├── views/              # 页面视图
│   ├── Home.vue
│   ├── About.vue
│   ├── Services.vue
│   ├── Brands.vue
│   ├── Contact.vue
│   ├── Authentication.vue
│   └── Careers.vue    # 仅中文版
├── App.vue
└── main.ts
```

## 页面说明

### 英文版页面
1. **Home** - 首页
2. **About** - 关于我们
3. **Services** - 服务介绍
4. **Brands** - 合作品牌
5. **Contact** - 联系我们
6. **Authentication** - 正品查询

### 中文版页面（额外）
7. **Careers** - 加入我们（招聘）

## 品牌规范

### 主色调
- 主色: `#282E45` (深藏蓝)
- 辅助色: `#6f7bd4`, `#434dc4`, `#ff5a27`, `#f962ce`, `#8BE89C`, `#c1a7e2`

### 字体
- 英文: Outfit, Bricolage Grotesque
- 中文: Noto Sans SC

## 待接入功能

### 表单提交
联系我们页面的表单预留了CRM接口，需要后续接入：
```typescript
// src/views/Contact.vue
const handleSubmit = () => {
  // TODO: Integrate with CRM API
  console.log('Form submitted:', formData.value)
}
```

### 正品查询API
正品查询页面需要调用服务商的API接口（根据需求文档）：
```typescript
// src/views/Authentication.vue
const verifyProduct = async () => {
  // TODO: 调用服务商的API接口
  // 需求文档说明：很简单,一段js代码,需要部署下改一下布局
}
```

### IP地理位置判断
正品查询页面需要根据IP跳转到中英文版本（根据需求文档）：
```typescript
// src/views/Authentication.vue
// 需求文档说明：如果访问IP在境内,就跳转中文版的正品查询,如果是境外,就跳转英文版的防伪查询
```


## 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 素材说明

项目中的图片素材使用占位符，需要替换为实际素材：
- 品牌Logo
- 团队照片
- 产品图片
- 成功案例图片
- 办公室/门店照片

素材文件夹位置：
- `/Users/jinyili/Downloads/Sweekli` - 英文PPT素材
- `/Users/jinyili/Downloads/思维颗粒` - 中文PPT素材
- `/Users/jinyili/Downloads/Sweekli 品牌视觉识别规范手册(1)` - 品牌规范

## 部署

项目可以部署到任何支持静态网站的平台：
- Vercel
- Netlify
- Cloudflare Pages
- 阿里云OSS
- 腾讯云COS

## License

© 2025 Sweekli 思维颗粒. All rights reserved.

**GitHub Pages**: https://pop-up-limited.github.io/sweekli-website/

> 注意：如果还没有配置 GitHub Pages，需要在仓库 Settings > Pages 中启用

## 📚 后端服务接入

**详细的后端服务接入文档**: 请查看 [后端服务接入文档.md](./后端服务接入文档.md)

该文档包含所有需要接入的后端服务清单、API 接口规范、代码示例和接入检查清单。

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **路由**: Vue Router 4
- **国际化**: Vue I18n 9
- **动画**: GSAP, @vueuse/motion
- **工具库**: @vueuse/core

## 项目结构

```
src/
├── components/
│   ├── home/           # 首页组件
│   │   ├── HeroSection.vue
│   │   ├── StatsSection.vue
│   │   ├── HowItWorks.vue
│   │   ├── WhyChina.vue
│   │   ├── BrandsShowcase.vue
│   │   ├── SuccessStories.vue
│   │   └── CTASection.vue
│   └── layout/         # 布局组件
│       ├── Header.vue
│       └── Footer.vue
├── i18n/               # 国际化
│   ├── en.ts          # 英文翻译
│   ├── zh.ts          # 中文翻译
│   └── index.ts
├── router/             # 路由配置
├── styles/             # 全局样式
│   ├── variables.css  # CSS变量
│   └── global.css     # 全局样式
├── views/              # 页面视图
│   ├── Home.vue
│   ├── About.vue
│   ├── Services.vue
│   ├── Brands.vue
│   ├── Contact.vue
│   ├── Authentication.vue
│   └── Careers.vue    # 仅中文版
├── App.vue
└── main.ts
```

## 页面说明

### 英文版页面
1. **Home** - 首页
2. **About** - 关于我们
3. **Services** - 服务介绍
4. **Brands** - 合作品牌
5. **Contact** - 联系我们
6. **Authentication** - 正品查询

### 中文版页面（额外）
7. **Careers** - 加入我们（招聘）

## 品牌规范

### 主色调
- 主色: `#282E45` (深藏蓝)
- 辅助色: `#6f7bd4`, `#434dc4`, `#ff5a27`, `#f962ce`, `#8BE89C`, `#c1a7e2`

### 字体
- 英文: Outfit, Bricolage Grotesque
- 中文: Noto Sans SC

## 待接入功能

### 表单提交
联系我们页面的表单预留了CRM接口，需要后续接入：
```typescript
// src/views/Contact.vue
const handleSubmit = () => {
  // TODO: Integrate with CRM API
  console.log('Form submitted:', formData.value)
}
```

### 正品查询API
正品查询页面需要调用服务商的API接口（根据需求文档）：
```typescript
// src/views/Authentication.vue
const verifyProduct = async () => {
  // TODO: 调用服务商的API接口
  // 需求文档说明：很简单,一段js代码,需要部署下改一下布局
}
```

### IP地理位置判断
正品查询页面需要根据IP跳转到中英文版本（根据需求文档）：
```typescript
// src/views/Authentication.vue
// 需求文档说明：如果访问IP在境内,就跳转中文版的正品查询,如果是境外,就跳转英文版的防伪查询
```


## 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 素材说明

项目中的图片素材使用占位符，需要替换为实际素材：
- 品牌Logo
- 团队照片
- 产品图片
- 成功案例图片
- 办公室/门店照片

素材文件夹位置：
- `/Users/jinyili/Downloads/Sweekli` - 英文PPT素材
- `/Users/jinyili/Downloads/思维颗粒` - 中文PPT素材
- `/Users/jinyili/Downloads/Sweekli 品牌视觉识别规范手册(1)` - 品牌规范

## 部署

项目可以部署到任何支持静态网站的平台：
- Vercel
- Netlify
- Cloudflare Pages
- 阿里云OSS
- 腾讯云COS

## License

© 2025 Sweekli 思维颗粒. All rights reserved.
