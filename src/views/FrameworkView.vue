<script setup>
import FrameworkSelector from '../components/framework/FrameworkSelector.vue'
</script>

<template>
  <div class="framework-view">
    <div class="container">
      <div class="page-header">
        <h1>🧩 思维框架选择器</h1>
        <p class="subtitle">浏览10+思维框架，选择最适合的组合</p>
      </div>

      <!-- 框架选择器组件 -->
      <FrameworkSelector />
    </div>
  </div>
</template>

<style scoped>
.framework-view {
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
