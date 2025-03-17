import type { VNode } from 'vue'

export interface IOption<T = string> {
  label: string
  value: T
}

export interface IColumnConfig<T> {
  prop: string
  label: string
  width?: string
  sortable?: boolean
  content?: (scope: T | anyObj) => VNode | string
}
