<script setup>
import DecisionTree from '../components/diagnosis/DecisionTree.vue'
</script>

<template>
  <div class="diagnosis-view">
    <div class="container">
      <div class="page-header">
        <h1>🎯 智能诊断工具</h1>
        <p class="subtitle">3个问题快速诊断，AI推荐最适合你的思维框架组合</p>
      </div>

      <!-- 决策树组件 -->
      <DecisionTree />
    </div>
  </div>
</template>

<style scoped>
.diagnosis-view {
  padding: var(--spacing-2xl) var(--spacing-md);
  min-height: calc(100vh - 80px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.page-header h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-sm);
}

.subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

.placeholder {
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.placeholder p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}
</style>
