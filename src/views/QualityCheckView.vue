<script setup>
import QualityChecklist from '../components/quality/QualityChecklist.vue'
</script>

<template>
  <div class="quality-check-view">
    <div class="container">
      <div class="page-header">
        <h1>✅ 质量自检清单</h1>
        <p class="subtitle">14项专业检查，确保你的分析达到专业水准</p>
      </div>

      <!-- 质量检查清单组件 -->
      <QualityChecklist />
    </div>
  </div>
</template>

<style scoped>
.quality-check-view {
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
