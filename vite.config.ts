import { defineConfig } from 'vite'
import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import UniMeta from './build/vite-plugin-uni-meta'
import UniProvider from './build/vite-plugin-uni-provider'
import Espower from './build/vite-plugin-espower'
import Define from './build/vite-plugin-define'
import { visualizer } from 'rollup-plugin-visualizer'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AwaitOnlaunch from './build/vite-uni-await-onlaunch'
import ImportsConfig from './build/imports.config'
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@root': path.resolve(__dirname),
      lodash: 'lodash-es',
    },
  },
  server: {
    watch: { ignored: ['**/dist/**'] },
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://one.vipcard.shop/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), // 不可以省略rewrite
      },
    },
  },
  plugins: [
    Inspect(), //vite分析工具
    UniMeta(), //自动生成页面meta信息和路由并注册pages.json
    UniProvider(), //自动注册页面全局组件
    Unocss(),
    ViteRestart({ restart: ['src/app.config.ts'] }),
    AutoImport(ImportsConfig),
    isTest() || uni({ vueOptions: { reactivityTransform: true } }),
    isTest() && Espower(),
    Define(), //添加一些全局变量
    visualizer(), //可视化依赖关系
    VueSetupExtend(), // setup 组件名称注入
    AwaitOnlaunch({
      fn: () => app.User.checkLogin(),
    }),
    MiniProgramTailwind(),
  ],
  esbuild: { keepNames: true },
  optimizeDeps: { exclude: ['lodash-es'] },
})

function isTest() {
  return process.env.NODE_ENV === 'test'
}
