<script setup lang="ts">
  import { ref, computed, watchEffect, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
  import { useI18n } from 'vue-i18n'

  const route = useRoute()
  const { locale } = useI18n()

  const selectedTheme = ref(localStorage.getItem('theme') || 'green')

  const changeTheme = () => {
    document.documentElement.setAttribute('class', selectedTheme.value)
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', selectedTheme.value)
  }

  watchEffect(() => {
    changeTheme()
  })

  watch(
    () => selectedTheme.value,
    (newTheme, oldTheme) => {
      if (newTheme === oldTheme) return
      changeTheme()
    },
  )

  const languages = [
    { label: 'japan', value: 'ja' },
    { label: 'English', value: 'en' },
  ]

  const changeLanguage = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
  }

  const breadcrumbs = computed(() => {
    return route.path
      .split('/')
      .filter((path) => path)
      .map((path, index, arr) => ({
        text: path.charAt(0).toUpperCase() + path.slice(1),
        to: '/' + arr.slice(0, index + 1).join('/'),
      }))
  })
</script>

<template>
  <header class="app-header">
    <div class="logo">
      <img src="" alt="Logo" class="logo-img" />
      <h1 class="title">Dashboard</h1>
    </div>

    <nav class="breadcrumbs">
      <span v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link :to="crumb.to">{{ crumb.text }}</router-link>
        <span v-if="index < breadcrumbs.length - 1"> / </span>
      </span>
    </nav>

    <div class="theme-switcher">
      <label>Theme:</label>
      <el-select v-model="selectedTheme" placeholder="Chọn theme" @change="changeTheme">
        <el-option label="light" value="light"></el-option>
        <el-option label="dark" value="dark"></el-option>
      </el-select>
    </div>

    <div class="actions">
      <!-- <ElSwitch v-model="isDarkMode" @change="toggleTheme" active-text="🌙" inactive-text="☀️" /> -->

      <ElDropdown @command="changeLanguage">
        <button class="lang-btn">
          {{ languages.find((l) => l.value === locale)?.label }}
        </button>
        <ElDropdownMenu>
          <ElDropdownItem v-for="lang in languages" :key="lang.value" :command="lang.value">
            {{ lang.label }}
          </ElDropdownItem>
        </ElDropdownMenu>
      </ElDropdown>
    </div>
  </header>
</template>

<style scoped>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--el-bg-color);
    padding: 12px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .logo-img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .breadcrumbs {
    flex-grow: 1;
    margin-left: 20px;
  }

  .breadcrumbs a {
    text-decoration: none;
    color: var(--el-text-color-primary);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .lang-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
</style>
