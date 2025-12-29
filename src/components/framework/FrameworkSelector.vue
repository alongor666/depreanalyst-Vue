<script setup>
import { ref, computed } from 'vue'
import frameworksData from '../../data/frameworks.json'

// 已选择的框架ID列表
const selectedFrameworks = ref([])

// 生成的Prompt
const generatedPrompt = ref('')

// 是否显示Prompt预览
const showPrompt = ref(false)

// 预设组合
const presetCombos = [
  {
    id: 'quick',
    title: '快速分析组合',
    frameworks: ['SCQA结构思维', '5W2H完整性检查'],
    useCase: '适合：时间紧迫、快速了解'
  },
  {
    id: 'critical',
    title: '批判性分析组合',
    frameworks: ['批判性思维', '逆向思维', '5W2H完整性检查'],
    useCase: '适合：评估方案、发现风险'
  },
  {
    id: 'deep',
    title: '深度理解组合',
    frameworks: ['第一性原理', '系统思维', '心智模型'],
    useCase: '适合：学习新领域、深度理解'
  },
  {
    id: 'innovation',
    title: '创新思考组合',
    frameworks: ['六顶思考帽', '第一性原理', 'SCQA结构思维'],
    useCase: '适合：产品设计、策略制定'
  },
  {
    id: 'decision',
    title: '决策支持组合',
    frameworks: ['SWOT分析', '逆向思维', '系统思维'],
    useCase: '适合：战略决策、风险评估'
  },
  {
    id: 'research',
    title: '学术研究组合',
    frameworks: ['跨源对比', '批判性思维', '系统思维'],
    useCase: '适合：文献综述、专业研究'
  }
]

// 选中的框架对象列表
const selectedFrameworkObjects = computed(() => {
  return frameworksData.frameworks.filter(f =>
    selectedFrameworks.value.includes(f.name)
  )
})

// 切换框架选择
const toggleFramework = (frameworkName) => {
  const index = selectedFrameworks.value.indexOf(frameworkName)
  if (index > -1) {
    selectedFrameworks.value.splice(index, 1)
  } else {
    selectedFrameworks.value.push(frameworkName)
  }
}

// 清空选择
const clearSelection = () => {
  selectedFrameworks.value = []
  showPrompt.value = false
}

// 加载预设组合
const loadCombo = (comboId) => {
  const combo = presetCombos.find(c => c.id === comboId)
  if (combo) {
    selectedFrameworks.value = [...combo.frameworks]
  }
}

// 生成Prompt
const generatePrompt = () => {
  if (selectedFrameworks.value.length === 0) {
    alert('请至少选择一个框架')
    return
  }

  let prompt = `请使用 Deep Reading Analyst 技能，结合以下思维框架对内容进行深度分析：\n\n`

  prompt += `**选择的框架（${selectedFrameworks.value.length}个）：**\n`

  selectedFrameworkObjects.value.forEach((fw, index) => {
    prompt += `\n${index + 1}. **${fw.name}**\n`
    prompt += `   ${fw.description}\n`

    // 添加框架特定的分析要求
    if (fw.name.includes('SCQA')) {
      prompt += `   - 识别：S (Situation 情境), C (Complication 冲突), Q (Question 问题), A (Answer 答案)\n`
    } else if (fw.name.includes('5W2H')) {
      prompt += `   - 检查：What, Why, Who, When, Where, How, How much\n`
      prompt += `   - 标注充分覆盖和缺失的维度\n`
    } else if (fw.name.includes('批判性思维')) {
      prompt += `   - 论证强度评分 (1-10分)\n`
      prompt += `   - 识别逻辑谬误\n`
      prompt += `   - 评估证据质量\n`
    } else if (fw.name.includes('逆向思维')) {
      prompt += `   - 如何让这个方案失败？\n`
      prompt += `   - 关键假设是什么？\n`
      prompt += `   - 潜在风险和缓解策略\n`
    } else if (fw.name.includes('第一性原理')) {
      prompt += `   - 问题的本质是什么？\n`
      prompt += `   - 核心假设验证\n`
      prompt += `   - 从基础真理重新思考\n`
    } else if (fw.name.includes('系统思维')) {
      prompt += `   - 变量关系图\n`
      prompt += `   - 反馈循环识别\n`
      prompt += `   - 系统杠杆点\n`
    } else if (fw.name.includes('心智模型')) {
      prompt += `   - 从3-5个不同学科视角分析\n`
      prompt += `   - 经济学/心理学/物理学/生物学等\n`
    } else if (fw.name.includes('六顶思考帽')) {
      prompt += `   - 🤍 白帽：事实  🖤 黑帽：风险  💛 黄帽：收益\n`
      prompt += `   - 💚 绿帽：创意  ❤️ 红帽：直觉  💙 蓝帽：控制\n`
    }
  })

  prompt += `\n**分析内容：**\n[在此粘贴您要分析的文章、文档或URL]\n\n`

  prompt += `**输出要求：**\n`
  prompt += `- 针对每个框架给出具体分析\n`
  prompt += `- 整合多维度洞察，给出综合结论\n`
  prompt += `- 标注高置信度结论和需要进一步验证的推断\n`
  prompt += `- 提供可执行的行动建议（3-5条）\n`

  generatedPrompt.value = prompt
  showPrompt.value = true

  // 滚动到Prompt预览区域
  setTimeout(() => {
    document.getElementById('promptPreview')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

// 复制Prompt
async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(generatedPrompt.value)
    alert('✅ Prompt已复制到剪贴板！')
  } catch (err) {
    console.error('复制失败:', err)
    alert('❌ 复制失败，请手动复制')
  }
}
</script>

<template>
  <div class="framework-selector">
    <!-- 主内容区 -->
    <div class="two-column">
      <!-- 左侧：框架库 -->
      <div class="frameworks-section">
        <h2>📚 框架库：点击选择（可多选）</h2>
        <div class="frameworks-grid">
          <div
            v-for="framework in frameworksData.frameworks"
            :key="framework.id"
            class="framework-card"
            :class="{ selected: selectedFrameworks.includes(framework.name) }"
            @click="toggleFramework(framework.name)"
          >
            <div class="framework-icon">{{ framework.icon }}</div>
            <div class="framework-name">{{ framework.name }}</div>
            <div class="framework-desc">{{ framework.description }}</div>
            <div class="framework-meta">
              <span
                v-for="tag in framework.tags"
                :key="tag"
                class="meta-tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：已选择 + 操作 -->
      <div class="selected-panel">
        <div class="selected-count">
          <div class="number">{{ selectedFrameworks.length }}</div>
          <div class="label">已选择框架</div>
        </div>

        <div class="selected-list">
          <div v-if="selectedFrameworks.length === 0" class="empty-state">
            点击左侧框架卡片开始选择
          </div>
          <div
            v-for="name in selectedFrameworks"
            :key="name"
            class="selected-item"
          >
            <span class="item-name">{{ name }}</span>
            <button
              class="remove-btn"
              @click="toggleFramework(name)"
            >
              ×
            </button>
          </div>
        </div>

        <button
          class="action-btn primary"
          :disabled="selectedFrameworks.length === 0"
          @click="generatePrompt"
        >
          🚀 生成分析提示词
        </button>

        <button
          class="action-btn secondary"
          @click="clearSelection"
        >
          🔄 清空选择
        </button>
      </div>
    </div>

    <!-- Prompt预览 -->
    <div v-if="showPrompt" id="promptPreview" class="prompt-preview">
      <h2>📋 生成的分析提示词</h2>
      <div class="prompt-box">
        <pre>{{ generatedPrompt }}</pre>
      </div>
      <button class="action-btn primary" @click="copyPrompt">
        📋 复制提示词
      </button>
    </div>

    <!-- 预设组合 -->
    <div class="preset-combos">
      <h2>🎨 常用框架组合</h2>
      <div class="combo-grid">
        <div
          v-for="combo in presetCombos"
          :key="combo.id"
          class="combo-card"
          @click="loadCombo(combo.id)"
        >
          <h4>{{ combo.title }}</h4>
          <div class="frameworks">{{ combo.frameworks.join(' + ') }}</div>
          <div class="use-case">{{ combo.useCase }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.framework-selector {
  max-width: 1400px;
  margin: 0 auto;
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  margin-bottom: 48px;
}

.frameworks-section h2 {
  font-size: 24px;
  margin-bottom: 24px;
}

.frameworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.framework-card {
  background: var(--surface);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

.framework-card:hover {
  border-color: var(--primary-blue);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.framework-card.selected {
  border-color: var(--primary-blue);
  background: rgba(0, 113, 227, 0.05);
  box-shadow: var(--shadow-md);
}

.framework-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.framework-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.framework-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.framework-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-tag {
  padding: 4px 12px;
  background: var(--background);
  border-radius: 12px;
  font-size: 12px;
  color: var(--text-secondary);
}

/* 已选择面板 */
.selected-panel {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}

.selected-count {
  text-align: center;
  padding: 24px;
  margin-bottom: 24px;
  background: var(--background);
  border-radius: var(--radius-md);
}

.selected-count .number {
  font-size: 48px;
  font-weight: 700;
  color: var(--primary-blue);
}

.selected-count .label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 8px;
}

.selected-list {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  min-height: 200px;
}

.empty-state {
  color: var(--text-secondary);
  text-align: center;
  padding: 48px 20px;
}

.selected-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--background);
  border-radius: var(--radius-md);
  margin-bottom: 8px;
}

.item-name {
  font-size: 14px;
  font-weight: 500;
}

.remove-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: var(--border-light);
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.remove-btn:hover {
  background: var(--primary-red);
  color: white;
}

.action-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 12px;
}

.action-btn.primary {
  background: var(--primary-blue);
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  background: #0077ed;
  transform: scale(1.02);
}

.action-btn.primary:disabled {
  background: var(--border-light);
  color: var(--text-secondary);
  cursor: not-allowed;
}

.action-btn.secondary {
  background: var(--border-light);
  color: var(--text-primary);
}

.action-btn.secondary:hover {
  background: #c6c6cb;
}

/* Prompt预览 */
.prompt-preview {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-md);
  margin-bottom: 48px;
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

.prompt-preview h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.prompt-box {
  background: #f5f5f7;
  border-radius: var(--radius-md);
  padding: 24px;
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.prompt-box pre {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-primary);
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
}

/* 预设组合 */
.preset-combos {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
}

.preset-combos h2 {
  font-size: 24px;
  margin-bottom: 24px;
}

.combo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.combo-card {
  background: var(--background);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.combo-card:hover {
  border-color: var(--primary-blue);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.combo-card h4 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.combo-card .frameworks {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  line-height: 1.5;
}

.combo-card .use-case {
  font-size: 13px;
  color: var(--primary-blue);
  font-weight: 500;
}

@media (max-width: 1024px) {
  .two-column {
    grid-template-columns: 1fr;
  }

  .selected-panel {
    position: static;
    max-height: none;
  }
}

@media (max-width: 768px) {
  .frameworks-grid {
    grid-template-columns: 1fr;
  }

  .combo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
