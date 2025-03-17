<script setup lang="ts">
  import { ElDialog } from 'element-plus'
  import { useSlots, type SetupContext } from 'vue'

  const slots: SetupContext['slots'] = useSlots()

  defineProps({
    modelValue: {
      type: String,
    },
    title: {
      type: String,
    },
  })
</script>

<template>
  <ElDialog
    destroy-on-close
    lock-scroll
    :close-on-click-modal="false"
    :show-close="false"
    v-bind="$attrs"
  >
    <template #header>
      <div class="flex justify-between items-center h-54px pl-15px pr-15px relative">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </template>

    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>

<style lang="less"></style>
