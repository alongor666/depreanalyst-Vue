<script setup>
import { computed } from 'vue'

const props = defineProps({
  recommendation: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['restart'])

// 生成Prompt模板
const prompt = computed(() => {
  const { level, frameworks, answers } = props.recommendation

  let promptText = `请使用 Deep Reading Analyst 技能，对以下内容进行${level.name}：

**分析目标：** ${getGoalText(answers.goal)}
**内容类型：** ${getContentTypeText(answers.contentType)}
**时间预算：** ${level.time}

**内容：**
[粘贴您要分析的文章、文档或URL]

**框架要求：**
`

  // 根据框架生成具体要求
  if (frameworks.includes('SCQA核心结构') || frameworks.includes('SCQA')) {
    promptText += `
1. **SCQA 结构分析**
   - S (Situation): 背景和情境
   - C (Complication): 冲突或问题
   - Q (Question): 核心问题
   - A (Answer): 解决方案或结论
`
  }

  if (frameworks.includes('5W2H')) {
    promptText += `
2. **5W2H 完整性检查**
   - What/Why/Who/When/Where/How/How much
   - 标注充分覆盖和缺失的维度
`
  }

  if (frameworks.includes('批判性思维')) {
    promptText += `
3. **批判性思维评估**
   - 论证强度评分 (1-10分)
   - 逻辑谬误识别
   - 证据质量评估
`
  }

  if (frameworks.includes('逆向思维')) {
    promptText += `
4. **逆向思维 - 风险识别**
   - 如何让这个方案失败？
   - 关键假设是什么？
   - 潜在风险和缓解策略
`
  }

  if (frameworks.includes('第一性原理')) {
    promptText += `
5. **第一性原理分析**
   - 问题的本质是什么？
   - 核心假设验证
   - 从基础真理重新思考
`
  }

  if (frameworks.includes('系统思维')) {
    promptText += `
6. **系统思维分析**
   - 变量关系图
   - 反馈循环识别
   - 系统杠杆点
`
  }

  if (frameworks.includes('心理模型')) {
    promptText += `
7. **多学科心理模型**
   - 从3-5个不同学科视角分析
   - 经济学/心理学/物理学/生物学等
`
  }

  if (frameworks.includes('六顶思考帽')) {
    promptText += `
8. **六顶思考帽评估**
   - 🤍 白帽：事实  🖤 黑帽：风险  💛 黄帽：收益
   - 💚 绿帽：创意  ❤️ 红帽：直觉  💙 蓝帽：控制
`
  }

  promptText += `
**输出要求：**
`

  // 根据目标定制输出
  if (answers.goal === 'quick-review') {
    promptText += `- 一句话核心总结
- Top 3 关键要点
- 1个立即可执行的行动`
  } else if (answers.goal === 'problem-solving') {
    promptText += `- 问题核心定义
- 3-5个解决方案（含优缺点）
- 推荐方案 + 实施步骤
- 风险评估和缓解策略`
  } else if (answers.goal === 'decision') {
    promptText += `- 决策选项对比表
- 风险-收益矩阵
- 场景分析（最佳/最坏/最可能）
- 推荐决策（含置信度）`
  } else if (answers.goal === 'writing') {
    promptText += `- 可引用的关键论据和数据
- 论证质量评估
- 反面观点清单
- 引用建议`
  } else if (answers.goal === 'research') {
    promptText += `- 研究方法论评估
- 核心假设验证
- 局限性和未来方向
- 跨研究对比（如适用）`
  } else {
    promptText += `- 核心洞察（2-3个）
- 知识结构图
- 可执行建议（3-5条）
- 延伸学习方向`
  }

  return promptText
})

function getGoalText(goal) {
  const texts = {
    'problem-solving': '找到解决方案',
    'learning': '深度学习和掌握',
    'writing': '收集写作素材',
    'decision': '支持重要决策',
    'quick-review': '快速了解核心要点',
    'research': '学术研究分析'
  }
  return texts[goal] || '深度分析'
}

function getContentTypeText(type) {
  const texts = {
    'news-blog': '新闻/博客文章',
    'opinion': '观点评论',
    'research-paper': '学术论文',
    'business-case': '商业案例',
    'tutorial': '教程指南',
    'report': '数据报告'
  }
  return texts[type] || '一般文章'
}

// 复制Prompt
async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(prompt.value)
    alert('✅ Prompt已复制到剪贴板！')
  } catch (err) {
    console.error('复制失败:', err)
    alert('❌ 复制失败，请手动复制')
  }
}
</script>

<template>
  <div class="recommendation-card">
    <!-- 推荐方案 -->
    <div class="result-box">
      <div class="level-badge" :style="{ background: recommendation.level.color }">
        {{ recommendation.level.name }}
      </div>
      <h2 class="recommendation-title">为您推荐的分析方案</h2>
      <p class="recommendation-desc">
        基于您的需求，建议使用 <strong>{{ recommendation.level.name }}</strong>，
        预计用时 <strong>{{ recommendation.level.time }}</strong>
      </p>

      <!-- 框架列表 -->
      <div class="frameworks-section">
        <h3>🧠 推荐使用的思维框架：</h3>
        <div class="frameworks-list">
          <span
            v-for="(framework, index) in recommendation.frameworks"
            :key="index"
            class="framework-tag"
          >
            {{ framework }}
          </span>
        </div>
      </div>
    </div>

    <!-- Prompt预览 -->
    <div class="prompt-preview">
      <h3>📝 为您定制的Prompt模板</h3>
      <div class="prompt-code">
        <pre>{{ prompt }}</pre>
      </div>
      <button class="copy-btn" @click="copyPrompt">📋 复制Prompt</button>
    </div>

    <!-- 推荐理由 -->
    <div class="why-section">
      <h3>💡 为什么推荐这个方案？</h3>
      <div class="why-list">
        <div
          v-for="(reason, index) in recommendation.why"
          :key="index"
          class="why-item"
        >
          <strong>{{ reason.title }}：</strong>
          {{ reason.content }}
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button class="btn btn-secondary" @click="$emit('restart')">
        🔄 重新诊断
      </button>
    </div>
  </div>
</template>

<style scoped>
.recommendation-card {
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

.result-box {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-md);
  margin-bottom: 24px;
  text-align: center;
}

.level-badge {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 24px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
}

.recommendation-title {
  font-size: 28px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.recommendation-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.frameworks-section {
  margin-top: 24px;
  text-align: left;
}

.frameworks-section h3 {
  font-size: 18px;
  margin-bottom: 16px;
}

.frameworks-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.framework-tag {
  background: var(--primary-blue);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.prompt-preview {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

.prompt-preview h3 {
  font-size: 18px;
  margin-bottom: 16px;
}

.prompt-code {
  background: #f5f5f7;
  border-radius: var(--radius-md);
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.prompt-code pre {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-primary);
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
}

.copy-btn {
  width: 100%;
  padding: 14px;
  background: var(--primary-blue);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.copy-btn:hover {
  background: #0077ed;
  transform: scale(1.02);
}

.why-section {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

.why-section h3 {
  font-size: 18px;
  margin-bottom: 16px;
}

.why-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.why-item {
  padding: 16px;
  background: var(--background);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-blue);
}

.why-item strong {
  color: var(--primary-blue);
}

.action-buttons {
  display: flex;
  justify-content: center;
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

.btn-secondary {
  background: var(--border-light);
  color: var(--text-primary);
}

.btn-secondary:hover {
  background: #c6c6cb;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .result-box,
  .prompt-preview,
  .why-section {
    padding: 20px;
  }

  .recommendation-title {
    font-size: 22px;
  }

  .prompt-code {
    max-height: 300px;
  }
}
</style>
