import type { Raw } from 'vue'

export * from 'vue-router'

declare module 'vue-router' {
  type RouteType = 'route' | 'link' | 'iframe'
  interface LinkProps {
    href: string
    target: '_blank' | 'viewFrame'
  }
  type LinkType = string | LinkProps
  interface MenuProps {
    key: string
    name: RouteRecordName
    label: string
    icon?: Raw<Component>
    routeType: RouteType
    link?: LinkProps
    children?: MenuProps[]
    permission?: string
  }

  interface RouteMeta {
    title: string
    icon?: Raw<Component>
    order?: number
    isLayout?: boolean
    cache?: boolean
    routeType?: RouteType // 路由类型
    link?: LinkType// 当路由类型为 link | iframe 时需要填写此信息
    permission?: string | string[] // 权限
  }
  interface BreadcrumbProps {
    key: string
    label: string
    icon?: Component
  }
}
