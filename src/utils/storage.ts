export const storageHelper = (useLocal?: boolean) => {
  const storage = useLocal ? localStorage : sessionStorage

  const setStorage = <T>(key: string, value: T) => {
    storage.setItem(key, JSON.stringify({ value, type: typeof value }))
  }

  const getStorage = <T>(key: string) => {
    const item = storage.getItem(key)
    if (!item) return null

    try {
      const data = JSON.parse(item)
      return data as T
    } catch {
      return null
    }
  }

  const removeStorage = (key: string) => {
    storage.removeItem(key)
  }

  const clear = () => {
    storage.clear()
  }

  return {
    setStorage,
    getStorage,
    removeStorage,
    clear,
  }
}
