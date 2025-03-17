<template>
  <el-row class="tac">
    <el-col>
      <h5 class="mb-2">Default colors</h5>
      <el-menu :default-active="activeMenu" :router="true">
        <RecursiveMenu :menus="menusRow" />
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
  import { usePermissionStore } from '@/stores'
  import { computed, shallowRef } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const activeMenu = computed(() => route.path)

  const permissionStore = usePermissionStore()
  const menusRow = shallowRef(permissionStore.menus)
</script>
