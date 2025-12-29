<script setup>
import { ref, computed } from 'vue'
import casesData from '../../data/cases.json'

// 筛选器状态
const levelFilter = ref('all')
const scenarioFilter = ref('all')

// 展开的案例ID
const expandedCaseId = ref(null)

// Level筛选选项
const levelOptions = [
  { value: 'all', label: '全部Level', icon: '📚' },
  { value: 'mva', label: 'MVA (5分钟)', icon: '⚡' },
  { value: '1', label: 'Level 1 (15分钟)', icon: '🏃' },
  { value: '2', label: 'Level 2 (30分钟)', icon: '🚶' },
  { value: '3', label: 'Level 3 (60分钟)', icon: '🧘' }
]

// Scenario筛选选项
const scenarioOptions = [
  { value: 'all', label: '全部场景', icon: '🌟' },
  { value: 'problem-solving', label: '问题解决', icon: '🔧' },
  { value: 'learning', label: '深度学习', icon: '📚' },
  { value: 'decision', label: '决策支持', icon: '⚖️' },
  { value: 'research', label: '专业研究', icon: '🔬' },
  { value: 'writing', label: '写作参考', icon: '✍️' }
]

// 筛选后的案例列表
const filteredCases = computed(() => {
  return casesData.cases.filter(c => {
    const levelMatch = levelFilter.value === 'all' || c.level === levelFilter.value
    const scenarioMatch = scenarioFilter.value === 'all' || c.scenario === scenarioFilter.value
    return levelMatch && scenarioMatch
  })
})

// 设置Level筛选
const setLevelFilter = (value) => {
  levelFilter.value = value
}

// 设置Scenario筛选
const setScenarioFilter = (value) => {
  scenarioFilter.value = value
}

// 切换案例展开/收起
const toggleCase = (caseId) => {
  expandedCaseId.value = expandedCaseId.value === caseId ? null : caseId
}

// 获取Level标签颜色
const getLevelColor = (level) => {
  const colors = {
    'mva': '#34c759',
    '1': '#0071e3',
    '2': '#af52de',
    '3': '#ff9500'
  }
  return colors[level] || '#86868b'
}

// 获取Level显示文本
const getLevelText = (level) => {
  const texts = {
    'mva': 'MVA',
    '1': 'Level 1',
    '2': 'Level 2',
    '3': 'Level 3'
  }
  return texts[level] || level
}

// 获取Scenario显示文本
const getScenarioText = (scenario) => {
  const texts = {
    'problem-solving': '问题解决',
    'learning': '深度学习',
    'decision': '决策支持',
    'research': '专业研究',
    'writing': '写作参考'
  }
  return texts[scenario] || scenario
}
</script>

<template>
  <div class="case-library">
    <!-- 筛选器 -->
    <div class="filters">
      <!-- Level筛选 -->
      <div class="filter-group">
        <h3 class="filter-title">📊 按时间投入筛选</h3>
        <div class="filter-buttons">
          <button
            v-for="option in levelOptions"
            :key="option.value"
            class="filter-btn"
            :class="{ active: levelFilter === option.value }"
            @click="setLevelFilter(option.value)"
          >
            <span class="btn-icon">{{ option.icon }}</span>
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Scenario筛选 -->
      <div class="filter-group">
        <h3 class="filter-title">🎯 按使用场景筛选</h3>
        <div class="filter-buttons">
          <button
            v-for="option in scenarioOptions"
            :key="option.value"
            class="filter-btn"
            :class="{ active: scenarioFilter === option.value }"
            @click="setScenarioFilter(option.value)"
          >
            <span class="btn-icon">{{ option.icon }}</span>
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 案例网格 -->
    <div v-if="filteredCases.length > 0" class="cases-grid">
      <div
        v-for="caseItem in filteredCases"
        :key="caseItem.id"
        class="case-card"
        :class="{ expanded: expandedCaseId === caseItem.id }"
      >
        <!-- 案例头部 -->
        <div class="case-header" @click="toggleCase(caseItem.id)">
          <div class="case-meta">
            <span
              class="level-badge"
              :style="{ background: getLevelColor(caseItem.level) }"
            >
              {{ getLevelText(caseItem.level) }}
            </span>
            <span class="scenario-badge">
              {{ getScenarioText(caseItem.scenario) }}
            </span>
            <span class="role-badge">{{ caseItem.role }}</span>
          </div>

          <h3 class="case-title">{{ caseItem.title }}</h3>
          <p class="case-description">{{ caseItem.description }}</p>

          <div class="expand-indicator">
            {{ expandedCaseId === caseItem.id ? '▲ 收起详情' : '▼ 查看完整案例' }}
          </div>
        </div>

        <!-- 案例详情（展开时显示） -->
        <div v-if="expandedCaseId === caseItem.id" class="case-details">
          <div class="detail-section">
            <h4>📥 输入内容</h4>
            <div class="detail-content">{{ caseItem.input }}</div>
          </div>

          <div class="detail-section">
            <h4>📤 分析输出</h4>
            <div class="detail-content output">
              <pre>{{ caseItem.output }}</pre>
            </div>
          </div>

          <div class="detail-section">
            <h4>💡 关键收获</h4>
            <ul class="insights-list">
              <li v-for="(insight, index) in caseItem.insights" :key="index">
                {{ insight }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 无结果提示 -->
    <div v-else class="no-cases">
      <div class="no-cases-icon">🔍</div>
      <h3>没有找到匹配的案例</h3>
      <p>试试调整筛选条件</p>
    </div>
  </div>
</template>

<style scoped>
.case-library {
  max-width: 1200px;
  margin: 0 auto;
}

/* 筛选器 */
.filters {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 32px;
}

.filter-group {
  margin-bottom: 24px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-title {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-btn {
  padding: 10px 20px;
  background: var(--background);
  border: 2px solid var(--border-light);
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.filter-btn:hover {
  border-color: var(--primary-blue);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: var(--primary-blue);
  border-color: var(--primary-blue);
  color: white;
}

.btn-icon {
  font-size: 16px;
}

/* 案例网格 */
.cases-grid {
  display: grid;
  gap: 24px;
}

.case-card {
  background: var(--surface);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s;
}

.case-card:hover {
  box-shadow: var(--shadow-md);
}

.case-card.expanded {
  border-color: var(--primary-blue);
}

.case-header {
  padding: 24px;
  cursor: pointer;
  transition: background 0.3s;
}

.case-header:hover {
  background: var(--background);
}

.case-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.level-badge,
.scenario-badge,
.role-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.level-badge {
  color: white;
}

.scenario-badge {
  background: var(--background);
  color: var(--text-primary);
}

.role-badge {
  background: var(--background);
  color: var(--text-secondary);
}

.case-title {
  font-size: 20px;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.case-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.expand-indicator {
  font-size: 14px;
  color: var(--primary-blue);
  font-weight: 600;
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
}

/* 案例详情 */
.case-details {
  padding: 0 24px 24px;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-section {
  margin-bottom: 24px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.detail-content {
  background: var(--background);
  border-radius: var(--radius-md);
  padding: 16px;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.detail-content.output pre {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-primary);
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
}

.insights-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.insights-list li {
  padding: 12px;
  background: var(--background);
  border-radius: var(--radius-md);
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
  border-left: 4px solid var(--primary-blue);
}

.insights-list li:last-child {
  margin-bottom: 0;
}

/* 无结果提示 */
.no-cases {
  text-align: center;
  padding: 64px 24px;
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.no-cases-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.no-cases h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.no-cases p {
  font-size: 14px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .filters {
    padding: 16px;
  }

  .filter-buttons {
    flex-direction: column;
  }

  .filter-btn {
    width: 100%;
    justify-content: center;
  }

  .case-header {
    padding: 16px;
  }

  .case-details {
    padding: 0 16px 16px;
  }
}
</style>
