<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 按钮变体：primary, secondary, success, warning, danger
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost'].includes(value)
  },
  // 按钮大小：sm, md, lg
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否加载中
  loading: {
    type: Boolean,
    default: false
  },
  // 是否块级按钮（宽度100%）
  block: {
    type: Boolean,
    default: false
  },
  // 路由链接
  to: {
    type: [String, Object],
    default: null
  },
  // 外部链接
  href: {
    type: String,
    default: null
  },
  // 按钮类型
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  }
})

const emit = defineEmits(['click'])

// 按钮组件类型
const buttonComponent = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

// 链接属性
const linkProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return { type: props.type }
})

// 按钮类名
const buttonClasses = computed(() => [
  'app-btn',
  `app-btn--${props.variant}`,
  `app-btn--${props.size}`,
  {
    'app-btn--block': props.block,
    'app-btn--loading': props.loading,
    'app-btn--disabled': props.disabled
  }
])

// 点击处理
const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <component
    :is="buttonComponent"
    v-bind="linkProps"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- 加载图标 -->
    <span v-if="loading" class="app-btn__loader">
      <span class="loading-spinner"></span>
    </span>

    <!-- 按钮内容 -->
    <span class="app-btn__content" :class="{ 'app-btn__content--hidden': loading }">
      <slot></slot>
    </span>
  </component>
</template>

<style scoped>
/* 基础按钮样式 */
.app-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast) var(--ease-out);
  outline: none;
  user-select: none;
}

.app-btn:focus-visible {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}

/* 按钮变体 */
.app-btn--primary {
  background: var(--primary-blue);
  color: white;
}

.app-btn--primary:hover:not(:disabled) {
  background: #0077ed;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.app-btn--secondary {
  background: var(--background);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}

.app-btn--secondary:hover:not(:disabled) {
  background: var(--surface);
  border-color: var(--text-secondary);
}

.app-btn--success {
  background: var(--primary-green);
  color: white;
}

.app-btn--success:hover:not(:disabled) {
  background: #30b350;
  transform: translateY(-1px);
}

.app-btn--warning {
  background: var(--primary-orange);
  color: white;
}

.app-btn--warning:hover:not(:disabled) {
  background: #ff8c00;
  transform: translateY(-1px);
}

.app-btn--danger {
  background: var(--primary-red);
  color: white;
}

.app-btn--danger:hover:not(:disabled) {
  background: #ff2d20;
  transform: translateY(-1px);
}

.app-btn--ghost {
  background: transparent;
  color: var(--primary-blue);
  border: 1px solid var(--primary-blue);
}

.app-btn--ghost:hover:not(:disabled) {
  background: rgba(0, 113, 227, 0.1);
}

/* 按钮大小 */
.app-btn--sm {
  padding: 8px 16px;
  font-size: var(--font-size-sm);
}

.app-btn--md {
  padding: 12px 24px;
  font-size: var(--font-size-base);
}

.app-btn--lg {
  padding: 16px 32px;
  font-size: var(--font-size-lg);
}

/* 块级按钮 */
.app-btn--block {
  width: 100%;
}

/* 禁用状态 */
.app-btn:disabled,
.app-btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.app-btn:disabled:hover,
.app-btn--disabled:hover {
  transform: none;
  box-shadow: none;
}

/* 加载状态 */
.app-btn--loading {
  cursor: wait;
}

.app-btn__loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.app-btn__content--hidden {
  visibility: hidden;
}

/* 加载动画 */
.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 按钮在暗色背景上的样式 */
.app-btn--secondary.on-dark {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
}

.app-btn--secondary.on-dark:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}
</style>
