import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // GitHub Pages 部署基础路径
  base: process.env.NODE_ENV === 'production' ? '/depreanalyst-Vue/' : '/',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    // 块大小警告阈值
    chunkSizeWarningLimit: 500,

    // CSS代码分割
    cssCodeSplit: true,

    // 资源内联阈值(小于4KB内联为base64)
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        // 手动代码分割
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-crypto': ['crypto-js', 'dompurify']
        },

        // 静态资源分类输出
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1)
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images'
          } else if (/woff|woff2|ttf/i.test(extType)) {
            extType = 'fonts'
          }
          return `assets/${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },

    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 生产环境移除console
        drop_debugger: true
      }
    }
  },

  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    cors: true
  }
})
