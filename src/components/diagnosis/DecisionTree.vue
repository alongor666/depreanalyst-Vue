<script setup>
import { ref, computed } from 'vue'
import RecommendationCard from './RecommendationCard.vue'

// 当前步骤
const currentStep = ref(1)

// 用户答案
const answers = ref({
  goal: null,
  contentType: null,
  time: null
})

// 步骤1：分析目标选项
const goalOptions = [
  { value: 'problem-solving', icon: '🔧', title: '解决问题', desc: '我需要找到解决方案或做出决策' },
  { value: 'learning', icon: '📚', title: '深度学习', desc: '我想全面理解和掌握知识' },
  { value: 'writing', icon: '✍️', title: '写作引用', desc: '我需要收集素材和论据' },
  { value: 'decision', icon: '⚖️', title: '重要决策', desc: '我要评估方案和风险' },
  { value: 'quick-review', icon: '⚡', title: '快速了解', desc: '我只需要掌握核心要点' },
  { value: 'research', icon: '🔬', title: '学术研究', desc: '我在做严谨的学术分析' }
]

// 步骤2：内容类型选项
const contentTypeOptions = [
  { value: 'news-blog', icon: '📰', title: '新闻/博客', desc: '新闻报道、博客文章、简讯' },
  { value: 'opinion', icon: '💬', title: '观点评论', desc: '社论、评论文章、专栏' },
  { value: 'research-paper', icon: '📄', title: '学术论文', desc: '研究论文、学术文章' },
  { value: 'business-case', icon: '💼', title: '商业案例', desc: '案例分析、商业报告' },
  { value: 'tutorial', icon: '📖', title: '教程指南', desc: '操作指南、方法论文章' },
  { value: 'report', icon: '📊', title: '数据报告', desc: '统计报告、调研数据' }
]

// 步骤3：时间预算选项
const timeOptions = [
  { value: '5min', icon: '⚡', title: '5分钟', desc: '极简快速，只要核心要点' },
  { value: '15min', icon: '🏃', title: '15分钟', desc: '快速理解，提取关键信息' },
  { value: '30min', icon: '🚶', title: '30分钟', desc: '标准分析，评估质量风险' },
  { value: '60min', icon: '🧘', title: '60分钟', desc: '深度分析，多维度思考' },
  { value: '120min', icon: '🔬', title: '120分钟+', desc: '研究级分析，综合多源' }
]

// 进度步骤状态
const progressSteps = computed(() => [
  { step: 1, label: '分析目标', completed: currentStep.value > 1, active: currentStep.value === 1 },
  { step: 2, label: '内容类型', completed: currentStep.value > 2, active: currentStep.value === 2 },
  { step: 3, label: '时间预算', completed: currentStep.value > 3, active: currentStep.value === 3 },
  { step: 4, label: '获得方案', completed: currentStep.value > 4, active: currentStep.value === 4 }
])

// 选中的选项
const selectedGoal = ref(null)
const selectedContentType = ref(null)
const selectedTime = ref(null)

// 推荐结果
const recommendation = ref(null)

// 选择选项
const selectOption = (type, value) => {
  if (type === 'goal') {
    selectedGoal.value = value
  } else if (type === 'contentType') {
    selectedContentType.value = value
  } else if (type === 'time') {
    selectedTime.value = value
  }
}

// 下一步
const nextStep = () => {
  if (currentStep.value === 1 && !selectedGoal.value) {
    alert('请选择一个选项')
    return
  }
  if (currentStep.value === 2 && !selectedContentType.value) {
    alert('请选择一个选项')
    return
  }

  if (currentStep.value === 1) {
    answers.value.goal = selectedGoal.value
  } else if (currentStep.value === 2) {
    answers.value.contentType = selectedContentType.value
  }

  currentStep.value++
}

// 上一步
const prevStep = () => {
  currentStep.value--
}

// 生成推荐
const generateRecommendation = () => {
  if (!selectedTime.value) {
    alert('请选择时间预算')
    return
  }

  answers.value.time = selectedTime.value
  recommendation.value = getRecommendation(answers.value)
  currentStep.value = 4
}

// 重新开始
const restart = () => {
  currentStep.value = 1
  selectedGoal.value = null
  selectedContentType.value = null
  selectedTime.value = null
  answers.value = { goal: null, contentType: null, time: null }
  recommendation.value = null
}

// 智能推荐算法
function getRecommendation(answers) {
  let level, frameworks, why

  // 基于时间确定基础Level
  if (answers.time === '5min') {
    level = { name: 'MVA - 最小可行分析', time: '5分钟', color: '#34c759' }
    frameworks = ['SCQA核心结构']
  } else if (answers.time === '15min') {
    level = { name: 'Level 1 - 快速分析', time: '15分钟', color: '#0071e3' }
    frameworks = ['SCQA', '5W2H']
  } else if (answers.time === '30min') {
    level = { name: 'Level 2 - 标准分析', time: '30分钟', color: '#af52de' }
    frameworks = ['SCQA', '5W2H', '批判性思维', '逆向思维']
  } else if (answers.time === '60min') {
    level = { name: 'Level 3 - 深度分析', time: '60分钟', color: '#ff9500' }
    frameworks = ['SCQA', '批判性思维', '第一性原理', '系统思维', '心理模型', '六顶思考帽']
  } else {
    level = { name: 'Level 4 - 研究级分析', time: '120分钟+', color: '#ff3b30' }
    frameworks = ['Level 3所有框架', '跨来源对比', '网络搜索验证']
  }

  // 基于目标优化框架
  if (answers.goal === 'problem-solving' || answers.goal === 'decision') {
    if (!frameworks.includes('逆向思维')) frameworks.push('逆向思维')
    if (answers.time === '60min' && !frameworks.includes('六顶思考帽')) {
      frameworks.push('六顶思考帽')
    }
  } else if (answers.goal === 'research') {
    if (answers.time !== '120min' && !frameworks.includes('批判性思维')) {
      frameworks.push('批判性思维')
    }
  } else if (answers.goal === 'writing') {
    if (!frameworks.includes('批判性思维')) frameworks.push('批判性思维')
  }

  // 生成推荐理由
  why = generateWhy(answers, level, frameworks)

  return { level, frameworks, why, answers }
}

// 生成推荐理由
function generateWhy(answers, level, frameworks) {
  let reasons = []

  // 基于时间的理由
  if (answers.time === '5min') {
    reasons.push({
      title: '时间高效',
      content: '5分钟MVA模式只提取最核心的信息，适合快速浏览和决策场景'
    })
  } else if (answers.time === '120min') {
    reasons.push({
      title: '研究深度',
      content: '充足的时间允许进行跨来源验证和多维度分析，确保结论的严谨性'
    })
  }

  // 基于目标的理由
  if (answers.goal === 'decision' || answers.goal === 'problem-solving') {
    reasons.push({
      title: '风险意识',
      content: '逆向思维帮助识别潜在风险，避免决策盲点'
    })
  } else if (answers.goal === 'research') {
    reasons.push({
      title: '学术严谨',
      content: '批判性思维确保论证质量，符合学术研究标准'
    })
  }

  // 基于框架组合的理由
  if (frameworks.length >= 4) {
    reasons.push({
      title: '多维度视角',
      content: `${frameworks.length}个框架组合能从不同角度审视问题，降低认知偏差`
    })
  }

  return reasons
}
</script>

<template>
  <div class="decision-tree">
    <!-- 进度条 -->
    <div class="progress-bar">
      <div
        v-for="step in progressSteps"
        :key="step.step"
        class="progress-step"
        :class="{ completed: step.completed, active: step.active }"
      >
        <div class="progress-dot">
          {{ step.completed ? '✓' : step.step }}
        </div>
        <div class="progress-label">{{ step.label }}</div>
      </div>
    </div>

    <!-- 步骤1：分析目标 -->
    <div v-if="currentStep === 1" class="step">
      <div class="step-header">
        <span class="step-number">1</span>
        <h2 class="step-title">您的分析目标是什么？</h2>
      </div>

      <div class="option-grid">
        <div
          v-for="option in goalOptions"
          :key="option.value"
          class="option-card"
          :class="{ selected: selectedGoal === option.value }"
          @click="selectOption('goal', option.value)"
        >
          <h3>
            <span class="option-icon">{{ option.icon }}</span>
            {{ option.title }}
          </h3>
          <p>{{ option.desc }}</p>
        </div>
      </div>

      <div class="button-group">
        <button class="btn btn-primary" @click="nextStep">下一步</button>
      </div>
    </div>

    <!-- 步骤2：内容类型 -->
    <div v-if="currentStep === 2" class="step">
      <div class="step-header">
        <span class="step-number">2</span>
        <h2 class="step-title">您要分析的是什么类型的内容？</h2>
      </div>

      <div class="option-grid">
        <div
          v-for="option in contentTypeOptions"
          :key="option.value"
          class="option-card"
          :class="{ selected: selectedContentType === option.value }"
          @click="selectOption('contentType', option.value)"
        >
          <h3>
            <span class="option-icon">{{ option.icon }}</span>
            {{ option.title }}
          </h3>
          <p>{{ option.desc }}</p>
        </div>
      </div>

      <div class="button-group">
        <button class="btn btn-secondary" @click="prevStep">上一步</button>
        <button class="btn btn-primary" @click="nextStep">下一步</button>
      </div>
    </div>

    <!-- 步骤3：时间预算 -->
    <div v-if="currentStep === 3" class="step">
      <div class="step-header">
        <span class="step-number">3</span>
        <h2 class="step-title">您有多少时间进行分析？</h2>
      </div>

      <div class="option-grid">
        <div
          v-for="option in timeOptions"
          :key="option.value"
          class="option-card"
          :class="{ selected: selectedTime === option.value }"
          @click="selectOption('time', option.value)"
        >
          <h3>
            <span class="option-icon">{{ option.icon }}</span>
            {{ option.title }}
          </h3>
          <p>{{ option.desc }}</p>
        </div>
      </div>

      <div class="button-group">
        <button class="btn btn-secondary" @click="prevStep">上一步</button>
        <button class="btn btn-primary" @click="generateRecommendation">生成方案</button>
      </div>
    </div>

    <!-- 步骤4：推荐结果 -->
    <div v-if="currentStep === 4 && recommendation" class="step">
      <RecommendationCard :recommendation="recommendation" @restart="restart" />
    </div>
  </div>
</template>

<style scoped>
.decision-tree {
  max-width: 1000px;
  margin: 0 auto;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
  position: relative;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--border-light);
  z-index: 0;
}

.progress-step {
  position: relative;
  z-index: 1;
  text-align: center;
  flex: 1;
}

.progress-dot {
  width: 40px;
  height: 40px;
  background: var(--background);
  border: 2px solid var(--border-light);
  border-radius: 50%;
  margin: 0 auto 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.progress-step.completed .progress-dot {
  background: var(--primary-blue);
  border-color: var(--primary-blue);
  color: white;
}

.progress-step.active .progress-dot {
  border-color: var(--primary-blue);
  border-width: 3px;
  color: var(--primary-blue);
}

.progress-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.step {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-header {
  text-align: center;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.step-number {
  width: 48px;
  height: 48px;
  background: var(--primary-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}

.step-title {
  font-size: 28px;
  margin: 0;
}

.option-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.option-card {
  background: var(--surface);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

.option-card:hover {
  border-color: var(--primary-blue);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.option-card.selected {
  border-color: var(--primary-blue);
  background: rgba(0, 113, 227, 0.05);
  box-shadow: var(--shadow-md);
}

.option-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-icon {
  font-size: 24px;
}

.option-card p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn {
  padding: 14px 32px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: var(--primary-blue);
  color: white;
}

.btn-primary:hover {
  background: #0077ed;
  transform: scale(1.05);
}

.btn-secondary {
  background: var(--border-light);
  color: var(--text-primary);
}

.btn-secondary:hover {
  background: #c6c6cb;
}

@media (max-width: 768px) {
  .option-grid {
    grid-template-columns: 1fr;
  }

  .progress-label {
    display: none;
  }

  .step-title {
    font-size: 20px;
  }
}
</style>
