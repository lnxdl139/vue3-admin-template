import { useUserStore } from '@/stores'
import { initializeUserRoutes } from '@/utils/auth'
import { type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import useToken from '@/composables/useToken'
import { DASHBOARD_PATH, LOGIN_PATH, PUBLIC_PATHS } from './constant'
import router from '.'

const isRouteExists = (path: string): boolean =>
  router.getRoutes().some((route) => route.path === path)

const redirectTo404IfNotFound = (path: string, next: NavigationGuardNext) => {
  return isRouteExists(path) ? next() : next('/404')
}

const handleNoToken = (to: RouteLocationNormalized, next: NavigationGuardNext) => {
  return PUBLIC_PATHS.includes(to.path) ? next() : next(LOGIN_PATH)
}

const handleWithToken = async (to: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userStore = useUserStore()
  const { removeToken } = useToken()

  if (to.path === LOGIN_PATH) return next(DASHBOARD_PATH)

  if (userStore.user) return redirectTo404IfNotFound(to.path, next)

  try {
    await initializeUserRoutes()
    if (!isRouteExists(to.path)) return next('/404')

    return next({ ...to, replace: true })
  } catch {
    removeToken()
    return next(LOGIN_PATH)
  }
}

const createAuthGuard = async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { hasToken } = useToken()
  return hasToken.value ? handleWithToken(to, next) : handleNoToken(to, next)
}

export default createAuthGuard
