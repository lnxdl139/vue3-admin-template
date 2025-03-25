import { createI18n } from 'vue-i18n'
import { LOCALE } from '@/constants'
import en from '@/locales/en'
import ja from '@/locales/ja'
import { storageHelper } from '@/utils'
import { ELocale } from '@/enums'

const setupI18n = () => {
  const storage = storageHelper()
  const defaultLocale = storage.getStorage<ELocale>(LOCALE) || ELocale.JA

  const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: ELocale.JA,
    message: {
      en: en,
      ja: ja,
    },
  })

  return i18n
}

export default setupI18n
