# GitHub Pages 部署说明

## 🚀 快速部署步骤

### 1. 启用 GitHub Pages

1. 进入仓库：https://github.com/Pop-Up-Limited/sweekli-website
2. 点击 **Settings** > **Pages**
3. 在 **Source** 部分：
   - 选择 **GitHub Actions**（不是 branch）
4. 保存

### 2. 推送代码触发部署

代码已经配置好了 GitHub Actions，推送后会自动构建和部署：

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push
```

### 3. 查看部署状态

1. 进入仓库，点击 **Actions** 标签
2. 查看部署工作流是否成功
3. 部署完成后，网站地址为：
   **https://pop-up-limited.github.io/sweekli-website/**

---

## ⚠️ 重要配置

### Base URL 配置

项目已配置 base URL 为 `/sweekli-website/`，这是 GitHub Pages 的子路径。

如果将来要使用自定义域名，需要修改 `vite.config.ts`：

```typescript
base: '/', // 改为根路径
```

### 404 处理

已创建 `public/404.html` 文件来处理 SPA 路由问题。GitHub Pages 会自动使用这个文件。

---

## 🔧 手动部署（如果需要）

如果 GitHub Actions 不工作，可以手动部署：

1. 构建项目：
```bash
npm run build
```

2. 将 `dist` 文件夹的内容推送到 `gh-pages` 分支：
```bash
git subtree push --prefix dist origin gh-pages
```

然后在 Settings > Pages 中选择 `gh-pages` 分支。

---

## 📝 注意事项

1. **首次部署可能需要几分钟**
2. **每次 push 到 main 分支都会自动重新部署**
3. **如果看到 404，等待几分钟后刷新**
4. **确保 GitHub Actions 有权限部署 Pages**

---

## 🐛 常见问题

**Q: 还是显示 404？**  
A: 
- 检查 GitHub Actions 是否成功运行
- 确认 Settings > Pages 中选择了 "GitHub Actions"
- 等待几分钟后刷新

**Q: 页面显示但样式/图片加载不出来？**  
A: 检查 base URL 配置是否正确

**Q: 路由跳转后显示 404？**  
A: 确保 `public/404.html` 文件存在且正确配置

---

## ✅ 检查清单

- [ ] GitHub Pages 已启用（Settings > Pages）
- [ ] 选择了 "GitHub Actions" 作为 Source
- [ ] GitHub Actions 工作流已成功运行
- [ ] 网站可以正常访问
- [ ] 所有路由都可以正常工作

