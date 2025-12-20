# Contentful 中英文内容填写指南

## 🌍 如何在 Contentful 中填写中英文内容

### 问题：自动翻译功能

如果你看到 Contentful 自动将内容翻译成英文，这是因为启用了 **自动翻译功能**。我们需要**手动填写**中英文内容，而不是依赖自动翻译。

### 解决方案：手动填写中英文

在 Contentful 后台创建或编辑文章时：

#### 方法 1：使用语言切换器（推荐）

1. **打开文章编辑页面**
2. **找到右上角的语言切换器**（显示当前语言，如 "English (en-US)"）
3. **点击语言切换器**，选择要编辑的语言：
   - `English (en-US)` - 填写英文内容
   - `Chinese (Simplified) (zh-CN)` - 填写中文内容
4. **切换语言后，填写对应语言的内容**
5. **保存并发布**

#### 方法 2：在字段中直接填写多语言

对于支持多语言的字段（Title、Excerpt、Content、Category），你可以：

1. **点击字段旁边的语言图标**（如果有）
2. **或者直接在字段中看到语言标签**
3. **分别填写每个语言的内容**

### 📝 具体操作步骤

#### 创建新文章时：

1. **Content** > **Add entry** > **Blog Post**

2. **填写英文内容（默认语言）：**
   - 确保语言选择器显示 `English (en-US)`
   - 填写所有字段的英文内容

3. **切换到中文：**
   - 点击右上角语言切换器
   - 选择 `Chinese (Simplified) (zh-CN)`
   - 填写所有字段的中文内容

4. **保存并发布**

#### 编辑现有文章时：

1. 打开文章
2. 使用语言切换器切换语言
3. 填写或修改对应语言的内容
4. 保存并发布

### ⚠️ 重要提示

- **不要依赖自动翻译**：自动翻译可能不准确，建议手动填写
- **所有多语言字段都要填写**：Title、Excerpt、Content、Category
- **Slug 通常只需要英文**：URL 标识符通常不需要多语言
- **图片和日期不需要多语言**：这些字段是通用的

---

## 🔧 使用 CLI 脚本自动填写中英文

我已经更新了脚本，可以自动填写中英文内容。

### 运行脚本：

```bash
CONTENTFUL_MANAGEMENT_TOKEN=你的management_token npx tsx scripts/publish-articles.ts
```

脚本会自动：
- ✅ 创建文章
- ✅ 填写英文内容（en-US）
- ✅ 填写中文内容（zh-CN）
- ✅ 发布文章

**注意**：你需要的是 **Management API Token**（不是 Preview API Token）

---

## ✅ 验证方法

### 1. 在 Contentful 后台验证

1. 进入 **Content** 标签
2. 找到创建的文章
3. 点击文章打开
4. 使用语言切换器切换语言
5. 检查中英文内容是否正确

### 2. 在本地网站验证

1. **启动开发服务器**：
   ```bash
   npm run dev
   ```

2. **访问网站**：
   - 打开：http://localhost:5173/insights
   - 应该能看到 Contentful 中的文章

3. **测试多语言切换**：
   - 切换网站语言（中/英）
   - 文章内容应该相应切换

4. **检查首页**：
   - 访问：http://localhost:5173/
   - 滚动到 Insights Section
   - 应该显示最新 3 篇文章

### 3. 在 GitHub Pages 验证

1. **推送代码到 GitHub**：
   ```bash
   git add -A
   git commit -m "集成 Contentful API"
   git push
   ```

2. **等待 GitHub Actions 部署**（2-5 分钟）

3. **访问网站**：
   - https://pop-up-limited.github.io/sweekli-website/insights
   - 应该能看到 Contentful 中的文章

---

## 🎯 UI 保持不变

✅ **已确保**：
- Insights 页面的 UI 和布局完全保持不变
- 首页 Insights Section 的 UI 保持不变
- 只是数据源从硬编码改为 Contentful API
- 所有样式、动画、交互都保持原样

---

## 📋 快速检查清单

- [ ] 在 Contentful 创建文章（使用语言切换器填写中英文）
- [ ] 或运行脚本自动创建（需要 Management API Token）
- [ ] 上传封面图片
- [ ] 发布文章
- [ ] 本地测试：`npm run dev` 然后访问 `/insights`
- [ ] 验证多语言切换
- [ ] 推送到 GitHub（如果需要）

---

## 🔍 故障排查

### 问题：看不到中英文切换选项

**解决**：
1. 检查 Content Model 中字段是否启用了 Localized（多语言）
2. 进入 **Content model** > **Blog Post**
3. 检查 Title、Excerpt、Content、Category 字段
4. 确保 **Localized** 选项已启用

### 问题：自动翻译功能干扰

**解决**：
1. 进入 **Settings** > **Locales**
2. 检查是否有自动翻译设置
3. 建议关闭自动翻译，手动填写内容

### 问题：脚本运行失败

**检查**：
- 是否使用了 Management API Token（不是 Preview API Token）
- Token 是否有正确的权限
- 网络连接是否正常

---

完成这些步骤后，你的网站就会从 Contentful 获取内容，同时保持原有的 UI 和布局！🎉

