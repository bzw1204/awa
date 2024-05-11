import { darkTheme } from 'naive-ui'
import type { ISettings } from 'store-types'

export default defineStore('settings', {
  state: (): ISettings => ({
    name: 'NaiveUI Admin',
    menuWidth: 220,
    theme: 'light',
    globalTheme: null,
    isLogin: false,
    menus: [],
    showBreadcrumb: true,
    showTabs: false
  }),
  persist: true,
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.globalTheme = { light: null, dark: darkTheme }[this.theme]
    }
  }
})
