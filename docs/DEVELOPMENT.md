# 开发指南

完整的项目开发文档，包含详细的组件使用、测试策略和最佳实践。

---

## 目录

- [项目详细结构](#项目详细结构)
- [核心组件使用指南](#核心组件使用指南)
- [数据文件详解](#数据文件详解)
- [测试策略](#测试策略)
- [性能优化](#性能优化)
- [部署指南](#部署指南)

---

## 项目详细结构

### 完整目录树

```
src/
├── main.js                     # 应用入口 (Pinia + Router 初始化)
├── App.vue                     # 根组件 (导航栏 + 路由视图 + 过渡动画)
├── style.css                   # 旧版遗留样式 (已被 design-tokens.css 替代)
│
├── router/
│   └── index.js               # 路由配置 (8个路由 + 懒加载 + 前置守卫)
│
├── views/                      # 页面级组件 (8个路由页面)
│   ├── HomeView.vue           # 首页 (Hero + 工具网格) - 267行
│   ├── QuickStartView.vue     # 快速上手指南 - 769行
│   ├── DiagnosisView.vue      # 智能诊断工具 - 58行
│   ├── MVATemplateView.vue    # MVA快速分析模板 - 843行
│   ├── FrameworkView.vue      # 思维框架选择器 - 58行
│   ├── CaseLibraryView.vue    # 真实案例库 - 58行
│   ├── QualityCheckView.vue   # 质量自检清单 - 58行
│   └── FeedbackView.vue       # 反馈系统 - 61行
│
├── components/
│   ├── common/                # 通用组件
│   │   ├── AppNavigation.vue  # 顶部导航栏 (固定定位 + 毛玻璃效果) - 246行
│   │   ├── AppCard.vue        # 卡片组件 (4种变体) - 240行
│   │   └── AppButton.vue      # 按钮组件 (6种变体 + 3种大小) - 272行
│   ├── diagnosis/             # 诊断相关组件
│   │   ├── DecisionTree.vue   # 决策树组件 (3步诊断) - 511行
│   │   └── RecommendationCard.vue # 推荐卡片 - 428行
│   ├── framework/             # 框架选择相关组件
│   │   └── FrameworkSelector.vue # 框架选择器 (支持预设组合) - 576行
│   ├── case/                  # 案例库相关组件
│   │   └── CaseLibrary.vue    # 案例库组件 (多维度筛选) - 461行
│   ├── quality/               # 质量检查相关组件
│   │   └── QualityChecklist.vue # 质量检查清单 - 334行
│   └── HelloWorld.vue         # 示例组件 - 43行
│
├── data/                       # JSON 数据文件
│   ├── frameworks.json        # 10个思维框架定义 + 6种预设组合
│   ├── cases.json             # 12个真实案例数据 (含详细分析)
│   ├── checklist.json         # 15项质量检查项 (5个分类)
│   ├── cases.json.bak         # 备份文件
│   └── checklist.json.bak     # 备份文件
│
├── assets/styles/              # 设计系统
│   ├── design-tokens.css      # CSS变量系统 (颜色/间距/字体/动画) - 165行
│   ├── reset.css              # CSS重置和基础样式 - 230行
│   └── animations.css         # 动画库 (16+动画模式) - 377行
│
├── stores/                     # Pinia状态管理 (预留,当前为空)
├── composables/                # Vue组合函数 (预留,当前为空)
└── utils/                      # 工具函数 (预留,当前为空)
```

---

## 核心组件使用指南

### AppButton 完整 API

#### Props

```typescript
interface AppButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  to?: string | object  // Vue Router 路由
  href?: string         // 外部链接
}
```

#### 使用示例

```vue
<!-- 基础用法 -->
<AppButton>点击我</AppButton>

<!-- 不同变体 -->
<AppButton variant="primary">主要按钮</AppButton>
<AppButton variant="secondary">次要按钮</AppButton>
<AppButton variant="success">成功按钮</AppButton>
<AppButton variant="warning">警告按钮</AppButton>
<AppButton variant="danger">危险按钮</AppButton>
<AppButton variant="ghost">幽灵按钮</AppButton>

<!-- 不同大小 -->
<AppButton size="sm">小按钮</AppButton>
<AppButton size="md">中按钮</AppButton>
<AppButton size="lg">大按钮</AppButton>

<!-- 状态 -->
<AppButton disabled>禁用</AppButton>
<AppButton loading>加载中</AppButton>
<AppButton block>块级按钮</AppButton>

<!-- 链接 -->
<AppButton to="/page">内部链接</AppButton>
<AppButton to="/page" target="_blank">新窗口打开</AppButton>
<AppButton href="https://example.com">外部链接</AppButton>
```

### AppCard 完整 API

#### Props

```typescript
interface AppCardProps {
  icon?: string
  title?: string
  description?: string
  badges?: Array<{ text: string, type: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' }>
  to?: string | object
  href?: string
  variant?: 'default' | 'tool' | 'case' | 'framework'
  clickable?: boolean
}
```

#### 使用示例

```vue
<!-- 基础用法 -->
<AppCard
  icon="🎯"
  title="卡片标题"
  description="卡片描述"
/>

<!-- 带徽章 -->
<AppCard
  title="案例标题"
  :badges="[
    { text: 'Level 1', type: 'info' },
    { text: '推荐', type: 'success' }
  ]"
/>

<!-- 不同变体 -->
<AppCard variant="tool">工具卡片</AppCard>
<AppCard variant="case">案例卡片</AppCard>
<AppCard variant="framework">框架卡片</AppCard>

<!-- 可点击 -->
<AppCard clickable to="/page">
  点击跳转
</AppCard>

<!-- 自定义插槽 -->
<AppCard>
  <template #default>
    <div class="custom-content">
      自定义内容
    </div>
  </template>
</AppCard>
```

### AppNavigation 使用说明

导航栏已在 App.vue 中全局引入，无需在每个页面重复添加。

**注意事项**:

1. 导航栏固定在顶部（`position: fixed`）
2. 页面主内容需添加 `padding-top: 80px` 预留空间
3. 响应式：900px 以下显示汉堡菜单

```vue
<!-- App.vue 中的使用 -->
<AppNavigation />
<main class="main-content">
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</main>

<style>
.main-content {
  padding-top: 80px;
}
</style>
```

---

## 数据文件详解

### frameworks.json

包含 10 个思维框架和 6 个预设组合：

```json
{
  "frameworks": [
    {
      "id": "scqa",
      "name": "SCQA结构思维",
      "level": "MVA",
      "timeEstimate": 5,
      "icon": "🎯",
      "description": "用 SCQA (Situation-Complication-Question-Answer) 梳理内容逻辑",
      "prompt": "请使用SCQA框架分析以下内容..."
    }
    // ... 其他 9 个框架
  ],
  "presetCombinations": [
    {
      "id": "quick-analysis",
      "name": "快速分析",
      "description": "5-15分钟快速理解",
      "frameworks": ["scqa", "5w2h"],
      "timeEstimate": 15,
      "icon": "⚡"
    }
    // ... 其他 5 个组合
  ]
}
```

**字段说明**:
- `id`: 唯一标识符
- `name`: 框架名称
- `level`: MVA | 1 | 2 | 3 (难度等级)
- `timeEstimate`: 预计耗时(分钟)
- `icon`: 图标 emoji
- `description`: 简短描述
- `prompt`: 完整的分析提示词

### cases.json

包含 12 个真实案例：

```json
{
  "cases": [
    {
      "id": 1,
      "level": "mva",
      "scenario": "problem-solving",
      "role": "产品经理",
      "title": "快速理解 Notion AI 产品设计",
      "description": "15分钟内理解 Notion AI 的核心功能和设计理念",
      "input": "Notion AI 官方博客文章 + 产品演示视频",
      "output": "详细的分析输出...",
      "insights": [
        "洞察1",
        "洞察2",
        "洞察3"
      ]
    }
    // ... 其他 11 个案例
  ]
}
```

**字段说明**:
- `level`: mva | 1 | 2 | 3
- `scenario`: problem-solving | learning | decision | research | writing
- `role`: 使用者角色
- `title`: 案例标题
- `description`: 场景描述
- `input`: 输入内容
- `output`: 详细分析结果
- `insights`: 3个关键收获

### checklist.json

包含 15 项质量检查（5 个分类）：

```json
{
  "categories": [
    {
      "id": "basic",
      "name": "基础质量",
      "items": [
        {
          "id": "fact-based",
          "text": "分析基于事实而非猜测",
          "critical": true,
          "weight": 3
        }
        // ... 更多检查项
      ]
    }
    // ... 其他 4 个分类
  ]
}
```

**字段说明**:
- `critical`: 是否为关键项
- `weight`: 权重（1-3）

---

## 测试策略

### 单元测试 (Vitest)

#### 配置

```javascript
// vitest.config.js
export default {
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 80,
      functions: 80,
      branches: 75,
      statements: 80
    }
  }
}
```

#### 测试文件示例

**文件命名**: `*.spec.js` 或 `*.test.js`

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '@/components/common/AppButton.vue'

describe('AppButton', () => {
  it('renders properly', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Test Button'
      }
    })
    expect(wrapper.text()).toContain('Test Button')
  })

  it('applies variant class', () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('btn-primary')
  })

  it('emits click event', async () => {
    const wrapper = mount(AppButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })
})
```

#### 运行测试

```bash
npm test                # 运行所有测试
npm run test:ui         # 打开 Vitest UI
npm run coverage        # 生成覆盖率报告
```

### E2E 测试 (Playwright)

#### 测试文件示例

**文件命名**: `*.e2e.js`

```javascript
import { test, expect } from '@playwright/test'

test.describe('首页', () => {
  test('应该显示标题和工具卡片', async ({ page }) => {
    await page.goto('/')

    // 检查标题
    await expect(page.locator('h1')).toContainText('深度阅读分析系统')

    // 检查工具卡片数量
    const cards = page.locator('.tool-card')
    await expect(cards).toHaveCount(7)
  })

  test('点击工具卡片应该跳转到对应页面', async ({ page }) => {
    await page.goto('/')

    // 点击快速上手卡片
    await page.click('text=快速上手指南')

    // 检查 URL 和页面内容
    await expect(page).toHaveURL('/quick-start')
    await expect(page.locator('h1')).toContainText('快速上手指南')
  })
})

test.describe('框架选择器', () => {
  test('应该能够选择和取消选择框架', async ({ page }) => {
    await page.goto('/framework')

    // 选择一个框架
    await page.click('[data-framework-id="scqa"]')

    // 检查是否被选中
    const selected = page.locator('.framework-card.selected')
    await expect(selected).toHaveCount(1)

    // 再次点击取消选择
    await page.click('[data-framework-id="scqa"]')
    await expect(selected).toHaveCount(0)
  })
})
```

#### 运行 E2E 测试

```bash
npm run test:e2e           # 运行所有 E2E 测试
npm run test:e2e:ui        # 打开 Playwright UI
```

---

## 性能优化

### 路由懒加载

所有路由已配置懒加载：

```javascript
// router/index.js
const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/quick-start',
    component: () => import('@/views/QuickStartView.vue')
  }
  // ...
]
```

### 代码分割

Vite 配置了手动代码分割：

```javascript
// vite.config.js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-vue': ['vue', 'vue-router', 'pinia'],
        'vendor-crypto': ['crypto-js', 'dompurify']
      }
    }
  }
}
```

### 资源优化

```javascript
// vite.config.js
build: {
  assetsInlineLimit: 4096,  // 4KB 以下内联为 base64
  chunkSizeWarningLimit: 500,
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true
    }
  }
}
```

### 性能检查清单

- ✅ 路由懒加载
- ✅ 代码分割（Vue/Crypto 分离）
- ✅ 小资源内联
- ✅ 生产环境移除 console
- ✅ CSS 代码分割
- ✅ 图片优化（如有）

---

## 部署指南

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist/` 目录。

### 预览生产构建

```bash
npm run preview
```

### 部署到静态托管

#### Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

#### Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod
```

#### GitHub Pages

```bash
# 1. 修改 vite.config.js 添加 base
export default {
  base: '/仓库名/',
  // ...
}

# 2. 构建
npm run build

# 3. 部署到 gh-pages 分支
npm i -g gh-pages
gh-pages -d dist
```

### 环境变量

创建 `.env.production` 文件：

```bash
VITE_APP_TITLE=Deep Reading Analyst
VITE_API_URL=https://api.example.com
```

在代码中使用：

```javascript
const title = import.meta.env.VITE_APP_TITLE
```

---

## 常见开发任务详解

### 添加新的思维框架

1. 编辑 `src/data/frameworks.json`：

```json
{
  "id": "new-framework",
  "name": "新框架名称",
  "level": "1",  // MVA | 1 | 2 | 3
  "timeEstimate": 20,  // 分钟
  "icon": "🎯",
  "description": "框架的简短描述",
  "prompt": "完整的分析提示词模板..."
}
```

2. 组件会自动读取并显示新框架

### 添加新案例

1. 编辑 `src/data/cases.json`：

```json
{
  "id": 13,
  "level": "1",
  "scenario": "learning",
  "role": "开发者",
  "title": "案例标题",
  "description": "场景描述",
  "input": "输入内容描述",
  "output": "详细的分析输出...",
  "insights": [
    "关键洞察1",
    "关键洞察2",
    "关键洞察3"
  ]
}
```

### 修改主题色系

编辑 `src/assets/styles/design-tokens.css`：

```css
:root {
  /* 修改主色调 */
  --primary-blue: #新蓝色;
  --primary-green: #新绿色;

  /* 或添加新的主题色 */
  --primary-pink: #ff69b4;
}
```

### 添加新动画

在 `src/assets/styles/animations.css` 中添加：

```css
@keyframes customAnimation {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-animation {
  animation: customAnimation var(--transition-base) var(--ease-out);
}
```

---

**最后更新**: 2025-12-29
**维护者**: Deep Reading Analyst Team
