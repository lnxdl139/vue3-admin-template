/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IRouteMenu, TCustomRouteRecord } from '@/types'
import router from '@/router'
import type { ERole } from '@/enums'

export const filterRoutesByRole = (
  routes: TCustomRouteRecord[],
  role: ERole,
): TCustomRouteRecord[] => {
  return routes
    .filter((route) => !route.meta?.roles || route.meta.roles.includes(role))
    .map((route) => ({
      ...route,
      children: route.children ? filterRoutesByRole(route.children, role) : undefined,
    })) as TCustomRouteRecord[]
}

export const addRoutes = async (routes: TCustomRouteRecord[]) => {
  routes.forEach((route) => {
    router.addRoute(route)
  })
}

export const buildMenuFromRoutes = (routes: TCustomRouteRecord[], basePath = ''): IRouteMenu[] => {
  return routes.flatMap((route: any) => {
    if (route?.meta?.layout && route?.children?.length) {
      return buildMenuFromRoutes(route.children, basePath)
    }

    if (route.meta?.hidden) return []

    const fullPath = `${basePath}/${route.path}`.replace(/\/$/, '')

    return [
      {
        path: fullPath,
        title: route.meta?.title || '',
        icon: route.meta?.icon || '',
        children: route.children ? buildMenuFromRoutes(route.children, fullPath) : [],
      },
    ]
  })
}
