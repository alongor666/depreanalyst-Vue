<script setup>
// 反馈系统页面
// TODO: 将从 Feedback-System.html 迁移反馈表单和LocalStorage
</script>

<template>
  <div class="feedback-view">
    <div class="container">
      <div class="page-header">
        <h1>💬 反馈系统</h1>
        <p class="subtitle">分享你的使用体验，帮助我们改进工具</p>
      </div>

      <div class="placeholder">
        <p>此页面正在开发中...</p>
        <p>将从 Feedback-System.html 迁移多标签反馈表单和加密存储</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-view {
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
