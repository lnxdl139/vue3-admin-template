<template>
  <template v-for="(route, index) in menus" :key="index">
    <el-sub-menu v-if="route?.children?.length" :index="route.path as string">
      <template #title>
        <component :is="route.icon"></component>
        <span>{{ route?.title }}</span>
      </template>
      <RecursiveMenu :menus="route.children" />
    </el-sub-menu>

    <el-menu-item v-else :index="route.path as string" :route="route">
      <component :is="route.icon"></component>
      <span>{{ route?.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
  import type { IRouteMenu } from '@/types'

  defineProps({
    menus: {
      type: Array<IRouteMenu>,
      required: true,
    },
  })
</script>
