const path = require('path')
const pxtorem = require('postcss-pxtorem')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin')
const AutoImport = require('unplugin-auto-import/webpack')
const resolve = (file) => path.resolve(__dirname, file)
const isDevelopment = process.env.NODE_ENV === 'development'
const https = false // 是否启用安全协议
const secure = false // https环境，证书无效时使用false
    // 导入速度分析插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// 导入体积分析插件
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// 实例化插件
// console.log('isDevelopment', isDevelopment)
const smp = new SpeedMeasurePlugin();
module.exports = {
    outputDir: 'build',
    publicPath: isDevelopment ? '/' : './',
    chainWebpack: (config) => {
        config.resolve.alias
            // key,value自行定义，比如.set('@assets', resolve('src/assets'))
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))


        config.module.rules.delete('svg')

        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .use('url-loader')
            .loader('url-loader')
            .tap((options) =>
                Object.assign(options, {
                    limit: 10240,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                })
            )

        config.module
            .rule('vue')
            .use('vue-loader')
            .tap((options) => {
                options.transformToRequire = {
                    video: ['src', 'poster'],
                    source: 'src',
                    img: 'src',
                    image: 'xlink:href',
                }
            })
            //保留debugger
        config.optimization.minimizer('terser').tap((args) => {
            // 注释console.*
            args[0].terserOptions.compress.drop_console = false
                // remove debugger
            args[0].terserOptions.compress.drop_debugger = false
                // 移除 console.log
                // args[0].terserOptions.compress.pure_funcs = ['console.log']
                // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
                // args[0].terserOptions.output = {
                //     comments: false
                // };
            return args
        })
    },
    configureWebpack: smp.wrap({
        devtool: isDevelopment ? 'source-map' : 'none',
        // watchOptions: {
        //   aggregateTimeout: 500,
        //   poll: 20000,
        //   ignored: '/node_modules/',
        // },
        performance: {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js')
            },
        },
        externals: isDevelopment ? {} : {},
        plugins: [
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
            })
        ].concat(isDevelopment ? [] : [
            AutoImport({
                resolvers: []
            }),
            // 增加配置选项注入摘取的包的路径, 配合copyWebpackPlugin摘取文件操作使用
            new htmlWebpackPlugin({
                title: 'use-vue3-ts',
                template: './public/index.html',
                // url: '/', //需要这里传参BASE_URL
                inject: true,
                templateParameters: {
                    BASE_URL: `./`
                },
                //  injectScripts: `<script src="./static/js/vue.min.js"></script> `,
            }),
            new vConsolePlugin({
                enable: !!process.env.VUE_APP_VCONSOLE,
            }),
            // 实例化体积分析插件
            // new BundleAnalyzerPlugin()
        ]),
    }),
    productionSourceMap: !!process.env.VUE_APP_SOURCE_MAP,
    devServer: {
        host: '0.0.0.0',
        https,
        port: '9098', //代理端口
        open: false, //项目启动时是否自动打开浏览器，false为不打开，true表示打开
        proxy: {
            '/xx-web': {
                target: 'https://xx.com/',
                changeOrigin: true,
                secure,
            },
        },
    },
    // transpileDependencies: ['vant'],
}
