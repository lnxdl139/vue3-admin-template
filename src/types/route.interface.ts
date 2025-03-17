import type { ERole } from '@/constants'
import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export type TCustomRouteRecord = RouteRecordRaw & {
  children?: TCustomRouteRecord[]
  meta?: {
    hidden?: boolean
    roles?: ERole[]
    icon?: Component
    title?: string
    auth?: boolean
  }
}

export interface IRouteMenu {
  title?: string
  icon?: Component
  path?: string
  children?: IRouteMenu[]
}
