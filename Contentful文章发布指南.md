# 📝 Contentful 文章发布指南

## 方法一：使用脚本自动发布（推荐）

我已经创建了一个自动发布脚本，可以帮你一次性发布所有 3 篇文章。

### 步骤 1：获取 Management API Token

1. 登录 Contentful：https://app.contentful.com/
2. 进入 **Settings** > **API keys**
3. 点击 **Content management tokens** 标签
4. 点击 **Generate personal token**
5. 输入名称（如：`Article Publisher`）
6. 点击 **Generate**
7. **复制 token**（只显示一次，请保存好）

### 步骤 2：运行发布脚本

在项目根目录运行：

```bash
CONTENTFUL_MANAGEMENT_TOKEN=你的token npx tsx scripts/publish-articles.ts
```

**注意**：将 `你的token` 替换为刚才复制的 Management API Token。

### 步骤 3：上传封面图片

脚本发布文章后，需要在 Contentful 后台手动上传封面图片：

1. 进入 **Content** 标签
2. 找到刚创建的文章
3. 点击 **Cover Image** 字段
4. 上传对应的图片：
   - 文章 1：`/images/Sweekli 官网介绍 图片素材/1 home banner/1-PC.jpg`
   - 文章 2：`/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-12_03.jpg`
   - 文章 3：`/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-12_02.jpg`
5. 保存并重新发布文章

---

## 方法二：手动在 Contentful 后台创建（如果脚本失败）

### 文章 1：Anta and MUSINSA

1. 进入 **Content** > **Add entry** > **Blog Post**

2. **English (en-US) 标签：**
   - **Title**: `Anta and MUSINSA: Leading the Next Wave of Fashion in China`
   - **Slug**: `anta-musinsa-leading-next-wave-fashion-china`
   - **Excerpt**: `Exploring how these brands are reshaping the fashion landscape in China through innovative strategies and consumer engagement.`
   - **Content**: （可以复制 Excerpt 的内容，或写完整文章）
   - **Category**: `Fashion`
   - **Publish Date**: `2025-09-19`

3. **Chinese (zh-CN) 标签：**
   - **Title**: `安踏与MUSINSA：引领中国时尚新浪潮`
   - **Excerpt**: `探索这些品牌如何通过创新策略和消费者参与重塑中国时尚格局。`
   - **Content**: （可以复制 Excerpt 的内容，或写完整文章）
   - **Category**: `时尚`

4. **Cover Image**（两个语言标签都上传）：
   - 上传：`/images/Sweekli 官网介绍 图片素材/1 home banner/1-PC.jpg`

5. 点击 **Publish**

---

### 文章 2：10 New Outdoor Lifestyle Brands

1. **Add entry** > **Blog Post**

2. **English (en-US)：**
   - **Title**: `Here's What 10 New Outdoor Lifestyle Brands Are Bringing for Spring/Summer`
   - **Slug**: `10-new-outdoor-lifestyle-brands-spring-summer`
   - **Excerpt**: `Today, "outdoors" is no longer just about camping, hiking, climbing, or fishing. The concept now stretches to outdoor living at home, camping-inspired coffee shops and bars, and a more integrated commercial ecosystem.`
   - **Category**: `Lifestyle`
   - **Publish Date**: `2025-08-13`

3. **Chinese (zh-CN)：**
   - **Title**: `10个新户外生活方式品牌为春夏带来的新趋势`
   - **Excerpt**: `如今，"户外"不再只是关于露营、徒步、攀岩或钓鱼。这个概念现在延伸到家庭户外生活、露营风格的咖啡店和酒吧，以及更融合的商业生态系统。`
   - **Category**: `生活方式`

4. **Cover Image**：
   - 上传：`/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-12_03.jpg`

5. 点击 **Publish**

---

### 文章 3：Louis Vuitton

1. **Add entry** > **Blog Post**

2. **English (en-US)：**
   - **Title**: `How Is Louis Vuitton Deepening Its Brand Influence in China?`
   - **Slug**: `louis-vuitton-deepening-brand-influence-china`
   - **Excerpt**: `An in-depth look at how luxury brands are adapting their strategies to connect with Chinese consumers in new and meaningful ways.`
   - **Category**: `Luxury`
   - **Publish Date**: `2025-06-27`

3. **Chinese (zh-CN)：**
   - **Title**: `路易威登如何深化其在中国的影响力？`
   - **Excerpt**: `深入探讨奢侈品牌如何调整策略，以新的、有意义的方式与中国消费者建立联系。`
   - **Category**: `奢侈品`

4. **Cover Image**：
   - 上传：`/images/Sweekli 官网介绍 图片素材/2 Our Solutions/650x650px-12_02.jpg`

5. 点击 **Publish**

---

## ✅ 验证

发布完成后：

1. 访问网站：`/insights` 页面
2. 应该能看到 3 篇文章
3. 切换语言，内容应该相应切换
4. 首页 Insights Section 应该显示最新 3 篇

## 🔍 故障排查

### 问题：脚本运行失败

**可能原因：**
- Management API Token 错误
- 网络连接问题
- Content Type 字段不匹配

**解决：**
- 使用手动方法（方法二）
- 检查 Content Type 字段是否正确配置

### 问题：文章不显示

**检查：**
1. 文章是否已发布（不是草稿）
2. 字段是否都填写完整
3. 浏览器控制台是否有错误

**解决：**
- 确保文章状态为 "Published"
- 检查所有必填字段是否填写
- 清除浏览器缓存

---

## 📋 快速检查清单

- [ ] 获取 Management API Token
- [ ] 运行发布脚本（或手动创建）
- [ ] 上传封面图片
- [ ] 发布所有文章
- [ ] 访问网站验证显示
- [ ] 测试多语言切换

完成这些步骤后，你的网站就会显示 Contentful 中的文章了！🎉

