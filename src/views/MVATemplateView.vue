<script setup>
import { ref, computed } from 'vue'

// 倒计时相关
const timeLeft = ref(300) // 5分钟 = 300秒
const timerInterval = ref(null)
const timerLabel = ref('准备好后点击开始')
const isAnalysisStarted = ref(false)
const showStopBtn = ref(false)

// 表单数据
const contentInput = ref('')
const situation = ref('')
const complication = ref('')
const question = ref('')
const answer = ref('')
const insight1 = ref('')
const insight2 = ref('')
const insight3 = ref('')
const action = ref('')

// 结果相关
const showResult = ref(false)
const resultContent = ref('')
const analysisTime = ref(0)

// 计时器显示颜色类
const timerClass = computed(() => {
  if (timeLeft.value <= 60) return 'timer-display danger'
  if (timeLeft.value <= 120) return 'timer-display warning'
  return 'timer-display'
})

// 格式化时间显示
const timerDisplay = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

// 开始分析
const startAnalysis = () => {
  if (!contentInput.value.trim()) {
    alert('请先粘贴要分析的内容！')
    return
  }

  isAnalysisStarted.value = true
  startTimer()

  // 滚动到模板区域
  setTimeout(() => {
    document.getElementById('templateSection')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

// 启动计时器
const startTimer = () => {
  timeLeft.value = 300
  showStopBtn.value = true
  timerLabel.value = '分析进行中...'

  timerInterval.value = setInterval(() => {
    timeLeft.value--

    if (timeLeft.value <= 0) {
      stopTimer()
      alert('⏰ 5分钟到了！建议完成当前分析。')
    }
  }, 1000)
}

// 停止/暂停计时器
const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
  timerLabel.value = '计时已暂停'
}

// 恢复计时器
const resumeTimer = () => {
  if (!timerInterval.value) {
    startTimer()
  }
}

// 生成结果
const generateResult = () => {
  // 验证必填项
  if (!situation.value.trim() || !complication.value.trim() || !question.value.trim() || !answer.value.trim()) {
    alert('请完成SCQA四个部分的填写！')
    return
  }

  if (!insight1.value.trim() || !insight2.value.trim() || !insight3.value.trim()) {
    alert('请填写三个关键洞察！')
    return
  }

  if (!action.value.trim()) {
    alert('请填写一个即时行动！')
    return
  }

  // 计算用时
  analysisTime.value = 300 - timeLeft.value

  // 停止计时
  stopTimer()

  // 生成结果文本
  const today = new Date().toLocaleDateString('zh-CN')
  resultContent.value = `## MVA 分析结果 - ${today}

### 📋 SCQA 核心结构

**S - 背景情境**
${situation.value}

**C - 核心矛盾**
${complication.value}

**Q - 关键问题**
${question.value}

**A - 核心答案**
${answer.value}

### 💡 三个关键洞察

1. ${insight1.value}
2. ${insight2.value}
3. ${insight3.value}

### 🎯 即时行动

${action.value}

---
*分析用时：${formatTime(analysisTime.value)} | 生成工具：MVA 最小可行分析模板*`

  showResult.value = true

  // 滚动到结果区域
  setTimeout(() => {
    document.getElementById('resultSection')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}分${secs}秒`
}

// 复制结果
const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(resultContent.value)
    alert('✅ 结果已复制到剪贴板！')
  } catch (err) {
    alert('复制失败，请手动复制')
  }
}

// 复制示例
const copyExample = async () => {
  const exampleText = `原文标题："远程工作的5个常见陷阱"

S - 背景情境：
远程工作已成为主流，但很多团队效率反而下降了。

C - 核心矛盾：
虽然有灵活性，但沟通成本增加、边界模糊、孤独感上升。

Q - 关键问题：
如何避免远程工作中的常见陷阱，保持高效协作？

A - 核心答案：
建立明确规范（会议时间、响应时效）+ 主动过度沟通 + 保护深度工作时间。

💡 三个关键洞察：
1. 远程工作最大问题不是技术，而是缺乏"非正式沟通"
2. 异步协作需要更详细的文档和更明确的截止时间
3. 孤独感来自缺乏归属感，需要刻意营造团队仪式感

🎯 一个即时行动：
今天下午主动发起一次15分钟的"虚拟咖啡时间"，和团队成员随意聊聊，建立非正式连接。`

  try {
    await navigator.clipboard.writeText(exampleText)
    alert('✅ 示例已复制！')
  } catch (err) {
    alert('复制失败，请手动复制')
  }
}

// 重置分析
const resetAnalysis = () => {
  contentInput.value = ''
  situation.value = ''
  complication.value = ''
  question.value = ''
  answer.value = ''
  insight1.value = ''
  insight2.value = ''
  insight3.value = ''
  action.value = ''
  isAnalysisStarted.value = false
  showResult.value = false
  showStopBtn.value = false
  timeLeft.value = 300
  timerLabel.value = '准备好后点击开始'

  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="mva-template-view">
    <div class="container">
      <!-- 页面标题 -->
      <div class="header">
        <h1>⚡ MVA 最小可行分析</h1>
        <p class="subtitle">5分钟获取核心洞察 - 适合时间紧迫的场景</p>
      </div>

      <!-- Promise 区域 -->
      <div class="promise-box">
        <h2>5分钟内，你将得到：</h2>
        <div class="promise-items">
          <div class="promise-item">📋 SCQA 核心结构</div>
          <div class="promise-item">💡 3个关键洞察</div>
          <div class="promise-item">🎯 1个即时行动</div>
          <div class="promise-item">⏱️ 不超过5分钟</div>
        </div>
      </div>

      <!-- 输入和计时器 -->
      <div class="two-column">
        <!-- 左侧：内容输入 -->
        <div class="card">
          <h3>📝 第1步：粘贴内容</h3>
          <div class="input-area">
            <label for="contentInput">将要分析的文章/内容粘贴到这里：</label>
            <textarea
              id="contentInput"
              v-model="contentInput"
              placeholder="粘贴文章内容、URL或核心段落...

提示：
• 如果是长文章，粘贴核心段落即可
• 如果是URL，粘贴链接后添加简要说明
• MVA专注于快速理解，不需要完整内容"
            ></textarea>
          </div>
          <button class="btn" :disabled="isAnalysisStarted" @click="startAnalysis">
            {{ isAnalysisStarted ? '✅ 分析进行中...' : '🚀 开始5分钟分析' }}
          </button>
        </div>

        <!-- 右侧：计时器 -->
        <div class="card">
          <h3>⏱️ 第2步：计时提醒</h3>
          <div class="timer-container">
            <div :class="timerClass">{{ timerDisplay }}</div>
            <div class="timer-label">{{ timerLabel }}</div>
            <button
              v-if="showStopBtn"
              class="btn btn-secondary"
              @click="timerInterval ? stopTimer() : resumeTimer()"
            >
              {{ timerInterval ? '⏸️ 暂停计时' : '▶️ 继续计时' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 分析模板 -->
      <div v-if="isAnalysisStarted" id="templateSection" class="card template-section">
        <h3>📊 第3步：填写分析</h3>

        <div class="scqa-grid">
          <div class="scqa-item situation">
            <h4>S - 背景情境</h4>
            <textarea
              v-model="situation"
              class="scqa-input"
              placeholder="一句话说明：文章讨论什么背景/现状？"
            ></textarea>
          </div>
          <div class="scqa-item complication">
            <h4>C - 核心矛盾</h4>
            <textarea
              v-model="complication"
              class="scqa-input"
              placeholder="一句话说明：遇到什么问题/挑战？"
            ></textarea>
          </div>
          <div class="scqa-item question">
            <h4>Q - 关键问题</h4>
            <textarea
              v-model="question"
              class="scqa-input"
              placeholder="一句话说明：要解决什么问题？"
            ></textarea>
          </div>
          <div class="scqa-item answer">
            <h4>A - 核心答案</h4>
            <textarea
              v-model="answer"
              class="scqa-input"
              placeholder="一句话说明：给出什么解决方案？"
            ></textarea>
          </div>
        </div>

        <h4 class="section-subtitle">💡 三个关键洞察</h4>
        <ul class="insights-list">
          <li>
            <input
              v-model="insight1"
              type="text"
              placeholder="洞察1：最重要的发现是什么？"
              class="insight-input"
            />
          </li>
          <li>
            <input
              v-model="insight2"
              type="text"
              placeholder="洞察2：最有价值的观点是什么？"
              class="insight-input"
            />
          </li>
          <li>
            <input
              v-model="insight3"
              type="text"
              placeholder="洞察3：最实用的启发是什么？"
              class="insight-input"
            />
          </li>
        </ul>

        <div class="action-box">
          <h4>🎯 一个即时行动</h4>
          <textarea
            v-model="action"
            placeholder="基于这篇内容，我现在/今天/本周要做什么？要具体、可执行！"
            class="action-input"
          ></textarea>
        </div>

        <button class="btn" @click="generateResult">✅ 生成分析结果</button>
      </div>

      <!-- 结果展示 -->
      <div v-if="showResult" id="resultSection" class="card result-section">
        <h3>📋 MVA 分析结果</h3>
        <pre class="result-content">{{ resultContent }}</pre>
        <div class="result-actions">
          <button class="copy-btn" @click="copyResult">📋 复制结果</button>
          <button class="btn" @click="resetAnalysis">🔄 开始新的分析</button>
        </div>
      </div>

      <!-- 示例模板 -->
      <div class="example-section">
        <h3>📝 示例：如何使用MVA分析</h3>
        <div class="example-content">
          <strong>原文标题：</strong>"远程工作的5个常见陷阱"<br /><br />

          <strong>S - 背景情境：</strong><br />
          远程工作已成为主流，但很多团队效率反而下降了。<br /><br />

          <strong>C - 核心矛盾：</strong><br />
          虽然有灵活性，但沟通成本增加、边界模糊、孤独感上升。<br /><br />

          <strong>Q - 关键问题：</strong><br />
          如何避免远程工作中的常见陷阱，保持高效协作？<br /><br />

          <strong>A - 核心答案：</strong><br />
          建立明确规范（会议时间、响应时效）+ 主动过度沟通 + 保护深度工作时间。<br /><br />

          <strong>💡 三个关键洞察：</strong><br />
          1. 远程工作最大问题不是技术，而是缺乏"非正式沟通"<br />
          2. 异步协作需要更详细的文档和更明确的截止时间<br />
          3. 孤独感来自缺乏归属感，需要刻意营造团队仪式感<br /><br />

          <strong>🎯 一个即时行动：</strong><br />
          今天下午主动发起一次15分钟的"虚拟咖啡时间"，和团队成员随意聊聊，建立非正式连接。
        </div>
        <button class="copy-btn" @click="copyExample">📋 复制示例</button>
      </div>

      <!-- 方法论说明 -->
      <div class="methodology-note">
        <h4>💡 MVA方法论说明</h4>
        <p>
          <strong>什么是MVA（Minimum Viable Analysis）？</strong><br />
          MVA是最小可行分析，专为时间紧迫场景设计。只提取最核心的结构（SCQA）和最关键的洞察，帮助你在5分钟内快速理解内容精髓。
        </p>
        <br />
        <p>
          <strong>何时使用MVA？</strong><br />
          • 快速浏览行业资讯时<br />
          • 会议前快速预习材料<br />
          • 评估文章是否值得深读<br />
          • 时间紧迫但需要基本理解
        </p>
        <br />
        <p>
          <strong>MVA的局限性：</strong><br />
          MVA只适合获取核心要点，不适合：需要批判性思维的场景、需要深度理解的专业文献、需要应用到实际工作的复杂方法论。这些场景请使用Level
          2（30分钟）或Level 3（60分钟）完整分析。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mva-template-view {
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
  background: linear-gradient(135deg, #34c759, #30b0c7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
}

/* Promise 区域 */
.promise-box {
  background: linear-gradient(135deg, #34c759, #30b0c7);
  color: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.promise-box h2 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
}

.promise-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.promise-item {
  background: rgba(255, 255, 255, 0.2);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

/* 两列布局 */
.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-md);
  margin-bottom: var(--spacing-md);
}

@media (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}

/* 卡片 */
.card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.card h3 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

/* 输入区域 */
.input-area {
  margin-bottom: var(--spacing-md);
}

.input-area label {
  display: block;
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.input-area textarea {
  width: 100%;
  min-height: 200px;
  padding: var(--spacing-sm);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: var(--font-size-sm);
  resize: vertical;
  transition: all var(--transition-base);
}

.input-area textarea:focus {
  outline: none;
  border-color: var(--primary-green);
  box-shadow: 0 0 0 4px rgba(52, 199, 89, 0.1);
}

/* 计时器 */
.timer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
}

.timer-display {
  font-size: 72px;
  font-weight: var(--font-weight-bold);
  color: var(--primary-green);
  margin-bottom: var(--spacing-sm);
  font-variant-numeric: tabular-nums;
}

.timer-display.warning {
  color: var(--primary-orange);
}

.timer-display.danger {
  color: var(--primary-red);
}

.timer-label {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

/* 按钮 */
.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--primary-green);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  width: 100%;
}

.btn:hover {
  background: #2fb350;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn:disabled {
  background: var(--border-light);
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: var(--primary-blue);
}

.btn-secondary:hover {
  background: #0077ed;
}

/* 模板区域 */
.template-section {
  margin-bottom: var(--spacing-xl);
}

.scqa-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

@media (max-width: 768px) {
  .scqa-grid {
    grid-template-columns: 1fr;
  }
}

.scqa-item {
  background: var(--background);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border-left: 4px solid;
}

.scqa-item.situation {
  border-left-color: #0071e3;
}
.scqa-item.complication {
  border-left-color: #ff9500;
}
.scqa-item.question {
  border-left-color: #af52de;
}
.scqa-item.answer {
  border-left-color: #34c759;
}

.scqa-item h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xs);
  color: var(--text-secondary);
}

.scqa-input {
  width: 100%;
  min-height: 80px;
  padding: var(--spacing-xs);
  border: none;
  background: transparent;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  line-height: 1.6;
  resize: vertical;
}

.scqa-input:focus {
  outline: none;
}

.section-subtitle {
  margin: var(--spacing-md) 0 var(--spacing-sm) 0;
  font-size: var(--font-size-lg);
}

.insights-list {
  list-style: none;
  margin-bottom: var(--spacing-md);
}

.insights-list li {
  background: var(--background);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-sm);
  border-left: 4px solid var(--primary-green);
}

.insight-input {
  border: none;
  background: transparent;
  width: 100%;
  font-size: var(--font-size-sm);
  padding: 0;
}

.insight-input:focus {
  outline: none;
}

.action-box {
  background: linear-gradient(135deg, #ff9500, #ff6b00);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.action-box h4 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.action-input {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 100%;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
}

.action-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.3);
}

.action-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

/* 结果区域 */
.result-section {
  margin-bottom: var(--spacing-xl);
}

.result-content {
  background: var(--background);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  line-height: 1.8;
  white-space: pre-wrap;
  font-family: inherit;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
}

.result-actions {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
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

/* 示例区域 */
.example-section {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  box-shadow: var(--shadow-sm);
}

.example-section h3 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.example-content {
  background: var(--background);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  line-height: 1.8;
  color: var(--text-secondary);
  border-left: 4px solid var(--primary-blue);
  margin-bottom: var(--spacing-sm);
}

/* 方法论说明 */
.methodology-note {
  background: #fff4e6;
  border-left: 4px solid var(--primary-orange);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

.methodology-note h4 {
  color: var(--primary-orange);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-base);
}

.methodology-note p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header h1 {
    font-size: var(--font-size-3xl);
  }

  .timer-display {
    font-size: 56px;
  }

  .promise-items {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
