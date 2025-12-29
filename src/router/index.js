import { createRouter, createWebHistory } from 'vue-router'

/**
 * 路由配置
 *
 * 使用懒加载优化性能 - 每个路由组件只在需要时才加载
 * 这可以显著减少初始加载时间
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: '深度阅读分析系统',
        description: '多层级深度阅读分析工具集'
      }
    },
    {
      path: '/quick-start',
      name: 'quick-start',
      component: () => import('@/views/QuickStartView.vue'),
      meta: {
        title: '快速上手指南',
        description: '3步快速开始深度阅读分析'
      }
    },
    {
      path: '/diagnosis',
      name: 'diagnosis',
      component: () => import('@/views/DiagnosisView.vue'),
      meta: {
        title: '智能诊断工具',
        description: '根据你的需求智能推荐最佳分析方案'
      }
    },
    {
      path: '/mva-template',
      name: 'mva-template',
      component: () => import('@/views/MVATemplateView.vue'),
      meta: {
        title: 'MVA快速分析模板',
        description: '5分钟完成核心问题分析'
      }
    },
    {
      path: '/framework',
      name: 'framework',
      component: () => import('@/views/FrameworkView.vue'),
      meta: {
        title: '思维框架选择器',
        description: '选择合适的思维框架组合'
      }
    },
    {
      path: '/case-library',
      name: 'case-library',
      component: () => import('@/views/CaseLibraryView.vue'),
      meta: {
        title: '真实案例库',
        description: '12个真实场景的深度分析案例'
      }
    },
    {
      path: '/quality-check',
      name: 'quality-check',
      component: () => import('@/views/QualityCheckView.vue'),
      meta: {
        title: '质量自检清单',
        description: '15项专业检查确保分析质量'
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('@/views/FeedbackView.vue'),
      meta: {
        title: '反馈系统',
        description: '分享你的使用体验和建议'
      }
    },
    {
      // 404 页面
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ],
  // 滚动行为：导航到新路由时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局前置守卫：更新页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Deep Reading Analyst`
  }
  next()
})

export default router
