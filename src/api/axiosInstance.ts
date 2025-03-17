import type { IBaseRespone } from '@/types/response.interface'
import { handleResponse } from '@/utils/api'
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

console.log('import.meta.env', import.meta)

export const BASE_URL = import.meta.env.VITE_BASE_API_ENDPOINT

console.log('BASE_URL', BASE_URL)

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    return req
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (res: AxiosResponse<IBaseRespone>) => {
    return handleResponse(res)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
