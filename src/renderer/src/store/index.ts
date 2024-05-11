import { createPinia } from 'pinia'
import useSettingStore from './modules/settings'
import useAuthStore from './modules/auth'

export { useSettingStore, useAuthStore }

const pinia = createPinia()

export default pinia
