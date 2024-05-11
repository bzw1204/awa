import type { RouteComponent, RouteMeta, RouteRecordRaw } from 'vue-router'
import { convertToTree } from '@views/utils'

export default function () {
  // 导入所有路由页面
  const componentsDefault = import.meta.glob<Record<string, any>>('../views/**/index.vue', { eager: true, import: 'default' })
  const componentModules = import.meta.glob<Promise<RouteComponent>>('../views/**/index.vue')

  // 导入所有路由Meta配置
  const modules = import.meta.glob<RouteMeta>('../views/**/meta.ts', { eager: true, import: 'default' })
  const routes: RouteRecordRaw[] = Object.entries(modules).map(([key, value]) => {
    const path = key.match(/\/views(.*?)\/meta\.ts/)![1] || '/'
    const componentKey = key.replace(/meta.ts/, 'index.vue')
    const namePattern = key.match(/\/views\/(.*?)\/meta\.ts/)
    const name = namePattern && namePattern![1].replace(/\//g, '-') || 'Index'
    const componentMap: Record<string, RouteComponent> = {
      route: componentModules[componentKey],
      iframe: () => import('@views/views/iframe/index.vue')
    }
    return {
      path,
      name: componentsDefault[componentKey] && componentsDefault[componentKey].name || name,
      meta: value,
      component: componentMap[value.routeType || 'route']
    }
  })
  return convertToTree(routes)
}
