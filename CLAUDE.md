# CLAUDE.md

为 Claude Code 提供项目核心开发指南。

---

## 项目概述

**Deep Reading Analyst** - Vue 3 + Vite 单页应用，提供10+种思维框架的深度阅读分析工具。

- **技术栈**: Vue 3 (Composition API) + Vite + Vue Router + Pinia
- **UI**: 自定义 Design Token 系统（无第三方 UI 库）
- **核心依赖**: crypto-js, dompurify

---

## 常用命令

```bash
npm install              # 安装依赖
npm run dev             # 开发服务器 (localhost:3000)
npm run build           # 生产构建
npm run lint            # 代码检查
npm run format          # 格式化
npm test                # 单元测试
npm run coverage        # 覆盖率报告
```

---

## 核心架构

### 目录结构（精简）

```
src/
├── main.js                 # 应用入口
├── App.vue                 # 根组件（导航 + 路由视图）
├── router/index.js         # 路由配置（8个路由，全部懒加载）
├── views/                  # 页面组件（8个）
├── components/
│   ├── common/            # 通用组件（Button, Card, Navigation）
│   ├── diagnosis/         # 诊断组件
│   ├── framework/         # 框架选择器
│   ├── case/              # 案例库
│   └── quality/           # 质量检查
├── data/                   # JSON 数据（frameworks, cases, checklist）
└── assets/styles/
    ├── design-tokens.css  # CSS 变量系统
    ├── reset.css          # 重置样式
    └── animations.css     # 动画库
```

### 路由映射

```
/                → HomeView
/quick-start     → QuickStartView
/diagnosis       → DiagnosisView
/mva-template    → MVATemplateView
/framework       → FrameworkView
/case-library    → CaseLibraryView
/quality-check   → QualityCheckView
/feedback        → FeedbackView
```

---

## 开发规范（核心）

### 1. 组件结构

```vue
<script setup>
import { ref, computed } from 'vue'

// Props 定义
defineProps({ title: String })

// 响应式数据
const count = ref(0)

// 计算属性
const doubled = computed(() => count.value * 2)

// 方法
const handleClick = () => {}
</script>

<template>
  <div class="component-name">
    {{ title }}
  </div>
</template>

<style scoped>
/* 必须使用 Design Tokens */
.component-name {
  padding: var(--spacing-md);
  background: var(--surface);
}
</style>
```

### 2. 命名约定

```
文件: PascalCase.vue        (AppNavigation.vue)
类名: kebab-case            (.nav-menu)
变量: camelCase             (isActive)
常量: UPPER_SNAKE_CASE      (MAX_ITEMS)
```

### 3. 样式规则

```css
/* ✅ 正确 */
.card {
  padding: var(--spacing-md);
  background: var(--surface);
}

/* ❌ 错误 */
.card {
  padding: 24px;
  background: #ffffff;
}
```

### 4. 核心 Design Tokens

```css
/* 颜色 */
--primary-blue: #0071e3;
--primary-green: #34c759;
--background: #fbfbfd;
--surface: #ffffff;
--text-primary: #1d1d1f;

/* 间距 */
--spacing-sm: 12px;
--spacing-md: 24px;
--spacing-lg: 32px;

/* 阴影 */
--shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
--shadow-md: 0 4px 16px rgba(0,0,0,0.08);

/* 圆角 */
--radius-sm: 8px;
--radius-lg: 20px;

/* 动画 */
--transition-base: 300ms;
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

### 5. 响应式断点

```css
/* 移动端优先 */
.container { padding: var(--spacing-sm); }

@media (min-width: 768px) {  /* 平板 */
  .container { padding: var(--spacing-md); }
}

@media (min-width: 1024px) {  /* 桌面 */
  .container { max-width: 1200px; }
}
```

---

## 重要约定

### ✅ 必须遵守

1. **使用 Design Tokens** - 所有样式值必须使用 CSS 变量
2. **`<style scoped>`** - 组件样式必须隔离
3. **路由懒加载** - 使用 `() => import('@/views/...')`
4. **Composition API** - 统一使用 `<script setup>`
5. **路径别名** - 使用 `@/` 引用 src 目录
6. **响应式设计** - 支持 320px 起的移动端

### ❌ 禁止

1. 硬编码样式值（颜色、间距等）
2. 全局样式（除 design-tokens.css, reset.css, animations.css）
3. Options API（统一用 Composition API）
4. 安装不必要的依赖
5. 生产代码中的 `console.log`（构建时自动移除）

---

## 关键配置

### Vite 配置要点

```javascript
// vite.config.js
export default {
  resolve: {
    alias: { '@': './src' }  // 路径别名
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-crypto': ['crypto-js', 'dompurify']
        }
      }
    },
    terserOptions: {
      compress: { drop_console: true }  // 移除 console
    }
  }
}
```

### 导航系统

固定定位导航栏，毛玻璃效果：

```vue
<style scoped>
.top-nav {
  position: fixed;
  top: 0;
  z-index: var(--z-navigation);
  backdrop-filter: blur(10px);
}
</style>

<!-- 页面需预留空间 -->
<style>
.main-content {
  padding-top: 80px;
}
</style>
```

---

## 项目特点

1. **无第三方 UI 库** - 完全自定义设计系统，轻量高效
2. **数据驱动** - 核心数据存于 JSON 文件（frameworks.json, cases.json, checklist.json）
3. **性能优化** - 路由懒加载、代码分割、资源内联、console 自动移除

---

## 快速任务

### 添加新页面

```bash
# 1. 创建组件
touch src/views/NewView.vue

# 2. 添加路由 (src/router/index.js)
{
  path: '/new',
  component: () => import('@/views/NewView.vue'),
  meta: { title: '新页面 | Deep Reading Analyst' }
}

# 3. 添加导航链接 (src/components/common/AppNavigation.vue)
```

### 修改主题色

```bash
# 编辑 src/assets/styles/design-tokens.css
:root {
  --primary-blue: #新颜色;
}
```

### 添加新框架数据

```bash
# 编辑 src/data/frameworks.json
{
  "id": "new-framework",
  "name": "新框架",
  "level": "1",
  "timeEstimate": 15,
  "prompt": "分析提示词..."
}
```

---

## 故障排查（快速）

```bash
# 开发服务器无法启动
rm -rf node_modules package-lock.json && npm install

# 样式不生效
# → 检查是否使用 <style scoped>
# → 检查 CSS 变量是否在 design-tokens.css 中定义
# → 硬刷新: Cmd+Shift+R

# 构建失败
npm run lint                    # 检查语法错误
rm -rf dist node_modules/.vite  # 清理缓存
npm run build                   # 重新构建
```

---

## 代码质量

### ESLint 核心规则

```javascript
{
  'indent': ['error', 2],              // 2 空格缩进
  'quotes': ['error', 'single'],       // 单引号
  'semi': ['error', 'never'],          // 无分号
  'no-console': 'warn' (生产环境)       // 警告 console
}
```

### Git 提交规范

```bash
feat(scope): 新功能
fix(scope): 修复
docs(scope): 文档
style(scope): 格式
refactor(scope): 重构
test(scope): 测试
chore(scope): 构建/工具
```

---

## 相关文档

详细文档请查看：

- `README.md` - 安装和使用指南
- `DEVELOPMENT.md` - 详细开发指南（组件、测试、部署）
- `TROUBLESHOOTING.md` - 完整故障排查指南
- `CONTRIBUTING.md` - Git 工作流和贡献指南

**最后更新**: 2025-12-29
**项目版本**: 0.0.0
