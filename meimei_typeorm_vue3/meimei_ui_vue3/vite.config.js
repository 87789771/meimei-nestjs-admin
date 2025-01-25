import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import setupExtend from 'unplugin-vue-setup-extend-plus/vite'
import compression from 'vite-plugin-compression'
// import VueDevTools from 'vite-plugin-vue-devtools'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nodeResolve } from '@rollup/plugin-node-resolve'
// import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const isBuild = command.includes('build')
  const isProduction = mode === 'production'
  const { VITE_APP_ENV, VITE_BUILD_COMPRESS } = env

  const plugins = [
    nodePolyfills(),
    // VueDevTools(),
    vue(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'vue-router', 'pinia'],
      defaultExportByFilename: false,
      dirs: [],
      dts: './src/auto-imports.d.ts',
      // vueTemplate: false,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
    setupExtend({}),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/components/SvgIcon/svg')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: command === 'build',
      // customDomId: '__svg__icons__dom__',
    }),
  ]
  if (isBuild && VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(',')
    if (compressList.includes('gzip')) {
      plugins.push(
        compression({
          ext: '.gz',
          deleteOriginFile: false,
        }),
      )
    }
    if (compressList.includes('brotli')) {
      plugins.push(
        compression({
          ext: '.br',
          algorithm: 'brotliCompress',
          deleteOriginFile: false,
        }),
      )
    }
  }
  /** @type {import('vite').UserConfig} */
  const config = {
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 5000, // 单位是 kB
      sourcemap: !isProduction,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'EVAL' && warning.id.includes('bip39-libs.js')) {
            return
          }
          warn(warning)
        },
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020',
        define: {
          global: 'globalThis',
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
        ],
      },
    },
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    plugins,
    // plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        // '~': path.resolve(__dirname, './'),
        '~': fileURLToPath(new URL('./', import.meta.url)),
        // 设置别名
        // '@': path.resolve(__dirname, './src')
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        process: 'process/browser',
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        util: 'rollup-plugin-node-polyfills/polyfills/util',
        sys: 'util',
        events: 'rollup-plugin-node-polyfills/polyfills/events',
        path: 'rollup-plugin-node-polyfills/polyfills/path',
        querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
        url: 'rollup-plugin-node-polyfills/polyfills/url',
        http: 'rollup-plugin-node-polyfills/polyfills/http',
        https: 'rollup-plugin-node-polyfills/polyfills/http',
        os: 'rollup-plugin-node-polyfills/polyfills/os',
        assert: 'rollup-plugin-node-polyfills/polyfills/assert',
        constants: 'rollup-plugin-node-polyfills/polyfills/constants',
        _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
        _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
        _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
        _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
        _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
        timers: 'rollup-plugin-node-polyfills/polyfills/timers',
        console: 'rollup-plugin-node-polyfills/polyfills/console',
        vm: 'rollup-plugin-node-polyfills/polyfills/vm',
        tty: 'rollup-plugin-node-polyfills/polyfills/tty',
        domain: 'rollup-plugin-node-polyfills/polyfills/domain',
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    // vite 相关配置
    server: {
      port: 80,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: 'http://localhost:3000/api',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ''),
        },
      },
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or 'modern'
          // But if you want to just silence deprecation warnings, use silenceDeprecations option:
          // silenceDeprecations: ['legacy-js-api'],
        },
      },
      // postcss: {
      //   plugins: [
      //     {
      //       postcssPlugin: 'internal:charset-removal',
      //       AtRule: {
      //         charset: (atRule) => {
      //           if (atRule.name === 'charset') {
      //             atRule.remove()
      //           }
      //         },
      //       },
      //     },
      //   ],
      // },
    },
  }

  if (isProduction) {
    config.esbuild = {
      drop: ['console', 'debugger'],
    }
  }

  return config
})
