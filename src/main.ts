import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import setupI18n from './configs/i18n'

import '@/assets/styles/index.scss'
import 'element-plus/dist/index.css'

const i18n = setupI18n()
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ElementPlus)

app.mount('#app')
