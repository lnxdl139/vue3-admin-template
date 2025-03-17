interface IMeta {
  message: string
  status: number
}

export interface IBaseRespone<T = unknown> {
  data: T
  meta: IMeta
}
