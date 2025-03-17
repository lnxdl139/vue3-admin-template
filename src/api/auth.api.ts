import type { ILoginPayload, ILoginResponse, IUser } from '@/types'
import axiosInstance from './axiosInstance'

const PATH = '/tokens'

export default {
  login: (payload: ILoginPayload) => axiosInstance.get<ILoginResponse>(`${PATH}`),

  fetchUser: async (id: string) => await axiosInstance.get<IUser>(`/users/${id}`),
}
