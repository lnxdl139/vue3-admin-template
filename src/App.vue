<script setup lang="ts">
  import AppProvider from '@/components/app/AppProvider.vue'
  import { RouterView } from 'vue-router'
</script>

<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>
