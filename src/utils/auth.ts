import { userApi } from '@/api'
import { usePermissionStore, useUserStore } from '@/stores'
import { addRoutes, buildMenuFromRoutes, filterRoutesByRole } from './permission'
import { privateRoutes } from '@/router'
import { ERole } from '@/enums'

export const initializeUserRoutes = async () => {
  try {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    const { data } = await userApi.fetchUser('1')
    userStore.setUser(data)
    const userRoutes = filterRoutesByRole(privateRoutes, ERole.ADMIN)
    const menu = buildMenuFromRoutes(userRoutes)
    permissionStore.setMenus(menu)
    await addRoutes(userRoutes)
  } catch {
    throw new Error('initialize user routes failed!')
  }
}
