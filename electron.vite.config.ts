import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { XNaiveUIResolver } from '@skit/x.naive-ui/unplugin'
import MetaLayouts from 'vite-plugin-vue-meta-layouts'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@views': resolve('src/renderer/src'),
        '@root': resolve('')
      }
    },
    plugins: [
      vue(),
      UnoCSS(),
      MetaLayouts({
        defaultLayout: 'MainLayout'
      }),
      Icons({
        autoInstall: true,
        customCollections: {
          custom: FileSystemIconLoader('src/renderer/src/assets/icons')
        }
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
          }
        ],
        dirs: ['src/store'],
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/types/auto-imports.d.ts',
        eslintrc: {
          enabled: false,
          filepath: 'eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Components({
        extensions: ['vue', 'md'],
        dts: 'src/types/components.d.ts',
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          NaiveUiResolver(),
          XNaiveUIResolver(),
          IconsResolver({ prefix: false, customCollections: ['custom'] })
        ]
      })
    ]
  }
})
