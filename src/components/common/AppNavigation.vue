<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)

// 导航链接配置
const navLinks = [
  { name: 'quick-start', label: '快速上手' },
  { name: 'diagnosis', label: '智能诊断' },
  { name: 'mva-template', label: 'MVA模板' },
  { name: 'framework', label: '框架选择' },
  { name: 'case-library', label: '案例库' },
  { name: 'quality-check', label: '质量检查' },
  { name: 'feedback', label: '反馈' }
]

// 判断链接是否激活
const isActive = computed(() => (linkName) => {
  return route.name === linkName
})

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单（点击链接后）
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav class="top-nav">
    <div class="nav-container">
      <!-- Logo / Brand -->
      <router-link to="/" class="nav-logo" @click="closeMobileMenu">
        🧠 Deep Reading Analyst
      </router-link>

      <!-- 移动端菜单按钮 -->
      <button
        class="mobile-menu-btn"
        :class="{ active: isMobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="切换菜单"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- 导航菜单 -->
      <div class="nav-menu" :class="{ open: isMobileMenuOpen }">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="{ name: link.name }"
          class="nav-link"
          :class="{ active: isActive(link.name) }"
          @click="closeMobileMenu"
        >
          {{ link.label }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(102, 126, 234, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: var(--z-navigation);
  box-shadow: var(--shadow-sm);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

/* Logo */
.nav-logo {
  font-size: 18px;
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  color: white;
  transition: opacity var(--transition-fast) var(--ease-out);
}

.nav-logo:hover {
  opacity: 0.9;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: white;
  transition: all var(--transition-base) var(--ease-out);
  border-radius: 2px;
}

.mobile-menu-btn.active .hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.mobile-menu-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active .hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast) var(--ease-out);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

/* 激活状态 */
.nav-link.active {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  font-weight: var(--font-weight-semibold);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: white;
  border-radius: var(--radius-full);
}

/* 响应式设计 - 移动端 */
@media (max-width: 900px) {
  .mobile-menu-btn {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: rgba(102, 126, 234, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-direction: column;
    gap: 0;
    padding: var(--spacing-md) 0;
    box-shadow: var(--shadow-md);

    /* 默认隐藏 */
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: all var(--transition-base) var(--ease-out);
  }

  .nav-menu.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-link {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: 0;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .nav-link.active::after {
    display: none;
  }

  .nav-link.active {
    background: rgba(255, 255, 255, 0.25);
    border-left: 4px solid white;
  }
}

/* 平板端优化 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 var(--spacing-sm);
  }

  .nav-logo {
    font-size: 16px;
  }
}
</style>
