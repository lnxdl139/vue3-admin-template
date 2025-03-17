import { userApi } from '@/api'
import { ERole } from '@/constants'
import { usePermissionStore, useUserStore } from '@/stores'
import { addRoutes, buildMenuFromRoutes, filterRoutesByRole } from './permission'
import { privateRoutes } from '@/router'

export const initializeUserRoutes = async () => {
  try {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    const { data } = await userApi.fetchUser('1')
    userStore.setUser(data)
    const userRoutes = filterRoutesByRole(privateRoutes, ERole.ADMIN)
    const menu = buildMenuFromRoutes(userRoutes)
    console.log(menu, 'menu')
    permissionStore.setMenus(menu)
    await addRoutes(userRoutes)
  } catch {
    throw new Error('initialize user routes failed!')
  }
}
