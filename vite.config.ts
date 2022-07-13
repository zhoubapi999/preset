import { defineConfig } from 'vite'
import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
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
    Unocss(),
    AutoImport(ImportsConfig),
    isTest() || uni({ vueOptions: { reactivityTransform: true } }),
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
