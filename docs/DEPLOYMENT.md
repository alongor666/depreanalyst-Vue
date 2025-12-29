# 部署指南

本文档说明如何部署 Deep Reading Analyst 到 GitHub Pages。

---

## 🚀 GitHub Pages 部署

### 自动部署（已配置）

项目已配置 GitHub Actions 自动部署工作流。每次推送到 `main` 分支时，会自动触发部署。

### 首次启用 GitHub Pages

**在 GitHub 仓库中启用 Pages**：

1. 访问仓库: https://github.com/alongor666/depreanalyst-Vue

2. 进入 **Settings** → **Pages**

3. 在 **Source** 部分：
   - 选择 **GitHub Actions** (不是 Deploy from a branch)

4. 保存后，GitHub Actions 会自动运行

5. 部署完成后，访问地址：
   ```
   https://alongor666.github.io/depreanalyst-Vue/
   ```

### 工作流文件

自动部署工作流位于 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # 推送到 main 分支时触发
  workflow_dispatch:  # 允许手动触发
```

### 手动触发部署

如果需要手动触发部署：

1. 访问 **Actions** 标签
2. 选择 **Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow**
4. 选择分支（main）
5. 点击 **Run workflow** 确认

---

## 📝 部署检查清单

部署前确认：

- ✅ `vite.config.js` 中已设置正确的 `base` 路径
  ```javascript
  base: process.env.NODE_ENV === 'production' ? '/depreanalyst-Vue/' : '/'
  ```

- ✅ 所有路由使用相对路径或绝对路径（从 base 开始）

- ✅ 静态资源引用正确

- ✅ GitHub Actions 工作流已配置

- ✅ 在 GitHub Settings → Pages 中选择了 **GitHub Actions**

---

## 🔍 故障排查

### 部署失败

1. **检查 Actions 日志**：
   - 访问 **Actions** 标签
   - 点击失败的工作流
   - 查看详细日志

2. **常见问题**：

   **构建失败**：
   ```bash
   # 本地测试构建
   npm run build
   ```

   **依赖安装失败**：
   - 检查 `package.json` 中的依赖版本
   - 确保 `package-lock.json` 已提交

   **权限问题**：
   - 确认 Settings → Actions → General → Workflow permissions
   - 设置为 **Read and write permissions**

### 页面无法访问

1. **等待部署完成**：
   - 首次部署可能需要几分钟

2. **检查 Pages 设置**：
   - Settings → Pages
   - 确认 Source 选择了 **GitHub Actions**

3. **检查 URL**：
   - 正确：`https://alongor666.github.io/depreanalyst-Vue/`
   - 错误：`https://alongor666.github.io/` (缺少仓库名)

### 样式或资源加载失败

1. **检查浏览器控制台**：
   - F12 → Console
   - 查看是否有 404 错误

2. **检查 base 路径**：
   ```javascript
   // vite.config.js
   base: '/depreanalyst-Vue/'  // 必须与仓库名一致
   ```

3. **清除缓存**：
   - 硬刷新：Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

---

## 🌐 其他部署平台

### Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产环境
vercel --prod
```

### Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy

# 生产环境
netlify deploy --prod
```

**Netlify 配置文件** (`netlify.toml`):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Cloudflare Pages

1. 在 Cloudflare Dashboard 创建新项目
2. 连接 GitHub 仓库
3. 配置构建设置：
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
   - 环境变量：`NODE_VERSION=18`

---

## 📊 部署状态监控

### GitHub Pages 状态

访问 **Actions** 标签查看部署历史和状态。

### 部署徽章

在 README.md 中添加部署状态徽章：

```markdown
![Deploy Status](https://github.com/alongor666/depreanalyst-Vue/actions/workflows/deploy.yml/badge.svg)
```

---

## 🔐 环境变量

### 开发环境 (`.env.development`)

```bash
VITE_APP_TITLE=Deep Reading Analyst (Dev)
VITE_API_URL=http://localhost:3000
```

### 生产环境 (`.env.production`)

```bash
VITE_APP_TITLE=Deep Reading Analyst
VITE_API_URL=https://api.example.com
```

### 在代码中使用

```javascript
const title = import.meta.env.VITE_APP_TITLE
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 📈 性能优化

### 构建优化

已配置的优化：

- ✅ 路由懒加载
- ✅ 代码分割（Vue/Crypto 分离）
- ✅ 资源内联（4KB 以下）
- ✅ Terser 压缩
- ✅ CSS 代码分割
- ✅ 生产环境移除 console

### CDN 加速（可选）

使用 jsDelivr 加速静态资源：

```html
<!-- index.html -->
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
```

---

## 📞 获得帮助

- 查看 GitHub Actions 日志
- 提交 Issue
- 查看 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

**部署成功后访问**：https://alongor666.github.io/depreanalyst-Vue/
