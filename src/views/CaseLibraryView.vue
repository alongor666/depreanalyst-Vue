<script setup>
import CaseLibrary from '../components/case/CaseLibrary.vue'
</script>

<template>
  <div class="case-library-view">
    <div class="container">
      <div class="page-header">
        <h1>📚 真实案例库</h1>
        <p class="subtitle">12个真实场景的深度分析案例，从MVA到高级框架</p>
      </div>

      <!-- 案例库组件 -->
      <CaseLibrary />
    </div>
  </div>
</template>

<style scoped>
.case-library-view {
  padding: var(--spacing-2xl) var(--spacing-md);
  min-height: calc(100vh - 80px);
}

.container {
  max-width: 1400px;
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
