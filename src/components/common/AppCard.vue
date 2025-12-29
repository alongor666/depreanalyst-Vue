<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 卡片图标（emoji或图标类名）
  icon: {
    type: String,
    default: ''
  },
  // 卡片标题
  title: {
    type: String,
    required: true
  },
  // 卡片描述
  description: {
    type: String,
    default: ''
  },
  // 徽章列表 [{ text: '新功能', type: 'new' }]
  badges: {
    type: Array,
    default: () => []
  },
  // 路由链接（如果提供，卡片会变成可点击的链接）
  to: {
    type: [String, Object],
    default: null
  },
  // 外部链接
  href: {
    type: String,
    default: null
  },
  // 卡片变体类型：tool, case, framework
  variant: {
    type: String,
    default: 'tool',
    validator: (value) => ['tool', 'case', 'framework', 'default'].includes(value)
  },
  // 是否可点击（hover效果）
  clickable: {
    type: Boolean,
    default: true
  }
})

// 判断是否应该渲染为链接
const isLink = computed(() => props.to || props.href)

// 卡片组件类型
const cardComponent = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'div'
})

// 链接属性
const linkProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return {}
})

// 卡片类名
const cardClasses = computed(() => [
  'app-card',
  `app-card--${props.variant}`,
  {
    'app-card--clickable': props.clickable,
    'app-card--link': isLink.value
  }
])
</script>

<template>
  <component :is="cardComponent" v-bind="linkProps" :class="cardClasses">
    <!-- 图标 -->
    <div v-if="icon || $slots.icon" class="app-card__icon">
      <slot name="icon">
        {{ icon }}
      </slot>
    </div>

    <!-- 标题 -->
    <div class="app-card__title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <!-- 描述 -->
    <div v-if="description || $slots.description" class="app-card__desc">
      <slot name="description">
        {{ description }}
      </slot>
    </div>

    <!-- 元数据/徽章 -->
    <div v-if="badges.length > 0 || $slots.meta" class="app-card__meta">
      <slot name="meta">
        <span
          v-for="(badge, index) in badges"
          :key="index"
          class="badge"
          :class="`badge--${badge.type || 'default'}`"
        >
          {{ badge.text }}
        </span>
      </slot>
    </div>

    <!-- 自定义内容插槽 -->
    <slot></slot>
  </component>
</template>

<style scoped>
/* 基础卡片样式 */
.app-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base) var(--ease-out);
  text-decoration: none;
  color: inherit;
  display: block;
}

/* 可点击卡片的悬停效果 */
.app-card--clickable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.app-card--link {
  cursor: pointer;
}

/* 图标 */
.app-card__icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
  line-height: 1;
}

/* 标题 */
.app-card__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: var(--line-height-tight);
}

/* 描述 */
.app-card__desc {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  line-height: var(--line-height-normal);
  margin-bottom: var(--spacing-md);
}

/* 元数据区域 */
.app-card__meta {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  margin-top: auto;
}

/* 徽章样式 */
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background: var(--border-light);
  color: var(--text-secondary);
}

.badge--new {
  background: rgba(52, 199, 89, 0.1);
  color: var(--primary-green);
}

.badge--time {
  background: rgba(0, 113, 227, 0.1);
  color: var(--primary-blue);
}

.badge--level {
  background: rgba(175, 82, 222, 0.1);
  color: var(--primary-purple);
}

.badge--warning {
  background: rgba(255, 149, 0, 0.1);
  color: var(--primary-orange);
}

.badge--error {
  background: rgba(255, 59, 48, 0.1);
  color: var(--primary-red);
}

/* 卡片变体 */
.app-card--case {
  border-left: 4px solid var(--primary-blue);
}

.app-card--framework {
  border-top: 3px solid var(--primary-purple);
}

.app-card--tool {
  /* 默认样式，无额外装饰 */
}

/* 响应式调整 */
@media (max-width: 768px) {
  .app-card {
    padding: var(--spacing-md);
  }

  .app-card__icon {
    font-size: 40px;
  }

  .app-card__title {
    font-size: var(--font-size-lg);
  }

  .app-card__desc {
    font-size: var(--font-size-sm);
  }
}
</style>
