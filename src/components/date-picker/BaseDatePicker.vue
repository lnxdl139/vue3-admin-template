<script lang="ts" setup>
  import { ElDatePicker } from 'element-plus'

  interface IProps {
    type: string
  }

  withDefaults(defineProps<IProps>(), {
    type: 'date',
  })
</script>
<template>
  <el-date-picker :type="type as any"></el-date-picker>
</template>
