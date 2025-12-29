import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 导入设计系统
import '@/assets/styles/design-tokens.css'
import '@/assets/styles/reset.css'
import '@/assets/styles/animations.css'

const app = createApp(App)

// 安装插件
app.use(createPinia())
app.use(router)

// 挂载应用
app.mount('#app')
