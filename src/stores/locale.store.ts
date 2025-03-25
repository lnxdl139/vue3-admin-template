import { storageHelper } from '@/utils'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LOCALE } from '@/constants'
import { ELocale } from '@/enums'

const useLocaleStore = defineStore('locale', () => {
  const { getStorage, setStorage } = storageHelper()
  const locale = ref<ELocale>(getStorage(LOCALE) || ELocale.JA)

  const setLocale = (lang: ELocale) => {
    locale.value = lang
    setStorage(LOCALE, lang)
  }

  return { locale, setLocale }
})

export default useLocaleStore
