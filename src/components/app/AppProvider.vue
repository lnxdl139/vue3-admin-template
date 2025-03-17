<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import { useLocaleStore } from '@/stores'
  import { storeToRefs } from 'pinia'
  import ja from 'element-plus/es/locale/lang/ja.mjs'

  const localeStore = useLocaleStore()
  const { locale } = storeToRefs(localeStore)
  const ElLocale = ref()
  const messages = import.meta.glob(`./node_modules/element-plus/es/locale/lang/*.mjs`)

  const loadLocale = async (lang: string) => {
    try {
      const filePath = `element-plus/es/locale/lang/${lang}.mjs`
      const localeModule = (await messages[filePath]()) as typeof messages
      ElLocale.value = localeModule.default
    } catch {
      ElLocale.value = ja
    }
  }

  watch(
    locale,
    (newLocale, oldLocale) => {
      if (newLocale !== oldLocale) {
        loadLocale(newLocale)
      }
    },
    { immediate: true },
  )
</script>

<template>
  <ElConfigProvider :locale="ElLocale">
    <slot />
  </ElConfigProvider>
</template>
