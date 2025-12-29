<script setup>
import AppCard from '@/components/common/AppCard.vue'

// 工具卡片数据
const tools = [
  {
    icon: '🚀',
    title: '5分钟快速上手',
    description: '新手指南，3步开始使用，包含常见问题解答和即用提示词模板',
    to: { name: 'quick-start' },
    badges: [
      { text: '✨ 新功能', type: 'new' },
      { text: '⏱️ 5分钟', type: 'time' }
    ]
  },
  {
    icon: '🎯',
    title: '智能诊断工具',
    description: '3个问题快速诊断，AI推荐最适合你的思维框架组合',
    to: { name: 'diagnosis' },
    badges: [
      { text: '🤖 AI推荐', type: 'new' }
    ]
  },
  {
    icon: '⚡',
    title: 'MVA快速分析模板',
    description: '5分钟完成核心问题分析，SCQA结构化思考',
    to: { name: 'mva-template' },
    badges: [
      { text: '⏱️ 5分钟', type: 'time' }
    ]
  },
  {
    icon: '🧩',
    title: '思维框架选择器',
    description: '浏览10+思维框架，选择最适合的组合',
    to: { name: 'framework' },
    badges: [
      { text: '10+框架', type: 'level' }
    ]
  },
  {
    icon: '📚',
    title: '真实案例库',
    description: '12个真实场景的深度分析案例，从MVA到高级框架',
    to: { name: 'case-library' },
    badges: [
      { text: '12个案例', type: 'level' }
    ]
  },
  {
    icon: '✅',
    title: '质量自检清单',
    description: '15项专业检查，确保你的分析达到专业水准',
    to: { name: 'quality-check' },
    badges: [
      { text: '15项检查', type: 'level' }
    ]
  },
  {
    icon: '💬',
    title: '反馈系统',
    description: '分享你的使用体验，帮助我们改进工具',
    to: { name: 'feedback' },
    badges: []
  }
]
</script>

<template>
  <div class="home-view">
    <!-- Hero区域 -->
    <div class="hero">
      <h1 class="hero__title">🧠 Deep Reading Analyst</h1>
      <p class="hero__tagline">多层级深度阅读分析系统</p>
      <p class="hero__subtitle">
        运用10+思维框架，将表层阅读转化为深度理解和实践洞察
      </p>

      <div class="hero__stats">
        <div class="stat-item">
          <div class="stat-number">10+</div>
          <div class="stat-label">思维框架</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">12</div>
          <div class="stat-label">真实案例</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">3</div>
          <div class="stat-label">难度层级</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">5分钟</div>
          <div class="stat-label">快速上手</div>
        </div>
      </div>
    </div>

    <!-- 工具网格 -->
    <div class="tools-section">
      <div class="container">
        <h2 class="section-title">🛠️ 核心工具</h2>
        <p class="section-subtitle">
          选择适合你的工具，开始深度阅读之旅
        </p>

        <div class="tools-grid">
          <AppCard
            v-for="(tool, index) in tools"
            :key="index"
            :icon="tool.icon"
            :title="tool.title"
            :description="tool.description"
            :to="tool.to"
            :badges="tool.badges"
            variant="tool"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
}

/* Hero区域 */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 160px var(--spacing-md) 80px;
  text-align: center;
}

.hero__title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-extrabold);
  margin-bottom: var(--spacing-md);
  animation: fadeIn 0.6s ease-out;
}

.hero__tagline {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  opacity: 0.95;
  animation: fadeIn 0.8s ease-out;
}

.hero__subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  margin-bottom: var(--spacing-2xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeIn 1s ease-out;
}

/* 统计数据 */
.hero__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--spacing-lg);
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 1.2s ease-out;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--font-size-sm);
  opacity: 0.9;
}

/* 工具区域 */
.tools-section {
  padding: var(--spacing-2xl) var(--spacing-md);
  background: var(--background);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.section-subtitle {
  font-size: var(--font-size-lg);
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--gap-md);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero {
    padding: 120px var(--spacing-sm) 60px;
  }

  .hero__title {
    font-size: var(--font-size-3xl);
  }

  .hero__tagline {
    font-size: var(--font-size-xl);
  }

  .hero__subtitle {
    font-size: var(--font-size-base);
  }

  .hero__stats {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  .stat-number {
    font-size: var(--font-size-2xl);
  }

  .tools-section {
    padding: var(--spacing-xl) var(--spacing-sm);
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .tools-grid {
    grid-template-columns: 1fr;
    gap: var(--gap-sm);
  }
}

@media (max-width: 480px) {
  .hero__stats {
    grid-template-columns: 1fr;
  }
}
</style>
