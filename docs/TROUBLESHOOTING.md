# 故障排查指南

完整的故障排查文档，帮助快速定位和解决常见问题。

---

## 目录

- [开发环境问题](#开发环境问题)
- [样式问题](#样式问题)
- [路由问题](#路由问题)
- [组件问题](#组件问题)
- [构建问题](#构建问题)
- [性能问题](#性能问题)

---

## 开发环境问题

### 开发服务器无法启动

**症状**: 运行 `npm run dev` 后服务器无法启动

**可能原因**:
1. 端口被占用
2. 依赖未安装或损坏
3. Node 版本不兼容

**解决方案**:

```bash
# 1. 清理依赖重新安装
rm -rf node_modules package-lock.json
npm install

# 2. 检查端口占用
lsof -i :3000
# 如果端口被占用，终止进程或修改端口号

# 3. 修改端口号（vite.config.js）
export default {
  server: {
    port: 3001  // 改为其他端口
  }
}

# 4. 检查 Node 版本
node -v
# 确保 Node >= 16.0.0
```

### npm install 失败

**症状**: 安装依赖时报错

**解决方案**:

```bash
# 1. 清理缓存
npm cache clean --force

# 2. 删除 lock 文件
rm -rf package-lock.json node_modules

# 3. 使用 npm 重新安装
npm install

# 4. 如果仍然失败，尝试 pnpm 或 yarn
pnpm install
# 或
yarn install
```

### Hot Module Replacement (HMR) 不工作

**症状**: 修改代码后页面不自动刷新

**解决方案**:

```bash
# 1. 检查文件监听限制（Linux/Mac）
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# 2. 重启开发服务器
# Ctrl+C 停止，然后重新运行
npm run dev

# 3. 清理 Vite 缓存
rm -rf node_modules/.vite
npm run dev
```

---

## 样式问题

### 样式不生效

**症状**: CSS 样式没有应用到组件

**可能原因**:
1. 未使用 `<style scoped>`
2. CSS 变量未定义
3. 浏览器缓存
4. 选择器优先级问题

**解决方案**:

```bash
# 1. 检查是否使用了 scoped
<style scoped>
  .my-component { ... }
</style>

# 2. 检查 CSS 变量是否在 design-tokens.css 中定义
# 打开浏览器开发者工具 → Elements → Computed
# 查看变量的实际值

# 3. 清除浏览器缓存
# 硬刷新: Cmd+Shift+R (Mac) / Ctrl+Shift+F5 (Windows)

# 4. 确保 design-tokens.css 已导入
# 检查 src/main.js 中是否有:
import '@/assets/styles/design-tokens.css'
import '@/assets/styles/reset.css'
import '@/assets/styles/animations.css'
```

**检查 CSS 优先级**:

```css
/* 如果样式被覆盖，检查优先级 */
/* 更具体的选择器优先级更高 */

/* 优先级低 */
.card { color: blue; }

/* 优先级高 */
.tool-card.selected { color: red; }

/* 最高优先级（避免使用） */
.card { color: green !important; }
```

### Design Tokens 不生效

**症状**: `var(--spacing-md)` 等变量不生效

**解决方案**:

```bash
# 1. 确认 design-tokens.css 已正确导入
# 在 main.js 中应该有:
import '@/assets/styles/design-tokens.css'

# 2. 检查变量名拼写
# 常见错误:
var(--spacing-medium)  # ❌ 错误
var(--spacing-md)      # ✅ 正确

# 3. 在浏览器中验证
# 开发者工具 → Console:
getComputedStyle(document.documentElement).getPropertyValue('--spacing-md')
# 应该返回: "24px"

# 4. 确保在 :root 中定义
:root {
  --spacing-md: 24px;  /* ✅ 正确 */
}

body {
  --spacing-md: 24px;  /* ❌ 作用域有限 */
}
```

### 响应式样式不工作

**症状**: 在移动端或不同屏幕尺寸下样式异常

**解决方案**:

```bash
# 1. 检查 viewport meta 标签
# 在 index.html 中应该有:
<meta name="viewport" content="width=device-width, initial-scale=1.0">

# 2. 使用浏览器开发者工具测试
# F12 → Toggle device toolbar (Ctrl+Shift+M)
# 测试不同设备预设

# 3. 检查媒体查询语法
/* ✅ 正确 */
@media (min-width: 768px) {
  .container { padding: 24px; }
}

/* ❌ 错误 */
@media (max-width: 768px) {
  .container { padding: 24px; }
}
/* 使用 min-width（移动端优先）而非 max-width */

# 4. 检查断点顺序
/* 按从小到大的顺序 */
@media (min-width: 768px) { ... }   /* 平板 */
@media (min-width: 1024px) { ... }  /* 桌面 */
@media (min-width: 1280px) { ... }  /* 大桌面 */
```

---

## 路由问题

### 路由跳转失败

**症状**: 点击链接或调用 `router.push()` 无反应

**解决方案**:

```bash
# 1. 检查路由是否在 router/index.js 中定义
const routes = [
  {
    path: '/your-path',
    component: () => import('@/views/YourView.vue')
  }
]

# 2. 检查路由名称拼写
# 错误:
<router-link to="/quik-start">  # ❌ 拼写错误
# 正确:
<router-link to="/quick-start"> # ✅

# 3. 使用 Vue DevTools 查看路由状态
# 安装 Vue DevTools 浏览器扩展
# Routes 标签 → 查看当前路由

# 4. 检查浏览器控制台错误
# F12 → Console
# 查看是否有路由相关错误
```

### 404 页面显示

**症状**: 访问某个路由显示 404

**解决方案**:

```bash
# 1. 确认路由配置正确
# router/index.js
{
  path: '/your-page',
  name: 'your-page',
  component: () => import('@/views/YourPageView.vue')
}

# 2. 检查组件文件是否存在
ls src/views/YourPageView.vue

# 3. 检查路由模式
# router/index.js
const router = createRouter({
  history: createWebHistory(),  # HTML5 模式
  routes
})

# 4. 如果是生产环境，配置服务器重定向
# Netlify: _redirects 文件
/*    /index.html   200

# Vercel: vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 路由参数获取失败

**症状**: `route.params` 或 `route.query` 为空

**解决方案**:

```vue
<!-- 1. 确保路由定义了参数 -->
<!-- router/index.js -->
{
  path: '/case/:id',
  component: () => import('@/views/CaseDetail.vue')
}

<!-- 2. 在组件中正确获取 -->
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id  // 路径参数
const search = route.query.search  // 查询参数
</script>

<!-- 3. 传递参数 -->
<!-- 路径参数 -->
<router-link to="/case/123">案例 123</router-link>

<!-- 查询参数 -->
<router-link to="/case?search=keyword">搜索</router-link>

<!-- 4. 调试 -->
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
console.log('params:', route.params)
console.log('query:', route.query)
</script>
```

---

## 组件问题

### 组件数据未显示

**症状**: JSON 数据未在组件中显示

**解决方案**:

```bash
# 1. 检查 JSON 文件路径
# 正确:
import data from '@/data/frameworks.json'

# 错误:
import data from '../data/frameworks.json'  # 相对路径可能错误

# 2. 检查数据结构
# 在组件中打印数据
<script setup>
import frameworksData from '@/data/frameworks.json'
console.log('Data:', frameworksData)
const { frameworks } = frameworksData
console.log('Frameworks:', frameworks)
</script>

# 3. 检查 v-for 的 key
<!-- ✅ 正确 -->
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>

<!-- ❌ 错误 -->
<div v-for="item in items">  <!-- 缺少 :key -->
  {{ item.name }}
</div>

# 4. 检查响应式数据
# 确保使用 ref() 或 reactive()
import { ref } from 'vue'
const items = ref([])  # ✅ 响应式
const items = []       # ❌ 非响应式
```

### 组件样式冲突

**症状**: 多个组件样式互相干扰

**解决方案**:

```bash
# 1. 确保使用 scoped
<style scoped>
  /* 组件私有样式 */
</style>

# 2. 避免使用全局样式类
<!-- ❌ 错误 -->
<style>
  .card { ... }  /* 影响所有 .card */
</style>

<!-- ✅ 正确 -->
<style scoped>
  .my-component-card { ... }  /* 只影响本组件 */
</style>

# 3. 使用深度选择器修改子组件样式
<style scoped>
/* Vue 3 */
:deep(.child-class) {
  color: red;
}

/* 旧语法（不推荐） */
::v-deep .child-class {
  color: red;
}
</style>
```

### Props 传递失败

**症状**: 子组件接收不到 props

**解决方案**:

```vue
<!-- 父组件 -->
<template>
  <!-- ✅ 正确 -->
  <ChildComponent :title="pageTitle" />

  <!-- ❌ 错误 -->
  <ChildComponent title="pageTitle" />  <!-- 传递字符串 "pageTitle" -->
</template>

<!-- 子组件 -->
<script setup>
// 方式 1: 简单定义
defineProps({
  title: String
})

// 方式 2: 带验证
defineProps({
  title: {
    type: String,
    required: true,
    default: '默认标题'
  }
})

// 方式 3: TypeScript
interface Props {
  title: string
}
defineProps<Props>()

// 调试
const props = defineProps({
  title: String
})
console.log('Received title:', props.title)
</script>
```

---

## 构建问题

### 构建失败

**症状**: `npm run build` 报错

**解决方案**:

```bash
# 1. 检查语法错误
npm run lint

# 2. 查看详细错误信息
npm run build -- --verbose

# 3. 清理缓存后重新构建
rm -rf dist node_modules/.vite
npm run build

# 4. 检查依赖版本兼容性
npm outdated

# 5. 更新依赖
npm update

# 6. 检查 import 路径
# 常见错误:
import Foo from './Foo'       # ❌ 缺少扩展名
import Foo from './Foo.vue'   # ✅ 正确
import Foo from '@/components/Foo.vue'  # ✅ 使用别名
```

### 构建体积过大

**症状**: `dist/` 目录体积超过预期

**解决方案**:

```bash
# 1. 分析构建产物
npm run build
npx vite-bundle-visualizer

# 2. 检查是否正确配置代码分割
# vite.config.js
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

# 3. 检查是否有未使用的依赖
npm install -g depcheck
depcheck

# 4. 移除未使用的依赖
npm uninstall <package-name>

# 5. 确保路由懒加载
# ✅ 正确
component: () => import('@/views/HomeView.vue')

# ❌ 错误（直接导入）
import HomeView from '@/views/HomeView.vue'
component: HomeView
```

### 构建后样式丢失

**症状**: 生产环境样式显示异常

**解决方案**:

```bash
# 1. 检查 CSS 导入顺序
# main.js
import '@/assets/styles/design-tokens.css'  # 必须最先导入
import '@/assets/styles/reset.css'
import '@/assets/styles/animations.css'

# 2. 确保 CSS 文件存在
ls src/assets/styles/

# 3. 检查是否启用了 CSS 代码分割
# vite.config.js
build: {
  cssCodeSplit: true  # 默认启用
}

# 4. 预览生产构建
npm run preview
# 在浏览器中检查

# 5. 检查浏览器控制台
# F12 → Network
# 查看 CSS 文件是否成功加载
```

---

## 性能问题

### 页面加载慢

**症状**: 首屏加载时间过长

**解决方案**:

```bash
# 1. 检查路由是否懒加载
# router/index.js
# ✅ 正确（懒加载）
component: () => import('@/views/HomeView.vue')

# ❌ 错误（全部加载）
import HomeView from '@/views/HomeView.vue'
component: HomeView

# 2. 使用 Lighthouse 分析
# Chrome DevTools → Lighthouse → Generate report

# 3. 检查资源大小
npm run build
# 查看 dist/ 目录文件大小

# 4. 优化图片（如有）
# - 使用 WebP 格式
# - 压缩图片
# - 使用 CDN

# 5. 启用 gzip 压缩
# 服务器配置（Nginx）
gzip on;
gzip_types text/css application/javascript;
```

### 页面卡顿

**症状**: 交互时页面响应慢或卡顿

**解决方案**:

```bash
# 1. 使用 Vue DevTools 性能分析
# Vue DevTools → Performance → Record

# 2. 检查是否有大量 DOM 操作
# 使用 v-show 代替 v-if（频繁切换）
<!-- ✅ 频繁切换用 v-show -->
<div v-show="isVisible">内容</div>

<!-- ✅ 条件渲染用 v-if -->
<div v-if="shouldRender">内容</div>

# 3. 优化列表渲染
<!-- ✅ 使用唯一 key -->
<div v-for="item in items" :key="item.id">

<!-- ✅ 虚拟滚动（大列表） -->
# 安装 vue-virtual-scroller
npm install vue-virtual-scroller

# 4. 使用计算属性缓存
<script setup>
import { computed } from 'vue'

// ✅ 计算属性（有缓存）
const filteredItems = computed(() => {
  return items.value.filter(item => item.active)
})

// ❌ 方法（每次重新计算）
const getFilteredItems = () => {
  return items.value.filter(item => item.active)
}
</script>

# 5. 避免不必要的响应式
import { ref, shallowRef } from 'vue'

// 对于大型只读数据
const bigData = shallowRef(largeObject)
```

### 内存泄漏

**症状**: 长时间使用后页面变慢或崩溃

**解决方案**:

```bash
# 1. 清理事件监听器
<script setup>
import { onMounted, onUnmounted } from 'vue'

let timer = null

onMounted(() => {
  timer = setInterval(() => {
    // ...
  }, 1000)
})

onUnmounted(() => {
  // ✅ 清理定时器
  if (timer) {
    clearInterval(timer)
  }
})
</script>

# 2. 清理全局事件
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // ✅ 移除监听器
  window.removeEventListener('resize', handleResize)
})

# 3. 使用 Chrome DevTools 检测内存泄漏
# F12 → Memory → Take heap snapshot
# 进行操作后再次 snapshot，对比差异
```

---

## 常用调试命令

```bash
# 查看 Vue 版本
npm list vue

# 查看所有依赖版本
npm list --depth=0

# 检查 Node/npm 版本
node -v
npm -v

# 清理所有缓存
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# 查看端口占用
lsof -i :3000

# 终止进程
kill -9 <PID>

# 查看构建文件大小
du -sh dist/
ls -lh dist/assets/

# 测试生产构建
npm run build
npm run preview
```

---

**最后更新**: 2025-12-29
**如果问题未解决，请提交 Issue 或联系维护者**
