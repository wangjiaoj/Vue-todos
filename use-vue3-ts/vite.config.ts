import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import  styleImport, { VantResolve } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  //定义全局变量
   define: {
    'process.env': {
      NODE_ENV : 'development',
      BASE_API:'/',
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        //支持变量和函数
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    styleImport({
      resolves:[
        VantResolve(),
      ]
    }),
       AutoImport({
      // targets to transform
      include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/, // .md
      ],

      // global imports to register
      imports: [
          // presets
          'vue',
          'vue-router',
          // custom
          // {
          //     '@vueuse/core': [
          //         // named imports
          //         'useMouse', // import { useMouse } from '@vueuse/core',
          //         // alias
          //         ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          //     ],
          //     'axios': [
          //         // default imports
          //         ['default', 'axios'], // import { default as axios } from 'axios',
          //     ],
          //     '[package-name]': [
          //         '[import-names]',
          //         // alias
          //         ['[from]', '[alias]'],
          //     ],
          // },
      ],

      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },

      // custom resolvers
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [
          /* ... */
      ],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: './auto-imports.d.ts',
    }),
  ],
  resolve:{
    alias:{
      '@':resolve('src'),
      '~@':resolve('src')
    },
    extensions:['.vue','.js','.ts']
  },
  server: {
    port:9098,
    proxy: {
        '/xx-web': {
            target: 'https://xx/',
            changeOrigin: true,
        },
    }
  }
})
