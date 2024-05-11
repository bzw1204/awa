import type { App, Plugin } from 'vue'
import resize from './resize'

export default {
  install(app: App) {
    app.directive('resize', resize)
  }
} as Plugin
