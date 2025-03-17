import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

const useUserStore = defineStore('user', () => {
  const userRef = ref<IUser | null>(null)

  const setUser = (user: IUser) => {
    userRef.value = user
  }

  const resetUser = () => (userRef.value = null)

  return { userRef, setUser, resetUser }
})

export default useUserStore
