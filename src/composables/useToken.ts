import { computed, ref } from 'vue'
import { TOKEN } from '@/constants'
import cookies from 'js-cookie'

const useToken = () => {
  const tokenRef = ref<string>(cookies.get(TOKEN) || '')

  const hasToken = computed(() => Boolean(tokenRef.value))

  const setToken = (value: string, expiredAt: number) => {
    tokenRef.value = value
    cookies.set(TOKEN, value, { expires: expiredAt })
  }

  const removeToken = () => {
    tokenRef.value = ''
    cookies.remove(TOKEN)
  }

  return { hasToken, setToken, removeToken }
}

export default useToken
