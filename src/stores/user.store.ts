import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)

  const setUser = (newUser: IUser) => {
    user.value = newUser
  }

  const resetUser = () => (user.value = null)

  return { user, setUser, resetUser }
})

export default useUserStore
