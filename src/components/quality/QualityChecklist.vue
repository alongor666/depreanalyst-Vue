<script setup>
import { ref, computed } from 'vue'
import checklistData from '../../data/checklist.json'

// 已勾选的检查项ID列表
const checkedItems = ref([])

// 切换检查项
const toggleItem = (itemId) => {
  const index = checkedItems.value.indexOf(itemId)
  if (index > -1) {
    checkedItems.value.splice(index, 1)
  } else {
    checkedItems.value.push(itemId)
  }
}

// 重置清单
const resetChecklist = () => {
  checkedItems.value = []
}

// 计算总分
const totalScore = computed(() => {
  return checklistData.items
    .filter(item => checkedItems.value.includes(item.id))
    .reduce((sum, item) => sum + item.score, 0)
})

// 获取评分等级
const scoreLevel = computed(() => {
  const score = totalScore.value
  return checklistData.scoringLevels.find(
    level => score >= level.min && score <= level.max
  )
})

// 按分类分组的检查项
const itemsByCategory = computed(() => {
  return checklistData.categories.map(category => ({
    ...category,
    items: checklistData.items.filter(item => item.category === category.id)
  }))
})

// 获取关卡样式
const getLevelStyle = (level) => {
  const styles = {
    critical: {
      border: '2px solid #ff3b30',
      background: 'rgba(255, 59, 48, 0.05)'
    },
    warning: {
      border: '2px solid #ff9500',
      background: 'rgba(255, 149, 0, 0.05)'
    },
    normal: {
      border: '2px solid var(--border-light)',
      background: 'var(--surface)'
    }
  }
  return styles[level] || styles.normal
}
</script>

<template>
  <div class="quality-checklist">
    <!-- 说明卡片 -->
    <div class="intro-box">
      <h2>为什么需要质量自检？</h2>
      <p>
        AI分析可能存在幻觉、偏见或逻辑错误。这份清单帮助您识别高质量分析，避免被误导性结论影响决策。
      </p>
    </div>

    <!-- 检查清单 -->
    <div
      v-for="category in itemsByCategory"
      :key="category.id"
      class="checklist-section"
    >
      <h3 class="section-title">
        {{ category.icon }} {{ category.name }}
        <span v-if="category.subtitle" class="section-subtitle">({{ category.subtitle }})</span>
      </h3>

      <div class="check-items">
        <div
          v-for="item in category.items"
          :key="item.id"
          class="check-item"
          :class="{ checked: checkedItems.includes(item.id) }"
          :style="getLevelStyle(item.level)"
          @click="toggleItem(item.id)"
        >
          <div class="checkbox">
            <span v-if="checkedItems.includes(item.id)" class="checkmark">✓</span>
          </div>
          <div class="check-content">
            <div class="check-title">{{ item.title }}</div>
            <div class="check-desc">{{ item.description }}</div>
          </div>
          <div class="check-score">{{ item.score }}分</div>
        </div>
      </div>
    </div>

    <!-- 评分展示 -->
    <div class="score-box">
      <div class="score-number">{{ totalScore }}</div>
      <div class="score-label">分析质量得分 (满分100分)</div>

      <div
        v-if="scoreLevel"
        class="score-message"
        :style="{
          background: scoreLevel.bgColor,
          color: scoreLevel.color
        }"
      >
        <strong>{{ scoreLevel.title }}</strong>
        <p>{{ scoreLevel.message }}</p>
      </div>

      <button class="reset-btn" @click="resetChecklist">
        🔄 重新检查
      </button>
    </div>
  </div>
</template>

<style scoped>
.quality-checklist {
  max-width: 900px;
  margin: 0 auto;
}

/* 说明卡片 */
.intro-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-md);
}

.intro-box h2 {
  font-size: 24px;
  margin-bottom: 12px;
}

.intro-box p {
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  opacity: 0.95;
}

/* 检查清单部分 */
.checklist-section {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}

.section-title {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.section-subtitle {
  font-size: 16px;
  font-weight: 400;
  color: var(--text-secondary);
}

.check-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 检查项 */
.check-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s;
}

.check-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.check-item.checked {
  background: rgba(52, 199, 89, 0.05);
  border-color: var(--primary-green) !important;
}

.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border-light);
  border-radius: 6px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.check-item.checked .checkbox {
  background: var(--primary-green);
  border-color: var(--primary-green);
}

.checkmark {
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.check-content {
  flex: 1;
}

.check-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.check-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.check-score {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-blue);
  flex-shrink: 0;
}

/* 评分展示 */
.score-box {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 48px 32px;
  box-shadow: var(--shadow-md);
  text-align: center;
}

.score-number {
  font-size: 72px;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 8px;
  line-height: 1;
}

.score-label {
  font-size: 20px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.score-message {
  border-radius: var(--radius-md);
  padding: 24px;
  margin-bottom: 24px;
}

.score-message strong {
  display: block;
  font-size: 18px;
  margin-bottom: 8px;
}

.score-message p {
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

.reset-btn {
  padding: 14px 32px;
  background: var(--primary-blue);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.reset-btn:hover {
  background: #0077ed;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .intro-box {
    padding: 24px;
  }

  .checklist-section {
    padding: 16px;
  }

  .check-item {
    padding: 16px;
  }

  .score-box {
    padding: 32px 20px;
  }

  .score-number {
    font-size: 56px;
  }
}
</style>
