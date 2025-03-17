<script setup lang="ts">
  import Menu from './components/Menu.vue'
</script>

<template>
  <el-container>
    <el-aside width="200px"><Menu /></el-aside>
    <el-container>
      <el-header><AppHeader /></el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
