import type { ERole } from '@/constants'

export interface ILoginPayload {
  username: string
  password: string
}

export interface ILoginResponse {
  token: string
  expired: number
}

export interface IUser {
  role: ERole
}
