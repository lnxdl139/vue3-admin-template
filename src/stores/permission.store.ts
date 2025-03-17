import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IRouteMenu, TCustomRouteRecord } from '@/types'

const usePermissionStore = defineStore('permission', () => {
  const routers = ref<TCustomRouteRecord[]>([])
  const menus = ref<IRouteMenu[]>([])

  const setRouters = (routes: TCustomRouteRecord[]) => {
    routers.value = routes
  }

  const setMenus = (data: IRouteMenu[]) => {
    menus.value = data
  }

  return {
    routers,
    setRouters,
    menus,
    setMenus,
  }
})

export default usePermissionStore
