import { RouteListener, generatorMenu } from '@views/utils/route'
import { useLocalStorage } from '@vueuse/core'
import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import dynamicRoute from './dynamic-route'
import staticRoute from './static-route'

const dynamicRoutes = dynamicRoute()
// 生成菜单并存储
export const menus = generatorMenu(dynamicRoutes, '*')
useLocalStorage('menus', menus)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...setupLayouts(dynamicRoutes),
    ...staticRoute
  ]
})

router.beforeEach((to, _from, next) => {
  window.$loadingBar!.start()
  next()
  RouteListener.emit(to)
})

router.afterEach(() => window.$loadingBar?.finish())
export default router
