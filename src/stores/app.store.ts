import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { ETheme } from '@/enums'

interface IAppState {
  loading: boolean
  collapse: boolean
  theme: ETheme
}

const useAppStore = defineStore('app', () => {
  const appState = reactive<IAppState>({
    loading: false,
    collapse: false,
    theme: ETheme.LIGHT,
  })

  const setLoading = (status: boolean) => {
    appState.loading = status
  }

  const setCollapse = (status: boolean) => {
    appState.collapse = status
  }

  const setTheme = (theme: ETheme) => {
    appState.theme = theme
  }

  return {
    loading: appState.loading,
    setLoading,
    theme: appState.theme,
    setTheme,
    collapse: appState.collapse,
    setCollapse,
  }
})

export default useAppStore
