import type { LinkProps, MenuProps, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import type { Emitter, EventType, Handler } from 'mitt'
import mitt from 'mitt'

export function convertToTree(data: RouteRecordRaw[]) {
  const map: { [key: string]: RouteRecordRaw } = data.reduce((acc: { [key: string]: RouteRecordRaw }, item) => {
    const key: string = item.path
    acc[key] = item
    return acc
  }, {})
  return data.reduce((result: RouteRecordRaw[], item) => {
    const match = item.path.match(/(.+)\/[^\\/]+$/)
    if (match) {
      const parentPath = match[1]
      const parent = map[parentPath]

      if (parent) {
        parent.children = parent.children || []
        parent.children.push(item)
      }
    }
    else {
      result.push(item)
    }

    return result
  }, [])
}

export function sortRoutes(routes: RouteRecordRaw[]) {
  routes.sort((a, b) => {
    if (a.meta && b.meta) {
      return (a.meta.order ?? 0) - (b.meta.order ?? 0)
    }
    return 0
  })
  routes.forEach((x) => {
    if (x.children) {
      x.children = sortRoutes(x.children)
    }
  })
  return routes
}

export function generatorMenu(routerMap: RouteRecordRaw[], ...permissionList: string[]): MenuProps[] {
  function permissionIncludes(a: string[], b: string[]) {
    return b.some((permission) => {
      return a.includes(permission)
    })
  }
  const sortRoute = sortRoutes(routerMap)
  const permissionRoutes: MenuProps[] = recursion(sortRoute)
  function recursion(routes: RouteRecordRaw[]): MenuProps[] {
    const menus: MenuProps[] = []
    routes.forEach((x) => {
      const _permissions: string[] = (x.meta?.permissions as string[]) || []
      const linkTarget = x.meta?.routeType === 'iframe' ? 'viewFrame' : '_blank'
      const link = typeof x.meta?.link === 'string' ? { href: x.meta?.link, target: linkTarget } as LinkProps : x.meta?.link as LinkProps
      const menu: MenuProps = {
        label: x.meta!.title,
        name: x.name || '',
        key: x.path,
        link,
        routeType: x.meta?.routeType || 'route',
        icon: x.meta?.icon
      }
      if (x.children) {
        menu.children = recursion(x.children)
      }
      if (permissionList.includes('*') || permissionIncludes(permissionList, _permissions)) {
        menus.push(menu)
      }
    })
    return menus
  }

  return permissionRoutes.filter(x => x !== null)
}

/**
 * 净化Redirect
 * @param path 需要重定向的路由path
 */
export function cleanseRedirect(path: string) {
  return ['/', '/login'].includes(path) ? {} : { redirect: path }
}

/**
 * 校验路由权限
 *
 * @param route 待校验的路由
 */
export function check(route: RouteRecordRaw) {
  const permission = route.meta?.permission
  if (!permission || permission?.includes('*')) {
    return true
  }
  const { permissions } = storeToRefs(useAuthStore())
  const _permission = Array.isArray(permission) ? permission : [permission]
  return _permission.find(x => permissions.value.includes(x))
}

/**
 * 单独监听路由会浪费渲染性能。使用发布订阅模式去进行分发管理。
 */
export class RouteListener {
  latestRoute: RouteLocationNormalized | null = null
  emitter: Emitter<Record<EventType, unknown>> = mitt()
  key: any = Symbol('ROUTE_CHANGE')
  private static _instance: RouteListener
  static getInstance() {
    if (!RouteListener._instance) {
      RouteListener._instance = new RouteListener()
    }
    return RouteListener._instance
  }

  static on(handler: (route: RouteLocationNormalized) => void, immediate = true) {
    const instance = RouteListener.getInstance()
    if (immediate && instance.latestRoute) {
      handler(instance.latestRoute)
    }
    instance.emitter.on(instance.key, handler as Handler)
  }

  static emit(to: RouteLocationNormalized) {
    const instance = RouteListener.getInstance()
    instance.emitter.emit(instance.key, to)
    instance.latestRoute = to
  }

  static destroyed() {
    const instance = RouteListener.getInstance()
    instance.emitter.off(instance.key)
  }
}
