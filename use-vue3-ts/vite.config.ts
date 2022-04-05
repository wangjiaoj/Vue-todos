import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import  styleImport, { VantResolve } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves:[
        VantResolve(),
      ]
    }),
  ],
  resolve:{
    alias:{
      '@':resolve('src'),
      '~@':resolve('src')
    },
    extensions:['.vue','.js','.ts']
  }
})
