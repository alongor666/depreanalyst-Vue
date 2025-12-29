<script setup>
import { ref } from 'vue'

// 提示词模板数据
const templates = [
  `请使用MVA最小可行分析模式，只需5分钟。运用SCQA框架，提取以下内容的核心结构，给出3个关键洞察和1个即时行动建议。

[粘贴你的内容]`,
  `请使用Level 1快速分析模式（15分钟）。运用SCQA和5W2H框架，分析以下内容的：
1. 核心结构（SCQA）
2. 信息完整性（5W2H）
3. TOP 3关键洞察
4. 1个可执行的行动建议

[粘贴你的内容]`,
  `请使用Level 2标准分析模式（30分钟）。综合运用SCQA、5W2H、批判性思维和逆向思维框架，分析以下内容：
1. 核心结构和信息完整性
2. 论证质量评估（证据充分性、逻辑严谨性）
3. 风险和失败模式分析（如何确保失败？）
4. 实践建议（具体、可衡量、有时间框架）

[粘贴你的内容]`,
  `请使用Level 3深度分析模式（60分钟）。综合运用多种思维模型进行分析：
1. 基础结构：SCQA + 5W2H
2. 批判性分析：论证质量 + 逆向思维
3. 多维度思考：
   - 心智模型（从物理学、生物学、心理学、经济学视角）
   - 第一性原理（拆解基本假设，重构理解）
   - 系统思维（关系网络、反馈回路、杠杆点）
   - 六顶思考帽（事实、情感、风险、收益、创意、流程）
4. 深度洞察和实践框架

[粘贴你的内容]`
]

// 复制模板函数
const copyTemplate = async (index) => {
  try {
    await navigator.clipboard.writeText(templates[index])
    alert('✅ 模板已复制到剪贴板！')
  } catch (err) {
    alert('复制失败，请手动复制')
  }
}

// 场景推荐函数
const showScenario = (type) => {
  const scenarios = {
    rush: {
      title: '时间紧迫场景',
      recommendation: 'MVA（5分钟）或 Level 1（15分钟）',
      reason: '这两个级别专为快速理解设计，只提取最核心的结构和洞察，让你在有限时间内获得最大价值。',
      templateIndex: 0
    },
    problem: {
      title: '解决问题场景',
      recommendation: 'Level 2（30分钟）',
      reason: 'Level 2增加了批判性思维和逆向思维，不仅理解内容，还能评估质量、识别风险，给出可执行的实践建议。',
      templateIndex: 2
    },
    learning: {
      title: '深度学习场景',
      recommendation: 'Level 3（60分钟）',
      reason: 'Level 3运用10+思维模型从多个维度分析，适合系统学习新领域、构建知识体系或深度理解复杂概念。',
      templateIndex: 3
    },
    research: {
      title: '专业研究场景',
      recommendation: 'Level 4（120分钟+）',
      reason: 'Level 4会搜索相关来源，对比多个观点，识别共识和分歧，形成综合性的研究报告。',
      templateIndex: 3
    }
  }

  const scenario = scenarios[type]
  const message = `${scenario.title}\n\n推荐级别：${scenario.recommendation}\n\n为什么：${scenario.reason}\n\n是否要复制对应的提示词模板？`

  if (confirm(message)) {
    copyTemplate(scenario.templateIndex)
  }
}
</script>

<template>
  <div class="quick-start-view">
    <div class="container">
      <!-- 页面标题 -->
      <div class="header">
        <h1>🚀 5分钟快速上手</h1>
        <p class="subtitle">从零开始，立即使用Deep Reading Analyst</p>
      </div>

      <!-- Hero区域 -->
      <div class="hero-box">
        <h2>欢迎使用Deep Reading Analyst</h2>
        <p>
          这是一个多层级深度阅读分析系统，帮助你从表层阅读转向深度理解。<br />
          无论你有5分钟还是2小时，都能找到合适的分析方法。
        </p>
      </div>

      <!-- 三步快速开始 -->
      <div class="step-cards">
        <!-- 步骤1：选择分析深度 -->
        <div class="step-card">
          <div class="step-header">
            <div class="step-number">1</div>
            <div class="step-title">选择分析深度</div>
          </div>
          <div class="step-content">
            根据你的时间预算和分析需求，选择合适的分析级别：
            <ul>
              <li><strong>MVA (5分钟)</strong> - 快速浏览，获取核心要点</li>
              <li><strong>Level 1 (15分钟)</strong> - 结构化理解，掌握全貌</li>
              <li><strong>Level 2 (30分钟)</strong> - 批判性分析，发现问题</li>
              <li><strong>Level 3 (60分钟)</strong> - 多维度思考，深度洞察</li>
              <li><strong>Level 4 (120分钟+)</strong> - 跨源研究，专业综述</li>
            </ul>
          </div>
          <div class="example-box">
            <strong>💡 小贴士</strong>
            不确定选哪个？试试我们的
            <router-link to="/diagnosis" class="link">智能诊断工具</router-link
            >，回答3个问题即可获得推荐！
          </div>
        </div>

        <!-- 步骤2：复制提示词模板 -->
        <div class="step-card">
          <div class="step-header">
            <div class="step-number">2</div>
            <div class="step-title">复制提示词模板</div>
          </div>
          <div class="step-content">
            每个级别都有预设的提示词模板，直接复制使用即可。模板包含：
            <ul>
              <li>分析目标说明</li>
              <li>使用的思维框架</li>
              <li>期望的输出格式</li>
              <li>具体的分析步骤</li>
            </ul>
          </div>
          <div class="example-box">
            <strong>示例提示词（Level 1快速分析）：</strong>
            <div class="example-prompt">
              "请使用Level 1快速分析模式（15分钟），运用SCQA和5W2H框架，帮我分析以下文章的核心结构和关键信息..."
            </div>
          </div>
        </div>

        <!-- 步骤3：粘贴内容，开始分析 -->
        <div class="step-card">
          <div class="step-header">
            <div class="step-number">3</div>
            <div class="step-title">粘贴内容，开始分析</div>
          </div>
          <div class="step-content">
            将要分析的内容粘贴到对话框中，系统会自动：
            <ul>
              <li>提取核心结构（SCQA）</li>
              <li>应用相应的思维模型</li>
              <li>生成结构化笔记</li>
              <li>提供可执行的行动建议</li>
            </ul>
          </div>
          <div class="example-box">
            <strong>💡 小贴士</strong>
            长文章不用全粘贴！只需粘贴核心段落或摘要，节省token的同时保持分析质量。
          </div>
        </div>
      </div>

      <!-- 快速决策矩阵 -->
      <div class="quick-decision">
        <h3>🎯 我该从哪里开始？快速决策</h3>
        <div class="decision-matrix">
          <div class="decision-card" @click="showScenario('rush')">
            <div class="icon">⚡</div>
            <div class="title">时间紧迫</div>
            <div class="desc">只有5-15分钟，需要快速了解</div>
            <div class="recommend">→ MVA或Level 1</div>
          </div>

          <div class="decision-card" @click="showScenario('problem')">
            <div class="icon">🔍</div>
            <div class="title">解决问题</div>
            <div class="desc">需要找到具体方法应用到工作中</div>
            <div class="recommend">→ Level 2</div>
          </div>

          <div class="decision-card" @click="showScenario('learning')">
            <div class="icon">📚</div>
            <div class="title">深度学习</div>
            <div class="desc">系统学习新领域或构建知识体系</div>
            <div class="recommend">→ Level 3</div>
          </div>

          <div class="decision-card" @click="showScenario('research')">
            <div class="icon">🔬</div>
            <div class="title">专业研究</div>
            <div class="desc">需要对比多个来源形成综述</div>
            <div class="recommend">→ Level 4</div>
          </div>
        </div>

        <div class="flowchart">
          <strong>决策流程图</strong><br /><br />
          我的目标是什么？<br />
          ↓<br />
          ┌─────────┬─────────┬─────────┬─────────┐<br />
          │快速浏览 │ 应用实践│ 深度理解│ 学术研究│<br />
          └─────────┴─────────┴─────────┴─────────┘<br />
          ↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br />
          我有多少时间？<br />
          5-15分钟 30分钟 60分钟 120分钟+<br />
          ↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br />
          MVA/L1&nbsp;&nbsp;&nbsp;Level 2&nbsp;&nbsp;Level 3&nbsp;&nbsp;Level 4
        </div>
      </div>

      <!-- 即用提示词模板 -->
      <div class="template-section">
        <h3>📝 复制即用提示词模板</h3>
        <div class="template-grid">
          <div class="template-card level-1">
            <h4>⚡ MVA - 最小可行分析（5分钟）</h4>
            <div class="prompt">{{ templates[0] }}</div>
            <button class="copy-btn" @click="copyTemplate(0)">📋 复制模板</button>
          </div>

          <div class="template-card level-2">
            <h4>🚀 Level 1 - 快速分析（15分钟）</h4>
            <div class="prompt">{{ templates[1] }}</div>
            <button class="copy-btn" @click="copyTemplate(1)">📋 复制模板</button>
          </div>

          <div class="template-card level-3">
            <h4>🎯 Level 2 - 标准分析（30分钟）</h4>
            <div class="prompt">{{ templates[2] }}</div>
            <button class="copy-btn" @click="copyTemplate(2)">📋 复制模板</button>
          </div>

          <div class="template-card level-4">
            <h4>🧠 Level 3 - 深度分析（60分钟）</h4>
            <div class="prompt">{{ templates[3] }}</div>
            <button class="copy-btn" @click="copyTemplate(3)">📋 复制模板</button>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="faq-section">
        <h3>❓ 常见问题</h3>

        <div class="faq-item">
          <div class="faq-question">Q: 我应该从哪个级别开始？</div>
          <div class="faq-answer">
            A: 建议从Level
            1开始体验。如果你时间特别紧（&lt;10分钟），用MVA；如果想深入理解或应用到工作中，用Level
            2或Level 3。
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">Q: 不同级别的主要区别是什么？</div>
          <div class="faq-answer">
            A:
            主要区别在时间投入和思维框架数量。MVA只用SCQA，Level 1加入5W2H，Level
            2增加批判性思维和逆向思维，Level 3使用全套10+框架进行多维度分析。
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">Q: 可以自定义分析框架吗？</div>
          <div class="faq-answer">
            A:
            可以！在提示词中明确指定想用的框架。例如："请只使用SCQA和第一性原理分析"或"重点应用逆向思维和系统思维"。
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">Q: 长文章需要全文粘贴吗？</div>
          <div class="faq-answer">
            A:
            不需要。对于5000字以上的长文，建议只粘贴核心段落（引言+主论点+结论）或提供摘要+URL。这样既节省token，又不影响分析质量。
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">Q: 如何判断分析质量？</div>
          <div class="faq-answer">
            A: 使用我们的
            <router-link to="/quality-check" class="link">质量自检清单</router-link
            >！15个检查项帮你验证分析的完整性、逻辑性和可用性，避免AI幻觉和逻辑错误。
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">Q: 可以分析多篇文章吗？</div>
          <div class="faq-answer">
            A:
            可以！使用Level
            4研究模式，系统会对比多个来源，识别共识和分歧，形成综合观点。适合文献综述、行业研究等场景。
          </div>
        </div>
      </div>

      <!-- 下一步行动 -->
      <div class="next-steps">
        <h3>🎯 准备好了？选择你的第一步</h3>
        <div class="next-steps-grid">
          <router-link to="/mva-template" class="next-step-item">
            <div class="icon">⚡</div>
            <div class="title">5分钟快速体验</div>
            <p>使用MVA模板，立即开始第一次分析</p>
          </router-link>

          <router-link to="/diagnosis" class="next-step-item">
            <div class="icon">🧭</div>
            <div class="title">获取个性化推荐</div>
            <p>回答3个问题，找到最适合你的分析方式</p>
          </router-link>

          <router-link to="/framework" class="next-step-item">
            <div class="icon">📚</div>
            <div class="title">探索思维框架</div>
            <p>了解10+思维框架和高级用法</p>
          </router-link>

          <router-link to="/quality-check" class="next-step-item">
            <div class="icon">✅</div>
            <div class="title">学习质量检查</div>
            <p>确保每次分析都高质量、可信赖</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quick-start-view {
  padding: var(--spacing-2xl) var(--spacing-md);
  min-height: calc(100vh - 80px);
  background: var(--background);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

/* 页面标题 */
.header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.header h1 {
  font-size: 56px;
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
  background: linear-gradient(135deg, #0071e3, #af52de);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

/* Hero区域 */
.hero-box {
  background: linear-gradient(135deg, #0071e3, #af52de);
  color: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.hero-box h2 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-semibold);
}

.hero-box p {
  font-size: var(--font-size-lg);
  opacity: 0.95;
  line-height: var(--line-height-relaxed);
}

/* 步骤卡片 */
.step-cards {
  display: grid;
  gap: var(--gap-md);
  margin-bottom: var(--spacing-xl);
}

.step-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.step-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.step-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0071e3, #af52de);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.step-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
}

.step-content {
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}

.step-content ul {
  margin-top: var(--spacing-sm);
  margin-left: var(--spacing-md);
  line-height: 2;
}

.step-content li {
  margin-bottom: var(--spacing-xs);
}

.example-box {
  background: var(--background);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-blue);
  margin-top: var(--spacing-sm);
}

.example-box strong {
  color: var(--primary-blue);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.example-prompt {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-family: var(--font-family-mono);
  color: var(--text-secondary);
}

.link {
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.link:hover {
  text-decoration: underline;
}

/* 快速决策区域 */
.quick-decision {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-xl);
}

.quick-decision h3 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.decision-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-sm);
}

.decision-card {
  background: var(--background);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-base);
  border: 2px solid transparent;
}

.decision-card:hover {
  border-color: var(--primary-blue);
  transform: scale(1.05);
}

.decision-card .icon {
  font-size: 36px;
  margin-bottom: var(--spacing-sm);
}

.decision-card .title {
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-base);
}

.decision-card .desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.decision-card .recommend {
  display: inline-block;
  padding: 4px var(--spacing-sm);
  background: var(--primary-green);
  color: white;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.flowchart {
  background: var(--background);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  text-align: center;
  margin-top: var(--spacing-md);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  line-height: 2;
  color: var(--text-secondary);
}

.flowchart strong {
  color: var(--text-primary);
}

/* 模板区域 */
.template-section {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-xl);
}

.template-section h3 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
}

.template-grid {
  display: grid;
  gap: var(--spacing-sm);
}

.template-card {
  background: var(--background);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border-left: 4px solid;
}

.template-card.level-1 {
  border-left-color: #34c759;
}
.template-card.level-2 {
  border-left-color: #0071e3;
}
.template-card.level-3 {
  border-left-color: #af52de;
}
.template-card.level-4 {
  border-left-color: #ff9500;
}

.template-card h4 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.template-card .prompt {
  background: white;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
  font-family: var(--font-family-mono);
  white-space: pre-wrap;
}

.copy-btn {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--primary-blue);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-base);
}

.copy-btn:hover {
  background: #0077ed;
}

/* FAQ区域 */
.faq-section {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-xl);
}

.faq-section h3 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
}

.faq-item {
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-light);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-xs);
  color: var(--primary-blue);
}

.faq-answer {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

/* 下一步行动 */
.next-steps {
  background: linear-gradient(135deg, #ff9500, #ff6b00);
  color: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
}

.next-steps h3 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}

.next-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.next-step-item {
  background: rgba(255, 255, 255, 0.2);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  cursor: pointer;
  text-decoration: none;
  color: white;
  display: block;
}

.next-step-item:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.next-step-item .icon {
  font-size: 32px;
  margin-bottom: var(--spacing-sm);
}

.next-step-item .title {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
}

.next-step-item p {
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header h1 {
    font-size: var(--font-size-3xl);
  }

  .hero-box {
    padding: var(--spacing-md);
  }

  .step-number {
    width: 40px;
    height: 40px;
    font-size: var(--font-size-xl);
  }

  .step-title {
    font-size: var(--font-size-xl);
  }

  .decision-matrix {
    grid-template-columns: 1fr;
  }

  .template-grid {
    grid-template-columns: 1fr;
  }

  .next-steps-grid {
    grid-template-columns: 1fr;
  }
}

.placeholder p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}
</style>
