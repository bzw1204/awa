declare module 'store-types' {
  import type { GlobalTheme } from 'naive-ui'
  import type { MenuProps } from 'vue-router'

  interface ISettings {
    name: string
    showBreadcrumb: boolean
    showTabs: boolean
    menuWidth: number
    theme: 'light' | 'dark'
    globalTheme: GlobalTheme | null
    isLogin: boolean
    menus: MenuProps[]
  }
  interface IAuth {
    token: string
    permissions: string[]
    useInfo?: Record<string, any>
  }
}
