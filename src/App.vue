<script setup>
import AppNavigation from '@/components/common/AppNavigation.vue'
</script>

<template>
  <div id="app">
    <!-- 导航栏 - 固定在顶部 -->
    <AppNavigation />

    <!-- 路由视图 - 显示当前路由对应的组件 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* 全局样式已在 main.js 中导入 */

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  /* 为固定导航栏预留空间（导航栏高度约80px） */
  padding-top: 80px;
}

/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-base) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
